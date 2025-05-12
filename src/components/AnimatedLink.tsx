"use client"

import React, { CSSProperties } from "react"
import useAnimatedRouter from "../hooks/useAnimatedRouter"
import { Link } from "react-router-dom"

type Props = {
	href: string
	children: React.ReactNode
	classes: string
	handleClick?: () => void
	style?: CSSProperties
}
export default function AnimatedLink({
	href,
	children,
	classes,
	handleClick,
	style,
}: Props) {
	const { navigate } = useAnimatedRouter()
	return (
		<Link
			className={classes}
			to={href}
			style={style}
			onClick={() => {
				if (handleClick) handleClick()
				navigate(href)
			}}
		>
			{children}
		</Link>
	)
}
