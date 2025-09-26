# Add property 

A common workflow will be adding properties of a Work, Agent, etc (see [WidgetType](../packages/widget/src/helpers/index.ts)).

There are some things to consider when adding a property:
- the data should be added by the query, see [queryWidgetByIri](../packages/widget/src/hooks/useWidgetByIri.ts)
- a mapping function should handle the data, see [mapping functions](../packages/widget/src/helpers/index.ts)
- a tile should render the mapped data. There are currently four types of tiles. Static and More use the GenericTile, Information and External link have custom tile implementations.
	- [Static](../packages/widget/src/pages/Grid/tiles/GenericTile.tsx)
	- [More](../packages/widget/src/pages/Grid/tiles/GenericTile.tsx)
	- [Information](../packages/widget/src/pages/Grid/tiles/InformationTile.tsx)
	- [External link](../packages/widget/src/pages/Grid/tiles/ExternalLinkTile.tsx)

	make sure the property is mapped to the right tile in the mapping functions. If the data needs a custom display, create a new tile implementation using the [Wrapper](../packages/widget/src/pages/Grid/tiles/Wrapper.tsx)
