import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)

export interface AppOptions {
	pc: string /** primary color */
	sc: string /** secondary color */
}

// Convert app option to CSS variable key
const varByOption = {
	pc: "--color-primary",
	sc: "--color-secondary",
}

/**
 * Add custom CSS variables to the document root based on the options
 */
document.addEventListener("DOMContentLoaded", function () {
	const params = new URLSearchParams(window.location.search)
	const optionsStr = params.get("options")
	const options = JSON.parse(optionsStr || "{}") as AppOptions

	for (const paramKey of ["pc", "sc"] as const) {
		if (!options[paramKey]) continue

		const varKey = varByOption[paramKey]

		document.documentElement.style.setProperty(
			varKey,
			options[paramKey],
		)

		document.documentElement.style.setProperty(
			`${varKey}-rgb`,
			options[paramKey].split(/\(|\)/)[1],
		)
	}
})
