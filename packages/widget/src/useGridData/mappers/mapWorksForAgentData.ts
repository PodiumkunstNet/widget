import { Term } from "../../types"
import { Tile, TileType } from "../../types/grid"
import { WidgetType } from "../../types/widget"
import { MappedData } from "../types"

export type WorkForAgentType = {
	work: Term<"uri">
	title: Term<"literal">
}

export function mapWorkForAgentData(
	data: WorkForAgentType[],
): MappedData | undefined {
	if (!data) return

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
		title: "",
		items,
	}
}
