import { Tile } from "../types/grid"
import { AppOptions } from "../utils/app-options"

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
			item: Tile | undefined
		}
	}
