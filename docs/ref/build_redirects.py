import json
import re

with open('d:/home/strony/diagnostyka-systems/src/data/products.ts', 'r', encoding='utf-8') as f:
    p_content = f.read()

start = p_content.find('export const PRODUCTS_DATA: ProductItem[] = ') + len('export const PRODUCTS_DATA: ProductItem[] = ')
end = p_content.rfind(';')
products = json.loads(p_content[start:end].strip())

# Build mapping of originalUrl -> new path
orig_to_new = {}
for p in products:
    orig_to_new[p['originalUrl']] = f"/produkty/{p['categorySlug']}/{p['slug']}"

# Now read all URLs from baza_wiedzy.md
with open('d:/home/strony/diagnostyka-systems/docs/baza_wiedzy.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

old_urls = []
for line in lines:
    if line.startswith('# URL: '):
        old_urls.append(line.replace('# URL: ', '').strip())

mapping = {}

static_map = {
    'https://www.beissbarth-service.pl/': '/',
    'https://www.beissbarth-service.pl/index.php': '/',
    'https://www.beissbarth-service.pl/o-nas.html': '/o-nas',
    'https://www.beissbarth-service.pl/o-nas/o-firmie.html': '/o-nas',
    'https://www.beissbarth-service.pl/o-nas/certyfikaty.html': '/o-nas',
    'https://www.beissbarth-service.pl/o-nas/partnerzy.html': '/o-nas',
    'https://www.beissbarth-service.pl/oferta.html': '/oferta',
    'https://www.beissbarth-service.pl/produkty.html': '/produkty',
    'https://www.beissbarth-service.pl/produkty/nowosci.html': '/produkty/nowosci',
    'https://www.beissbarth-service.pl/produkty/wywazarki-do-kol.html': '/produkty/wywazarki-do-kol',
    'https://www.beissbarth-service.pl/produkty/demontazownice.html': '/produkty/demontazownice',
    'https://www.beissbarth-service.pl/produkty/geometria.html': '/produkty/geometria',
    'https://www.beissbarth-service.pl/produkty/serwis-klimatyzacji.html': '/serwis',
    'https://www.beissbarth-service.pl/produkty/linie-diagnostyczne.html': '/produkty/linie-diagnostyczne',
    'https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki.html': '/urzadzenia-oem',
    'https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe.html': '/produkty/pojazdy-ciezarowe',
    'https://www.beissbarth-service.pl/produkty/produkty-uzywane.html': '/produkty-uzywane',
    'https://www.beissbarth-service.pl/serwis.html': '/serwis',
    'https://www.beissbarth-service.pl/serwis/zgloszenie-serwisowe.html': '/serwis/zgloszenie',
    'https://www.beissbarth-service.pl/realizacje.html': '/realizacje',
    'https://www.beissbarth-service.pl/publikacje.html': '/publikacje',
    'https://www.beissbarth-service.pl/kontakt.html': '/kontakt',
    'https://www.beissbarth-service.pl/realizacje/16-cum-szymacha.html': '/realizacje',
    'https://www.beissbarth-service.pl/realizacje/15-vw-watarski.html': '/realizacje',
    'https://www.beissbarth-service.pl/realizacje/12-bmw-sikora.html': '/realizacje',
    'https://www.beissbarth-service.pl/realizacje/11-bmw-dynamic-torun.html': '/realizacje',
    'https://www.beissbarth-service.pl/realizacje/10-bmw-dobrzanscy-krakow.html': '/realizacje',
    'https://www.beissbarth-service.pl/publikacje/18-rentownosc-ogumienia.html': '/publikacje/rentownosc-ogumienia',
    'https://www.beissbarth-service.pl/publikacje/17-wademecum-warsztatu-samochodowego.html': '/publikacje/vademecum-warsztatu-samochodowego',
    'https://www.beissbarth-service.pl/cookies.html': '/polityka-prywatnosci',
    'https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/vag.html': '/urzadzenia-oem',
    'https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/mercedes.html': '/urzadzenia-oem',
    'https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/bmw.html': '/urzadzenia-oem',
    'https://www.beissbarth-service.pl/produkty/urzadzenia-dla-marki/toyota.html': '/urzadzenia-oem',
    'https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/wywazarki-do-kol-ciezarowe.html': '/produkty/pojazdy-ciezarowe',
    'https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/demontazownice-ciezarowe.html': '/produkty/pojazdy-ciezarowe',
    'https://www.beissbarth-service.pl/produkty/pojazdy-ciezarowe/geometria-ciezarowe.html': '/produkty/pojazdy-ciezarowe',
}

for u in old_urls:
    if u in static_map:
        mapping[u] = static_map[u]
    elif u in orig_to_new:
        mapping[u] = orig_to_new[u]
    else:
        print(f"UNMAPPED: {u}")

print(f"Total mapped: {len(mapping)} / {len(old_urls)}")

# Write server/redirects.json
redirects_data = []
for old_u, new_u in mapping.items():
    # extract path
    old_path = old_u.replace('https://www.beissbarth-service.pl', '')
    if not old_path:
        old_path = '/'
    redirects_data.append({
        'fromUrl': old_u,
        'fromPath': old_path,
        'toPath': new_u,
        'statusCode': 301
    })

with open('d:/home/strony/diagnostyka-systems/server/redirects.json', 'w', encoding='utf-8') as f:
    json.dump(redirects_data, f, indent=2, ensure_ascii=False)

# Write public/_redirects (for Netlify, Vercel, Cloudflare)
with open('d:/home/strony/diagnostyka-systems/public/_redirects', 'w', encoding='utf-8') as f:
    f.write("# 301 Redirects from old www.beissbarth-service.pl URLs to new React routes\n")
    for r in redirects_data:
        if r['fromPath'] != r['toPath'] and r['fromPath'] != '/':
            f.write(f"{r['fromPath']}  {r['toPath']}  301\n")
    # SPA fallback for everything else
    f.write("\n# SPA client-side routing fallback\n/*  /index.html  200\n")

# Write public/.htaccess (for Apache / cPanel / Shared hosting)
with open('d:/home/strony/diagnostyka-systems/public/.htaccess', 'w', encoding='utf-8') as f:
    f.write("<IfModule mod_rewrite.c>\n")
    f.write("RewriteEngine On\n")
    f.write("RewriteBase /\n\n")
    f.write("# 301 Permanent Redirects from old CMS URLs\n")
    for r in redirects_data:
        if r['fromPath'] != r['toPath'] and r['fromPath'] != '/':
            # strip leading slash for RewriteRule pattern
            pat = r['fromPath'].lstrip('/')
            # escape dots
            pat_escaped = pat.replace('.', r'\.')
            f.write(f"RewriteRule ^{pat_escaped}$ {r['toPath']} [R=301,L]\n")
    f.write("\n# SPA HTML5 History Mode routing fallback\n")
    f.write("RewriteCond %{REQUEST_FILENAME} !-f\n")
    f.write("RewriteCond %{REQUEST_FILENAME} !-d\n")
    f.write("RewriteRule . /index.html [L]\n")
    f.write("</IfModule>\n")

# Write docs/MAPA_PRZEKIEROWAN_301.md
with open('d:/home/strony/diagnostyka-systems/docs/MAPA_PRZEKIEROWAN_301.md', 'w', encoding='utf-8') as f:
    f.write("# Mapa Przekierowań 301 (Stary CMS -> Nowa Strona)\n\n")
    f.write("Poniższa tabela przedstawia kompletne odwzorowanie 1:1 wszystkich 86 zaindeksowanych podstron starej witryny `www.beissbarth-service.pl` na nowe ścieżki w architekturze React + Vite.\n\n")
    f.write("Wygenerowane pliki wdrożeniowe:\n")
    f.write("- `/public/_redirects` (Netlify, Vercel, Cloudflare Pages)\n")
    f.write("- `/public/.htaccess` (Serwery Apache, hosting cPanel, cyberfolks, lh.pl itp.)\n")
    f.write("- `/server/redirects.json` (Dla serwera Node.js / Express proxy)\n\n")
    f.write("| # | Stary adres URL | Nowy adres URL (Docelowy) | Kod HTTP |\n")
    f.write("| :-: | :--- | :--- | :-: |\n")
    for idx, r in enumerate(redirects_data, 1):
        f.write(f"| {idx} | `{r['fromPath']}` | `https://www.beissbarth-service.pl{r['toPath']}` | **301 Moved Permanently** |\n")

print("Generated _redirects, .htaccess, redirects.json, and MAPA_PRZEKIEROWAN_301.md successfully!")
