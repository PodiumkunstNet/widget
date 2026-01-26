import type { Term } from "."

export type AgentData = Record<AgentKey, Term>

/**
 * TODO - add organisationname
 */
export enum AgentKey {
	Agent = "agent",
	Datebirth = "datebirth",
	Datedeath = "datedeath",
	Keywords = "keywords",
	Note = "note",
	Organisation = "organisation",
	Origin = "origin",
	Periodactivity = "periodactivity",
	Placebirth = "placebirth",
	Placedeath = "placedeath",
	Role = "role",
	Title = "title",

}

const AgentLabels = {
	[AgentKey.Agent]: "Agent",
	[AgentKey.Datebirth]: "Geboortedatum",
	[AgentKey.Datedeath]: "Sterfdatum",
	[AgentKey.Keywords]: "Trefwoorden",
	[AgentKey.Note]: "Meer Informatie",
	[AgentKey.Organisation]: "Organisatie",
	[AgentKey.Origin]: "Herkomst",
	[AgentKey.Periodactivity]: "Actieve periode",
	[AgentKey.Placebirth]: "Geboorteplaats",
	[AgentKey.Placedeath]: "Sterfplaats",
	[AgentKey.Role]: "Rol",
	[AgentKey.Title]: "Titel",
} as const satisfies Record<AgentKey, string>

export function getAgentLabel(key: AgentKey) {
	return AgentLabels[key]
}
