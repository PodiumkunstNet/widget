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
	return (
		<section className={cx(classes.page, "page", className, {
			[classes.noHeader]: !header,
		})}>
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
