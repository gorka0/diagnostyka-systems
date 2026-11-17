/**
 * Partnerzy handlowi i technologiczni Diagnostyka-Systems s.c.
 * Źródło: podstrony /o-nas/partnerzy.html oraz /o-nas/o-firmie.html
 */

export interface PartnerItem {
  id: string;
  name: string;
  websiteUrl: string;
  scope: string;
  authorizationYear: string;
  logoPlaceholder: string;
}

export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: 'beissbarth',
    name: 'Beissbarth GmbH',
    websiteUrl: 'https://www.beissbarth.com',
    scope: 'Oficjalna autoryzacja fabryczna w zakresie dystrybucji i serwisu pełnego spektrum urządzeń: geometrii kół 3D/CCD, linii diagnostycznych SKP, wyważarek i montażownic.',
    authorizationYear: '2005',
    logoPlaceholder: '/brand/partners/beissbarth.svg',
  },
  {
    id: 'spx',
    name: 'Grupa SPX (Robinair, OTC)',
    websiteUrl: 'https://www.spx.com',
    scope: 'Autoryzowany partner serwisowy w zakresie obsługi stacji klimatyzacji samochodowej.',
    authorizationYear: '2007',
    logoPlaceholder: '/brand/partners/spx.svg',
  },
  {
    id: 'valeo',
    name: 'VALEO',
    websiteUrl: 'https://www.valeo.com',
    scope: 'Autoryzowany serwis urządzeń do obsługi klimatyzacji VALEO (m.in. seria ClimFill).',
    authorizationYear: '2007',
    logoPlaceholder: '/brand/partners/valeo.svg',
  },
];
