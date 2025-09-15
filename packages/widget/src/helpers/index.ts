import { mapAgentData } from "./mapAgentData"
import { mapCategoryData } from "./mapCategoriesData"
import { mapWorkData } from "./mapWorkData"
import { mapManifistationData } from "./mapManifistationsData"
import { mapWorkForAgentData } from "./mapWorksForAgentData"
import { MappedData } from "../state"
// import { WorkKey } from "../types/work"

/** 
 * Can we replace this with: Record<WorkKey, string | null | undefined> ?
 */
// export type MainWidgetType = {
// 	[WorkKey.Work]: string;
// 	[WorkKey.Title]?: string | null;
// 	[WorkKey.Date]?: string | null;
// 	[WorkKey.Note]?: string | null;
// 	[WorkKey.Categoryname]?: string | null;
// 	[WorkKey.Composer]?: string | null;
// 	[WorkKey.Composername]?: string | null;
// 	[WorkKey.Librettist]?: string | null;
// 	[WorkKey.Librettistname]?: string | null;
// 	[WorkKey.Choreographer]?: string | null;
// 	[WorkKey.Choreographername]?: string | null;
// 	// [WorkKey.Alttitle]?: string | null;
// 	// [WorkKey.Category]?: string | null;
// 	// [WorkKey.Manifestation]?: string | null;
// }

export type MappedWidgetType = {
	mappedData: MappedData | null
	error: boolean
}

export enum WidgetType {
	Agent = "agent",
	Work = "work",
	WorksForAgent = "worksForAgent",
	Category = "category",
	Manifestation = "manifestations",
}

/**
 * Ensure a string is a WidgetType, for example when parsing from a query param
 */
export function ensureWidgetType(type?: string | null) {
	type = type?.toLowerCase()

	if	(type === 'agent')			return WidgetType.Agent
	if	(type === 'work')				return WidgetType.Work
	if	(type === 'worksforagent')	return WidgetType.WorksForAgent
	if	(type === 'category')		return WidgetType.Category
	if	(type === 'manifestations')return WidgetType.Manifestation
}

export const widgetHelpers = new Map([
	[WidgetType.Work, {
		mappingFunction: (data: any[]) => mapWorkData(data?.[0]),
		endpoint: (iri: string) => `/works/run?work=${iri}`,
	}],
	[WidgetType.Category, {
		mappingFunction: (data: any[]) => mapCategoryData(data),
		endpoint: (iri: string) => `/categories/run?category=${iri}`,
	}],
	[WidgetType.WorksForAgent, {
		mappingFunction: (data: any[]) => mapWorkForAgentData(data),
		endpoint: (iri: string) => `/works-for-agents/run?agent=${iri}`,
	}],
	[WidgetType.Agent, {
		mappingFunction: (data: any[]) => mapAgentData(data?.[0]),
		endpoint: (iri: string) => `/agents/run?agent=${iri}`,
	}],
	[WidgetType.Manifestation, {
		mappingFunction: (data: any[]) => mapManifistationData(data),
		endpoint: (iri: string) => `/manifestations/run?work=${iri}`,
	}],
])
