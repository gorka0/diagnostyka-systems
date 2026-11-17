/**
 * Realizacje wdrożeń Diagnostyka-Systems s.c.
 * Źródło: podstrona /realizacje.html oraz podstrony poszczególnych serwisów.
 */

export interface ReferenceItem {
  id: string;
  slug: string;
  clientName: string;
  category: 'ASO' | 'SKP' | 'CUM';
  websiteUrl: string;
  description: string;
  sourceUrl: string;
}

export const REFERENCES_DATA: ReferenceItem[] = [
  {
    id: 'bmw-sikora',
    slug: 'bmw-sikora',
    clientName: 'BMW Sikora',
    category: 'ASO',
    websiteUrl: 'http://www.bmw-sikora.pl',
    description: 'Wdrożenie aparatury diagnostycznej Beissbarth w autoryzowanym serwisie dealerskim BMW Sikora.',
    sourceUrl: 'https://www.beissbarth-service.pl/realizacje/12-bmw-sikora.html',
  },
  {
    id: 'vw-watarski',
    slug: 'vw-watarski',
    clientName: 'VW Wątarski',
    category: 'ASO',
    websiteUrl: 'http://www.watarski.vw.pl',
    description: 'Wyposażenie strefy geometrii i urządzeń diagnostycznych z certyfikacją VAS w ASO Volkswagen Wątarski.',
    sourceUrl: 'https://www.beissbarth-service.pl/realizacje/15-vw-watarski.html',
  },
  {
    id: 'cum-szymacha',
    slug: 'cum-szymacha',
    clientName: 'CUM Szymacha',
    category: 'CUM',
    websiteUrl: 'http://www.szymacha.pl',
    description: 'Instalacja linii diagnostycznej i urządzeń geometrii kół w Centrum Usług Motoryzacyjnych Szymacha.',
    sourceUrl: 'https://www.beissbarth-service.pl/realizacje/16-cum-szymacha.html',
  },
  {
    id: 'bmw-dynamic-torun',
    slug: 'bmw-dynamic-torun',
    clientName: 'BMW Dynamic Toruń',
    category: 'ASO',
    websiteUrl: 'http://www.bmw-dynamicmotors.pl',
    description: 'Dostawa i wdrożenie aparatury kontroli geometrii podwozia Beissbarth KDS w autoryzowanym serwisie BMW Dynamic Motors w Toruniu.',
    sourceUrl: 'https://www.beissbarth-service.pl/realizacje/11-bmw-dynamic-torun.html',
  },
  {
    id: 'bmw-dobrzanscy-krakow',
    slug: 'bmw-dobrzanscy-krakow',
    clientName: 'BMW Dobrzańscy Kraków',
    category: 'ASO',
    websiteUrl: 'http://www.bmw-dobrzanski.pl',
    description: 'Kompleksowe wyposażenie stacji obsługi w aparaturę Beissbarth KDS w ASO BMW Dobrzańscy w Krakowie.',
    sourceUrl: 'https://www.beissbarth-service.pl/realizacje/10-bmw-dobrzanscy-krakow.html',
  },
];
