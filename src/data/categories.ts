/**
 * Kategorie produktów w ofercie Diagnostyka-Systems s.c.
 * Źródło: menu i struktura URL ze starej strony www.beissbarth-service.pl
 */

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  featured?: boolean;
  imageKey?: string;
  subcategories?: string[];
  notes?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'geometria',
    slug: 'geometria',
    name: 'Geometria kół',
    description: 'Bezprzewodowe systemy pomiaru geometrii kół i osi CCD oraz 3D (ML 8 Easy CCD Excellence, Q.Lign Compact, Q.Lign T-Series). Kompensacja przez przetaczanie, certyfikaty ITS dopuszczające na SKP.',
    productCount: 3,
    featured: true,
    imageKey: 'product-qlign',
  },
  {
    id: 'wywazarki-do-kol',
    slug: 'wywazarki-do-kol',
    name: 'Wyważarki do kół',
    description: 'Diagnostyczne wyważarki do kół samochodów osobowych, dostawczych i ciężarowych (serie G.20, G.30, G.50, G.60 P PRO, G.90 HD). Sonary bezdotykowe i wskaźniki laserowe.',
    productCount: 6,
    featured: true,
    imageKey: 'product-mt-zero-6',
  },
  {
    id: 'demontazownice',
    slug: 'demontazownice',
    name: 'Demontażownice',
    description: 'Profesjonalne montażownice opon serii TC (TC 22, TCE 22 Pro, TC 45 Pro, TC 45 Pro 2 WDK), INFINITY oraz bezłyżkowe Akimbo Mk2 WDK. Obsługa kół UHP i Run-Flat (RFT).',
    productCount: 6,
    featured: false,
    imageKey: 'product-tc-22',
  },
  {
    id: 'linie-diagnostyczne',
    slug: 'linie-diagnostyczne',
    name: 'Linie diagnostyczne',
    description: 'Rolkowe stanowiska hamulcowe nowej generacji Beissbarth QB 4 (zintegrowane z testerem zawieszenia QS 4 EUSAMA) w architekturze Stream-to-X z obsługą na tablecie, TV lub PC.',
    productCount: 1,
    featured: false,
    imageKey: 'product-qb-4',
  },
  {
    id: 'urzadzenia-do-swiatel',
    slug: 'urzadzenia-do-swiatel',
    name: 'Przyrządy do ustawiania świateł',
    description: 'Cyfrowe przyrządy do kontroli i regulacji świateł serii MLD (MLD 815, MLD 9000). Kamera CMOS do 5 MP, system pozycjonowania laserowego, pełna obsługa reflektorów Matrix LED / Matrix beam 2, Xenon i Halogen.',
    productCount: 2,
    featured: true,
    imageKey: 'product-mld-815',
    subcategories: [
      'Przyrządy z kamerą CMOS (MLD 815, MLD 9000)',
      'Badanie świateł Matrix LED i Matrix beam 2',
      'Opcjonalne szyny i transmisja ASA Network / WiFi',
    ],
  },
  {
    id: 'serwis-klimatyzacji',
    slug: 'serwis-klimatyzacji',
    name: 'Serwis klimatyzacji',
    description: 'Stacje do profesjonalnej obsługi układów klimatyzacji samochodowej na czynniki R134a i R1234yf (Valeo ClimFill, Robinair, SPX).',
    productCount: 0,
    featured: false,
    imageKey: 'cat-klimatyzacja',
    notes: 'W starym CMS podstrona /produkty/serwis-klimatyzacji.html była pusta (brak wprowadzonych kart produktów w bazie CMS).',
  },
  {
    id: 'pojazdy-ciezarowe',
    slug: 'pojazdy-ciezarowe',
    name: 'Pojazdy ciężarowe',
    description: 'Wyważarki i montażownice elektrohydrauliczne Servomat do obsługi kół ciężarowych, autobusowych i maszyn rolniczych do 2,2t.',
    productCount: 11,
    featured: false,
    imageKey: 'product-servomat-ms70',
    subcategories: [
      'Wyważarki do kół ciężarowe',
      'Demontażownice ciężarowe (Servomat)',
      'Geometria ciężarowe',
    ],
  },
  {
    id: 'produkty-uzywane',
    slug: 'produkty-uzywane',
    name: 'Produkty używane',
    description: 'Aparatura diagnostyczna po kapitalnym remoncie fabrycznym z 6-miesięczną gwarancją (geometrie Microline i ścieżki STL 7000 z atestem ITS).',
    productCount: 4,
    featured: false,
    imageKey: 'used-stl-7000',
  },
  {
    id: 'nowosci',
    slug: 'nowosci',
    name: 'Nowości',
    description: 'Innowacyjne przyrządy najnowszej generacji Beissbarth (bezprzewodowa geometria 3D Q.Lign oraz cyfrowy przyrząd do świateł Matrix LED MLD 815).',
    productCount: 0,
  },
];
