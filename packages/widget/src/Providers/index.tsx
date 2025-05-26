import {
	DispatchContext,
	GridDataContext,
	initialState,
	State,
	StateContext,
} from "../state"
import { ReactNode, useEffect, useReducer } from "react"
import { stateReducer } from "../state/reducer"
import { useGridData } from "../pages/useGridData"
import { AppOptions } from "../utils/app-options"
import { Actions } from "../state/actions"
import { GridItem } from "../types/grid"

export function Providers({ children }: { children: ReactNode }) {
	const gridData = useGridData()
	const [state, dispatch] = useReducer(stateReducer, initialState)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const optionsStr = params.get("options")
		const payload = JSON.parse(optionsStr || "{}") as AppOptions

		dispatch({
			type: Actions.Init,
			payload
		})

	}, [])

	useEffect(() => {
		const [totalWidth, columnWidth] = getGridSectionWidth(gridData.items, state.options)

		document.documentElement.style.setProperty(
			'--grid-width',
			totalWidth + 'px'
		)

		document.documentElement.style.setProperty(
			'--column-width',
			columnWidth + 'px'
		)
	}, [state.options, gridData.items])

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

function getGridSectionWidth(items: GridItem[], options: State['options']) {
	const availableColumnSpace = (window.innerWidth - (options.borderWidth * (options.maxColumns + 1)))
	const columnWidth = availableColumnSpace / options.maxColumns

	// Calc the number of columns, there are ROW_COUNT rows
	const columns = Math.ceil(items.length / options.maxRows)

	return [(columnWidth * columns) + (options.borderWidth * (columns + 1)), columnWidth]

}
