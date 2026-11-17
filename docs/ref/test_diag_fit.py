from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

fp_arial_reg = FontProperties(fname='C:/Windows/Fonts/arial.ttf', size=20)
fp_segoe_reg = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=20)

tp1 = TextPath((0, 0), "diagnostyka", prop=fp_arial_reg)
bb1 = tp1.get_extents()
print(f"Arial Reg 'diagnostyka' at size 20: width = {bb1.width:.2f}, height = {bb1.height:.2f}")

tp2 = TextPath((0, 0), "diagnostyka", prop=fp_segoe_reg)
bb2 = tp2.get_extents()
print(f"Segoe UI Reg 'diagnostyka' at size 20: width = {bb2.width:.2f}, height = {bb2.height:.2f}")

scale_arial = 113.0 / bb1.width
print(f"Arial Reg needed size = {20 * scale_arial:.2f}pt (height = {bb1.height * scale_arial:.2f})")

scale_segoe = 113.0 / bb2.width
print(f"Segoe UI Reg needed size = {20 * scale_segoe:.2f}pt (height = {bb2.height * scale_segoe:.2f})")
