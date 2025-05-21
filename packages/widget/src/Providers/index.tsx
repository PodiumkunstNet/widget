import {
	DispatchContext,
	GridDataContext,
	initialState,
	StateContext,
} from "../state"
import { ReactNode, useReducer } from "react"
import { stateReducer } from "../state/reducer"
import { useGridData } from "../pages/useGridData"

export function Providers({ children }: { children: ReactNode }) {
	const gridData = useGridData()
	const [state, dispatch] = useReducer(stateReducer, initialState)

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