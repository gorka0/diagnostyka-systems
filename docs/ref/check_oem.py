import json
with open('d:/home/strony/diagnostyka-systems/src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
start = content.find('export const PRODUCTS_DATA: ProductItem[] = ') + len('export const PRODUCTS_DATA: ProductItem[] = ')
end = content.rfind(';')
data = json.loads(content[start:end].strip())

cats = {}
for p in data:
    c = p['categorySlug']
    cats.setdefault(c, []).append(p['originalUrl'])

for c, urls in cats.items():
    print(f"Category: {c} ({len(urls)})")
    for u in urls[:3]:
        print("  ", u)
