import { mapAgentData } from "./mapAgentWidgeData"
import { mapCategoryData } from "./mapCategoriesData"
import { mapWorkData } from "./mapMainSectionWidgetData"
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

export enum WidgetSubType {
	Agent = "agent",
	Work = "work",
	WorksForAgent = "worksForAgent",
	Category = "category",
	Manifestation = "manifestations",
}

export const widgetHelpers = new Map([
	[WidgetSubType.Work, {
		mappingFunction: (data: any[]) => mapWorkData(data?.[0]),
		endpoint: (iri: string) => `/works/run?work=${iri}`,
	}],
	[WidgetSubType.Category, {
		mappingFunction: (data: any[]) => mapCategoryData(data),
		endpoint: (iri: string) => `/categories/run?category=${iri}`,
	}],
	[WidgetSubType.WorksForAgent, {
		mappingFunction: (data: any[]) => mapWorkForAgentData(data),
		endpoint: (iri: string) => `/works-for-agents/run?agent=${iri}`,
	}],
	[WidgetSubType.Agent, {
		mappingFunction: (data: any[]) => mapAgentData(data?.[0]),
		endpoint: (iri: string) => `/agents/run?agent=${iri}`,
	}],
	[WidgetSubType.Manifestation, {
		mappingFunction: (data: any[]) => mapManifistationData(data),
		endpoint: (iri: string) => `/manifestations/run?work=${iri}`,
	}],
])
