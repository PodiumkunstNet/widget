import { ReactNode } from "react"
import cx from 'clsx'

import classes from "./index.module.css"

export function Page({
	children,
	className,
	header,
}: {
	children: ReactNode
	className?: string
	header?: ReactNode
}) {
	console.log(className, cx(classes.page, className))
	return (
		<section className={cx(classes.page, "page", className)}>
			{
				header && (
					<header className={cx(classes.header, "page-header")}>
						{header}
					</header>
				)
			}
			<div className={cx(classes.content, "page-content")}>
				{children}
			</div>
		</section>
	)
}
