import { Breakpoint } from '@/features/shared/hooks/useCurrentBreakpoint';
import { GridItemsType } from '../components/GridSection/GridSection';
import { WIDGET_WIDTHS_PX } from '../constants/widgetSizes';

export function sliceGrid(items: GridItemsType, breakpoint: Breakpoint) {
  const showSmallerGrid = breakpoint === 'sm' || breakpoint === 'md';
  const maxItems = showSmallerGrid ? 9 : 12;
  const minItems = 9;
  const rowLength = items.length > minItems && !showSmallerGrid ? 4 : 3;
  const rowsNeeded = Math.ceil(
    items.length >= maxItems ? maxItems / rowLength : items.length / rowLength
  );
  const itemsFullyFilledRows = rowsNeeded * rowLength;

  const totalContainerHeight = breakpoint && WIDGET_WIDTHS_PX[breakpoint];
  const rowHeight = rowsNeeded > 0 ? totalContainerHeight / rowsNeeded : 0;

  if (items.length > maxItems) {
    return {
      items: items.slice(0, maxItems),
      emptyCells: [],
      emptyRows: 0,
      rowHeight,
    };
  }

  const emptyCellsCount =
    items.length <= minItems
      ? itemsFullyFilledRows - items.length
      : maxItems - items.length;

  const emptyCells = Array(emptyCellsCount).fill(undefined);

  return {
    items: items,
    emptyCells: emptyCells,
    emptyRows: emptyCellsCount / rowLength,
    rowHeight,
  };
}
