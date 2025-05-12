import { LeftSection } from './LeftSection/LeftSection'

export function Header({ staticPage }: { staticPage?: boolean }) {
	let isSubCategoryView = false
	let isOverlayOpen = false
	let isInfoOverlayOpen = false
	let emptyRows = 0
	let savedTitle = ''
	let handleBack = () => {}
	let handleBackHome = () => {}
	let handleViewAboutOverlay = () => {}

	return (
		<LeftSection
			staticPage={staticPage}
			showBackButton={isSubCategoryView || isInfoOverlayOpen}
			isSubCategoryView={isSubCategoryView}
			showBorder={emptyRows >= 1}
			handleBack={handleBack}
			handleViewAboutOverlay={handleViewAboutOverlay}
			savedTitle={savedTitle}
			handleBackHome={handleBackHome}
			showBackHomeButton={isSubCategoryView && !isOverlayOpen}
		/>
	)
}
