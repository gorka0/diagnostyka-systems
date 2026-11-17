import base64

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

b_ref = b64('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref.png')
b_ref4 = b64('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref-4x.png')
b_user = b64('C:/Users/tomek/.gemini/antigravity/brain/418a9da6-1f70-4ed8-9801-cc75d57e1da5/.user_uploaded/media_1794945012830_7c6ab280.png')

html = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Logo Check</title></head>
<body style="background:#fff; font-family:sans-serif; padding:20px;">
  <h2>1. User Uploaded Screenshot (Defective)</h2>
  <img src="data:image/png;base64,{b_user}" style="border:1px solid #ccc; max-width:400px;" />

  <h2>2. Original logo-ref.png (1x, 172x60)</h2>
  <img src="data:image/png;base64,{b_ref}" style="border:1px solid #ccc; image-rendering:pixelated; transform:scale(2); transform-origin:0 0; margin-bottom:70px; display:block;" />

  <h2>3. Original logo-ref-4x.png (4x, 688x240)</h2>
  <img src="data:image/png;base64,{b_ref4}" style="border:1px solid #ccc; max-width:688px; display:block;" />
</body>
</html>
"""

with open('d:/home/strony/diagnostyka-systems/docs/ref/inspect_visual.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('inspect_visual.html written successfully')
