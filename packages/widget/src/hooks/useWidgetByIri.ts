import { useQuery } from "@tanstack/react-query"
import { widgetHelpers, WidgetType } from "../helpers"
import { defaultMappedData, GridDataState, StateContext } from "../state"
import { useContext } from "react"
import { Bindings, SparqlResult } from "../types"

async function fetchSparqlData(
	query: string,
): Promise<SparqlResult | undefined> {
	try {
		const response = await fetch("/sparql", {
			method: "POST",
			body: query,
			headers: {
				"content-type": "application/sparql-query",
				accept: "application/sparql-results+json",
			},
		})

		if (!response.ok) {
			throw new Error(`SPARQL query failed with status ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		throw new Error("Error executing SPARQL query:" + error)
	}
}

/**
 * Fetch widget data by IRI and type. Every widget type has its own endpoint.
 * Results can be large, so this function only returns raw data.
 */
export async function queryWidgetByIri(iri: string, type: WidgetType) {
	const query = await widgetHelpers.get(type)!.endpoint(iri)
	const data = await fetchSparqlData(query)
	return data?.results.bindings
}

export function useWidgetByIri(
	iri: GridDataState["id"],
	type: GridDataState["type"],
) {
	const { options } = useContext(StateContext)
	const { maxTiles } = options

	return useQuery({
		queryKey: ["widget-by-uri", iri, type],
		queryFn: async () => {
			if (!iri || !type) return Promise.resolve([])
			const result = await queryWidgetByIri(iri, type)
			if (!result) throw new Error("Error fetching widget data")
			return result
		},
		select: (rawData: Bindings) => {
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
		retry: 5,
		retryDelay: 1000,
	})
}
