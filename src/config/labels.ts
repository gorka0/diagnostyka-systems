/**
 * Jedno źródło prawdy dla nazewnictwa i etykiet w całym serwisie Diagnostyka-Systems s.c.
 * Zasada: Jedna nazwa na jedną rzecz w całym serwisie.
 */

export const LABELS = {
  // Główne CTA w całym serwisie
  cta: {
    serviceTicket: 'Zgłoszenie serwisowe',
    seeProducts: 'Zobacz produkty',
    askAboutProduct: 'Zapytaj o produkt',
    askAboutPromotion: 'Zapytaj o promocję',
    allContacts: 'Wszystkie kontakty',
    loadMap: 'Załaduj mapę',
    openGoogleMaps: 'Otwórz w Google Maps',
    callNow: 'Zadzwoń',
    sendMessage: 'Wyślij wiadomość',
    showAccessories: (count: number) => `Wyposażenie dodatkowe (${count})`,
  },

  // Główne pozycje menu i linków stopki (dokładnie te same nazwy!)
  nav: [
    { label: 'O nas', to: '/o-nas' },
    { label: 'Oferta', to: '/oferta' },
    { label: 'Produkty', to: '/produkty' },
    { label: 'Serwis', to: '/serwis' },
    { label: 'Realizacje', to: '/realizacje' },
    { label: 'Publikacje', to: '/publikacje' },
    { label: 'Kontakt', to: '/kontakt' },
  ],

  // Formularze
  forms: {
    requiredIndicator: '*',
    requiredFieldNotice: 'Pola oznaczone gwiazdką (*) są wymagane',
    submitting: 'Wysyłanie zgłoszenia…',
    successTitle: 'Wiadomość została wysłana',
    successDesc: 'Dziękujemy za kontakt. Odpowiemy na podany adres e-mail lub telefon.',
    retry: 'Wyślij ponownie',
  },

  // Etykiety działów / specjalistów (z bazy wiedzy / company.ts)
  specialists: {
    technical: 'Informacja techniczna',
    sales: 'Informacja handlowa',
    beissbarth: 'Specjalista ds. Beissbarth',
    valeo: 'Specjalista ds. klimatyzacji Valeo',
  },

  // Stopka i prawne
  footer: {
    tagline: 'Autoryzowany dystrybutor i serwis urządzeń diagnostycznych Beissbarth w Polsce.',
    allRightsReserved: 'Diagnostyka-Systems s.c. Wszelkie prawa zastrzeżone.',
    privacyPolicy: 'Polityka prywatności i cookies',
  },
} as const;
