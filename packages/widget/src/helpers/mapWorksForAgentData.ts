import { TileType, Tile } from "../types/grid"
import { MappedWidgetType, WidgetType } from "../helpers"
import { Term } from "../types"

export type WorkForAgentType = {
	work: Term<"uri">
	title: Term<"literal">
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

	const items: Tile[] = []
	data.forEach((item) => {
		items.push({
			key: "",
			value: item.title.value,
			type: TileType.More,
			id: item.work.value,
			subType: WidgetType.Work,
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
