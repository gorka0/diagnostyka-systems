from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

# For various angles around center (29.5, 29.5), find the radius of grey points
center_x, center_y = 118, 118

# Let's find min/max coordinates of the S curve in 1x:
pts = []
for y in range(len(arr)):
    for x in range(len(arr[0])):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
            # exclude straight crosshair lines outside center
            if abs(x - 118) <= 4 and (y < 30 or y > 210):
                continue
            if abs(y - 118) <= 4 and (x < 30 or x > 210):
                continue
            pts.append((x / 4.0, y / 4.0))

pts = np.array(pts)
print("S curve bounding box in 1x:")
print(f"X: {pts[:,0].min():.2f} to {pts[:,0].max():.2f}")
print(f"Y: {pts[:,1].min():.2f} to {pts[:,1].max():.2f}")

# Find extreme points:
# Topmost point:
top_pts = pts[pts[:,1] < pts[:,1].min() + 2]
print(f"Topmost: x={top_pts[:,0].mean():.2f}, y={top_pts[:,1].min():.2f}")

# Bottommost point:
bot_pts = pts[pts[:,1] > pts[:,1].max() - 2]
print(f"Bottommost: x={bot_pts[:,0].mean():.2f}, y={bot_pts[:,1].max():.2f}")

# Rightmost point:
right_pts = pts[pts[:,0] > pts[:,0].max() - 2]
print(f"Rightmost: x={right_pts[:,0].max():.2f}, y={right_pts[:,1].mean():.2f}")

# Leftmost point:
left_pts = pts[pts[:,0] < pts[:,0].min() + 2]
print(f"Leftmost: x={left_pts[:,0].min():.2f}, y={left_pts[:,1].mean():.2f}")
