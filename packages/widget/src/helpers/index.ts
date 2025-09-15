import { mapAgentData } from "./mapAgentData"
import { mapCategoryData } from "./mapCategoriesData"
import { mapWorkData } from "./mapWorkData"
import { mapManifistationData } from "./mapManifistationsData"
import { mapWorkForAgentData } from "./mapWorksForAgentData"
import { MappedData } from "../state"

export type MainWidgetType = {
	work: string
	title?: string | null
	alttitle?: string | null
	date?: string | null
	note?: string | null
	category?: string | null
	categoryname?: string | null
	manifestation?: string | null
	composer?: string | null
	composername?: string | null
	librettist?: string | null
	librettistname?: string | null
	choreographer?: string | null
	choreographername?: string | null
	[key: string]: string | null | undefined
}

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
