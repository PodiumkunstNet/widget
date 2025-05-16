import {
	MainWidgetType,
	MappedWidgetType,
	WidgetSubType,
} from "../types/mainWidgetData"
import { AgentCategory } from "../types/categories"
import { GridCategory, GridItem } from "../types/grid"
import { AGENT_FIELD_LABELS } from "../constants/fieldLabels"

const keysToExclude = ["manifestation", "work", AgentCategory.Agent, "title"]

export function mapAgentWidgetData(data: MainWidgetType): MappedWidgetType {
	if (!data || typeof data !== "object") {
		return {
			mappedData: null,
			error: true,
		}
	}

	const items: GridItem[] = Object.entries(data)
		.filter(([key, value]) => value != null && !keysToExclude.includes(key))
		.map(([key, value]) => {
			if (
				key == AgentCategory.Role ||
				key == AgentCategory.Datebirth ||
				key == AgentCategory.Placebirth ||
				key == AgentCategory.Datedeath ||
				key == AgentCategory.Placedeath
			) {
				return {
					key: AGENT_FIELD_LABELS[key],
					value,
					type: GridCategory.Static,
				}
			}

			if (key == AgentCategory.Note) {
				return {
					key: AGENT_FIELD_LABELS[key],
					value: "Bio",
					note: value,
					type: GridCategory.Information,
				}
			}

			console.warn(
				`Key ${key} with value ${value} is not handled in mapAgentWidgetData.
				Please check the mapping logic.`,
			)
		})
		.filter((item) => item != null) as GridItem[]

	if (data[AgentCategory.Agent]) {
		items.push({
			key: "Meer werk van",
			value: data?.title ?? undefined,
			type: GridCategory.More,
			subType: WidgetSubType.WorksForAgent,
			id: data?.agent || "",
		})
	}

	return {
		mappedData: {
			title: data.title ?? "",
			items
		},
		error: false,
	}
}
