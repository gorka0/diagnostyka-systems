from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

# Trace where grey points go from y=35 to y=45
pts = []
for y in range(int(35*4), int(45*4)):
    for x in range(int(20*4), int(35*4)):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
            pts.append((x / 4.0, y / 4.0))

print(f"Points in x=20..35, y=35..45: {len(pts)}")
for p in pts:
    print(f"  pt: ({p[0]:.2f}, {p[1]:.2f})")
