import { GridItemsType } from '../components/GridSection/GridSection';

export const gridMocks: GridItemsType = [
  {
    id: '1',
    value: 'Wist je dat?',
    type: 'information',
    note: 'Poppenspel is een zeer gevarieerde theatervorm met beweegbare poppen en/of bewegende objecten. Er zijn veel verschillende soorten poppentheater: Het schimmenspel, bijvoorbeeld het Javaanse Wajang, waarbij de schaduwen van de poppen te zien zijn op een van achteren belicht doek.',
    key: 'Klassiek',
  },
  {
    id: '2',
    value: 'Orfeo ed Euridice',
    type: 'website',
    key: 'Opera',
    url: 'https://google.com',
  },
  {
    id: '3',
    value: 'Dido and Aeneas',
    type: 'website',
    url: 'https://google.com',
    key: 'Klassiek',
  },
  {
    id: '4',
    value: 'Urlicht',
    type: 'website',
    url: 'https://google.com',
    key: 'Klassiek',
  },
  {
    id: '5',
    value: 'Die Zauberflote',
    type: 'more',
    key: 'Klassiek',
  },
  {
    id: '6',
    value: 'Bal masqué',
    type: 'website',
    url: 'https://google.com',
    key: 'Klassiek',
  },
  {
    id: '7',
    value: 'Orfeo de kunst van de liefde',
    type: 'website',
    url: 'https://google.com',
    key: 'Klassiek',
  },
  {
    id: '8',
    value: 'La donna ideale',
    type: 'static',
    key: 'Klassiek',
  },
  {
    id: '9',
    value: 'Wist je dat?',
    type: 'information',
    note: 'Poppenspel is een zeer gevarieerde theatervorm met beweegbare poppen en/of bewegende objecten. Er zijn veel verschillende soorten poppentheater: Het schimmenspel, bijvoorbeeld het Javaanse Wajang, waarbij de schaduwen van de poppen te zien zijn op een van achteren belicht doek.',
    key: 'Klassiek',
  },
  {
    id: '10',
    value: 'Wist je dat?',
    type: 'information',
    note: 'Poppenspel is een zeer gevarieerde theatervorm met beweegbare poppen en/of bewegende objecten. Er zijn veel verschillende soorten poppentheater: Het schimmenspel, bijvoorbeeld het Javaanse Wajang, waarbij de schaduwen van de poppen te zien zijn op een van achteren belicht doek.',
    key: 'Klassiek',
  },
  {
    id: '11',
    value: 'Wist je dat?',
    type: 'information',
    note: 'Poppenspel is een zeer gevarieerde theatervorm met beweegbare poppen en/of bewegende objecten. Er zijn veel verschillende soorten poppentheater: Het schimmenspel, bijvoorbeeld het Javaanse Wajang, waarbij de schaduwen van de poppen te zien zijn op een van achteren belicht doek.',
    key: 'Klassiek',
  },
];

export const infoItemMock = {
  id: '1',
  title: 'Wist je dat?',
  type: 'information' as const,
  note: 'Poppenspel is een zeer gevarieerde theatervorm met beweegbare poppen en/of bewegende objecten. Er zijn veel verschillende soorten poppentheater: Het schimmenspel, bijvoorbeeld het Javaanse Wajang, waarbij de schaduwen van de poppen te zien zijn op een van achteren belicht doek.',
};
