import { type AppOptions } from "@widget/utils/app-options"
import {
	accessibilityTitle,
	IFRAME_ID,
	Orientation,
	sizes,
	SizeValue,
	State,
} from "."
import { Action, Actions } from "./actions"
import { WidgetType } from "@widget/helpers"

export function stateReducer(state: State, action: Action): State {
	if (process.env.NODE_ENV === "development") console.log("[REDUCER]", action)

	let nextState = state

	switch (action.type) {
		case Actions.SetIRI: {
			nextState = {
				...nextState,
				iri: action.payload.iri,
			}
			break
		}

		case Actions.SetSize: {
			nextState = {
				...nextState,
				size: action.payload.size,
				customHeight: "",
				customWidth: "",
			}
			break
		}

		case Actions.SetCustomSize: {
			nextState = {
				...nextState,
				customWidth: action.payload.width ?? nextState.customWidth,
				customHeight: action.payload.height ?? nextState.customHeight,
			}
			break
		}

		case Actions.SetOrientation: {
			nextState = {
				...nextState,
				orientation: action.payload.orientation,
			}
			break
		}

		case Actions.SetColor: {
			nextState = {
				...nextState,
				primaryColor: action.payload.primaryColor ?? nextState.primaryColor,
				secondaryColor:
					action.payload.secondaryColor ?? nextState.secondaryColor,
			}
			break
		}

		case Actions.SetGrid: {
			const { maxColumns, maxRows } = action.payload
			nextState = {
				...nextState,
				maxColumns: maxColumns ? Number(maxColumns) : nextState.maxColumns,
				maxRows: maxRows ? Number(maxRows) : nextState.maxRows,
			}
			break
		}

		case Actions.SetBorderWidth: {
			const { borderWidth } = action.payload

			nextState = {
				...nextState,
				borderWidth: borderWidth ? Number(borderWidth) : nextState.borderWidth,
			}
			break
		}

		case Actions.SetMaxTiles: {
			const { maxTiles } = action.payload

			nextState = {
				...nextState,
				maxTiles: maxTiles ? Number(maxTiles) : nextState.maxTiles,
			}
			break
		}

		default:
			throw new Error(`Unknown action type`)
	}

	/**
	 * When the state changes, the source code of the iframe needs to be updated
	 */
	nextState.source = updateSource(nextState)

	sessionStorage.setItem(IFRAME_ID, JSON.stringify(nextState))

	return nextState
}

export function updateSource(state: State) {
	// Construct the options for the iframe
	const options: Partial<AppOptions> = {
		bw: state.borderWidth.toString(),
		mc: state.maxColumns.toString(),
		mr: state.maxRows.toString(),
		pc: state.primaryColor,
		sc: state.secondaryColor,
	}

	// Construct the URL for the iframe
	const origin =
		import.meta.env.MODE === "development"
			? "http://localhost:3001"
			: window.location.origin
	const encodedOptions = encodeURIComponent(JSON.stringify(options))
	const url = `${origin}/widget?id=${state.iri}&type=${WidgetType.Work}&options=${encodedOptions}`

	let width
	let height

	if (state.size === SizeValue.Custom) {
		width = state.customWidth
		height = state.customHeight
	} else {
		;[width, height] =
			state.orientation === Orientation.Landscape
				? sizes[state.size]
				: structuredClone(sizes[state.size]).reverse()
	}

	if (width === "" || height === "") return ""

	// Construct the iframe HTML
	return `<iframe width="${width}" height="${height}" id=${IFRAME_ID} title=${accessibilityTitle} src="${url}" frameborder="0"></iframe>`
}
