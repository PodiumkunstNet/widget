import { GridCategory, type GridItem } from "../../../types/grid"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import { useTransitionNavigate } from "../../../hooks/useTransitionNavigate"
import { Props as GridSectionProps } from "./GridSection"

import classes from './GridItem.module.css'
import { DispatchContext } from "../../../state"
import { useContext } from "react"
import { Actions } from "../../../state/actions"
import { sessionStore } from "../../../hooks/useSessionStorage"
import { useRef } from "react"

type Props = Pick<GridSectionProps, 'isSubCategoryView'> & {
	item: GridItem
}

export function GridItem({
	item,
	isSubCategoryView,
}: Props) {
	const ref = useRef<HTMLLIElement>(null)
	const dispatch = useContext(DispatchContext)
	// const [fullgrid, setFullgrid] = useState(false)
	const url = useURL(isSubCategoryView, item)

	const { navigate } = useTransitionNavigate()

	let content = (
		<>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</>
	)

	// let infoItem = null
	// if (fullgrid) {
	// 	const style: CSSProperties = { 
	// 		right: fullgrid.right,
	// 		bottom: fullgrid.bottom,
	// 		top: fullgrid.top,
	// 		left: fullgrid.left,
	// 		position: 'absolute',
	// 		height: 'auto',
	// 		width: 'auto',
	// 	}

	// 	infoItem = (
	// 		<li
	// 			className={cn(classes.gridItem, classes.fullGrid)}
	// 			style={style}
	// 			onClick={() => setFullgrid(undefined)}
	// 		>
	// 			{content}
	// 			{/* <p>
	// 				{item.note}
	// 			</p> */}
	// 		</li>
	// 	)
	// }

	return (
		<>
			{/* {infoItem} */}
		<li
			ref={ref}
			className={cn(classes.gridItem, {
				[classes.isStatic]: item.type === GridCategory.Static,
				// [classes.isInformation]: item.type === GridCategory.Information,
				// [classes.fullGrid]: fullgrid,
			})}
			onClick={() => {
				const title = item.key ? `${item.key} ${item.value}` : item.value
				sessionStore.setTitle(item?.id, item.subType, title)


				if (item.type === GridCategory.Information) {

					// setFullgrid(!fullgrid)
					dispatch({
						type: Actions.SetInfoItem,
						payload: {
							item
						},
					})
				} else if (item.type !== GridCategory.Static) {
					navigate(url)
				}
			}}
		>
			{content}
		</li>
		</>
	)
}
