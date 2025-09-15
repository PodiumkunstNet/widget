export type AgentData = Record<AgentKey, string | null | undefined>

export enum AgentKey {
  Agent =		'agent',
  Datebirth =	'datebirth',
  Datedeath =	'datedeath',
  Note =			'note',
  Placebirth = 'placebirth',
  Placedeath = 'placedeath',
  Role =			'role',
  Title =		'title',
}

const AgentLabels = {
  [AgentKey.Agent]:		'Agent',
  [AgentKey.Datebirth]: 'Geboortedatum',
  [AgentKey.Datedeath]: 'Sterfdatum',
  [AgentKey.Note]:		'Meer Informatie',
  [AgentKey.Placebirth]:'Geboorteplaats',
  [AgentKey.Placedeath]:'Sterfplaats',
  [AgentKey.Role]:		'Rol',
  [AgentKey.Title]:		'Titel',
} as const satisfies Record<AgentKey, string>

export function getAgentLabel(key: AgentKey) {
  return AgentLabels[key]
}
