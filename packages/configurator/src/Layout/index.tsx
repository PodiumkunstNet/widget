import { ReactNode } from "react"
import { Header } from "./Header"

import classes from "./index.module.css"
/**
 * Dummy Layout for now, could come in handy later, but if unused, remove it
 */
export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={classes.layout}>
			<Header />
    		<main>
				{children}
			</main>
		</div>
	)
}
