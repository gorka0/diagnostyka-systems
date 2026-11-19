/**
 * Reguły wyznaczania facetów i metadanych katalogowych (KROK 2).
 * Wszystkie pola wyznaczane deterministycznie z bazy danych, bez zgadywania.
 */

import { ProductItem } from './products';

export interface ProductMetadata {
  slug: string;
  model: string;
  typ?: string;
  seria?: string;
  zastosowanie: 'osobowe i dostawcze' | 'ciężarowe';
  oemBrand?: 'BMW' | 'VAG' | 'Mercedes-Benz' | 'Toyota';
  stan: 'nowe' | 'używane';
  imageFit: 'contain' | 'cover';
}

/**
 * Normalizacja tekstu do wyszukiwarki:
 * - ignorowanie polskich znaków (ł->l, ą->a, etc.)
 * - ignorowanie wielkości liter
 * - trim
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Zdefiniowane słowniki dopuszczalnych facetów (pokrycie >= 70%)
 */
export const FACET_TYPES = [
  'Geometria kół',
  'Wyważarka do kół',
  'Demontażownica',
  'Linia diagnostyczna',
] as const;

export const FACET_SERIES = [
  'Microline',
  'Q.Lign',
  'MT Zero / Seria G',
  'G-Frame (TC)',
  'Screen-Testline',
  'Servomat',
  'KDS',
  'VAS',
  'Seria MT',
  'Seria MS',
  'Seria BD',
] as const;

export const FACET_APPLICATIONS = [
  'osobowe i dostawcze',
  'ciężarowe',
] as const;

export const FACET_CONDITIONS = [
  'nowe',
  'używane',
] as const;

export const FACET_OEM_BRANDS = [
  'BMW',
  'VAG',
  'Mercedes-Benz',
  'Toyota',
] as const;

// Obrazy wycinków na jasnym/białym tle dostają 'contain' + mix-blend-mode: multiply.
// Obrazy z pełnym tłem dostają 'cover'.
const CONTAIN_IMAGE_SLUGS = new Set<string>([
  'ml-1800-8r',
  'ml-easy-3d',
  'wywazarka-beissbarth-mt-zero-6-lcd-aw-detail',
  'wywazarka-beissbarth-mt-zero-6-touch-awlp-detail',
  'wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail',
  'wywazarka-beissbarth-mt-zero-6-touch-awl-detail',
  'ms-500-demontazownica-beissbarth-serii-g-frame-detail',
  'ms-530-demontazownica-beissbarth-serii-g-frame-detail',
  'ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail',
  'ms-630-demontazownica-beissbarth-serii-g-frame-detail',
  'ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail',
  'linia-diagnostyczna-beissbarth-sl-600-detail',
  'geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail',
  'geometria-beissbarth-microline-4600-detail',
  'vas-6602-detail',
  'wywaarka-beissbarth-mt-848-detail',
  'kds-ii-detail',
  'easy-3d-oem-detail',
]);

/**
 * Deterministyczna ekstrakcja metadanych pojedynczego produktu
 */
export function extractProductMetadata(product: ProductItem): ProductMetadata {
  const { name, categorySlug, originalUrl = '', shortDescription = '', slug } = product;

  // 1. Stan (nowe / używane)
  const stan =
    categorySlug === 'produkty-uzywane' || originalUrl.includes('produkty-uzywane')
      ? 'używane'
      : 'nowe';

  // 2. Marka OEM (z kategorii urządzenia-oem lub URL)
  let oemBrand: ProductMetadata['oemBrand'] = undefined;
  if (categorySlug === 'urzadzenia-oem' || originalUrl.includes('urzadzenia-dla-marki')) {
    if (originalUrl.includes('/vag/') || name.startsWith('VAS')) {
      oemBrand = 'VAG';
    } else if (originalUrl.includes('/bmw/') || name.includes('KDS')) {
      oemBrand = 'BMW';
    } else if (originalUrl.includes('/mercedes/')) {
      oemBrand = 'Mercedes-Benz';
    } else if (originalUrl.includes('/toyota/') || name.includes('Toyota')) {
      oemBrand = 'Toyota';
    }
  }

  // 3. Zastosowanie (osobowe i dostawcze / ciężarowe)
  const nameL = name.toLowerCase();
  const catL = categorySlug.toLowerCase();
  const urlL = originalUrl.toLowerCase();
  const descL = shortDescription.toLowerCase();

  const zastosowanie: ProductMetadata['zastosowanie'] =
    categorySlug === 'pojazdy-ciezarowe' ||
    urlL.includes('ciezarowe') ||
    nameL.includes('ciężar') ||
    descL.includes('ciężar')
      ? 'ciężarowe'
      : 'osobowe i dostawcze';

  // 4. Typ urządzenia (Geometria kół / Wyważarka do kół / Demontażownica / Linia diagnostyczna)
  let typ: string | undefined = undefined;
  if (
    nameL.includes('geometria') ||
    nameL.includes('q.lign') ||
    nameL.includes('kds') ||
    nameL.includes('easy 3d') ||
    catL.includes('geometria') ||
    nameL.startsWith('ml ')
  ) {
    typ = 'Geometria kół';
  } else if (
    nameL.includes('wyważarka') ||
    nameL.includes('wywazarka') ||
    catL.includes('wywazarki') ||
    nameL.startsWith('mt ') ||
    nameL.startsWith('bd ') ||
    ['g20', 'g 30', 'g30', 'g50', 'g60'].some((k) => nameL.startsWith(k))
  ) {
    typ = 'Wyważarka do kół';
  } else if (
    nameL.includes('demontażownica') ||
    nameL.includes('demontazownica') ||
    catL.includes('demontazownice') ||
    nameL.includes('servomat') ||
    nameL.startsWith('tc ') ||
    nameL.startsWith('ms ')
  ) {
    typ = 'Demontażownica';
  } else if (
    nameL.includes('linia') ||
    nameL.includes('stl ') ||
    catL.includes('linie') ||
    nameL.startsWith('sl ')
  ) {
    typ = 'Linia diagnostyczna';
  }

  // 5. Seria
  let seria: string | undefined = undefined;
  if (nameL.includes('q.lign')) {
    seria = 'Q.Lign';
  } else if (nameL.includes('microline') || nameL.startsWith('ml ') || urlL.includes('ml-')) {
    seria = 'Microline';
  } else if (name.startsWith('VAS')) {
    seria = 'VAS';
  } else if (nameL.includes('kds')) {
    seria = 'KDS';
  } else if (nameL.includes('easy 3d')) {
    seria = 'Easy 3D';
  } else if (
    ['g20', 'g 30', 'g30', 'g50', 'g60'].some((k) => nameL.includes(k)) ||
    urlL.includes('mt-zero')
  ) {
    seria = 'MT Zero / Seria G';
  } else if (nameL.includes('tc ') || urlL.includes('g-frame')) {
    seria = 'G-Frame (TC)';
  } else if (nameL.includes('servomat')) {
    seria = 'Servomat';
  } else if (
    nameL.startsWith('sl ') ||
    nameL.startsWith('stl ') ||
    descL.includes('screen-testline')
  ) {
    seria = 'Screen-Testline';
  } else if (nameL.startsWith('mt ') || urlL.includes('mt-')) {
    seria = 'Seria MT';
  } else if (nameL.startsWith('ms ') || urlL.includes('ms-')) {
    seria = 'Seria MS';
  } else if (nameL.startsWith('bd ')) {
    seria = 'Seria BD';
  }

  // 6. Czysty model do wyświetlenia na karcie
  let model = name;
  const prefixes = [
    'Geometria Beissbarth ',
    'Wyważarka Beissbarth ',
    'Demontażownica Beissbarth ',
    'Demontażownica Servomat ',
    'Demontażownica ',
    'Geometria ',
    'Wyważarka ',
    'Linia diagnostyczna Beissbarth ',
    'Używana linia diagnostyczna ',
    'Urządzenie do pomiaru geometrii ',
    'Beissbarth ',
  ];
  for (const pfx of prefixes) {
    if (model.toLowerCase().startsWith(pfx.toLowerCase())) {
      model = model.slice(pfx.length).trim();
      break;
    }
  }
  if (model.startsWith('serii ')) {
    model = model.slice(6).trim();
  }

  // 7. Dopasowanie grafiki
  const imageFit: ProductMetadata['imageFit'] = CONTAIN_IMAGE_SLUGS.has(slug) ? 'contain' : 'cover';

  return {
    slug,
    model,
    typ,
    seria,
    zastosowanie,
    oemBrand,
    stan,
    imageFit,
  };
}

/**
 * Sprawdzenie, czy dany produkt pasuje do frazy wyszukiwania
 */
export function matchesProductSearch(
  product: ProductItem,
  meta: ProductMetadata,
  query: string
): boolean {
  if (!query) return true;
  const normQ = normalizeSearchText(query);
  if (!normQ) return true;

  // Przeszukujemy: model, nazwę, serię, typ, numery katalogowe z akcesoriów, krótki opis
  const normModel = normalizeSearchText(meta.model);
  const normName = normalizeSearchText(product.name);
  const normSeria = normalizeSearchText(meta.seria || '');
  const normTyp = normalizeSearchText(meta.typ || '');
  const normDesc = normalizeSearchText(product.shortDescription);

  if (
    normModel.includes(normQ) ||
    normName.includes(normQ) ||
    normSeria.includes(normQ) ||
    normTyp.includes(normQ) ||
    normDesc.includes(normQ)
  ) {
    return true;
  }

  // Przeszukiwanie numerów katalogowych akcesoriów
  if (product.accessories && product.accessories.length > 0) {
    for (const acc of product.accessories) {
      if (acc.catalogNumber && normalizeSearchText(acc.catalogNumber).includes(normQ)) {
        return true;
      }
      if (acc.name && normalizeSearchText(acc.name).includes(normQ)) {
        return true;
      }
    }
  }

  return false;
}
