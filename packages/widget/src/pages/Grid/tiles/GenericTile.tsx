import { ReactNode } from "react"

import { TileType, type Tile } from "../../../types/grid"
import cn from "clsx"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"

import { sessionStore } from "../../../hooks/useSessionStorage"

import classes from "./GenericTile.module.css"

// export interface GridSectionProps {
// 	items: Tile[]
// 	isSubCategoryView?: boolean
// 	small?: boolean
// }
export interface Props {
	item: Tile
	isSubCategoryView?: boolean
}

export function GenericTile({ item, isSubCategoryView = false }: Props) {
	const url = useURL(isSubCategoryView, item)
	const { navigate } = useTransitionNavigate()

	let onClick
	if (item.type !== TileType.Static) {
		onClick = () => navigate(url)
	}

	return (
		<TileWrapper item={item} onClick={onClick}>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</TileWrapper>
	)
}

export function TileWrapper({
	children,
	className,
	item,
	onClick,
}: {
	children?: ReactNode
	className?: string
	item: Tile
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
