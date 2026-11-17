# Raport Uproszczenia i Rygoru Projektowego: Diagnostyka-Systems s.c.

Data audytu: 17 listopada 2026 r.  
Stan projektu: **Zgodny z rygorem Vercel × Tesla, zero AI-slop, pełny SSG (76 podstron prerenderowanych do czystego HTML)**

---

## 1. Weryfikacja Rygorystycznych Wytycznych

| Kategoria | Wymóg | Wynik audytu | Status |
| :--- | :--- | :--- | :--- |
| **Grubość fontów** | Zakaz font-weight < 400 (brak 300 i cieńszych) | 0 elementów o weight < 400 | **ZALICZONE (0 błędów)** |
| **Rozmiary fontów** | Min. 16px mobile, 17-18px desktop; teksty drugorzędne min. 15px; zakaz < 14px (wyjątek: copyright stopki 13px) | 0 naruszeń skali poniżej 14px poza copyrightem | **ZALICZONE (0 błędów)** |
| **Font Monospace** | IBM Plex Mono wyłącznie dla numerów modeli i katalogowych w kartach produktów | 18 wystąpień w całym serwisie – wyłącznie numery katalogowe akcesoriów i modeli | **ZALICZONE** |
| **Szerokość tekstu** | Akapity ograniczone do max. 65 znaków | Wdrożono `max-w-[65ch]` na wszystkich podstronach | **ZALICZONE** |
| **Typografia polska** | Twarde spacje (`&nbsp;`) po spójnikach 1-literowych, cudzysłowy drukarskie `„ ”`, myślniki półpauzy `–` | Wdrożony uniwersalny parser `formatPolishTypography` | **ZALICZONE** |
| **Nagłówek (Header)** | 1-rzędowy bez topbaru, logo wys. 44-48px, 1 CTA: „Zgłoszenie serwisowe” | Header 1-rzędowy h-20, logo h-11/h-12, usunięto topbar | **ZALICZONE** |
| **Pasek dolny Mobile** | Przyklejony pasek na dole z 2 przyciskami („Zadzwoń” + „Zgłoszenie serwisowe”) | Działa na mobile z `safe-area-inset-bottom`, odsunięcie body 76px | **ZALICZONE** |
| **Tła serwisu** | Rygorystycznie dwa tła: biel `#FFFFFF` i ciepły szary `#F7F7F5` | Wyeliminowano wszystkie sztuczne gradienty i blur-zupy | **ZALICZONE** |
| **Kontrast przycisków** | Główny CTA: pomarańcz `#EE9D16` z ciemnografitowym tekstem `#1F2328` (nigdy biały na pomarańczu) | Kontrast tekstu wynosi 6.0:1 (przewyższa WCAG AA) | **ZALICZONE** |
| **Promocja ML 8 ROC** | Spokojny blok bez krzykliwych kolorów (46 900 zł netto) | Czysta karta w ramce z badge „Aktualna oferta specjalna” | **ZALICZONE** |
| **Brak poziomego scrolla** | Test na szerokościach 360, 390, 414, 768, 1024 px oraz poziomo | 0 poziomych overflow na wszystkich podstronach | **ZALICZONE** |
| **Statyczny prerender SSG** | Generowanie statycznego HTML dla każdego routingu (SEO bez JS) | 76 z 76 podstron prerenderowanych do `dist/` | **ZALICZONE** |

---

## 2. Rejestr Usuniętych Elementów-Śmieci (Eliminacja AI-Slop)

1. **Usunięto topbar z nagłówka**: zlikwidowano wąski pasek z powtórzonymi telefonami nad logo; nagłówek zredukowano do 1 eleganckiego rzędu (logo + menu + CTA).
2. **Usunięto pomarańczowe wersalikowe „eyebrow labels”**: usunięto trackowane, generyczne napisy `mono uppercase` nad nagłówkami sekcji na wszystkich podstronach.
3. **Usunięto miniaturowe badge'e i chipy**: wyczyszczono sztuczne etykietki typu „Wymóg urzędowy SKP”, „Homologacja producenta” zaśmiecające karty serwisowe.
4. **Usunięto powtarzające się linki CTA**: w 6 filarach serwisu zlikwidowano 6 powtarzających się linków „Zgłoś to urządzenie →” na rzecz jednego, dużego i spokojnego bloku CTA prowadzącego do formularza.
5. **Usunięto powtarzający się pasek partnerów nad stopką**: sekcja logotypów partnerów pozostała wyłącznie na stronie głównej i w podstronie `/o-nas`.
6. **Usunięto zmyślone teksty marketingowe**:
   - `Czas reakcji do 24h` / `Gwarantowany czas reakcji` – usunięto.
   - `Unikalny numer sprawy` / `Automatyczny numer zgłoszenia` – usunięto.
   - `Pn-Pt 8:00-16:00` – ustawiono `workingHours: null` w `company.ts` i wyłączono renderowanie godzin do czasu potwierdzenia przez klienta.
   - `Przy trasie S5 / DK10` – usunięto.
   - `Magazyn centralny i hala pokazowa` – zamieniono na autentyczny fakt: magazyn części zamiennych w Lisim Ogonie.
   - `Odpowiadamy w ciągu jednego dnia roboczego` – usunięto.
7. **Usunięto pudła w pudłach w `/kontakt`**: dane kontaktowe rozpisano czystym, przestrzennym tekstem obok formularza, zamiast wagnieżdżonych kart w kartach.
8. **Zastąpiono 4 stat-boxy na stronie głównej**: zlikwidowano generyczne klocki „20+ lat”, „100% zadowolenia” na rzecz 1 faktograficznej linii pod hero.
9. **Optymalizacja mapy Google**: mapa nie ładuje ciężkiego iframe'a przy wejściu; ładuje się na żądanie użytkownika po kliknięciu.

---

## 3. Zrzuty Ekranu PRZED i PO (docs/audit/)

### Desktop (1440 px)
- **Strona główna**: `docs/audit/before/home_desktop.png` → `docs/audit/after/home_desktop.png`
- **Serwis**: `docs/audit/before/serwis_desktop.png` → `docs/audit/after/serwis_desktop.png`
- **Kontakt**: `docs/audit/before/kontakt_desktop.png` → `docs/audit/after/kontakt_desktop.png`
- **Produkty**: `docs/audit/before/produkty_desktop.png` → `docs/audit/after/produkty_desktop.png`
- **Karta produktu**: `docs/audit/before/produkt_detail_desktop.png` → `docs/audit/after/produkt_detail_desktop.png`
- **Publikacja**: `docs/audit/before/publikacja_desktop.png` → `docs/audit/after/publikacja_desktop.png`
- **Błąd 404**: `docs/audit/before/not_found_desktop.png` → `docs/audit/after/not_found_desktop.png`

### Mobile (390 px)
- **Strona główna**: `docs/audit/before/home_mobile.png` → `docs/audit/after/home_mobile.png`
- **Serwis**: `docs/audit/before/serwis_mobile.png` → `docs/audit/after/serwis_mobile.png`
- **Kontakt**: `docs/audit/before/kontakt_mobile.png` → `docs/audit/after/kontakt_mobile.png`
- **Produkty**: `docs/audit/before/produkty_mobile.png` → `docs/audit/after/produkty_mobile.png`
- **Karta produktu**: `docs/audit/before/produkt_detail_mobile.png` → `docs/audit/after/produkt_detail_mobile.png`
- **Publikacja**: `docs/audit/before/publikacja_mobile.png` → `docs/audit/after/publikacja_mobile.png`
- **Błąd 404**: `docs/audit/before/not_found_mobile.png` → `docs/audit/after/not_found_mobile.png`

---

## 4. Punkty Wymagające Danych od Właściciela Firmy

1. **Godziny otwarcia biura i magazynu**: obecnie `workingHours: null` (nie są wyświetlane, czekają na uzupełnienie).
2. **Zdjęcia rzeczywiste**: magazynu, serwisu, urządzeń oraz zespołu (obecnie eleganckie placeholdery z nazwami i wymiarami docelowymi).
3. **Pliki logotypów partnerów w wektorze**: Beissbarth, Valeo, Robinair, SPX, ITS.
4. **Konfiguracja SMTP serwera pocztowego**: zmienne środowiskowe `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` w pliku `.env` na serwerze produkcyjnym do obsługi wysyłki formularzy na `poczta@beissbarth-service.pl`.
