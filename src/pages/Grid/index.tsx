import { GridSection } from "./GridSection/GridSection"
import { InfoSection } from "../../components/InfoSection"
import Loader from "../../components/Loader/Loader"
import ErrorPreview from "../../components/Preview/ErrorPreview"

import { useContext, useEffect } from "react"
import { GridDataContext, StateContext } from "../../state"
import { sessionStore } from "../../hooks/useSessionStorage"

type Props = {
	isSubCategoryView: boolean
}

export const Grid = ({ isSubCategoryView }: Props) => {
	const { infoItem } = useContext(StateContext)
	const {
		items,
		isLoading,
		isError,
		id,
		type
	} = useContext(GridDataContext)

	useEffect(() => {
		if (!isSubCategoryView) {
			sessionStore.clearAll();
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
