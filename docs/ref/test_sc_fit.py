from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

fp_arial_reg = FontProperties(fname='C:/Windows/Fonts/arial.ttf', size=15)
fp_segoe_reg = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=15)

tp1 = TextPath((0, 0), "s.c.", prop=fp_arial_reg)
bb1 = tp1.get_extents()
print(f"Arial Reg 's.c.' at size 15: width = {bb1.width:.2f}, height = {bb1.height:.2f}")

tp2 = TextPath((0, 0), "s.c.", prop=fp_segoe_reg)
bb2 = tp2.get_extents()
print(f"Segoe UI Reg 's.c.' at size 15: width = {bb2.width:.2f}, height = {bb2.height:.2f}")

scale_arial = 20.0 / bb1.width
print(f"Arial Reg needed size = {15 * scale_arial:.2f}pt (height = {bb1.height * scale_arial:.2f})")

scale_segoe = 20.0 / bb2.width
print(f"Segoe UI Reg needed size = {15 * scale_segoe:.2f}pt (height = {bb2.height * scale_segoe:.2f})")
