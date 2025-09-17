import { useContext, useEffect, useMemo, useRef } from "react"
import { createPortal } from "react-dom"

import { DispatchContext, StateContext } from "../../state"
import { Actions } from "../../state/actions"
import { Page } from "../Page"
import { Paragraph } from "../Paragraph"
import gridClasses from "../../pages/Grid/tiles/GenericTile.module.css"

import classes from "./index.module.css"

const DURATION = 400
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)"

export function InfoOverlay() {
  const { infoItem, infoFromRect } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const sheetRef = useRef<HTMLDivElement>(null)

  const open = !!infoItem

  // Target layout for the overlay (centered, responsive)
  const targetRect = useMemo(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const maxW = Math.min(900, vw * 0.9)
    const maxH = Math.min(900, vh * 0.8)
    const width = Math.min(maxW, vw - 32)
    const height = Math.min(maxH, vh - 32)
    const left = (vw - width) / 2
    const top = (vh - height) / 2
    return { top, left, width, height }
  }, [open])

  // Open animation
  useEffect(() => {
    if (!open || !sheetRef.current || !infoFromRect) return

    // Lock body scroll
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const start = {
      top: `${infoFromRect.top}px`,
      left: `${infoFromRect.left}px`,
      width: `${infoFromRect.width}px`,
      height: `${infoFromRect.height}px`,
      borderColor: "rgba(var(--color-current-rgb), 0)",
    } as Keyframe

    const end = {
      top: `${targetRect.top}px`,
      left: `${targetRect.left}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
      borderColor: "rgba(var(--color-current-rgb), 1)",
    } as Keyframe

    const el = sheetRef.current
    // Set initial style to avoid flash
    el.style.top = `${infoFromRect.top}px`
    el.style.left = `${infoFromRect.left}px`
    el.style.width = `${infoFromRect.width}px`
    el.style.height = `${infoFromRect.height}px`
    el.animate([start, end], { duration: DURATION, easing: EASING, fill: "forwards" })

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open, infoFromRect, targetRect])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: Actions.SetInfoItem, payload: { item: undefined } })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, dispatch])

  if (!open) return null

  const close = () => {
    if (!sheetRef.current) {
      dispatch({ type: Actions.SetInfoItem, payload: { item: undefined } })
      return
    }

    const start = {
      top: `${targetRect.top}px`,
      left: `${targetRect.left}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
      borderColor: "rgba(var(--color-current-rgb), 1)",
    } as Keyframe

    const to = infoFromRect ?? targetRect
    const end = {
      top: `${to.top}px`,
      left: `${to.left}px`,
      width: `${to.width}px`,
      height: `${to.height}px`,
      borderColor: "rgba(var(--color-current-rgb), 0)",
    } as Keyframe

    const el = sheetRef.current
    const anim = el.animate([start, end], { duration: DURATION, easing: EASING, fill: "forwards" })
    anim?.finished.finally(() => {
      dispatch({ type: Actions.SetInfoItem, payload: { item: undefined, fromRect: undefined } })
    })
  }

  return createPortal(
    <>
      <div className={classes.backdrop} onClick={close} />
      <div
        ref={sheetRef}
        className={classes.sheet}
        style={{ top: 0, left: 0, width: 0, height: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateRows: "1fr 3fr" }}>
          <Page
            header={
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className={gridClasses.key}>{infoItem?.key}</span>
                <span className={gridClasses.value}>{infoItem?.value}</span>
              </div>
            }
          >
            <Paragraph>{infoItem?.note}</Paragraph>
          </Page>
        </div>
      </div>
    </>,
    document.body
  )
}
