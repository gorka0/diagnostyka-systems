/**
 * Katalog produktów Diagnostyka-Systems s.c.
 * Źródło: wyekstrahowane 1:1 ze starej bazy wiedzy www.beissbarth-service.pl (86 podstron).
 * Żadne dane nie zostały dopisane z głowy.
 */

export interface ProductAccessory {
  name: string;
  quantity?: string;
  catalogNumber?: string;
  isOptional?: boolean;
}

export interface ProductItem {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  details: string[];
  technicalSpecs: Record<string, string>;
  accessories: ProductAccessory[];
  hasFullData: boolean;
  originalUrl: string;
  notes?: string | null;
  subcategory?: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    "slug": "ml-1800-8r",
    "categorySlug": "geometria",
    "name": "Geometria Microline 8 ROC",
    "shortDescription": "Beissbarth ML 8 ROC, to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji  geometrii kół, 4 głowicowy ,8 kamer CCD.  Głowice pomiarowe z nowymi czujnikami CCD oraz elektronicznym kompensatorem, umożliwiają pomiar wszystkich parametrów pojazdu tj.: kątów zbieżności i pochylenia kół, wyprzedzenia osi sworznia zwrotnicy, przestawienia kół i osi pojazdu itp.",
    "details": [
      "Beissbarth ML 8 ROC, to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji  geometrii kół, 4 głowicowy ,8 kamer CCD.  Głowice pomiarowe z nowymi czujnikami CCD oraz elektronicznym kompensatorem, umożliwiają pomiar wszystkich parametrów pojazdu tj.: kątów zbieżności i pochylenia kół, wyprzedzenia osi sworznia zwrotnicy, przestawienia kół i osi pojazdu itp.",
      "Beissbarth ML 8 ROC, to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji geometrii kół, 4 głowicowy ,8 kamer CCD, elektroniczny kompesator. System pracuje w środowisku Windows, charakteryzuje go bardzo przyjazny interfejs programu pomiarowego. Głowice pomiarowe z nowymi czujnikami CCD umożliwiają pomiar wszystkich parametrów pojazdu tj.: kątów zbieżności i pochylenia kół, wyprzedzenia osi sworznia zwrotnicy, przestawienia kół i osi pojazdu itp. Program umożliwia wydruk zmierzonych parametrów w formie tabeli lub graficznej. Baza danych obejmuje ponad 20,000 pojazdów od 55 producentów. KOMPESACJA PRZEZ PRZETACZANiE"
    ],
    "technicalSpecs": {},
    "accessories": [
      {
        "name": "Baza danych DVDROM Beissbarth \"CARs & VANs\"",
        "quantity": "1x",
        "catalogNumber": "982.501.420",
        "isOptional": false
      },
      {
        "name": "Program-CDROM ML",
        "quantity": "1x",
        "catalogNumber": "982.311.400",
        "isOptional": false
      },
      {
        "name": "Monitor LCD 21,5\"",
        "quantity": "1x",
        "catalogNumber": "977.251.414",
        "isOptional": false
      },
      {
        "name": "Drukarka atramentowa z zasilaczem",
        "quantity": "1x",
        "catalogNumber": "977.251.356",
        "isOptional": false
      },
      {
        "name": "Klucz aktywacyjny Dongle",
        "quantity": "1x",
        "catalogNumber": "932.501.023",
        "isOptional": false
      },
      {
        "name": "Pokrowiec ochronny",
        "quantity": "1x",
        "catalogNumber": "932.405.152",
        "isOptional": false
      },
      {
        "name": "Blokada hamulca",
        "quantity": "1x",
        "catalogNumber": "932.401.012",
        "isOptional": false
      },
      {
        "name": "Głowice pomiarowe CCD",
        "quantity": "4x",
        "catalogNumber": "762.501.016",
        "isOptional": false
      },
      {
        "name": "Instrukcja obsługi",
        "quantity": "1x",
        "catalogNumber": "902.312.001",
        "isOptional": false
      },
      {
        "name": "Blokada kierownicy P 8 73",
        "quantity": "1x",
        "catalogNumber": "850.001.669",
        "isOptional": false
      },
      {
        "name": "Obrotnice mechaniczne",
        "quantity": "2x",
        "catalogNumber": "932.501.210",
        "isOptional": false
      },
      {
        "name": "Zaciski samocentrujące",
        "quantity": "4x",
        "catalogNumber": "932.311.020",
        "isOptional": false
      },
      {
        "name": "Moduł zdalnego sterowania (pilot/odbiornik)",
        "quantity": "1x",
        "catalogNumber": "932.501.064",
        "isOptional": true
      },
      {
        "name": "Zaciski typu Multi-Quick 13\"-24\"",
        "quantity": "4x",
        "catalogNumber": "932.401.111",
        "isOptional": true
      },
      {
        "name": "Aluminiowe obrotnice elektroniczne umożliwiające pomiar maksymalnych skrętów",
        "quantity": "2x",
        "catalogNumber": "932.401.098",
        "isOptional": true
      },
      {
        "name": "Płyty rolkowe pod tylne koła",
        "quantity": "2x",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "Zestaw kalibracyjny",
        "quantity": "1x",
        "catalogNumber": "932.401.029",
        "isOptional": true
      },
      {
        "name": "Przewody zasilania awaryjnego",
        "quantity": "1x",
        "catalogNumber": "932.401.019",
        "isOptional": true
      },
      {
        "name": "Spoiler adapter E 1200 55, 50 mm in length",
        "quantity": "2x",
        "catalogNumber": "850.001.633",
        "isOptional": true
      },
      {
        "name": "Urządzenie posiada certyfikat ITS , dopuszczający stosowanie na SKP. Blisko 200 szt. tego typu urządzeń działa w Zespołach Szkół Samochodowych oraz Centrach Egzaminacyjnych, sprawdzających kwalifikacje zawodowe mechaników !",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/ml-1800-8r.html",
    "notes": null
  },
  {
    "slug": "ml-easy-3d",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth ML EASY 3D",
    "shortDescription": "Easy CCD Excellence to profesjonalny przyrząd do pomiaru i regulacji",
    "details": [
      "Easy CCD Excellence to profesjonalny przyrząd do pomiaru i regulacji",
      "geometrii w pojazdach samochodowych o DMC<3,5t.",
      "Easy CCD Excellence to profesjonalny przyrząd do pomiaru i regulacji",
      "geometrii w pojazdach samochodowych o DMC<3,5t.",
      "Urządzenie wyposażone jest w 4 zespoły pomiarowe z",
      "8 sensorami i radiową transmisją danych. Pomiar",
      "realizowany jest wiązką podczerwieni, a wyniki są",
      "wizualizowane na 27” monitorze. Zakres pomiarowy",
      "zastosowanych kamer CCD wynosi 20st.",
      "Automatyczny pomiar kompensacji bicia kół przez",
      "przetaczanie lub uniesienie pojazdu dzięki",
      "zastosowaniu elektronicznego kompensatora.",
      "Głowice pomiarowe z nowymi czujnikami CCD umożliwiają",
      "pomiar wszystkich parametrów",
      "pojazdu tj.: kątów zbieżności i",
      "pochylenia kół, wyprzedzenia osi",
      "sworznia zwrotnicy, przestawienia",
      "kół i osi pojazdu itp.",
      "Program umożliwia wydruk zmierzonych parametrów w formie tabeli lub graficznej. Baza danych obejmuje",
      "ponad 20,000 pojazdów od 55 producentów",
      "Szybkość działania",
      "Dokładność",
      "Mobilność oraz mała przestrzeń robocza"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/ml-easy-3d.html",
    "notes": null
  },
  {
    "slug": "tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail",
    "categorySlug": "nowosci",
    "name": "Urządzenie do pomiaru geometrii Q.Lign T.41",
    "shortDescription": "Urządzenie do pomiaru geometrii Q.Lign T.41",
    "details": [
      "Urządzenie do pomiaru geometrii Q.Lign T.41",
      "Bezprzewodowy Q.Lign T-series to",
      "profesjonalny, ultraszybki przyrząd do pomiaru i regulacji",
      "geometrii w pojazdach samochodowych o DMC<3,5t",
      "pracujący w technologii 3D.",
      "Q.Lign T.41",
      "Urządzenie można zamontować",
      "w odległości 1800mm-3300mm, licząc od osi przedniej",
      "pojazdu, umożliwiając pomiar pojazdów o rozstawie osi w",
      "zakresie od",
      "1750mm do",
      "4600mm. System",
      "może być",
      "zamontowany na",
      "wysokości 2,8m,",
      "obejmując zasięgiem cały obszar roboczy dźwignika.",
      "Prezentacja pomiarów możliwa na TV, tablecie, laptopie,",
      "PC dzięki technologii Stream – to –X. Urodzenie jest wyposażone w 4 kamery wysokiej rozdzielczości.",
      "bezprzewodowy pomiar i komunikacja z automatycznym rozpoznawaniem ekranów",
      "mała przestrzeń robocza",
      "brak konieczności stosowanie wózków i szafek nie ogranicza przestrzeni warsztatowej"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/nowosci/tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail.html",
    "notes": "Niespójność w starym CMS: URL testera świateł MLD 815 zawierał opis geometrii Q.Lign T.41."
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-lcd-aw-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G20",
    "shortDescription": "G20 posiada sonar wbudowany w osłonę",
    "details": [
      "Wyważarka Beissbarth G20",
      "G20 posiada sonar wbudowany w osłonę",
      "koła automatycznie dobiera program",
      "pomiarowy",
      "- G.20 kompaktowa wyważarka do kół",
      "samochodowych o wadze do 75kg.",
      "automatyczny pomiar szerokości kół",
      "stalowych",
      "17” dotykowy monitor LED wskazuje",
      "wartość i pozycję niewyważenia, umożliwia",
      "obsługę w rękawicach",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie",
      "przestrzeni roboczej",
      "czas pomiary niewyważenia to 4,7 s (dla",
      "kół 15”)"
    ],
    "technicalSpecs": {
      "Parametr 1": "Max. średnica koła 36\" | 914mm \"",
      "Parametr 2": "Prędkość pomiarowa 100 rpm",
      "Parametr 3": "Czas pomiaru 4,7 s",
      "Parametr 4": "Max. szerokość obręczy 20 \"",
      "Parametr 5": "max. średnica obręczy 30 \"",
      "Parametr 6": "max. waga koła 75 kg",
      "Zasilanie 230 V | 50": "60 Hz | 1 ph",
      "Parametr 8": "Moc 0,15 kW",
      "Parametr 9": "min. Średnica koła 10 \"",
      "Parametr 10": "Min. Szerokość obręczy 1,5 \""
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-aw-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-touch-awlp-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G 30",
    "shortDescription": "G.30 kompaktowa wyważarka do kół",
    "details": [
      "Wyważarka Beissbarth G 30",
      "G.30 kompaktowa wyważarka do kół",
      "samochodowych o wadze do 75kg.",
      "- automatyczny pomiar szerokości kółinterfejsem użytkownika GUI.",
      "- G.20 kompaktowa wyważarka do kół",
      "samochodowych o wadze do 75kg",
      "automatyczny wybór rodzaju felgi przy użyciu ramienia pomiarowego",
      "17” dotykowy monitor LED wskazuje",
      "wartość i pozycję niewyważenia, umożliwia",
      "obsługę w rękawicach",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie",
      "przestrzeni roboczej",
      "czas pomiary niewyważenia to 4,7 s (dla",
      "kół 15”)"
    ],
    "technicalSpecs": {
      "Parametr 1": "Max. średnica koła 36\" | 914mm \"",
      "Parametr 2": "Prędkość pomiarowa 100 rpm",
      "Parametr 3": "Czas pomiaru 4,7 s",
      "Parametr 4": "Max. szerokość obręczy 20 \"",
      "Parametr 5": "max. średnica obręczy 30 \"",
      "Parametr 6": "max. waga koła 75 kg",
      "Zasilanie 230 V | 50": "60 Hz | 1 ph",
      "Parametr 8": "Moc 0,15 kW",
      "Parametr 9": "min. Średnica koła 10 \"",
      "Parametr 10": "Min. Szerokość obręczy 1,5 \""
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awlp-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-lcd-awl-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G30P",
    "shortDescription": "G.30P kompaktowa wyważarka do kół",
    "details": [
      "Wyważarka Beissbarth  G30P",
      "G.30P kompaktowa wyważarka do kół",
      "samochodowych o wadze do 75kg.",
      "- automatyczny pomiar szerokości kół z pneumatycznym uchwytem",
      "- G.30P kompaktowa wyważarka do kół",
      "samochodowych o wadze do 75kg z pneumatycznym uchwytem do koła",
      "automatyczny pomiar szerokości kół",
      "i>automatyczne rozpoznawanie rodzaju felgi",
      "17” dotykowy monitor LED wskazuje",
      "wartość i pozycję niewyważenia, umożliwia",
      "obsługę w rękawicach",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie",
      "przestrzeni roboczej",
      "czas pomiary niewyważenia to 4,7 s (dla",
      "kół 15”)"
    ],
    "technicalSpecs": {
      "Parametr 1": "Max. średnica koła 36\" | 914mm \"",
      "Parametr 2": "Prędkość pomiarowa 100 rpm",
      "Parametr 3": "Czas pomiaru 4,7 s",
      "Parametr 4": "Max. szerokość obręczy 20 \"",
      "Parametr 5": "max. średnica obręczy 30 \"",
      "Parametr 6": "max. waga koła 75 kg",
      "Zasilanie 230 V | 50": "60 Hz | 1 ph",
      "Parametr 8": "Moc 0,15 kW",
      "Parametr 9": "min. Średnica koła 10 \"",
      "Parametr 10": "Min. Szerokość obręczy 1,5 \""
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awl-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G50",
    "shortDescription": "G.50 profesjonalna wyważarka do kół",
    "details": [
      "Wyważarka Beissbarth G50",
      "G.50 profesjonalna wyważarka do kół",
      "samochodowych o wadze do 75kg.",
      "- automatyczny pomiar szerokości kół",
      "- G.50 profesjonalna wyważarka do kół",
      "samochodowych o wadze do 75kg",
      "automatyczny pomiar szerokości kół",
      "i>automatyczne rozpoznawanie rodzaju felgi",
      "19” dotykowy monitor LED wskazuje",
      "wartość i pozycję niewyważenia, umożliwia",
      "obsługę w rękawicach",
      "Funkcja Split do rozdzielania i chowania",
      "ciężarka za szprychami",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie",
      "przestrzeni roboczej",
      "System Auto Adaptive Mode- dobiera",
      "tolerancję wyważanie propocjonalnie do",
      "wielkości koła w celu zminimalizowania wibracji koła podczas jazdy",
      "Szybkie umieszczanie ciężarka za pomocą dokładnego wskazania mocowania ciężarka",
      "czas pomiary niewyważenia to 4,7 s (dla",
      "kół 15”)"
    ],
    "technicalSpecs": {
      "Parametr 1": "Max. średnica koła 44\" | 1117mm \"",
      "Parametr 2": "Prędkość pomiarowa 100 rpm",
      "Parametr 3": "Czas pomiaru 4,7 s",
      "Parametr 4": "Max. szerokość obręczy 20 \"",
      "Parametr 5": "max. średnica obręczy 30 \"",
      "Parametr 6": "max. waga koła 75 kg",
      "Zasilanie 230 V | 50": "60 Hz | 1 ph",
      "Parametr 8": "Moc 0,15 kW",
      "Parametr 9": "min. Średnica koła 10 \"",
      "Parametr 10": "Min. Szerokość obręczy 1,5 \""
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-touch-awl-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G60 P Pro",
    "shortDescription": "G.60P Pro profesjonalna diagnostyczna wyważarka do kół",
    "details": [
      "Wyważarka Beissbarth G60 P Pro",
      "G.60P Pro profesjonalna diagnostyczna wyważarka do kół",
      "samochodowych o wadze do 75kg z automatycznym uchwytem do kół",
      "- automatyczny pomiar szerokości kół",
      "- G.60P Pro profesjonalna diagnostyczna wyważarka do kół",
      "samochodowych o wadze do 75kg z pneumatycznym uchwytem do kół",
      "automatyczny pomiar szerokości kół",
      "stalowych",
      "automatyczne rozpoznawanie",
      "rodzaju obręczy",
      "(stalowa/aluminiowa)",
      "Virtual Sonar - sonar wbudowany w osłonę",
      "koła automatycznie dobiera program",
      "pomiarowy",
      "19” dotykowy monitor LED wskazuje",
      "wartość i pozycję niewyważenia, umożliwia",
      "obsługę w rękawicach",
      "Funkcja Split do rozdzielania i chowania",
      "ciężarka za szprychami",
      "bezdotykowy pomiar wszystkich parametrów koła: odstęp, średnica",
      "oraz szerokość koła",
      "Wersja PRO – rozbudowane funkcje diagnostyczne",
      "- automatyczny pomiar odchyleń wysokości (promienia) koła",
      "podczas każdego cyklu pomiarowego",
      "funkcja Hubmatch – eliminuje wibracje koła poprzez zmianę",
      "położenia koła na obręczy bez konieczności stosowania rolki",
      "dociskowej/li>",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie",
      "przestrzeni roboczej",
      "System Auto Adaptive Mode- dobiera",
      "tolerancję wyważanie propocjonalnie do",
      "wielkości koła w celu zminimalizowania wibracji koła podczas jazdy",
      "Szybkie umieszczanie ciężarka za pomocą dokładnego wskazania mocowania ciężarka",
      "czas pomiary niewyważenia to 4,7 s (dla",
      "kół 15”)"
    ],
    "technicalSpecs": {
      "Parametr 1": "Max. średnica koła 44\" | 1117mm \"",
      "Parametr 2": "Prędkość pomiarowa 100 rpm",
      "Parametr 3": "Czas pomiaru 4,7 s",
      "Parametr 4": "Max. szerokość obręczy 20 \"",
      "Parametr 5": "max. średnica obręczy 30 \"",
      "Parametr 6": "max. waga koła 75 kg",
      "Zasilanie 230 V | 50": "60 Hz | 1 ph",
      "Parametr 8": "Moc 0,15 kW",
      "Parametr 9": "min. Średnica koła 10 \"",
      "Parametr 10": "Min. Szerokość obręczy 1,5 \""
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awl-detail.html",
    "notes": null
  },
  {
    "slug": "ms-500-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 22",
    "shortDescription": "Urządzenie do montażu/demontażu opon o",
    "details": [
      "Demontażownica Beissbarth TC 22",
      "Urządzenie do montażu/demontażu opon o",
      "zakresie mocowania od 10”do 25” o maksymalnej",
      "średnicy koła do 39” (1000mm)",
      "TC 22 - Urządzenie do montażu/demontażu opon o zakresie mocowania do 25”"
    ],
    "technicalSpecs": {
      "Parametr 1": "Koła samochodu osobowego/dostawczego",
      "szerokość obręczy": "3\" – 12\"",
      "średnica koła": "1000 mm",
      "średnica obręczy koła (mocowanie od wewnątrz)": "12\" - 25\"",
      "średnica obręczy koła (mocowanie od zewnątrz)": "10\" - 22\"",
      "Parametr 6": "Prędkość obrotowa stołu 8/16/obr/min",
      "Wymiary": "(W x H x D)930 x 1850 x 1060 mm",
      "Zasilanie": "400V | 3Ph | 50-60Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-500-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-530-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 22 PRO",
    "shortDescription": "TCE 22 Pro- Urządzenie do montażu/demontażu opon o zakresie",
    "details": [
      "Demontażownica Beissbarth TC 22 PRO",
      "TCE 22 Pro- Urządzenie do montażu/demontażu opon o zakresie",
      "mocowania do 25” z dodatkową kolumną TCX Pro",
      "do obsługi kół UHP i RFT",
      "TC 22 Pro - Urządzenie do montażu/demontażu opon o zakresie mocowania do 22”",
      "Specjalny talerz do dociskania obręczy",
      "Ramię nadążne do odsuwania stopki opony",
      "Dolna rolka do unoszenia dolnej ściany opony",
      "Jednoczesna regulacja skoku pionowego",
      "akcesoriów"
    ],
    "technicalSpecs": {
      "Parametr 1": "Koła samochodu osobowego/dostawczego",
      "szerokość obręczy": "3\" – 12\"",
      "średnica koła": "1000 mm",
      "średnica obręczy koła (mocowanie od wewnątrz)": "12\" - 25\"",
      "średnica obręczy koła (mocowanie od zewnątrz)": "10\" - 22\"",
      "Parametr 6": "Prędkość obrotowa stołu 8/16/obr/min",
      "Wymiary": "(W x H x D)930 x 1850 x 1060 mm",
      "Zasilanie": "400V | 3Ph | 50-60Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 45 PRO",
    "shortDescription": "TCE 45 Pro- Urządzenie do montażu/demontażu opon o zakresie",
    "details": [
      "Demontażownica Beissbarth TC 45 PRO",
      "TCE 45 Pro- Urządzenie do montażu/demontażu opon o zakresie",
      "mocowania do 27” z dodatkową kolumną TCX Pro",
      "do obsługi kół UHP i RFT",
      "TC 45 Pro - Urządzenie do montażu/demontażu opon o zakresie mocowania do 27”",
      "Specjalny talerz do dociskania obręczy",
      "Ramię nadążne do odsuwania stopki opony",
      "Dolna rolka do unoszenia dolnej ściany opony",
      "Jednoczesna regulacja skoku pionowego",
      "akcesoriów"
    ],
    "technicalSpecs": {
      "Parametr 1": "Koła samochodu osobowego/dostawczego",
      "szerokość obręczy": "3\" – 15\"",
      "średnica koła": "1170 mm",
      "średnica obręczy koła (mocowanie od wewnątrz)": "12\" - 27\"",
      "średnica obręczy koła (mocowanie od zewnątrz)": "10\" - 24\"",
      "Parametr 6": "Prędkość obrotowa stołu 8/16/obr/min",
      "Wymiary": "(W x H x D)1030 x 1900 x 1450 mm",
      "Zasilanie": "400V | 3Ph | 50-60Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-630-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth serii TC 45 Pro 2",
    "shortDescription": "Demontażownica Beissbarth serii  TC 45 Pro 2",
    "details": [
      "Demontażownica Beissbarth serii  TC 45 Pro 2",
      "TCE 45 Pro 2- Urządzenie do montażu/demontażu opon o zakresie",
      "mocowania do 27” z dodatkową kolumną TCX Pro",
      "do obsługi kół UHP i RFT",
      "TC 45 Pro 2 - Urządzenie do montażu/demontażu opon o zakresie mocowania do 27”",
      "Specjalny talerz do dociskania obręczy",
      "Ramię nadążne do odsuwania stopki opony",
      "Dolna rolka do unoszenia dolnej ściany opony",
      "Osobna regulacja skoku pionowego",
      "akcesoriów"
    ],
    "technicalSpecs": {
      "Parametr 1": "Koła samochodu osobowego/dostawczego",
      "szerokość obręczy": "3\" – 15\"",
      "średnica koła": "1170 mm",
      "średnica obręczy koła (mocowanie od wewnątrz)": "12\" - 27\"",
      "średnica obręczy koła (mocowanie od zewnątrz)": "10\" - 24\"",
      "Parametr 6": "Prędkość obrotowa stołu 8/16/obr/min",
      "Wymiary": "(W x H x D)1030 x 1900 x 1450 mm",
      "Zasilanie": "400V | 3Ph | 50-60Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-630-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 47 L Pro 2",
    "shortDescription": "TC 47L Pro 2 (230V)- Profesjonalny sprzęt",
    "details": [
      "Demontażownica Beissbarth TC 47 L Pro 2",
      "TC 47L Pro 2 (230V)- Profesjonalny sprzęt",
      "do „bezłyżkowego„ montażu/demontażu",
      "opon",
      "- dodatkowe ramię nadążne ułatwia obsługę kół typu UHP i RFT",
      "TC 47 Pro 2 - Profesjonalny sprzęt",
      "do „bezłyżkowego„ montażu/demontażu",
      "opon z praktycznie całego zakresu",
      "dostępnych obręczy o zakresie mocowania",
      "do 27” z ręcznie sterowanym odpiekaczem",
      "oraz dodatkową, wzmocnioną i wyposażoną",
      "w dodatkowe akcesoria kolumną TCX.Pro2",
      "Specjalne ramię nadążne do",
      "odsuwania stopki opony",
      "Specjalny „pazur” umożliwia demontaż",
      "stopki opony z rantu obręczy bez",
      "konieczności stosowania „łyżki” monterskiej",
      "Dolna rolka do unoszenia dolnej ściany opony",
      "Osobna regulacja skoku pionowego",
      "akcesoriów"
    ],
    "technicalSpecs": {
      "Parametr 1": "Koła samochodu osobowego/dostawczego",
      "szerokość obręczy": "3\" – 17\"",
      "średnica koła": "1170 mm",
      "średnica obręczy koła (mocowanie od wewnątrz)": "12\" - 27\"",
      "średnica obręczy koła (mocowanie od zewnątrz)": "10\" - 24\"",
      "Parametr 6": "Prędkość obrotowa stołu 0-16/obr/min",
      "Wymiary": "(W x H x D)1030 x 2300 x 1450 mm",
      "Zasilanie": "230V | 1Ph | 50-60Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "geometria-beissbarth-ml-8-r-tech-awb-detail",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth ML 8 R TECH AWB",
    "shortDescription": "profesjonalny, ultraszybki przyrząd do pomiaru i regulacji",
    "details": [
      "Q.Lign 3D Compact to bezprzewodowy,",
      "profesjonalny, ultraszybki przyrząd do pomiaru i regulacji",
      "geometrii w pojazdach samochodowych o DMC<3,5t pracujący",
      "w technologii 3D.",
      "Bezprzewodowy Q.Lign 3D Compact",
      "Urządzenie wyposażone jest w 2",
      "bezprzewodowe zespoły pomiarowe z dodatkowymi",
      "wyświetlaczami ilustrującymi mierzone parametry oraz",
      "trwałymi, mocnymi akumulatorami Li-Ion.",
      "Prezentacja pomiarów możliwa na TV, tablecie, laptopie, PC dzięki",
      "technologii Stream – to –X.",
      "Zalety systemu:",
      "Opcjonalne zaciski kół Q.Grip zapewniają błyskawiczny montaż",
      "bez kontaktu z felgą",
      "bezprzewodowy pomiar i komunikacja z automatycznym",
      "rozpoznawaniem ekranów",
      "głowice Q.Lign z dodatkowymi wyświetlaczami QLED",
      "mała przestrzeń robocza-brak potrzeby przestrzeni przed podnosnikiem/kanałem"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/geometria/geometria-beissbarth-ml-8-r-tech-awb-detail.html",
    "notes": "Niespójność w starym CMS: tytuł i URL to ML 8 R TECH AWB, lecz treść opisuje Q.Lign 3D Compact."
  },
  {
    "slug": "linia-diagnostyczna-beissbarth-sl-640-detail",
    "categorySlug": "linie-diagnostyczne",
    "name": "Linia diagnostyczna Beissbarth SL 640",
    "shortDescription": "Screen-testline  SL 640 (z funkcją 4x4) (400V,50Hz)",
    "details": [
      "Linia diagnostyczna Beissbarth SL 640",
      "Screen-testline  SL 640 (z funkcją 4x4) (400V,50Hz)",
      "Linia diagnostyczna SL 640 (z funkcją 4x4) (400V,50Hz) przeznaczona jest do diagnostyki układu jezdnego pojazdów o DMC<3,5t i rozstawie kół 800-2200mm. Wszystkie zmierzone wartości tj. ocena stanu zawieszenia na podstawie metody EUSAMA, siły hamowania i uślizgu bocznego są rejestrowane i kalkulowane przy użyciu jednostki PC. Obsługa odbywa się przez wybór odpowiedniego trybu pracy (ręczny, automatyczny, superautomatic) pilotem zdalnego sterowania. Wyniki pomiarów są prezentowane w formie czytelnych diagramów na monitorze 17”. Wersja SL 640 posiada zintegrowaną funkcję pomiaru pojazdów z napędem na 4 koła.",
      "Specyfikacja wyposażenia",
      "No.",
      "Specyfikacja wyposażenia",
      "No.",
      "Oprogramowanie BNET",
      "1x",
      "985.691.405",
      "Przewód przyłączeniowy (9-pin D-Sub) do przetwornika BNET/RS232",
      "1x",
      "960.703.543",
      "Pilot zdalnego sterowania",
      "1x",
      "935.702.001",
      "BNET Software licence (dongle No.2) do TL-SL600/640/680 PC-Visualisation",
      "1x",
      "935.701.018",
      "Mobilna jednostka PC (na kołach) z drukarką,Windows XP PC, 17\" Monitor",
      "1x",
      "935.701.016",
      "ST 600 zestaw przyłączeniowy z (2.5m)",
      "1x",
      "935.633.012",
      "ST 600 płyta poślizgu (“płyta zbieżności”)",
      "1x",
      "935.631.010",
      "Pakiet montażowy SA 600",
      "1x",
      "935.623.012",
      "BNET tester zawieszenia SA 600 (metoda EUSAMA) z silnikami 2.5kW (400V,50Hz)",
      "1x",
      "935.621.017",
      "installation kit mainswitch box",
      "1x",
      "935.603.247",
      "BD 600 zestaw montażowy",
      "1x",
      "935.603.042",
      "BNET/RS232 przetwornik do BD500/600 i TL/SL",
      "1x",
      "935.602.208",
      "BNET rolki hamulcowe BF 600 z silnikami 3.7kW, prędkość pomiarowa 2.7km/h (400V/50Hz)",
      "1x",
      "935.602.139",
      "BNET-\"RS232\" – moduł wydruku I procesor komunikacyjny do BD500/600 I TL600. W zestawie z Dongle nr 2",
      "1x",
      "935.601.089",
      "BNET główny przełącznik (400V) z 30m kablem komunikacyjnym 15m",
      "1x",
      "935.601.085",
      "Rama fundamentowa",
      "1x",
      "935.694.001"
    ],
    "technicalSpecs": {
      "Zakres sił hamowania": ": 0 - 7,5kN przy obciążeniu 3.5t na oś",
      "Silnik/przekładnia": "2x3.7kW, 2.7 km/h prędkość pomiarowa, hamulec elektromag., sterowanie 4x4",
      "Rolki hamulcowe": "o przedłużonej żywotności, pokryte piaskiem kwarcowym, Ø 205 mm, szerokość 700 mm, tylna rolka uniesiona o 25mm",
      "Parametr 4": "Zasilanie 5 x 2,5 mm²,bezpieczniki 3 x 20 A slow (400V)",
      "Parametr 5": "Tester zawieszenia pracuje w oparciu o tzw. metodę EUSAMA. Dwa silniki elektryczne o mocy (2,7 kW) wywołują drgania płyt ze zintegrowanymi sensorami o amplitudzie 6mm.",
      "Parametr 6": "Płyta uślizgu dokonuje pomiaru ustawienia kół jezdnych (zbieżność/rozbieżność).",
      "Parametr 7": "Magistrala BNET umożliwia podłączenia komputera PC i korzystanie z zasobów sieci ASA.",
      "Przyłącze sprężonego powietrza": "6- 10 bar",
      "Nośność podnośnika": "2,5 t",
      "Dopuszczalny nacisk osi": "4,0 t",
      "Czas podnoszenia": "ok. 5 sec przy ciśnieniu 6 bar",
      "Wybór trybu pomiarowego i modułu pomiarowego": "1 Polu komunikacji",
      "Parametr 13": "2 Ikona aktywnej funkcji",
      "Parametr 14": "3 Ikona aktywowanej funkcji",
      "Parametr 15": "4 – 7 Interfejs użytkownika",
      "Parametr 16": "8-9 Pole wyboru modułu pomiarowego",
      "Parametr 17": "Kontrola ustawienia kół",
      "Parametr 18": "Pomiar sił hamowania",
      "Parametr 19": "Ocena zawieszenia",
      "Parametr 20": "Protokoły pomiarowe"
    },
    "accessories": [
      {
        "name": "Pneumatyczny podnośnik mierzonej osi",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "przeznaczony jest do stosowania z dowolnym modułem rolek hamulcowych w celu unoszenia/opuszczania osi pojazdu na stanowisko pomiarowe. Funkcja ta jest w zalecana firmach obsługujących ospojlerowane pojazdy Kub z obniżonym zawieszeniem, celem uniknięcia uszkodzeń spojlerów przy najeżdżaniu na stanowisko pomiarowe.",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-640-detail.html",
    "notes": null
  },
  {
    "slug": "linia-diagnostyczna-beissbarth-sl-600-detail",
    "categorySlug": "linie-diagnostyczne",
    "name": "Linia diagnostyczna Beissbarth SL 600",
    "shortDescription": "Screen-testline  SL 600 (bez funkcji 4x4) (400V,50Hz)",
    "details": [
      "Linia diagnostyczna Beissbarth SL 600",
      "Screen-testline  SL 600 (bez funkcji 4x4) (400V,50Hz)",
      "Linia diagnostyczna SL 600(bez funkcji 4x4) (400V,50Hz) przeznaczona jest do diagnostyki układu jezdnego pojazdów o DMC<3,5t i rozstawie kół 800-2200mm. Wszystkie zmierzone wartości tj. ocena stanu zawieszenia na podstawie metody EUSAMA, siły hamowania i uślizgu bocznego są rejestrowane i kalkulowane przy użyciu jednostki PC. Obsługa odbywa się przez wybór odpowiedniego trybu pracy (ręczny, automatyczny, superautomatic) pilotem zdalnego sterowania. Wyniki pomiarów są prezentowane w formie czytelnych diagramów na monitorze 17”. Wersja SL 640 posiada zintegrowaną funkcję pomiaru pojazdów z napędem na 4 koła.",
      "Specyfikacja wyposażenia",
      "No.",
      "Specyfikacja wyposażenia",
      "No.",
      "Oprogramowanie BNET",
      "1x",
      "985.691.405",
      "Przewód przyłączeniowy (9-pin D-Sub) do przetwornika BNET/RS232",
      "1x",
      "960.703.543",
      "Pilot zdalnego sterowania",
      "1x",
      "935.702.001",
      "BNET Software licence (dongle No.2) do TL-SL600/640/680 PC-Visualisation",
      "1x",
      "935.701.018",
      "Mobilna jednostka PC (na kołach) z drukarką,Windows XP PC, 17\" Monitor",
      "1x",
      "935.701.016",
      "ST 600 zestaw przyłączeniowy z (2.5m)",
      "1x",
      "935.633.012",
      "ST 600 płyta poślizgu (“płyta zbieżności”)",
      "1x",
      "935.631.010",
      "Pakiet montażowy SA 600",
      "1x",
      "935.623.012",
      "BNET tester zawieszenia SA 600 (metoda EUSAMA) z silnikami 2.5kW (400V,50Hz)",
      "1x",
      "935.621.017",
      "installation kit mainswitch box",
      "1x",
      "935.603.247",
      "BD 600 zestaw montażowy",
      "1x",
      "935.603.042",
      "BNET/RS232 przetwornik do BD500/600 i TL/SL",
      "1x",
      "935.602.208",
      "BNET rolki hamulcowe BF 600 z silnikami 3.7kW, prędkość pomiarowa 2.7km/h (400V/50Hz)",
      "1x",
      "935.602.139",
      "BNET-\"RS232\" – moduł wydruku I procesor komunikacyjny do BD500/600 I TL600. W zestawie z Dongle nr 2",
      "1x",
      "935.601.089",
      "BNET główny przełącznik (400V) z 30m kablem komunikacyjnym 15m",
      "1x",
      "935.601.085",
      "Rama fundamentowa",
      "1x",
      "935.694.001"
    ],
    "technicalSpecs": {
      "Zakres sił hamowania": ": 0 - 7,5kN przy obciążeniu 3.5t na oś",
      "Silnik/przekładnia": "2x3.7kW, 2.7 km/h prędkość pomiarowa, hamulec elektromag., sterowanie 4x4",
      "Rolki hamulcowe": "o przedłużonej żywotności, pokryte piaskiem kwarcowym, Ø 205 mm, szerokość 700 mm, tylna rolka uniesiona o 25mm",
      "Parametr 4": "Zasilanie 5 x 2,5 mm²,bezpieczniki 3 x 20 A slow (400V)",
      "Parametr 5": "Tester zawieszenia pracuje w oparciu o tzw. metodę EUSAMA. Dwa silniki elektryczne o mocy (2,7 kW) wywołują drgania płyt ze zintegrowanymi sensorami o amplitudzie 6mm.",
      "Parametr 6": "Płyta uślizgu dokonuje pomiaru ustawienia kół jezdnych (zbieżność/rozbieżność).",
      "Parametr 7": "Magistrala BNET umożliwia podłączenia komputera PC i korzystanie z zasobów sieci ASA.",
      "Przyłącze sprężonego powietrza": "6- 10 bar",
      "Nośność podnośnika": "2,5 t",
      "Dopuszczalny nacisk osi": "4,0 t",
      "Czas podnoszenia": "ok. 5 sec przy ciśnieniu 6 bar",
      "Wybór trybu pomiarowego i modułu pomiarowego": "1 Polu komunikacji",
      "Parametr 13": "2 Ikona aktywnej funkcji",
      "Parametr 14": "3 Ikona aktywowanej funkcji",
      "Parametr 15": "4 – 7 Interfejs użytkownika",
      "Parametr 16": "8-9 Pole wyboru modułu pomiarowego",
      "Parametr 17": "Kontrola ustawienia kół",
      "Parametr 18": "Pomiar sił hamowania",
      "Parametr 19": "Ocena zawieszenia",
      "Parametr 20": "Protokoły pomiarowe"
    },
    "accessories": [
      {
        "name": "Pneumatyczny podnośnik mierzonej osi",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "przeznaczony jest do stosowania z dowolnym modułem rolek hamulcowych w celu unoszenia/opuszczania osi pojazdu na stanowisko pomiarowe. Funkcja ta jest w zalecana firmach obsługujących ospojlerowane pojazdy Kub z obniżonym zawieszeniem, celem uniknięcia uszkodzeń spojlerów przy najeżdżaniu na stanowisko pomiarowe.",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-600-detail.html",
    "notes": null
  },
  {
    "slug": "geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail",
    "categorySlug": "produkty-uzywane",
    "name": "Geometria Beissbarth ML 1800-8R",
    "shortDescription": "Beissbarth ML1800-8R, to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji  geometrii kół, 4 głowicowy ,8 kamer CCD.",
    "details": [
      "Beissbarth ML1800-8R, to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji  geometrii kół, 4 głowicowy ,8 kamer CCD.",
      "Profesjonalna geometria komputerowa.",
      "Wersja z radiową transmisją danych.",
      "Beissbarth ML1800-8R",
      ", to bezprzewodowy przyrząd przeznaczony do pomiaru i regulacji geometrii kół, 4 głowicowy ,8 kamer CCD.",
      "System pracuje w środowisku Windows, charakteryzuje go bardzo przyjazny interfejs programu pomiarowego. Głowice pomiarowe z nowymi czujnikami CCD umożliwiają pomiar wszystkich parametrów pojazdu tj.: kątów zbieżności i pochylenia kół, wyprzedzenia osi sworznia zwrotnicy, przestawienia kół i osi pojazdu itp.",
      "Program umożliwia wydruk zmierzonych parametrów w formie tabeli lub graficznej. Baza danych obejmuje ponad 20,000 pojazdów od 55 producentów."
    ],
    "technicalSpecs": {},
    "accessories": [
      {
        "name": "Baza danych DVDROM",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Beissbarth",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "\"CARs & VANs\"",
        "quantity": "1x",
        "catalogNumber": "982.501.420",
        "isOptional": false
      },
      {
        "name": "Program-CDROM ML 1800",
        "quantity": "1x",
        "catalogNumber": "982.311.400",
        "isOptional": false
      },
      {
        "name": "Monitor LCD > 19”",
        "quantity": "1x",
        "catalogNumber": "977.251.414",
        "isOptional": false
      },
      {
        "name": "Drukarka atramentowa z zasilaczem",
        "quantity": "1x",
        "catalogNumber": "977.251.356",
        "isOptional": false
      },
      {
        "name": "Klucz aktywacyjny Dongle",
        "quantity": "1x",
        "catalogNumber": "932.501.023",
        "isOptional": false
      },
      {
        "name": "Pokrowiec ochronny",
        "quantity": "1x",
        "catalogNumber": "932.405.152",
        "isOptional": false
      },
      {
        "name": "Blokada hamulca",
        "quantity": "1x",
        "catalogNumber": "932.401.012",
        "isOptional": false
      },
      {
        "name": "Głowice pomiarowe CCD",
        "quantity": "4x",
        "catalogNumber": "762.501.016",
        "isOptional": false
      },
      {
        "name": "Instrukcja obsługi",
        "quantity": "1x",
        "catalogNumber": "902.312.001",
        "isOptional": false
      },
      {
        "name": "Blokada kierownicy P 8 73",
        "quantity": "1x",
        "catalogNumber": "850.001.669",
        "isOptional": false
      },
      {
        "name": "Obrotnice mechaniczne",
        "quantity": "2x",
        "catalogNumber": "932.501.210",
        "isOptional": false
      },
      {
        "name": "Zaciski samocentrujące",
        "quantity": "4x",
        "catalogNumber": "932.311.020",
        "isOptional": false
      },
      {
        "name": "Moduł zdalnego sterowania (pilot/odbiornik)",
        "quantity": "1x",
        "catalogNumber": "932.501.064",
        "isOptional": true
      },
      {
        "name": "Zaciski typu Multi-Quick 13”-24”",
        "quantity": "4x",
        "catalogNumber": "932.401.111",
        "isOptional": true
      },
      {
        "name": "Aluminiowe obrotnice elektroniczne umożliwiające pomiar maksymalnych skrętów",
        "quantity": "2x",
        "catalogNumber": "932.401.098",
        "isOptional": true
      },
      {
        "name": "Płyty rolkowe pod tylne koła",
        "quantity": "2x",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "Zestaw kalibracyjny",
        "quantity": "1x",
        "catalogNumber": "932.401.029",
        "isOptional": true
      },
      {
        "name": "Przewody zasilania awaryjnego",
        "quantity": "1x",
        "catalogNumber": "932.401.019",
        "isOptional": true
      },
      {
        "name": "Spoiler adapter E 1200 55, 50 mm in length",
        "quantity": "2x",
        "catalogNumber": "850.001.633",
        "isOptional": true
      },
      {
        "name": "Urządzenie posiada certyfikat ITS nr Z/15/038/11, dopuszczający stosowanie na SKP. Blisko 200 szt. tego typu urządzeń działa w Zespołach Szkół Samochodowych oraz Centrach Egzaminacyjnych, sprawdzających kwalifikacje zawodowe mechaników !",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail.html",
    "notes": "Zdublowany rekord w bazie CMS z datą/timestampem w adresie URL."
  },
  {
    "slug": "geometria-beissbarth-microline-4000-windows-detail",
    "categorySlug": "produkty-uzywane",
    "name": "Geometria Beissbarth Microline 4000",
    "shortDescription": "Microline 4000 - bezprzewodowy, komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu 8 kamer CCD. Aktualna baza danych wzorcowych, kolorowy wydruk.",
    "details": [
      "Microline 4000 - bezprzewodowy, komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu 8 kamer CCD. Aktualna baza danych wzorcowych, kolorowy wydruk.",
      "Microline 4000",
      "– bezprzewodowy, komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu 8 kamer CCD. Aktualna baza danych wzorcowych, kolorowy wydruk.",
      "W skład wyposażenia podstawowego MICROLINE 4000 wchodzą:",
      "komputer  PC,",
      "monitor 17”,",
      "klawiatura,",
      "szafka diagnostyczna,",
      "4 zespoły pomiarowe,",
      "rozpórka pedału hamulca i blokada kierownicy,",
      "komplet przewodów,",
      "drukarka atramentowa,",
      "obrotnice elektroniczne",
      "zaciski typu Quick ;",
      "płyty rolkowe pod tylne koła 2 szt"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-microline-4000-windows-detail.html",
    "notes": null
  },
  {
    "slug": "geometria-beissbarth-microline-4600-detail",
    "categorySlug": "produkty-uzywane",
    "name": "Geometria Beissbarth Microline 4600",
    "shortDescription": "Microline 4600/4608 - komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu kamer CCD (6 lub 8 sensorów), transmisja danych przewodowa. Aktualna baza danych wzorcowych, kolorowy wydruk.",
    "details": [
      "Microline 4600/4608 - komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu kamer CCD (6 lub 8 sensorów), transmisja danych przewodowa. Aktualna baza danych wzorcowych, kolorowy wydruk.",
      "Microline 4600/4608",
      "- komputerowy system do pomiaru i regulacji geometrii kół pojazdów. Pomiar wiązką podczerwieni przy użyciu kamer CCD ( 6 lub 8 sensorów) , transmisja danych przewodowa. Aktualna baza danych wzorcowych, kolorowy wydruk.",
      "W skład wyposażenia podstawowego MICROLINE 4600/4608 wchodzą:",
      "komputer PC,",
      "monitor 17”,",
      "klawiatura,",
      "szafka diagnostyczna,",
      "4 zespoły pomiarowe,",
      "rozpórka pedału hamulca i blokada kierownicy,",
      "komplet przewodów,",
      "drukarka atramentowa,",
      "obrotnice mechaniczne",
      "zaciski typu Quick",
      "płyty rolkowe pod tylne koła 2 szt"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-microline-4600-detail.html",
    "notes": null
  },
  {
    "slug": "linia-diagnostyczna-beissbarth-stl-7000-detail",
    "categorySlug": "produkty-uzywane",
    "name": "Używana linia diagnostyczna STL 7000",
    "shortDescription": "Linia diagnostyczna Beissbarth STL 7000",
    "details": [
      "Używana linia diagnostyczna STL 7000",
      "Linia diagnostyczna Beissbarth STL 7000",
      "Używana linia do diagnostyki podwozia „Screen-Testline 7000”  - atest ITS. Urządzenie po kapitalnym remoncie i odnowieniu jest  objęte 6 miesięczną gwarancją.",
      "Modułowy system do testowania podwozia",
      "\"screen-testline 7000\"",
      "firmy Beissbarth skonstruowany na bazie jednostki komputerowej PC wyposażony w monitor kolorowy, twardy dysk, stację napędu dysków elastycznych. Służy do szybkiej inspekcji stanu technicznego przed przyjęciem pojazdu do warsztatu, umożliwia pełną diagnostykę podwozia, gromadzenie i analizę zmierzonych wartości. Zapis protokółów pomiarowych do pamięci pozwala na opracowanie akcji promocyjnych dla stałych klientów. Programy pomiarowe prezentują nie tylko gotowe wyniki, ale przede wszystkim całkowity przebieg procesu kontroli zawieszenia i hamulców.",
      "Specyfikacja wyposażenia podstawowego:",
      "Stacja PC z monitorem 19-calowym, drukarka DIN A4, klawiatura, twardy dysk umożliwiający prowadzenie kartoteki klientów, oprogramowanie w języku polskim, dodatkowy program SUPERAUTOMATIK do badań technicznych pojazdów,",
      "Zespół rolek do badania hamulców MICROBRAKE 6000 w ramie z systemem sensorów tensometrycznych DMS, rolki pokryte piaskiem kwarcowym/tworzywem bitumicznym. Jest to system sterowany mikroprocesorowo, cała konstrukcja ocynkowana ogniowo, prędkość obrotowa 5 km/h, nacisk osi maks. 2500 kg, napęd 2 x 3, 7 kW prąd trójfazowy, napięcie zasilające 3 x 230/400 V, 50 Hz, zabezpieczenie 3x 25A, średnica rolek 205 mm. Program pomiarowy opracowany w/g najnowszych wymogów producentów pojazdów umożliwia permanentny pomiar wszystkich parametrów układu hamulcowego bez/z ABS w tym tzw. bicie tarcz i owalizację bębnów (tj. nierównomierność działania hamulców dla całego obwodu koła),",
      "Moduł stanowiska rolkowego do badania u. hamulcowego wyróżnia się ponadto optymalnym układem wszystkich funkcji jakie wymagane są dla tego typu urządzeń przez europejskich producentów pojazdów:",
      "szerokość rolek pozwala na swobodne testowanie wszystkich samochodów osobowych i dostawczych o rozstawie kół do 2200 mm,",
      "podwyższenie tylnych rolek o ok. 50 mm zabezpiecza przed wyrzuceniem kół lżejszych pojazdów podczas testowania,",
      "silniki zabezpieczone przed dostępem wody pozwalają na użytkowanie zespołu rolek poza pomieszczeniami warsztatowymi,",
      "pomiar tzw. owalizacji czyli nierównomierności działania hamulca możliwy 3-krotnie w celu urealnienia wyników,",
      "możliwość dozbrojenia o program testowania układów z napędem na 4-koła np. VW-Syncro,",
      "pełna możliwość przywołania z pamięci wszystkich wykonanych wcześniej pomiarów w celu sprawdzenia, analizy itp.,",
      "dwie wersje prezentowania zmierzonych wartości na ekranie monitora: - w formie diagramów blokowych, - w formie wykresu krzywych,",
      "układ sterowania wykonany w technice cyfrowej pozwala na stały monitoring wszystkich czujników systemu pomiarowego.",
      "Sterowany mikroprocesorowo tester zawieszenia MICRO-SWING 6200 dla samochodów osobowych/ dostawczych o nacisku osi do 2 t. Wyposażony w płyty cynkowane ogniowo i sensory DMS do wskazywania wartości przyczepności do podłoża z podaniem różnicy między stroną lewą prawą i częstotliwości rezonansowej z podaniem różnicy między stroną lewą/prawą według metody pomiarowej EUSAMA. Koła wprowadzane są w drgania przez napęd mimośrodowy płyty o skoku 6 mm w paśmie częstotliwości od 23 Hz do 0 Hz wraz z wagami do pomiaru nacisku osi.",
      "Płyta przesuwna, przejazdowa do szybkiego pomiaru zbieżności, wskazania w mm prezentowane graficznie na monitorze,",
      "Przyrząd do zdalnego sterowania funkcjami pomiarowymi, pamięcią i drukarką umożliwia obsługę jednoosobową zza kierownicy pojazdu."
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/produkty-uzywane/linia-diagnostyczna-beissbarth-stl-7000-detail.html",
    "notes": null
  },
  {
    "slug": "vas-6279-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6279",
    "shortDescription": "VAS 6279",
    "details": [
      "VAG : VAS 6279",
      "VAS 6279"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6279-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6360-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6360",
    "shortDescription": "VAS 6360",
    "details": [
      "VAG : VAS 6360",
      "VAS 6360"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6360-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6595-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6595",
    "shortDescription": "VAS 6595",
    "details": [
      "VAG : VAS 6595",
      "VAS 6595"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6595-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6602-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6602",
    "shortDescription": "VAS 6602",
    "details": [
      "VAG : VAS 6602",
      "VAS 6602"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6602-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6603-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6603",
    "shortDescription": "VAS 6603",
    "details": [
      "VAG : VAS 6603",
      "VAS 6603"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6603-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6651-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6651",
    "shortDescription": "VAS 6651",
    "details": [
      "VAG : VAS 6651",
      "VAS 6651"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6651-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6767-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6767",
    "shortDescription": "VAS 6767",
    "details": [
      "VAG : VAS 6767",
      "VAS 6767"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6767-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "vas-6783-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "VAS 6783",
    "shortDescription": "VAS 6783",
    "details": [
      "VAG : VAS 6783",
      "VAS 6783"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag/vas-6783-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "ml-81r-tech-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "ML 81R TECH",
    "shortDescription": "ML 81R TECH",
    "details": [
      "Mercedes : ML 81R TECH",
      "ML 81R TECH"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes/ml-81r-tech-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "ml-81-tech-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "ML 81 TECH",
    "shortDescription": "ML 81 TECH",
    "details": [
      "Mercedes : ML 81 TECH",
      "ML 81 TECH"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes/ml-81-tech-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "wywaarka-beissbarth-mt-848-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "Wyważarka Beissbarth MT 848",
    "shortDescription": "Wyważarka Beissbarth MT 848",
    "details": [
      "Mercedes : Wyważarka Beissbarth MT 848",
      "Wyważarka Beissbarth MT 848"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes/wywaarka-beissbarth-mt-848-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "wywazarka-beissbarth-mt-868adt-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "Wyważarka Beissbarth MT 868ADT",
    "shortDescription": "Mercedes : Wyważarka Beissbarth MT 868ADT",
    "details": [
      "Mercedes : Wyważarka Beissbarth MT 868ADT",
      "Wyważarka Beissbarth MT 868ADT"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes/wywazarka-beissbarth-mt-868adt-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "bd-620-pc-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "BD 620 PC",
    "shortDescription": "BD 620 PC",
    "details": [
      "Mercedes : BD 620 PC",
      "BD 620 PC"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes/bd-620-pc-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "kds-ii-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "KDS II",
    "shortDescription": "KDS II",
    "details": [
      "BMW : KDS II",
      "KDS II"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/kds-ii-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "geometria-beissbarth-kds-3d-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "Geometria Beissbarth KDS 3D",
    "shortDescription": "BMW : Geometria Beissbarth KDS 3D",
    "details": [
      "BMW : Geometria Beissbarth KDS 3D"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/geometria-beissbarth-kds-3d-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "mt-825d-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MT 825D",
    "shortDescription": "MT 825D",
    "details": [
      "BMW : MT 825D",
      "MT 825D"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/mt-825d-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "mt-825d2013-06-24-13-39-54_-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MT 825D",
    "shortDescription": "MT 825D",
    "details": [
      "BMW : MT 825D",
      "MT 825D"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/mt-825d2013-06-24-13-39-54_-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "mt-848ad-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MT 848AD",
    "shortDescription": "MT 848AD",
    "details": [
      "BMW : MT 848AD",
      "MT 848AD"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/mt-848ad-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "mt-868adt2013-06-24-13-41-37_-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MT 868ADT",
    "shortDescription": "MT 868ADT",
    "details": [
      "BMW : MT 868ADT",
      "MT 868ADT"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/mt-868adt2013-06-24-13-41-37_-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "ms-65-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MS 65",
    "shortDescription": "MS 65",
    "details": [
      "BMW : MS 65",
      "MS 65"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/ms-65-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "ms-680-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "MS 680",
    "shortDescription": "MS 680",
    "details": [
      "BMW : MS 680",
      "MS 680"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw/ms-680-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "easy-3d-oem-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "EASY 3D OEM",
    "shortDescription": "EASY 3D OEM",
    "details": [
      "Toyota : EASY 3D OEM",
      "EASY 3D OEM"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/toyota/easy-3d-oem-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "bd-640-toyota-detail",
    "categorySlug": "urzadzenia-oem",
    "name": "BD 640 Toyota",
    "shortDescription": "BD 640 Toyota",
    "details": [
      "Toyota : BD 640 Toyota",
      "BD 640 Toyota"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/toyota/bd-640-toyota-detail.html",
    "notes": "Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej."
  },
  {
    "slug": "wywazarka-beissbarth-mt-788-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Wyważarka Beissbarth MT 788",
    "shortDescription": "Przeznaczona do kół do  160kg, dwa wskaźniki LED, pneumatyczne podnoszenie koła, (1x230V/50Hz)",
    "details": [
      "Wyważarka Beissbarth MT 788",
      "Przeznaczona do kół do  160kg, dwa wskaźniki LED, pneumatyczne podnoszenie koła, (1x230V/50Hz)",
      "Stacjonarna wyważarka do kół o masie do 160 kg. Automatyczny pomiar niewyważenia po zamknięciu osłony. Koło unoszone jest do kołnierza wyważarki przy pomocy pneumatycznego podnośnika sterowanego za pomocą pedału, zapewniając tym samym swobodę rąk. Wartości niewyważenia i pozycja mocowania ciężarków wskazywana jest na wyświetlaczach LED. Istnieje możliwość wyboru sposobu mocowania ciężarków spośród 15 programów. Użytkownik może w bardzo dogodny sposób dokonywać kalibracji maszyny."
    ],
    "technicalSpecs": {
      "Max. waga koła": "160 kg",
      "Max. średnica koła": "1200 mm",
      "średnica obręczy": "10 - 26,5 inch",
      "Szerokość obręczy": "1 - 20 inch",
      "prędkośc pomiarowa/programy sam.osob.": "170U/min (50Hz)",
      "Prędkość wyważania kół ciężąrowych": "100U/min (50Hz)",
      "Przyłącze sprężonego powietrza": "8-12bar",
      "Parametr 8": "Dokładność wyważania /ciężarowe = 10g",
      "Parametr 9": "Dokładność wyważania /osobowe = 1g",
      "Wymiary (WxHxD)": "2000 x 1950 x 1350 mm,",
      "Parametr 11": "Waga netto 248 kg,",
      "Kolorystyka": "niebieski RAL5015 / Szary RAL7011"
    },
    "accessories": [
      {
        "name": "Nr",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "Komplet 3 stożków do samochodów osobowych passenger, średnice. 42 - 64,5mm, 54 - 79,5mm and 74 - 111,5mm",
        "quantity": "1x",
        "catalogNumber": "931.143.060",
        "isOptional": true
      },
      {
        "name": "Komplet stożków wraz z nakładką dystansową do pojazdów dostawczych, średnice 95 - 124mm i 120 - 174mm, stosowany w zestawie z uchwytem Standardowym 931.143.051",
        "quantity": "1x",
        "catalogNumber": "931.143.059",
        "isOptional": true
      },
      {
        "name": "trilex dysk cenetrujący 20/22,5”/ Europe, w zestawie ze śrubami i uchwytami (stosowany w zestawie z uchwytem Standardowym 931.143.051)",
        "quantity": "1x",
        "catalogNumber": "931.143.054",
        "isOptional": true
      },
      {
        "name": "Precyzyjny uchwyt do pojazdów ciężarowych z nakładką dystansową, uchwyt 4-ramienny o rozstawie śrub 275/285mm, 5-ramienny o rozstawie 225/285/335mm, w komplecie ze śrubami",
        "quantity": "1x",
        "catalogNumber": "931.143.053",
        "isOptional": true
      },
      {
        "name": "truck standard flange with distance ring, flange, 2 cones (198 - 225mm / 277,4 - 283mm), 2 fixing screws and allen key SW14 (used in conjunction with basic flange)",
        "quantity": "1x",
        "catalogNumber": "931.143.052",
        "isOptional": true
      },
      {
        "name": "Uchwyt standardowy z nakrętką i śrubą montażową SW 14",
        "quantity": "1x",
        "catalogNumber": "931.143.051",
        "isOptional": true
      },
      {
        "name": "Uchwyt standardowy z nakrętką i śrubą montażową SW 14, precyzyjny uchwyt do pojazdów ciężarowych z nakładką dystansową, uchwyt 4-ramienny o rozstawie śrub 275/285mm, 5-ramienny o rozstawie 225/285/335mm, w komplecie ze śrubami, Komplet stożków wraz z nakładką dystansową do pojazdów dostawczych, średnice 95 - 124mm i 120 - 174mm",
        "quantity": "1x",
        "catalogNumber": "931.141.067",
        "isOptional": true
      },
      {
        "name": "ZALECANE",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe/wywazarka-beissbarth-mt-788-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-795t-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Wyważarka Beissbarth MT 795T",
    "shortDescription": "Przeznaczona do kół do  160kg, monitor, pneumatyczne podnoszenie koła, (1x230V/50Hz)",
    "details": [
      "Wyważarka Beissbarth MT 795T",
      "Przeznaczona do kół do  160kg, monitor, pneumatyczne podnoszenie koła, (1x230V/50Hz)",
      "Stacjonarna wyważarka do kół o masie do 160 kg. Automatyczny pomiar niewyważenia po zamknięciu osłony. Koło unoszone jest do kołnierza wyważarki przy pomocy pneumatycznego podnośnika sterowanego za pomocą pedału, zapewniając tym samym swobodę rąk. Wartości niewyważenia i pozycja mocowania ciężarków wskazywana jest na monitorze. Istnieje możliwość wyboru sposobu mocowania ciężarków spośród 15 programów. Użytkownik może w bardzo dogodny sposób dokonywać kalibracji maszyny."
    ],
    "technicalSpecs": {
      "Max. waga koła": "160 kg",
      "Max. średnica koła": "1200 mm",
      "średnica obręczy": "10 - 26,5 inch",
      "Szerokość obręczy": "1 - 20 inch",
      "prędkośc pomiarowa/programy sam.osob.": "170U/min (50Hz)",
      "Prędkość wyważania kół ciężąrowych": "100U/min (50Hz)",
      "Przyłącze sprężonego powietrza": "8-12bar",
      "Parametr 8": "Dokładność wyważania /ciężarowe = 10g",
      "Parametr 9": "Dokładność wyważania /osobowe = 1g",
      "Parametr 10": "Waga netto 248 kg,",
      "Kolorystyka": "niebieski RAL5015 / Szary RAL7011"
    },
    "accessories": [
      {
        "name": "Nr",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      },
      {
        "name": "Komplet 3 stożków do samochodów osobowych passenger, średnice. 42 - 64,5mm, 54 - 79,5mm and 74 - 111,5mm",
        "quantity": "1x",
        "catalogNumber": "931.143.060",
        "isOptional": true
      },
      {
        "name": "Komplet stożków wraz z nakładką dystansową do pojazdów dostawczych, średnice 95 - 124mm i 120 - 174mm, stosowany w zestawie z uchwytem Standardowym 931.143.051",
        "quantity": "1x",
        "catalogNumber": "931.143.059",
        "isOptional": true
      },
      {
        "name": "trilex dysk cenetrujący 20/22,5”/ Europe, w zestawie ze śrubami i uchwytami (stosowany w zestawie z uchwytem Standardowym 931.143.051)",
        "quantity": "1x",
        "catalogNumber": "931.143.054",
        "isOptional": true
      },
      {
        "name": "Precyzyjny uchwyt do pojazdów ciężarowych z nakładką dystansową, uchwyt 4-ramienny o rozstawie śrub 275/285mm, 5-ramienny o rozstawie 225/285/335mm, w komplecie ze śrubami",
        "quantity": "1x",
        "catalogNumber": "931.143.053",
        "isOptional": true
      },
      {
        "name": "truck standard flange with distance ring, flange, 2 cones (198 - 225mm / 277,4 - 283mm), 2 fixing screws and allen key SW14 (used in conjunction with basic flange)",
        "quantity": "1x",
        "catalogNumber": "931.143.052",
        "isOptional": true
      },
      {
        "name": "Uchwyt standardowy z nakrętką i śrubą montażową SW 14",
        "quantity": "1x",
        "catalogNumber": "931.143.051",
        "isOptional": true
      },
      {
        "name": "Uchwyt standardowy z nakrętką i śrubą montażową SW 14, precyzyjny uchwyt do pojazdów ciężarowych z nakładką dystansową, uchwyt 4-ramienny o rozstawie śrub 275/285mm, 5-ramienny o rozstawie 225/285/335mm, w komplecie ze śrubami,  Komplet stożków wraz z nakładką dystansową do pojazdów dostawczych, średnice 95 - 124mm i 120 - 174mm",
        "quantity": "1x",
        "catalogNumber": "931.141.067",
        "isOptional": true
      },
      {
        "name": "ZALECANE",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe/wywazarka-beissbarth-mt-795t-detail.html",
    "notes": null
  },
  {
    "slug": "demontazownica-servomat-ms-70-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica Servomat MS 70",
    "shortDescription": "Demontażownica Servomat MS 70 3 x 400V/50Hz",
    "details": [
      "Demontażownica Servomat MS 70",
      "Demontażownica Servomat MS 70 3 x 400V/50Hz",
      "Elektrohydrauliczna montażownica przeznaczona do obsługi pojazdów kół dostawczych i ciężarowych o średnicy od 14” do 26”, max. Średnica opony 1640mm, szerokość 800mm. Sterowanie napędem, windą do podnoszenia koła i szczękami montażowymi odbywa się z zewnętrznego pulpitu."
    ],
    "technicalSpecs": {},
    "accessories": [
      {
        "name": "instrukcja obsługi",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "uchwyt montażowy",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "łyżka monterska krótka",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "łyżka monterska długa",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-70-detail.html",
    "notes": null
  },
  {
    "slug": "demontazownica-beissbarth-ms-75-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica Servomat MS 75",
    "shortDescription": "Demontażownica Servomat MS 75 3 x 400V/50Hz",
    "details": [
      "Demontażownica Servomat MS 75",
      "Demontażownica Servomat MS 75 3 x 400V/50Hz",
      "Elektrohydrauliczna montażownica przeznaczona do obsługi pojazdów kół ciężarowych/autobusów i traktorów o średnicy od 14” do 52”, max. Średnica opony 2300mm, szerokość 910mm. Sterowanie napędem, windą do podnoszenia koła i szczękami montażowymi odbywa się z zewnętrznego pulpitu."
    ],
    "technicalSpecs": {},
    "accessories": [
      {
        "name": "instrukcja obsługi",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "uchwyt montażowy",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "łyżka monterska krótka",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "łyżka monterska długa",
        "quantity": "",
        "catalogNumber": "",
        "isOptional": false
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-beissbarth-ms-75-detail.html",
    "notes": null
  },
  {
    "slug": "demontazownica-servomat-ms-78-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica Servomat MS 78",
    "shortDescription": "Demontażownica Servomat MS 78",
    "details": [
      "Demontażownica Servomat MS 78"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": false,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-78-detail.html",
    "notes": "Pusta karta produktu w starym CMS - brak parametrów i opisu."
  },
  {
    "slug": "demontazownica-servomat-ms-80-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica Servomat MS 80",
    "shortDescription": "przeznaczona do kół o masie do 2,2t",
    "details": [
      "Demontażownica Servomat MS 80",
      "przeznaczona do kół o masie do 2,2t",
      "szeroki zakres mocowania oznacza większą wszechstronność ;urządzenie może być używane do kół lekkich pojazdów użytkowych, pojazdów rolniczych i przyczep",
      "ciśnienie przy zaciskaniu od 20 do 130 bar-ważne przy obsłudze felg aluminiowych",
      "obroty w dwóch kierunkach; dwie prędkości obrotowe,",
      "wszystkie mechanizmy sterowane hydrauliczne, brak konieczności stosowania sprężonego powietrza,",
      "Zakres mocowania koła 114,6-1049mm",
      "Średnica obręczy(w zależności od dodatkowych przystawek) 14-60 inch",
      "Max średnica koła 2900m",
      "Max szerokość koła: 1550mm",
      "Max masa koła 2200kg",
      "Max siła odpiekania 4,2t",
      "Zasilanie 3x400v/50-60HZ",
      "Silnik 2,2/3kW",
      "Wymiary:2900x2100x2700mm",
      "Waga netto 984 kg,",
      "Kolorystyka: niebieski RAL5015 / Szary RAL7011"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-80-detail.html",
    "notes": null
  },
  {
    "slug": "geometria-beissbarth-ml-8-r-tech-awb-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Geometria Beissbarth ML 8 R TECH AWB",
    "shortDescription": "profesjonalny, ultraszybki przyrząd do pomiaru i regulacji",
    "details": [
      "Q.Lign 3D Compact to bezprzewodowy,",
      "profesjonalny, ultraszybki przyrząd do pomiaru i regulacji",
      "geometrii w pojazdach samochodowych o DMC<3,5t pracujący",
      "w technologii 3D.",
      "Bezprzewodowy Q.Lign 3D Compact",
      "Urządzenie wyposażone jest w 2",
      "bezprzewodowe zespoły pomiarowe z dodatkowymi",
      "wyświetlaczami ilustrującymi mierzone parametry oraz",
      "trwałymi, mocnymi akumulatorami Li-Ion.",
      "Prezentacja pomiarów możliwa na TV, tablecie, laptopie, PC dzięki",
      "technologii Stream – to –X.",
      "Zalety systemu:",
      "Opcjonalne zaciski kół Q.Grip zapewniają błyskawiczny montaż",
      "bez kontaktu z felgą",
      "bezprzewodowy pomiar i komunikacja z automatycznym",
      "rozpoznawaniem ekranów",
      "głowice Q.Lign z dodatkowymi wyświetlaczami QLED",
      "mała przestrzeń robocza-brak potrzeby przestrzeni przed podnosnikiem/kanałem"
    ],
    "technicalSpecs": {},
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/geometria-ciezarowe/geometria-beissbarth-ml-8-r-tech-awb-detail.html",
    "notes": "Niespójność w starym CMS: tytuł i URL to ML 8 R TECH AWB, lecz treść opisuje Q.Lign 3D Compact."
  }
];
