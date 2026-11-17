import base64
from playwright.sync_api import sync_playwright

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

b_ref4 = b64('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref-4x.png')
b_user = b64('C:/Users/tomek/.gemini/antigravity/brain/418a9da6-1f70-4ed8-9801-cc75d57e1da5/.user_uploaded/media_1794945012830_7c6ab280.png')

with open('d:/home/strony/diagnostyka-systems/docs/ref/test_clean_logo.svg', 'r', encoding='utf-8') as f:
    svg_clean = f.read()

html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Clean Logo Comparison</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 24px; color: #1e293b; }}
    .card {{ background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
    h3 {{ margin-top: 0; font-size: 16px; color: #0f172a; }}
    .row {{ display: flex; gap: 24px; align-items: flex-start; }}
    .header-mock {{ background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 12px 24px; display: flex; align-items: center; gap: 20px; }}
  </style>
</head>
<body>
  <div class="card">
    <h3>1. Porównanie wierności 4x (Referencja vs Nowe Clean SVG)</h3>
    <div class="row">
      <div>
        <p style="font-size:12px; font-weight:600; color:#64748b; margin:0 0 6px 0;">ORYGINAŁ Z BAZY (docs/ref/logo-ref-4x.png)</p>
        <img src="data:image/png;base64,{b_ref4}" style="width: 500px; border: 1px solid #cbd5e1; display: block;" />
      </div>
      <div>
        <p style="font-size:12px; font-weight:600; color:#64748b; margin:0 0 6px 0;">NOWY CLEAN SVG (500px szerokości)</p>
        <div style="width: 500px; border: 1px solid #cbd5e1; background: #fff;">
          {svg_clean}
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>2. Problem zgłoszony przez użytkownika (PRZED vs PO)</h3>
    <div class="row">
      <div>
        <p style="font-size:12px; font-weight:600; color:#dc2626; margin:0 0 6px 0;">PRZED (Zgłoszenie błędu: nakładający się "s.c." i linia za obrys)</p>
        <img src="data:image/png;base64,{b_user}" style="max-width: 320px; border: 1px solid #f87171; display: block;" />
      </div>
      <div>
        <p style="font-size:12px; font-weight:600; color:#16a34a; margin:0 0 6px 0;">PO (Czysty, czytelny napis "s.c.", elegancka linia wewnątrz)</p>
        <div style="width: 320px; border: 1px solid #86efac; background: #fff; padding: 4px;">
          {svg_clean}
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>3. Wygląd w Headerze nawigacji strony (skala rzeczywista h-9 / 36px)</h3>
    <div class="header-mock">
      <div style="height: 36px; display: flex; align-items: center;">
        {svg_clean}
      </div>
      <div style="font-size: 14px; font-weight: 500; color: #475569; display: flex; gap: 16px;">
        <span>Produkty</span>
        <span>Urządzenia OEM</span>
        <span>Serwis</span>
        <span>O nas</span>
        <span>Kontakt</span>
      </div>
    </div>
  </div>
</body>
</html>
"""

with open('d:/home/strony/diagnostyka-systems/docs/ref/compare_clean.html', 'w', encoding='utf-8') as f:
    f.write(html)

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(channel="msedge")
    except Exception:
        browser = p.chromium.launch(channel="chrome")
    page = browser.new_page(viewport={"width": 1100, "height": 1100})
    page.goto("file:///d:/home/strony/diagnostyka-systems/docs/ref/compare_clean.html")
    page.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/compare_clean.png", full_page=True)
    browser.close()

print("compare_clean.png captured successfully")
