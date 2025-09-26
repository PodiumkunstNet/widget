import { ReactNode, useReducer } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mantine/core/styles.css'

import { Layout } from "./Layout"
import { Configure } from "./Configure"
import { Source } from './Source'
import { stateReducer } from "./state/reducer"
import { initialState } from "./state"

const basename = import.meta.env.MODE === 'development' ? '/' : '/configurator'

function App() {
	const [state, dispatch] = useReducer(stateReducer, initialState)
	return (
		<Router basename={basename}>
			<Providers>
				<Layout>
					<Routes>
						<Route path="/" element={<Configure state={state} dispatch={dispatch} />} />
						<Route path="/validate" element={<Source state={state} />} />
					</Routes>
				</Layout>
			</Providers>
		</Router>
	)
}

const queryClient = new QueryClient()

function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				{children}
			</MantineProvider>
		</QueryClientProvider>
	)
}

export default App
