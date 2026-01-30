import { useEffect, useState } from "react"
import clsx from "clsx"

import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react"

import { State } from "../../../state"
import { type useGridData } from "../../../useGridData"

import classes from "./index.module.css"

interface Props {
	id: string | undefined

	/**
	 * The number of items that are in a row/column, depending on the orientation
	 * In landscape mode, this is the number of rows (maxRows), in portrait mode,
	 * this is the number of columns (maxColumns)
	 * 
	 * @see {@link useGridData}
	 */
	maxItems: number

	options: State["options"]
}

export function Paginator({ id, maxItems, options }: Props) {
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

	if (maxItems < 1) return null

	const hasPrev = currentPage > 0

	/**
	 * The paginator doesn't move whole pages, but move just one row/column at a time.
	 * So in portrait mode, it moves one row at a time, and in landscape mode, it moves one column at a time.
	 *
	 * Example: landscape mode, maxColumns = 3, maxItems = 7, currentPage can be 0,1,2,3,4
	 * Example: portrait mode, maxRows = 4, maxItems = 10, currentPage can be 0,1,2,3,4,5,6
	 */
	const landscape = window.innerWidth > window.innerHeight
	const hasNext = landscape
		? currentPage < maxItems - options.maxRows
		: currentPage < maxItems - options.maxColumns

	if (hasNext === false && hasPrev === false) return null

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
