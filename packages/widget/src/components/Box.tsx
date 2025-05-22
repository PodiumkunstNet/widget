import cx from "clsx"
import classes from './index.module.css'

export function Box({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cx(classes.Box, className)}
		>
			{children}
		</div>
	)
}