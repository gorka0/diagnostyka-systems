from PIL import Image
import numpy as np

# Load 4x crop (240x240)
img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png').convert('RGB')
arr = np.array(img)

# Let's inspect where orange pixels are:
orange_pts = []
for y in range(len(arr)):
    for x in range(len(arr[0])):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if r > 180 and g > 110 and b < 80:
            orange_pts.append((x / 4.0, y / 4.0))

orange_pts = np.array(orange_pts)
print(f"Orange bounds 1x: X=[{orange_pts[:,0].min():.2f}, {orange_pts[:,0].max():.2f}], Y=[{orange_pts[:,1].min():.2f}, {orange_pts[:,1].max():.2f}]")

# Top rectangle of D:
top_d = orange_pts[orange_pts[:,1] < 28]
print(f"Top D: X=[{top_d[:,0].min():.2f}, {top_d[:,0].max():.2f}], Y=[{top_d[:,1].min():.2f}, {top_d[:,1].max():.2f}]")

# Bottom D:
bot_d = orange_pts[orange_pts[:,1] > 31]
print(f"Bot D: X=[{bot_d[:,0].min():.2f}, {bot_d[:,0].max():.2f}], Y=[{bot_d[:,1].min():.2f}, {bot_d[:,1].max():.2f}]")
