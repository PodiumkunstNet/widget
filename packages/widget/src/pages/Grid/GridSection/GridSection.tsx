import cx from 'clsx'
import { GridCategory, type GridItem } from "../../../types/grid"
import { GridItem as GridItemView } from "./GridItem"

import classes from "./GridSection.module.css"
import { InfoItemView } from "./InfoItem"

export interface Props {
	items: GridItem[]
	isSubCategoryView?: boolean
	small?: boolean
}

export const GridSection = ({
	items,
	isSubCategoryView,
	small = true
}: Props) => {
	return (
		<ul
			className={cx(classes.gridSection, { 
				[classes.isSub]: isSubCategoryView,
				[classes.small]: small,
			})}
		>
			{items.map((item, index) => (
				item.type === GridCategory.Information
				? <InfoItemView
					item={item}
					key={index}
				/>
				: <GridItemView
					item={item}
					isSubCategoryView={isSubCategoryView}
					key={index}
				/>
			))}
		</ul>
	)
}
