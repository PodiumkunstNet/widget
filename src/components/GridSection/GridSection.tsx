import { GridCategory } from '../../types/categories';
import GridItem from './fragments/GridItem';
import EmptyCell from './fragments/EmptyCell';

import classes from './GridSection.module.css';

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
    <ul
	 className={classes.gridSection}
    >
      {items.map((item, index) => (
        <GridItem
          item={item}
          isSubCategoryView={isSubCategoryView}
          isInformation={item.type === GridCategory.Information}
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
    </ul>
  );
};

export default GridSection;
