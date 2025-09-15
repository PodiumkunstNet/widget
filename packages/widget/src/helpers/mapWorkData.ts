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

	const items: GridItem[] = []
	const keys = Object.keys(data) as WorkKey[]

	keys.forEach((key) => {
		if (!data[key]) {
			return
		}
		// Exclude keys that we don't want to show
		if (keysToExclude.includes(key)) {
			return
		}

		/** Map the agent data to 2 tiles */
		if (agentTiles.includes(key)) {
			const nameKey = `${key}name`

			if (keyExists(nameKey, keys)) {
				const value = data[key]

				items.push({
					id: value ?? "",
					key: getLabelByFieldAndSubType(key, WidgetType.Agent),
					sourceKey: nameKey,
					subType: WidgetType.Agent,
					type: GridCategory.More,
					value,
				})

				items.push({
					id: value ?? "",
					key: getLabelByFieldAndSubType(key, WidgetType.WorksForAgent),
					sourceKey: nameKey,
					subType: WidgetType.WorksForAgent,
					type: GridCategory.More,
					value,
				})
			}

			return
		}

		if (key == WorkKey.Category) {
			const nameKey = `${key}name`

			if (keyExists(nameKey, keys)) {
				const value = data[nameKey] ?? ""

				items.push({
					key: getWorkLabel(WorkKey.Category),
					value: capitalizeFirstLetter(value),
					type: GridCategory.More,
					id: data[WorkKey.Category] ?? "",
					subType: WidgetType.Category,
					sourceKey: WorkKey.Category,
				})
				return
			}
		}

		if (key == WorkKey.Manifestations) {
			if (Number(data[WorkKey.Manifestations]) > 0) {
				items.push({
					key: "",
					value: getWorkLabel(WorkKey.Manifestations),
					type: GridCategory.More,
					id: data[WorkKey.Work] ?? "",
					subType: WidgetType.Manifestation,
					sourceKey: WorkKey.Manifestations,
				})
			}

			return
		}

		// Show info fields
		if (key === WorkKey.Note) {
			items.push({
				key: getWorkLabel(key),
				value: "Synopsis",
				type: GridCategory.Information,
				note: data[key],
				sourceKey: key,
			})
			return
		}

		// Show static fields
		items.push({
			key: getWorkLabel(key),
			value: data[key],
			type: GridCategory.Static,
			sourceKey: key,
		})
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
