/**
 * Realizacje wdrożeń Diagnostyka-Systems s.c. (KROK 3).
 * Źródło: podstrona /realizacje.html ze starej bazy wiedzy www.beissbarth-service.pl (86 podstron).
 * W bazie realizacje mają wyłącznie nazwę klienta, adres jego strony www i zdjęcie.
 * Wszystkie opcjonalne pola (year, scope, equipment, quote, gallery) renderują się wyłącznie, gdy są wypełnione.
 */

export interface ReferenceQuote {
  text: string;
  author: string;
  role?: string;
}

export interface ReferenceEquipment {
  productSlug?: string;
  name?: string;
  photo?: string;
  caption?: string;
}

export interface ReferenceItem {
  slug: string;
  name: string;
  brand: 'BMW' | 'Volkswagen' | 'Mercedes-Benz' | 'Skoda' | 'inne';
  city?: string;
  url: string;
  cover?: string; // zdjęcie MIEJSCA (budynek lub wnętrze warsztatu), opcjonalne
  objectPosition?: string; // punkt ogniskowania kadru 3:2

  // Wyposażenie (aparatura wdrożona w obiekcie)
  equipment?: ReferenceEquipment[];

  // Pola opcjonalne - renderowane wyłącznie, gdy są dostarczone i wypełnione
  year?: number | string;
  scope?: string;
  quote?: ReferenceQuote;
  gallery?: string[]; // dodatkowe zdjęcia wdrożenia
}

export const REFERENCES_DATA: ReferenceItem[] = [
  {
    slug: 'bmw-sikora',
    name: 'BMW Sikora',
    brand: 'BMW',
    url: 'https://www.bmw-sikora.pl',
    cover: 'bmw-sikora-budynek',
    objectPosition: '55% center',
    equipment: [
      {
        photo: 'bmw-sikora',
        name: 'Beissbarth KDS 3D',
        caption: 'Aparatura do pomiaru geometrii kół Beissbarth KDS 3D w ASO BMW Sikora',
      },
    ],
  },
  {
    slug: 'bmw-dobrzanscy-krakow',
    name: 'BMW Dobrzańscy Kraków',
    brand: 'BMW',
    city: 'Kraków',
    url: 'https://www.bmw-dobrzanski.pl',
    cover: 'bmw-dobrzanscy-krakow',
    objectPosition: 'center',
    equipment: [
      {
        photo: 'realizacja-qlign-stanowisko',
        name: 'Beissbarth Q.Lign',
        caption: 'Stanowisko pomiarowe geometrii 3D Beissbarth Q.Lign z technologią Stream-to-X',
      },
      {
        photo: 'realizacja-qlign-lexus-przod',
        name: 'Stanowisko 3D Q.Lign',
        caption: 'Stanowisko pomiaru geometrii zawieszenia Beissbarth Q.Lign 3D na kanale diagnostycznym',
      },
      {
        photo: 'realizacja-qlign-lexus-bok',
        name: 'Głowice Q.Lign',
        caption: 'Głowice pomiarowe i tarcze Beissbarth Q.Lign zamontowane na pojeździe',
      },
    ],
  },
  {
    slug: 'vw-watarski',
    name: 'VW Wątarski',
    brand: 'Volkswagen',
    city: 'Włocławek',
    url: 'https://watarski.dealer.volkswagen.pl/osobowe',
    cover: 'vw-watarski',
    objectPosition: 'center',
    gallery: ['vw-watarski-stare-warsztat'],
    equipment: [
      {
        photo: 'vw-watarski-stare-warsztat',
        name: 'Geometria kół Beissbarth',
        caption: 'Stanowisko pomiaru geometrii kół z podnośnikiem nożycowym w ASO Volkswagen Wątarski',
      },
    ],
  },
  {
    slug: 'aso-mercedes-wrobel-lubin',
    name: 'MB Professional ASO Mercedes Wróbel Lubin',
    brand: 'Mercedes-Benz',
    city: 'Lubin',
    url: 'https://wrobel.mercedes-benz.pl',
    cover: undefined, // Brak zdjęcia obiektu – okładka typograficzna
    equipment: [
      {
        photo: 'realizacja-mercedes-wrobel-warsztat',
        name: 'Microline 81 R Tech',
        caption: 'Zestaw do pomiaru geometrii kół Beissbarth Microline 81 R Tech w hali ASO Mercedes-Benz Wróbel Lubin',
      },
      {
        photo: 'realizacja-mercedes-wrobel-warsztat',
        name: 'Beissbarth MLD',
        caption: 'Cyfrowy przyrząd do kontroli i ustawiania reflektorów Beissbarth MLD w hali ASO Mercedes',
      },
      {
        photo: 'mercedes',
        name: 'Microline 81 Tech',
        caption: 'Urządzenie pomiarowe z oznaczeniem Microline 81 Tech',
      },
    ],
  },
  {
    slug: 'zs1-kutno',
    name: 'Zespół Szkół Nr 1 im. Stanisława Staszica w Kutnie',
    brand: 'inne',
    city: 'Kutno',
    url: 'https://staszickutno.pl',
    cover: 'zs1-kutno',
    objectPosition: 'center',
    equipment: [
      {
        photo: 'realizacja-zs1-kutno-warsztat',
        name: 'Beissbarth G.50P',
        caption: 'Wyważarka Beissbarth G.50P w szkolnej pracowni wulkanizacji i wyważania kół ZS1 Kutno',
      },
      {
        photo: 'realizacja-zs1-kutno-warsztat',
        name: 'Beissbarth TC45 Pro 2',
        caption: 'Demontażownica do kół Beissbarth TC45 Pro 2 z ramieniem pomocniczym Tecnoroller w pracowni ZS1 Kutno',
      },
      {
        photo: 'stanowisko-diagnostyczne-hero',
        name: 'Linia diagnostyczna',
        caption: 'Stanowisko kontroli pojazdów z linią diagnostyczną i rolkami hamulcowymi Beissbarth',
      },
    ],
  },
  {
    slug: 'skoda-bieranowski',
    name: 'Skoda Bieranowski',
    brand: 'Skoda',
    city: 'Bydgoszcz',
    url: 'https://bieranowski.pl',
    cover: undefined, // Brak zdjęcia obiektu – okładka typograficzna
    gallery: ['skoda-bieranowski'],
    equipment: [
      {
        photo: 'realizacja-skoda-vag-g50p',
        name: 'Beissbarth G.50P (V.A.G)',
        caption: 'Wyważarka Beissbarth G.50P z oficjalnym oznaczeniem homologacji Grupy V.A.G',
      },
      {
        photo: 'vag',
        name: 'Montażownica VAS 6279',
        caption: 'Montażownica do opon z homologacją Grupy VAG (VAS 6279)',
      },
    ],
  },
];
