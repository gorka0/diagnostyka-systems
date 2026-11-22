/**
 * Katalog produktów Diagnostyka-Systems s.c.
 * Źródło: wyekstrahowane 1:1 ze starej bazy wiedzy www.beissbarth-service.pl (86 podstron).
 * Żadne dane nie zostały dopisane z głowy.
 */

import type { ProductVariant, ProductOption, ProductSpecItem } from '@/data/parse-rules';

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
  variants?: ProductVariant[];
  options?: ProductOption[];
  specs?: ProductSpecItem[];
  imageFit?: 'contain' | 'cover';
  galleryImages?: string[];
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    "slug": "ml-8-easy-ccd-excellence",
    "categorySlug": "geometria",
    "name": "Geometria Beissbarth ML 8 Easy CCD Excellence",
    "shortDescription": "8-sensorowy radiowy przyrząd CCD do pomiaru i regulacji geometrii kół w pojazdach o DMC < 3,5 t z certyfikatem ITS do Stacji Kontroli Pojazdów.",
    "priceNetto": "51.900 zł netto",
    "details": [
      "Beissbarth ML 8 Easy CCD Excellence (nr kat. 1 690 310 074) to profesjonalny przyrząd do pomiaru i regulacji geometrii kół w pojazdach samochodowych o DMC < 3,5 t, posiadający oficjalny certyfikat Instytutu Transportu Samochodowego (ITS) do urzędowych badań technicznych na SKP.",
      "Urządzenie wyposażone jest w 4 zespoły pomiarowe z 8 sensorami CCD i radiową transmisją danych. Pomiar realizowany jest precyzyjną wiązką podczerwieni, a wyniki są wizualizowane w czasie rzeczywistym na panoramicznym monitorze 27\".",
      "Automatyczny pomiar kompensacji bicia kół przez przetaczanie lub uniesienie pojazdu dzięki zastosowaniu elektronicznego kompensatora.",
      "Głowice pomiarowe z nowoczesnymi czujnikami CCD o zakresie pomiarowym 20° umożliwiają dokładny pomiar wszystkich parametrów pojazdu: kątów zbieżności i pochylenia kół, wyprzedzenia osi sworznia zwrotnicy, przestawienia kół i osi pojazdu.",
      "Program pomiarowy umożliwia wydruk zmierzonych parametrów w formie czytelnej tabeli lub graficznej. Baza danych obejmuje ponad 20 000 pojazdów od 55 producentów."
    ],
    "technicalSpecs": {
      "Numer katalogowy zestawu": "1 690 310 074",
      "Typ urządzenia": "Bezprzewodowa 8-sensorowa geometria kół CCD",
      "Zakres pojazdów": "Samochody osobowe i dostawcze o DMC < 3,5 t",
      "Certyfikacja": "Certyfikat ITS do Stacji Kontroli Pojazdów (SKP)",
      "Transmisja danych": "Bezprzewodowa radiowa transmisja danych",
      "Sensory pomiarowe": "4 zespoły pomiarowe z 8 sensorami CCD (wiązka podczerwieni)",
      "Zakres kamer CCD": "20°",
      "Kompensacja bicia": "Automatyczna przez przetaczanie lub uniesienie (kompensator elektroniczny)",
      "Jednostka centralna": "Wózek warsztatowy z komputerem PC, monitorem 27\", drukarką i stacją zasilania głowic",
      "Baza danych pojazdów": "Ponad 20 000 pojazdów od 55 producentów",
      "Zasilanie": "230 V | 50-60 Hz"
    },
    "accessories": [
      {
        "name": "Komplet zespołów pomiarowych z automatycznym kompensatorem",
        "quantity": "1 kpl.",
        "catalogNumber": "932.501.095",
        "isOptional": false
      },
      {
        "name": "Jednostka centralna z komputerem, monitorem 27\", drukarką i stacją zasilania głowic pomiarowych",
        "quantity": "1 szt.",
        "catalogNumber": "932.501.087",
        "isOptional": false
      },
      {
        "name": "Aluminiowe obrotnice mechaniczne",
        "quantity": "2 szt.",
        "catalogNumber": "932.401.092",
        "isOptional": false
      },
      {
        "name": "Wypełnienia obrotnic mechanicznych",
        "quantity": "1 kpl.",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Zaciski samocentrujące o zakresie mocowania 13\" - 21\"",
        "quantity": "4 szt.",
        "catalogNumber": "932.401.111",
        "isOptional": false
      },
      {
        "name": "Blokada pedału hamulca",
        "quantity": "1 szt.",
        "catalogNumber": "932.401.013",
        "isOptional": false
      },
      {
        "name": "Blokada koła kierownicy",
        "quantity": "1 szt.",
        "catalogNumber": "932.401.012",
        "isOptional": false
      },
      {
        "name": "Instrukcja obsługi w języku polskim",
        "quantity": "1 szt.",
        "catalogNumber": "902.502.101",
        "isOptional": false
      },
      {
        "name": "Zestaw przewodów awaryjnych",
        "quantity": "1 kpl.",
        "catalogNumber": "1690401012",
        "isOptional": false
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/ml-easy-3d.html",
    "notes": null
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
    "name": "Geometria Beissbarth Q.Lign 3D Compact",
    "shortDescription": "Bezprzewodowy, ultraszybki przyrząd 3D do pomiaru i regulacji geometrii kół w pojazdach o DMC do 3,5 t w architekturze Stream-to-X.",
    "priceNetto": "92.500 zł netto",
    "priceVariants": [
      {
        "label": "Zestaw bazowy z tabletem Android 10,1\"",
        "priceNetto": "92.500 zł netto"
      },
      {
        "label": "Opcja: Szafka odkładcza z drukarką i monitorem 27\"",
        "priceNetto": "+10.300 zł netto"
      },
      {
        "label": "Opcja: Komplet zacisków Q.Grip (montaż w 3 s)",
        "priceNetto": "+15.600 zł netto"
      },
      {
        "label": "Opcja: Komplet zacisków magnetycznych",
        "priceNetto": "+8.300 zł netto"
      },
      {
        "label": "Opcja: Komplet aluminiowych obrotnic mechanicznych",
        "priceNetto": "+6.500 zł netto"
      }
    ],
    "details": [
      "Beissbarth Q.Lign 3D Compact to profesjonalny, ultraszybki przyrząd do pomiaru i regulacji geometrii kół w pojazdach samochodowych o DMC < 3,5 t pracujący w technologii 3D.",
      "Urządzenie wyposażone jest w 2 bezprzewodowe zespoły pomiarowe z dodatkowymi wyświetlaczami QLED ilustrującymi mierzone parametry bezpośrednio przy kole oraz trwałymi akumulatorami Li-Ion zapewniającymi do 19 h ciągłej pracy.",
      "Prezentacja pomiarów na dowolnym urządzeniu: tablecie Android, monitorze TV, laptopie lub komputerze PC dzięki technologii Stream-to-X bez kabli i szafy sterującej.",
      "Błyskawiczny montaż: opcjonalne zaciski kół Q.Grip montowane są na oponie bez kontaktu z felgą w czasie poniżej 3 sekund na koło.",
      "Bezprzewodowy pomiar i komunikacja z automatycznym rozpoznawaniem ekranów oraz minimalna przestrzeń robocza przed stanowiskiem pomiarowym."
    ],
    "technicalSpecs": {
      "Typ urządzenia": "Ultraszybka bezprzewodowa geometria kół 3D",
      "Architektura": "Stream-to-X (tablet, laptop, PC, Smart TV przez Wi-Fi)",
      "Rozstaw osi pojazdów": "1800 – 4500 mm",
      "Wyświetlacze głowic": "Ekrany OLED/QLED zintegrowane w głowicach",
      "Wymiary głowic (wys. × dł. × szer.)": "137 × 372 × 311 mm",
      "Waga głowic": "6 kg",
      "Zasilanie głowic": "Wbudowane akumulatory Li-Ion 99.4 Wh",
      "Czas pracy na baterii": "Do 19 h ciągłej pracy",
      "Czas ładowania": "< 3 h (szybkie ładowanie w stacji odkładczej)"
    },
    "accessories": [
      {
        "name": "Komplet bezprzewodowych zespołów pomiarowych Q.Lign z akumulatorami Li-Ion",
        "quantity": "1x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Zestaw ekranów pomiarowych (4 tarcze celownicze)",
        "quantity": "1x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Blokada hamulca i kierownicy",
        "quantity": "1x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Obrotnice mechaniczne z wypełnieniami",
        "quantity": "2x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Stanowisko odkładcze zintegrowane z ładowarką akumulatorów",
        "quantity": "1x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Zaciski samocentrujące o zakresie mocowania 13\" - 22\"",
        "quantity": "4x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Tablet warsztatowy Android 10,1\"",
        "quantity": "1x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Uchwyty mocujące do podnośnika",
        "quantity": "2x",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Szafka warsztatowa ze stanowiskiem odkładczym, drukarką i monitorem 27\"",
        "quantity": "1 szt.",
        "catalogNumber": "10 300 zł netto",
        "isOptional": true
      },
      {
        "name": "Komplet zacisków Q.Grip 525–840 mm / 20.6\"–33\" (montaż 3 s, waga 2.65 kg)",
        "quantity": "1 kpl.",
        "catalogNumber": "15 600 zł netto",
        "isOptional": true
      },
      {
        "name": "Komplet zacisków magnetycznych",
        "quantity": "1 kpl.",
        "catalogNumber": "8 300 zł netto",
        "isOptional": true
      },
      {
        "name": "Komplet aluminiowych obrotnic mechanicznych z wypełnieniami",
        "quantity": "1 kpl.",
        "catalogNumber": "6 500 zł netto",
        "isOptional": true
      }
    ],
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
    "slug": "qb-4",
    "categorySlug": "linie-diagnostyczne",
    "name": "Linia diagnostyczna Beissbarth QB 4",
    "shortDescription": "Nowoczesne rolkowe stanowisko hamulcowe z kontrolą pomiaru w czasie rzeczywistym na tablecie 10,1\", smartfonie lub TV oraz integracją z testerem zawieszenia QS 4 EUSAMA.",
    "priceNetto": "49.600 zł netto",
    "priceVariants": [
      {
        "label": "QB.4 2200mm | 3,7 kW (tablet 10,1\", nacisk 4t, rozstaw 800-2200mm)",
        "priceNetto": "49.600 zł netto"
      },
      {
        "label": "QB.4 2800mm | 5,0 kW (tablet 10,1\", nacisk 4t, rozstaw 800-2800mm)",
        "priceNetto": "59.700 zł netto"
      },
      {
        "label": "Moduł rozszerzający: Tester zawieszenia QS.4 2800mm EUSAMA (silniki 2x2.5kW)",
        "priceNetto": "+42.500 zł netto"
      },
      {
        "label": "Opcja: Wanna fundamentowa rolek QB 4",
        "priceNetto": "+5.200 zł netto"
      },
      {
        "label": "Opcja: Pokrywy ochronne rolek hamulcowych",
        "priceNetto": "+3.250 zł netto"
      },
      {
        "label": "Opcja: Analogowy wskaźnik zegarowy naścienny",
        "priceNetto": "+6.450 zł netto"
      },
      {
        "label": "Opcja: Zestaw do bezprzewodowej wizualizacji TV",
        "priceNetto": "+3.050 zł netto"
      },
      {
        "label": "Opcja: Bezprzewodowy miernik siły nacisku na pedał hamulca",
        "priceNetto": "+10.000 zł netto"
      },
      {
        "label": "Opcja: Rama fundamentowa testera zawieszenia QS 4",
        "priceNetto": "+3.600 zł netto"
      },
      {
        "label": "Opcja: Wanna fundamentowa zestawu linii QB 4 i QS 4",
        "priceNetto": "+6.500 zł netto"
      }
    ],
    "details": [
      "Beissbarth QB 4 to najnowocześniejsze rolkowe stanowisko hamulcowe do kontroli i diagnostyki układu hamulcowego pojazdów o dopuszczalnej masie całkowitej (DMC) do 3,5 t.",
      "Brak konieczności stosowania tradycyjnej szafy sterującej i pilota: pełna kontrola nad przebiegiem pomiaru odbywa się w czasie rzeczywistym przy użyciu tabletu warsztatowego 10,1\" lub smartfonu z automatycznym trybem pomiarowym.",
      "Wbudowany hamulec elektromagnetyczny ułatwia wyjazd badanego pojazdu ze stanowiska rolkowego, a podwyższona o 25 mm tylna rolka zapobiega wypchnięciu kół podczas intensywnego hamowania.",
      "Pełna integracja modułowa: stanowisko rolkowe QB 4 bezproblemowo współpracuje z testerem zawieszenia QS 4 (metoda EUSAMA, 2 silniki 2,5 kW) tworząc kompletną ścieżkę diagnostyczną.",
      "Łączność Stream-to-X oraz interfejs ASA Livestream 1.2: bezprzewodowa prezentacja sił hamowania i szacowania skuteczności na tablecie, monitorze TV z dedykowanym zestawem HDMI lub komputerze PC."
    ],
    "technicalSpecs": {
      "Typ urządzenia": "Rolkowe stanowisko hamulcowe / modułowa linia diagnostyczna",
      "Zakres sił hamowania": "0 – 5,0 kN przy obciążeniu 4,0 t na oś",
      "Maksymalny nacisk osi": "4,0 t (badanie pojazdów do 3,5 t DMC)",
      "Rozstaw kół (wariant 2200mm)": "800 – 2200 mm (silniki 2 × 3,7 kW)",
      "Rozstaw kół (wariant 2800mm)": "800 – 2800 mm (silniki 2 × 5,0 kW)",
      "Prędkość pomiarowa": "5,2 km/h",
      "Średnica rolek": "Ø 205 mm, szerokość 700 mm",
      "Geometria rolek": "Tylna rolka uniesiona o 25 mm",
      "Hamulec wyjazdowy": "Wbudowany elektromagnetyczny wspomagający wyjazd",
      "Obsługa napędów 4x4": "Opcjonalna funkcja badania pojazdów z napędem na 4 koła",
      "Tester zawieszenia QS.4": "Metoda EUSAMA, 0-30 Hz, nacisk osi 2t, 2x2.5 kW, skok 6 mm"
    },
    "accessories": [
      {
        "name": "Moduł rolek hamulcowych Beissbarth QB 4 z uniesioną tylną rolką i hamulcem elektromagnetycznym",
        "quantity": "1 szt.",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Skrzynka sterująco-zasilająca z interfejsem ASA Livestream 1.2",
        "quantity": "1 szt.",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Tablet warsztatowy Android 10,1\" z dedykowaną aplikacją pomiarową",
        "quantity": "1 szt.",
        "catalogNumber": "",
        "isOptional": false
      },
      {
        "name": "Tester zawieszenia QS.4 2800mm (EUSAMA, silniki 2x2.5kW)",
        "quantity": "1 szt.",
        "catalogNumber": "42 500 zł netto",
        "isOptional": true
      },
      {
        "name": "Wanna fundamentowa rolek hamulcowych QB 4",
        "quantity": "1 szt.",
        "catalogNumber": "1 691 602 115 (5 200 zł netto)",
        "isOptional": true
      },
      {
        "name": "Pokrywy ochronne rolek hamulcowych",
        "quantity": "1 kpl.",
        "catalogNumber": "935.602.032 (3 250 zł netto)",
        "isOptional": true
      },
      {
        "name": "Analogowy naścienny wskaźnik zegarowy ze wspornikiem",
        "quantity": "1 szt.",
        "catalogNumber": "1 691 401 100 (6 450 zł netto)",
        "isOptional": true
      },
      {
        "name": "Zestaw do bezprzewodowej wizualizacji danych na ekranie TV",
        "quantity": "1 kpl.",
        "catalogNumber": "1 691 403 100 (3 050 zł netto)",
        "isOptional": true
      },
      {
        "name": "Bezprzewodowy miernik siły nacisku na pedał hamulca",
        "quantity": "1 szt.",
        "catalogNumber": "1 691 403 101 (10 000 zł netto)",
        "isOptional": true
      },
      {
        "name": "Rama fundamentowa testera zawieszenia QS 4",
        "quantity": "1 szt.",
        "catalogNumber": "1691622002 (3 600 zł netto)",
        "isOptional": true
      },
      {
        "name": "Wanna fundamentowa zestawu linii diagnostycznej QB 4 i QS 4",
        "quantity": "1 szt.",
        "catalogNumber": "1691602002 (6 500 zł netto)",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/linie-diagnostyczne/qb-4.html",
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
  },
  {
    "slug": "mld-815",
    "categorySlug": "urzadzenia-do-swiatel",
    "name": "Przyrząd do ustawiania świateł Beissbarth MLD 815",
    "shortDescription": "Cyfrowy przyrząd do kontroli i regulacji świateł z kamerą CMOS, dwoma laserami pozycjonującymi, dotykowym ekranem 5.7\" i zintegrowaną drukarką termiczną. Pełna obsługa reflektorów Matrix LED, Xenon i Halogen.",
    "priceNetto": "21.500 zł netto",
    "priceVariants": [
      {
        "label": "MLD 815 wersja standard (kamera CMOS, 2x laser, ekran dotykowy 5.7\", drukarka)",
        "priceNetto": "21.500 zł netto"
      },
      {
        "label": "Opcja: Pokrowiec ochronny (nr kat. 1692105060)",
        "priceNetto": "+286 zł netto"
      },
      {
        "label": "Opcja: Szyny dł. 3m do przesuwu wzdłużnego testera (nr kat. 1692105080)",
        "priceNetto": "+3.800 zł netto"
      },
      {
        "label": "Opcja: Dodatkowe przedłużacze szyn 1,5m (nr kat. 1692105112)",
        "priceNetto": "+2.100 zł netto"
      },
      {
        "label": "Opcja: Czujnik automatycznego pomiaru wysokości (nr kat. 1692104329)",
        "priceNetto": "+744 zł netto"
      },
      {
        "label": "Opcja: Oprogramowanie IC Perform z Bluetooth do sieci ASA Network (nr kat. 1692105145)",
        "priceNetto": "+3.800 zł netto"
      }
    ],
    "details": [
      "Beissbarth MLD 815 to nowoczesny, cyfrowy przyrząd do kontroli i precyzyjnego ustawiania świateł w pojazdach samochodowych, wyposażony w kamerę CMOS o wysokiej rozdzielczości z superszybką obróbką obrazu w czasie rzeczywistym.",
      "System 2 laserów pozycjonujących: laserowy pozycjoner wspomaga pozycjonowanie testera na stanowisku pomiarowym nawet przy słabym oświetleniu hali, a laser krzyżowy pozwala idealnie ustawić tester względem lamp pojazdu (szczególnie istotne dla reflektorów LED, Matrix LED oraz Xenon).",
      "Wysokiej klasy szklana soczewka o średnicy 230 mm zapewnia bezkompromisową jakość optyczną i powtarzalność pomiarów z dokładnością +/- 1 cm przy dystansie pomiarowym 10 m.",
      "Interaktywny dotykowy wyświetlacz LCD 5.7\" (262 000 kolorów) z kurzo- i kroploszczelną osłoną, wskazujący cyfrowo linię odcięcia światła, kąty świecenia, odchylenie pionowe i poziome, światłość oraz natężenie oświetlenia.",
      "Zintegrowana drukarka termiczna (wstęgowa) umożliwia natychmiastowy wydruk protokołu z wykonanego pomiaru i regulacji dla klienta.",
      "Program pomiarowy automatycznie prowadzi diagnostę przez kolejne etapy badania. Urządzenie posiada oficjalne certyfikaty CE i TÜV."
    ],
    "technicalSpecs": {
      "Przetwornik obrazu": "Kamera CMOS (szybka cyfrowa obróbka obrazu w czasie rzeczywistym)",
      "System pozycjonowania": "2 lasery (pozycjoner stanowiska + laser krzyżowy względem lamp)",
      "Układ optyczny": "Szklana soczewka o średnicy 230 mm",
      "Dokładność pomiaru": "Dystans pomiarowy 10 m ± 1 cm",
      "Wyświetlacz": "Interaktywny dotykowy LCD 5.7\" (262 000 kolorów, odporny na kurz i wilgoć)",
      "Drukarka": "Zintegrowana drukarka termiczna (wstęgowa)",
      "Obsługiwane źródła światła": "Halogen, Xenon, LED, LED Matrix",
      "Rodzaje świateł": "Światła mijania, drogowe, przeciwmgielne",
      "Zakres pomiarowy - pion (góra/dół)": "0% – 6% (0 – 600 mm)",
      "Zakres pomiarowy - poziom (lewo/prawo)": "Mijania: 0% – 10% (0 – 1000 mm) | Drogowe: 0% – 10% (0 – 1000 mm)",
      "Zakres pomiarowy - jasność": "Lux / 25m: 0 – 240 | Kandela: 0 – 150 000 cd | Lux / 1m: 0 – 150 000",
      "Jednostki pomiarowe": "Światłość: Lux (25m), Candela, kLux (1m) | Regulacja: %, cm, °",
      "Regulacja skoku soczewki": "240 – 1450 mm",
      "Zasilanie": "Wewnętrzna bateria akumulatorowa / sieć 100-240 V (50-60 Hz)",
      "Zakres temperatur pracy": "5°C – 45°C",
      "Certyfikaty": "CE, TÜV"
    },
    "accessories": [
      {
        "name": "Kamera cyfrowa CMOS zintegrowana w obudowie optycznej",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Laserowy pozycjoner do ustawiania testera na stanowisku",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Laser krzyżowy do ustawienia względem reflektorów LED/Matrix/Xenon",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Precyzyjna szklana soczewka o średnicy 230 mm",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Wbudowana drukarka termiczna",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Pokrowiec ochronny",
        "quantity": "1 szt.",
        "catalogNumber": "1692105060",
        "isOptional": true
      },
      {
        "name": "Szyny dł. 3m do swobodnego przesuwu wzdłużnego testera",
        "quantity": "1 szt.",
        "catalogNumber": "1692105080",
        "isOptional": true
      },
      {
        "name": "Dodatkowe przedłużacze szyn 1,5m",
        "quantity": "1 szt.",
        "catalogNumber": "1692105112",
        "isOptional": true
      },
      {
        "name": "Czujnik automatycznego pomiaru wysokości",
        "quantity": "1 szt.",
        "catalogNumber": "1692104329",
        "isOptional": true
      },
      {
        "name": "Oprogramowanie IC Perform z interfejsem bezprzewodowym Bluetooth (ASA Network)",
        "quantity": "1 szt.",
        "catalogNumber": "1692105145",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-do-swiatel/mld-815.html",
    "notes": null
  },
  {
    "slug": "mld-9000",
    "categorySlug": "urzadzenia-do-swiatel",
    "name": "Przyrząd do ustawiania świateł Beissbarth MLD 9000",
    "shortDescription": "Flagowy cyfrowy przyrząd do kontroli i regulacji świateł z kamerą CMOS 5 megapikseli, 2 laserami, dotykowym ekranem 7\", drukarką termiczną oraz pełną obsługą reflektorów Matrix beam 2.",
    "priceNetto": "26.500 zł netto",
    "priceVariants": [
      {
        "label": "MLD 9000 wersja standard (kamera CMOS 5 MP, 2x laser, ekran dotykowy 7\", drukarka)",
        "priceNetto": "26.500 zł netto"
      },
      {
        "label": "Opcja: Pokrowiec ochronny (nr kat. 1.692.105.201)",
        "priceNetto": "+585 zł netto"
      },
      {
        "label": "Opcja: Szyny dł. 3m do przesuwu wzdłużnego testera (nr kat. 1.692.105.080)",
        "priceNetto": "+3.800 zł netto"
      },
      {
        "label": "Opcja: Dodatkowe przedłużacze szyn 1,5m (nr kat. 1.692.105.112)",
        "priceNetto": "+2.100 zł netto"
      },
      {
        "label": "Opcja: Automatyczny pomiar wysokości (nr kat. 1.692.105.278)",
        "priceNetto": "+1.190 zł netto"
      },
      {
        "label": "Opcja: Funkcja CoRe z modułem WiFi (nr kat. 1.692.105.282)",
        "priceNetto": "+1.544 zł netto"
      }
    ],
    "details": [
      "Beissbarth MLD 9000 to najnowszy, flagowy przyrząd do badania i precyzyjnej regulacji wszystkich rodzajów oświetlenia w pojazdach samochodowych, wyposażony w matrycę CMOS o wysokiej rozdzielczości 5 megapikseli z superszybką cyfrową obróbką obrazu w czasie rzeczywistym.",
      "System dwóch laserów: laserowy pozycjoner wspomaga pozycjonowanie testera na stanowisku diagnostycznym nawet przy słabym oświetleniu hali, a laser krzyżowy pozwala idealnie ustawić jednostkę optyczną względem reflektorów pojazdu (kluczowe przy oświetleniu LED, Matrix LED, Matrix beam 2 oraz Xenon).",
      "Wyposażony w duży, interaktywny i dotykowy wyświetlacz LCD o przekątnej 7\" (262 000 kolorów) z kurzo- i kroploszczelną powłoką ochronną, który w czasie rzeczywistym prezentuje linię odcięcia światła, kąty świecenia, odchylenie pionowe i poziome, światłość oraz natężenie oświetlenia.",
      "Wbudowana drukarka wstęgowa (termiczna) umożliwia natychmiastowe wygenerowanie protokołu pomiarowego dla klienta lub do dokumentacji stacji.",
      "Program pomiarowy automatycznie prowadzi diagnostę krok po kroku przez kolejne etapy badania. Możliwość bezprzewodowej transmisji WLAN i wizualizacji wyników na komputerze serwisowym za pomocą funkcji CoRe.",
      "Przyrząd posiada oficjalne dopuszczenia oraz certyfikaty CE i TÜV."
    ],
    "technicalSpecs": {
      "Przetwornik obrazu": "Kamera cyfrowa CMOS 5 megapikseli (szybka obróbka w czasie rzeczywistym)",
      "System pozycjonowania": "2 lasery (pozycjoner stanowiska + laser krzyżowy względem lamp)",
      "Wyświetlacz": "Interaktywny dotykowy ekran LCD 7\" (262 000 kolorów, odporny na kurz i wilgoć)",
      "Drukarka": "Zintegrowana drukarka wstęgowa (termiczna)",
      "Transmisja danych": "WLAN / funkcja sieciowa CoRe (opcjonalny moduł WiFi)",
      "Dokładność pomiaru": "Dystans pomiarowy 10 m ± 1 cm",
      "Obsługiwane źródła światła": "Halogen, Xenon, LED, LED Matrix, Matrix beam 2",
      "Rodzaje badanych świateł": "Światła mijania, drogowe, przeciwmgielne",
      "Zakres pomiarowy - pion (góra/dół)": "-8% do +8% (-800 mm do +800 mm)",
      "Zakres pomiarowy - poziom (lewo/prawo)": "Mijania: -10% do +10% (-1000 do +1000 mm) | Drogowe: -10% do +10% (-1000 do +1000 mm)",
      "Zakres pomiaru jasności": "Lux / 25m: 0 – 240 | Kandela: 0 – 150 000 cd | Lux / 1m: 0 – 150 000",
      "Jednostki pomiarowe": "Światłość: Lux (25m), Candela (cd), kLux (1m) | Regulacja: %, cm, °",
      "Regulacja skoku soczewki": "240 – 1450 mm",
      "Zasilanie": "Wewnętrzna bateria akumulatorowa / zewnętrzne 100-240 V (50-60 Hz)",
      "Zakres temperatur pracy": "5°C – 45°C",
      "Certyfikaty": "CE, TÜV"
    },
    "accessories": [
      {
        "name": "Kamera cyfrowa CMOS 5 MP zintegrowana w obudowie optycznej",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Laserowy pozycjoner do ustawiania testera na stanowisku pracy",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Laser krzyżowy do precyzyjnego osiowania reflektorów LED/Matrix/Xenon",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Dotykowy kolorowy wyświetlacz LCD 7\"",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Zintegrowana drukarka termiczna (wstęgowa)",
        "quantity": "1 szt.",
        "isOptional": false
      },
      {
        "name": "Pokrowiec ochronny",
        "quantity": "1 szt.",
        "catalogNumber": "1.692.105.201",
        "isOptional": true
      },
      {
        "name": "Szyny dł. 3m do swobodnego przesuwu wzdłużnego testera",
        "quantity": "1 szt.",
        "catalogNumber": "1.692.105.080",
        "isOptional": true
      },
      {
        "name": "Dodatkowe przedłużacze szyn 1,5m",
        "quantity": "1 szt.",
        "catalogNumber": "1.692.105.112",
        "isOptional": true
      },
      {
        "name": "Automatyczny pomiar wysokości",
        "quantity": "1 szt.",
        "catalogNumber": "1.692.105.278",
        "isOptional": true
      },
      {
        "name": "Funkcja CoRe z modułem WiFi do bezprzewodowej transmisji wyników",
        "quantity": "1 szt.",
        "catalogNumber": "1.692.105.282",
        "isOptional": true
      }
    ],
    "hasFullData": true,
    "originalUrl": "https://www.beissbarth-service.pl/produkty/urzadzenia-do-swiatel/mld-9000.html",
    "notes": null
  }
];
