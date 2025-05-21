import { ReactNode } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import { Layout } from "./Layout"
import { Configure } from "./Configure"

const basename = import.meta.env.MODE === 'development' ? '/' : '/configurator'

function App() {
	return (
		<Router basename={basename}>
			<Providers>
				<Layout>
					<Routes>
						<Route path="/" element={<Configure />} />
					</Routes>
				</Layout>
			</Providers>
		</Router>
	)
}

function Providers({ children }: { children: ReactNode }) {

	return (
		<MantineProvider>
			{children}
		</MantineProvider>
	)
}

export default App
