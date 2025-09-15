import axiosClient from "../utils/axios"
import { useQuery } from "@tanstack/react-query"
import { widgetHelpers, WidgetType } from "../helpers"
import { defaultMappedData, GridDataState, State, StateContext } from "../state"
import { useContext } from "react"

/**
 * Fetch widget data by IRI and type. Every widget type has its own endpoint. 
 * Results can be large, so this function only returns raw data.
 */
export async function queryWidgetByIri(iri: string, type: WidgetType) {
	const helper = widgetHelpers.get(type)
	const endpoint = helper?.endpoint(iri)
	if (!endpoint) return { mappedData: null, error: true }
	const response = await axiosClient.get(endpoint)
	return response.data
}

export function useWidgetByIri(
	iri: GridDataState["id"],
	type: GridDataState["type"]
) {
	const { options } = useContext(StateContext)

	return useQuery({
		...getUseQueryProps(iri, type, options.maxTiles),
		retry: 5,
		retryDelay: 1000,
	})
}

export function getUseQueryProps(
	iri: GridDataState["id"],
	type: GridDataState["type"],
	maxTiles: State["options"]["maxTiles"]
) {
	const queryFn = async () => {
		if (!iri || !type) return Promise.resolve({ title: "", items: [] })

		const result = await queryWidgetByIri(iri, type)
		if (result.error) {
			throw new Error("Error fetching widget data")
		}
		return result
	}

	return {
		queryKey: ["widget-by-uri", iri, type],
		queryFn,
		select: (rawData: any[]) => {
			if (type == null) return defaultMappedData

			/**
			 * Warn if the number of items exceeds the maximum limit, in order
			 * to draw attention to possible slow queries and 'lost' data.
			 */
			if (rawData?.length > maxTiles) {
				console.warn(
					`Grid items exceed maximum limit, truncating ${rawData?.length} to`,
					maxTiles,
				)
			}

			/**
			 * Every widget type has its own mapping function. Because the raw data
			 * can be large (10.000+ items), the mapping is done after the data is
			 * sliced to the maximum number of items.
			 */
			const slicedData = rawData.slice(0, maxTiles)

			const helper = widgetHelpers.get(type)
			if (!helper) return defaultMappedData

			const data = helper.mappingFunction(slicedData)
			if (data.error) throw new Error("Error mapping widget data")

			return data.mappedData ?? defaultMappedData
		},
		staleTime: 60 * 60 * 24 * 1000, // 1 day
	}
}
