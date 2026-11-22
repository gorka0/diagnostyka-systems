/**
 * Diagnostyka-Systems s.c. - Jedno źródło prawdy danych firmy.
 * Używane w Header, Footer, Kontakt, JSON-LD oraz formularzach.
 *
 * UWAGA ARCHITEKTONICZNA:
 * Adres rejestrowy (Łochowo) jest INNY niż adres siedziby/magazynu (Lisi Ogon).
 * Adres fizyczny/kontaktowy (Lisi Ogon) służy do korespondencji, wizyt i magazynu.
 * Dane rejestrowe (Łochowo, NIP, REGON) są prezentowane osobno (stopka, noty prawne).
 */

export const COMPANY_EMAIL = 'poczta@beissbarth-service.pl';

export type ContactPurpose = 'ogolne' | 'oferta' | 'serwis';

/**
 * Adresy docelowe per cel formularza.
 * Gdy klient zdecyduje się rozdzielić skrzynki, konfiguracja zmieniana jest wyłącznie tutaj.
 */
export const CONTACT_TARGET_EMAILS: Record<ContactPurpose, string> = {
  ogolne: COMPANY_EMAIL,
  oferta: COMPANY_EMAIL,
  serwis: COMPANY_EMAIL,
};

export interface CompanyAddress {
  label: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  fullInline: string;
}

export interface SpecialistContact {
  role: string;
  name?: string;
  phoneRaw: string;
  phoneDisplay: string;
}

export const COMPANY_DATA = {
  name: 'Diagnostyka-Systems s.c.',
  shortName: 'Diagnostyka-Systems',
  tagline: 'Autoryzowany dystrybutor i serwis urządzeń warsztatowych Beissbarth',
  description: 'Kompleksowe wyposażenie i autoryzowany serwis SKP, ASO oraz serwisów oponiarskich i mechanicznych. Geometria 3D, linie diagnostyczne, wyważarki i montażownice kół.',

  // Globalna flaga widoczności cen katalogowych (domyślnie włączona)
  showPrices: true,

  // Główny adres operacyjny / magazyn / siedziba (do kontaktu i nawigacji)
  officeAddress: {
    label: 'Siedziba i magazyn (adres do korespondencji i wizyt)',
    street: 'ul. Potulicka 38',
    postalCode: '86-065',
    city: 'Lisi Ogon',
    region: 'k. Bydgoszczy',
    fullInline: 'ul. Potulicka 38, 86-065 Lisi Ogon k. Bydgoszczy',
  } as CompanyAddress,

  // Dane formalno-rejestrowe (osobny adres prawny!)
  legalAddress: {
    label: 'Dane rejestrowe firmy',
    companyName: 'Diagnostyka-Systems s.c.',
    street: 'ul. Piaskowa 6',
    postalCode: '86-065',
    city: 'Łochowo',
    nip: '554-258-28-40',
    regon: '093186558',
    fullInline: 'ul. Piaskowa 6, 86-065 Łochowo',
  },

  // E-mail (wyodrębniona stała na wypadek migracji domeny)
  email: COMPANY_EMAIL,

  // Numery telefonów
  phones: {
    mainFax: {
      label: 'Tel. / Fax centrala',
      raw: '+48523716622',
      display: '+48 52 371 66 22',
    },
    techInfo: {
      label: 'Informacja techniczna',
      raw: '+48507073918',
      display: '507 073 918',
    },
    salesInfo: {
      label: 'Informacja handlowa',
      raw: '+48507073919',
      display: '507 073 919',
    },
  },

  // Dedykowani specjaliści (usunięci zgodnie z dyspozycją - obsługa centralna przez numery główne)
  specialists: [] as SpecialistContact[],

  // Kluczowe autoryzacje i partnerstwa
  authorizations: [
    {
      partner: 'Beissbarth GmbH',
      title: 'Autoryzowany Dystrybutor i Serwis',
      scope: 'Geometria kół, linie diagnostyczne, wyważarki, demontażownice',
    },
    {
      partner: 'SPX / Valeo / Robinair',
      title: 'Autoryzowany Partner Serwisowy',
      scope: 'Stacje obsługi klimatyzacji',
    },
  ],

  // Godziny pracy (null dopóki klient nie przekaże oficjalnych godzin)
  workingHours: null as { days: string; hours: string } | null,
} as const;
