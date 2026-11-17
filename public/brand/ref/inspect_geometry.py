import json

with open('d:/home/strony/diagnostyka-systems/docs/ref/products_analysis.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    if any(k in p['slug'] for k in ['ml-', 'qlign', 'microline', 'tester']):
        print(f"=== {p['slug']} ({p['title']}) ===")
        print('\n'.join(p['cleaned_lines']))
        print()
