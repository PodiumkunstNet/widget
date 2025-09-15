import { createContext, Dispatch } from "react"
import type { Action } from "./actions"
import { GridItem } from "../types/grid"
import { WidgetSubType } from "../helpers"

// Define the shape of the state
export interface State {
	infoItem: GridItem | undefined
	currentPage: number

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
	infoItem: undefined,
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
	items: GridItem[]
}

export const defaultMappedData: MappedData = {
	title: "",
	items: [],
}

export interface GridDataState extends MappedData {
	isLoading: boolean
	isError: boolean
	id: string | undefined
	type: WidgetSubType | undefined
}

const initialGridDataState: GridDataState = {
	isLoading: false,
	isError: false,
	id: undefined,
	type: undefined,
	...defaultMappedData
}

export const GridDataContext = createContext<GridDataState>(initialGridDataState)
