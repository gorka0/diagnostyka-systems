import os
import numpy as np
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

def path_to_svg_d(path, flip_y=True, height=60):
    """Konwertuje matplotlib TextPath na ciąg d="..." dla elementu <path> w SVG."""
    commands = []
    codes = path.codes
    verts = path.vertices
    
    i = 0
    while i < len(verts):
        code = codes[i]
        x, y = verts[i]
        if flip_y:
            y = height - y  # Matplotlib ma Y rosnący w górę, SVG w dół
            
        if code == 1:  # MOVETO
            commands.append(f"M {x:.2f} {y:.2f}")
            i += 1
        elif code == 2:  # LINETO
            commands.append(f"L {x:.2f} {y:.2f}")
            i += 1
        elif code == 3:  # CURVE3 (quadratic)
            cx, cy = verts[i]
            ex, ey = verts[i+1]
            if flip_y:
                cy = height - cy
                ey = height - ey
            commands.append(f"Q {cx:.2f} {cy:.2f} {ex:.2f} {ey:.2f}")
            i += 2
        elif code == 4:  # CURVE4 (cubic)
            c1x, c1y = verts[i]
            c2x, c2y = verts[i+1]
            ex, ey = verts[i+2]
            if flip_y:
                c1y = height - c1y
                c2y = height - c2y
                ey = height - ey
            commands.append(f"C {c1x:.2f} {c1y:.2f} {c2x:.2f} {c2y:.2f} {ex:.2f} {ey:.2f}")
            i += 3
        elif code == 79:  # CLOSEPOLY
            commands.append("Z")
            i += 1
        else:
            i += 1
    return " ".join(commands)

# Znajdź czysty font sans-serif
fp_diag = FontProperties(family='sans-serif', weight='normal', size=18.5)
fp_sys = FontProperties(family='sans-serif', weight='bold', size=21.5)
fp_sc = FontProperties(family='sans-serif', weight='normal', size=13.5)

# Pozycje tekstu (w układzie współrzędnych gdzie baseline Y jest mierzony od dołu przed odwróceniem):
# W SVG baseline dla diagnostyka to y ≈ 23, więc od dołu h=60 to 60 - 23 = 37
# Dla systems baseline y ≈ 50, więc od dołu 60 - 50 = 10
# Dla s.c. baseline y ≈ 50, więc od dołu 60 - 50 = 10
tp_diag = TextPath((54, 37.2), "diagnostyka", prop=fp_diag)
tp_sys = TextPath((54, 10.2), "systems", prop=fp_sys)
tp_sc = TextPath((152, 10.2), "s.c.", prop=fp_sc)

d_diag = path_to_svg_d(tp_diag)
d_sys = path_to_svg_d(tp_sys)
d_sc = path_to_svg_d(tp_sc)

# Znak logo (Mark) - dopracowane krzywe wektorowe
# Pomarańczowy kształt litery D:
# Górny blok lewy: od x=3, y=5 do x=29.5, z łukiem zewnętrznym do x=38.5, y=29.5
# Wewnętrzny łuk wycięcia: od x=14, y=29.5 po łuku w górę i w prawo
# Dolna część: od środka (29.5, 29.5) w prawo do (38.5, 29.5), łuk w dół do (14, 54), łuk do (29.5, 29.5)

mark_orange = """
  <!-- Znak pomarańczowy: Stylizowane D -->
  <path d="M 3 5 L 29.5 5 A 24.5 24.5 0 0 1 38.5 29.5 L 29.5 29.5 A 15.5 15.5 0 0 0 14 14 L 3 14 Z" fill="#EE9D16" />
  <path d="M 29.5 29.5 L 38.5 29.5 A 24.5 24.5 0 0 1 14 54 L 14 42.5 A 13 13 0 0 0 29.5 29.5 Z" fill="#EE9D16" />
"""

mark_crosshair = """
  <!-- Krzyż pomiarowy / linie celownicze -->
  <line x1="2" y1="29.5" x2="170" y2="29.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
  <line x1="29.5" y1="0.5" x2="29.5" y2="58.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
"""

mark_scurve = """
  <!-- Cienka szara krzywa S (geometria / pomiar) -->
  <path d="M 14 29.5 A 15.5 15.5 0 0 1 29.5 5 A 16 16 0 0 1 45.5 21 A 16 16 0 0 1 29.5 29.5 A 15.5 15.5 0 0 1 13.5 38.5 A 15.5 15.5 0 0 0 29.5 54 A 16 16 0 0 0 45.5 41" fill="none" stroke="#5A5654" stroke-width="1.3" stroke-linecap="round" />
  
  <!-- Znak zastrzeżenia R przy podstawie -->
  <circle cx="5" cy="49" r="3.2" fill="none" stroke="#EE9D16" stroke-width="0.8" />
  <text x="5" y="50.8" font-family="'Inter', sans-serif" font-size="4" font-weight="700" fill="#EE9D16" text-anchor="middle">R</text>
"""

svg_full = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 60" width="172" height="60">
  <g id="ds-mark">
{mark_orange}
{mark_crosshair}
{mark_scurve}
  </g>
  <g id="ds-typography">
    <!-- Napis diagnostyka w krzywych -->
    <path d="{d_diag}" fill="#3C3735" />
    <!-- Napis systems w krzywych -->
    <path d="{d_sys}" fill="#1F2328" />
    <!-- Napis s.c. w krzywych -->
    <path d="{d_sc}" fill="#1F2328" />
  </g>
</svg>"""

# SVG Sam Znak (Mark)
# Rozmiar 48x60 (lub kwadrat 60x60 z zachowaniem proporcji)
svg_mark = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
  <g id="ds-mark" transform="translate(6, 0)">
{mark_orange}
    <line x1="-4" y1="29.5" x2="48" y2="29.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
    <line x1="29.5" y1="0.5" x2="29.5" y2="58.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
{mark_scurve}
  </g>
</svg>"""

# SVG Favicon (kwadrat 32x32 lub 64x64 z paddingiem)
svg_favicon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="8" fill="#FFFFFF" />
  <g id="ds-mark" transform="translate(8, 2)">
{mark_orange}
    <line x1="-4" y1="29.5" x2="48" y2="29.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
    <line x1="29.5" y1="0.5" x2="29.5" y2="58.5" stroke="#898685" stroke-width="1.05" stroke-linecap="square" />
{mark_scurve}
  </g>
</svg>"""

# SVG Mono Light (na ciemne tło - jednolicie białe elementy)
mark_orange_mono = """
  <path d="M 3 5 L 29.5 5 A 24.5 24.5 0 0 1 38.5 29.5 L 29.5 29.5 A 15.5 15.5 0 0 0 14 14 L 3 14 Z" fill="#FFFFFF" />
  <path d="M 29.5 29.5 L 38.5 29.5 A 24.5 24.5 0 0 1 14 54 L 14 42.5 A 13 13 0 0 0 29.5 29.5 Z" fill="#FFFFFF" />
"""
mark_crosshair_mono = """
  <line x1="2" y1="29.5" x2="170" y2="29.5" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.05" stroke-linecap="square" />
  <line x1="29.5" y1="0.5" x2="29.5" y2="58.5" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.05" stroke-linecap="square" />
"""
mark_scurve_mono = """
  <path d="M 14 29.5 A 15.5 15.5 0 0 1 29.5 5 A 16 16 0 0 1 45.5 21 A 16 16 0 0 1 29.5 29.5 A 15.5 15.5 0 0 1 13.5 38.5 A 15.5 15.5 0 0 0 29.5 54 A 16 16 0 0 0 45.5 41" fill="none" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="1.3" stroke-linecap="round" />
  <circle cx="5" cy="49" r="3.2" fill="none" stroke="#FFFFFF" stroke-width="0.8" />
  <text x="5" y="50.8" font-family="'Inter', sans-serif" font-size="4" font-weight="700" fill="#FFFFFF" text-anchor="middle">R</text>
"""
svg_mono_light = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 60" width="172" height="60">
  <g id="ds-mark">
{mark_orange_mono}
{mark_crosshair_mono}
{mark_scurve_mono}
  </g>
  <g id="ds-typography">
    <path d="{d_diag}" fill="#FFFFFF" fill-opacity="0.85" />
    <path d="{d_sys}" fill="#FFFFFF" />
    <path d="{d_sc}" fill="#FFFFFF" />
  </g>
</svg>"""

os.makedirs('d:/home/strony/diagnostyka-systems/public/brand', exist_ok=True)
with open('d:/home/strony/diagnostyka-systems/public/brand/ds-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_full)
with open('d:/home/strony/diagnostyka-systems/public/brand/ds-mark.svg', 'w', encoding='utf-8') as f:
    f.write(svg_mark)
with open('d:/home/strony/diagnostyka-systems/public/brand/ds-logo-mono-light.svg', 'w', encoding='utf-8') as f:
    f.write(svg_mono_light)
with open('d:/home/strony/diagnostyka-systems/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_favicon)

print('Wszystkie pliki SVG wygenerowane pomyślnie.')
