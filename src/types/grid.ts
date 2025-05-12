import { WidgetSubType } from "./mainWidgetData"

export enum GridCategory {
  Information = 'information',
  More = 'more',
  Static = 'static'

//   Website = 'website',
}

export interface GridItem {
	key: string
	value?: string | null
	type: GridCategory
	id?: string
	note?: string | null
	subType?: WidgetSubType
	url?: string
}
