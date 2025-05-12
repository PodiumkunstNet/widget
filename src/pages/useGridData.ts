import { getUseQueryProps, useWidgetByIri } from "../hooks/useWidgetByIri"
import { WidgetSubType } from "../types/mainWidgetData"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { GridItem } from "../types/grid"

export function useGridData(id: string | null, type: WidgetSubType | null) {
	const queryClient = useQueryClient()
	const { data, isLoading, isError } = useWidgetByIri(id, type)

	useEffect(() => {
		if (!data) return

		const ps = (data.items ?? []).map(async (tile: GridItem) => {
			if (tile?.id && tile?.subType) {
				const useQueryProps = getUseQueryProps(tile.id, tile.subType)
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
	}
}
