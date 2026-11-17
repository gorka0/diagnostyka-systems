import re
import json

with open('d:/home/strony/diagnostyka-systems/docs/baza_wiedzy.md', 'r', encoding='utf-8') as f:
    text = f.read()

pages = re.findall(r'# URL: ([^\n]+)\n## Tytuł: ([^\n]+)\n\n(.*?)(?=\n---\n|\Z)', text, re.DOTALL)

BOILERPLATE = [
    'Produkty', 'Nowości', 'Wyważarki do kół', 'Demontażownice', 'Geometria',
    'Linie diagnostyczne', 'Urządzenia OEM', 'Produkty używane', 'Diagnostyka-Systems s.c.',
    'ul. Potulicka 38', '86-065 Lisi Ogon /koło Bydgoszczy', 'tel./fax +48 52 371 66 22',
    'e-mail:', 'poczta@beissbarth-service.pl', 'Zadaj pytanie o produkt', 'Szczegóły',
    'Serwis klimatyzacji', 'Pojazdy ciężarowe', 'Serwis', 'Realizacje', 'Publikacje', 'Kontakt',
    'Certyfikaty', 'Partnerzy', 'O Firmie', 'Oferta', 'Jesteś tutaj:'
]

def clean_lines(raw_text):
    lines = []
    for line in raw_text.splitlines():
        l = line.strip()
        if not l:
            continue
        if any(l == b or l.startswith(b) for b in BOILERPLATE):
            continue
        lines.append(l)
    return lines

products_analysis = []

for url, title, body in pages:
    slug = url.split('/')[-1].replace('.html', '')
    is_detail = '-detail' in url or url in [
        'https://www.beissbarth-service.pl/ml-1800-8r.html',
        'https://www.beissbarth-service.pl/ml-easy-3d.html'
    ]
    
    if is_detail:
        cleaned = clean_lines(body)
        
        # Check if first line repeats title/category
        content = '\n'.join(cleaned)
        
        products_analysis.append({
            'url': url,
            'slug': slug,
            'title': title,
            'cleaned_lines_count': len(cleaned),
            'cleaned_lines': cleaned
        })

print(f"Total product pages: {len(products_analysis)}")
for p in products_analysis:
    print(f"[{p['slug']}]: lines={p['cleaned_lines_count']}, title={p['title']}")

with open('d:/home/strony/diagnostyka-systems/docs/ref/products_analysis.json', 'w', encoding='utf-8') as f:
    json.dump(products_analysis, f, indent=2, ensure_ascii=False)
