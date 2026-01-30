import { Term } from "../../types"
import { Tile, TileType } from "../../types/grid"
import { WidgetType } from "../../types/widget"
import { MappedData } from "../types"

export type CategoryType = {
	work: Term<"uri">
	worktitle: Term<"literal">
}

export function mapCategoryData(data: CategoryType[]): MappedData | undefined {
	if (!data) return

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
		title: "",
		items,
	}
}
