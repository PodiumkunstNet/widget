'use client';
import GridSection from '../components/GridSection/GridSection';
import LeftSection from '../components/LeftSection/LeftSection';
import InfoSection from '../components/InfoSection/InfoSection';
import { cn } from '@/features/shared/utils/cn';
import EmptyState from '../components/EmptyState/EmptyState';
import Loader from '../components/Loader/Loader';
import { usePresenter } from './usePresenter';
import AboutSection from '../components/AboutSection/AboutSection';
import ErrorPreview from '@/features/configurator/components/Preview/ErrorPreview';

type Props = {
  isSubCategoryView: boolean;
};

const WidgetMainContainer = ({ isSubCategoryView }: Props) => {
  const {
    isInfoOverlayOpen,
    isAboutOverlayOpen,
    emptyRows,
    title,
    gridItems,
    infoItem,
    emptyCells,
    handleBack,
    handleInfoOverlay,
    handleViewAboutOverlay,
    isLoading,
    savedTitle,
    handleBackHome,
    rowHeight,
    isError,
  } = usePresenter(isSubCategoryView);

  const isOverlayOpen = isInfoOverlayOpen || isAboutOverlayOpen;
  const isMainPageLoading = !isSubCategoryView && isLoading;

  return (
    <main className="container mx-auto h-full max-w-[900px]">
      {isError && (
        <div className="h-[38.125rem] md:h-[27.75rem]">
          <ErrorPreview
            error="Helaas is de widget op dit moment niet beschikbaar."
            isSubCategoryView={isSubCategoryView}
          />
        </div>
      )}
      {isMainPageLoading && ( //isMainPageLoading
        <div className="h-[38.125rem] md:h-[27.75rem]">
          <Loader />
        </div>
      )}
      {isAboutOverlayOpen ? (
        <AboutSection
          isSubCategoryView={isSubCategoryView}
          handleBack={handleViewAboutOverlay}
        />
      ) : (
        <div
          className={cn(
            isOverlayOpen ? 'h-full' : 'h-[38.125rem] ',
            'flex flex-col md:h-[27.75rem] md:flex-row',
            isMainPageLoading && 'hidden',
            isError && 'hidden'
          )}
        >
          <LeftSection
            showBackButton={isSubCategoryView || isInfoOverlayOpen}
            isSubCategoryView={isSubCategoryView}
            showBorder={emptyRows >= 1}
            handleBack={handleBack}
            title={title ?? ''}
            handleViewAboutOverlay={handleViewAboutOverlay}
            savedTitle={savedTitle}
            handleBackHome={handleBackHome}
            showBackHomeButton={isSubCategoryView && !isOverlayOpen}
          />
          <div
            className={cn(
              isSubCategoryView && gridItems.length === 0
                ? 'bg-primary-blue'
                : 'bg-primary-white',
              'h-full grow '
            )}
          >
            {isInfoOverlayOpen && infoItem ? (
              <InfoSection
                item={infoItem}
                isSubCategoryView={isSubCategoryView}
              />
            ) : gridItems.length === 0 && !isLoading ? (
              <EmptyState
                handleBack={handleBack}
                isSubCategoryView={isSubCategoryView}
              />
            ) : (
              <GridSection
                items={gridItems}
                emptyCells={emptyCells}
                isSubCategoryView={isSubCategoryView}
                handleInfoOverlay={handleInfoOverlay}
                rowHeight={rowHeight}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default WidgetMainContainer;
