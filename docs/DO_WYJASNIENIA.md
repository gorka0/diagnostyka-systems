# Rejestr rozbieżności i braków (DO_WYJASNIENIA.md)

Dokument zawiera kompletną listę niespójności, brakujących treści, błędów kategoryzacji oraz pustych podstron wykrytych podczas analizy i parsowania starej bazy wiedzy serwisu `www.beissbarth-service.pl` (86 podstron).

---

## 1. Puste podstrony maszyn i kategorii w starym CMS

| Lp. | Adres URL ze starej strony | Tytuł / Model | Problem w starym CMS | Decyzja / Pytanie do klienta |
| :---: | :--- | :--- | :--- | :--- |
| 1 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-78-detail.html` | **Demontażownica Servomat MS 78** | **Całkowicie pusta strona.** Brak opisu, zdjęć, zasilania oraz danych technicznych (tylko nazwa i przycisk zapytania). | Czy MS 78 jest nadal w ofercie? Jeśli tak, prosimy o dostarczenie karty technicznej (średnica koła, waga, zasilanie). |
| 2 | `/produkty/serwis-klimatyzacji.html` | **Serwis klimatyzacji Valeo i Beissbarth** | **Pusta kategoria.** Strona kategorii nie zawierała żadnych produktów ani opisów stacji klimatyzacji (mimo że firma jest autoryzowanym partnerem Valeo/SPX). | Jakie konkretne modele stacji klimatyzacji (np. Valeo ClimFill Maxi/Pro/Easy, Robinair) mają znaleźć się w nowym katalogu? |
| 3 | `/o-nas/certyfikaty.html` | **Certyfikaty - Beissbarth Service** | **Pusta podstrona.** Jedynie nagłówek "Certyfikaty" bez treści, grafik ani numerów certyfikatów. | Prosimy o dostarczenie skanów lub numerów certyfikatów (ITS dla SKP, certyfikat autoryzacji Beissbarth, certyfikat Valeo). |
| 4 | `/produkty/urzadzenia-dla-marki/` (23 podstrony OEM) | **Urządzenia OEM dla marek: VAG, Mercedes, BMW, Toyota** | **Puste karty produktów.** Wszystkie 23 podstrony zawierały wyłącznie nazwę maszyny bez żadnego opisu i parametrów (szczegóły w pkt 4). | Czy zachować te urządzenia w podziale na marki? Jeśli tak, potrzebne są oficjalne opisy homologacji OEM. |

---

## 2. Niespójności tytułów, treści i adresów URL

| Lp. | Adres URL | Tytuł w CMS | Rzeczywista treść na podstronie | Problem i rekomendacja |
| :---: | :--- | :--- | :--- | :--- |
| 1 | `/produkty/geometria/geometria-beissbarth-ml-8-r-tech-awb-detail.html` oraz w dziale ciężarowym | **Geometria Beissbarth ML 8 R TECH AWB** | **Q.Lign 3D Compact** ("Q.Lign 3D Compact to bezprzewodowy, profesjonalny, ultraszybki przyrząd... głowice Q.Lign z wyświetlaczami QLED, technologia Stream-to-X") | **Krytyczny błąd merytoryczny w CMS:** Pod nazwą i kodem urządzenia głowicowego ML 8 R TECH wklejono opis nowoczesnej geometrii kamerowej 3D Q.Lign Compact. Wymaga rozdzielenia na dwa osobne produkty: ML 8 R TECH (ciężarowy) oraz Q.Lign Compact. |
| 2 | `/produkty/nowosci/tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail.html` | **Nowości : Urządzenie do pomiaru geometrii Q.Lign T.41** | **Urządzenie do pomiaru geometrii Q.Lign T.41** | **Zły slug URL:** Pod adresem testera ustawienia świateł MLD 815 zapisano geometrię Q.Lign T.41. W nowym serwisie nadano poprawny slug `beissbarth-qlign-t41`, a tester świateł MLD 815 wymaga osobnego uzupełnienia danych. |
| 3 | `/ml-easy-3d.html` | **Geometria Beissbarth ML EASY 3D** | **Geometria Beissbarth ML EASY CCD EXCELLENCE** | Rozbieżność w nazewnictwie: w URL figuruje `ML EASY 3D`, natomiast w treści opisany jest przyrząd kamerowy CCD pod nazwą `Easy CCD Excellence`. Czy to ten sam model po rebrandingu, czy dwa różne urządzenia? |

---

## 3. Rozbieżności w nazewnictwie handlowym (Kody serii MS/MT vs TC/G)

W starym serwisie zauważono podwójne nazewnictwo maszyn – w adresach URL stosowano kody fabryczne Beissbarth (np. `MS 500`, `MT Zero`), a w treści nazwy handlowe (np. `TC 22`, `G20`):

1. **Wyważarki do kół**:
   - URL: `wywazarka-beissbarth-mt-zero-6-lcd-aw-detail` → Tytuł i treść: **Wyważarka Beissbarth G20**
   - URL: `wywazarka-beissbarth-mt-zero-6-touch-awlp-detail` → Tytuł i treść: **Wyważarka Beissbarth G 30**
   - URL: `wywazarka-beissbarth-mt-zero-6-lcd-awl-detail` → Tytuł i treść: **Wyważarka Beissbarth G30P**
   - URL: `wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail` → Tytuł i treść: **Wyważarka Beissbarth G50**
   - URL: `wywazarka-beissbarth-mt-zero-6-touch-awl-detail` → Tytuł i treść: **Wyważarka Beissbarth G60 P Pro**
   *Rekomendacja:* Ujednolicić nazewnictwo w nowym katalogu jako: `Beissbarth seria G (G20, G30, G30P, G50, G60 P Pro) / MT Zero`.

2. **Demontażownice do opon**:
   - URL: `ms-500-demontazownica-beissbarth-serii-g-frame-detail` → Treść: **Demontażownica Beissbarth TC 22**
   - URL: `ms-530-demontazownica-beissbarth-serii-g-frame-detail` → Treść: **Demontażownica Beissbarth TC 22 PRO**
   - URL: `ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail` → Treść: **Demontażownica Beissbarth TC 45 PRO**
   - URL: `ms-630-demontazownica-beissbarth-serii-g-frame-detail` → Treść: **Demontażownica Beissbarth serii TC 45 Pro 2**
   - URL: `ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail` → Treść: **Demontażownica Beissbarth TC 47 L Pro 2**
   *Rekomendacja:* W nowym katalogu zachować oba oznaczenia (np. `Beissbarth TC 22 / MS 500 G-Frame`), aby użytkownicy szukający obu kodów trafiali na właściwy produkt.

---

## 4. Wykaz pustych kart produktów OEM (23 pozycje)

Poniższe 23 produkty z kategorii `/produkty/urzadzenia-dla-marki/` miały w starym systemie wyłącznie stronę tytułową z formularzem kontaktowym bez parametrów technicznych:

### Grupa VAG (8 modeli)
- `VAS 6279`
- `VAS 6360`
- `VAS 6595`
- `VAS 6602`
- `VAS 6603`
- `VAS 6651`
- `VAS 6767`
- `VAS 6783`

### Mercedes-Benz (5 modeli)
- `ML 81R TECH`
- `ML 81 TECH`
- `Wyważarka Beissbarth MT 848`
- `Wyważarka Beissbarth MT 868ADT`
- `BD 620 PC`

### BMW (8 modeli)
- `KDS II`
- `Geometria Beissbarth KDS 3D`
- `MT 825D`
- `MT 825D` (zdublowany rekord w CMS: `mt-825d2013-06-24-13-39-54_-detail`)
- `MT 848AD`
- `MT 868ADT` (rekord w CMS z timestampem: `mt-868adt2013-06-24-13-41-37_-detail`)
- `MS 65`
- `MS 680`

### Toyota (2 modele)
- `EASY 3D OEM`
- `BD 640 Toyota`

---

## 5. Zdublowane rekordy ze znacznikami czasu w adresach URL

W bazie starego CMS Joomla/VirtueMart wykryto wpisy utworzone przez błędy edycyjne z doklejonym znacznikiem daty w URL:
1. `mt-825d2013-06-24-13-39-54_-detail.html` (duplikat modelu MT 825D)
2. `mt-868adt2013-06-24-13-41-37_-detail.html` (model MT 868ADT)
3. `geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail.html` (używana geometria ML 1800-8R z datą 2017-01-13 w URL)

*Decyzja:* W nowym pliku `src/data/products.ts` zachowano te pozycje z unikalnym slugiem i flagą `notes`, jednak w nowym routingu zaleca się scalenie ich w czyste, kanoniczne slugi.

---

## 6. Uszkodzone linki i pętle przekierowań na starym serwerze

- `http://www.beissbarth-service.pl/mt-857dt.html`
- `http://www.beissbarth-service.pl/ms-63.html`

Oba powyższe adresy zwracały na starym serwerze błąd `303 See Other` zapętlony w nieskończoność do `?error=404`. Jeśli wyważarka MT 857DT i demontażownica MS 63 mają być w ofercie, prosimy o dostarczenie ich aktualnych kart katalogowych.

---

## 7. Kwestie operacyjne i biznesowe do potwierdzenia z klientem (Audyt Treści - KROK 1)

W toku audytu treści (KROK 1) i usunięcia niezweryfikowanych wypełniaczy wyodrębniono poniższe kwestie do decyzji klienta:

1. **Godziny otwarcia biura, magazynu i dyspozycyjności serwisu:**
   - W starej bazie brakowało podanych godzin pracy siedziby w Lisim Ogonie.
   - *Pytanie do klienta:* W jakich godzinach czynne jest biuro handlowe i magazyn w Lisim Ogonie (np. pn–pt 8:00–16:00)? Czy serwis dysponuje osobnym harmonogramem przyjmowania zgłoszeń awaryjnych?

2. **Szczegóły realizacji wdrożeń i zgoda na publikację referencji:**
   - W oryginalnej bazie podstrony realizacji zawierały wyłącznie nazwę klienta i link www (`BMW Sikora`, `VW Wątarski`, `CUM Szymacha`, `BMW Dynamic Toruń`, `BMW Dobrzańscy Kraków`). Wszystkie opisy wdrożeń zostały usunięte jako nieautoryzowane domysły.
   - *Pytanie do klienta:* Czy klient dysponuje oficjalnymi opisami tych wdrożeń (np. model zainstalowanej aparatury, rok montażu) oraz czy posiada nowe referencje i zdjęcia obiektów z ostatnich lat do dodania na podstronie `/realizacje`?

3. **Ceny produktów w katalogu (publiczne vs na zapytanie):**
   - Poza historyczną promocją na zestaw ML 8 ROC (46 900 zł netto), w bazie wiedzy nie ma publicznych cen maszyn (wszystkie karty zawierały przycisk „Zadaj pytanie o produkt”).
   - *Pytanie do klienta:* Czy ceny nowych urządzeń mają pozostać ukryte (zgodnie ze standardem B2B – zapytanie ofertowe / kontakt z doradcą handlowym), czy wybrane pozycje mają otrzymać orientacyjne widełki cenowe?

4. **Pełne wersje publikacji prasowych (pliki PDF / skany):**
   - W bazie wiedzy zachowały się wyłącznie wpisy bibliograficzne: *„Rentowność ogumienia”* (Moto części, IX 2012) oraz *„Vademecum warsztatu samochodowego”* (Moto części, III 2012).
   - *Pytanie do klienta:* Czy klient posiada pliki PDF lub skany tych artykułów, aby umożliwić ich bezpośrednie pobranie przez odwiedzających na podstronach publikacji?

5. **Aktualne certyfikaty i autoryzacje w wysokiej rozdzielczości:**
   - Zdjęcia certyfikatów w galerii/lightboxie pochodzą z archiwalnych skanów.
   - *Pytanie do klienta:* Prosimy o dostarczenie aktualnych certyfikatów autoryzacyjnych Beissbarth GmbH, dopuszczeń ITS do badań na SKP oraz certyfikatu partnera Valeo w plikach PDF/PNG wysokiej rozdzielczości.

---

## 8. Analiza facetów katalogowych i jakość grafik (KROK 2: Katalog Urządzeń)

### A. Odrzucone facety z powodu niskiego pokrycia danych (< 70%)
Zgodnie z zasadą niewymyślania danych i niezafałszowywania wyników, w UI wdrożono wyłącznie facety o wiarygodnym pokryciu $\ge 70\%$. Pozostałe cechy odrzucono:
1. **Napięcie zasilania (230 V vs 400 V / 3-fazowe):**
   - Występuje w danych technicznych zaledwie dla **9 na 50 produktów (18% pokrycia)**.
   - *Wniosek:* Dodanie takiego filtra odsiało by 82% maszyn jako "brak danych". Odrzucono z filtrów globalnych.
2. **Zakres mocowania obręczy / średnica koła (np. 10"-24"):**
   - Występuje w parametrach dla **14 na 50 produktów (28% pokrycia)** – wyłącznie część wyważarek i montażownic.
   - *Wniosek:* Odrzucono jako globalny facet; informacja widoczna jest bezpośrednio w tabeli danych technicznych karty produktu.

### B. Produkty niejednoznaczne (brak typu w bazie)
- **8 modeli grupy VAG z kodami VAS:**
  - `VAS 6279`, `VAS 6360`, `VAS 6595`, `VAS 6602`, `VAS 6603`, `VAS 6651`, `VAS 6767`, `VAS 6783`.
  - W starym CMS maszyny te nie miały przypisanego typu urządzenia (wyważarka / montażownica / geometria), a jedynie kod OEM VAS i kategorię Urządzenia dla marki (OEM).
  - *Decyzja w UI:* Przypisano serię `VAS` oraz markę `VAG`. Typ pozostawiono jako niezdefiniowany (niewymuszany), dzięki czemu produkty nie są sztucznie zafałszowane, a użytkownik odnajduje je po kodzie VAS lub marce VAG.

### C. Grafiki o niskiej rozdzielczości (< 400 px) do wymiany przez klienta
Skrypt analityczny wykrył 6 plików o szerokości mniejszej niż 400 px, które w widoku siatki 1:1 mogą wykazywać niższą ostrość:
1. `ml-1800-8r.jpg` – **132 × 176 px** (miniatura używanej geometrii ML 1800-8R).
2. `easy-3d-oem-detail.jpg` – **50 × 50 px** (skrajnie mała miniatura geometrii Easy 3D OEM).
3. `vas-6767-detail.jpg` – **369 × 600 px** (wąski kadr urządzenia OEM).
4. `bd-620-pc-detail.jpg` – **369 × 600 px** (wyważarka BD 620 PC).
5. `mt-868adt2013-06-24-13-41-37_-detail.jpg` – **376 × 513 px** (wyważarka MT 868ADT).
6. `geometria-beissbarth-microline-4000-windows-detail.jpg` – **395 × 600 px** (geometria Microline 4000).

*Zalecenie dla klienta:* Prosimy o dostarczenie zdjęć powyższych maszyn w rozdzielczości min. 800 × 800 px na neutralnym lub białym tle.

---

## 9. Rozdzielczość zdjęć realizacji (KROK 3: Realizacje)

Wszystkie oryginalne zdjęcia z działu `/realizacje` posiadają szerokość **600 px**, czyli poniżej standardu editorial ($\ge 800\text{ px}$):
1. `bmw-sikora.jpg` – **600 × 475 px** (obiekt BMW Sikora)
2. `vw-watarski.jpg` – **600 × 450 px** (hala serwisowa VW Wątarski)
3. `cum-szymacha.jpg` – **600 × 450 px** (centrum motoryzacyjne CUM Szymacha)
4. `bmw-dynamic-torun.jpg` – **600 × 247 px** (salon i serwis BMW Dynamic Toruń)
5. `bmw-dobrzanscy-krakow.jpg` – **600 × 364 px** (salon i serwis BMW Dobrzańscy Kraków)

*Zalecenie dla klienta:* W celu osiągnięcia pełnej ostrości w układzie editorial 3:2, prosimy o dostarczenie aktualnych fotografii obiektów i zainstalowanych maszyn w rozdzielczości min. 1600 × 1067 px (proporcja 3:2).




---

## 10. Audyt parsowania wariantów, opcji i cen (KROK 4: Karta Produktu)

Wdrożono silnik parsowania i normalizacji danych `/src/data/parse-rules.ts`, który rozdziela model danych na 3 pojęcia: `variants[]` (wzajemnie wykluczające się wersje bazowe), `options[]` (wyposażenie dodatkowe i opcje dokładane) oraz `specs[]` (parametry techniczne).

### A. Statystyki parsowania katalogu:
1. **Warianty bazowe (`variants[]`): 35 wariantów**
   - Urządzenia wielowariantowe:
     - `Linia diagnostyczna Beissbarth QB 4`: 2 wersje (2200 mm 3,7 kW @ 49 600 zł netto, 2800 mm 5,0 kW @ 59 700 zł netto)
     - `Wyważarka Beissbarth G.30`: 2 wersje (mocowanie mechaniczne @ 24 100 zł netto, uchwyt pneumatyczny P @ 27 000 zł netto)
     - `Wyważarka Beissbarth G.50`: 2 wersje (mocowanie mechaniczne @ 33 700 zł netto, uchwyt pneumatyczny P @ 38 900 zł netto)
   - Pozostałe 29 produktów: 1 wersja bazowa (z ceną katalogową lub "Cena na zapytanie").

2. **Opcje i wyposażenie dodatkowe (`options[]`): 101 pozycji**
   - **23 pozycje ze zweryfikowaną ceną katalogową netto** (m.in. akcesoria QB 4, MLD 9000, Q.Lign, G.60 P PRO).
   - **78 pozycji bez oficjalnej ceny katalogowej w bazie (`price: null`)** – traktowane w UI jako "Wycena na zapytanie / opcje wg wyceny". Nie zgadujemy liczb; pozycje te wymagają wyceny inżynierskiej przy składaniu oferty.

3. **Dane techniczne (`specs[]`): 252 znormalizowane wiersze**
   - Normalizacja typograficzna: twarda spacja przed jednostkami (`km/h`, `t`, `kW`, `mm`, `kg`, `V`), półpauza w zakresach (`800–2200 mm`), spójne separatory ` · ` zamiast pionowych kresek `|`.
   - Scalenie wariantów: wiersze typu `Rozstaw kół (wariant 2200mm)` i `Rozstaw kół (wariant 2800mm)` zostały zintegrowane w jeden logiczny wiersz przełączany identyfikatorem `variantId`.

4. **Flaga globalna cen:**
   - W pliku `src/data/company.ts` wdrożono flagę `showPrices: true`.
   - W przypadku podjęcia decyzji przez klienta o ukryciu wszystkich cen katalogowych, zmiana flagi na `false` natychmiastowo przełącza wszystkie karty w tryb "Cena na zapytanie".
