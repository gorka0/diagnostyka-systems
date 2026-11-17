import json

with open('d:/home/strony/diagnostyka-systems/docs/ref/products_analysis.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    lines = p['cleaned_lines']
    has_tech = any('Dane techniczne' in l or 'DANE TECHNICZNE' in l or 'Parametry' in l for l in lines)
    if has_tech:
        idx = [i for i, l in enumerate(lines) if 'Dane techniczne' in l or 'DANE TECHNICZNE' in l or 'Parametry' in l][0]
        print(f"=== {p['slug']} ===")
        print('\n'.join(lines[idx:idx+12]))
        print()
