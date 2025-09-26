import { TileWrapper } from "./Wrapper"

import { Tile } from "../../../types/grid"

import classes from "./GenericTile.module.css"

export interface Props {
	item: Tile
	isSubCategoryView?: boolean
}

export function ExternalLinkTile({ item }: Props) {
	const url = new URL(item.value)
	const domain = url.hostname.replace("www.", "")

	return (
		<TileWrapper item={item}>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}><a target="_blank" href={item.value}>{domain}</a></span>
		</TileWrapper>
	)
}
