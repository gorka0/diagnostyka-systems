from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

# Look at points in the square x: 18..27, y: 31..38
pts = []
for y in range(int(31*4), int(38*4)):
    for x in range(int(18*4), int(27*4)):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
            pts.append((x / 4.0, y / 4.0))

print(f"Points in x=18..27, y=31..38: {len(pts)}")
for p in pts[::10]:
    print(f"  pt: ({p[0]:.2f}, {p[1]:.2f})")
