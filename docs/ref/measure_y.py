from PIL import Image
import numpy as np

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref.png')
arr = np.array(img)
dark_mask = (arr < 160).all(axis=2)

def get_y_bounds(x1, x2):
    sub = dark_mask[:, x1:x2]
    row_sum = sub.sum(axis=1)
    rows = np.where(row_sum > 0)[0]
    return rows[0], rows[-1]

print("diagnostyka (x=57..170): y =", get_y_bounds(57, 170))
print("systems (x=57..141): y =", get_y_bounds(57, 141))
print("s.c. (x=152..172): y =", get_y_bounds(152, 172))
