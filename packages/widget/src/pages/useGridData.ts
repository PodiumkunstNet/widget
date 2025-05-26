import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { getUseQueryProps, useWidgetByIri } from "../hooks/useWidgetByIri"
import { GridItem } from "../types/grid"
import { GridDataState, State } from "../state"

export function useGridData(options: State['options']) {
	const [params] = useSearchParams()

	const id = params.get("id") ?? undefined
	const type = (params.get("type") as GridDataState['type']) ?? undefined

	const queryClient = useQueryClient()
	const { data, isLoading, isError } = useWidgetByIri(id, type)

	useEffect(() => {
		if (!data) return

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
