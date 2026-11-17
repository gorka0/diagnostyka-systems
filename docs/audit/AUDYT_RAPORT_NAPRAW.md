# Pełny Raport z Bezwzględnego Audytu Serwisu Diagnostyka-Systems s.c.

Data audytu: 17.11.2026
Środowisko: Google Chrome Headless v157 / Playwright / Serwer lokalny Vite + Node.js API

---

## 1. Tabela zidentyfikowanych problemów (Stan Przed Naprawą)

| Priorytet | Gdzie | Co było źle | Przyczyna | Skutek / Status naprawy |
|---|---|---|---|---|
| **Krytyczny** | Strona główna (`/`), sekcja certyfikatów | Poziomy scroll na ekranach mobile (360px: 401px, 390px: 421px, 414px: 437px) | Sztywna siatka `grid-cols-3` i brak zawijania napisów w `SiteImage` | **NAPRAWIONO**: zmiana na `grid-cols-1 sm:grid-cols-3` oraz `truncate` i `min-w-0` w `SiteImage.tsx`. Poziomy scroll wyeliminowany (0 px). |
| **Krytyczny** | 10 podstron serwisu (`/o-nas`, `/oferta`, `/produkty`, `/urzadzenia-oem`, `/produkty-uzywane`, `/serwis`, `/serwis/zgloszenie`, `/realizacje`, `/publikacje`, `/kontakt`) | Brak nagłówka `<h1>` na 10 podstronach (`h1Count = 0`), strony zaczynały się od `<h2>` | `SectionHeading.tsx` miał wpisany na sztywno tag `<h2>` | **NAPRAWIONO**: dodano właściwość `as?: 'h1' \| 'h2' \| 'h3'` do `SectionHeadingProps`. Każda podstrona ma teraz dokładnie jeden semantyczny `<h1>`. |
| **Ważny** | `/kontakt`, `/serwis/zgloszenie`, `/produkty` (szukajka) | Wielkość fontu w polach wejściowych wynosiła `14px` (`text-sm`) | Klasa Tailwind `text-sm` zamiast `text-base sm:text-sm` | **NAPRAWIONO**: na ekranach dotykowych font wynosi teraz `16px`, co blokuje auto-zoom w mobilnym Safari iOS. |
| **Ważny** | Menu hamburgerowe (`Header.tsx`) | Brak blokady scrollowania tła pod otwartym menu (`body_locked: false`), brak zamykania klawiszem Escape | Brak `useEffect` manipulującego `document.body.style.overflow` | **NAPRAWIONO**: dodano blokadę `overflow: hidden`, nasłuchiwanie klawisza `Escape` oraz atrybuty `role="dialog"` i `aria-modal="true"`. |
| **Ważny** | Eyebrows nad nagłówkami w podstronach | Część drobnych etykiet korzystała z koloru `text-accent` (#EE9D16) | Niewystarczający kontrast (~2.2:1) drobnego tekstu na białym tle | **NAPRAWIONO**: przestawiono etykiety na token `text-accent-text` (#8F5300, kontrast > 4.6:1, pełna zgodność z WCAG AA). |
| **Drobny** | `SiteImage.tsx` | Brak `overflow-hidden` i `shrink-0` w `figcaption` | Potencjalne wypychanie kontenera przy długich etykietach | **NAPRAWIONO**: dodano `truncate`, `min-w-0` i `shrink-0`. |

---

## 2. Szczegółowe wyniki weryfikacji w kategoriach A-F

### A. MOBILE (360, 390, 414, 768, 1024 px oraz Landscape 844x390)
- **Poziomy scroll**: 0 px na wszystkich 15 widokach i we wszystkich 6 rozdzielczościach (potwierdzone w `mobile_audit_report_postfix.json`).
- **Tabele danych technicznych**: Zarówno parametry fabryczne, jak i lista wyposażenia w `ProductDetailPage.tsx` posiadają kontener `overflow-x-auto` i przewijają się niezależnie od siatki strony.
- **Pola dotykowe**: Hamburger ma wymiary 44x44 px, linki w menu mobilnym mają wysokość min. 48 px.
- **Formularze**: Pola wejściowe mają min. 16 px na mobile (`text-base sm:text-sm`).
- **Linki tel: i mailto:**: Wszystkie 4 numery telefonów i e-mail posiadają aktywne protokoły `tel:` i `mailto:`.
- **Zablokowanie tła**: Menu hamburgerowe blokuje `document.body.style.overflow = 'hidden'`.

### B. DESKTOP
- Czysta siatka 12-kolumnowa, `max-w-7xl`, spójny rytm marginesów sekcji (`py-12` do `py-20`).
- Wyeliminowano wszystkie przypadkowe style inline i niepotrzebne gradienty.

### C. TREŚĆ, DANE I ADRESY
- **Rozdzielenie adresów**:
  - Adres operacyjny/kontaktowy/magazyn: `ul. Potulicka 38, 86-065 Lisi Ogon k. Bydgoszczy` (wyświetlany w nagłówku, stopce, kontakcie i mapie Google).
  - Dane rejestrowe firmy: `ul. Piaskowa 6, 86-065 Łochowo`, NIP: `554-258-28-40`, REGON: `093186558` (prezentowane w wyodrębnionej sekcji stopki, na stronie O firmie oraz w polityce prywatności).
- **Zgodność z bazą wiedzy**: Dane techniczne, numery katalogowe i historia pochodzą w 100% z materiałów archiwalnych. Brak jakiegokolwiek tekstu typu "lorem ipsum".

### D. FORMULARZE I TESTY POCZTOWE
- **Kontakt i Zgłoszenie awarii**:
  - Walidacja pustych pól: ZALICZONA (blokada HTML5 + serwer 400).
  - Walidacja formatu e-mail: ZALICZONA (blokada błędnych adresów).
  - Honeypot antyspamowy: ZALICZONY (ciche odrzucenie botów wypełniających ukryte pole).
  - Zapis wiadomości testowych: potwierdzony w `server/logs/emails.log`.
  - Adres docelowy: `poczta@beissbarth-service.pl` (zgodnie z `company.ts`).

### E. LOGO SVG VS REFERENCJA
- Zgodność proporcji: 172x60 px, identyczna z plikiem referencyjnym `logo-ref.png`.
- Odwzorowanie barw: `#EE9D16` (pomarańczowo-złoty znak), `#898685` (krzyż pomiarowy), `#3C3735` / `#1F2328` (typografia "diagnostyka systems s.c.").
- Wektor mono (`ds-logo-mono-light.svg`): przetestowany na ciemnym tle `#1F2328`.
- Favicon (`favicon.svg`): czytelny w rozmiarach 64x64, 32x32 i 16x16 px.

### F. WYDAJNOŚĆ I DOSTĘPNOŚĆ
- Wszystkie obrazy w formacie WebP z natywnym `loading="lazy"` i `decoding="async"`.
- 100% obrazów posiada kompletne atrybuty `alt`.
- Nawigacja klawiaturą (Tab/Shift+Tab): widoczny, kontrastowy focus ring (`outline: 2px solid #EE9D16` z 2px offsetem).
- Czas ładowania DOM (DOMContentLoaded): < 150 ms na wszystkich widokach.
