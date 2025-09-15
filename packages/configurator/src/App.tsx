import { ReactNode } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mantine/core/styles.css'

import { Layout } from "./Layout"
import { Configure } from "./Configure"
import { Source } from './Source'

const basename = import.meta.env.MODE === 'development' ? '/' : '/configurator'

function App() {
	return (
		<Router basename={basename}>
			<Providers>
				<Layout>
					<Routes>
						<Route path="/" element={<Configure />} />
						<Route path="/validate" element={<Source />} />
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
