export const GRID_CATEGORIES = {
  information: 'information',
  website: 'website',
  more: 'more',
  static: 'static',
} as const;

export type GridCategory =
  (typeof GRID_CATEGORIES)[keyof typeof GRID_CATEGORIES];

export const GRID_CATEGORIES_TO_LABEL_MAPPER = {
  [GRID_CATEGORIES.information]: 'Information',
  [GRID_CATEGORIES.website]: 'Website',
  [GRID_CATEGORIES.more]: 'Verdieping',
  [GRID_CATEGORIES.static]: 'Verdieping',
} as const;

export const AGENT_CATEGORIES = {
  role: 'role',
  datebirth: 'datebirth',
  placebirth: 'placebirth',
  datedeath: 'datedeath',
  placedeath: 'placedeath',
  note: 'note',
  agent: 'agent',
} as const;

export type AgentCategory =
  (typeof AGENT_CATEGORIES)[keyof typeof AGENT_CATEGORIES];
