'use client';
import useCurrentBreakpoint from '@/features/shared/hooks/useCurrentBreakpoint';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GridItemType } from '../components/GridSection/GridSection';
import { useAnimatedPresenter } from '../components/LeftSection/useAnimatedPresenter';
import { sliceGrid } from '../helpers/sliceGrid';
import { useWidgetByIri, queryWidgetByIri } from '../hooks/useWidgetByIri';
import { WidgetSubType } from '../types/mainWidgetData';
import useSessionStorageManager from '@/features/shared/hooks/useSessionStorage';
import useAnimatedRouter from '../hooks/useAnimatedRouter';

export const usePresenter = (isSubCategoryView: boolean) => {
  const breakpoint = useCurrentBreakpoint();
  const queryClient = useQueryClient();
  const { handleGoBack } = useAnimatedPresenter();

  const { animatedRoute } = useAnimatedRouter();
  const params = useSearchParams();

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

  const { getTitle, removeTitle, setHomeUrl, getHomeUrl, clearAll } =
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
      handleGoBack();
    }
  }

  function handleBackHome() {
    animatedRoute(homeUrl ?? '/widget');
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
    gridItems,
    emptyCells,
    emptyRows,
    isInfoOverlayOpen,
    setInfoOverlayOpen,
    isAboutOverlayOpen,
    infoItem,
    setInfoItem,
    handleGoBack,
    title: data?.title,
    handleBack,
    handleInfoOverlay,
    handleViewAboutOverlay,
    isLoading,
    savedTitle,
    handleBackHome,
    homeUrl,
    rowHeight,
    isError,
  };
};
