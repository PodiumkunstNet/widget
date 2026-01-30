import { mapAgentData } from "./mapAgentData"
import { mapCategoryData } from "./mapCategoriesData"
import { mapWorkData } from "./mapWorkData"
import { mapManifistationData } from "./mapManifistationsData"
import { mapWorkForAgentData } from "./mapWorksForAgentData"
import { WidgetType } from "../../types/widget"

export const mappers = {
	[WidgetType.Work]: (data: any[]) => mapWorkData(data?.[0]),
	[WidgetType.Agent]: (data: any[]) => mapAgentData(data?.[0]),
	[WidgetType.WorksForAgent]: (data: any[]) => mapWorkForAgentData(data),
	[WidgetType.Category]: (data: any[]) => mapCategoryData(data),
	[WidgetType.Manifestation]: (data: any[]) => mapManifistationData(data),
} satisfies Record<WidgetType, (data: any[]) => any>
