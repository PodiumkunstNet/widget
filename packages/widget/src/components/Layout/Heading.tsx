import { sessionStore } from "../../hooks/useSessionStorage"
import { GridDataState } from "../../state"

import classes from "./Header.module.css"

export function Heading({
	title, id, type
}: Pick<GridDataState, "title" | "id" | "type">) {
	const savedTitle = sessionStore.getTitle(id, type)
	const homeURL = sessionStore.getHomeURL()
	const isSubCategoryView = location.pathname + location.search !== homeURL

	return (
		<section id="heading" className={classes.h2Container}>
			<h2>
				{savedTitle && isSubCategoryView ? (
					<span>{savedTitle}</span>
				) : (
					<span>
						<span className={classes.dimmed}>meer over</span> {title}
					</span>
				)}
			</h2>
		</section>
	)
}
