import { createContext, Dispatch } from "react"
import type { Action } from "./actions"
import { GridItem } from "../types/grid"

// Define the shape of the state
export interface State {
	infoItem: GridItem | undefined
}

// Define the initial state
export const initialState: State = {
	infoItem: undefined,
}

// Create the contexts
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
}

const initialGridDataState: GridDataState = {
	isLoading: false,
	isError: false,
	...defaultMappedData
}

export const GridDataContext = createContext<GridDataState>(initialGridDataState)
