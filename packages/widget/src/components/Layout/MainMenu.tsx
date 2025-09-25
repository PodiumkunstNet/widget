import { useContext } from "react"
import { DispatchContext } from "../../state"
import { Actions } from "../../state/actions"

import classes from "./Header/index.module.css"

export function MainMenu() {
	const dispatch = useContext(DispatchContext)
	return (
		<nav id="main-menu" className={classes.mainmenu}>
			<ul>
				<li className={classes.menuItem}>
					<button
						id="about"
						onClick={() =>
							dispatch({
								type: Actions.ToggleAboutPage,
							})
						}
					>
						Over ons
					</button>
				</li>
			</ul>
		</nav>
	)
}