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
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const gridData = useGridData(state?.options)

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
		const [totalWidth, columnWidth] = getGridSectionSizes(gridData.items, state.options)

		document.documentElement.style.setProperty(
			'--total-size',
			totalWidth + 'px'
		)

		document.documentElement.style.setProperty(
			'--single-size',
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

function getGridSectionSizes(items: GridItem[], options: State['options']) {
	const isPortait = window.innerHeight > window.innerWidth
	let singleSize = 0 // single size is the size of one column in potrait mode and one row in landscape mode
	let totalSize = 0 // total size is the size of the whole grid section

	if (isPortait) {
		const availableColumnSpace = (window.innerWidth - (options.borderWidth * (options.maxColumns + 1)))
		singleSize = availableColumnSpace / options.maxColumns // column width

		const columns = Math.ceil(items.length / options.maxRows)

		totalSize = (singleSize * columns) + (options.borderWidth * (columns + 1))
	} else {
		const availableRowSpace = (window.innerHeight - (options.borderWidth * (options.maxRows + 1)))
		singleSize = availableRowSpace / options.maxRows // row height

		const rows = Math.ceil(items.length / options.maxColumns)

		totalSize = (singleSize * rows) + (options.borderWidth * (rows + 1))
	}

	return [totalSize, singleSize]
}
