import { ReactNode } from "react"

import cn from "clsx"

import classes from "./index.module.css"

export function Paragraph({ children }: { children: ReactNode }) {
	return <p className={cn(classes.p, "paragraph")}>{children}</p>
}
