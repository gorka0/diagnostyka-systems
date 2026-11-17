from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

# Print slices of the curve
# In 1x coords, center is (29.5, 29.5)
# Top-left (x < 29.5, y < 29.5)
# Top-right (x > 29.5, y < 29.5)
# Bottom-left (x < 29.5, y > 29.5)
# Bottom-right (x > 29.5, y > 29.5)

def get_pts(x_min, x_max, y_min, y_max):
    pts = []
    for y in range(int(y_min*4), int(y_max*4)):
        for x in range(int(x_min*4), int(x_max*4)):
            r, g, b = [int(v) for v in arr[y, x][:3]]
            if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
                pts.append((x / 4.0, y / 4.0))
    return pts

print("Top-right points count:", len(get_pts(30.5, 47, 4.5, 28.5)))
print("Top-left points count:", len(get_pts(13, 28.5, 4.5, 28.5)))
print("Bottom-right points count:", len(get_pts(30.5, 47, 30.5, 54.5)))
print("Bottom-left points count:", len(get_pts(13, 28.5, 30.5, 54.5)))
