import { Link } from "react-router-dom"

import { GridCategory, type GridItem } from "../../../types/grid"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import useSessionStorageManager from "../../../hooks/useSessionStorage"
import useAnimatedRouter from "../../../hooks/useAnimatedRouter"
import { Props as GridSectionProps } from "./GridSection"

import classes from './GridItem.module.css'
import { DispatchContext } from "../../../state"
import { useContext } from "react"
import { Actions } from "../../../state/actions"

type Props = Pick<GridSectionProps, 'isSubCategoryView'> & {
	item: GridItem
}

export function GridItem({
	item,
	isSubCategoryView,
}: Props) {
	const dispatch = useContext(DispatchContext)
	const url = useURL(isSubCategoryView, item)

	const { navigate } = useAnimatedRouter()
	const { setTitle } = useSessionStorageManager()

	let content = (
		<>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</>
	)

	if (item.type === GridCategory.More) {
		content = (
			<Link to={url}>
				{content}
			</Link>
		)
	}

	return (
		<li
			className={cn(classes.gridItem, {
				[classes.isStatic]: item.type === GridCategory.Static,
				[classes.isInformation]: item.type === GridCategory.Information
			})}
			onClick={() => {
				const title = item.key ? `${item.key} ${item.value}` : item.value
				setTitle(`${item?.id}-${item.subType}`, title)

				if (item.type === GridCategory.Information) {
					dispatch({
						type: Actions.SetInfoItem,
						payload: { item },
					})
				} else if (item.type !== GridCategory.Static) {
					navigate(url)
				}
			}}
		>
			{content}
		</li>
	)
}
