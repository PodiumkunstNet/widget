import { createContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import classes from "./index.module.css"

const DURATION = 400
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)"

type OverlayContextValue = { close: () => void }
export const OverlayContext = createContext<OverlayContextValue>({ close: () => {} })

export function Overlay(
	{
		afterClose,
		closeOnClick = false,
		fade = false,
		rect,
		children
	}: {
		afterClose: () => void
		closeOnClick?: boolean
		fade?: boolean
		rect?: { top: number; left: number; width: number; height: number }
		children: React.ReactNode
	}
) {

	const sheetRef = useRef<HTMLDivElement>(null)

	// Open animation
	useEffect(() => {
		if (!sheetRef.current || !rect) return

		sheetRef.current.style.setProperty(
			"--animation-duration",
			`${DURATION}ms`,
		)

		// Lock body scroll
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"

		const start = {
			top: `${rect.top}px`,
			left: `${rect.left}px`,
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			borderColor: "rgba(var(--color-current-rgb), 0)",
			boxShadow: "0 0 0 0 rgba(var(--color-black-rgb), 0)",
			opacity: fade ? 0 : 1,
		} as Keyframe

		const targetRect = getTargetRect()

		const end = {
			top: `${targetRect.top}px`,
			left: `${targetRect.left}px`,
			width: `${targetRect.width}px`,
			height: `${targetRect.height}px`,
			borderColor: "rgba(var(--color-black-rgb), 1)",
			boxShadow: "0 0 0 100vw rgba(var(--color-black-rgb), 0.6)",
			opacity: 1,
		} as Keyframe

		const el = sheetRef.current
		// Set initial style to avoid flash
		el.style.top = `${rect.top}px`
		el.style.left = `${rect.left}px`
		el.style.width = `${rect.width}px`
		el.style.height = `${rect.height}px`
		el.animate([start, end], {
			duration: DURATION,
			easing: EASING,
			fill: "forwards",
		})

		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [rect])

	const close = () => {
		console.log('close overlay', sheetRef.current)
		if (!sheetRef.current) return afterClose()
		// 	dispatch({ type: Actions.SetInfoItem, payload: { item: undefined } })
		// 	return
		// }

		const targetRect = getTargetRect()

		const start = {
			top: `${targetRect.top}px`,
			left: `${targetRect.left}px`,
			width: `${targetRect.width}px`,
			height: `${targetRect.height}px`,
			borderColor: "rgba(var(--color-black-rgb), 1)",
			boxShadow: "0 0 0 100vw rgba(var(--color-black-rgb), 0.6)",
			opacity: fade ? 1 : 1,
		} as Keyframe

		const to = rect ?? targetRect
		const end = {
			top: `${to.top}px`,
			left: `${to.left}px`,
			width: `${to.width}px`,
			height: `${to.height}px`,
			borderColor: "rgba(var(--color-current-rgb), 0)",
			boxShadow: "0 0 0 0 rgba(var(--color-black-rgb), 0)",
			opacity: fade ? 0 : 1,
		} as Keyframe

		const el = sheetRef.current
		const anim = el.animate([start, end], {
			duration: DURATION,
			easing: EASING,
			fill: "forwards",
		})
		anim?.finished.finally(afterClose)
	}

	if (!rect) return null

	return createPortal(
		<div
			ref={sheetRef}
			className={classes.sheet}
			style={{ top: 0, left: 0, width: 0, height: 0 }}
			onClick={() => {
				if (sheetRef.current?.classList.contains(classes.closing)) return

				if (closeOnClick) close()
				sheetRef.current?.classList.add(classes.closing)
			}}
		>
			<OverlayContext.Provider value={{ close }}>
				<div
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					{children}
				</div>
			</OverlayContext.Provider>
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
