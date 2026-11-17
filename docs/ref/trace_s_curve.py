from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

# In 4x coordinates, canvas is 240x240. Center is (118, 118).
# Grey pixels: max(r,g,b)-min(r,g,b) < 30 and (r+g+b)/3 between 50 and 180
# Exclude the straight crosshair lines (x around 118, y around 118)

grey_pts = []
for y in range(len(arr)):
    for x in range(len(arr[0])):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
            # Check if not pure crosshair
            is_vert = (abs(x - 118) <= 3)
            is_horiz = (abs(y - 118) <= 3)
            grey_pts.append((x / 4.0, y / 4.0, is_vert, is_horiz))

print(f"Total grey pixels: {len(grey_pts)}")
# Let's inspect the arc points in 1x coordinates (x/4, y/4)
arc_pts = [(x, y) for (x, y, v, h) in grey_pts if not (v and not (15 < y < 45))]
print(f"Arc points: {len(arc_pts)}")
