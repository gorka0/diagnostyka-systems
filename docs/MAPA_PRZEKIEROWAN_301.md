# Mapa Przekierowań 301 (Stary CMS -> Nowa Strona)

Poniższa tabela przedstawia kompletne odwzorowanie 1:1 wszystkich 86 zaindeksowanych podstron starej witryny `www.beissbarth-service.pl` na nowe ścieżki w architekturze React + Vite.

Wygenerowane pliki wdrożeniowe:
- `/public/_redirects` (Netlify, Vercel, Cloudflare Pages)
- `/public/.htaccess` (Serwery Apache, hosting cPanel, cyberfolks, lh.pl itp.)
- `/server/redirects.json` (Dla serwera Node.js / Express proxy)

| # | Stary adres URL | Nowy adres URL (Docelowy) | Kod HTTP |
| :-: | :--- | :--- | :-: |
| 1 | `/` | `https://www.beissbarth-service.pl/` | **301 Moved Permanently** |
| 2 | `/o-nas.html` | `https://www.beissbarth-service.pl/o-nas` | **301 Moved Permanently** |
| 3 | `/o-nas/o-firmie.html` | `https://www.beissbarth-service.pl/o-nas` | **301 Moved Permanently** |
| 4 | `/o-nas/certyfikaty.html` | `https://www.beissbarth-service.pl/o-nas` | **301 Moved Permanently** |
| 5 | `/o-nas/partnerzy.html` | `https://www.beissbarth-service.pl/o-nas` | **301 Moved Permanently** |
| 6 | `/oferta.html` | `https://www.beissbarth-service.pl/oferta` | **301 Moved Permanently** |
| 7 | `/produkty.html` | `https://www.beissbarth-service.pl/produkty` | **301 Moved Permanently** |
| 8 | `/produkty/nowosci.html` | `https://www.beissbarth-service.pl/produkty/nowosci` | **301 Moved Permanently** |
| 9 | `/produkty/wywazarki-do-kol.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol` | **301 Moved Permanently** |
| 10 | `/produkty/demontazownice.html` | `https://www.beissbarth-service.pl/produkty/demontazownice` | **301 Moved Permanently** |
| 11 | `/produkty/geometria.html` | `https://www.beissbarth-service.pl/produkty/geometria` | **301 Moved Permanently** |
| 12 | `/produkty/serwis-klimatyzacji.html` | `https://www.beissbarth-service.pl/serwis` | **301 Moved Permanently** |
| 13 | `/produkty/linie-diagnostyczne.html` | `https://www.beissbarth-service.pl/produkty/linie-diagnostyczne` | **301 Moved Permanently** |
| 14 | `/produkty/urzadzenia-dla-marki.html` | `https://www.beissbarth-service.pl/urzadzenia-oem` | **301 Moved Permanently** |
| 15 | `/produkty/pojazdy-ciezarowe.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe` | **301 Moved Permanently** |
| 16 | `/produkty/produkty-uzywane.html` | `https://www.beissbarth-service.pl/produkty-uzywane` | **301 Moved Permanently** |
| 17 | `/serwis.html` | `https://www.beissbarth-service.pl/serwis` | **301 Moved Permanently** |
| 18 | `/serwis/zgloszenie-serwisowe.html` | `https://www.beissbarth-service.pl/serwis/zgloszenie` | **301 Moved Permanently** |
| 19 | `/realizacje.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 20 | `/publikacje.html` | `https://www.beissbarth-service.pl/publikacje` | **301 Moved Permanently** |
| 21 | `/kontakt.html` | `https://www.beissbarth-service.pl/kontakt` | **301 Moved Permanently** |
| 22 | `/realizacje/16-cum-szymacha.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 23 | `/realizacje/15-vw-watarski.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 24 | `/realizacje/12-bmw-sikora.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 25 | `/publikacje/18-rentownosc-ogumienia.html` | `https://www.beissbarth-service.pl/publikacje/rentownosc-ogumienia` | **301 Moved Permanently** |
| 26 | `/publikacje/17-wademecum-warsztatu-samochodowego.html` | `https://www.beissbarth-service.pl/publikacje/vademecum-warsztatu-samochodowego` | **301 Moved Permanently** |
| 27 | `/cookies.html` | `https://www.beissbarth-service.pl/polityka-prywatnosci` | **301 Moved Permanently** |
| 28 | `/ml-1800-8r.html` | `https://www.beissbarth-service.pl/produkty/geometria/ml-1800-8r` | **301 Moved Permanently** |
| 29 | `/ml-easy-3d.html` | `https://www.beissbarth-service.pl/produkty/geometria/ml-easy-3d` | **301 Moved Permanently** |
| 30 | `/produkty/nowosci/tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail.html` | `https://www.beissbarth-service.pl/produkty/nowosci/tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail` | **301 Moved Permanently** |
| 31 | `/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-aw-detail.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-aw-detail` | **301 Moved Permanently** |
| 32 | `/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awlp-detail.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awlp-detail` | **301 Moved Permanently** |
| 33 | `/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awl-detail.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awl-detail` | **301 Moved Permanently** |
| 34 | `/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail` | **301 Moved Permanently** |
| 35 | `/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awl-detail.html` | `https://www.beissbarth-service.pl/produkty/wywazarki-do-kol/wywazarka-beissbarth-mt-zero-6-touch-awl-detail` | **301 Moved Permanently** |
| 36 | `/produkty/demontazownice/ms-500-demontazownica-beissbarth-serii-g-frame-detail.html` | `https://www.beissbarth-service.pl/produkty/demontazownice/ms-500-demontazownica-beissbarth-serii-g-frame-detail` | **301 Moved Permanently** |
| 37 | `/produkty/demontazownice/ms-530-demontazownica-beissbarth-serii-g-frame-detail.html` | `https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-demontazownica-beissbarth-serii-g-frame-detail` | **301 Moved Permanently** |
| 38 | `/produkty/demontazownice/ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail.html` | `https://www.beissbarth-service.pl/produkty/demontazownice/ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail` | **301 Moved Permanently** |
| 39 | `/produkty/demontazownice/ms-630-demontazownica-beissbarth-serii-g-frame-detail.html` | `https://www.beissbarth-service.pl/produkty/demontazownice/ms-630-demontazownica-beissbarth-serii-g-frame-detail` | **301 Moved Permanently** |
| 40 | `/produkty/demontazownice/ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail.html` | `https://www.beissbarth-service.pl/produkty/demontazownice/ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail` | **301 Moved Permanently** |
| 41 | `/produkty/geometria/geometria-beissbarth-ml-8-r-tech-awb-detail.html` | `https://www.beissbarth-service.pl/produkty/geometria/geometria-beissbarth-ml-8-r-tech-awb-detail` | **301 Moved Permanently** |
| 42 | `/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-640-detail.html` | `https://www.beissbarth-service.pl/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-640-detail` | **301 Moved Permanently** |
| 43 | `/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-600-detail.html` | `https://www.beissbarth-service.pl/produkty/linie-diagnostyczne/linia-diagnostyczna-beissbarth-sl-600-detail` | **301 Moved Permanently** |
| 44 | `/produkty/urzadzenia-dla-marki/vag.html` | `https://www.beissbarth-service.pl/urzadzenia-oem` | **301 Moved Permanently** |
| 45 | `/produkty/urzadzenia-dla-marki/mercedes.html` | `https://www.beissbarth-service.pl/urzadzenia-oem` | **301 Moved Permanently** |
| 46 | `/produkty/urzadzenia-dla-marki/bmw.html` | `https://www.beissbarth-service.pl/urzadzenia-oem` | **301 Moved Permanently** |
| 47 | `/produkty/urzadzenia-dla-marki/toyota.html` | `https://www.beissbarth-service.pl/urzadzenia-oem` | **301 Moved Permanently** |
| 48 | `/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe` | **301 Moved Permanently** |
| 49 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe` | **301 Moved Permanently** |
| 50 | `/produkty/pojazdy-ciezarowe/geometria-ciezarowe.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe` | **301 Moved Permanently** |
| 51 | `/produkty/produkty-uzywane/geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail.html` | `https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail` | **301 Moved Permanently** |
| 52 | `/produkty/produkty-uzywane/geometria-beissbarth-microline-4000-windows-detail.html` | `https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-microline-4000-windows-detail` | **301 Moved Permanently** |
| 53 | `/produkty/produkty-uzywane/geometria-beissbarth-microline-4600-detail.html` | `https://www.beissbarth-service.pl/produkty/produkty-uzywane/geometria-beissbarth-microline-4600-detail` | **301 Moved Permanently** |
| 54 | `/produkty/produkty-uzywane/linia-diagnostyczna-beissbarth-stl-7000-detail.html` | `https://www.beissbarth-service.pl/produkty/produkty-uzywane/linia-diagnostyczna-beissbarth-stl-7000-detail` | **301 Moved Permanently** |
| 55 | `/realizacje/11-bmw-dynamic-torun.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 56 | `/realizacje/10-bmw-dobrzanscy-krakow.html` | `https://www.beissbarth-service.pl/realizacje` | **301 Moved Permanently** |
| 57 | `/produkty/urzadzenia-dla-marki/vag/vas-6279-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6279-detail` | **301 Moved Permanently** |
| 58 | `/produkty/urzadzenia-dla-marki/vag/vas-6360-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6360-detail` | **301 Moved Permanently** |
| 59 | `/produkty/urzadzenia-dla-marki/vag/vas-6595-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6595-detail` | **301 Moved Permanently** |
| 60 | `/produkty/urzadzenia-dla-marki/vag/vas-6602-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6602-detail` | **301 Moved Permanently** |
| 61 | `/produkty/urzadzenia-dla-marki/vag/vas-6603-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6603-detail` | **301 Moved Permanently** |
| 62 | `/produkty/urzadzenia-dla-marki/vag/vas-6651-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6651-detail` | **301 Moved Permanently** |
| 63 | `/produkty/urzadzenia-dla-marki/vag/vas-6767-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6767-detail` | **301 Moved Permanently** |
| 64 | `/produkty/urzadzenia-dla-marki/vag/vas-6783-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/vas-6783-detail` | **301 Moved Permanently** |
| 65 | `/produkty/urzadzenia-dla-marki/mercedes/ml-81r-tech-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/ml-81r-tech-detail` | **301 Moved Permanently** |
| 66 | `/produkty/urzadzenia-dla-marki/mercedes/ml-81-tech-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/ml-81-tech-detail` | **301 Moved Permanently** |
| 67 | `/produkty/urzadzenia-dla-marki/mercedes/wywaarka-beissbarth-mt-848-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/wywaarka-beissbarth-mt-848-detail` | **301 Moved Permanently** |
| 68 | `/produkty/urzadzenia-dla-marki/mercedes/wywazarka-beissbarth-mt-868adt-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/wywazarka-beissbarth-mt-868adt-detail` | **301 Moved Permanently** |
| 69 | `/produkty/urzadzenia-dla-marki/mercedes/bd-620-pc-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/bd-620-pc-detail` | **301 Moved Permanently** |
| 70 | `/produkty/urzadzenia-dla-marki/bmw/kds-ii-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/kds-ii-detail` | **301 Moved Permanently** |
| 71 | `/produkty/urzadzenia-dla-marki/bmw/geometria-beissbarth-kds-3d-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/geometria-beissbarth-kds-3d-detail` | **301 Moved Permanently** |
| 72 | `/produkty/urzadzenia-dla-marki/bmw/mt-825d-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/mt-825d-detail` | **301 Moved Permanently** |
| 73 | `/produkty/urzadzenia-dla-marki/bmw/mt-825d2013-06-24-13-39-54_-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/mt-825d2013-06-24-13-39-54_-detail` | **301 Moved Permanently** |
| 74 | `/produkty/urzadzenia-dla-marki/bmw/mt-848ad-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/mt-848ad-detail` | **301 Moved Permanently** |
| 75 | `/produkty/urzadzenia-dla-marki/bmw/mt-868adt2013-06-24-13-41-37_-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/mt-868adt2013-06-24-13-41-37_-detail` | **301 Moved Permanently** |
| 76 | `/produkty/urzadzenia-dla-marki/bmw/ms-65-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/ms-65-detail` | **301 Moved Permanently** |
| 77 | `/produkty/urzadzenia-dla-marki/bmw/ms-680-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/ms-680-detail` | **301 Moved Permanently** |
| 78 | `/produkty/urzadzenia-dla-marki/toyota/easy-3d-oem-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/easy-3d-oem-detail` | **301 Moved Permanently** |
| 79 | `/produkty/urzadzenia-dla-marki/toyota/bd-640-toyota-detail.html` | `https://www.beissbarth-service.pl/produkty/urzadzenia-oem/bd-640-toyota-detail` | **301 Moved Permanently** |
| 80 | `/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe/wywazarka-beissbarth-mt-788-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/wywazarka-beissbarth-mt-788-detail` | **301 Moved Permanently** |
| 81 | `/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe/wywazarka-beissbarth-mt-795t-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/wywazarka-beissbarth-mt-795t-detail` | **301 Moved Permanently** |
| 82 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-70-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownica-servomat-ms-70-detail` | **301 Moved Permanently** |
| 83 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-beissbarth-ms-75-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownica-beissbarth-ms-75-detail` | **301 Moved Permanently** |
| 84 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-78-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownica-servomat-ms-78-detail` | **301 Moved Permanently** |
| 85 | `/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe/demontazownica-servomat-ms-80-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownica-servomat-ms-80-detail` | **301 Moved Permanently** |
| 86 | `/produkty/pojazdy-ciezarowe/geometria-ciezarowe/geometria-beissbarth-ml-8-r-tech-awb-detail.html` | `https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/geometria-beissbarth-ml-8-r-tech-awb-detail` | **301 Moved Permanently** |
