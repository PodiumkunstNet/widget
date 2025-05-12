import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom"

import { Home } from "./pages/Home"

import ReactQueryProvider from "./Providers/ReactQueryProvider"
import { Layout } from "./components/Layout"

function App() {
	return (
		<ReactQueryProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/widget" element={<Home isSubCategoryView={false} />} />
						<Route path="/widget/more" element={<Home isSubCategoryView={true} />} />
					</Routes>
				</Layout>
			</Router>
		</ReactQueryProvider>
	)
}

export default App
