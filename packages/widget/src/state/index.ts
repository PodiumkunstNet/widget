import { createContext, Dispatch } from "react"
import type { Action } from "./actions"
import { Tile } from "../types/grid"
import { WidgetType } from "../helpers"

// Define the shape of the state
export interface State {
	infoItem: Tile | undefined
	/** Viewport-relative rect to animate from when opening info overlay */
	infoFromRect?: { top: number; left: number; width: number; height: number } | undefined
	currentPage: number

	showAboutPage: boolean

	// Sync options with AppOptions in utils/set-options.ts
	options: {
		borderWidth: number
		maxColumns: number
		maxRows: number
		maxTiles: number
		pages: number
		primaryColor: string
		secondaryColor: string
		size: string
	}
}

// Define the initial state
export const initialState: State = {
	showAboutPage: false,
	infoItem: undefined,
	infoFromRect: undefined,
	currentPage: 2,
	options: {
		borderWidth: 2,
		maxColumns: 2,
		maxRows: 2,
		maxTiles: 12,
		pages: 1,
		primaryColor: "rgb(199, 80, 0)",
		secondaryColor: "rgb(5, 53, 255)",
		size: 'medium',
	}
}

// Create the state contexts
export const StateContext = createContext<State>(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(() => {})

export interface MappedData {
	title: string
	items: Tile[]
}

export const defaultMappedData: MappedData = {
	title: "",
	items: [],
}

export interface GridDataState extends MappedData {
	isLoading: boolean
	isError: boolean
	id: string | undefined
	maxItems: number
	type: WidgetType | undefined
}

const initialGridDataState: GridDataState = {
	isLoading: false,
	isError: false,
	id: undefined,
	maxItems: 0,
	type: undefined,
	...defaultMappedData
}

export const GridDataContext = createContext<GridDataState>(initialGridDataState)
