import os
from playwright.sync_api import sync_playwright

URLS = [
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:5173/serwis',
    'http://127.0.0.1:5173/kontakt',
    'http://127.0.0.1:5173/produkty',
]

def check_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel='msedge')
        page = browser.new_page()
        page.set_viewport_size({"width": 390, "height": 844})

        for url in URLS:
            errors = []
            page.on("pageerror", lambda err: errors.append(str(err)))
            page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

            page.goto(url, wait_until='networkidle')
            dom_count = page.evaluate("() => document.querySelectorAll('*').length")
            h1 = page.evaluate("() => document.querySelector('h1') ? document.querySelector('h1').textContent : 'BRAK'")
            print(f"URL: {url} | DOM Elements: {dom_count} | H1: '{h1.strip()[:40]}' | Console errors: {len(errors)}")

        browser.close()

if __name__ == '__main__':
    check_pages()
