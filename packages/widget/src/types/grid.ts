import { WidgetSubType } from "./mainWidgetData"

export enum GridCategory {
  Information = 'information',
  More = 'more',
  Static = 'static'

//   Website = 'website',
}

export interface GridItem {
	key: string
	value?: string
	type: GridCategory
	id?: string
	note?: string | null
	subType?: WidgetSubType
	url?: string
	/** Optional: original source JSON key for the value, for debugging/inspection */
	sourceKey?: string
}
