import { GRID_CATEGORIES } from '../types/categories';
import {
  MappedWidgetItemType,
  MappedWidgetType,
} from '../types/mainWidgetData';

export type ManifistationType = {
  manifestation: string;
  title: string;
  date: string;
  type: string;
};

export function mapManifistationsData(
  data: ManifistationType[]
): MappedWidgetType {
  if (!data) {
    return {
      mappedData: null,
      error: true,
    };
  }

  const items: MappedWidgetItemType[] = [];
  data.forEach((item) => {
    const key =
      item.type && item.date
        ? `${item.type}, ${item.date}`
        : item.type
          ? item.type
          : item.date;
    items.push({
      key,
      value: item.title,
      type: GRID_CATEGORIES.static,
      id: item.manifestation,
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
