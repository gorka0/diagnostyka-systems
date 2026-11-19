import os
import re
import sys
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
try:
    from playwright.sync_api import sync_playwright
    HAS_PLAYWRIGHT = True
except ImportError:
    HAS_PLAYWRIGHT = False
    sync_playwright = None

DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'data'))

# SPA Fallback Handler
class SpaHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        # If path has an extension, let default handler serve it
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            # Check if index.html exists in that directory
            index_path = os.path.join(path, 'index.html') if os.path.isdir(path) else None
            if not index_path or not os.path.exists(index_path):
                # Fallback to root index.html
                self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        pass # Quiet server

def get_all_routes():
    routes = [
        '/',
        '/o-nas',
        '/oferta',
        '/produkty',
        '/urzadzenia-oem',
        '/produkty-uzywane',
        '/serwis',
        '/realizacje',
        '/publikacje',
        '/kontakt',
        '/polityka-prywatnosci',
        '/polityka-cookies',
        '/404',
    ]

    # Categories
    categories = [
        'wywazarki-do-kol',
        'demontazownice',
        'geometria',
        'linie-diagnostyczne',
        'urzadzenia-oem',
        'serwis-klimatyzacji',
        'pojazdy-ciezarowe',
        'produkty-uzywane',
        'nowosci',
    ]
    for c in categories:
        routes.append(f'/produkty/{c}')

    # Publications
    routes.append('/publikacje/rentownosc-ogumienia')
    routes.append('/publikacje/vademecum-warsztatu-samochodowego')

    # Products from products.ts
    products_file = os.path.join(DATA_DIR, 'products.ts')
    if os.path.exists(products_file):
        with open(products_file, 'r', encoding='utf-8') as f:
            content = f.read()
        matches = re.findall(r'"slug":\s*"([^"]+)",\s*"categorySlug":\s*"([^"]+)"', content)
        for slug, cat in matches:
            routes.append(f'/produkty/{cat}/{slug}')

    return sorted(list(set(routes)))

def generate_redirects_and_sitemap(routes):
    # Generowanie statycznych przekierowań 301/meta dla starych adresów CMS /realizacje/*.html
    legacy_redirects = {
        '10-bmw-dobrzanscy-krakow.html': 'bmw-dobrzanscy-krakow',
        '11-bmw-dynamic-torun.html': 'bmw-dynamic-torun',
        '12-bmw-sikora.html': 'bmw-sikora',
        '15-vw-watarski.html': 'vw-watarski',
        '16-cum-szymacha.html': 'cum-szymacha',
    }
    realizacje_dist = os.path.join(DIST_DIR, 'realizacje')
    os.makedirs(realizacje_dist, exist_ok=True)
    for old_file, target_slug in legacy_redirects.items():
        redirect_path = os.path.join(realizacje_dist, old_file)
        redirect_html = f'''<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Przekierowanie | Diagnostyka-Systems</title>
  <link rel="canonical" href="https://www.beissbarth-service.pl/realizacje">
  <meta http-equiv="refresh" content="0; url=/realizacje#{target_slug}">
  <script>location.replace('/realizacje#' + '{target_slug}');</script>
</head>
<body>
  <p>Przekierowanie do realizacji: <a href="/realizacje#{target_slug}">/realizacje#{target_slug}</a></p>
</body>
</html>'''
        with open(redirect_path, 'w', encoding='utf-8') as rf:
            rf.write(redirect_html)
        print(f"✓ [Redirect] /realizacje/{old_file} -> /realizacje#{target_slug}")

    # Redirects dla zgłoszeń serwisowych -> /kontakt?typ=serwis
    service_redirects = [
        ('serwis/zgloszenie', os.path.join(DIST_DIR, 'serwis', 'zgloszenie')),
        ('zgloszenie-serwisowe', os.path.join(DIST_DIR, 'zgloszenie-serwisowe'))
    ]
    for s_name, s_dir in service_redirects:
        os.makedirs(s_dir, exist_ok=True)
        s_html = '''<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Zgłoszenie serwisowe | Diagnostyka-Systems</title>
  <link rel="canonical" href="https://www.beissbarth-service.pl/kontakt?typ=serwis">
  <meta http-equiv="refresh" content="0; url=/kontakt?typ=serwis">
  <script>location.replace('/kontakt?typ=serwis');</script>
</head>
<body>
  <p>Przekierowanie do formularza zgłoszenia serwisowego: <a href="/kontakt?typ=serwis">/kontakt?typ=serwis</a></p>
</body>
</html>'''
        with open(os.path.join(s_dir, 'index.html'), 'w', encoding='utf-8') as sf:
            sf.write(s_html)
        print(f"✓ [Redirect] /{s_name} -> /kontakt?typ=serwis")

    # Generowanie kompletnego sitemap.xml
    today = time.strftime('%Y-%m-%d')
    sitemap_entries = []
    for r in routes:
        if r in ['/404']:
            continue
        if r == '/':
            priority = '1.0'
            freq = 'weekly'
        elif r in ['/oferta', '/produkty', '/serwis', '/kontakt']:
            priority = '0.9'
            freq = 'weekly'
        elif r.startswith('/produkty/') and r.count('/') == 2:
            priority = '0.85'
            freq = 'weekly'
        elif r.startswith('/produkty/'):
            priority = '0.8'
            freq = 'monthly'
        elif r in ['/urzadzenia-oem', '/produkty-uzywane']:
            priority = '0.85'
            freq = 'monthly'
        elif r in ['/o-nas', '/realizacje', '/publikacje']:
            priority = '0.8'
            freq = 'monthly'
        elif r.startswith('/publikacje/'):
            priority = '0.75'
            freq = 'monthly'
        else:
            priority = '0.5'
            freq = 'monthly'

        loc = f"https://www.beissbarth-service.pl{r if r != '/' else '/'}"
        sitemap_entries.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"".join(sitemap_entries)}
</urlset>
"""
    with open(os.path.join(DIST_DIR, 'sitemap.xml'), 'w', encoding='utf-8') as sf:
        sf.write(sitemap_xml)
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
    with open(os.path.join(public_dir, 'sitemap.xml'), 'w', encoding='utf-8') as sf:
        sf.write(sitemap_xml)
    print(f"✓ Generated sitemap.xml with {len(sitemap_entries)} URLs!")

def run_prerender():
    routes = get_all_routes()
    print(f"Total routes to prerender: {len(routes)}")

    # Start local server on an auto-assigned free port to avoid conflicts
    httpd = HTTPServer(('127.0.0.1', 0), SpaHandler)
    port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local SPA server running on http://127.0.0.1:{port}")

    if not HAS_PLAYWRIGHT:
        print("Notice: Playwright not installed in this environment (e.g. CI/Vercel). Generating sitemap and redirects directly.")
        httpd.shutdown()
        generate_redirects_and_sitemap(routes)
        return

    browser = None
    try:
        p = sync_playwright().start()
        for candidate in [
            {'channel': 'chrome'},
            {'channel': 'msedge'},
            {'executable_path': r'C:\Program Files\Google\Chrome\Application\chrome.exe'},
            {}
        ]:
            try:
                browser = p.chromium.launch(headless=True, **candidate)
                break
            except Exception:
                continue
    except Exception as e:
        print(f"Playwright initialization notice: {e}")

    if not browser:
        print("Notice: No desktop Chromium found in this environment. Skipping headless prerender and generating sitemap/redirects directly.")
        httpd.shutdown()
        generate_redirects_and_sitemap(routes)
        return

    page = browser.new_page()
    page.set_viewport_size({"width": 1440, "height": 900})

    success_count = 0
    for route in routes:
        url = f"http://127.0.0.1:{port}{route}"
        try:
            page.goto(url, wait_until='networkidle', timeout=15000)
            page.wait_for_selector('body h1, body h2, body [data-seo="ready"]', timeout=5000)
            page.wait_for_timeout(100)

            html = page.content()
            title = page.title()

            if route == '/':
                target_file = os.path.join(DIST_DIR, 'index.html')
            else:
                clean_route = route.strip('/')
                target_dir = os.path.join(DIST_DIR, clean_route)
                os.makedirs(target_dir, exist_ok=True)
                target_file = os.path.join(target_dir, 'index.html')

            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(html)

            size_kb = len(html.encode('utf-8')) / 1024
            print(f"✓ [{success_count+1}/{len(routes)}] {route} -> {os.path.relpath(target_file, DIST_DIR)} ({size_kb:.1f} KB) | Title: {title[:40]}...")
            success_count += 1
        except Exception as ex:
            print(f"✗ Failed {route}: {ex}")

    browser.close()
    p.stop()
    httpd.shutdown()

    generate_redirects_and_sitemap(routes)
    print(f"\nPrerender complete! {success_count}/{len(routes)} pages successfully rendered to static HTML in dist/.")

if __name__ == '__main__':
    run_prerender()
