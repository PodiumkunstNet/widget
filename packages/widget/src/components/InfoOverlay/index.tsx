import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { DispatchContext, StateContext } from "../../state"
import { Actions } from "../../state/actions"

import classes from "./index.module.css"
import { InformationTileBody } from "../../pages/Grid/tiles/InformationTile"

const DURATION = 400
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)"

export function InformationOverlay() {
	const { infoItem, infoFromRect } = useContext(StateContext)
	const dispatch = useContext(DispatchContext)

	const sheetRef = useRef<HTMLDivElement>(null)

	// Open animation
	useEffect(() => {
		if (!sheetRef.current || !infoFromRect) return

		sheetRef.current.style.setProperty('--animation-duration', `${DURATION}ms`)

		// Lock body scroll
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"

		const start = {
			top: `${infoFromRect.top}px`,
			left: `${infoFromRect.left}px`,
			width: `${infoFromRect.width}px`,
			height: `${infoFromRect.height}px`,
			borderColor: "rgba(var(--color-current-rgb), 0)",
			boxShadow: "0 0 0 0 rgba(var(--color-black-rgb), 0)",
		} as Keyframe

		const targetRect = getTargetRect()

		const end = {
			top: `${targetRect.top}px`,
			left: `${targetRect.left}px`,
			width: `${targetRect.width}px`,
			height: `${targetRect.height}px`,
			borderColor: "rgba(var(--color-black-rgb), 1)",
			boxShadow: "0 0 0 400px rgba(var(--color-black-rgb), 0.6)",
		} as Keyframe

		const el = sheetRef.current
		// Set initial style to avoid flash
		el.style.top = `${infoFromRect.top}px`
		el.style.left = `${infoFromRect.left}px`
		el.style.width = `${infoFromRect.width}px`
		el.style.height = `${infoFromRect.height}px`
		el.animate([start, end], {
			duration: DURATION,
			easing: EASING,
			fill: "forwards",
		})

		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [infoFromRect])

	const close = () => {
		if (!sheetRef.current) {
			dispatch({ type: Actions.SetInfoItem, payload: { item: undefined } })
			return
		}

		const targetRect = getTargetRect()

		const start = {
			top: `${targetRect.top}px`,
			left: `${targetRect.left}px`,
			width: `${targetRect.width}px`,
			height: `${targetRect.height}px`,
			borderColor: "rgba(var(--color-black-rgb), 1)",
			boxShadow: "0 0 0 400px rgba(var(--color-black-rgb), 0.6)",
		} as Keyframe

		const to = infoFromRect ?? targetRect
		const end = {
			top: `${to.top}px`,
			left: `${to.left}px`,
			width: `${to.width}px`,
			height: `${to.height}px`,
			borderColor: "rgba(var(--color-current-rgb), 0)",
			boxShadow: "0 0 0 0 rgba(var(--color-black-rgb), 0)",
		} as Keyframe

		const el = sheetRef.current
		const anim = el.animate([start, end], {
			duration: DURATION,
			easing: EASING,
			fill: "forwards",
		})
		anim?.finished.finally(() => {
			dispatch({
				type: Actions.SetInfoItem,
				payload: { item: undefined, fromRect: undefined },
			})
		})
	}

	if (!infoItem) return null

	return createPortal(
		<div
			ref={sheetRef}
			className={classes.sheet}
			style={{ top: 0, left: 0, width: 0, height: 0 }}
			onClick={() => {
				if (sheetRef.current?.classList.contains(classes.closing)) return

				close() 
				sheetRef.current?.classList.add(classes.closing)
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<InformationTileBody item={infoItem!} />
			</div>
		</div>,
		document.getElementById("root")?.querySelector(".container")!,
	)
}

// Target layout for the overlay (centered, responsive)
function getTargetRect() {
	const vw = window.innerWidth
	const vh = window.innerHeight
	const width = Math.min(900, vw * 0.95)
	const height = Math.min(900, vh * 0.95)
	const left = (vw - width) / 2
	const top = (vh - height) / 2
	return { top, left, width, height }
}
