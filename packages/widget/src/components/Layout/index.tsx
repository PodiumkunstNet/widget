import { ReactNode, useContext } from "react"
import { useLocation } from "react-router-dom"
import clsx from "clsx"

import { DispatchContext, GridDataContext, StateContext } from "../../state"
import { InformationTileBody } from "../../pages/Grid/tiles/InformationTile"
// import { AboutPage } from "../../pages/About"
import { Actions } from "../../state/actions"
import { Overlay } from "../Overlay"

import { Paginator } from "./Paginator"
import { Logo } from "./Logo"
import { MainMenu } from "./MainMenu"
import { Heading } from "./Heading"

import classes from "./index.module.css"

/**
 * Dummy Layout for now, could come in handy later, but if unused, remove it
 */
export function Layout({ children }: { children: ReactNode }) {
	const dispatch = useContext(DispatchContext)
	const { infoItem, infoFromRect, showAboutPage, options } = useContext(StateContext)
	const { id, type, title, maxItems } = useContext(GridDataContext)
	const location = useLocation()

	const isSmall = window.innerWidth <= 240 || window.innerHeight <= 240
	const isMedium =
		(window.innerWidth > 240 && window.innerWidth <= 480) ||
		(window.innerHeight > 240 && window.innerHeight <= 480)
	const isLarge = window.innerWidth > 480 || window.innerHeight > 480

	const isSub = location.pathname.startsWith("/widget/more")
	const withOverlay = infoItem != null || showAboutPage

	// const [logoRect, setRect] = useState<DOMRect | undefined>(undefined)
	// useEffect(() => {
	// 	const el = document.getElementById("about")
	// 	if (!el) return undefined
	// 	const rect = el.getBoundingClientRect()
	// 	setRect(rect)
	// }, [])

	return (
		<div
			className={clsx("container", classes.container, {
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
			<Paginator id={id} maxItems={maxItems} options={options} />
			<main className={classes.main}>
				{children}
				<Overlay
					rect={infoFromRect}
					closeOnClick
					afterClose={() => {
						dispatch({
							type: Actions.SetInfoItem,
							payload: { item: undefined, fromRect: undefined },
						})
					}}
				>
					<InformationTileBody item={infoItem!} />
				</Overlay>
				{/* {showAboutPage && (
					<Overlay
						afterClose={() => {
							dispatch({
								type: Actions.ToggleAboutPage,
							})
						}}
						closeOnClick
						fade
						rect={logoRect}
					>
						<AboutPage />
					</Overlay>
				)} */}
			</main>
		</div>
	)
}
