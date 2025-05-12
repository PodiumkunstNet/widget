import { Logo } from "../Logo"
import { ariaLabels } from "../../constants/ariaLables"
import { cn } from "../../utils/cn"
import ArrowBack from "../../../public/visuals/icons/arrow-back.svg?react"

import classes from "./AboutSection.module.css"

interface Props {
	isSubCategoryView: boolean
	handleBack: () => void
}

export function AboutSection({ isSubCategoryView, handleBack }: Props) {
	return (
		<section className={cn(classes.section, { isSubCategoryView })}>
			<header>
				<Logo aria-hidden={true} aria-label={ariaLabels.logo} />
			</header>
			<div>
				<p>
					<PodiumkunstLink /> verbindt de schatkamers van de Nederlandse
					podiumkunsten en stelt deze open voor makers, onderzoekers en
					liefhebbers. Het doel is een volledig en toegankelijk digitaal
					overzicht van het Nederlandse podiumkunst-erfgoed, dat de
					geschiedenis van de Nederlandse podiumkunsten levend maakt en
					een inspiratiebron voor makers van nu en de toekomst kan
					vormen.
				</p>
				<p>
					Daarvoor gaat <PodiumkunstLink /> muziek- en theatercollecties
					onderbrengen in een netwerk van collecties dat toegankelijk is
					voor iedereen. De gegevens die je hier ziet zijn gegevens van
					collectiehoudende instellingen die deelnemen aan .
				</p>
			</div>
			<footer>
				<div className={classes.buttonWrapper}>
					<button onClick={handleBack}>
						<ArrowBack />
						Terug
					</button>
				</div>
			</footer>
		</section>
	)
}

function PodiumkunstLink() {
	return (
		<a
			className="underline"
			href="https://www.podiumkunst.net/"
			target="_blank"
		>
			Podiumkunst.net
		</a>
	)
}
