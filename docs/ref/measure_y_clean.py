from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref.png')
arr = np.array(img)
dark_mask = (arr < 160).all(axis=2)

def get_y_bounds_excluding_line(x1, x2, y_start, y_end):
    sub = dark_mask[y_start:y_end, x1:x2]
    row_sum = sub.sum(axis=1)
    rows = np.where(row_sum > 0)[0]
    return rows[0] + y_start, rows[-1] + y_start

print("diagnostyka y (in y=0..28):", get_y_bounds_excluding_line(57, 170, 0, 28))
print("systems y (in y=31..60):", get_y_bounds_excluding_line(57, 141, 31, 60))
print("s.c. y (in y=31..60):", get_y_bounds_excluding_line(152, 172, 31, 60))
