export enum AgentKey {
  Role = 'role',
  Datebirth = 'datebirth',
  Placebirth = 'placebirth',
  Datedeath = 'datedeath',
  Placedeath = 'placedeath',
  Note = 'note',
  Agent = 'agent'
}

const AgentLabels = {
  [AgentKey.Role]: 'Rol',
  [AgentKey.Datebirth]: 'Geboortedatum',
  [AgentKey.Placebirth]: 'Geboorteplaats',
  [AgentKey.Datedeath]: 'Sterfdatum',
  [AgentKey.Placedeath]: 'Sterfplaats',
  [AgentKey.Note]: 'Meer Informatie',
  [AgentKey.Agent]: 'Agent',
} as const satisfies Record<AgentKey, string>

export function getAgentLabel(key: AgentKey) {
  return AgentLabels[key]
}
