import { GridCategory, type GridItem } from "../../../types/grid"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { Props as GridSectionProps } from "./GridSection"

import classes from "./GridItem.module.css"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { ReactNode } from "react"

type Props = Pick<GridSectionProps, "isSubCategoryView"> & {
	item: GridItem
}

export function GridItem({ item, isSubCategoryView }: Props) {
	const url = useURL(isSubCategoryView, item)
	const { navigate } = useTransitionNavigate()

	let onClick
	if (item.type !== GridCategory.Static) {
		onClick = () => navigate(url)
	}

	return (
		<GridItemWrapper
			item={item}
			onClick={onClick}
		>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</GridItemWrapper>
	)
}

export function GridItemWrapper({
	children,
	className,
	item,
	onClick
}: {
	children?: ReactNode
	className?: string
	item: GridItem
	onClick?: () => void
}) {
	return (
		<li
			className={cn(classes.gridItem, classes[item.type], className)}
			onClick={() => {
				const title = item.key ? `${item.key} ${item.value}` : item.value
				sessionStore.setTitle(item?.id, item.subType, title)

				if (onClick) onClick()
			}}
		>
			{children}
		</li>
	)
}