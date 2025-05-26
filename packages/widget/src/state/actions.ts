import { GridItem } from "../types/grid"
import { AppOptions } from "../utils/set-options"

export enum Actions {
	Init = "INIT",
	SetInfoItem = "SET_INFO_ITEM",
}

export type Action =
	| {
		type: Actions.Init
		payload: AppOptions
	}
	| {
		type: Actions.SetInfoItem
		payload: {
			item: GridItem | undefined
		}
	}
