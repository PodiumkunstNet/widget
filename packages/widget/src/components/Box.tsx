import cx from "clsx"
import classes from './index.module.css'

export function Box({
	children,
	className,
	centerContent = false,
}: {
	children: React.ReactNode
	className?: string
	centerContent?: boolean
}) {
	return (
		<div
			className={cx(classes.Box, {
				[classes.centerContent]: centerContent,
			}, className)}
		>
			{children}
		</div>
	)
}