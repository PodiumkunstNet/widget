import { WidgetType } from "../helpers"
import { getWorkLabel, WorkKey } from "../types/work";

// export const FIELD_LABELS = {
//   alttitle: 'Alternatieve titel',
//   date: 'Datum',
//   note: 'Informatie',
//   category: 'Meer van het genre',
//   manifestation: '',
// } as const;

export function getLabelByFieldAndSubType(
  field: WorkKey,
  subType: WidgetType
) {
	if (subType === WidgetType.WorksForAgent) {
		return 'Meer werk van'
	}

	return getWorkLabel(field)
}

// export type FieldLabels = (typeof FIELD_LABELS)[keyof typeof FIELD_LABELS];
