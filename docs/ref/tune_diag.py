from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

fp_diag = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=22.8)
tp = TextPath((57.5, 33.5), "diagnostyka", prop=fp_diag)
bb = tp.get_extents()
print(f"At size 22.8: x0={bb.x0:.2f}, x1={bb.x1:.2f}, width={bb.width:.2f}")

fp_diag2 = FontProperties(fname='C:/Windows/Fonts/segoeui.ttf', size=23.5)
tp2 = TextPath((57.5, 33.5), "diagnostyka", prop=fp_diag2)
bb2 = tp2.get_extents()
print(f"At size 23.5: x0={bb2.x0:.2f}, x1={bb2.x1:.2f}, width={bb2.width:.2f}")
