from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref.png')
arr = np.array(img)

# In logo-ref.png (172x60):
# Let's crop:
# diagnostyka: x: 50 to 172, y: 0 to 30
# systems + sc: x: 50 to 172, y: 28 to 60

crop_diag = img.crop((50, 0, 172, 30))
crop_diag.save('d:/home/strony/diagnostyka-systems/docs/ref/crop_diag_1x.png')

crop_sys = img.crop((50, 28, 172, 60))
crop_sys.save('d:/home/strony/diagnostyka-systems/docs/ref/crop_sys_1x.png')

print("Cropped text 1x")

# Measure bounding boxes of dark pixels in crop_sys:
# Find x range for systems and x range for sc
dark_mask = (arr < 150).all(axis=2)

# Row 35 to 55
text_rows = dark_mask[32:55, 50:172]
# Sum across columns
col_sum = text_rows.sum(axis=0)

ranges = []
in_range = False
start = 0
for i, count in enumerate(col_sum):
    if count > 0 and not in_range:
        in_range = True
        start = i + 50
    elif count == 0 and in_range:
        in_range = False
        ranges.append((start, i + 50))
if in_range:
    ranges.append((start, len(col_sum) + 50))

print("Text horizontal segments in y=32..55:")
for r in ranges:
    print(f"  x={r[0]}..{r[1]} (width {r[1]-r[0]})")
