import {
  MainWidgetType,
  MappedWidgetItemType,
  MappedWidgetType,
  WIDGET_SUB_TYPES,
} from '../types/mainWidgetData';
import { GRID_CATEGORIES } from '../types/categories';
import { capitalizeFirstLetter } from '@/features/shared/utils/capitalizeFirstLetter';
import {
  FIELD_LABELS,
  SameFieldPurpose,
  getLabelByType,
} from '@/features/shared/constants/fieldLabels';

const keysToExclude = [
  'work',
  'title',
  'categoryname',
  'composername',
  'librettistname',
  'choreographername',
];
const keysInfo = ['note'];
const keysStatic = ['alttitle', 'date'] as const;
const keyToGetName = ['composer', 'librettist', 'choreographer'] as const;

export function mapMainSectionWidgetData(
  data: MainWidgetType
): MappedWidgetType {
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
    // Exclude keys that we don't want to show
    if (keysToExclude.includes(key)) {
      return;
    }

    if (
      keyToGetName.includes(key as (typeof keyToGetName)[number]) &&
      data[`${key}name`]
    ) {
      items.push({
        key: getLabelByType(
          key as (typeof keyToGetName)[number],
          SameFieldPurpose.moreInfo
        ),
        value: data[`${key}name`],
        type: GRID_CATEGORIES.more,
        id: data[key as (typeof keyToGetName)[number]] || '',
        subType: WIDGET_SUB_TYPES.agent,
      });

      items.push({
        key: getLabelByType(
          key as (typeof keyToGetName)[number],
          SameFieldPurpose.otherWorks
        ),
        value: data[`${key}name`],
        type: GRID_CATEGORIES.more,
        subType: WIDGET_SUB_TYPES.worksForAgent,
        id: data[key as (typeof keyToGetName)[number]] || '',
      });

      return;
    }

    if (key == 'category') {
      items.push({
        key: FIELD_LABELS[key as (typeof keysStatic)[number]],
        value: capitalizeFirstLetter(data?.categoryname ?? ''),
        type: GRID_CATEGORIES.more,
        id: data['category'] || '',
        subType: WIDGET_SUB_TYPES.category,
      });
      return;
    }

    if (key == 'manifestations') {
      if (Number(data['manifestations']) > 0) {
        items.push({
          key: '',
          value: 'Gebaseerd op dit werk',
          type: GRID_CATEGORIES.more,
          id: data['work'] || '',
          subType: WIDGET_SUB_TYPES.manifestation,
        });
      }

      return;
    }

    // Show info fields
    if (keysInfo.includes(key)) {
      items.push({
        key: FIELD_LABELS.note,
        value: 'Synopsis',
        type: GRID_CATEGORIES.information,
        note: data[key],
      });
      return;
    }

    // Show static fields
    items.push({
      key: FIELD_LABELS[key as (typeof keysStatic)[number]],
      value: data[key],
      type: GRID_CATEGORIES.static,
    });
  });

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
