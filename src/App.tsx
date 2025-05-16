import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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

export default App
