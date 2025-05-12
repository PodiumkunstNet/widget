import { GridItem } from "../../types/grid"
import classes from "./index.module.css"

export function InfoSection({ item }: { item: GridItem }) {
	return (
		<section className={classes.section}>
			<div>
				<h3>informatie</h3>
				<h2>{item.value}</h2>
				<p>
          		{item.note}
				</p>
			</div>
		</section>
	)
}
