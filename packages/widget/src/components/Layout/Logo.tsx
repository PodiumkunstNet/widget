import clsx from "clsx"
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate"
import { sessionStore } from "../../hooks/useSessionStorage"

import classes from "./Header.module.css"

export function Logo() {
	const { navigate } = useTransitionNavigate()
	const homeURL = sessionStore.getHomeURL()
	const isSubCategoryView = location.pathname + location.search !== homeURL
	return (
		<button
			className={clsx(classes.logo, {
				[classes.isLink]: isSubCategoryView,
			})}
			id="logo"
			onClick={() => {
				if (!isSubCategoryView || homeURL == null) return
				navigate(homeURL)
			}}
		>
			<img src="/PodiumkunstLogo-Large.png" alt="Podiumkunst.net logo" />
			{/* <img src="/PodiumkunstLogo-Compact-White.png" alt="Podiumkunst.net logo" /> */}
		</button>
	)
}
