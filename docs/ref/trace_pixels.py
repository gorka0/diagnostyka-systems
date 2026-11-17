from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref.png')
arr = np.array(img)

# Print a grid of 60x60 showing:
# ' ' for white/light
# 'O' for orange
# '+' for crosshairs
# 'S' for the grey curve/letter S
# 'R' for the circled R

for y in range(0, 60):
    row = []
    for x in range(0, 60):
        r, g, b = [int(v) for v in arr[y, x]]
        # Crosshair line:
        # vertical line at x=29 or 30
        # horizontal line at y=29 or 30
        is_orange = (r > 180 and g > 110 and b < 80)
        is_grey = (max(r,g,b) - min(r,g,b) < 35 and (r+g+b)/3 < 200)
        
        if is_orange:
            row.append('O')
        elif is_grey:
            if x in (29, 30) and not (y in (28, 29, 30)):
                row.append('|')
            elif y in (29, 30) and not (x in (28, 29, 30)):
                row.append('-')
            else:
                row.append('#')
        else:
            row.append('.')
    print(f"{y:02d} " + "".join(row))
