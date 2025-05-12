import { GridCategory, GridItem } from '../types/grid';
import {
  MappedWidgetType,
  WidgetSubType,
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

  const items: GridItem[] = [];
  data.forEach((item) => {
    items.push({
      key: '',
      value: item.worktitle,
      type: GridCategory.More,
      subType: WidgetSubType.Work,
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
