export enum GridCategory {
  Information = 'information',
  Website = 'website',
  More = 'more',
  Static = 'static'
}

// export type GridCategory =
//   (typeof GridCategories)[keyof typeof GridCategories];

// export const gridCategoriesToLabelMap = {
//   [GridCategories.Information]: 'Information',
//   [GridCategories.Website]: 'Website',
//   [GridCategories.More]: 'Verdieping',
//   [GridCategories.Static]: 'Verdieping',
// } as const;

export enum AgentCategory {
  Role = 'role',
  Datebirth = 'datebirth',
  Placebirth = 'placebirth',
  Datedeath = 'datedeath',
  Placedeath = 'placedeath',
  Note = 'note',
  Agent = 'agent'
}
