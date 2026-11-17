import os
import re
from playwright.sync_api import sync_playwright

AUDIT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'docs', 'audit'))
AFTER_DIR = os.path.join(AUDIT_DIR, 'after')
os.makedirs(AFTER_DIR, exist_ok=True)

ROUTES = [
    ('/', 'home'),
    ('/serwis', 'serwis'),
    ('/kontakt', 'kontakt'),
    ('/produkty', 'produkty'),
    ('/produkty/geometria/ml-1800-8r', 'produkt_detail'),
    ('/publikacje/rentownosc-ogumienia', 'publikacja'),
    ('/404', 'not_found'),
]

MOBILE_WIDTHS = [360, 390, 414, 768, 1024]

def run_audit():
    with sync_playwright() as p:
        browser = None
        for channel in ['msedge', 'chrome', None]:
            try:
                if channel:
                    browser = p.chromium.launch(headless=True, channel=channel)
                else:
                    browser = p.chromium.launch(headless=True)
                break
            except Exception:
                continue

        if not browser:
            print("Browser launch failed")
            return

        print("=== 1. CAPTURING AFTER SCREENSHOTS & AUDITING TYPOGRAPHY ===")
        page = browser.new_page()

        # Check font sizes and weights across key routes
        font_size_violations = []
        font_weight_violations = []
        mono_usages = []

        for route, name in ROUTES:
            # Desktop screenshot (1440px)
            page.set_viewport_size({"width": 1440, "height": 900})
            url = f"http://127.0.0.1:5173{route}"
            page.goto(url, wait_until='networkidle')
            page.wait_for_timeout(300)

            desktop_screenshot = os.path.join(AFTER_DIR, f"{name}_desktop.png")
            page.screenshot(path=desktop_screenshot, full_page=True)
            print(f"Saved {name}_desktop.png")

            # Mobile screenshot (390px)
            page.set_viewport_size({"width": 390, "height": 844})
            page.goto(url, wait_until='networkidle')
            page.wait_for_timeout(300)

            mobile_screenshot = os.path.join(AFTER_DIR, f"{name}_mobile.png")
            page.screenshot(path=mobile_screenshot, full_page=True)
            print(f"Saved {name}_mobile.png")

            # Audit elements on page
            elements_data = page.evaluate("""() => {
                const results = [];
                const all = document.querySelectorAll('body *:not(script):not(style):not(svg):not(path)');
                for (const el of all) {
                    if (el.children.length === 0 && el.textContent.trim().length > 0) {
                        const style = window.getComputedStyle(el);
                        results.push({
                            tag: el.tagName,
                            text: el.textContent.trim().substring(0, 30),
                            fontSize: parseFloat(style.fontSize),
                            fontWeight: parseInt(style.fontWeight) || 400,
                            fontFamily: style.fontFamily,
                            className: el.className
                        });
                    }
                }
                return results;
            }""")

            for item in elements_data:
                # Rule: Nothing below 14px (exception: copyright 13px)
                if item['fontSize'] < 13.9:
                    is_copyright = 'Wszelkie prawa' in item['text'] or '2026' in item['text'] or 'Dane rejestrowe' in item['text']
                    if not is_copyright:
                        font_size_violations.append((route, item['text'], item['fontSize'], item['className']))

                # Rule: No font-weight < 400
                if item['fontWeight'] < 399:
                    font_weight_violations.append((route, item['text'], item['fontWeight'], item['className']))

                # Monospace check
                if 'mono' in item['fontFamily'].lower() or 'plex' in item['fontFamily'].lower():
                    mono_usages.append((route, item['text'], item['className']))

        print("\n=== 2. MOBILE RESPONSIVENESS (360, 390, 414, 768, 1024, Landscape) ===")
        overflow_issues = []
        for w in MOBILE_WIDTHS:
            page.set_viewport_size({"width": w, "height": 800})
            for route, name in ROUTES:
                page.goto(f"http://127.0.0.1:5173{route}", wait_until='networkidle')
                has_horizontal_scroll = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
                if has_horizontal_scroll:
                    scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
                    overflow_issues.append((route, w, scroll_w))

        # Landscape 844x390
        page.set_viewport_size({"width": 844, "height": 390})
        for route, name in ROUTES:
            page.goto(f"http://127.0.0.1:5173{route}", wait_until='networkidle')
            has_horizontal_scroll = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
            if has_horizontal_scroll:
                overflow_issues.append((route, 'landscape_844', page.evaluate("() => document.documentElement.scrollWidth")))

        print("\n=== AUDIT SUMMARY ===")
        print(f"Font size violations (<14px non-copyright): {len(font_size_violations)}")
        for v in font_size_violations[:5]:
            print(f"  - {v[0]}: '{v[1]}' ({v[2]}px) [{v[3]}]")

        print(f"Font weight violations (<400): {len(font_weight_violations)}")
        for v in font_weight_violations[:5]:
            print(f"  - {v[0]}: '{v[1]}' (weight {v[2]}) [{v[3]}]")

        print(f"Monospace usages: {len(mono_usages)}")
        for v in mono_usages[:10]:
            print(f"  - {v[0]}: '{v[1]}' [{v[2]}]")

        print(f"Horizontal scroll overflow issues: {len(overflow_issues)}")
        for v in overflow_issues:
            print(f"  - Overflow on {v[0]} at width {v[1]} (scrollWidth: {v[2]})")

        browser.close()

if __name__ == '__main__':
    run_audit()
