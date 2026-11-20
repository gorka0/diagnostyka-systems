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
    description: 'Bezprzewodowe i komputerowe systemy pomiaru geometrii kół i osi (Microline 8 ROC, Q.Lign 3D). Kompensacja przez przetaczanie, certyfikaty ITS dopuszczające na SKP.',
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
    description: 'Montażownice opon z usztywnioną ramą G-Frame (serie TC 22, TC 45, TC 47). Zakres mocowania do 27" oraz ramiona pomocnicze do opon Run-Flat (RFT).',
    productCount: 5,
    featured: false,
    imageKey: 'product-tc-22',
  },
  {
    id: 'linie-diagnostyczne',
    slug: 'linie-diagnostyczne',
    name: 'Linie diagnostyczne',
    description: 'Rolkowe stanowiska hamulcowe i ścieżki Screen-Testline (SL 600, SL 640 4x4). Badanie sił hamowania do 7,5 kN i testery zawieszenia EUSAMA.',
    productCount: 2,
    featured: false,
    imageKey: 'product-screen-testline',
  },
  {
    id: 'urzadzenia-oem',
    slug: 'urzadzenia-oem',
    name: 'Urządzenia OEM',
    description: 'Specjalistyczna aparatura diagnostyczna z homologacjami fabrycznymi BMW, Grupy VAG, Mercedes-Benz oraz Toyota.',
    productCount: 23,
    featured: false,
    imageKey: 'product-vas-6279',
    subcategories: [
      'VAG (Volkswagen, Audi, Seat, Skoda - certyfikacja VAS)',
      'Mercedes-Benz',
      'BMW (systemy KDS)',
      'Toyota',
    ],
    notes: 'W starym CMS podstrony modeli OEM zawierały wyłącznie nazwy bez opisów technicznych (odnotowano w DO_WYJASNIENIA.md).',
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
    productCount: 7,
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
    description: 'Innowacyjne przyrządy najnowszej generacji Beissbarth (bezprzewodowa geometria 3D Q.Lign T-series / Q.Lign T.41 z technologią Stream-to-X).',
    productCount: 1,
    notes: 'W starym CMS karta Q.Lign T.41 była powiązana ze starym adresem URL testera świateł MLD 815 (odnotowano w DO_WYJASNIENIA.md).',
  },
];
