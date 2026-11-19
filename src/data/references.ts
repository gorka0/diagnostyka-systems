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

export interface ReferenceItem {
  slug: string;
  name: string;
  brand: 'BMW' | 'Volkswagen' | 'inne';
  city?: string;
  url: string;
  photo: string;
  objectPosition?: string; // punkt ogniskowania kadru 3:2

  // Pola opcjonalne - renderowane wyłącznie, gdy są dostarczone i wypełnione
  year?: number | string;
  scope?: string;
  equipment?: string[]; // lista slugów produktów z katalogu (np. ['beissbarth-qlign', 'product-tc-22'])
  quote?: ReferenceQuote;
  gallery?: string[]; // dodatkowe zdjęcia wdrożenia
}

export const REFERENCES_DATA: ReferenceItem[] = [
  {
    slug: 'bmw-sikora',
    name: 'BMW Sikora',
    brand: 'BMW',
    url: 'https://www.bmw-sikora.pl',
    photo: 'bmw-sikora',
    objectPosition: 'center 45%',
  },
  {
    slug: 'bmw-dynamic-torun',
    name: 'BMW Dynamic Toruń',
    brand: 'BMW',
    city: 'Toruń',
    url: 'https://www.bmw-dynamicmotors.pl',
    photo: 'bmw-dynamic-torun',
    objectPosition: 'center',
  },
  {
    slug: 'bmw-dobrzanscy-krakow',
    name: 'BMW Dobrzańscy Kraków',
    brand: 'BMW',
    city: 'Kraków',
    url: 'https://www.bmw-dobrzanski.pl',
    photo: 'bmw-dobrzanscy-krakow',
    objectPosition: 'center',
  },
  {
    slug: 'vw-watarski',
    name: 'VW Wątarski',
    brand: 'Volkswagen',
    url: 'https://watarski.dealer.volkswagen.pl/osobowe',
    photo: 'vw-watarski',
    objectPosition: 'center',
  },
  {
    slug: 'cum-szymacha',
    name: 'CUM Szymacha',
    brand: 'inne',
    city: 'Łódź',
    url: 'https://assistancelodz.pl/',
    photo: 'cum-szymacha',
    objectPosition: 'center',
  },
];
