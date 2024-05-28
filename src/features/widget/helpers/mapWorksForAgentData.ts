import { GRID_CATEGORIES } from '../types/categories';
import {
  MappedWidgetType,
  MappedWidgetItemType,
  WIDGET_SUB_TYPES,
} from '../types/mainWidgetData';

export type WorkForAgentType = {
  agent: string;
  work: string;
  title: string;
};

export function mapWorkForAgentData(
  data: WorkForAgentType[]
): MappedWidgetType {
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
      value: item.title,
      type: GRID_CATEGORIES.more,
      id: item.work,
      subType: WIDGET_SUB_TYPES.work,
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
