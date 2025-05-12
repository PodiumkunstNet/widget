import { GridCategory, type GridItem } from "../types/grid"
import { useParams } from "react-router-dom"

export function useURL(
	isSubCategoryView: boolean | undefined,
	item?: GridItem,
) {
	const params = useParams()

	/**
	 * If the item has a URL, use it
	 */
	let url = item?.url ?? '/widget'

	/**
	 * Adjust URL for Information and More categories
	 */
	if (item?.type === GridCategory.More) {
		url = `/widget/more?id=${item?.id}&type=${item?.subType}`
	} else if (item?.type === GridCategory.Information) {
		const parentId = params?.id
		const leftPart = isSubCategoryView
			? `/widget/more/${parentId}`
			: "/widget"
		url = `${leftPart}/info/${item?.id}`
	}

	return url
}


	// const url =
	// 	useMemo(() => {
	// 		const parentId = params?.id
	// 		switch (item?.type) {
	// 			case GridCategory.Information:
	// 				const leftPart = isSubCategoryView
	// 					? `/widget/more/${parentId}`
	// 					: "/widget"
	// 				// TODO in future we can add some rules which field to use
	// 				return `${leftPart}/info/${item?.id}`
	// 			case GridCategory.More:
	// 				return `/widget/more?id=${item?.id}&type=${item?.subType}`
	// 			case GridCategory.Website:
	// 				return item?.url
	// 			default:
	// 				return "/widget"
	// 		}
	// 	}, [isSubCategoryView, item, params?.id]) ?? "/widget"