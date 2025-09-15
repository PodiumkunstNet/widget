import { WidgetType } from "../helpers"

export const FIELD_LABELS = {
  alttitle: 'Alternatieve titel',
  date: 'Datum',
  note: 'Informatie',
  category: 'Meer van het genre',
  manifestation: '',
} as const;

const lablesByType: Record<string, string> = {
  composer: 'Over de componist',
  librettist: 'Over de librettist',
  choreographer: 'Over de choreograaf',
} as const;

export function getLabelByType(
  field: keyof typeof lablesByType,
  subType: WidgetType
) {
	if (subType === WidgetType.WorksForAgent) {
		return 'Meer werk van'
	}

	return lablesByType[field];
}

// export type FieldLabels = (typeof FIELD_LABELS)[keyof typeof FIELD_LABELS];
