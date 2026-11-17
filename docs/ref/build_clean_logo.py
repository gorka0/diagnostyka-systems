import os
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from playwright.sync_api import sync_playwright

def path_to_svg_d(path, flip_y=True, height=60):
    commands = []
    codes = path.codes
    verts = path.vertices
    i = 0
    while i < len(verts):
        code = codes[i]
        x, y = verts[i]
        if flip_y:
            y = height - y
            
        if code == 1:
            commands.append(f"M {x:.2f} {y:.2f}")
            i += 1
        elif code == 2:
            commands.append(f"L {x:.2f} {y:.2f}")
            i += 1
        elif code == 3:
            cx, cy = verts[i]
            ex, ey = verts[i+1]
            if flip_y:
                cy = height - cy
                ey = height - ey
            commands.append(f"Q {cx:.2f} {cy:.2f} {ex:.2f} {ey:.2f}")
            i += 2
        elif code == 4:
            c1x, c1y = verts[i]
            c2x, c2y = verts[i+1]
            ex, ey = verts[i+2]
            if flip_y:
                c1y = height - c1y
                c2y = height - c2y
                ey = height - ey
            commands.append(f"C {c1x:.2f} {c1y:.2f} {c2x:.2f} {c2y:.2f} {ex:.2f} {ey:.2f}")
            i += 3
        elif code == 79:
            commands.append("Z")
            i += 1
        else:
            i += 1
    return " ".join(commands)

# Font configurations
fp_diag = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=21.66)
fp_sys = FontProperties(fname='C:/Windows/Fonts/segoeuib.ttf', size=23.05)
fp_sc = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=16.44)

# Y coordinates in matplotlib (flip_y=True, height=60):
# In SVG:
# diagnostyka baseline ~26.5 -> in matplotlib: y = 60 - 26.5 = 33.5
# systems baseline ~47.5 -> in matplotlib: y = 60 - 47.5 = 12.5
# s.c. baseline ~47.5 -> in matplotlib: y = 60 - 47.5 = 12.5

tp_diag = TextPath((57.5, 33.5), "diagnostyka", prop=fp_diag)
tp_sys = TextPath((57.5, 12.5), "systems", prop=fp_sys)
tp_sc = TextPath((152.0, 12.5), "s.c.", prop=fp_sc)

d_diag = path_to_svg_d(tp_diag)
d_sys = path_to_svg_d(tp_sys)
d_sc = path_to_svg_d(tp_sc)

svg_code = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 60" width="174" height="60">
  <!-- Diagnostyka Systems SVG Logo -->
  <g id="ds-mark">
    <!-- Orange D (Diagnostyka) -->
    <!-- Top block of D -->
    <path d="M 3 5.5 L 22 5.5 C 31.5 5.5 38.5 15 38.5 29.5 L 29.5 29.5 C 29.5 19 22.5 14 14 14 L 14 29.5 L 3 29.5 Z" fill="#EE9D16" />
    <!-- Lower crescent of D -->
    <path d="M 29.5 29.5 L 38.5 29.5 C 38.5 37.5 34 44.5 29.5 47.5 L 29.5 29.5 Z" fill="#EE9D16" />
    <!-- Lower foot of D -->
    <path d="M 14 47.5 C 14 52 19 54 29.5 54 L 29.5 44 C 24 44 19 44.5 14 47.5 Z" fill="#EE9D16" />
    <!-- Circle R trademark -->
    <circle cx="5" cy="49" r="3.2" fill="none" stroke="#EE9D16" stroke-width="0.8" />
    <text x="5" y="50.6" font-family="'Segoe UI', 'Inter', Arial, sans-serif" font-size="3.8" font-weight="700" fill="#EE9D16" text-anchor="middle">R</text>

    <!-- Crosshair lines (bounded cleanly: does NOT stick out of header) -->
    <line x1="2" y1="29.5" x2="172" y2="29.5" stroke="#898685" stroke-width="1.0" />
    <line x1="29.5" y1="3.5" x2="29.5" y2="56.5" stroke="#898685" stroke-width="1.0" />

    <!-- Reticle alignment ticks -->
    <line x1="30" y1="17.5" x2="38.5" y2="17.5" stroke="#5A5654" stroke-width="1.0" />
    <line x1="30" y1="41.5" x2="38.5" y2="41.5" stroke="#5A5654" stroke-width="1.0" />

    <!-- Wheel alignment camber ellipse (Systems arc) -->
    <path d="M 22 5.5 A 17 25 0 0 1 29.5 4.5 A 17 25 0 0 1 46.5 29.5 A 17 25 0 0 1 29.5 54.5 A 17 25 0 0 1 13.5 39.5" fill="none" stroke="#5A5654" stroke-width="1.2" stroke-linecap="round" />
  </g>
  <g id="ds-typography">
    <path d="{d_diag}" fill="#4D4745" />
    <path d="{d_sys}" fill="#1F2328" />
    <path d="{d_sc}" fill="#4D4745" />
  </g>
</svg>"""

with open('d:/home/strony/diagnostyka-systems/docs/ref/test_clean_logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_code)

print("test_clean_logo.svg written")
