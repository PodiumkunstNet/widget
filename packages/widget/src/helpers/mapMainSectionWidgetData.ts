import {
  MainWidgetType,
  MappedWidgetType,
  WidgetSubType,
} from '../types/mainWidgetData';
import { GridCategory, GridItem } from '../types/grid';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import {
  FIELD_LABELS,
  SameFieldPurpose,
  getLabelByType,
} from '../constants/fieldLabels';

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

  const items: GridItem[] = [];
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
        value: data[`${key}name`] ?? undefined,
        type: GridCategory.More,
        id: data[key as (typeof keyToGetName)[number]] || '',
        subType: WidgetSubType.Agent,
      });

      items.push({
        key: getLabelByType(
          key as (typeof keyToGetName)[number],
          SameFieldPurpose.otherWorks
        ),
        value: data[`${key}name`] ?? undefined,
        type: GridCategory.More,
        subType: WidgetSubType.WorksForAgent,
        id: data[key as (typeof keyToGetName)[number]] || '',
      });

      return;
    }

    if (key == 'category') {
      items.push({
        key: FIELD_LABELS[key as (typeof keysStatic)[number]],
        value: capitalizeFirstLetter(data?.categoryname ?? ''),
        type: GridCategory.More,
        id: data['category'] || '',
        subType: WidgetSubType.Category,
      });
      return;
    }

    if (key == 'manifestations') {
      if (Number(data['manifestations']) > 0) {
        items.push({
          key: '',
          value: 'Gebaseerd op dit werk',
          type: GridCategory.More,
          id: data['work'] || '',
          subType: WidgetSubType.Manifestation,
        });
      }

      return;
    }

    // Show info fields
    if (keysInfo.includes(key)) {
      items.push({
        key: FIELD_LABELS.note,
        value: 'Synopsis',
        type: GridCategory.Information,
        note: data[key],
      });
      return;
    }

    // Show static fields
    items.push({
      key: FIELD_LABELS[key as (typeof keysStatic)[number]],
      value: data[key],
      type: GridCategory.Static,
    });
  });

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
