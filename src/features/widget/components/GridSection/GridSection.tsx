import { GRID_CATEGORIES, GridCategory } from '../../types/categories';
import GridItem from './fragments/GridItem';
import EmptyCell from './fragments/EmptyCell';

type Props = {
  items: GridItemsType;
  isSubCategoryView?: boolean;
  emptyCells?: unknown[];
  handleInfoOverlay: (item: GridItemType) => void;
  rowHeight?: number;
};

export interface GridItemType {
  key: string;
  value?: string | null;
  type: GridCategory;
  id?: string;
  note?: string | null;
  subType?: string;
  url?: string;
}

export type GridItemsType = GridItemType[];

const GridSection = ({
  items,
  isSubCategoryView,
  emptyCells,
  handleInfoOverlay,
  rowHeight,
}: Props) => {
  return (
    <div
      className={`grid ${
        items.length <= 9 ? 'grid-cols-3' : 'grid-cols-4'
      } h-full  w-full`}
    >
      {items.map((item, index) => (
        <GridItem
          item={item}
          isSubCategoryView={isSubCategoryView}
          isInformation={item.type === GRID_CATEGORIES.information}
          handleInfoOverlay={handleInfoOverlay}
          rowHeight={rowHeight}
          key={`${index} - ${item?.id}`}
        />
      ))}

      {emptyCells?.map((_, index) => (
        <EmptyCell
          key={`empty-${index}`}
          variant={isSubCategoryView ? 'blue' : 'orange'}
        />
      ))}
    </div>
  );
};

export default GridSection;
