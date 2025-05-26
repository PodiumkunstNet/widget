import { initialState } from "../state"

export interface AppOptions {
	bw: string	// border width
	pc: string	// primary color
	sc: string	// secondary color
	p: string	// number of pages
	mc: string	// max columns
	mr: string	// max rows
	mt: string	// max tiles
	s: 's' | 'm' | 'l' | 'c'
}

// Convert app option to CSS variable key
export const varByOption: Record<keyof AppOptions, string> = {
	bw: "--border-width",
	pc: "--primary-color",
	sc: "--secondary-color",
	p: "--pages",
	mc: "--max-columns",
	mr: "--max-rows",
	mt: "--max-tiles",
	s: "--size"
}

// Make sure to use the state defaults, in order to keep the state
// and the css vars in sync
const optionDefaults: AppOptions = {
	bw: initialState.options.borderWidth.toString(),
	mc: initialState.options.maxColumns.toString(),
	mr: initialState.options.maxRows.toString(),
	mt: initialState.options.maxTiles.toString(), 
	p: initialState.options.pages.toString(),
	pc: initialState.options.primaryColor,
	s: initialState.options.size.slice(0, 1) as AppOptions['s'], 
	sc: initialState.options.secondaryColor,
}

const colorProps: Partial<keyof AppOptions>[] = ['pc', 'sc']
export const numberProps: Partial<keyof AppOptions>[] = ['p', 'mc', 'mr', 'mt']
const pxProps: Partial<keyof AppOptions>[] = ['bw']

function parseValue(key: keyof AppOptions, value: string) {
	if (pxProps.includes(key)) {
		return value + 'px'
	}

	return value
}

/**
 * Add custom CSS variables to the document root based on the options
 */
document.addEventListener("DOMContentLoaded", function () {
	const params = new URLSearchParams(window.location.search)
	const optionsStr = params.get("options")
	const options = JSON.parse(optionsStr || "{}") as AppOptions
	const keys = Object.keys(options) as (keyof AppOptions)[]

	// Set the defaults
	for (const key of Object.keys(optionDefaults) as (keyof AppOptions)[]) {
		document.documentElement.style.setProperty(
			varByOption[key],
			parseValue(key, optionDefaults[key]),
		)
	}

	// Override with the user defined options
	for (const paramKey of keys) {
		if (!options[paramKey]) continue

		const varKey = varByOption[paramKey]

		document.documentElement.style.setProperty(
			varKey,
			parseValue(paramKey, options[paramKey]),
		)

		if (colorProps.includes(paramKey)) {
			document.documentElement.style.setProperty(
				`${varKey}-rgb`,
				options[paramKey].split(/\(|\)/)[1],
			)
		}
	}
})
