import { Orientation, SizeValue } from "."

export enum Actions {
	SetBorderWidth = "SET_BORDER_WIDTH",
	SetColor = "SET_COLOR",
	SetCustomSize = "SET_CUSTOM_SIZE",
	SetGrid = "SET_GRID",
	SetIRI = "SET_IRI",
	SetMaxTiles = "SET_MAX_TILES",
	SetOrientation = "SET_ORIENTATION",
	SetSize = "SET_SIZE",
}

export type Action =
	| {
		type: Actions.SetBorderWidth
		payload: {
			borderWidth: number | string
		}
	}
	| {
		type: Actions.SetIRI
		payload: {
			iri: string
		}
	}
	| {
		type: Actions.SetSize
		payload: {
			size: SizeValue
		}
	}
	| {
		type: Actions.SetCustomSize
		payload: {
			width?: string
			height?: string
		}
	}
	| {
		type: Actions.SetGrid
		payload: {
			maxColumns?: number | string
			maxRows?: number | string
		}
	}
	| {
		type: Actions.SetOrientation
		payload: {
			orientation: Orientation
		}
	}
	| {
		type: Actions.SetColor
		payload: {
			primaryColor?: string
			secondaryColor?: string
		}
	}
	| {
		type: Actions.SetMaxTiles
		payload: {
			maxTiles: number | string
		}
	}

