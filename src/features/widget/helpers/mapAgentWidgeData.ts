import {
  MainWidgetType,
  MappedWidgetItemType,
  MappedWidgetType,
  WIDGET_SUB_TYPES,
} from '../types/mainWidgetData';
import { AGENT_CATEGORIES, GRID_CATEGORIES } from '../types/categories';
import { AGENT_FIELD_LABELS } from '@/features/shared/constants/fieldLabels';

const keysToExclude = ['manifestation', 'work'];

export function mapAgentWidgetData(data: MainWidgetType): MappedWidgetType {
  if (!data || typeof data !== 'object') {
    return {
      mappedData: null,
      error: true,
    };
  }

  const items: MappedWidgetItemType[] = [];
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      return;
    }

    if (keysToExclude.includes(key)) {
      return;
    }

    if (key == AGENT_CATEGORIES.role) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GRID_CATEGORIES.static,
      });
      return;
    }

    if (key == AGENT_CATEGORIES.datebirth) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GRID_CATEGORIES.static,
      });
      return;
    }

    if (key == AGENT_CATEGORIES.placebirth) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GRID_CATEGORIES.static,
      });
      return;
    }

    if (key == AGENT_CATEGORIES.datedeath) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GRID_CATEGORIES.static,
      });
      return;
    }

    if (key == AGENT_CATEGORIES.placedeath) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GRID_CATEGORIES.static,
      });
      return;
    }

    if (key == AGENT_CATEGORIES.note) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: 'Bio',
        note: data[key],
        type: GRID_CATEGORIES.information,
      });
      return;
    }
  });

  if (data[AGENT_CATEGORIES.agent]) {
    items.push({
      key: 'Meer werk van',
      value: data?.title,
      type: GRID_CATEGORIES.more,
      subType: WIDGET_SUB_TYPES.worksForAgent,
      id: data?.agent || '',
    });
  }

  const filteredResults = items.filter(
    (item) => item !== null
  ) as MappedWidgetItemType[];

  return {
    mappedData: {
      title: data.title || '',
      items: filteredResults,
    },
    error: false,
  };
}
