import { WidgetType } from "../types/widget";
import { AgentKey, getAgentLabel } from "./agent";
import { getWorkLabel, WorkKey } from "./work";

export function getTileLabel(type: WidgetType.Work, key: WorkKey): string
export function getTileLabel(type: WidgetType.Agent, key: AgentKey): string
export function getTileLabel(type: WidgetType, key: string): string
export function getTileLabel(type: WidgetType | WidgetType.Agent, key: WorkKey | AgentKey | string): string {
	if (type === WidgetType.Work) return getWorkLabel(key as WorkKey)
	if (type === WidgetType.Agent) return getAgentLabel(key as AgentKey)
	return ""
}

export interface SparqlResult {
	head: {
		vars: string[]
	}
	results: {
		bindings: Bindings
	}
}

export type Bindings = {
	[key: string]: Term
}[]

export interface Term<T extends "literal" | "uri" | "bnode" = "literal" | "uri" | "bnode"> {
	type: T
	value: string
}