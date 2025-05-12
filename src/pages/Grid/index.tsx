import { GridSection } from "./GridSection/GridSection"
import { InfoSection } from "../../components/InfoSection"
import Loader from "../../components/Loader/Loader"
import ErrorPreview from "../../components/Preview/ErrorPreview"

import { useContext } from "react"
import { GridDataContext, StateContext } from "../../state"

type Props = {
	isSubCategoryView: boolean
}

export const Grid = ({ isSubCategoryView }: Props) => {
	const { infoItem } = useContext(StateContext)
	const { items, isLoading, isError } = useContext(GridDataContext)

	if (!isSubCategoryView && isLoading) {
		return <Loader />	
	}

	if (isError) {
		return (
			<ErrorPreview
				error="Helaas is de widget op dit moment niet beschikbaar."
				isSubCategoryView={isSubCategoryView}
			/>
		)
	}

	if (infoItem) {
		return (
			<InfoSection item={infoItem} />
		)
	}

	return (
		<GridSection
			items={items}
			isSubCategoryView={isSubCategoryView}
		/>
	)
}
