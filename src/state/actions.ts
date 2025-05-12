import { GridItem } from "../types/grid"

export enum Actions {
	SetInfoItem,
}

export type Action =
	| {
		type: Actions.SetInfoItem
		payload: {
			item: GridItem | undefined
		}
	}
