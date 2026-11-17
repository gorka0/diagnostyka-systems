import os
from PIL import Image

# We can render SVG to image using playwright or html browser, or python.
# Let's check if playwright or chrome is available to screenshot HTML.
html_content = """<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 20px; background: #fff; font-family: sans-serif; }
  .row { display: flex; align-items: center; gap: 30px; margin-bottom: 20px; }
  .label { font-size: 14px; font-weight: bold; margin-bottom: 6px; }
  .box { border: 1px solid #ddd; padding: 10px; display: inline-block; background: #fff; }
  img, svg { display: block; }
</style>
</head>
<body>
  <h2>Porównanie Logo: Oryginał vs Wektor SVG</h2>
  <div class="row">
    <div>
      <div class="label">1. Oryginał (logo-ref.png, 172x60)</div>
      <div class="box"><img src="logo-ref.png" width="172" height="60" /></div>
    </div>
    <div>
      <div class="label">2. Wektor SVG (test-draft.svg, 172x60)</div>
      <div class="box"><img src="test-draft.svg" width="172" height="60" /></div>
    </div>
  </div>
  <div class="row">
    <div>
      <div class="label">3. Oryginał (Powiększenie 4x)</div>
      <div class="box"><img src="logo-ref-4x.png" width="688" height="240" /></div>
    </div>
  </div>
  <div class="row">
    <div>
      <div class="label">4. Wektor SVG (Powiększenie 4x)</div>
      <div class="box"><img src="test-draft.svg" width="688" height="240" /></div>
    </div>
  </div>
</body>
</html>
"""

with open("d:/home/strony/diagnostyka-systems/docs/ref/compare.html", "w", encoding="utf-8") as f:
    f.write(html_content)
print("compare.html written.")
