import { getTileLabel } from "../../types"
import { WidgetType } from "../../types/widget"
import { MappedData } from "../types"
import { AgentData, AgentKey, getAgentType } from "../../types/agent"
import { Tile } from "../../types/grid"
import { getAgentValue } from "./utils"

const keysToExclude = ["manifestation", "work", AgentKey.Agent, AgentKey.Title]

/**
 * TODO	make mapping of data to tiles more generic. Don't use lists in if-statements,
 * 		but a mapping object saying it is a static/more/information tile and if it has a subType.
 *			There could also be "custom" tiles where the mapping function can be passed in as a prop.
 */
export function mapAgentData(data: AgentData): MappedData | undefined {
	if (!data || typeof data !== "object") return 

	const warnings: Record<string, string | null | undefined> = {}

	const items: Tile[] = (Object.keys(data) as AgentKey[])
		.map((key) => [key, getAgentValue(data, key)] as [AgentKey, string])
		.filter(([key, value]) => value != null && !keysToExclude.includes(key))
		.map(([key, value]) => {
			if (
				key == AgentKey.Role ||
				key == AgentKey.Placebirth ||
				key == AgentKey.Placedeath ||
				key == AgentKey.Origin ||
				key == AgentKey.Periodactivity ||
				key == AgentKey.Keywords
			) {
				return {
					key: getTileLabel(WidgetType.Agent, key),
					value,
					type: getAgentType(key),
					sourceKey: key,
				}
			}

			if (
				key == AgentKey.Datebirth ||
				key == AgentKey.Datedeath
			) {
				return {
					key: getTileLabel(WidgetType.Agent, key),
					value: formatDutchDate(value),
					type: getAgentType(key),
					sourceKey: key,
				}
			}

			if (key == AgentKey.Organisation) {
				return {
					key: getTileLabel(WidgetType.Agent, key),
					value,
					type: getAgentType(key),
					sourceKey: key,
					subType: WidgetType.Agent,
				}
			}

			if (key == AgentKey.Note) {
				return {
					key: getTileLabel(WidgetType.Agent, key),
					value: "Bio",
					note: value,
					type: getAgentType(key),
					sourceKey: key,
				}
			}

			warnings[key] = value
		})
		.filter((item) => item != null) as Tile[]

	if (Object.keys(warnings).length > 0) {
		console.warn("Some keys are not handled!", warnings)
	}

	if (data[AgentKey.Agent]) {
		items.push({
			key: "Meer werk van",
			value: getAgentValue(data, AgentKey.Title),
			type: getAgentType(AgentKey.Agent),
			subType: WidgetType.WorksForAgent,
			id: getAgentValue(data, AgentKey.Agent),
			sourceKey: AgentKey.Agent,
		})
	}

	return {
		title: getAgentValue(data, AgentKey.Title),
		items,
	}
}

// Create a function which takes a Dutch date ("DD-MM-YYYY") and returns 
// a human readable version 12 maart 2023
const months = [
	"januari", "februari", "maart", "april", "mei", "juni",
	"juli", "augustus", "september", "oktober", "november", "december"
]

function formatDutchDate(dateString: string): string {
	const [day, month, year] = dateString.split("-").map(Number)

	if (month < 1 || month > 12) return dateString // Invalid month

	return `${day} ${months[month - 1]} ${year}`
}
