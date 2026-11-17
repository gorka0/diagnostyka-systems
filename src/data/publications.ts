/**
 * Publikacje branżowe Diagnostyka-Systems s.c.
 * Źródło: podstrona /publikacje.html i powiązane artykuły.
 * Poprawiono literówkę z oryginału: "Wademecum" → "Vademecum".
 */

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  sourceJournal: string;
  publicationDate: string;
  summary: string;
  sourceUrl: string;
  originalTitleInCms: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'rentownosc-ogumienia',
    slug: 'rentownosc-ogumienia',
    title: 'Rentowność ogumienia',
    sourceJournal: 'Kwartalnik motoryzacyjny "Moto części"',
    publicationDate: 'Wrzesień 2012',
    summary: 'Artykuł ekspercki analizujący wskaźniki rentowności i stopy zwrotu z inwestycji w profesjonalne stanowiska serwisowe montażu i wyważania kół oraz aparatury geometrii zawieszenia.',
    sourceUrl: 'https://www.beissbarth-service.pl/publikacje/18-rentownosc-ogumienia.html',
    originalTitleInCms: 'Rentowność ogumienia',
  },
  {
    id: 'vademecum-warsztatu-samochodowego',
    slug: 'vademecum-warsztatu-samochodowego',
    title: 'Vademecum warsztatu samochodowego', // Poprawiona literówka ze starego "Wademecum"
    sourceJournal: 'Kwartalnik motoryzacyjny "Moto części"',
    publicationDate: 'Marzec 2012',
    summary: 'Praktyczny poradnik wyposażenia warsztatu samochodowego i Stacji Kontroli Pojazdów: dobór urządzeń pomiarowych, wymogi dopuszczeń ITS oraz procedury kalibracyjne.',
    sourceUrl: 'https://www.beissbarth-service.pl/publikacje/17-wademecum-warsztatu-samochodowego.html',
    originalTitleInCms: 'Wademecum warsztatu samochodowego',
  },
];
