import { useEffect, useState } from "react"
import { GridItem } from "../../types/grid"
import classes from "./index.module.css"
import { cn } from "../../utils/cn"

export function InfoSection({ item }: { item: GridItem }) {
	const [transition, setTransition] = useState(false)

	useEffect(() => {
		setTransition(true)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setTransition(false)
		}, 2000)
	})

	return (
		<section
			className={cn(classes.section, {
				[classes.transition]: transition,
			})}
		>
			<div
				className={classes.outerDiv}
				style={{
					top: '0',
					left: '33%',
					bottom: '66%',
					right: '33%'
				}}
			>
				<div className={classes.innerDiv}>
					<h3>informatie</h3>
					<h2>{item.value}</h2>
					<div className={classes.pContainer}>
						<p>
							{item.note}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
