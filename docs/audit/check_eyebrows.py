import re

with open('d:/home/strony/diagnostyka-systems/src/pages/products/OemProductsPage.tsx', encoding='utf-8') as f:
    text = f.read()
    print('Oem eyebrows:', re.findall(r'eyebrow="[^"]*"', text))

with open('d:/home/strony/diagnostyka-systems/src/pages/products/UsedProductsPage.tsx', encoding='utf-8') as f:
    text = f.read()
    print('Used eyebrows:', re.findall(r'eyebrow="[^"]*"', text))
