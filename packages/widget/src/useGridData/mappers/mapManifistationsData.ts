import { Tile, TileType } from "../../types/grid"
import { MappedData } from "../types"

export type ManifistationType = {
	manifestation: string
	title: string
	date: string
	type: string
}

export function mapManifistationData(data: ManifistationType[]): MappedData | undefined {
	if (!data) return

	const items: Tile[] = []
	data.forEach((item) => {
		const key =
			item.type && item.date ? `${item.type}, ${item.date}`
			: item.type ? item.type
			: item.date
		items.push({
			key,
			value: item.title,
			type: TileType.Static,
			id: item.manifestation,
			sourceKey: "title",
		})
	})

	return {
		title: "",
		items,
	}
}
