from PIL import Image

img = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
# Scale 4x crop up by another 4x using nearest neighbor so we see raw pixels clearly
zoom = img.resize((img.width * 4, img.height * 4), Image.NEAREST)
zoom.save('d:/home/strony/diagnostyka-systems/docs/ref/mark_ultra_zoom.png')
print("mark_ultra_zoom.png saved")
