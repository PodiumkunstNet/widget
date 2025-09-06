import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { getUseQueryProps, useWidgetByIri } from "../hooks/useWidgetByIri"
import { GridItem } from "../types/grid"
import { GridDataState, State } from "../state"
import { AppOptions } from "../utils/app-options"
import { Actions } from "../state/actions"

export function useGridData(options: State['options']) {
	const [params] = useSearchParams()

	const id = params.get("id") ?? undefined
	const type = (params.get("type") as GridDataState['type']) ?? undefined

	const queryClient = useQueryClient()
	const { data, isLoading, isError } = useWidgetByIri(id, type)

	/** Prefetch data for next grids, but only in production */
	useEffect(() => {
		if (!data || import.meta.env.DEV) return

		const ps = (data.items ?? []).map(async (tile: GridItem) => {
			if (tile?.id && tile?.subType) {
				const useQueryProps = getUseQueryProps(tile.id, tile.subType, options.maxTiles)
				return queryClient?.prefetchQuery(useQueryProps)
			}
		})

		Promise.all(ps)
	}, [data?.items])

	return {
		isLoading,
		isError,
		title: data?.title ?? '',
		items: data?.items ?? [],
		id,
		type
	}
}

export function useInitAppOptions(dispatch: React.Dispatch<any>) {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const optionsStr = params.get("options")
		const payload = JSON.parse(optionsStr ?? "{}") as AppOptions

		dispatch({
			type: Actions.Init,
			payload
		})
	}, [])
}

export function useSetCSSSizeVars(items: GridItem[], options: State['options']) {
	useEffect(() => {
		if (!items || items.length === 0) return

		const [totalSize, singleSize] = getGridSectionSizes(items, options)

		document.documentElement.style.setProperty(
			'--total-size',
			totalSize + 'px'
		)

		document.documentElement.style.setProperty(
			'--single-size',
			singleSize + 'px'
		)
	}, [options, items])
}

function getGridSectionSizes(items: GridItem[], options: State['options']) {
	const isPortrait = window.innerHeight > window.innerWidth
	let singleSize = 0 // single size is the size of one column in potrait mode and one row in landscape mode
	let totalSize = 0 // total size is the size of the whole grid section

	if (isPortrait) {
		const availableColumnSpace = (window.innerWidth - (options.borderWidth * (options.maxColumns + 1)))
		singleSize = availableColumnSpace / options.maxColumns // column width

		const columns = Math.ceil(items.length / options.maxRows)

		totalSize = (singleSize * columns) + (options.borderWidth * (columns + 1))
	} else {
		const availableRowSpace = (window.innerHeight - (options.borderWidth * (options.maxRows + 1)))
		singleSize = availableRowSpace / options.maxRows // row height

		const rows = Math.ceil(items.length / options.maxColumns)

		totalSize = (singleSize * rows) + (options.borderWidth * (rows + 1))
	}

	return [totalSize, singleSize]
}
