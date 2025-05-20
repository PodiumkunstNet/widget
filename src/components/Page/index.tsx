import { ReactNode } from "react"
import cx from 'clsx'

import classes from "./index.module.css"

/**
 * Page is an opinionated wrapper for a page. The page consists of a header
 * and a content area. The header is optional. If there is a header, the 
 * page is split 1fr / 3fr. The content of the page is aligned to top and 
 * centered horizontally.
 */
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
				header &&
				<header className={cx(classes.header, "page-header")}>
					{header}
				</header>
			}
			<div className={cx(classes.content, "page-content")}>
				{children}
			</div>
		</section>
	)
}
