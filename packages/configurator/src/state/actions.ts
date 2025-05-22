import { Orientation, SizeValue } from "."

export enum Actions {
	SetColor = "SET_COLOR",
	SetIRI = "SET_IRI",
	SetOrientation = "SET_ORIENTATION",
	SetSize = "SET_SIZE",
	SetCustomSize = "SET_CUSTOM_SIZE",
}

export type Action =
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
