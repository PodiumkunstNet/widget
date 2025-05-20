import { Page } from "../../components/Page"
import { Paragraph } from "../../components/Paragraph"

import "./index.module.css"

export function AboutPage() {
	return (
		<Page
			header={<h2>Over ons</h2>}
		>
			<div>
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
			</div>
		</Page>
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
