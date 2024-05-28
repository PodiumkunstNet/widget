import { GridCategory } from './categories';

export type MainWidgetType = {
  work: string;
  title?: string | null;
  alttitle?: string | null;
  date?: string | null;
  note?: string | null;
  category?: string | null;
  categoryname?: string | null;
  manifestation?: string | null;
  composer?: string | null;
  composername?: string | null;
  librettist?: string | null;
  librettistname?: string | null;
  choreographer?: string | null;
  choreographername?: string | null;
  [key: string]: string | null | undefined;
};

export type MappedWidgetType = {
  mappedData: {
    title: string;
    items: MappedWidgetItemType[];
  } | null;
  error: boolean;
};

export type MappedWidgetItemType = {
  key: string;
  value: string | undefined | null;
  type: GridCategory;
  id?: string;
  url?: string;
  note?: string | undefined | null;
  subType?: string;
};

//TODO - maybe change name
export const WIDGET_SUB_TYPES = {
  agent: 'agent',
  work: 'work',
  worksForAgent: 'worksForAgent',
  category: 'category',
  manifestation: 'manifestations',
} as const;

export type WidgetSubType =
  (typeof WIDGET_SUB_TYPES)[keyof typeof WIDGET_SUB_TYPES];
