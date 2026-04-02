import type { Term } from "."
import { TileType } from "./grid"

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

const AgentTypes: Record<AgentKey, TileType> = {
	[AgentKey.Agent]: TileType.More, 
	[AgentKey.Datebirth]: TileType.Static,
	[AgentKey.Datedeath]: TileType.Static, 
	[AgentKey.Keywords]: TileType.Static, 
	[AgentKey.Note]: TileType.Information,
	[AgentKey.Organisation]: TileType.More,
	[AgentKey.Origin]: TileType.Static,
	[AgentKey.Periodactivity]: TileType.Static,
	[AgentKey.Placebirth]: TileType.Static,
	[AgentKey.Placedeath]: TileType.Static,
	[AgentKey.Role]: TileType.Static,
	[AgentKey.Title]: TileType.Static,
}

export function getAgentType(key: AgentKey): TileType {
	return AgentTypes[key]
}