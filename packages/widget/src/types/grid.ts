import { WidgetType } from "../helpers"

export enum GridCategory {
  Information = 'information',
  More = 'more',
  Static = 'static'

//   Website = 'website',
}

export interface GridItem {
	type: GridCategory
	key: string
	value: string

	id?: string
	note?: string | null
	subType?: WidgetType
	url?: string
	/** Optional: original source JSON key for the value, for debugging/inspection */
	sourceKey?: string
}
