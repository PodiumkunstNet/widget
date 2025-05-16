import { createContext, Dispatch } from "react"
import type { Action } from "./actions"
import { GridItem } from "../types/grid"
import { WidgetSubType } from "../types/mainWidgetData"

// Define the shape of the state
export interface State {
	infoItem: GridItem | undefined
}

// Define the initial state
export const initialState: State = {
	infoItem: undefined,
}

// Create the state contexts
export const StateContext = createContext<State>(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(() => {})

export interface MappedData {
	title: string
	items: GridItem[]
}

export const defaultMappedData = {
	title: "",
	items: []
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
