import {
	MappedWidgetType,
	WidgetType,
} from "."
import { AgentData, AgentKey, getAgentLabel } from "../types/agent"
import { GridCategory, GridItem } from "../types/grid"

const keysToExclude = ["manifestation", "work", AgentKey.Agent, AgentKey.Title]

export function mapAgentData(data: AgentData): MappedWidgetType {
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
				key == AgentKey.Role ||
				key == AgentKey.Datebirth ||
				key == AgentKey.Placebirth ||
				key == AgentKey.Datedeath ||
				key == AgentKey.Placedeath
			) {
				return {
					key: getAgentLabel(key),
					value,
					type: GridCategory.Static,
					sourceKey: key,
				}
			}

			if (
				key == AgentKey.Organisation
			) {
				return {
					key: getAgentLabel(key),
					value,
					type: GridCategory.More,
					sourceKey: key,
					subType: WidgetType.Agent,
				}
			}

			if (key == AgentKey.Note) {
				return {
					key: getAgentLabel(key),
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

	if (data[AgentKey.Agent]) {
		items.push({
			key: "Meer werk van",
			value: data?.title ?? undefined,
			type: GridCategory.More,
			subType: WidgetType.WorksForAgent,
			id: data?.agent || "",
			sourceKey: AgentKey.Agent,
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
