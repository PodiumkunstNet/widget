import cx from "clsx"
import Loader from "../../components/Loader/Loader"

import { useContext, useEffect } from "react"
import { GridDataContext } from "../../state"
import { sessionStore } from "../../hooks/useSessionStorage"

import { InformationTile } from "./tiles/InformationTile"
import { GenericTile } from "./tiles/GenericTile"
import { TileType } from "../../types/grid"

import classes from "./index.module.css"

import { useGridData } from "../../useGridData"
import { ExternalLinkTile } from "./tiles/ExternalLinkTile"
import { EmptyState, ErrorPreview } from "../../components/Error"

interface Props {
	isSubCategoryView: boolean
}

/**
 * The CSS variables for the grid are set in {@link useGridData}
 */
export function Grid({ isSubCategoryView }: Props) {
	const { items, isLoading, isError, id, type } = useContext(GridDataContext)

	useEffect(() => {
		if (!isSubCategoryView) {
			sessionStore.setHomeURL(id, type)
		}
	}, [isSubCategoryView, id, type])

	if (!isSubCategoryView && isLoading) return <Loader />

	if (isError) return <ErrorPreview />
	if (items.length === 0) return <EmptyState />

	return (
		<ul
			className={cx(classes.gridSection, classes.small, {
				[classes.isSub]: isSubCategoryView,
			})}
		>
			{items.map((item, index) => {
				const Tile = getTileComponent(item.type)

				return (
					<Tile
						item={item}
						isSubCategoryView={isSubCategoryView}
						key={index}
					/>
				)
			})}
		</ul>
	)
}

export function getTileComponent(tileType: TileType) {
	if (tileType === TileType.Information) return InformationTile
	if (tileType === TileType.ExternalLink) return ExternalLinkTile
	return GenericTile
}
