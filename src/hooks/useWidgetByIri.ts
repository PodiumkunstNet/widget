import axiosClient from "../utils/axios"
import { useQuery } from "@tanstack/react-query"
import { endpointsBySubType, mappingFunctionBySubType, WidgetSubType } from "../types/mainWidgetData"
import { defaultMappedData, GridDataState } from "../state"

const MAX_ITEMS = 12

/**
 * Fetch widget data by IRI and type. Every widget type has its own endpoint. 
 * Results can be large, so this function only returns raw data.
 */
export async function queryWidgetByIri(iri: string, type: WidgetSubType) {
	const endpoint = endpointsBySubType[type](iri)
	const response = await axiosClient.get(endpoint)
	return response.data
}

export function useWidgetByIri(
	iri: GridDataState["id"],
	type: GridDataState["type"]
) {
	return useQuery({
		...getUseQueryProps(iri, type),
		retry: 5,
		retryDelay: 1000,
	})
}

export function getUseQueryProps(
	iri: GridDataState["id"],
	type: GridDataState["type"]
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
			if (rawData?.length > MAX_ITEMS) {
				console.warn(
					`Grid items exceed maximum limit, truncating ${rawData?.length} to`,
					MAX_ITEMS,
				)
			}

			/**
			 * Every widget type has its own mapping function. Because the raw data
			 * can be large (10.000+ items), the mapping is done after the data is
			 * sliced to the maximum number of items.
			 */
			const mappingFunction = mappingFunctionBySubType[type]
			const slicedData = rawData.slice(0, MAX_ITEMS)
			const data = mappingFunction(slicedData)
			if (data.error) throw new Error("Error mapping widget data")

			return data.mappedData ?? defaultMappedData
		},
		staleTime: 60 * 60 * 24 * 1000, // 1 day
	}
}
