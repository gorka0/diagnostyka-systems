from PIL import Image

img_4x = Image.open('d:/home/strony/diagnostyka-systems/docs/ref/logo-ref-4x.png')
# Mark in 4x is x: 0 to 240, y: 0 to 240
mark_crop = img_4x.crop((0, 0, 240, 240))
mark_crop.save('d:/home/strony/diagnostyka-systems/docs/ref/mark_4x_crop.png')
print("mark_4x_crop.png saved")
