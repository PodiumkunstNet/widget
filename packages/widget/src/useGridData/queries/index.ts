import { WidgetType } from "../../types/widget"

/**
 * Map of functions to dynamically import SPARQL queries based on widget type.
 */
export const importQueryMap = {
	[WidgetType.Work]: async (iri: string) => {
		const query = await import("./work.sparql?raw")
		return query.default.replace("{{iri}}", iri)
	},
	[WidgetType.Agent]: async (iri: string) => {
		const query = await import("./agent.sparql?raw")
		return query.default.replace("{{iri}}", iri)
	},
	[WidgetType.WorksForAgent]: async (iri: string) => {
		const query = await import("./works-for-agent.sparql?raw")
		return query.default.replace("{{iri}}", iri)
	},
	[WidgetType.Category]: async (iri: string) => {
		const query = await import("./categories.sparql?raw")
		return query.default.replace("{{iri}}", iri)
	},
	[WidgetType.Manifestation]: async (iri: string) => `/manifestations/run?work=${iri}`,
} satisfies Record<WidgetType, (iri: string) => Promise<string>>
