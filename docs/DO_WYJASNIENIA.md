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
