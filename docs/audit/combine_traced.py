import xml.etree.ElementTree as ET
import re

def extract_paths(svg_path):
    tree = ET.parse(svg_path)
    root = tree.getroot()
    # Find all path elements
    paths = []
    for elem in root.iter():
        if elem.tag.endswith('path'):
            d = elem.attrib.get('d')
            fill = elem.attrib.get('fill', '#000000')
            if d:
                paths.append((d, fill))
    return paths

orange_paths = extract_paths(r'd:\home\strony\diagnostyka-systems\docs\audit\layer_orange.svg')
text_paths = extract_paths(r'd:\home\strony\diagnostyka-systems\docs\audit\layer_text.svg')
gray_paths = extract_paths(r'd:\home\strony\diagnostyka-systems\docs\audit\layer_gray.svg')

print(f"Orange paths: {len(orange_paths)}")
print(f"Text paths: {len(text_paths)}")
print(f"Gray paths: {len(gray_paths)}")

# Combine into one SVG with viewBox 0 0 688 240 (and scale 0.25 to 172 60)
svg_content = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 60" width="172" height="60">']
svg_content.append('  <g transform="scale(0.25)">')

# Group 1: Gray layer (crosshair, arcs)
svg_content.append('    <g id="ds-crosshairs" fill="#898685">')
for d, _ in gray_paths:
    svg_content.append(f'      <path d="{d}" />')
svg_content.append('    </g>')

# Group 2: Orange mark
svg_content.append('    <g id="ds-mark-orange" fill="#EE9D16">')
for d, _ in orange_paths:
    svg_content.append(f'      <path d="{d}" />')
svg_content.append('    </g>')

# Group 3: Text layer ("diagnostyka", "systems", "s.c.")
# In the original, "diagnostyka" is light gray (#57606A or #3C3735) and "systems" is darker (#1F2328).
# In text_paths, let's see which paths are upper ("diagnostyka") vs lower ("systems")
svg_content.append('    <g id="ds-typography">')
for d, _ in text_paths:
    # check average y in path
    y_coords = [float(y) for y in re.findall(r'[,\s](-?\d+(?:\.\d+)?)\b', d)]
    # if mostly y < 116 (in 4x coordinates, line is at 116):
    # let's set fill accordingly or use original colors
    svg_content.append(f'      <path d="{d}" fill="#1F2328" />')
svg_content.append('    </g>')

svg_content.append('  </g>')
svg_content.append('</svg>')

combined_svg = '\n'.join(svg_content)
with open(r'd:\home\strony\diagnostyka-systems\docs\audit\traced_combined.svg', 'w', encoding='utf-8') as f:
    f.write(combined_svg)

print("Saved traced_combined.svg")
