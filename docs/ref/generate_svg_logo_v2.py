import os
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

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

# Dokładne dopasowanie fontów i proporcji
# diagnostyka: X: 55 do 169 (szerokość 114px), baseline y=23 (60 - 23 = 37)
# systems: X: 57 do 139 (szerokość 82px), baseline y=50 (60 - 50 = 10)
# s.c.: X: 148 do 171 (szerokość 23px), baseline y=50 (60 - 50 = 10)

# Używamy precyzyjnie dobranych rozmiarów i spacingu
fp_diag = FontProperties(family='sans-serif', weight='normal', size=19.2)
fp_sys = FontProperties(family='sans-serif', weight='bold', size=21.0)
fp_sc = FontProperties(family='sans-serif', weight='normal', size=14.0)

tp_diag = TextPath((55, 37.0), "diagnostyka", prop=fp_diag)
tp_sys = TextPath((57, 10.0), "systems", prop=fp_sys)
tp_sc = TextPath((148, 10.0), "s.c.", prop=fp_sc)

d_diag = path_to_svg_d(tp_diag)
d_sys = path_to_svg_d(tp_sys)
d_sc = path_to_svg_d(tp_sc)

# Kształt pomarańczowego "D":
# 1. Górna lewa ćwiartka + łuk prawy górny:
#    M 3 5 -> L 29.5 5 -> łuk zewnętrzny R=24 do (38.5, 29.5) -> L 29.5 29.5 -> łuk wewnętrzny do (13.5, 14) -> L 3 14 -> Z
# 2. Prawy dolny łuk: od (29.5, 29.5) do (38.5, 29.5) -> łuk w dół do (32, 45) -> do (29.5, 29.5)
# 3. Dolna stopka w ćwiartce III: łuk dolny od (29.5, 54) do (14, 54) -> w górę do (14, 40) -> łuk wewnętrzny do (29.5, 54)

mark_orange_v2 = """
  <!-- Główny kształt litery D (pomarańczowo-złoty) -->
  <!-- Górna część D z prostym blokiem po lewej i łukiem zewnętrznym -->
  <path d="M 3 5.5 L 23 5.5 C 31.5 5.5 38.5 16 38.5 29.5 L 29.5 29.5 C 29.5 19 22.5 14 14 14 L 3 14 Z" fill="#EE9D16" />
  
  <!-- Dolna prawa ćwiartka D (tapered sector) -->
  <path d="M 29.5 29.5 L 38.5 29.5 C 38.5 38 34.5 45 29.5 48 L 29.5 29.5 Z" fill="#EE9D16" />
  
  <!-- Dolna lewa stopka D -->
  <path d="M 14 54 C 20 54 26 52 29.5 48 L 29.5 38 C 24 38 18 42 14 47.5 Z" fill="#EE9D16" />
"""

mark_crosshair_v2 = """
  <!-- Krzyż pomiarowy / linie celownicze -->
  <line x1="2" y1="29.5" x2="170" y2="29.5" stroke="#898685" stroke-width="1.0" />
  <line x1="29.5" y1="0" x2="29.5" y2="59" stroke="#898685" stroke-width="1.0" />
"""

mark_scurve_v2 = """
  <!-- Płynna krzywa S (linie pomiarowe geometrii) -->
  <!-- Górna pętla S: od (14, 29.5) przez górę (29.5, 5.5), prawy bok (45.5, 17.5) do środka (29.5, 29.5) -->
  <path d="M 14 29.5 C 14 16 21 5.5 29.5 5.5 C 38.5 5.5 45.5 11 45.5 17.5 C 45.5 24 38 29.5 29.5 29.5 C 21 29.5 13.5 35 13.5 41.5 C 13.5 48.5 20.5 54 29.5 54 C 38.5 54 45.5 48.5 45.5 41.5" fill="none" stroke="#5A5654" stroke-width="1.2" stroke-linecap="round" />
  
  <!-- Znak zastrzeżenia R w lewym dolnym rogu -->
  <circle cx="5" cy="49" r="3.2" fill="none" stroke="#EE9D16" stroke-width="0.8" />
  <text x="5" y="50.7" font-family="'Inter', sans-serif" font-size="3.8" font-weight="700" fill="#EE9D16" text-anchor="middle">R</text>
"""

svg_full = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 60" width="172" height="60">
  <g id="ds-mark">
{mark_orange_v2}
{mark_crosshair_v2}
{mark_scurve_v2}
  </g>
  <g id="ds-typography">
    <path d="{d_diag}" fill="#3C3735" />
    <path d="{d_sys}" fill="#1F2328" />
    <path d="{d_sc}" fill="#1F2328" />
  </g>
</svg>"""

svg_mark = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
  <g id="ds-mark" transform="translate(6, 0)">
{mark_orange_v2}
    <line x1="-4" y1="29.5" x2="48" y2="29.5" stroke="#898685" stroke-width="1.0" />
    <line x1="29.5" y1="0" x2="29.5" y2="59" stroke="#898685" stroke-width="1.0" />
{mark_scurve_v2}
  </g>
</svg>"""

svg_favicon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#FFFFFF" />
  <g id="ds-mark" transform="translate(8, 2)">
{mark_orange_v2}
    <line x1="-4" y1="29.5" x2="48" y2="29.5" stroke="#898685" stroke-width="1.0" />
    <line x1="29.5" y1="0" x2="29.5" y2="59" stroke="#898685" stroke-width="1.0" />
{mark_scurve_v2}
  </g>
</svg>"""

mark_orange_mono = """
  <path d="M 3 5.5 L 23 5.5 C 31.5 5.5 38.5 16 38.5 29.5 L 29.5 29.5 C 29.5 19 22.5 14 14 14 L 3 14 Z" fill="#FFFFFF" />
  <path d="M 29.5 29.5 L 38.5 29.5 C 38.5 38 34.5 45 29.5 48 L 29.5 29.5 Z" fill="#FFFFFF" />
  <path d="M 14 54 C 20 54 26 52 29.5 48 L 29.5 38 C 24 38 18 42 14 47.5 Z" fill="#FFFFFF" />
"""
mark_crosshair_mono = """
  <line x1="2" y1="29.5" x2="170" y2="29.5" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.0" />
  <line x1="29.5" y1="0" x2="29.5" y2="59" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.0" />
"""
mark_scurve_mono = """
  <path d="M 14 29.5 C 14 16 21 5.5 29.5 5.5 C 38.5 5.5 45.5 11 45.5 17.5 C 45.5 24 38 29.5 29.5 29.5 C 21 29.5 13.5 35 13.5 41.5 C 13.5 48.5 20.5 54 29.5 54 C 38.5 54 45.5 48.5 45.5 41.5" fill="none" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="1.2" stroke-linecap="round" />
  <circle cx="5" cy="49" r="3.2" fill="none" stroke="#FFFFFF" stroke-width="0.8" />
  <text x="5" y="50.7" font-family="'Inter', sans-serif" font-size="3.8" font-weight="700" fill="#FFFFFF" text-anchor="middle">R</text>
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

with open('d:/home/strony/diagnostyka-systems/public/brand/ds-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_full)
with open('d:/home/strony/diagnostyka-systems/public/brand/ds-mark.svg', 'w', encoding='utf-8') as f:
    f.write(svg_mark)
with open('d:/home/strony/diagnostyka-systems/public/brand/ds-logo-mono-light.svg', 'w', encoding='utf-8') as f:
    f.write(svg_mono_light)
with open('d:/home/strony/diagnostyka-systems/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_favicon)

print('Wersja v2 wygenerowana.')
