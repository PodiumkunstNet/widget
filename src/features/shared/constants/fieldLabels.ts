export const SameFieldPurpose = {
  otherWorks: 'otherWorks',
  moreInfo: 'moreInfo',
} as const;

export type SameFieldPurposeType =
  (typeof SameFieldPurpose)[keyof typeof SameFieldPurpose];

export const FIELD_LABELS = {
  alttitle: 'Alternatieve titel',
  date: 'Datum',
  note: 'Informatie',
  category: 'Meer van het genre',
  manifestation: '',
} as const;

export const AGENT_FIELD_LABELS = {
  role: 'Rol',
  datebirth: 'Geboortedatum',
  placebirth: 'Geboorteplaats',
  datedeath: 'Sterfdatum',
  placedeath: 'Sterfplaats',
  note: 'Meer Informatie',
} as const;

const lablesByType = {
  composer: (type: SameFieldPurposeType) =>
    type === SameFieldPurpose.otherWorks
      ? 'Meer werk van'
      : 'Over de componist',
  librettist: (type: SameFieldPurposeType) =>
    type === SameFieldPurpose.otherWorks
      ? 'Meer werk van'
      : 'Over de librettist',
  choreographer: (type: SameFieldPurposeType) =>
    type === SameFieldPurpose.otherWorks
      ? 'Meer werk van'
      : 'Over de choreograaf',
} as const;

export const getLabelByType = (
  field: keyof typeof lablesByType,
  type: SameFieldPurposeType
) => {
  return lablesByType[field](type);
};

export type FieldLabels = (typeof FIELD_LABELS)[keyof typeof FIELD_LABELS];
