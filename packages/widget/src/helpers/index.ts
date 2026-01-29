import { mapAgentData } from "./mapAgentData"
import { mapCategoryData } from "./mapCategoriesData"
import { mapWorkData } from "./mapWorkData"
import { mapManifistationData } from "./mapManifistationsData"
import { mapWorkForAgentData } from "./mapWorksForAgentData"
import { MappedData } from "../state"

export type MappedWidgetType = {
	mappedData: MappedData | null
	error: boolean
}
/**
 * WidgetType represents the different types of data widgets that can be displayed. Some widgets
 * represent single entities (like an Agent or a Work), while others represent collections of
 * entities (like Works for an Agent, or Works in a Category).
 *
 * - The enum string values are the canonical, serialized representation used in URLs (query params) and JSON.
 * - Keep this in sync with `ensureWidgetType` (string-to-enum parsing) and `widgetHelpers` (endpoint + mapping).
 */
export enum WidgetType {
	/**
	 * Data about a single Agent (person or organization).
	 *
	 * Example: Mozart, or the New York Philharmonic.
	 * Mapping: {@link mapAgentData}
	 */
	Agent = "agent",

	/**
	 * Data about a single Work.
	 *
	 * Example: The Magic Flute, Symphony No. 41.
	 * Mapping: {@link mapWorkData}
	 */
	Work = "work",

	/**
	 * A collection of Works associated with a given Agent.
	 *
	 * Example: All works composed by Mozart.
	 * Mapping: {@link mapWorkForAgentData}
	 */
	WorksForAgent = "worksForAgent",

	/**
	 * A collection of Works grouped by a Category.
	 *
	 * Example: All works in the "muziekwerk" category.
	 * Mapping: {@link mapCategoryData}
	 */
	Category = "category",

	/**
	 * Manifestations of a Work.
	 *
	 * Example: All manifestations of "The Magic Flute".
	 * Mapping: {@link mapManifistationData}
	 */
	Manifestation = "manifestations",
}

/**
 * Parse a string into a `WidgetType` (case-insensitive), for example from a query param.
 */
export function ensureWidgetType(type?: string | null) {
	type = type?.toLowerCase()

	if (type === "agent") return WidgetType.Agent
	if (type === "work") return WidgetType.Work
	if (type === "worksforagent") return WidgetType.WorksForAgent
	if (type === "category") return WidgetType.Category
	if (type === "manifestations") return WidgetType.Manifestation
}

export const widgetHelpers = new Map([
	[
		WidgetType.Work,
		{
			mappingFunction: (data: any[]) => mapWorkData(data?.[0]),
			endpoint: async (iri: string) => {
				const query = await import("../queries/work.sparql?raw")
				return query.default.replace("{{iri}}", iri)
			},
		},
	],
	[
		WidgetType.Agent,
		{
			mappingFunction: (data: any[]) => mapAgentData(data?.[0]),
			endpoint: async (iri: string) => {
				const query = await import("../queries/agent.sparql?raw")
				return query.default.replace("{{iri}}", iri)
			},
		},
	],
	[
		WidgetType.WorksForAgent,
		{
			mappingFunction: (data: any[]) => mapWorkForAgentData(data),
			endpoint: async (iri: string) => {
				const query = await import("../queries/works-for-agent.sparql?raw")
				return query.default.replace("{{iri}}", iri)
			},
		},
	],
	[
		WidgetType.Category,
		{
			mappingFunction: (data: any[]) => mapCategoryData(data),
			// endpoint: (iri: string) => `/categories/run?category=${iri}`,
			endpoint: async (iri: string) => {
				const query = await import("../queries/categories.sparql?raw")
				return query.default.replace("{{iri}}", iri)
			},
		},
	],
	[
		WidgetType.Manifestation,
		{
			mappingFunction: (data: any[]) => mapManifistationData(data),
			endpoint: (iri: string) => `/manifestations/run?work=${iri}`,
		},
	],
])
