/**
 * Reguły parsowania i normalizacji danych produktów Diagnostyka-Systems s.c.
 * Zgodne ze specyfikacją KROK: KARTA PRODUKTU.
 */

import type { ProductItem } from '@/data/products';

export interface ProductVariant {
  id: string;
  label: string;
  description?: string;
  price: number | null;
}

export interface ProductOption {
  id: string;
  name: string;
  spec?: string;
  catalogNo?: string;
  price: number | null;
  priceType: 'delta';
}

export interface ProductSpecItem {
  label: string;
  value: string;
  variantId?: string;
}

export interface ParsedProductModel {
  variants: ProductVariant[];
  options: ProductOption[];
  specs: ProductSpecItem[];
}

/**
 * Parsowanie tekstu ceny do czystej liczby netto w PLN.
 * Obsługuje: "49.600 zł netto", "+5.200 zł netto", "585,-zł", "42 500 zł netto", "1 691 602 115 (5 200 zł netto)"
 */
export function parsePrice(val: string | number | null | undefined): number | null {
  if (val === null || val === undefined || val === '') return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;

  const match = String(val).match(/([0-9]+(?:[\.\s][0-9]{3})+|[0-9]+)(?:,-)?\s*zł/i);
  if (match) {
    const numStr = match[1].replace(/[\.\s]/g, '');
    const num = parseInt(numStr, 10);
    return isNaN(num) ? null : num;
  }
  return null;
}

/**
 * Formatowanie kwoty: "49 600 zł" z twardą spacją (\u00A0) i "netto" w tej samej linii (white-space: nowrap).
 * Nigdy "49.600".
 */
export function formatPrice(
  amount: number | null | undefined,
  prefix: string = ''
): string {
  if (amount === null || amount === undefined) {
    return 'Cena na zapytanie';
  }

  // Formatowanie tysięcy z twardą spacją (np. 49 600)
  const formattedNumber = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

  const pfx = prefix ? `${prefix}` : '';
  return `${pfx}${formattedNumber}\u00A0zł\u00A0netto`;
}

/**
 * Ekstrakcja numeru katalogowego i ceny z tekstu akcesorium lub numeru katalogowego.
 */
export function extractCatalogAndPrice(rawCatNo?: string, rawName: string = ''): {
  cleanName: string;
  spec?: string;
  catalogNo?: string;
  price: number | null;
} {
  const combined = `${rawName} ${rawCatNo || ''}`;
  const price = parsePrice(combined);

  let catalogNo: string | undefined = undefined;
  if (rawCatNo) {
    // Format "1 691 602 115 (5 200 zł netto)"
    const matchParen = rawCatNo.match(/^(.*?)\s*\([^)]*zł[^)]*\)/i);
    if (matchParen) {
      const c = matchParen[1].replace(/^(?:nr\s*kat\.?|nr\s*katalogowy:?)\s*/i, '').trim();
      if (c && !c.includes('zł')) catalogNo = c;
    } else if (rawCatNo.includes('zł')) {
      // Tylko cena w polu catalogNumber
      catalogNo = undefined;
    } else if (rawCatNo.trim().length >= 6) {
      catalogNo = rawCatNo.replace(/^(?:nr\s*kat\.?|nr\s*katalogowy:?)\s*/i, '').trim();
    }
  }

  if (!catalogNo && rawName) {
    const matchName = rawName.match(/\((?:nr\s*kat\.?|nr\s*katalogowy:?)\s*([0-9\.\s-]+[0-9])\)/i);
    if (matchName) {
      catalogNo = matchName[1].trim();
    }
  }

  // Czyszczenie nazwy z prefixów Opcja / Moduł oraz wstawek cenowych
  let cleanName = rawName
    .replace(/^(?:Opcja|Opcjonalnie|Moduł rozszerzający):\s*/i, '')
    .replace(/\s*\((?:nr\s*kat\.?|nr\s*katalogowy:?)\s*[^)]+\)/gi, '')
    .replace(/\s*\([^)]*zł[^)]*\)/gi, '')
    .trim();

  // Druga linia specyfikacji (np. w nawiasie opisowym)
  let spec: string | undefined = undefined;
  const matchSpec = cleanName.match(/^(.*?)\s*\(([^)]+)\)$/);
  if (matchSpec && matchSpec[2].length > 10) {
    cleanName = matchSpec[1].trim();
    spec = matchSpec[2].trim();
  }

  return { cleanName, spec, catalogNo, price };
}

/**
 * Normalizacja tekstu danych technicznych:
 * - Twarda spacja między liczbą a jednostką ("5,2\u00A0km/h", "4,0\u00A0t")
 * - Półpauza w zakresach ("800–2200\u00A0mm")
 * - Spójne separatory " · " zamiast " | " wewnątrz zdań
 */
export function normalizeTechnicalValue(val: string): string {
  if (!val) return val;

  let res = val;

  // Twarda spacja między liczbą a jednostką
  res = res.replace(
    /(\d+(?:,\d+)?)\s*(km\/h|t|kW|mm|kg|m|cm|MP|V|Hz|lux|cd|klux|°C|s|kN)(?![a-zA-Z])/gi,
    '$1\u00A0$2'
  );

  // Zakresy z półpauzą (–) zamiast myślnika (-)
  res = res.replace(/(\d+)\s*[-–—]\s*(\d+)/g, '$1–$2');
  res = res.replace(/(\d+)\s+do\s+(\d+)/gi, '$1–$2');

  // Separator zdań
  res = res.replace(/\s*\|\s*/g, ' · ');

  return res;
}

/**
 * Normalizacja słów do porównywania duplikatów
 */
function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Generowanie unikalnego slug-id dla wariantów i opcji
 */
function toOptionId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `opt-${index}-${slug.slice(0, 24)}`;
}

/**
 * Główna funkcja parsująca produkt do rozdzielonych pojęć:
 * variants[], options[], specs[]
 */
export function parseProductModel(product: ProductItem): ParsedProductModel {
  const { slug, priceNetto, priceVariants, accessories = [], technicalSpecs = {} } = product;

  // 1. WARIANTY (wzajemnie wykluczające się wersje bazowe)
  let variants: ProductVariant[] = [];

  if (slug === 'qb-4') {
    variants = [
      {
        id: 'qb4-2200',
        label: 'QB.4 2200 mm | 3,7 kW',
        description: 'tablet 10,1", nacisk 4\u00A0t, rozstaw 800–2200\u00A0mm',
        price: 49600,
      },
      {
        id: 'qb4-2800',
        label: 'QB.4 2800 mm | 5,0 kW',
        description: 'tablet 10,1", nacisk 4\u00A0t, rozstaw 800–2800\u00A0mm',
        price: 59700,
      },
    ];
  } else if (slug === 'wywazarka-beissbarth-mt-zero-6-touch-awlp-detail') {
    variants = [
      {
        id: 'g30-std',
        label: 'G.30 (mocowanie mechaniczne)',
        description: 'standardowy zacisk koła z nakrętką szybkomocującą',
        price: 24100,
      },
      {
        id: 'g30-p',
        label: 'G.30 P (uchwyt pneumatyczny)',
        description: 'pneumatyczny system mocowania koła P-Lock',
        price: 27000,
      },
    ];
  } else if (slug === 'wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail') {
    variants = [
      {
        id: 'g50-std',
        label: 'G.50 (mocowanie mechaniczne)',
        description: 'monitor 19" LED, standardowy zacisk koła',
        price: 33700,
      },
      {
        id: 'g50-p',
        label: 'G.50 P (uchwyt pneumatyczny)',
        description: 'pneumatyczny system mocowania koła P-Lock',
        price: 38900,
      },
    ];
  } else {
    // 1 wersja bazowa dla pozostałych urządzeń
    const basePrice = parsePrice(priceNetto);
    variants = [
      {
        id: `${slug}-base`,
        label: product.name,
        description: undefined,
        price: basePrice,
      },
    ];
  }

  // 2. OPCJE I WYPOSAŻENIE DODATKOWE
  const options: ProductOption[] = [];

  // Jeśli produkt ma listę accessories (np. QB 4 = 11, MLD 9000 = 10, Q.Lign = 12):
  if (accessories && accessories.length > 0) {
    accessories.forEach((acc, idx) => {
      const { cleanName, spec, catalogNo, price } = extractCatalogAndPrice(
        acc.catalogNumber,
        acc.name
      );

      let finalPrice = price;

      // Dopasowanie ceny z priceVariants jeśli brak w akcesorium
      if (finalPrice === null && priceVariants && priceVariants.length > 0) {
        for (const pv of priceVariants) {
          const normPv = normalizeKey(pv.label);
          const normAcc = normalizeKey(cleanName);
          if (
            normPv.includes(normAcc) ||
            normAcc.includes(normPv) ||
            (catalogNo && normPv.includes(normalizeKey(catalogNo)))
          ) {
            finalPrice = parsePrice(pv.priceNetto);
            break;
          }
        }
      }

      options.push({
        id: toOptionId(cleanName, idx),
        name: cleanName,
        spec,
        catalogNo: catalogNo || undefined,
        price: finalPrice,
        priceType: 'delta',
      });
    });
  } else if (priceVariants && priceVariants.length > 0) {
    // Produkty bez accessories, ale z opcjami w priceVariants (np. winda do kół G.60 P PRO)
    priceVariants.forEach((pv, pvIdx) => {
      const isOptionLike =
        pv.label.startsWith('Opcja:') ||
        pv.label.startsWith('Moduł') ||
        pv.label.startsWith('Opcjonalna');

      if (isOptionLike) {
        const { cleanName, spec, catalogNo } = extractCatalogAndPrice(undefined, pv.label);
        const optPrice = parsePrice(pv.priceNetto);

        options.push({
          id: toOptionId(cleanName, pvIdx),
          name: cleanName,
          spec,
          catalogNo,
          price: optPrice,
          priceType: 'delta',
        });
      }
    });
  }

  // 3. DANE TECHNICZNE (specs)
  const specs: ProductSpecItem[] = [];

  Object.entries(technicalSpecs).forEach(([rawKey, rawVal]) => {
    const normalizedVal = normalizeTechnicalValue(rawVal);

    // Wykrywanie wariantów w nawiasie etykiety, np. "Rozstaw kół (wariant 2200mm)"
    const matchVariant = rawKey.match(/\(wariant\s*([^)]+)\)/i);
    let variantId: string | undefined = undefined;
    let cleanKey = rawKey;

    if (matchVariant) {
      const varTag = matchVariant[1].toLowerCase();
      cleanKey = rawKey.replace(/\s*\(wariant\s*[^)]+\)/i, '').trim();

      if (varTag.includes('2200')) {
        variantId = 'qb4-2200';
      } else if (varTag.includes('2800')) {
        variantId = 'qb4-2800';
      }
    }

    specs.push({
      label: cleanKey,
      value: normalizedVal,
      variantId,
    });
  });

  return {
    variants,
    options,
    specs,
  };
}
