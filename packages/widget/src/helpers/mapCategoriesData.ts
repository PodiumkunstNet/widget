import { TileType, Tile } from "../types/grid"
import { MappedWidgetType, WidgetType } from "../helpers"
import { Term } from "../types"

export type CategoryType = {
	// category: Term<"uri">
	// title: Term<"literal">
	work: Term<"uri">
	worktitle: Term<"literal">
}

export function mapCategoryData(data: CategoryType[]): MappedWidgetType {
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
			value: item.worktitle.value,
			type: TileType.More,
			subType: WidgetType.Work,
			id: item.work.value,
			sourceKey: "worktitle",
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
