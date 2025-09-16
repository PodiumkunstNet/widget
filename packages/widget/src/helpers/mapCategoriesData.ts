import { TileType, Tile } from "../types/grid"
import { MappedWidgetType, WidgetType } from "../helpers"

export type CategoryType = {
	category: string
	title: string
	work: string
	worktitle: string
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
			value: item.worktitle,
			type: TileType.More,
			subType: WidgetType.Work,
			id: item.work,
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
