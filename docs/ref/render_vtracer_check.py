import base64
from playwright.sync_api import sync_playwright

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

b_ref4 = b64('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref-4x.png')

with open('d:/home/strony/diagnostyka-systems/docs/ref/vtracer_logo.svg', 'r', encoding='utf-8') as f:
    svg_content = f.read()

html = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>VTracer vs Ref</title></head>
<body style="background:#fff; font-family:sans-serif; padding:30px;">
  <h2>1. Original Reference (4x, 688x240)</h2>
  <img src="data:image/png;base64,{b_ref4}" style="border:1px solid #ccc; width:688px; display:block; margin-bottom:20px;" />

  <h2>2. VTracer SVG (vector rendered)</h2>
  <div style="border:1px solid #ccc; width:688px; background:white; margin-bottom:20px;">
    {svg_content}
  </div>

  <h2>3. VTracer on Dark Header Background (#0F172A)</h2>
  <div style="border:1px solid #ccc; width:688px; background:#0F172A; padding:20px; margin-bottom:20px;">
    {svg_content}
  </div>
</body>
</html>
"""

with open('d:/home/strony/diagnostyka-systems/docs/ref/compare_vtracer.html', 'w', encoding='utf-8') as f:
    f.write(html)

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(channel="msedge")
    except Exception:
        browser = p.chromium.launch(channel="chrome")
    page = browser.new_page(viewport={"width": 1000, "height": 1200})
    page.goto("file:///d:/home/strony/diagnostyka-systems/docs/ref/compare_vtracer.html")
    page.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/compare_vtracer.png", full_page=True)
    browser.close()

print("compare_vtracer.png captured successfully")
