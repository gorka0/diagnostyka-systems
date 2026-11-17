import matplotlib.pyplot as plt
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
import numpy as np

# Let's inspect available system fonts on Windows for sans-serif
from matplotlib.font_manager import findfont, FontProperties

font_inter = None
for name in ['Inter', 'Segoe UI', 'Arial', 'Helvetica', 'DejaVu Sans']:
    try:
        fp = FontProperties(family=name)
        fpath = findfont(fp)
        if fpath:
            print(f"Found font for {name}: {fpath}")
    except Exception as e:
        pass
