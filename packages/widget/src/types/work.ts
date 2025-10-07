export type WorkData = Record<WorkKey, string | null | undefined>

export enum WorkKey {
	Alttitle = "alttitle",
	Author = "author",
	Authorname = "authorname",
	Category = "category",
	Categoryname = "categoryname",
	Choreographer = "choreographer",
	Choreographername = "choreographername",
	Collectiveagent = "collectiveagent",
	Collectiveagentname = "collectiveagentname",
	Composer = "composer",
	Composername = "composername",
	Date = "date",
	Keywords = "keywords",
	Librettist = "librettist",
	Librettistname = "librettistname",
	Manifestations = "manifestations",
	Note = "note",
	Source = "source",
	Title = "title",
	Work = "work",
	Language = "language",
	Dedicatee = "dedicatee",
	Dedicateename = "dedicateename",
	Duration = "duration",
}

const WorkLabels = {
	[WorkKey.Alttitle]: "Alternatieve titel",
	[WorkKey.Author]: "Over de auteur",
	[WorkKey.Authorname]: "Auteur",
	[WorkKey.Category]: "Meer van het genre",
	[WorkKey.Categoryname]: "Meer van het genre",
	[WorkKey.Choreographer]: "Over de choreograaf",
	[WorkKey.Choreographername]: "Choreograaf",
	[WorkKey.Collectiveagent]: "Over het collectief",
	[WorkKey.Collectiveagentname]: "Collectief",
	[WorkKey.Composer]: "Over de componist",
	[WorkKey.Composername]: "Componist",
	[WorkKey.Date]: "Datum",
	[WorkKey.Keywords]: "Trefwoorden",
	[WorkKey.Librettist]: "Over de librettist",
	[WorkKey.Librettistname]: "Librettist",
	[WorkKey.Manifestations]: "Gebaseerd op dit werk",
	[WorkKey.Note]: "Informatie",
	[WorkKey.Source]: "Externe bron",
	[WorkKey.Title]: "Titel",
	[WorkKey.Work]: "Werk",
	[WorkKey.Language]: "Taal",
	[WorkKey.Dedicatee]: "Opgedragen aan",
	[WorkKey.Dedicateename]: "Opgedragen aan",
	[WorkKey.Duration]: "Duur",
} as const satisfies Record<WorkKey, string>

export function getWorkLabel(key: WorkKey) {
	return WorkLabels[key]
}
