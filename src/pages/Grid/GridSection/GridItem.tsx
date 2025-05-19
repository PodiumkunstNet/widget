import { GridCategory, type GridItem } from "../../../types/grid"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { Props as GridSectionProps } from "./GridSection"

import classes from "./GridItem.module.css"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { ReactNode } from "react"
import { Page } from "../../../components/Page"

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
			className={cn(classes.gridItem, classes[item.type], className, {
				[classes["flip"]]: item.type === GridCategory.More,
				[classes["turn"]]: item.type === GridCategory.Static,
			})}
			onClick={() => {
				const title = item.key ? `${item.key} ${item.value}` : item.value
				sessionStore.setTitle(item?.id, item.subType, title)

				if (onClick) onClick()
			}}
		>
			{item.type === GridCategory.More && (
				<div className={classes["dog-ear-wrapper"]}>
					<div className={classes["dog-ear-shadow"]} />
					<div className={classes["dog-ear"]}>
						<Page className={classes.backside}>
							<img src="/oostpool.png" />
						</Page>
					</div>
				</div>
			)}
			{
			item.type === GridCategory.Static
				? (
					<div className={classes["turn-wrapper"]}>
						<div className={classes["turner"]}>
							<div className={classes["turn-front"]}>
								{children}
							</div>
							<div className={classes["turn-back"]}>
								<Page className={classes.backside}>
									<img src="/oostpool.png" />
								</Page>
							</div>
						</div>
					</div>
				)
				: children
			}
		</li>
	)
}
