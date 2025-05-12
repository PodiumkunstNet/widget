import { type GridItem } from "../../../types/grid"
import { GridItem as GridItemView } from "./GridItem"

import classes from "./GridSection.module.css"

export interface Props {
	items: GridItem[]
	isSubCategoryView?: boolean
}

export const GridSection = ({
	items,
	isSubCategoryView,
}: Props) => {
	return (
		<ul className={classes.gridSection}>
			{items.map((item, index) => (
				<GridItemView
					item={item}
					isSubCategoryView={isSubCategoryView}
					key={index}
				/>
			))}
		</ul>
	)
}
