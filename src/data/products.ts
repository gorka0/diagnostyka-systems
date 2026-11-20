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

export interface ProductPriceVariant {
  label: string;
  priceNetto: string;
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
  priceNetto?: string;
  priceVariants?: ProductPriceVariant[];
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    "slug": "ml-8-easy-ccd-excellence",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth ML 8 Easy CCD Excellence",
    "shortDescription": "8-sensorowy radiowy przyrząd CCD do kontroli geometrii kół w pojazdach o DMC do 3,5 t z certyfikatem ITS do Stacji Kontroli Pojazdów.",
    "details": [
      "Beissbarth ML 8 Easy CCD Excellence to profesjonalny, bezprzewodowy przyrząd pomiarowy z 8 sensorami CCD, posiadający oficjalny certyfikat Instytutu Transportu Samochodowego (ITS) do urzędowych badań technicznych na SKP.",
      "Urządzenie wyposażone jest w 4 głowice pomiarowe CCD z enkoderami kątowymi i transmisją radiową 433 MHz, zasilane akumulatorowo. Zapewnia pełną kompensację bicia obręczy przez przetaczanie pojazdu lub uniesienie osi.",
      "Stanowisko operatora obejmuje mobilny wózek z komputerem PC, panoramicznym monitorem 27\", kolorową drukarką raportów oraz zaawansowanym oprogramowaniem pomiarowym z regularnie aktualizowaną bazą danych ponad 35 000 modeli pojazdów od 55 producentów.",
      "Pomiar wszystkich parametrów osi przedniej i tylnej: zbieżność całkowita i połówkowa, kąt pochylenia koła, wyprzedzenie i pochylenie osi sworznia zwrotnicy, nierównoległość osi oraz różnica kątów skrętu."
    ],
    "technicalSpecs": {
      "Typ urządzenia": "8-sensorowa geometria bezprzewodowa CCD",
      "Certyfikacja": "Certyfikat ITS do Stacji Kontroli Pojazdów (SKP)",
      "Transmisja danych": "Bezprzewodowa radiowa 433 MHz",
      "Liczba głowic": "4 głowice z 8 czujnikami CCD",
      "Kompensacja bicia": "Przez przetoczenie pojazdu (ROC) lub uniesienie",
      "Zakres pomiarowy CCD": "±20°",
      "Stanowisko PC": "Wózek warsztatowy, PC Windows, monitor 27\", drukarka",
      "Baza danych": "Ponad 35 000 pojazdów, 55 marek z aktualizacją",
      "Zasilanie": "230 V | 50-60 Hz"
    },
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
    "name": "Wyważarka Beissbarth G.20",
    "shortDescription": "Kompaktowa wyważarka do kół o wadze do 75 kg z dotykowym monitorem 17\" LED i Virtual Sonarem.",
    "priceNetto": "21.500 zł netto",
    "details": [
      "Kompaktowa wyważarka do kół samochodowych o wadze do 75 kg.",
      "Automatyczny pomiar szerokości kół stalowych.",
      "Virtual Sonar – sonar wbudowany w osłonę koła automatycznie dobiera program pomiarowy.",
      "17” dotykowy monitor LED wskazuje wartość i pozycję niewyważenia, umożliwia obsługę w rękawicach.",
      "Czas pomiaru niewyważenia: 4,7 s (dla kół 15”), dokładność pomiarowa ±0,5 g.",
      "Laserowe wskazanie miejsca mocowania ciężarka, oświetlenie przestrzeni roboczej.",
      "Półautomatyczny wpis parametrów koła."
    ],
    "technicalSpecs": {
      "Maksymalna średnica koła": "36\" | 914 mm",
      "Prędkość pomiarowa": "100 rpm",
      "Czas pomiaru": "4,7 s",
      "Maksymalna szerokość obręczy": "20\"",
      "Maksymalna średnica obręczy": "30\"",
      "Maksymalna waga koła": "75 kg",
      "Minimalna średnica koła": "10\"",
      "Minimalna szerokość obręczy": "1,5\"",
      "Zasilanie": "230 V | 50 - 60 Hz | 1 ph",
      "Moc silnika": "0,15 kW",
      "Wprowadzanie parametrów": "Półautomatyczny wpis parametrów koła"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-aw-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-touch-awlp-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G.30",
    "shortDescription": "Kompaktowa wyważarka do kół o wadze do 75 kg z systemem Auto Adaptive Mode i funkcją Split.",
    "priceNetto": "24.100 zł netto",
    "priceVariants": [
      {
        "label": "Wersja z pneumatycznym mocowaniem koła G 30 P",
        "priceNetto": "27.000 zł netto"
      }
    ],
    "details": [
      "Kompaktowa wyważarka do kół samochodowych o wadze do 75 kg.",
      "Automatyczny pomiar szerokości kół stalowych.",
      "Virtual Sonar – sonar wbudowany w osłonę koła automatycznie dobiera program pomiarowy.",
      "17” dotykowy monitor LED wskazuje wartość i pozycję niewyważenia, umożliwia obsługę w rękawicach.",
      "Czas pomiaru niewyważenia: 4,7 s (dla kół 15”), dokładność pomiarowa ±0,5 g.",
      "Laserowe wskazanie miejsca mocowania ciężarka.",
      "Funkcja Split do rozdzielania i chowania ciężarka za szprychami.",
      "System Auto Adaptive Mode – dobiera tolerancję wyważania proporcjonalnie do wielkości koła w celu zminimalizowania wibracji koła podczas jazdy.",
      "Półautomatyczny wpis parametrów koła."
    ],
    "technicalSpecs": {
      "Maksymalna średnica koła": "36\" | 914 mm",
      "Prędkość pomiarowa": "100 rpm",
      "Czas pomiaru": "4,7 s",
      "Maksymalna szerokość obręczy": "20\"",
      "Maksymalna średnica obręczy": "30\"",
      "Maksymalna waga koła": "75 kg",
      "Minimalna średnica koła": "10\"",
      "Minimalna szerokość obręczy": "1,5\"",
      "Zasilanie": "230 V | 50 - 60 Hz | 1 ph",
      "Moc silnika": "0,15 kW",
      "Wprowadzanie parametrów": "Półautomatyczny wpis parametrów koła"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awlp-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-lcd-awl-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G 30 P",
    "shortDescription": "Kompaktowa wyważarka do kół o wadze do 75 kg ze zintegrowanym mocowaniem pneumatycznym koła.",
    "priceNetto": "27.000 zł netto",
    "details": [
      "Kompaktowa wyważarka do kół samochodowych o wadze do 75 kg z pneumatycznym uchwytem koła.",
      "Zintegrowane pneumatyczne mocowanie koła.",
      "Automatyczny pomiar szerokości kół stalowych.",
      "Virtual Sonar – sonar wbudowany w osłonę koła automatycznie dobiera program pomiarowy.",
      "17” dotykowy monitor LED wskazuje wartość i pozycję niewyważenia, umożliwia obsługę w rękawicach.",
      "Czas pomiaru niewyważenia: 4,7 s (dla kół 15”), dokładność pomiarowa ±0,5 g.",
      "Laserowe wskazanie miejsca mocowania ciężarka.",
      "Funkcja Split do rozdzielania i chowania ciężarka za szprychami.",
      "System Auto Adaptive Mode – dobiera tolerancję wyważania proporcjonalnie do wielkości koła w celu zminimalizowania wibracji koła podczas jazdy.",
      "Półautomatyczny wpis parametrów koła."
    ],
    "technicalSpecs": {
      "Maksymalna średnica koła": "36\" | 914 mm",
      "Prędkość pomiarowa": "100 rpm",
      "Czas pomiaru": "4,7 s",
      "Maksymalna szerokość obręczy": "20\"",
      "Maksymalna średnica obręczy": "30\"",
      "Maksymalna waga koła": "75 kg",
      "Minimalna średnica koła": "10\"",
      "Minimalna szerokość obręczy": "1,5\"",
      "Zasilanie": "230 V | 50 - 60 Hz | 1 ph",
      "Moc silnika": "0,15 kW",
      "Mocowanie koła": "Pneumatyczne",
      "Wprowadzanie parametrów": "Półautomatyczny wpis parametrów koła"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awl-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G.50",
    "shortDescription": "Profesjonalna wyważarka do kół samochodowych o wadze do 75 kg z monitorem 19\" LED i zakresem koła do 44\".",
    "priceNetto": "33.700 zł netto",
    "priceVariants": [
      {
        "label": "Wersja z pneumatycznym mocowaniem koła G 50 P",
        "priceNetto": "38.900 zł netto"
      }
    ],
    "details": [
      "Profesjonalna wyważarka do kół samochodowych o wadze do 75 kg.",
      "19” dotykowy monitor LED wskazuje wartość i pozycję niewyważenia, umożliwia obsługę w rękawicach.",
      "Zwiększony zakres roboczy: maksymalna średnica koła do 44\" (1117 mm).",
      "Automatyczny pomiar szerokości kół stalowych.",
      "Virtual Sonar – sonar wbudowany w osłonę koła automatycznie dobiera program pomiarowy.",
      "Laserowe wskazanie miejsca mocowania ciężarka.",
      "Funkcja Split do rozdzielania i chowania ciężarka za szprychami.",
      "System Auto Adaptive Mode – dobiera tolerancję wyważania proporcjonalnie do wielkości koła w celu zminimalizowania wibracji koła podczas jazdy.",
      "Czas pomiaru niewyważenia: 4,7 s (dla kół 15”), dokładność pomiarowa ±0,5 g.",
      "Półautomatyczny wpis parametrów koła."
    ],
    "technicalSpecs": {
      "Maksymalna średnica koła": "44\" | 1117 mm",
      "Prędkość pomiarowa": "100 rpm",
      "Czas pomiaru": "4,7 s",
      "Maksymalna szerokość obręczy": "20\"",
      "Maksymalna średnica obręczy": "30\"",
      "Maksymalna waga koła": "75 kg",
      "Minimalna średnica koła": "10\"",
      "Minimalna szerokość obręczy": "1,5\"",
      "Zasilanie": "230 V | 50 - 60 Hz | 1 ph",
      "Moc silnika": "0,15 kW",
      "Wprowadzanie parametrów": "Półautomatyczny wpis parametrów koła"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-mt-zero-6-touch-awl-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka Beissbarth G.60 P PRO",
    "shortDescription": "Profesjonalna diagnostyczna wyważarka do kół z 3D Laser Scannerem, uchwytem pneumatycznym i funkcją Hubmatch.",
    "priceNetto": "51.800 zł netto",
    "priceVariants": [
      {
        "label": "Opcjonalna pneumatyczna winda do kół",
        "priceNetto": "17.000 zł netto"
      }
    ],
    "details": [
      "Profesjonalna, diagnostyczna wyważarka do kół samochodowych o wadze do 75 kg.",
      "Pneumatyczne mocowanie koła w wyposażeniu standardowym.",
      "3D Laser Scanner – bezdotykowy pomiar wszystkich parametrów koła: odstęp, średnica oraz szerokość koła.",
      "Automatyczne rozpoznawanie rodzaju obręczy (stalowa / aluminiowa) i pomiar szerokości kół stalowych.",
      "Wersja PRO – rozbudowane funkcje diagnostyczne: automatyczny pomiar odchyleń wysokości (promienia) koła podczas każdego cyklu pomiarowego.",
      "Funkcja Hubmatch – eliminuje wibracje koła poprzez zmianę położenia koła na obręczy bez konieczności stosowania rolki dociskowej.",
      "19” dotykowy monitor LED wskazuje wartość i pozycję niewyważenia, umożliwia obsługę w rękawicach.",
      "Virtual Sonar – sonar wbudowany w osłonę koła automatycznie dobiera program pomiarowy.",
      "Laserowe wskazanie miejsca mocowania ciężarka.",
      "Funkcja Split do rozdzielania i chowania ciężarka za szprychami.",
      "System Auto Adaptive Mode – dobiera tolerancję wyważania proporcjonalnie do wielkości koła w celu zminimalizowania wibracji koła podczas jazdy.",
      "Czas pomiaru niewyważenia: 4,7 s (dla kół 15”), dokładność pomiarowa ±0,5 g.",
      "W pełni automatyczny pomiar parametrów koła."
    ],
    "technicalSpecs": {
      "Maksymalna średnica koła": "44\" | 1117 mm",
      "Prędkość pomiarowa": "100 rpm",
      "Czas pomiaru": "4,7 s",
      "Maksymalna szerokość obręczy": "20\"",
      "Maksymalna średnica obręczy": "30\"",
      "Maksymalna waga koła": "75 kg",
      "Minimalna średnica koła": "10\"",
      "Minimalna szerokość obręczy": "1,5\"",
      "Zasilanie": "230 V | 50 - 60 Hz | 1 ph",
      "Moc silnika": "0,15 kW",
      "Mocowanie koła": "Pneumatyczne",
      "Wprowadzanie parametrów": "W pełni automatyczny pomiar parametrów koła (3D Laser Scanner)"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awl-detail.html",
    "notes": null
  },
  {
    "slug": "wywazarka-beissbarth-g-90-hd-detail",
    "categorySlug": "wywazarki-do-kol",
    "name": "Wyważarka uniwersalna Beissbarth G.90 HD",
    "shortDescription": "Stacjonarna, uniwersalna wyważarka do kół osobowych i ciężarowych o masie do 200 kg z opuszczanym wałem montażowym.",
    "priceNetto": "47.300 zł netto",
    "details": [
      "Stacjonarna, uniwersalna wyważarka do kół o masie do 200 kg (obsługa kół samochodów osobowych, dostawczych i ciężarowych).",
      "Bezpieczeństwo operatora: wał wyważarki obniża się do pozycji montażowej, eliminując ryzyko upadku ciężkiego koła z wysokości.",
      "Automatyczny pomiar niewyważenia po zamknięciu osłony – superszybki pomiar w zaledwie 8 sekund.",
      "19” monitor prezentuje wartość niewyważenia oraz pozycję mocowania ciężarków.",
      "Laser precyzyjnie wskazuje miejsce mocowania ciężarka po automatycznym zablokowaniu koła hamulcem elektromagnetycznym.",
      "15 dedykowanych programów doboru sposobu mocowania ciężarków.",
      "Wygodny i intuicyjny system kalibracji maszyny bezpośrednio przez użytkownika."
    ],
    "technicalSpecs": {
      "Maksymalna waga koła": "200 kg",
      "Maksymalna średnica koła": "1380 mm",
      "Maksymalna średnica obręczy": "30 cali",
      "Maksymalna szerokość obręczy": "20 cali",
      "Prędkość pomiarowa": "130 obr/min (50 Hz)",
      "Prędkość wyważania kół ciężarowych": "100 U/min (50 Hz)",
      "Przyłącze sprężonego powietrza": "8 - 12 bar",
      "Dokładność wyważania (koła ciężarowe)": "10 g",
      "Dokładność wyważania (koła osobowe)": "1 g",
      "Masa własna urządzenia": "210 kg"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-g-90-hd-detail.html",
    "notes": "Nowość w ofercie Diagnostyka-Systems: stacjonarna uniwersalna wyważarka do kół osobowych i ciężarowych.",
    "subcategory": "Wyważarki do kół ciężarowe"
  },
  {
    "slug": "ms-500-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 22",
    "shortDescription": "Urządzenie do montażu i demontażu opon o zakresie mocowania od 10” do 25” o maksymalnej średnicy koła do 39” (1000 mm).",
    "priceNetto": "18.500 zł netto",
    "details": [
      "Beissbarth TC 22 to solidna demontażownica do kół samochodów osobowych i dostawczych o zakresie mocowania od zewnątrz 10\" do 22\" oraz od wewnątrz 12\" do 25\".",
      "Dwubiegowy stół montażowy o prędkościach obrotowych 8 oraz 16 obr/min ułatwia bezpieczną i wydajną pracę z każdym typem ogumienia.",
      "Maksymalna średnica koła do 1000 mm (39\") oraz szerokość obręczy do 12\" (305 mm).",
      "Trwała konstrukcja przystosowana do zasilania trójfazowego 400 V i ciśnienia pneumatycznego 8–12 bar."
    ],
    "technicalSpecs": {
      "Zastosowanie": "Koła samochodów osobowych i dostawczych",
      "Maksymalna średnica koła": "1000 mm (39\")",
      "Maksymalna szerokość obręczy": "12\" (305 mm)",
      "Mocowanie od wewnątrz": "12\" – 25\"",
      "Mocowanie od zewnątrz": "10\" – 22\"",
      "Prędkość obrotowa stołu": "8 / 16 obr/min",
      "Wymiary (szer. × wys. × gł.)": "930 × 1850 × 1060 mm",
      "Zasilanie": "400 V | 3 ph | 50-60 Hz",
      "Ciśnienie robocze": "8 – 12 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-500-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-530-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TCE 22 Pro",
    "shortDescription": "Demontażownica o zakresie mocowania do 25” z dodatkową kolumną pomocniczą TCX Pro do profesjonalnej obsługi kół UHP i Run-Flat (RFT).",
    "priceNetto": "24.800 zł netto",
    "details": [
      "Beissbarth TCE 22 Pro to zaawansowana montażownica wyposażona w pneumatyczną kolumnę pomocniczą TCX Pro, zaprojektowaną do bezpiecznej obsługi opon niskoprofilowych UHP i typu Run-Flat (RFT).",
      "Wyposażenie kolumny TCX Pro obejmuje specjalny talerz dociskowy do obręczy, pneumatyczne ramię nadążne do odsuwania stopki opony oraz dolną rolkę unoszącą dolną ścianę opony.",
      "Jednoczesna pneumatyczna regulacja skoku pionowego akcesoriów za pomocą jednego siłownika.",
      "Dwubiegowy stół obrotowy 8/16 obr/min, zasilanie 400 V."
    ],
    "technicalSpecs": {
      "Zastosowanie": "Koła samochodów osobowych i dostawczych (w tym UHP i Run-Flat RFT)",
      "Ramię pomocnicze": "Kolumna TCX Pro (talerz dociskowy, ramię nadążne, rolka unosząca)",
      "Regulacja ramienia": "1 siłownik unoszący jednocześnie wszystkie akcesoria",
      "Maksymalna średnica koła": "1000 mm",
      "Maksymalna szerokość obręczy": "12\" (305 mm)",
      "Mocowanie od wewnątrz": "12\" – 25\"",
      "Mocowanie od zewnątrz": "10\" – 22\"",
      "Prędkość obrotowa stołu": "8 / 16 obr/min",
      "Wymiary (szer. × wys. × gł.)": "930 × 1850 × 1060 mm",
      "Zasilanie": "400 V | 3 ph | 50-60 Hz",
      "Ciśnienie robocze": "8 – 12 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 45 Pro",
    "shortDescription": "Profesjonalna montażownica do szerokich kół o zakresie mocowania 10”–27” i średnicy 46” z kolumną pomocniczą TCX.Pro do UHP i RFT.",
    "priceNetto": "30.500 zł netto",
    "details": [
      "Beissbarth TC 45 Pro (400 V) to profesjonalna demontażownica o podwyższonym zakresie mocowania od 10\" do 27\", umożliwiająca obsługę kół o maksymalnej średnicy aż 1170 mm (46\") i szerokości do 15\" (381 mm).",
      "Wyposażona w wielofunkcyjną kolumnę pomocniczą TCX.Pro do bezpiecznego montażu i demontażu sztywnych opon niskoprofilowych UHP oraz Run-Flat.",
      "Specjalny talerz dociskowy, ramię nadążne oraz dolna rolka wspomagająca unoszenie stopki bez ryzyka uszkodzenia kordu opony czy porysowania lakierowanych felg.",
      "Pneumatycznie odchylana kolumna do tyłu i zintegrowany stół dwubiegowy 8/16 obr/min."
    ],
    "technicalSpecs": {
      "Zastosowanie": "Koła osobowe, SUV i dostawcze (UHP / RFT)",
      "Maksymalna średnica koła": "46\" | 1170 mm",
      "Maksymalna szerokość obręczy": "15\" (381 mm)",
      "Mocowanie od wewnątrz": "12\" – 27\"",
      "Mocowanie od zewnątrz": "10\" – 24\"",
      "Kolumna pomocnicza": "TCX.Pro z talerzem dociskowym i dolną rolką",
      "Prędkość obrotowa stołu": "8 / 16 obr/min",
      "Wymiary (szer. × wys. × gł.)": "1030 × 1900 × 1450 mm",
      "Zasilanie": "400 V | 3 ph | 50-60 Hz",
      "Ciśnienie robocze": "8 – 12 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "ms-630-demontazownica-beissbarth-serii-g-frame-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth TC 45 Pro 2 | WDK",
    "shortDescription": "Certyfikowana przez niemiecki instytut WDK montażownica 10”–27” z ręcznie sterowanym odpiekaczem i kolumną TCX.Pro2 z dwoma siłownikami.",
    "priceNetto": "36.200 zł netto",
    "details": [
      "Beissbarth TC 45 Pro 2 | WDK (400 V) posiada oficjalny certyfikat niemieckiego stowarzyszenia przemysłu oponiarskiego WDK, gwarantujący certyfikowane procedury montażu opon UHP i Run-Flat.",
      "Wyposażona w zaawansowaną kolumnę TCX.Pro2 z dwoma niezależnymi siłownikami pneumatycznymi, umożliwiającymi niezależne operowanie ramieniem nadążnym i rolką unoszącą.",
      "Ręcznie i precyzyjnie sterowany odpiekacz boczny pozwala na pełną kontrolę nacisku na stopkę opony, zapobiegając uszkodzeniu czujników TPMS.",
      "Zakres mocowania felg do 27\" oraz kół o średnicy do 1170 mm (46\")."
    ],
    "technicalSpecs": {
      "Certyfikacja": "Oficjalny certyfikat WDK (procedury UHP / Run-Flat)",
      "Kolumna pomocnicza": "TCX.Pro2 (2 niezależne siłowniki pneumatyczne)",
      "Sterowanie odpiekaczem": "Ręcznie sterowany odpiekacz boczny z kontrolą siły",
      "Maksymalna średnica koła": "46\" | 1170 mm",
      "Maksymalna szerokość obręczy": "15\" (381 mm)",
      "Mocowanie od wewnątrz": "12\" – 27\"",
      "Mocowanie od zewnątrz": "10\" – 24\"",
      "Prędkość obrotowa stołu": "8 / 16 obr/min",
      "Wymiary (szer. × wys. × gł.)": "1030 × 1900 × 1450 mm",
      "Zasilanie": "400 V | 3 ph | 50-60 Hz",
      "Ciśnienie robocze": "8 – 12 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/ms-630-demontazownica-beissbarth-serii-g-frame-detail.html",
    "notes": null
  },
  {
    "slug": "demontazownica-beissbarth-infinity-center-post-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica Beissbarth INFINITY Center Post",
    "shortDescription": "Montażownica z centralnym mocowaniem koła do 30” i szerokości 17”, zintegrowaną windą koła oraz kolumną pomocniczą TCX.Pro2.",
    "priceNetto": "45.000 zł netto",
    "details": [
      "Beissbarth INFINITY Center Post (400 V) to profesjonalne urządzenie nowej generacji z centralnym trzpieniowym mocowaniem koła przez otwór centralny, co całkowicie eliminuje ryzyko zarysowania czy uszkodzenia krawędzi felgi aluminiowej.",
      "Zintegrowana pneumatyczna winda koła o udźwigu do 80 kg unosi ciężkie koła SUV i dostawcze bezpośrednio na blat roboczy, chroniąc zdrowie i kręgosłup mechanika.",
      "Wzmocniona kolumna pomocnicza TCX.Pro2 z dwoma siłownikami, specjalnym ramieniem nadążnym do opon UHP/RFT oraz dolną rolką podnoszącą stopkę.",
      "Obsługa kół o średnicy do 44\" (1170 mm), szerokości do 17\" (432 mm) oraz obręczy do 30\"."
    ],
    "technicalSpecs": {
      "Typ mocowania": "Centralny trzpień Center Post (brak szczęk dotykających felgi)",
      "Winda koła": "Zintegrowana winda pneumatyczna w zestawie",
      "Maksymalna średnica koła": "44\" | 1170 mm",
      "Maksymalna szerokość obręczy": "17\" (432 mm)",
      "Zakres mocowania obręczy": "Do 30\" (12\"–27\" wewn. / 10\"–24\" zewn.)",
      "Kolumna pomocnicza": "TCX.Pro2 z 2 siłownikami do opon UHP i RFT",
      "Prędkość stołu": "8 / 16 obr/min",
      "Wymiary (szer. × wys. × gł.)": "1260 × 1950 × 1850 mm",
      "Zasilanie": "400 V | 3 ph | 50-60 Hz",
      "Ciśnienie robocze": "8 – 12 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/infinity-center-post.html",
    "notes": null
  },
  {
    "slug": "demontazownica-beissbarth-akimbo-mk2-detail",
    "categorySlug": "demontazownice",
    "name": "Demontażownica bezłyżkowa Beissbarth Akimbo Mk2 | WDK",
    "shortDescription": "Flagowa montażownica bezłyżkowa (leverless) z pneumatycznym palcem monterskim, laserem, zintegrowaną windą koła i certyfikatem WDK.",
    "priceNetto": "76.500 zł netto",
    "details": [
      "Beissbarth Akimbo Mk2 | WDK (230 V) to bezłyżkowa (leverless) montażownica najwyższej klasy z certyfikatem WDK, zaprojektowana do najtrudniejszych kół niskoprofilowych, Run-Flat oraz obręczy o średnicy do 33\".",
      "Automatyczny pneumatyczny „palec monterski” wsuwa się pod stopkę opony i unosi ją bez dotknięcia rantu felgi i bez używania tradycyjnej łyżki montażowej.",
      "Zintegrowany laser pozycjonujący automatycznie naprowadza narzędzie robocze na optymalną krawędź styku opony z obręczą.",
      "Wbudowana winda koła o udźwigu 80 kg oraz płynna regulacja prędkości obrotowej stołu w zakresie 0–18 obr/min sterowana pedałem z inwerterem.",
      "Zasilanie jednofazowe 230 V – wysoka kultura pracy i możliwość instalacji w każdym warsztacie bez sieci 400 V."
    ],
    "technicalSpecs": {
      "Technologia": "100% bezłyżkowa (Leverless) z pneumatycznym palcem",
      "Certyfikacja": "Oficjalny certyfikat WDK (UHP, Run-Flat, SSR, RSC)",
      "Pozycjonowanie": "Precyzyjny wskaźnik laserowy punktu demontażu",
      "Winda koła": "Zintegrowana winda pneumatyczna (max. waga koła 80 kg)",
      "Maksymalna średnica koła": "1200 mm",
      "Maksymalna szerokość obręczy": "380 mm (15\")",
      "Średnica obręczy (centralna)": "10\" – 33\"",
      "Prędkość obrotowa": "Płynna regulacja inwerterowa 0 – 18 obr/min",
      "Wymiary (szer. × wys. × gł.)": "1309 × 2043 × 1926 mm",
      "Zasilanie": "230 V | 1 ph | 50-60 Hz (inwerter)",
      "Ciśnienie robocze": "8 – 10 bar"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/demontazownice/akimbo-mk2.html",
    "notes": null
  },
  {
    "slug": "qlign-compact",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth Q.Lign Compact",
    "shortDescription": "Ultraszybka bezprzewodowa geometria 3D w kompaktowej architekturze Stream-to-X z wolnostojącą kolumną T-Column.",
    "details": [
      "Beissbarth Q.Lign Compact to rewolucyjna geometria 3D oparta na architekturze Stream-to-X, eliminującej konieczność stosowania tradycyjnego wózka PC. Pomiary przetwarzane są bezpośrednio w głowicach i przesyłane przez Wi-Fi na dowolne urządzenie (tablet, smartfon, monitor TV, komputer PC).",
      "System wykorzystuje kompaktową kolumnę pomiarową T-Column z 2 kamerami wysokiej rozdzielczości, zajmując minimalną przestrzeń na stanowisku pracy. Czas pełnego pomiaru zbieżności i pochylenia wynosi poniżej 15 sekund.",
      "Opcjonalne zaciski kół Q.Grip zapewniają montaż na oponie bez kontaktu z lakierowaną obręczą felgi w czasie poniżej 5 sekund na koło.",
      "Głowice wyposażone są w inteligentne wyświetlacze OLED informujące operatora o postępie procedury i wartościach regulacyjnych bezpośrednio przy kole."
    ],
    "technicalSpecs": {
      "Technologia": "Ultraszybki pomiar 3D Stream-to-X",
      "Czas pomiaru": "Poniżej 15 sekund",
      "Konstrukcja": "Kompaktowa kolumna T-Column (2 kamery)",
      "Wyświetlanie": "Stream-to-X (tablet, smartfon, TV, PC)",
      "Uchwyty kół": "Q.Grip (montaż bez kontaktu z felgą) lub standardowe",
      "Wskaźniki pomocnicze": "Ekrany OLED w głowicach pomiarowych",
      "Łączność": "Wbudowane Wi-Fi dużej mocy",
      "Zasilanie": "230 V | 50-60 Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/geometria/qlign-compact.html",
    "notes": null
  },
  {
    "slug": "qlign-t-series",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth Q.Lign T-Series",
    "shortDescription": "Modułowa geometria 3D do bezpośredniego montażu na podnośniku diagnostycznym lub kanale pomiarowym z głowicami QLED.",
    "details": [
      "Beissbarth Q.Lign T-Series to zaawansowany system geometrii 3D zaprojektowany do pełnej integracji ze stanowiskiem pomiarowym. Moduły kamer instalowane są bezpośrednio na pomostach dźwignika lub obrzeżach kanału, eliminując przestrzeń martwą przed pojazdem.",
      "Idealne rozwiązanie dla warsztatów o ograniczonej przestrzeni oraz autoryzowanych stacji obsługi (ASO) wymagających najwyższej ergonomii i powtarzalności pomiarów na dowolnej wysokości podnoszenia.",
      "Pełna integracja z technologią Stream-to-X – bezprzewodowa transmisja danych do urządzeń mobilnych i ekranów warsztatowych bez kabli i szafy sterującej.",
      "Aktywne tarcze celownicze z diodami QLED gwarantują natychmiastowe rozpoznawanie pozycji w każdych warunkach oświetleniowych hali serwisowej."
    ],
    "technicalSpecs": {
      "Technologia": "Modułowy pomiar 3D zintegrowany z dźwignikiem/kanałem",
      "Montaż": "Bezpośrednio na pomostach podnośnika lub krawędzi kanału",
      "Przestrzeń robocza": "Zero martwej strefy przed stanowiskiem",
      "Tarcze celownicze": "QLED z aktywną identyfikacją optyczną",
      "Prezentacja wyników": "Stream-to-X (tablet, smartfon, TV, PC)",
      "Wysokość pomiaru": "Pomiar na poziomie posadzki oraz na dowolnej wysokości dźwignika",
      "Łączność": "Wi-Fi bezprzewodowe",
      "Zasilanie": "230 V | 50-60 Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/geometria/qlign-t-series.html",
    "notes": null
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
      "Zasilanie / bezpieczniki": "5 × 2,5 mm², 3 × 20 A zwłoczne (400 V)",
      "Tester zawieszenia": "Metoda EUSAMA, 2 silniki 2,7 kW, amplituda drgań 6 mm",
      "Płyta uślizgu": "Kontrola zbieżności i uślizgu bocznego kół",
      "Sieć i oprogramowanie": "Magistrala BNET, zgodność z siecią ASA-Net",
      "Przyłącze sprężonego powietrza": "6- 10 bar",
      "Nośność podnośnika": "2,5 t",
      "Dopuszczalny nacisk osi": "4,0 t",
      "Czas podnoszenia": "ok. 5 sec przy ciśnieniu 6 bar",
      "Wybór trybu pomiarowego i modułu pomiarowego": "1 Polu komunikacji",
      "Wizualizacja": "Ikona aktywnej funkcji pomiarowej",
      "Interfejs operatora": "Kolorowe wskaźniki stanu procedury",
      "Jednostka PC": "Komputer z monitorem 17\" w mobilnym wózku",
      "Wybór modułu": "Zdalny pilot radiowy lub panel sterujący",
      "Procedura 1": "Kontrola geometrii wstępnej i uślizgu",
      "Procedura 2": "Pomiar sił hamowania i owalizacji",
      "Procedura 3": "Ocena tłumienia drgań zawieszenia EUSAMA",
      "Procedura 4": "Wydruk raportu zbiorczego SKP"
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
      "Zasilanie / bezpieczniki": "5 × 2,5 mm², 3 × 20 A zwłoczne (400 V)",
      "Tester zawieszenia": "Metoda EUSAMA, 2 silniki 2,7 kW, amplituda drgań 6 mm",
      "Płyta uślizgu": "Kontrola zbieżności i uślizgu bocznego kół",
      "Sieć i oprogramowanie": "Magistrala BNET, zgodność z siecią ASA-Net",
      "Przyłącze sprężonego powietrza": "6- 10 bar",
      "Nośność podnośnika": "2,5 t",
      "Dopuszczalny nacisk osi": "4,0 t",
      "Czas podnoszenia": "ok. 5 sec przy ciśnieniu 6 bar",
      "Wybór trybu pomiarowego i modułu pomiarowego": "1 Polu komunikacji",
      "Wizualizacja": "Ikona aktywnej funkcji pomiarowej",
      "Interfejs operatora": "Kolorowe wskaźniki stanu procedury",
      "Jednostka PC": "Komputer z monitorem 17\" w mobilnym wózku",
      "Wybór modułu": "Zdalny pilot radiowy lub panel sterujący",
      "Procedura 1": "Kontrola geometrii wstępnej i uślizgu",
      "Procedura 2": "Pomiar sił hamowania i owalizacji",
      "Procedura 3": "Ocena tłumienia drgań zawieszenia EUSAMA",
      "Procedura 4": "Wydruk raportu zbiorczego SKP"
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
      "Maksymalna waga koła": "160 kg",
      "Maksymalna średnica koła": "1200 mm",
      "Średnica obręczy": "10 - 26,5\"",
      "Szerokość obręczy": "1 - 20\"",
      "Prędkość pomiarowa (osobowe)": "170 obr/min (50 Hz)",
      "Prędkość pomiarowa (ciężarowe)": "100 obr/min (50 Hz)",
      "Przyłącze sprężonego powietrza": "8 - 12 bar",
      "Dokładność wyważania (ciężarowe)": "10 g",
      "Dokładność wyważania (osobowe)": "1 g",
      "Wymiary (szer. × wys. × gł.)": "2000 × 1950 × 1350 mm",
      "Waga netto": "248 kg",
      "Kolorystyka": "Niebieski RAL 5015 / Szary RAL 7011"
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
      "Maksymalna waga koła": "160 kg",
      "Maksymalna średnica koła": "1200 mm",
      "Średnica obręczy": "10 - 26,5\"",
      "Szerokość obręczy": "1 - 20\"",
      "Prędkość pomiarowa (osobowe)": "170 obr/min (50 Hz)",
      "Prędkość pomiarowa (ciężarowe)": "100 obr/min (50 Hz)",
      "Przyłącze sprężonego powietrza": "8 - 12 bar",
      "Dokładność wyważania (ciężarowe)": "10 g",
      "Dokładność wyważania (osobowe)": "1 g",
      "Waga netto": "248 kg",
      "Kolorystyka": "Niebieski RAL 5015 / Szary RAL 7011"
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
  },
{
    "slug": "demontazownica-beissbarth-tc-850-hd-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica ciężarowa Beissbarth TC850 HD",
    "shortDescription": "Elektrohydrauliczna montażownica do kół pojazdów dostawczych, ciężarowych i maszyn 14”–30” o wadze do 1200 kg z zewnętrznym pulpitem.",
    "priceNetto": "60.700 zł netto",
    "details": [
      "Beissbarth TC850 HD to kompaktowa, elektrohydrauliczna montażownica przeznaczona do profesjonalnej obsługi kół samochodów dostawczych, ciężarowych oraz maszyn rolniczych i budowlanych o średnicy obręczy od 14\" do 30\".",
      "Zewnętrzny, ergonomiczny pulpit sterowniczy umożliwia precyzyjne sterowanie napędem obrotowym, hydrauliczną windą unoszącą koło oraz samocentrującymi szczękami zaciskowymi z bezpiecznej odległości.",
      "Obsługa kół o masie do 1200 kg, maksymalnej średnicy 1640 mm (65\") oraz szerokości do 850 mm (34\").",
      "Mocny układ hydrauliczny generuje siłę odpiekania stopki aż 25 000 N przy ciśnieniu 10 bar."
    ],
    "technicalSpecs": {
      "Zakres średnic obręczy": "14\" – 30\"",
      "Maksymalna średnica koła": "65\" | 1640 mm",
      "Maksymalna szerokość koła": "34\" | 850 mm",
      "Maksymalna waga koła": "1200 kg",
      "Siła odpiekacza": "25 000 N @ 10 bar",
      "Minimalna średnica otworu centralnego": "5\" | 122 mm",
      "Prędkość obrotowa wrzeciona": "7 obr/min (1 bieg)",
      "Moc silnika hydraulicznego": "1,5 kW",
      "Waga urządzenia": "605 kg",
      "Wymiary (szer. × wys. × gł.)": "1650 × 1095 × 1800 mm",
      "Zasilanie": "400 V | 3 ph | 50 Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/tc-850-hd.html",
    "notes": null
  },
  {
    "slug": "demontazownica-beissbarth-tc-1150-hd-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Demontażownica ciężarowa Beissbarth TC1150 HD",
    "shortDescription": "Elektrohydrauliczna montażownica ciężarowa i przemysłowa do kół 14”–42” (opcja do 56”) o wadze do 2000 kg z dwoma biegami.",
    "priceNetto": "77.900 zł netto",
    "details": [
      "Beissbarth TC1150 HD to potężna montażownica elektrohydrauliczna stworzona do intensywnej pracy w serwisach opon ciężarowych, maszyn rolniczych, leśnych i wielkogabarytowych maszyn budowlanych.",
      "Standardowy zakres mocowania obejmuje obręcze od 14\" do 42\", a dzięki opcjonalnym przedłużkom szczęk może być rozszerzony aż do 56\".",
      "Udźwig hydraulicznego wózka i wrzeciona wynosi aż 2000 kg, obsługując koła o średnicy do 2300 mm (91\") i szerokości do 1150 mm (45\").",
      "Dwubiegowy silnik o mocy 3,0 kW zapewnia prędkości robocze 4,5 oraz 9 obr/min, co w połączeniu z zewnętrznym mobilnym pulpitem gwarantuje maksymalną wydajność i bezpieczeństwo pracy."
    ],
    "technicalSpecs": {
      "Zakres średnic obręczy": "14\" – 42\" (z przedłużkami do 56\")",
      "Maksymalna średnica koła": "91\" | 2300 mm",
      "Maksymalna szerokość koła": "45\" | 1150 mm",
      "Maksymalna waga koła": "2000 kg",
      "Siła odpiekacza": "25 000 N @ 10 bar",
      "Minimalna średnica otworu centralnego": "5\" | 122 mm",
      "Prędkość obrotowa wrzeciona": "4,5 – 9 obr/min (2 biegi)",
      "Moc silnika": "3,0 kW",
      "Waga urządzenia": "855 kg",
      "Wymiary (szer. × wys. × gł.)": "1870 × 1450 × 2350 mm",
      "Zasilanie": "400 V | 3 ph | 50 Hz"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/tc-1150-hd.html",
    "notes": null
  },
  {
    "slug": "klatka-bezpieczenstwa-do-pompowania-kol-ciezarowych-detail",
    "categorySlug": "pojazdy-ciezarowe",
    "name": "Klatka bezpieczeństwa do pompowania kół komercyjnych Beissbarth",
    "shortDescription": "Atestowana klatka bezpieczeństwa do bezpiecznego pompowania kół ciężarowych i komercyjnych o średnicy do 1450 mm pod ciśnieniem do 10 bar.",
    "priceNetto": "14.000 zł netto",
    "details": [
      "Atestowana klatka bezpieczeństwa Beissbarth przeznaczona do ochrony personelu serwisowego podczas procesu napełniania i pompowania kół pojazdów komercyjnych, ciężarowych i autobusów.",
      "Skutecznie chroni przed skutkami rozerwania opony, eksplozji pierścienia zaporowego felgi lub wystrzału zaworu pod ciśnieniem do 10 bar.",
      "Wykonana ze wzmocnionej stalowej siatki z drzwiami ryglowanymi zamkiem ciśnieniowym, zintegrowanym manometrem i wyprowadzeniem przyłącza pneumatycznego.",
      "Dostosowana do kół o maksymalnej średnicy do 1450 mm i szerokości do 650 mm."
    ],
    "technicalSpecs": {
      "Zastosowanie": "Bezpieczne pompowanie kół ciężarowych, autobusowych i maszyn",
      "Maksymalna średnica koła": "1450 mm",
      "Maksymalna szerokość koła": "650 mm",
      "Maksymalne ciśnienie zasilania": "10 bar",
      "Konstrukcja": "Wzmocniona stalowa klatka siatkowa z drzwiami ryglowanymi",
      "Waga urządzenia": "175 kg",
      "Wymiary (szer. × wys. × gł.)": "800 × 1580 × 1600 mm"
    },
    "accessories": [],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/klatka-bezpieczenstwa.html",
    "notes": null
  }
];
