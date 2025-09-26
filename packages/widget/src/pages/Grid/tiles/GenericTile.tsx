import { TileType, type Tile } from "../../../types/grid"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"

import { TileWrapper } from "./Wrapper"

import classes from "./GenericTile.module.css"

export interface Props {
	item: Tile
	isSubCategoryView?: boolean
}

export function GenericTile({ item, isSubCategoryView = false }: Props) {
	const url = useURL(isSubCategoryView, item)
	const { navigate } = useTransitionNavigate()

	let onClick
	if (item.type !== TileType.Static) {
		onClick = () => navigate(url)
	}

	return (
		<TileWrapper item={item} onClick={onClick}>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</TileWrapper>
	)
}
