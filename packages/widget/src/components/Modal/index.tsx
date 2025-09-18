import { ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"

import classes from "./index.module.css"

export function Modal({
	open,
	onClose,
	children,
	closeOnEsc = true,
	closeOnBackdrop = true,
	container,
}: {
	open: boolean
	onClose: () => void
	children: ReactNode
	closeOnEsc?: boolean
	closeOnBackdrop?: boolean
	container?: HTMLElement | null
}) {
	if (!open) return null

	useEffect(() => {
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [])

	useEffect(() => {
		if (!closeOnEsc) return
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", onKey)
		return () => document.removeEventListener("keydown", onKey)
	}, [closeOnEsc, onClose])

	const backdropClass = container ? classes.backdropScoped : classes.backdrop

	return createPortal(
		<div
			role="dialog"
			aria-modal="true"
			className={backdropClass}
			onClick={closeOnBackdrop ? onClose : undefined}
		>
			<div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		container ?? document.body,
	)
}
