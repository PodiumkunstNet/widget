import { GridCategory, GridItem } from "../types/grid"
import { MappedWidgetType, WidgetSubType } from "../types/mainWidgetData"

export type WorkForAgentType = {
	agent: string
	work: string
	title: string
}

export function mapWorkForAgentData(
	data: WorkForAgentType[],
): MappedWidgetType {
	if (!data) {
		return {
			mappedData: null,
			error: true,
		}
	}

	const items: GridItem[] = []
	data.forEach((item) => {
		items.push({
			key: "",
			value: item.title,
			type: GridCategory.More,
			id: item.work,
			subType: WidgetSubType.Work,
			sourceKey: "title",
		})
	})

	return {
		error: false,
		mappedData: {
			title: "",
			items,
		},
	}
}
