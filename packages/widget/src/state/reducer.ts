import { State } from "."
import { AppOptions, numberProps, varByOption } from "../utils/app-options"
import { Action, Actions } from "./actions"

export function stateReducer(state: State, action: Action): State {
	if (process.env.NODE_ENV === "development")
		console.log("[REDUCER]", action)

	let nextState = state

	switch (action.type) {
		case Actions.Init: {
			console.log(
				"Init reducer",
				action.payload,
				convertOptionsToState(action.payload),
			)
			nextState = {
				...nextState,
				options: {
					...nextState.options,
					...convertOptionsToState(action.payload),
				}
			}
			break
		}
		case Actions.SetInfoItem: {
			nextState = {
				...nextState,
				infoItem: action.payload.item
			}	
			break
		}

		default:
			throw new Error(`Unknown action type`)
	}

	return nextState
}

function convertOptionsToState(options: AppOptions) {
	const keys = Object.keys(options) as (keyof AppOptions)[]

	return keys.reduce((acc, key) => {
		const cssVarName = varByOption[key]
		const splitted = cssVarName.split('-')
		const stateKey = splitted[2] + splitted[3][0].toUpperCase() + splitted[3].slice(1) as keyof State['options']

		const value = options[key]
		// @ts-ignore
		acc[stateKey] = numberProps.includes(key) ? Number(value) : value

		return acc
	}, {} as State["options"])
}