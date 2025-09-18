import { useContext } from "react"

import { Props } from "./GenericTile"

import { DispatchContext } from "../../../state"
import { Actions } from "../../../state/actions"
import { useRef } from "react"

import { Paragraph } from "../../../components/Paragraph"
import { Page } from "../../../components/Page"
import { TileWrapper } from "./GenericTile"

// @ts-ignore
import { Layout } from "../../../components/Layout"
// @ts-ignore
import { InformationOverlay } from "../../../components/InfoOverlay"

import gridClasses from "./GenericTile.module.css"
import infoClasses from "./InformationTile.module.css"

/**
 * The information tile, is used to display non-interactive text. When the
 * user clicks on it, an overlay with the content appears.
 * 
 * The {@link InformationOverlay} component is rendered in the {@link Layout}
 * based on the infoItem set on the {@link State}
 */
export function InformationTile({ item }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useContext(DispatchContext)

	return (
		<TileWrapper
			className={infoClasses.isInformation}
			item={item}
			onClick={() => {
				const li = ref.current?.closest("li") as HTMLElement | null
				const r = li?.getBoundingClientRect()
				if (r == null) return

				dispatch({
					type: Actions.SetInfoItem,
					payload: {
						item,
						fromRect: {
							top: r.top,
							left: r.left,
							width: r.width,
							height: r.height,
						},
					},
				})
			}}
		>
			<div className={infoClasses.infoItem} ref={ref}>
				<InformationTileBody item={item} />
			</div>
		</TileWrapper>
	)
}

export function InformationTileBody({ item }: { item: Props["item"] }) {
	return (
		<Page
			className={infoClasses.page}
			header={
				<div className={infoClasses.keyValueContainer}>
					<span className={gridClasses.key}>{item.key}</span>
					<span className={gridClasses.value}>{item.value}</span>
				</div>
			}
		>
			<Paragraph>{item.note}</Paragraph>
		</Page>
	)
}
