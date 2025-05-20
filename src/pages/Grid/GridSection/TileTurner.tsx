import { memo, ReactNode, useRef } from "react"
import { cn } from "../../../utils/cn"

import classes from './TileTurner.module.css'

const duration = 666

const zIndex = "100"

const options: KeyframeAnimationOptions = {
	duration,
	easing: "ease-in-out",
	fill: 'forwards',
}

export const TileTurner = memo(_TileTurner, () => true)
function _TileTurner({
	back,
	className,
	front,
}: {
	back: ReactNode
	className?: string
	front: ReactNode
}) {
	const ref = useRef<HTMLDivElement>(null)
	const animationForward = useRef<Animation>()
	const animationBackward = useRef<Animation>()

	const onFinished = () => {
		if (
			animationForward.current?.currentTime  === duration &&
			animationBackward.current?.currentTime === duration &&
			ref.current
	) {
			ref.current.style.zIndex = "auto"
		}
	}

	const onMouseEnter = () => {
		if (!ref.current) return

		ref.current.style.zIndex = zIndex

		const turner = ref.current?.querySelector(`.${classes["turner"]}`) as HTMLDivElement
		animationForward.current = turner?.animate(
			[
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, .5)",
					offset: 0,
					transform: "rotateY(0deg)",
				},
				{
					boxShadow: "0 0 12px rgba(0, 0, 0, 1)",
					offset: 0.5,
				},
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, 0.1)",
					offset: .99,
				},
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
					offset: 1,
					transform: "rotateY(180deg)",
				},
			],
			options
		)

		// If the backward animation is still running, start the forward animation
		// from the current time of the backward animation
		const backwardTime = animationBackward.current?.currentTime ?? duration
		animationForward.current!.currentTime = duration - (backwardTime as number)

		animationForward.current!.finished.then(onFinished)
	}

	const onMouseLeave = () => {
		if (!ref.current) return

		ref.current.style.zIndex = zIndex

		const turner = ref.current?.querySelector(`.${classes["turner"]}`) as HTMLDivElement
		animationBackward.current = turner?.animate(
			[
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, 0.5)",
					transform: "rotateY(180deg)",
					offset: 0,
				},
				{
					boxShadow: "0 0 12px rgba(0, 0, 0, 1)",
					offset: 0.5,
				},
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, 0.1)",
					offset: .99,
				},
				{
					boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
					offset: 1,
					transform: "rotateY(0deg)",
				},
			],
			options
		)

		// If the forward animation is still running, start the backward animation
		// from the current time of the forward animation
		const forwardTime = animationForward.current!.currentTime ?? duration
		animationBackward.current!.currentTime = duration - (forwardTime as number)

		animationBackward.current!.finished.then(onFinished)
	}

	console.log('rend')

	return (
		<div
			className={classes["turn-wrapper"]}
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className={cn(classes["turner"], className)}>
				<div className={classes["turn-front"]}>{front}</div>
				<div className={classes["turn-back"]}>{back}</div>
			</div>
		</div>
	)
}