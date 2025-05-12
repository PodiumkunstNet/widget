import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom"

import { Grid } from "./pages/Grid"
import { AboutPage } from "./pages/About"

import ReactQueryProvider from "./Providers/ReactQueryProvider"
import { Layout } from "./components/Layout"
import {
	DispatchContext,
	GridDataContext,
	initialState,
	StateContext,
} from "./state"
import { ReactNode, useReducer } from "react"
import { stateReducer } from "./state/reducer"
import { useGridData } from "./pages/useGridData"
import { WidgetSubType } from "./types/mainWidgetData"

function App() {
	return (
		<ReactQueryProvider>
			<Router>
				<Providers>
					<Layout>
						<Routes>
							<Route path="/about" element={<AboutPage />} />
							<Route
								path="/widget"
								element={<Grid isSubCategoryView={false} />}
							/>
							<Route
								path="/widget/more"
								element={<Grid isSubCategoryView={true} />}
							/>
						</Routes>
					</Layout>
				</Providers>
			</Router>
		</ReactQueryProvider>
	)
}

function Providers({ children }: { children: ReactNode }) {
	const [params] = useSearchParams()

	const id = params.get("id")
	const type = params.get("type") as WidgetSubType

	const gridData = useGridData(id, type)
	const [state, dispatch] = useReducer(stateReducer, initialState)

	// TODO store the home URL in the state
	// useEffect(() => {

	// }, [gridData.title])


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

export default App
