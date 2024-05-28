import { GRID_CATEGORIES } from '../types/categories';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { GridItemType } from '../components/GridSection/GridSection';

const useGenerateUrlForTile = (
  isSubCategoryView: boolean | undefined,
  item?: GridItemType
) => {
  const params = useParams();
  const url =
    useMemo(() => {
      const parentId = params?.id;
      switch (item?.type) {
        case GRID_CATEGORIES.information:
          const leftPart = isSubCategoryView
            ? `/widget/more/${parentId}`
            : '/widget';
          // TODO in future we can add some rules which field to use
          return `${leftPart}/info/${item?.id}`;
        case GRID_CATEGORIES.more:
          return `/widget/more?id=${item?.id}&type=${item?.subType}`;
        case GRID_CATEGORIES.website:
          return item?.url;
        default:
          return '/widget';
      }
    }, [isSubCategoryView, item, params?.id]) ?? '/widget';

  return { url, isExternal: item?.type === GRID_CATEGORIES.website };
};

export default useGenerateUrlForTile;
