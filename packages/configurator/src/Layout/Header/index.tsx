import { Logo } from "@widget/components/Logo"
import { ariaLabels } from "@widget/constants/ariaLables"

import classes from './index.module.css'

export function Header() {
	return (
		<header className={classes.header}>
			<Logo aria-hidden={true} aria-label={ariaLabels.logo} dark={true} />
		</header>
	)
}
