import { GridItem } from "../types/grid"

export enum Actions {
	SetInfoItem = "SET_INFO_ITEM",
}

export type Action =
	| {
		type: Actions.SetInfoItem
		payload: {
			item: GridItem | undefined
		}
	}
