import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
// import { useQueryClient } from "@tanstack/react-query"

import { /*getUseQueryProps,*/ useWidgetByIri } from "./useWidgetByIri"
import { Tile } from "../types/grid"
import { GridDataState, State } from "../state"
import { type Paginator } from "../components/Layout/Paginator"

export function useGridData(options: State['options']) {
	const [params] = useSearchParams()

	const id = params.get("id") ?? undefined
	const type = (params.get("type") as GridDataState['type']) ?? undefined

	// const queryClient = useQueryClient()
	const { data, isLoading, isError } = useWidgetByIri(id, type)

	/** Prefetch data for next grids, but only in production */
	// useEffect(() => {
	// 	if (!data || import.meta.env.DEV) return

	// 	const ps = (data.items ?? []).map(async (tile: Tile) => {
	// 		if (tile?.id && tile?.subType) {
	// 			const useQueryProps = getUseQueryProps(tile.id, tile.subType, options.maxTiles)
	// 			return queryClient?.prefetchQuery(useQueryProps)
	// 		}
	// 	})

	// 	Promise.all(ps)
	// }, [data?.items])

	const maxItems = useSetCSSSizeVars(data?.items, options)

	return {
		isLoading,
		isError,
		title: data?.title ?? '',
		items: data?.items ?? [],
		id,
		maxItems,
		type
	}
}

function useSetCSSSizeVars(items: Tile[] | undefined, options: State['options']) {
	const [maxItems, setMaxItems] = useState(0)

	useEffect(() => {
		if (!items || items.length === 0) return

		const { totalSize, singleSize, maxItems } = getGridSectionSizes(items, options)
		setMaxItems(maxItems)

		document.documentElement.style.setProperty(
			'--total-size',
			totalSize + 'px'
		)

		document.documentElement.style.setProperty(
			'--single-size',
			singleSize + 'px'
		)
	}, [options, items])

	return maxItems
}

function getGridSectionSizes(items: Tile[], options: State['options']) {
	const isPortrait = window.innerHeight > window.innerWidth
	let singleSize = 0 // single size is the size of one column in potrait mode and one row in landscape mode
	let totalSize = 0 // total size is the size of the whole grid section
	let maxItems = 0 // max items that are in a row/column, depending on the orientation

	const rect = document.querySelector('.container > main')?.getBoundingClientRect()
	if (rect == null) return { totalSize: 0, singleSize: 0, maxItems: 0 }

	if (isPortrait) {
		const availableColumnSpace = (rect.width - (options.borderWidth * (options.maxColumns + 1)))
		singleSize = availableColumnSpace / options.maxColumns // column width

		/** Calculate the max items that are in a column. This number is used in the {@link Paginator} */
		maxItems = Math.ceil(items.length / options.maxRows)

		totalSize = (singleSize * maxItems) + (options.borderWidth * (maxItems + 1))
	} else {
		const availableRowSpace = (rect.height - (options.borderWidth * (options.maxRows + 1)))
		singleSize = availableRowSpace / options.maxRows // row height

		/** Calculate the max items that are in a row. This number is used in the {@link Paginator} */
		maxItems = Math.ceil(items.length / options.maxColumns)

		totalSize = (singleSize * maxItems) + (options.borderWidth * (maxItems + 1))
	}

	return { totalSize, singleSize, maxItems }
}
