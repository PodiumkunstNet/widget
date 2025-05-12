import { GridCategory } from "../../../types/categories"
import { cn } from "../../../utils/cn"
import { useURL } from "../../../hooks/useGenerateUrlForTile"
import useSessionStorageManager from "../../../hooks/useSessionStorage"

import { GridItemType } from "../GridSection"
import { CSSProperties, ReactNode } from "react"

import classes from './GridItem.module.css'
import { Link } from "react-router-dom"
import useAnimatedRouter from "../../../hooks/useAnimatedRouter"

type Props = {
	item: GridItemType
	isSubCategoryView?: boolean
	isInformation?: boolean
	handleInfoOverlay: (item: GridItemType) => void
	rowHeight?: number
}

const GridItem = ({
	item,
	isSubCategoryView,
	handleInfoOverlay,
}: Props) => {
	const url = useURL(isSubCategoryView, item)

	if (item.type === GridCategory.Website) {
		// if (isExternal) {
		// 	return (
		// 		<a
		// 			href={url}
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 			className={commonClasses}
		// 			style={dynamicStyle}
		// 		>
		// 			{content}
		// 		</a>
		// 	)
		// }

		console.log('[TODO] Render external/website grid item')
		return null
	}


	return (
		<GridItemDefault
			color={isSubCategoryView ? "var(--color-blue-rgb)" : "var(--color-orange-rgb)"}
			handleInfoOverlay={handleInfoOverlay}
			item={item}
			url={url}
		>
			<span className={classes.key}>{item.key}</span>
			<span className={classes.value}>{item.value}</span>
		</GridItemDefault>
	)
}

export default GridItem

function GridItemDefault({ color, item, children, handleInfoOverlay, url }: {
	color: string
	item: GridItemType
	children: ReactNode
	handleInfoOverlay: Props["handleInfoOverlay"]
	url: string
}) {
	const { navigate } = useAnimatedRouter()
	const { setTitle } = useSessionStorageManager()

	const content = (
		item.type !== GridCategory.More
	)	? children
		: (
			<Link to={url}>
				{children}
			</Link>
		)

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
					handleInfoOverlay(item)
				} else if (item.type !== GridCategory.Static) {
					navigate(url)
				}

			}}
			style={{"--color-grid-rgb": color } as CSSProperties}
		>
			{content}
		</li>
	)
}

		// return (
		// 	<AnimatedLink
		// 		href={url ?? "/"}
		// 		classes={commonClasses}
		// 		handleClick={storeTitleInCache}
		// 		style={dynamicStyle}
		// 	>
		// 		{content}
		// 	</AnimatedLink>
		// )