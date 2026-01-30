/**
 * WidgetType represents the different types of data widgets that can be displayed. Some widgets
 * represent single entities (like an Agent or a Work), while others represent collections of
 * entities (like Works for an Agent, or Works in a Category).
 *
 * - The enum string values are the canonical, serialized representation used in URLs (query params) and JSON.
 * - Keep this in sync with 
 * 	- `ensureWidgetType` in the configurator (string-to-enum parsing)
 * 	- `mappers` in the widget for mapping raw data to structured data
 * 	- `endpoints` in the widget for SPARQL endpoints
 */
export enum WidgetType {
	/**
	 * Data about a single Agent (person or organization).
	 *
	 * Example: Mozart, or the New York Philharmonic.
	 * Mapping: {@link mapAgentData}
	 */
	Agent = "agent",

	/**
	 * Data about a single Work.
	 *
	 * Example: The Magic Flute, Symphony No. 41.
	 * Mapping: {@link mapWorkData}
	 */
	Work = "work",

	/**
	 * A collection of Works associated with a given Agent.
	 *
	 * Example: All works composed by Mozart.
	 * Mapping: {@link mapWorkForAgentData}
	 */
	WorksForAgent = "worksForAgent",

	/**
	 * A collection of Works grouped by a Category.
	 *
	 * Example: All works in the "muziekwerk" category.
	 * Mapping: {@link mapCategoryData}
	 */
	Category = "category",

	/**
	 * Manifestations of a Work.
	 *
	 * Example: All manifestations of "The Magic Flute".
	 * Mapping: {@link mapManifistationData}
	 */
	Manifestation = "manifestations",
}