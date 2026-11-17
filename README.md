# Diagnostyka-Systems s.c. - Oficjalny Serwis i Dystrybucja Beissbarth

Autoryzowany dystrybutor i serwis urządzeń warsztatowych **Beissbarth GmbH** oraz autoryzowany partner **SPX / Valeo** (Lisi Ogon k. Bydgoszczy).

Stack technologiczny: **React 18 + Vite + TypeScript + Tailwind CSS + React Router v7 + Nodemailer**.

---

## 1. Uruchomienie lokalne (Development)

```bash
cd diagnostyka-systems
npm install
npm run dev
```

Aplikacja uruchamia się pod adresem: `http://localhost:5173/`.

> **Tryb Developerski API:**  
> W trybie `npm run dev` Vite automatycznie obsługuje endpointy `/api/service-ticket` oraz `/api/contact` przez wbudowany middleware dev.  
> Wiadomości nie są wysyłane na prawdziwe skrzynki, lecz bezpiecznie zapisywane do pliku `server/logs/emails.log` oraz wypisywane w konsoli.

Budowanie produkcyjne:
```bash
npm run build
```

---

## 2. Architektura Formularzy i Wysyłki E-mail

Oba formularze (Zgłoszenie serwisowe oraz Formularz kontaktowy) posiadają:
- **Pełną walidację** po stronie klienta oraz serwera (wymagane pola, poprawność adresu e-mail, zgoda RODO).
- **Zabezpieczenie przed botami (Honeypot):** ukryte pole `website` – automatyczne odrzucanie botów spamujących.
- **Rate limiting:** limit zapytań z jednego adresu IP (ochrona przed zalaniem skrzynki).
- **Sanityzację danych:** usuwanie znaczników HTML i ochrona nagłówków przed *header injection*.
- **Adres docelowy firmy:** `poczta@beissbarth-service.pl` (zgodnie z `src/data/company.ts`).
- **Reply-To:** ustawione na e-mail klienta, umożliwiając natychmiastową odpowiedź bezpośrednio z programu pocztowego.
- **Temat wiadomości:**
  - Zgłoszenie serwisowe: `[Zgłoszenie serwisowe] {firma}, {model}`
  - Zapytanie ze strony: `[Zapytanie ze strony] {tematProdukt} - {imieNazwisko}`

---

## 3. Konfiguracja Środowiska (`.env`)

Skopiuj `.env.example` do pliku `.env`:

```bash
cp .env.example .env
```

Zmienne środowiskowe:

| Zmienna | Opis | Wartość domyślna / przykład |
| :--- | :--- | :--- |
| `MAIL_TARGET_ADDRESS` | Adres odbiorcy w firmie | `poczta@beissbarth-service.pl` |
| `DEV_LOG_MAIL` | Tryb dev (zapis do logu zamiast wysyłki) | `true` (w dev) / `false` (w prod) |
| `SMTP_HOST` | Adres serwera SMTP | np. `smtp.twoj-serwer.pl` |
| `SMTP_PORT` | Port serwera SMTP (SSL/TLS) | `465` (lub `587`) |
| `SMTP_SECURE` | Szyfrowanie SSL | `true` |
| `SMTP_USER` | Login do skrzynki SMTP | `poczta@beissbarth-service.pl` |
| `SMTP_PASS` | Hasło do skrzynki SMTP | `twoje-haslo-smtp` |
| `SMTP_FROM` | Nagłówek nadawcy | `"Diagnostyka-Systems" <poczta@beissbarth-service.pl>` |
| `PORT` | Port dla samodzielnego serwera Node | `3001` |

---

## 4. Wdrożenie Produkcyjne (3 Warianty Hostingu)

Hosting nie został jeszcze wybrany przez klienta, dlatego backend został przygotowany w 3 elastycznych wariantach:

### Wariant A: Vercel / Netlify (Serverless)
Serwis posiada gotowe funkcje w katalogu `/api`:
- `/api/service-ticket.js`
- `/api/contact.js`

1. Podepnij repozytorium pod Vercel lub Netlify.
2. W panelu projektu (Settings -> Environment Variables) wprowadź zmienne z tabeli powyżej (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `DEV_LOG_MAIL=false`).
3. Deploy następuje automatycznie.

### Wariant B: Własny VPS / Serwer z Node.js (Docker / PM2)
W katalogu `/server` znajduje się samodzielny, lekki serwer HTTP:
```bash
# Uruchomienie serwera API Node.js
node server/index.js
```
Serwer nasłuchuje na porcie `3001` (lub zmiennej `PORT`) i obsługuje żądania POST z frontendu. Frontend z katalogu `dist/` serwowany jest przez Nginx lub Caddy z rewersem proxy dla `/api/` na `http://127.0.0.1:3001/api/`.

### Wariant C: Zwykły hosting współdzielony (Apache / Nginx + PHP / cPanel)
Dla tradycyjnego hostingu bez Node.js przygotowano skrypt `server/mail.php`:
1. Wrzuć plik `server/mail.php` na serwer FTP.
2. Skrypt automatycznie przyjmuje żądania POST w formacie JSON i wysyła maile przez natywną funkcję `mail()` z wszystkimi zabezpieczeniami i nagłówkami UTF-8 / Reply-To.

---

## 5. Testowanie w Trybie Dev

Aby sprawdzić działanie całego modułu pocztowego bez wysyłania prawdziwych wiadomości, uruchom skrypt testowy:

```bash
node server/test-submit.js
```

Wyniki i treść sformatowanych e-maili zapisywane są w pliku:  
`server/logs/emails.log`.

---

## 6. Struktura Podstron Serwisu

- `/` – Strona główna (10 sekcji: Hero, Aktualna Promocja, Pasek zaufania, Kategorie, Branże, Serwis, Realizacje, Publikacje, Partnerzy, Stopka)
- `/produkty` – Pełny katalog 50 urządzeń z wyszukiwarką live i filtrami kategorii
- `/produkty/:kategoria` – Podstrony poszczególnych kategorii z filtrami podkategorii (ciężarowe, OEM)
- `/produkty/:kategoria/:slug` – Karta katalogowa urządzenia (opis, parametry techniczne klucz/wartość, wyposażenie z numerami katalogowymi monospace, przycisk "Zapytaj o produkt" z prefillem)
- `/urzadzenia-oem` – Dedykowana podstrona 23 urządzeń z homologacjami: Grupa VAG (VAS), BMW (KDS), Mercedes-Benz, Toyota
- `/produkty-uzywane` – Oferta maszyn po remoncie kapitalnym z pisemną gwarancją
- `/oferta` – Kompleksowa oferta handlowo-wdrożeniowa dla SKP, ASO i wulkanizacji
- `/o-nas` – Profil firmy, oś czasu od 2004 r., certyfikaty ITS, partnerzy technologiczni
- `/realizacje` – Udokumentowane wdrożenia w ASO (BMW Sikora, VW Wątarski, BMW Dynamic, BMW Dobrzańscy) i centrach motoryzacyjnych (CUM Szymacha)
- `/publikacje` & `/publikacje/:slug` – Artykuły eksperckie z kwartalnika "Moto części" ("Rentowność ogumienia", "Vademecum warsztatu samochodowego")
- `/serwis` – Opis autoryzowanych usług serwisowych, kalibracji ITS i części
- `/serwis/zgloszenie` (alias `/zgloszenie-serwisowe`) – Interaktywny formularz zgłoszenia serwisowego z numeracją spraw
- `/kontakt` – Dane kontaktowe (rozdzielony Lisi Ogon i Łochowo), wszystkie 4 telefony do specjalistów, interaktywny formularz z prefillem `?produkt=`, mapa Google
- `*` – Spójna strona 404 (NotFoundPage)

---

## 7. Rejestr wymaganych plików graficznych (`/public/images/`)

| Nazwa pliku w `/public/images/` | Wymiary docelowe | Proporcje | Przeznaczenie / Opis |
| :--- | :---: | :---: | :--- |
| `stanowisko-diagnostyczne-hero.jpg` | **1920 × 1080 px** | 16:9 | Główne zdjęcie hero: nowoczesne stanowisko geometrii 3D na SKP |
| `budynek-firmy-lisi-ogon.jpg` | **1600 × 900 px** | 16:9 | Siedziba operacyjna, magazyn i hala pokazowa w Lisim Ogonie |
| `busy-serwisowe-flota.jpg` | **1600 × 900 px** | 16:9 | Wozy serwisowe Diagnostyka-Systems do obsługi SKP i ASO w terenie |
| `beissbarth-qlign-geometria.jpg` | **1200 × 900 px** | 4:3 | Przyrząd do geometrii kół 3D Beissbarth Q.Lign T-Series |
| `beissbarth-mt-zero-wywazarka.jpg` | **1200 × 900 px** | 4:3 | Wyważarka z ekranem dotykowym Beissbarth MT Zero 6 Touch |
| `beissbarth-ms-630-montazownica.jpg` | **1200 × 900 px** | 4:3 | Montażownica opon z ramą G-Frame Beissbarth MS 630 V1 |
| `beissbarth-sl-640-linia.jpg` | **1200 × 900 px** | 4:3 | Zintegrowana linia diagnostyczna SKP Beissbarth SL 640 |
| `stacja-klimatyzacji-valeo-climfill.jpg` | **1200 × 900 px** | 4:3 | Automatyczna stacja klimatyzacji Valeo ClimFill Maxi |
| `realizacja-bmw-sikora.jpg` | **1200 × 800 px** | 3:2 | Referencje: wdrożenie geometrii Beissbarth w ASO BMW Sikora |
| `realizacja-vw-watarski.jpg` | **1200 × 800 px** | 3:2 | Referencje: wyposażenie strefy geometrii w ASO VW Wątarski |
| `certyfikat-autoryzacji-beissbarth.jpg` | **800 × 1130 px** | A4 pion | Oficjalny certyfikat autoryzacji fabrycznej Beissbarth GmbH |
| `certyfikat-its-skp.jpg` | **800 × 1130 px** | A4 pion | Certyfikat zgodności Instytutu Transportu Samochodowego |
| `certyfikat-valeo-klima.jpg` | **800 × 1130 px** | A4 pion | Certyfikat autoryzowanego partnera serwisowego Valeo / SPX |
