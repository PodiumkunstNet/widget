import { useContext, useState } from "react"
import clsx from "clsx"
import {
	IconDotsVertical,
	IconHistory,
	IconInfoCircle,
	IconMail,
	IconX,
} from "@tabler/icons-react"
import "@mantine/core/styles.css"

import headerClasses from "./Header.module.css"
import classes from "./MainMenu.module.css"

import { Overlay, OverlayContext } from "../Overlay"
import { AboutPage, PodiumkunstLink } from "../../pages/About"
import { Paragraph } from "../Paragraph"

export function MainMenu() {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<nav id="main-menu" className={headerClasses.mainmenu}>
			<ul>
				<li className={headerClasses.menuItem}>
					<button id="about" onClick={() => setShowMenu(true)}>
						<IconDotsVertical />
					</button>
				</li>
			</ul>
			{showMenu && (
				<Overlay
					afterClose={() => setShowMenu(false)}
					rect={{
						height: 0,
						left: window.innerWidth - 20,
						top: 20,
						width: 0,
					}}
				>
					<div className={classes.container}>
						<nav className={classes.nav}>
							<ol>
								<li className={clsx(classes.menuItem, classes.active)}>
									<IconInfoCircle size="18" /> Over ons
								</li>
								<li className={clsx(classes.menuItem)}>
									<IconMail size="18" /> Contact
								</li>
								<li className={clsx(classes.menuItem)}>
									<IconHistory size="18" /> Geschiedenis
								</li>
							</ol>
							<CloseButton />
						</nav>
						<section className={classes.main}>
							<Paragraph>
								<PodiumkunstLink /> verbindt de schatkamers van de Nederlandse
								podiumkunsten en stelt deze open voor makers, onderzoekers en
								liefhebbers. Het doel is een volledig en toegankelijk digitaal
								overzicht van het Nederlandse podiumkunst-erfgoed, dat de
								geschiedenis van de Nederlandse podiumkunsten levend maakt en
								een inspiratiebron voor makers van nu en de toekomst kan
								vormen.
							</Paragraph>
							<Paragraph>
								Daarvoor gaat <PodiumkunstLink /> muziek- en theatercollecties
								onderbrengen in een netwerk van collecties dat toegankelijk is
								voor iedereen. De gegevens die je hier ziet zijn gegevens van
								collectiehoudende instellingen die deelnemen aan .
							</Paragraph>
						</section>
					</div>
				</Overlay>
			)}
		</nav>
	)
}

function CloseButton() {
	const { close } = useContext(OverlayContext)
	return (
		<button onClick={close} className={classes.closeButton} aria-label="Close button">
			<IconX size="16" />
		</button>
	)
}
