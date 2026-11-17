import re
import json

with open('d:/home/strony/diagnostyka-systems/docs/baza_wiedzy.md', 'r', encoding='utf-8') as f:
    content = f.read()

raw_sections = content.split('# URL:')

sections = []
for s in raw_sections[1:]:
    lines = s.strip().split('\n')
    url = lines[0].strip()
    title = ''
    body_lines = []
    if len(lines) > 1 and lines[1].startswith('## Tytuł:'):
        title = lines[1].replace('## Tytuł:', '').strip()
        body_lines = lines[2:]
    else:
        body_lines = lines[1:]
    
    while body_lines and (body_lines[-1].strip() == '---' or not body_lines[-1].strip()):
        body_lines.pop()
        
    sections.append({
        'url': url,
        'title': title,
        'body': '\n'.join(body_lines)
    })

print(f'Total pages parsed: {len(sections)}')

categories = {
    'home': [],
    'about': [],
    'offer': [],
    'service': [],
    'realizations': [],
    'publications': [],
    'products_nowosci': [],
    'products_wywazarki': [],
    'products_demontazownice': [],
    'products_geometria': [],
    'products_klimatyzacja': [],
    'products_linie': [],
    'products_oem': [],
    'products_ciezarowe': [],
    'products_uzywane': [],
    'products_inne': [],
    'other': []
}

for s in sections:
    url = s['url']
    if url == 'https://www.beissbarth-service.pl/':
        categories['home'].append(s)
    elif '/o-nas' in url:
        categories['about'].append(s)
    elif '/oferta' in url:
        categories['offer'].append(s)
    elif '/serwis' in url:
        categories['service'].append(s)
    elif '/realizacje' in url:
        categories['realizations'].append(s)
    elif '/publikacje' in url:
        categories['publications'].append(s)
    elif '/produkty/nowosci' in url:
        categories['products_nowosci'].append(s)
    elif '/produkty/wywazarki' in url:
        categories['products_wywazarki'].append(s)
    elif '/produkty/demontazownice' in url:
        categories['products_demontazownice'].append(s)
    elif '/produkty/geometria' in url:
        categories['products_geometria'].append(s)
    elif '/produkty/serwis-klimatyzacji' in url:
        categories['products_klimatyzacja'].append(s)
    elif '/produkty/linie-diagnostyczne' in url:
        categories['products_linie'].append(s)
    elif '/produkty/urzadzenia-dla-marki' in url:
        categories['products_oem'].append(s)
    elif '/produkty/pojazdy-ciezarowe' in url:
        categories['products_ciezarowe'].append(s)
    elif '/produkty/produkty-uzywane' in url:
        categories['products_uzywane'].append(s)
    elif '/produkty' in url:
        categories['products_inne'].append(s)
    else:
        categories['other'].append(s)

for cat, items in categories.items():
    print(f'{cat}: {len(items)} podstron')
