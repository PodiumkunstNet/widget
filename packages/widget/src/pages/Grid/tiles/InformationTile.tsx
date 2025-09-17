import { useContext } from "react"

// import { TileType, type Tile } from "../../../types/grid"
import { Props } from "./GenericTile"

import { DispatchContext } from "../../../state"
import { Actions } from "../../../state/actions"
import { useRef } from "react"

import { Paragraph } from "../../../components/Paragraph"
import { Page } from "../../../components/Page"
import { TileWrapper } from "./GenericTile"

import gridClasses from "./GenericTile.module.css"
import infoClasses from "./InformationTile.module.css"

// No local animation; overlay handles FLIP animation

export function InformationTile({ item }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useContext(DispatchContext)

	// In-viewport overlay will handle animation; keep tile static

	return (
		<TileWrapper
			className={infoClasses.isInformation}
			item={item}
			onClick={() => {
				// Get viewport rect for FLIP animation
				const li = ref.current?.closest("li") as HTMLElement | null
				const r = li?.getBoundingClientRect()
				dispatch({
					type: Actions.SetInfoItem,
					payload: {
						item,
						fromRect: r ? { top: r.top, left: r.left, width: r.width, height: r.height } : undefined
					},
				})
			}}
		>
			<div className={infoClasses.infoItem} ref={ref}>
				<Page
					className={infoClasses.page}
					header={
						<div className={infoClasses.keyValueContainer}>
							<span className={gridClasses.key}>{item.key}</span>
							<span className={gridClasses.value}>{item.value}</span>
						</div>
					}
				>
					{/* Note content renders in overlay; keep a subtle hint for accessibility */}
					<Paragraph>{item.note}</Paragraph>
				</Page>
			</div>
		</TileWrapper>
	)
}
