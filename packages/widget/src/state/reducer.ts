import { State } from "."
import { Action, Actions } from "./actions"

export function stateReducer(state: State, action: Action): State {
	if (process.env.NODE_ENV === "development")
		console.log("[REDUCER]", action)

	let nextState = state

	switch (action.type) {
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
