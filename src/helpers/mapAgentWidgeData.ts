import {
  MainWidgetType,
  MappedWidgetType,
  WidgetSubType,
} from '../types/mainWidgetData';
import { AgentCategory } from '../types/categories';
import { GridCategory, GridItem } from '../types/grid';
import { AGENT_FIELD_LABELS } from '../constants/fieldLabels';

const keysToExclude = ['manifestation', 'work'];

export function mapAgentWidgetData(data: MainWidgetType): MappedWidgetType {
  if (!data || typeof data !== 'object') {
    return {
      mappedData: null,
      error: true,
    };
  }

  const items: GridItem[] = [];
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      return;
    }

    if (keysToExclude.includes(key)) {
      return;
    }

    if (key == AgentCategory.Role) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GridCategory.Static,
      });
      return;
    }

    if (key == AgentCategory.Datebirth) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GridCategory.Static,
      });
      return;
    }

    if (key == AgentCategory.Placebirth) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GridCategory.Static,
      });
      return;
    }

    if (key == AgentCategory.Datedeath) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GridCategory.Static,
      });
      return;
    }

    if (key == AgentCategory.Placedeath) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: data[key],
        type: GridCategory.Static,
      });
      return;
    }

    if (key == AgentCategory.Note) {
      items.push({
        key: AGENT_FIELD_LABELS[key],
        value: 'Bio',
        note: data[key],
        type: GridCategory.Information,
      });
      return;
    }
  });

  if (data[AgentCategory.Agent]) {
    items.push({
      key: 'Meer werk van',
      value: data?.title,
      type: GridCategory.More,
      subType: WidgetSubType.WorksForAgent,
      id: data?.agent || '',
    });
  }

  const filteredResults = items.filter(
    (item) => item !== null
  ) as GridItem[];

  return {
    mappedData: {
      title: data.title || '',
      items: filteredResults,
    },
    error: false,
  };
}
