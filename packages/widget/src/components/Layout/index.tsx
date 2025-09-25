import { ReactNode, useContext, useEffect, useState } from "react"
import { Paginator } from "./Header"

import classes from "./index.module.css"
import { useLocation } from "react-router-dom"
import cn from "clsx"
import { Overlay } from "../Overlay"
import { DispatchContext, GridDataContext, StateContext } from "../../state"
import { InformationTileBody } from "../../pages/Grid/tiles/InformationTile"
import { AboutPage } from "../../pages/About"
import { Actions } from "../../state/actions"
import { Logo } from "./Logo"
import { MainMenu } from "./MainMenu"
import { Heading } from "./Heading"

/**
 * Dummy Layout for now, could come in handy later, but if unused, remove it
 */
export function Layout({ children }: { children: ReactNode }) {
	const dispatch = useContext(DispatchContext)
	const { infoItem, infoFromRect, showAboutPage, options } =
		useContext(StateContext)
	const { id, items, type, title } = useContext(GridDataContext)
	const location = useLocation()

	const isSmall = window.innerWidth <= 240 || window.innerHeight <= 240
	const isMedium =
		(window.innerWidth > 240 && window.innerWidth <= 480) ||
		(window.innerHeight > 240 && window.innerHeight <= 480)
	const isLarge = window.innerWidth > 480 || window.innerHeight > 480

	const isSub = location.pathname.startsWith("/widget/more")
	const withOverlay = infoItem != null || showAboutPage

	const [logoRect, setRect] = useState<DOMRect | undefined>(undefined)
	useEffect(() => {
		const el = document.getElementById("about")
		if (!el) return undefined
		const rect = el.getBoundingClientRect()
		// rect.width = rect.width / 2
		setRect(rect)
	}, [])

	return (
		<div
			className={cn("container", classes.container, {
				[classes.isSub]: isSub,
				small: isSmall,
				medium: !isSmall && isMedium,
				large: !isSmall && !isMedium && isLarge,
				[classes.withOverlay]: withOverlay,
			})}
		>
			<Logo />
			<MainMenu />
			<Heading title={title} id={id} type={type} />
			<Paginator
				id={id}
				pages={
					Math.ceil(items.length / options.maxRows) - options.maxColumns
				}
			/>
			<main className={classes.main}>
				{children}
				<Overlay
					rect={infoFromRect}
					afterClose={() => {
						dispatch({
							type: Actions.SetInfoItem,
							payload: { item: undefined, fromRect: undefined },
						})
					}}
				>
					<InformationTileBody item={infoItem!} />
				</Overlay>
				{showAboutPage && (
					<Overlay
						afterClose={() => {
							dispatch({
								type: Actions.ToggleAboutPage,
							})
						}}
						fade
						rect={logoRect}
					>
						<AboutPage />
					</Overlay>
				)}
			</main>
		</div>
	)
}
