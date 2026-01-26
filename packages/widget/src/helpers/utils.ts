import { AgentData, AgentKey } from "../types/agent"
import { WorkData, WorkKey } from "../types/work"

export function getWorkValue(data: WorkData, key: WorkKey): string {
	return data[key].value
}

export function getAgentValue(data: AgentData, key: AgentKey): string {
	return data[key].value
}