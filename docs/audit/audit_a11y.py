import json
import os
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:5173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

PAGES = [
    ("/", "homepage"),
    ("/o-nas", "about"),
    ("/oferta", "offer"),
    ("/produkty", "products"),
    ("/produkty/geometria", "category_geometria"),
    ("/produkty/geometria/q-lign-compact", "product_qlign"),
    ("/urzadzenia-oem", "oem"),
    ("/produkty-uzywane", "used"),
    ("/serwis", "service"),
    ("/serwis/zgloszenie", "ticket"),
    ("/realizacje", "realizations"),
    ("/publikacje", "publications"),
    ("/kontakt", "contact"),
    ("/polityka-prywatnosci", "privacy")
]

def run_a11y_audit():
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})

        for path, slug in PAGES:
            page.goto(f"{BASE_URL}{path}", wait_until="networkidle")

            # Check headings, images without alt, buttons without aria/text
            page_data = page.evaluate("""() => {
                // 1. Headings check
                const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                    level: h.tagName,
                    text: h.innerText.trim().slice(0, 60)
                }));
                const h1Count = headings.filter(h => h.level === 'H1').length;

                // 2. Images without alt or empty alt
                const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
                    src: img.src.split('/').pop(),
                    hasAlt: img.hasAttribute('alt'),
                    alt: img.getAttribute('alt')
                })).filter(img => !img.hasAlt || img.alt === '');

                // 3. Buttons/links with no accessible name
                const interactives = Array.from(document.querySelectorAll('a, button')).map(el => {
                    const text = el.innerText.trim();
                    const aria = el.getAttribute('aria-label');
                    const title = el.getAttribute('title');
                    const accessibleName = text || aria || title;
                    return {
                        tag: el.tagName,
                        accessibleName,
                        className: (el.className || '').toString().slice(0, 50)
                    };
                }).filter(el => !el.accessibleName);

                // 4. Performance timing
                const nav = performance.getEntriesByType('navigation')[0];
                const domLoaded = nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null;
                const loadTime = nav ? Math.round(nav.loadEventEnd - nav.startTime) : null;

                return {
                    h1Count,
                    headingsSample: headings.slice(0, 6),
                    missingAltImgs: imgs,
                    unnamedInteractives: interactives,
                    domLoadedMs: domLoaded,
                    loadTimeMs: loadTime
                };
            }""")

            results[slug] = page_data

        browser.close()

    out_file = r"d:\home\strony\diagnostyka-systems\docs\audit\a11y_perf_report.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("A11y & Perf audit done.")

if __name__ == "__main__":
    run_a11y_audit()
