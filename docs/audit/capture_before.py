import os
from playwright.sync_api import sync_playwright

os.makedirs('d:/home/strony/diagnostyka-systems/docs/audit/before', exist_ok=True)

routes = [
    ('home', 'http://127.0.0.1:5173/'),
    ('serwis', 'http://127.0.0.1:5173/serwis'),
    ('kontakt', 'http://127.0.0.1:5173/kontakt'),
    ('produkty', 'http://127.0.0.1:5173/produkty'),
    ('produkt_detail', 'http://127.0.0.1:5173/produkty/geometria-kol/q-lign-compact'),
    ('publikacja', 'http://127.0.0.1:5173/publikacje/nowe-przepisy-skp-beissbarth'),
    ('not_found', 'http://127.0.0.1:5173/nie-istnieje-404')
]

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(channel="msedge")
    except Exception:
        browser = p.chromium.launch(channel="chrome")
        
    for name, url in routes:
        # Desktop 1440
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(url, wait_until="networkidle")
        page.screenshot(path=f"d:/home/strony/diagnostyka-systems/docs/audit/before/{name}_desktop.png", full_page=True)
        page.close()
        
        # Mobile 390
        page_m = browser.new_page(viewport={"width": 390, "height": 844})
        page_m.goto(url, wait_until="networkidle")
        page_m.screenshot(path=f"d:/home/strony/diagnostyka-systems/docs/audit/before/{name}_mobile.png", full_page=True)
        page_m.close()
        
    browser.close()

print("Baseline 'before' screenshots captured successfully!")
