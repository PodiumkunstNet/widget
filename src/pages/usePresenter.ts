import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { GridItemType } from '../components/GridSection/GridSection';
// import { useAnimatedPresenter } from '../components/LeftSection/useAnimatedPresenter';

import useSessionStorageManager from '../hooks/useSessionStorage';
import useCurrentBreakpoint from '../hooks/useCurrentBreakpoint';
import useAnimatedRouter from '../hooks/useAnimatedRouter';
import { useWidgetByIri, queryWidgetByIri } from '../hooks/useWidgetByIri';

import { sliceGrid } from '../helpers/sliceGrid';

import { WidgetSubType } from '../types/mainWidgetData';

export const usePresenter = (isSubCategoryView: boolean) => {
  const breakpoint = useCurrentBreakpoint();
  const queryClient = useQueryClient();
//   const { handleGoBack } = useAnimatedPresenter();
  const { back } = useAnimatedRouter();

  const { navigate } = useAnimatedRouter();
  const [ params ] = useSearchParams();

  const [isInfoOverlayOpen, setInfoOverlayOpen] = useState(false);
  const [isAboutOverlayOpen, setIsAboutOverlayOpen] = useState(false);
  const [infoItem, setInfoItem] = useState<GridItemType>();
  const [isPrefetched, setIsPrefetched] = useState(false);

  const id = params.get('id') ?? '';
  const type = params.get('type') ?? '';
  const { data, isLoading, isError } = useWidgetByIri(
    id,
    type as WidgetSubType
  );

  const { getTitle, /* removeTitle,*/ setHomeUrl, getHomeUrl, clearAll } =
    useSessionStorageManager();
  const savedTitle = getTitle(`${id}-${type}`);
  const homeUrl = getHomeUrl();

  useEffect(() => {
    if (!isSubCategoryView) {
      clearAll();
      setHomeUrl(`/widget?id=${id}&type=${type}`);
    }
  }, [isSubCategoryView, setHomeUrl, id, type, homeUrl, clearAll]);

  useEffect(() => {
    const prefetchTiles = async () => {
      if (isPrefetched || isSubCategoryView || !data?.items?.length) return;

      const prefetchPromises = data.items.map(async (tile) => {
        if (tile?.id && tile?.subType) {
          return queryClient?.prefetchQuery({
            queryKey: [`widget-by-uri-${tile.id}-${tile.subType}`],
            queryFn: () =>
              queryWidgetByIri(
                tile.id as string,
                tile.subType as WidgetSubType
              ),
          });
        }
      });

      await Promise.all(prefetchPromises);

      setIsPrefetched(true);
    };

    prefetchTiles();
  }, [isSubCategoryView, data, isPrefetched, queryClient]);

  const {
    items: gridItems,
    emptyCells,
    emptyRows,
    rowHeight,
  } = sliceGrid(data?.items || [], breakpoint ?? 'lg');

  function handleBack() {
    if (isInfoOverlayOpen) {
      setInfoOverlayOpen(false);
    } else {
      back();
    }
  }

  function handleBackHome() {
    navigate(homeUrl ?? '/widget');
  }

  function handleInfoOverlay(item: GridItemType) {
    setInfoOverlayOpen((prevValue) => !prevValue);
    if (item !== undefined) {
      setInfoItem(item);
    }
  }

  function handleViewAboutOverlay() {
    setIsAboutOverlayOpen((prevValue) => !prevValue);
  }

  return {
    emptyCells,
    emptyRows,
    gridItems,
    handleBack,
    handleBackHome,
   //  handleGoBack,
    handleInfoOverlay,
    handleViewAboutOverlay,
    homeUrl,
    infoItem,
    isAboutOverlayOpen,
    isError,
    isInfoOverlayOpen,
    isLoading,
    rowHeight,
    savedTitle,
    setInfoItem,
    setInfoOverlayOpen,
    title: data?.title,
  };
};
