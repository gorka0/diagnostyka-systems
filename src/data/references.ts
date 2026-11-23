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
    equipment: [],
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
    equipment: [],
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
        name: '', // Model niejednoznaczny (Microline 81 Tech, brak w katalogu) -> DO_WYJASNIENIA.md
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
    equipment: [],
  },
  {
    slug: 'skoda-bieranowski',
    name: 'Skoda Bieranowski',
    brand: 'Skoda',
    city: 'Bydgoszcz',
    url: 'https://bieranowski.pl',
    cover: undefined, // Brak zdjęcia obiektu – okładka typograficzna
    equipment: [],
  },
];
