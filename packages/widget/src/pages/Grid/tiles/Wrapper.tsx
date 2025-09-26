import { ReactNode } from "react"
import clsx from "clsx"

import { sessionStore } from "../../../hooks/useSessionStorage"
import { Tile } from "../../../types/grid"

import classes from "./Wrapper.module.css"

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
			className={clsx(classes.gridItem, classes[item.type], className)}
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