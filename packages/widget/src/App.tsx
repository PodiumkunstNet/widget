import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Grid } from "./pages/Grid"
import { AboutPage } from "./pages/About"

import ReactQueryProvider from "./Providers/ReactQueryProvider"
import { Layout } from "./components/Layout"
import { Providers } from "./Providers"

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

export default App
