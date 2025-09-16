import { WidgetType } from "../helpers"
import { type InformationTile } from "../pages/Grid/tiles/InformationTile"
import { type GenericTile } from "../pages/Grid/tiles/GenericTile"

export enum TileType {
	/**
	 * An informational tile, usually containing a note or description, when
	 * the user clicks the tile, a modal with the information is shown.
	 * 
	 * The component for rendering the tile is found in {@link InformationTile}
	 */
	Information = "information",

	/**
	 * A tile that links to another resource (see {@link WidgetType}). When 
	 * the user clicks the tile, they are taken to the resource and a new
	 * grid with tiles is shown.
	 * 
	 * The component for rendering the tile is found in {@link GenericTile}
	 */
	More = "more",

	/**
	 * A static tile, usually containing a label and value. There is no
	 * user interaction with this tile.
	 * 
	 * The component for rendering the tile is found in {@link GenericTile}
	 */
	Static = "static",
}

export interface Tile {
	type: TileType
	key: string
	value: string

	id?: string
	note?: string | null
	subType?: WidgetType
	url?: string
	/** Optional: original source JSON key for the value, for debugging/inspection */
	sourceKey?: string
}
