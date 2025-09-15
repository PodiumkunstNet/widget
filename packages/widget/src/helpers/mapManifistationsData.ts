import { GridCategory, GridItem } from "../types/grid"
import { MappedWidgetType } from "../helpers"

export type ManifistationType = {
	manifestation: string
	title: string
	date: string
	type: string
}

export function mapManifistationData(
	data: ManifistationType[],
): MappedWidgetType {
	if (!data) {
		return {
			mappedData: null,
			error: true,
		}
	}

	const items: GridItem[] = []
	data.forEach((item) => {
		const key =
			item.type && item.date
				? `${item.type}, ${item.date}`
				: item.type
				? item.type
				: item.date
		items.push({
			key,
			value: item.title,
			type: GridCategory.Static,
			id: item.manifestation,
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
