import numpy as np
from PIL import Image
import vtracer
import xml.etree.ElementTree as ET
import re

# Load 4x reference
im = Image.open(r'd:\home\strony\diagnostyka-systems\docs\ref\logo-ref-4x.png').convert('RGB')
arr = np.array(im)

# 1. Segment layers
# Orange: r > 180, g > 90, b < 70
orange_mask = (arr[:,:,0] > 180) & (arr[:,:,1] > 90) & (arr[:,:,2] < 70)

# Dark text: r < 100, g < 100, b < 100
dark_text_mask = (arr[:,:,0] < 100) & (arr[:,:,1] < 100) & (arr[:,:,2] < 100)

# Medium gray: abs(r-g)<25, abs(g-b)<25, 100 <= r < 190
med_gray_mask = (np.abs(arr[:,:,0].astype(int) - arr[:,:,1].astype(int)) < 25) & \
                (np.abs(arr[:,:,1].astype(int) - arr[:,:,2].astype(int)) < 25) & \
                (arr[:,:,0] >= 100) & (arr[:,:,0] < 190)

# Save binary PNGs (black on white) for each layer
def save_binary(mask, filename):
    bin_img = np.full((mask.shape[0], mask.shape[1]), 255, dtype=np.uint8)
    bin_img[mask] = 0
    Image.fromarray(bin_img).save(filename)

save_binary(orange_mask, r'd:\home\strony\diagnostyka-systems\docs\audit\layer_orange.png')
save_binary(dark_text_mask, r'd:\home\strony\diagnostyka-systems\docs\audit\layer_text.png')
save_binary(med_gray_mask, r'd:\home\strony\diagnostyka-systems\docs\audit\layer_gray.png')

# Trace each with vtracer
vtracer.convert_image_to_svg_py(
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_orange.png',
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_orange.svg',
    colormode='binary', mode='spline', filter_speckle=10, corner_threshold=60, length_threshold=4
)

vtracer.convert_image_to_svg_py(
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_text.png',
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_text.svg',
    colormode='binary', mode='spline', filter_speckle=10, corner_threshold=60, length_threshold=4
)

vtracer.convert_image_to_svg_py(
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_gray.png',
    r'd:\home\strony\diagnostyka-systems\docs\audit\layer_gray.svg',
    colormode='binary', mode='spline', filter_speckle=10, corner_threshold=60, length_threshold=4
)

print("Layer tracing complete.")
