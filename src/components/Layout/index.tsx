import { ReactNode } from "react"
import { Header } from "./Header"

import classes from "./index.module.css"
import { useLocation } from "react-router-dom"
import { cn } from "../../utils/cn"

/**
 * Dummy Layout for now, could come in handy later, but if unused, remove it
 */
export function Layout({ children }: { children: ReactNode }) {
	const location = useLocation()

	const isStaticPage = location.pathname.startsWith("/about")
	const isSub = location.pathname.startsWith("/widget/more")

	return (
		<div className={cn(
			classes.container,
			{ [classes.fullpage]: isStaticPage },
			{ [classes.isSub]: isSub },
		)}>
			<Header staticPage={isStaticPage} />
    		<main>
				{children}
			</main>
		</div>
	)
}
