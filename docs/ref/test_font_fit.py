from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from PIL import Image
import numpy as np

fp_arial_reg = FontProperties(fname='C:/Windows/Fonts/arial.ttf', size=20)
fp_arial_bold = FontProperties(fname='C:/Windows/Fonts/arialbd.ttf', size=20)
fp_segoe_reg = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=20)
fp_segoe_bold = FontProperties(fname='C:/Windows/Fonts/segoeuib.ttf', size=20)

tp1 = TextPath((0, 0), "systems", prop=fp_arial_bold)
bb1 = tp1.get_extents()
print(f"Arial Bold 'systems' at size 20: width = {bb1.width:.2f}, height = {bb1.height:.2f}")

tp2 = TextPath((0, 0), "systems", prop=fp_segoe_bold)
bb2 = tp2.get_extents()
print(f"Segoe UI Bold 'systems' at size 20: width = {bb2.width:.2f}, height = {bb2.height:.2f}")

# Target in logo-ref is width = 84px!
# At width = 84px:
scale_arial = 84.0 / bb1.width
print(f"Arial Bold needed size = {20 * scale_arial:.2f}pt (height would be {bb1.height * scale_arial:.2f})")

scale_segoe = 84.0 / bb2.width
print(f"Segoe Bold needed size = {20 * scale_segoe:.2f}pt (height would be {bb2.height * scale_segoe:.2f})")
