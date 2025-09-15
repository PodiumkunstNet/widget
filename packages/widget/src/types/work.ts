export type WorkData = Record<WorkKey, string | null | undefined>

export enum WorkKey {
	Alttitle = "alttitle",
	Category = "category",
	Categoryname = "categoryname",
	Choreographer = "choreographer",
	Choreographername = "choreographername",
	Composer = "composer",
	Composername = "composername",
	Date = "date",
	Librettist = "librettist",
	Librettistname = "librettistname",
	Manifestations = "manifestations",
	Note = "note",
	Title = "title",
	Work = "work",
}

const WorkLabels = {
  [WorkKey.Alttitle]: 'Alternatieve titel',
  [WorkKey.Category]: 'Meer van het genre',
  [WorkKey.Categoryname]: 'Meer van het genre',
  [WorkKey.Choreographer]: 'Over de choreograaf',
  [WorkKey.Choreographername]: 'Choreograaf',
  [WorkKey.Composer]: 'Over de componist',
  [WorkKey.Composername]: 'Componist',
  [WorkKey.Date]: 'Datum',
  [WorkKey.Librettist]: 'Over de librettist',
  [WorkKey.Librettistname]: 'Librettist',
  [WorkKey.Manifestations]: "Gebaseerd op dit werk",
  [WorkKey.Note]: 'Informatie',
  [WorkKey.Title]: 'Titel',
  [WorkKey.Work]: 'Werk',

} as const satisfies Record<WorkKey, string>

export function getWorkLabel(key: WorkKey) {
  return WorkLabels[key]
}
