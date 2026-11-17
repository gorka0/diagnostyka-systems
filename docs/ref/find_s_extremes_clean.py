from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
arr = np.array(img)

pts = []
for y in range(len(arr)):
    for x in range(len(arr[0])):
        r, g, b = [int(v) for v in arr[y, x][:3]]
        if max(r, g, b) - min(r, g, b) < 30 and 40 < (r + g + b) / 3 < 180:
            x_1x, y_1x = x / 4.0, y / 4.0
            # restrict to mark area x < 48
            if x_1x >= 48:
                continue
            # exclude straight crosshairs far out
            if abs(x_1x - 29.5) < 0.8 and (y_1x < 4 or y_1x > 55):
                continue
            if abs(y_1x - 29.5) < 0.8 and (x_1x < 5 or x_1x > 45):
                continue
            pts.append((x_1x, y_1x))

pts = np.array(pts)
print("S curve bounding box (mark area):")
print(f"X: {pts[:,0].min():.2f} to {pts[:,0].max():.2f}")
print(f"Y: {pts[:,1].min():.2f} to {pts[:,1].max():.2f}")

top_pts = pts[pts[:,1] < pts[:,1].min() + 1]
print(f"Topmost: x={top_pts[:,0].mean():.2f}, y={top_pts[:,1].min():.2f}")

bot_pts = pts[pts[:,1] > pts[:,1].max() - 1]
print(f"Bottommost: x={bot_pts[:,0].mean():.2f}, y={bot_pts[:,1].max():.2f}")

right_pts = pts[pts[:,0] > pts[:,0].max() - 1]
print(f"Rightmost: x={right_pts[:,0].max():.2f}, y={right_pts[:,1].mean():.2f}")

left_pts = pts[pts[:,0] < pts[:,0].min() + 1]
print(f"Leftmost: x={left_pts[:,0].min():.2f}, y={left_pts[:,1].mean():.2f}")
