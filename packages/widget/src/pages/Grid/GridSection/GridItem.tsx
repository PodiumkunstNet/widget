import { ReactNode } from "react"
import { GridCategory, type GridItem } from "../../../types/grid"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { Props as GridSectionProps } from "./GridSection"

import classes from "./GridItem.module.css"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { TileTurner } from "./TileTurner"
import { Box } from "../../../components/Box"

type Props = Pick<GridSectionProps, "isSubCategoryView"> & {
	item: GridItem
}

export function GridItem({ item, isSubCategoryView = false }: Props) {
	const url = useURL(isSubCategoryView, item)
	const { navigate } = useTransitionNavigate()

	let onClick
	if (item.type !== GridCategory.Static) {
		onClick = () => navigate(url)
	}

	return (
		<GridItemWrapper item={item} onClick={onClick}>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</GridItemWrapper>
	)
}

export function GridItemWrapper({
	children,
	className,
	item,
	onClick,
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
			{
				import.meta.env.DEV &&
				<div className={classes.devPanel} onClick={(ev) => {
					ev.stopPropagation()
					console.log(item)
				}}>
					{item.type}
				</div>
			}
			{ children}
			{/* {item.type === GridCategory.Static ? (
				<TileTurner
					back={
						<Box centerContent>
							<img src="/oostpool.png" style={{ maxHeight: "100%" }} />
						</Box>
					}
					front={<Box centerContent className={classes.staticBox}>{children}</Box>}
				/>
			) : (
				children
			)} */}
		</li>
	)
}

{
	/* {item.type === GridCategory.More && (
				<div className={classes["dog-ear-wrapper"]}>
					<div className={classes["dog-ear-shadow"]} />
					<div className={classes["dog-ear"]}>
						<Page className={classes.backside}>
							<img src="/oostpool.png" />
						</Page>
					</div>
				</div>
			)} */
}
