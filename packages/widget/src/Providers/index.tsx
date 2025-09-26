import {
	DispatchContext,
	GridDataContext,
	initialState,
	StateContext,
} from "../state"
import { ReactNode, useReducer } from "react"
import { stateReducer } from "../state/reducer"
import { useInitAppOptions } from "../hooks/useInitAppOptions"
import { useGridData } from "../hooks/useGridData"

export function Providers({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(stateReducer, initialState)

	useInitAppOptions(dispatch)
	const gridData = useGridData(state?.options)

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>
				<GridDataContext.Provider value={gridData}>
					{children}
				</GridDataContext.Provider>
			</StateContext.Provider>
		</DispatchContext.Provider>
	)
}
