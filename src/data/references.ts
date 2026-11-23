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
    cover: 'bmw-sikora',
    objectPosition: 'center 45%',
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
    equipment: [],
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
        photo: 'mercedes',
        name: 'Microline 81 Tech',
        caption: 'Urządzenie z oznaczeniem Microline 81 Tech',
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
        photo: 'stanowisko-diagnostyczne-hero',
        name: 'Linia diagnostyczna Beissbarth',
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
        photo: 'vag',
        name: 'Montażownica VAS 6279',
        caption: 'Montażownica do opon z homologacją Grupy VAG (VAS 6279)',
      },
    ],
  },
];
