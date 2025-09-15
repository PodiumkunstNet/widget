import { MappedWidgetType, WidgetType } from "."
import { GridCategory, GridItem } from "../types/grid"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"
import { getLabelByFieldAndSubType } from "../constants/fieldLabels"
import { getWorkLabel, WorkData, WorkKey } from "../types/work"

const keysToExclude = [
	WorkKey.Work,
	WorkKey.Title,
	WorkKey.Categoryname,
	WorkKey.Composername,
	WorkKey.Librettistname,
	WorkKey.Choreographername,
]

/**
 * These keys render 2 tiles: one for the agent, one for works by that agent
 */
const agentTiles = [WorkKey.Composer, WorkKey.Librettist, WorkKey.Choreographer]

export function mapWorkData(data: WorkData): MappedWidgetType {
	if (!data || typeof data !== "object") {
		return {
			mappedData: null,
			error: true,
		}
	}

	const keys = Object.keys(data) as WorkKey[]

	const items: GridItem[] = keys
		.filter((key) => data[key] != null && !keysToExclude.includes(key))
		.flatMap<GridItem>((key) => {
			/** We know the value exists */
			const value = data[key]!

			/** Map the agent data to 2 tiles */
			if (agentTiles.includes(key)) {
				return createAgentTiles(key, value, keys)
			}

			if (key == WorkKey.Category) {
				return createCategoryTile(key, data, keys)
			}

			if (key == WorkKey.Manifestations) {
				return createManifestationTile(data)
			}

			if (key === WorkKey.Note) {
				return createInformationTile(key, value)
			}

			return createStaticTile(key, value)
		})

	const filteredResults = items.filter((item) => item !== null) as GridItem[]

	return {
		mappedData: {
			title: data.title ?? "",
			items: filteredResults,
		},
		error: false,
	}
}

function keyExists(key: string, keys: WorkKey[]): key is WorkKey {
	return keys.includes(key as WorkKey)
}

function createAgentTiles(
	key: WorkKey,
	value: string,
	keys: WorkKey[],
): GridItem[] {
	const nameKey = `${key}name`
	if (!keyExists(nameKey, keys)) return []

	return [
		{
			id: value ?? "",
			key: getLabelByFieldAndSubType(key, WidgetType.Agent),
			sourceKey: nameKey,
			subType: WidgetType.Agent,
			type: GridCategory.More,
			value,
		},
		{
			id: value ?? "",
			key: getLabelByFieldAndSubType(key, WidgetType.WorksForAgent),
			sourceKey: nameKey,
			subType: WidgetType.WorksForAgent,
			type: GridCategory.More,
			value,
		},
	]
}

function createStaticTile(key: WorkKey, value: string): GridItem {
	return {
		id: "",
		key: getWorkLabel(key),
		sourceKey: key,
		type: GridCategory.Static,
		value,
	}
}

function createInformationTile(key: WorkKey, value: string): GridItem {
	return {
		id: "",
		key: getWorkLabel(key),
		note: value,
		sourceKey: key,
		type: GridCategory.Information,
		value: "Synopsis",
	}
}

function createCategoryTile(
	key: WorkKey,
	data: WorkData,
	keys: WorkKey[],
): GridItem | [] {
	const nameKey = `${key}name`

	if (keyExists(nameKey, keys)) {
		const value = data[nameKey] ?? ""

		return {
			id: data[WorkKey.Category] ?? "",
			key: getWorkLabel(WorkKey.Category),
			sourceKey: WorkKey.Category,
			subType: WidgetType.Category,
			type: GridCategory.More,
			value: capitalizeFirstLetter(value),
		}
	}

	return []
}

function createManifestationTile(data: WorkData): GridItem | [] {
	if (Number(data[WorkKey.Manifestations]) <= 0) return []

	return {
		id: data[WorkKey.Work] ?? "",
		key: "",
		sourceKey: WorkKey.Manifestations,
		subType: WidgetType.Manifestation,
		type: GridCategory.More,
		value: getWorkLabel(WorkKey.Manifestations),
	}
}
