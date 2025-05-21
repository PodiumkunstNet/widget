import { mapAgentWidgetData } from "../helpers/mapAgentWidgeData"
import { mapCategoriesData } from "../helpers/mapCategoriesData"
import { mapMainSectionWidgetData } from "../helpers/mapMainSectionWidgetData"
import { mapManifistationsData } from "../helpers/mapManifistationsData"
import { mapWorkForAgentData } from "../helpers/mapWorksForAgentData"
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

export const endpointsBySubType: Record<
	WidgetSubType,
	(iri: string) => string
> = {
	[WidgetSubType.Work]: (iri) => `/works/run?work=${iri}`,
	[WidgetSubType.Category]: (iri) => `/categories/run?category=${iri}`,
	[WidgetSubType.WorksForAgent]: (iri) => `/works-for-agents/run?agent=${iri}`,
	[WidgetSubType.Agent]: (iri) => `/agents/run?agent=${iri}`,
	[WidgetSubType.Manifestation]: (iri) => `/manifestations/run?work=${iri}`,
}

export const mappingFunctionBySubType: Record<
	WidgetSubType,
	(data: any[]) => MappedWidgetType
> = {
	[WidgetSubType.Work]: (data) => mapMainSectionWidgetData(data?.[0]),
	[WidgetSubType.Category]: (data) => mapCategoriesData(data),
	[WidgetSubType.WorksForAgent]: (data) => mapWorkForAgentData(data),
	[WidgetSubType.Agent]: (data) => mapAgentWidgetData(data?.[0]),
	[WidgetSubType.Manifestation]: (data) => mapManifistationsData(data),
}
