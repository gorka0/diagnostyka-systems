import os
import re
import sys
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

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
        '/serwis/zgloszenie',
        '/zgloszenie-serwisowe',
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

def run_prerender():
    routes = get_all_routes()
    print(f"Total routes to prerender: {len(routes)}")

    # Start local server on an auto-assigned free port to avoid conflicts
    httpd = HTTPServer(('127.0.0.1', 0), SpaHandler)
    port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local SPA server running on http://127.0.0.1:{port}")

    with sync_playwright() as p:
        browser = None
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

        if not browser:
            print("Failed to launch browser for prerender!")
            httpd.shutdown()
            sys.exit(1)

        page = browser.new_page()
        page.set_viewport_size({"width": 1440, "height": 900})

        success_count = 0
        for route in routes:
            url = f"http://127.0.0.1:{port}{route}"
            try:
                page.goto(url, wait_until='networkidle', timeout=15000)
                # Wait for react render
                page.wait_for_selector('body h1, body h2, body [data-seo="ready"]', timeout=5000)
                # Give react-helmet/seo a microsecond to set title
                page.wait_for_timeout(100)

                html = page.content()
                title = page.title()

                # Determine target file
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
        httpd.shutdown()
        print(f"\nPrerender complete! {success_count}/{len(routes)} pages successfully rendered to static HTML in dist/.")

if __name__ == '__main__':
    run_prerender()
