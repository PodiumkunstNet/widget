import { GridSection } from "./GridSection/GridSection"
import Loader from "../../components/Loader/Loader"
import ErrorPreview from "../../components/Preview/ErrorPreview"

import { useContext, useEffect } from "react"
import { GridDataContext } from "../../state"
import { sessionStore } from "../../hooks/useSessionStorage"

type Props = {
	isSubCategoryView: boolean
}

export const Grid = ({ isSubCategoryView }: Props) => {
	const {
		items,
		isLoading,
		isError,
		id,
		type
	} = useContext(GridDataContext)

	useEffect(() => {
		if (!isSubCategoryView) {
			sessionStore.setHomeURL(id, type);
		}
	}, [isSubCategoryView, id, type])

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

	return (
		<GridSection
			items={items}
			isSubCategoryView={isSubCategoryView}
		/>
	)
}
