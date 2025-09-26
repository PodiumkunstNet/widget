import { MappedWidgetType, WidgetType } from "."
import { TileType, Tile } from "../types/grid"
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
	WorkKey.Collectiveagentname,
	WorkKey.Authorname,
]

/**
 * These keys render 2 tiles: one for the agent, one for works by that agent
 */
const agentTiles = [WorkKey.Composer, WorkKey.Librettist, WorkKey.Choreographer, WorkKey.Collectiveagent, WorkKey.Author]

export function mapWorkData(data: WorkData): MappedWidgetType {
	if (!data || typeof data !== "object") {
		return {
			mappedData: null,
			error: true,
		}
	}

	const keys = Object.keys(data) as WorkKey[]

	const items: Tile[] = keys
		.filter((key) => data[key] != null && !keysToExclude.includes(key))
		.flatMap<Tile>((key) => {
			/** We know the value exists */
			const value = data[key]!

			/** Map the agent data to 2 tiles */
			if (agentTiles.includes(key)) {
				return createAgentTiles(key, data, keys)
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

			if (key === WorkKey.Source) {
				return createExternalLinkTile(key, value)
			}

			console.warn(`No explicit mapping for work key: ${key}`)
			return createStaticTile(key, value)
		})

	const filteredResults = items.filter((item) => item !== null) as Tile[]

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
	data: WorkData,
	keys: WorkKey[],
): Tile[] {
	const nameKey = `${key}name`
	if (!keyExists(nameKey, keys)) return []

	return [
		{
			id: data[key] ?? "",
			key: getLabelByFieldAndSubType(key, WidgetType.Agent),
			sourceKey: nameKey,
			subType: WidgetType.Agent,
			type: TileType.More,
			value: data[nameKey]!,
		},
		{
			id: data[key] ?? "",
			key: getLabelByFieldAndSubType(key, WidgetType.WorksForAgent),
			sourceKey: nameKey,
			subType: WidgetType.WorksForAgent,
			type: TileType.More,
			value: data[nameKey]!,
		},
	]
}

function createStaticTile(key: WorkKey, value: string): Tile {
	const label = getWorkLabel(key)
	if (!label) {
		console.error("No label found for work key:", key)
	}

	return {
		id: "",
		key: label,
		sourceKey: key,
		type: TileType.Static,
		value,
	}
}

function createInformationTile(key: WorkKey, value: string): Tile {
	return {
		id: "",
		key: getWorkLabel(key),
		note: value,
		sourceKey: key,
		type: TileType.Information,
		value: "Synopsis",
	}
}

function createCategoryTile(
	key: WorkKey,
	data: WorkData,
	keys: WorkKey[],
): Tile | [] {
	const nameKey = `${key}name`

	if (keyExists(nameKey, keys)) {
		const value = data[nameKey] ?? ""

		return {
			id: data[WorkKey.Category] ?? "",
			key: getWorkLabel(WorkKey.Category),
			sourceKey: WorkKey.Category,
			subType: WidgetType.Category,
			type: TileType.More,
			value: capitalizeFirstLetter(value),
		}
	}

	return []
}

function createManifestationTile(data: WorkData): Tile | [] {
	if (Number(data[WorkKey.Manifestations]) <= 0) return []

	return {
		id: data[WorkKey.Work] ?? "",
		key: "",
		sourceKey: WorkKey.Manifestations,
		subType: WidgetType.Manifestation,
		type: TileType.More,
		value: getWorkLabel(WorkKey.Manifestations),
	}
}

function createExternalLinkTile(key: WorkKey, value: string): Tile {
	return {
		id: "",
		key: getWorkLabel(key),
		value,
		type: TileType.ExternalLink,
		sourceKey: key,
		url: value,
	}
}