import json

with open('d:/home/strony/diagnostyka-systems/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('export const PRODUCTS_DATA: ProductItem[] = ') + len('export const PRODUCTS_DATA: ProductItem[] = ')
end = content.rfind(';')
data = json.loads(content[start:end].strip())

oem = [p for p in data if p['categorySlug'] == 'urzadzenia-oem']
for p in oem:
    print(f"{p['slug']} | {p['name']} | URL: {p['originalUrl']}")
