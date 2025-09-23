import { ReactNode, useContext, useEffect, useState } from "react"
import { Header } from "./Header"

import classes from "./index.module.css"
import { useLocation } from "react-router-dom"
import cn from "clsx"
import { Overlay } from "../Overlay"
import { DispatchContext, StateContext } from "../../state"
import { InformationTileBody } from "../../pages/Grid/tiles/InformationTile"
import { AboutPage } from "../../pages/About"
import { Actions } from "../../state/actions"

/**
 * Dummy Layout for now, could come in handy later, but if unused, remove it
 */
export function Layout({ children }: { children: ReactNode }) {
	const dispatch = useContext(DispatchContext)
	const { infoItem, infoFromRect, showAboutPage } = useContext(StateContext)
	const location = useLocation()

	const isStaticPage = location.pathname.startsWith("/about")
	const isSub = location.pathname.startsWith("/widget/more")
	const withOverlay = infoItem != null || showAboutPage
	
	const [logoRect, setRect] = useState<DOMRect | undefined>(undefined)
	useEffect(() => {
		const el = document.getElementById("logo")
		if (!el) return undefined
		const rect = el.getBoundingClientRect()
		// rect.width = rect.width / 2
		setRect(rect)
	}, [])

	return (
		<div
			className={cn("container", classes.container, {
				[classes.fullpage]: isStaticPage,
				[classes.isSub]: isSub,
				small: window.innerWidth <= 360,
				medium: window.innerWidth > 640 && window.innerWidth <= 900,
				large: window.innerWidth > 900,
				[classes.withOverlay]: withOverlay,
			})}
		>
			<Header staticPage={isStaticPage} />
			<main>
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
