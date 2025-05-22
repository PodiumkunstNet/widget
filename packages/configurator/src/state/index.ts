export const IFRAME_ID = "pk-widget"

export enum SizeValue {
	small = "Small",
	medium = "Medium",
	large = "Large",
	fill = "Fill",
}

export const sizes = {
	[SizeValue.small]: [360, 240],
	[SizeValue.medium]: [640, 480],
	[SizeValue.large]: [900, 600],
	[SizeValue.fill]: ["100%", "100%"],
}

export enum Orientation {
	Portrait = "Portrait",
	Landscape = "Landscape",
}

export const accessibilityTitle = "Podiumkunst Widget"

export interface State {
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
	iri: "", /** "http://example.com/pknet/testWorkZF" */
	orientation: Orientation.Landscape,
	size: SizeValue.medium,
	primaryColor,
	secondaryColor,
	source: "",
}

// Get the initial state from sessionStorage if it exists
const storedState = sessionStorage.getItem(IFRAME_ID)
export const initialState = storedState
	? JSON.parse(storedState)
	: _initialState
