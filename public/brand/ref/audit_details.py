import re
import json

with open('d:/home/strony/diagnostyka-systems/docs/baza_wiedzy.md', 'r', encoding='utf-8') as f:
    text = f.read()

raw_sections = text.split('# URL:')

pages = []
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
        
    pages.append({
        'url': url,
        'title': title,
        'raw_body': '\n'.join(body_lines),
        'lines': body_lines
    })

print(f'Total pages loaded: {len(pages)}')

# Identify repetitive menu/sidebar lines to strip
# Common menu items:
MENU_PATTERNS = [
    'Strona główna - Beissbarth Service',
    'O nas - Beissbarth Service',
    'Produkty',
    'Nowości',
    'Wyważarki do kół',
    'Demontażownice',
    'Geometria',
    'Linie diagnostyczne',
    'Urządzenia OEM',
    'Produkty używane',
    'Diagnostyka-Systems s.c.',
    'ul. Potulicka 38',
    '86-065 Lisi Ogon /koło Bydgoszczy',
    'tel./fax +48 52 371 66 22',
    'e-mail:',
    'poczta@beissbarth-service.pl',
    'Zadaj pytanie o produkt',
    'Szczegóły',
    'Powrót do: Produkty używane',
    'Powrót do: Urządzenia OEM',
    'Powrót do: Urządzenia Beissbarth dla samochodów ciężarowych',
    'Pojazdy ciężarowe',
    'Serwis klimatyzacji',
    'Serwis',
    'Realizacje',
    'Publikacje',
    'Kontakt',
    'Certyfikaty',
    'Partnerzy',
    'O Firmie',
    'Oferta'
]

# Let's inspect product detail pages specifically:
detail_pages = [p for p in pages if '-detail' in p['url'] or p['url'].endswith('.html') and any(k in p['url'] for k in ['ml-1800', 'ml-easy', 'mt-857dt', 'ms-63'])]

print(f'\nTotal detail/machine pages identified: {len(detail_pages)}')

issues = []

for p in detail_pages:
    url = p['url']
    title = p['title']
    body = p['raw_body']
    
    # Clean body by filtering menu header & contact boilerplate
    cleaned_lines = []
    skip_header = True
    for line in p['lines']:
        l = line.strip()
        if not l:
            continue
        # Check if line is boilerplate
        if l in MENU_PATTERNS or any(l.startswith(bp) for bp in ['Diagnostyka-Systems', 'ul. Potulicka', 'tel./fax', 'e-mail:', 'poczta@', '86-065 Lisi']):
            continue
        # Also skip breadcrumb trail if present:
        if l.startswith('Jesteś tutaj:'):
            continue
        cleaned_lines.append(l)
    
    # Check if cleaned_lines is practically empty or only title
    content_text = '\n'.join(cleaned_lines)
    
    # Look for title vs content mismatches
    print(f"\n--- [{url}] ---")
    print(f"Title: {title}")
    print(f"Cleaned lines count: {len(cleaned_lines)}")
    if cleaned_lines:
        print("First 3 clean lines:", cleaned_lines[:3])
        print("Last 2 clean lines:", cleaned_lines[-2:])
    else:
        print("EMPTY CONTENT!")
        issues.append({'url': url, 'title': title, 'type': 'EMPTY_PAGE', 'details': 'Brak jakiejkolwiek treści/opisu na podstronie.'})
    
    # Check for specific inconsistencies
    if 'ms-78' in url:
        issues.append({'url': url, 'title': title, 'type': 'EMPTY_PAGE', 'details': 'Podstrona demontażownicy MS 78 nie posiada opisu ani danych technicznych.'})
    if 'ml-8-r-tech-awb' in url:
        issues.append({'url': url, 'title': title, 'type': 'CONTENT_MISMATCH', 'details': 'Tytuł i URL wskazują na Geometria ML 8 R TECH AWB, lecz treść zawiera opis Q.Lign Compact.'})
    if 'tester-ustawienia-swiatel-beissbarth-mld-815-77-86' in url:
        issues.append({'url': url, 'title': title, 'type': 'URL_TITLE_MISMATCH', 'details': 'URL zawiera "tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail.html", ale tytuł i treść to "Urządzenie do pomiaru geometrii Q.Lign T.41".'})
    if '2013-06-24' in url or '2017-01-13' in url:
        issues.append({'url': url, 'title': title, 'type': 'DUPLICATE_URL_TIMESTAMP', 'details': f'Zdublowany wpis w CMS z timestampem w URL: {url}'})

with open('d:/home/strony/diagnostyka-systems/docs/ref/detail_audit.json', 'w', encoding='utf-8') as f:
    json.dump({'total_details': len(detail_pages), 'issues': issues}, f, indent=2, ensure_ascii=False)

print(f"\nWstępna liczba zgłoszonych wątpliwości: {len(issues)}")
