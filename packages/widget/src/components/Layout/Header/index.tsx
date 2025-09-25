import { useEffect, useState } from "react"
import clsx from "clsx"

import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react"

import classes from "./index.module.css"

export function Paginator({ id, pages }: { id: string | undefined; pages: number }) {
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		setCurrentPage(0)
	}, [id])

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--current-page",
			currentPage.toString(),
		)
	}, [currentPage])

	if (pages < 1) return null

	const hasPrev = currentPage > 0
	const hasNext = currentPage < pages

	return (
		<>
			<button
				id="prev"
				className={clsx(classes.button, classes.prev, {
					[classes.disabled]: !hasPrev,
				})}
				onClick={() => {
					if (!hasPrev) return
					setCurrentPage((p) => p - 1)
				}}
			>
				<IconCaretLeftFilled
					size={18}
					color={hasPrev ? "white" : "rgba(255, 255, 255, 0.33)"}
				/>
				<span className={classes.label}>prev</span>
			</button>
			<button
				id="next"
				className={clsx(classes.button, classes.next, {
					[classes.disabled]: !hasNext,
				})}
				onClick={() => {
					if (!hasNext) return
					setCurrentPage((p) => p + 1)
				}}
			>
				<span className={classes.label}>next</span>
				<IconCaretRightFilled
					size={18}
					color={hasNext ? "white" : "rgba(255, 255, 255, 0.33)"}
				/>
			</button>
		</>
	)
}
