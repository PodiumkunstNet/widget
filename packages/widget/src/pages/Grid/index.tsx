import cx from "clsx"
import Loader from "../../components/Loader/Loader"
import ErrorPreview from "../../components/Preview/ErrorPreview"

import { useContext, useEffect } from "react"
import { GridDataContext } from "../../state"
import { sessionStore } from "../../hooks/useSessionStorage"

import { InformationTile } from "./tiles/InformationTile"
import { GenericTile } from "./tiles/GenericTile"
import { TileType } from "../../types/grid"

import classes from "./index.module.css"

import { useGridData } from "../../hooks/useGridData"
import { ExternalLinkTile } from "./tiles/ExternalLinkTile"

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

	if (isError) {
		return (
			<ErrorPreview
				error="Helaas is de widget op dit moment niet beschikbaar."
				isSubCategoryView={isSubCategoryView}
			/>
		)
	}

	return (
		<ul
			className={cx(classes.gridSection, classes.small, {
				[classes.isSub]: isSubCategoryView,
			})}
		>
			{items.map((item, index) => {
				if (item.type === TileType.Information) {
					return <InformationTile item={item} key={index} />
				}

				if (item.type === TileType.ExternalLink) {
					return <ExternalLinkTile item={item} key={index} />
				}

				return (
					<GenericTile
						item={item}
						isSubCategoryView={isSubCategoryView}
						key={index}
					/>
				)
			})}
		</ul>
	)
}
