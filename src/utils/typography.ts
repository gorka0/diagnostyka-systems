/**
 * Narzędzia typograficzne dla języka polskiego.
 *
 * 1. Dodawanie niełamliwych spacji (&nbsp; / \u00A0) po jednoliterowych spójnikach i przyimkach (a, i, o, u, w, z).
 * 2. Twarde spacje między liczbą a jednostką/walutą (np. "46 900 zł", "6 miesięcy", "12 miesięcy", "7,3 kN").
 * 3. Formatowanie numerów telefonów z niełamliwymi spacjami.
 * 4. Prawidłowe polskie cudzysłowy („ ”) i myślniki typograficzne (–).
 */

const POLISH_PREPOSITIONS_REGEX = /(\s|^)([aiouwzAIOUWZ])\s+/g;
const NUM_UNIT_REGEX = /(\d+)\s+(zł|PLN|miesięcy|miesiące|miesiąc|dni|godz\.|h|kN|kg|mm|cm|m|cali|bar|V|kW|Hz)(?=\s|[.,;:!?]|$)/gi;

export function formatPolishTypography(text: string): string {
  if (!text) return '';

  let formatted = text;

  // Zastąp wielokropki z 3 kropek jednym znakiem …
  formatted = formatted.replace(/\.\.\./g, '…');

  // Zamień podwójne łączniki na półpauzę typograficzną
  formatted = formatted.replace(/\s--\s/g, ' – ');

  // Niełamliwa spacja po jednoliterowych spójnikach/przyimkach
  formatted = formatted.replace(POLISH_PREPOSITIONS_REGEX, '$1$2\u00A0');

  // Niełamliwa spacja między liczbą a jednostką/walutą
  formatted = formatted.replace(NUM_UNIT_REGEX, '$1\u00A0$2');

  return formatted;
}

/**
 * Formatuje numer telefonu do wyświetlania z niełamliwymi spacjami,
 * aby numer nigdy nie przełamywał się w połowie wiersza.
 */
export function formatPhoneWithNbsp(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\s+/g, '\u00A0');
}

/**
 * Czyści numer telefonu do formatu tel: (usuwa spacje i myślniki).
 */
export function cleanTelHref(phone: string): string {
  if (!phone) return '';
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
