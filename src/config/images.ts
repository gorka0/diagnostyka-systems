/**
 * Rejestr konfiguracji zdjęć w serwisie Diagnostyka-Systems.
 * Klucz -> ścieżka pliku w /public/images/, docelowe wymiary i opis.
 *
 * Umieszczenie pliku o danej nazwie w /public/images/ automatycznie
 * zastąpi widoczny placeholder gotowym zdjęciem.
 */

export interface ImageSpec {
  fileName: string;
  path: string;
  dimensions: string;
  aspectRatio: string;
  label: string;
  category: 'company' | 'fleet' | 'products' | 'categories' | 'realizations' | 'certificates';
  alt: string;
}

export const IMAGE_CONFIG: Record<string, ImageSpec> = {
  // Siedziba i flota
  'hero-budynek': {
    fileName: 'hero-budynek.jpg',
    path: '/images/hero-budynek.jpg',
    dimensions: '1600x2000',
    aspectRatio: '4/5',
    label: 'Siedziba i centrum serwisowe Diagnostyka-Systems w Lisim Ogonie',
    category: 'company',
    alt: 'Budynek siedziby i magazynu centralnego Diagnostyka-Systems w Lisim Ogonie',
  },
  'company-building': {
    fileName: 'budynek-firmy-lisi-ogon.jpg',
    path: '/images/budynek-firmy-lisi-ogon.jpg',
    dimensions: '1600x900',
    aspectRatio: '16/9',
    label: 'Siedziba i magazyn firmy (Lisi Ogon k. Bydgoszczy)',
    category: 'company',
    alt: 'Budynek siedziby i magazynu centralnego Diagnostyka-Systems w Lisim Ogonie',
  },
  'service-fleet': {
    fileName: 'busy-serwisowe-flota.jpg',
    path: '/images/busy-serwisowe-flota.jpg',
    dimensions: '1600x900',
    aspectRatio: '16/9',
    label: 'Flota mobilnych wozów serwisowych Beissbarth',
    category: 'fleet',
    alt: 'Wyposażone busy serwisowe Diagnostyka-Systems do obsługi SKP i ASO w terenie',
  },
  'hero-workshop': {
    fileName: 'stanowisko-diagnostyczne-hero.jpg',
    path: '/images/stanowisko-diagnostyczne-hero.jpg',
    dimensions: '1920x1080',
    aspectRatio: '16/9',
    label: 'Stanowisko diagnostyczne SKP / ASO z geometrią 3D',
    category: 'company',
    alt: 'Profesjonalne stanowisko kontroli geometrii kół Beissbarth na Stacji Kontroli Pojazdów',
  },

  // Kategorie i produkty
  'product-qlign': {
    fileName: 'beissbarth-qlign-geometria.jpg',
    path: '/images/beissbarth-qlign-geometria.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Geometria kół Beissbarth (Q.Lign / ML 8 Easy CCD Excellence)',
    category: 'products',
    alt: 'Bezprzewodowy przyrząd do pomiaru geometrii kół 3D Beissbarth Q.Lign',
  },
  'ml-8-easy-ccd-excellence': {
    fileName: 'ml-8-easy-ccd-excellence.webp',
    path: '/images/ml-8-easy-ccd-excellence.webp',
    dimensions: '800x600',
    aspectRatio: '4/3',
    label: 'Geometria Beissbarth ML 8 Easy CCD Excellence',
    category: 'products',
    alt: '8-sensorowy radiowy przyrząd do geometrii kół CCD Beissbarth ML 8 Easy CCD Excellence',
  },
  'qlign-compact': {
    fileName: 'qlign-compact.webp',
    path: '/images/qlign-compact.webp',
    dimensions: '800x600',
    aspectRatio: '4/3',
    label: 'Geometria Beissbarth Q.Lign 3D Compact',
    category: 'products',
    alt: 'Kompaktowy bezprzewodowy system geometrii 3D Beissbarth Q.Lign Compact',
  },
  'qlign-t-series': {
    fileName: 'qlign-t-series.webp',
    path: '/images/qlign-t-series.webp',
    dimensions: '800x600',
    aspectRatio: '4/3',
    label: 'Geometria Beissbarth Q.Lign T-Series',
    category: 'products',
    alt: 'Bezprzewodowy system geometrii 3D Beissbarth Q.Lign T-Series z technologią Stream-to-X',
  },
  'product-mt-zero': {
    fileName: 'beissbarth-mt-zero-wywazarka.jpg',
    path: '/images/beissbarth-mt-zero-wywazarka.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Wyważarki do kół Beissbarth (Seria G)',
    category: 'products',
    alt: 'Dotykowa wyważarka do kół osobowych Beissbarth serii G',
  },
  'product-ms-630': {
    fileName: 'beissbarth-ms-630-montazownica.jpg',
    path: '/images/beissbarth-ms-630-montazownica.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Demontażownice do opon Beissbarth (Seria TC)',
    category: 'products',
    alt: 'Automatyczna montażownica do kół serii TC Beissbarth',
  },
  'product-qb-4': {
    fileName: 'qb-4.webp',
    path: '/images/qb-4.webp',
    dimensions: '1920×1080',
    aspectRatio: '16/9',
    label: 'Linia diagnostyczna Beissbarth QB 4',
    category: 'products',
    alt: 'Stanowisko rolkowe Beissbarth QB 4 z interfejsem Livestream i tabletem',
  },
  'qb-4': {
    fileName: 'qb-4.webp',
    path: '/images/qb-4.webp',
    dimensions: '1920×1080',
    aspectRatio: '16/9',
    label: 'Linia diagnostyczna Beissbarth QB 4',
    category: 'products',
    alt: 'Stanowisko rolkowe Beissbarth QB 4 z interfejsem Livestream i tabletem',
  },
  'product-sl-640': {
    fileName: 'beissbarth-sl-640-linia.jpg',
    path: '/images/beissbarth-sl-640-linia.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Linie diagnostyczne SKP (Beissbarth SL 600 / 640)',
    category: 'products',
    alt: 'Rolkowe stanowisko hamulcowe i ścieżka diagnostyczna Beissbarth SL 640',
  },
  'product-valeo-ac': {
    fileName: 'stacja-klimatyzacji-valeo-climfill.jpg',
    path: '/images/stacja-klimatyzacji-valeo-climfill.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Stacje klimatyzacji Valeo i Beissbarth',
    category: 'products',
    alt: 'Automatyczna stacja do obsługi klimatyzacji Valeo na czynnik R1234yf / R134a',
  },
  'product-mld-815': {
    fileName: 'mld-815.webp',
    path: '/images/mld-815.webp',
    dimensions: '4000x2449',
    aspectRatio: '16/10',
    label: 'Przyrząd do ustawiania świateł Beissbarth MLD 815',
    category: 'products',
    alt: 'Cyfrowy przyrząd do ustawiania świateł Beissbarth MLD 815 z kamerą CMOS',
  },
  'mld-815': {
    fileName: 'mld-815.webp',
    path: '/images/mld-815.webp',
    dimensions: '4000x2449',
    aspectRatio: '16/10',
    label: 'Przyrząd do ustawiania świateł Beissbarth MLD 815',
    category: 'products',
    alt: 'Cyfrowy przyrząd do ustawiania świateł Beissbarth MLD 815 z kamerą CMOS',
  },
  'product-mld-9000': {
    fileName: 'mld-9000.webp',
    path: '/images/mld-9000.webp',
    dimensions: '835x762',
    aspectRatio: '1/1',
    label: 'Przyrząd do ustawiania świateł Beissbarth MLD 9000',
    category: 'products',
    alt: 'Cyfrowy przyrząd do ustawiania świateł Beissbarth MLD 9000 z kamerą CMOS 5 MP',
  },
  'mld-9000': {
    fileName: 'mld-9000.webp',
    path: '/images/mld-9000.webp',
    dimensions: '835x762',
    aspectRatio: '1/1',
    label: 'Przyrząd do ustawiania świateł Beissbarth MLD 9000',
    category: 'products',
    alt: 'Cyfrowy przyrząd do ustawiania świateł Beissbarth MLD 9000 z kamerą CMOS 5 MP',
  },
  'product-oem': {
    fileName: 'urzadzenia-oem-bmw-vag.jpg',
    path: '/images/urzadzenia-oem-bmw-vag.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Urządzenia OEM (BMW KDS, VAG VAS, Mercedes, Toyota)',
    category: 'categories',
    alt: 'Aparatura diagnostyczna z homologacją OEM Beissbarth',
  },
  'product-truck': {
    fileName: 'beissbarth-ciezarowe-seria-ms-mt.jpg',
    path: '/images/beissbarth-ciezarowe-seria-ms-mt.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Urządzenia dla pojazdów ciężarowych (MT 788 / Servomat MS)',
    category: 'categories',
    alt: 'Wyważarki i demontażownice do kół ciężarowych i rolniczych Beissbarth',
  },
  'product-used': {
    fileName: 'beissbarth-urzadzenia-uzywane.jpg',
    path: '/images/beissbarth-urzadzenia-uzywane.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Produkty używane z pisemną gwarancją (Microline / STL 7000)',
    category: 'categories',
    alt: 'Używana i zregenerowana aparatura warsztatowa Beissbarth',
  },
  'product-nowosci': {
    fileName: 'beissbarth-nowosci-qlign-t41.jpg',
    path: '/images/beissbarth-nowosci-qlign-t41.jpg',
    dimensions: '1200x900',
    aspectRatio: '4/3',
    label: 'Nowości Beissbarth (Q.Lign T.41 3D)',
    category: 'categories',
    alt: 'Nowości techniczne Beissbarth Q.Lign technologia pomiarowa 3D',
  },

  // Realizacje u klientów (ASO / SKP)
  'realization-bmw-sikora': {
    fileName: 'realizacja-bmw-sikora.jpg',
    path: '/images/realizacja-bmw-sikora.jpg',
    dimensions: '1200x800',
    aspectRatio: '3/2',
    label: 'Wdrożenie geometrii i linii Beissbarth w ASO BMW Sikora',
    category: 'realizations',
    alt: 'Wdrożenie urządzeń diagnostycznych Beissbarth KDS w autoryzowanym serwisie BMW Sikora',
  },
  'realization-vw-watarski': {
    fileName: 'realizacja-vw-watarski.jpg',
    path: '/images/realizacja-vw-watarski.jpg',
    dimensions: '1200x800',
    aspectRatio: '3/2',
    label: 'Wyposażenie strefy geometrii w ASO VW Wątarski',
    category: 'realizations',
    alt: 'Stanowisko pomiaru geometrii VAS w ASO Volkswagen Wątarski',
  },

  // Certyfikaty i autoryzacje
  'cert-beissbarth': {
    fileName: 'certyfikat-autoryzacji-beissbarth.jpg',
    path: '/images/certyfikat-autoryzacji-beissbarth.jpg',
    dimensions: '800x1130',
    aspectRatio: '1/1.41',
    label: 'Certyfikat autoryzacji dystrybucyjnej i serwisowej Beissbarth GmbH',
    category: 'certificates',
    alt: 'Oficjalny certyfikat autoryzacji Beissbarth GmbH dla Diagnostyka-Systems s.c.',
  },
  'cert-its-skp': {
    fileName: 'certyfikat-its-skp.jpg',
    path: '/images/certyfikat-its-skp.jpg',
    dimensions: '800x1130',
    aspectRatio: '1/1.41',
    label: 'Certyfikat zgodności Instytutu Transportu Samochodowego (ITS)',
    category: 'certificates',
    alt: 'Certyfikat dopuszczenia systemów geometrii kół Beissbarth do badań na SKP',
  },
  'cert-valeo': {
    fileName: 'certyfikat-autoryzacji-valeo.jpg',
    path: '/images/certyfikat-autoryzacji-valeo.jpg',
    dimensions: '800x1130',
    aspectRatio: '1/1.41',
    label: 'Certyfikat autoryzowanego partnera serwisowego Valeo / SPX',
    category: 'certificates',
    alt: 'Certyfikat autoryzacji serwisowej stacji klimatyzacji Valeo',
  },
};

export type ImageKey = keyof typeof IMAGE_CONFIG;
