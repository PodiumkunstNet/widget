export const IFRAME_ID = "pk-widget"

export enum SizeValue {
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
	Fill = "Fill",
	Custom = "Custom",
}

export const sizes: Record<SizeValue, [string, string]> = {
	[SizeValue.Small]: ["360px", "240px"],
	[SizeValue.Medium]: ["640px", "480px"],
	[SizeValue.Large]: ["900px", "600px"],
	[SizeValue.Fill]: ["100%", "100%"],
	[SizeValue.Custom]: ["", ""],
}

export enum Orientation {
	Portrait = "Portrait",
	Landscape = "Landscape",
}

export const accessibilityTitle = "Podiumkunst Widget"

export interface State {
	customHeight: string
	customWidth: string
	iri: string
	orientation: Orientation
	size: SizeValue
	primaryColor: string
	secondaryColor: string
	source: string
}

const root = document.documentElement
const primaryColor = getComputedStyle(root)
	.getPropertyValue("--color-primary")
	.trim()
const secondaryColor = getComputedStyle(root)
	.getPropertyValue("--color-secondary")
	.trim()

const _initialState: State = {
	customHeight: "",
	customWidth: "",
	iri: "", /** "http://example.com/pknet/testWorkZF" */
	orientation: Orientation.Landscape,
	size: SizeValue.Medium,
	primaryColor,
	secondaryColor,
	source: "",
}

// Get the initial state from sessionStorage if it exists
// The IFRAME_ID is re-used to use as a unique key
const storedState = sessionStorage.getItem(IFRAME_ID)
export const initialState = storedState
	? JSON.parse(storedState)
	: _initialState
