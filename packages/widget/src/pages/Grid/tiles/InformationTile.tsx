import { useContext, useEffect, useState } from "react"

import { TileType, type Tile } from "../../../types/grid"
import { Props } from "./GenericTile"

import { DispatchContext, StateContext } from "../../../state"
import { Actions } from "../../../state/actions"
import { useRef } from "react"

import { Paragraph } from "../../../components/Paragraph"
import { Page } from "../../../components/Page"
import { TileWrapper } from "./GenericTile"

import gridClasses from "./GenericTile.module.css"
import infoClasses from "./InformationTile.module.css"

const endState: Keyframe = {
	inset: "4px",
	position: "absolute",
	borderColor: "rgba(var(--color-current-rgb), 1)",
}

const animateOptions: KeyframeAnimationOptions = {
	duration: 400,
	// duration: 4000,
	// duration: 4000000000,
	easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
	fill: "forwards",
}

export function InformationTile({ item }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useContext(DispatchContext)

	useAnimation(item, ref)

	return (
		<TileWrapper
			className={infoClasses.isInformation}
			item={item}
			onClick={() => {
				dispatch({
					type: Actions.SetInfoItem,
					payload: {
						item,
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
					<Paragraph>{item.note}</Paragraph>
				</Page>
			</div>
		</TileWrapper>
	)
}

function useAnimation(item: Tile, ref: React.RefObject<HTMLDivElement>) {
	const { infoItem } = useContext(StateContext)
	const [startState, setStartState] = useState<Keyframe>()

	useEffect(() => {
		if (item.type !== TileType.Information || !ref.current) return

		if (infoItem === item) {
			const gridRect = ref.current.closest("ul")!.getBoundingClientRect()
			const itemRect = ref.current.closest("li")!.getBoundingClientRect()
			const startState: Keyframe = {
				top: `${itemRect.top - gridRect.top - 2}px`,
				left: `${itemRect.left - gridRect.left - 2}px`,
				bottom: `${gridRect.bottom - itemRect.bottom - 2}px`,
				right: `${gridRect.right - itemRect.right - 2}px`,
				position: "absolute",
				borderColor: "rgba(var(--color-current-rgb), 0)",
			}

			setStartState(startState)

			ref.current?.classList.add("detached")
			const animation = ref.current.animate([startState, endState], {
				...animateOptions,
			})
			animation?.finished.then(() => {
				ref.current?.classList.add("full-screen")
			})
		}
	}, [infoItem, item])

	useEffect(() => {
		if (startState != null && infoItem == null) {
			ref.current?.classList.remove("full-screen")
			const animation = ref.current?.animate(
				[endState, startState], animateOptions,
			)
			animation?.finished.then(() => {
				ref.current?.classList.remove("detached")
			})
		}
	}, [startState, infoItem])
}