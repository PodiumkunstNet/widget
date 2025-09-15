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

	const warnings: Record<string, string | null | undefined> = {}

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
					sourceKey: key,
				}
			}

			if (key == AgentCategory.Note) {
				return {
					key: AGENT_FIELD_LABELS[key],
					value: "Bio",
					note: value,
					type: GridCategory.Information,
					sourceKey: key,
				}
			}

			warnings[key] = value
		})
		.filter((item) => item != null) as GridItem[]

	if (Object.keys(warnings).length > 0) {
		console.warn("Some keys are not handled!", warnings)
	}

	if (data[AgentCategory.Agent]) {
		items.push({
			key: "Meer werk van",
			value: data?.title ?? undefined,
			type: GridCategory.More,
			subType: WidgetSubType.WorksForAgent,
			id: data?.agent || "",
			sourceKey: AgentCategory.Agent,
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
