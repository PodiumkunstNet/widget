import { useQuery } from "@tanstack/react-query"
import { mappers } from "./mappers"
import { defaultMappedData, GridDataState, StateContext } from "../state"
import { useContext } from "react"
import { Bindings, SparqlResult } from "../types"
import { WidgetType } from "../types/widget"
import { importQueryMap } from "./queries"

/**
 * Fetch SPARQL data from the endpoint. 
 */
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
 * Fetch widget data by IRI and type. Every widget type has its own query.
 * Results can be large, so this function only returns raw data.
 * 
 * Exported because used in configurator as well.
 */
export async function queryWidgetByIri(iri: string, type: WidgetType) {
	const importQuery = importQueryMap[type]
	const query = await importQuery(iri)
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

			const mappingFn = mappers[type]
			const mappedData = mappingFn(slicedData)
			if (!mappedData) throw new Error("Error mapping widget data")

			return mappedData ?? defaultMappedData
		},
		staleTime: 60 * 60 * 24 * 1000, // 1 day
		retry: 5,
		retryDelay: 1000,
	})
}
