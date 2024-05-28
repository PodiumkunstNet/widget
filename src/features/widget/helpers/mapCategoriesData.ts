import { GRID_CATEGORIES } from '../types/categories';
import {
  MappedWidgetItemType,
  MappedWidgetType,
  WIDGET_SUB_TYPES,
} from '../types/mainWidgetData';

export type CategoryType = {
  category: string;
  title: string;
  work: string;
  worktitle: string;
};

export function mapCategoriesData(data: CategoryType[]): MappedWidgetType {
  if (!data) {
    return {
      mappedData: null,
      error: true,
    };
  }

  const items: MappedWidgetItemType[] = [];
  data.forEach((item) => {
    items.push({
      key: '',
      value: item.worktitle,
      type: GRID_CATEGORIES.more,
      subType: WIDGET_SUB_TYPES.work,
      id: item.work,
    });
  });

  return {
    error: false,
    mappedData: {
      title: '',
      items,
    },
  };
}
