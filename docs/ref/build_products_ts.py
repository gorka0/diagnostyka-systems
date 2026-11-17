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
    'Certyfikaty', 'Partnerzy', 'O Firmie', 'Oferta', 'Jesteś tutaj:', 'Powrót do: Produkty używane',
    'Powrót do: Urządzenia OEM', 'Powrót do: Urządzenia Beissbarth dla samochodów ciężarowych'
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

# Let's map categories
def get_category_slug(url):
    if 'produkty/nowosci' in url:
        return 'nowosci'
    elif 'produkty/wywazarki-do-kol/' in url and 'pojazdy-ciezarowe' not in url:
        return 'wywazarki-do-kol'
    elif 'produkty/demontazownice/' in url and 'pojazdy-ciezarowe' not in url:
        return 'demontazownice'
    elif ('produkty/geometria/' in url or url in ['https://www.beissbarth-service.pl/ml-1800-8r.html', 'https://www.beissbarth-service.pl/ml-easy-3d.html']) and 'pojazdy-ciezarowe' not in url and 'produkty-uzywane' not in url:
        return 'geometria'
    elif 'produkty/linie-diagnostyczne/' in url and 'produkty-uzywane' not in url:
        return 'linie-diagnostyczne'
    elif 'produkty/produkty-uzywane/' in url:
        return 'produkty-uzywane'
    elif 'produkty/pojazdy-ciezarowe/' in url:
        return 'pojazdy-ciezarowe'
    elif 'produkty/urzadzenia-dla-marki/' in url:
        return 'urzadzenia-oem'
    elif 'produkty/serwis-klimatyzacji' in url:
        return 'serwis-klimatyzacji'
    return 'inne'

products = []

for url, title, body in pages:
    is_detail = '-detail' in url or url in [
        'https://www.beissbarth-service.pl/ml-1800-8r.html',
        'https://www.beissbarth-service.pl/ml-easy-3d.html'
    ]
    if not is_detail:
        continue

    slug = url.split('/')[-1].replace('.html', '')
    cat_slug = get_category_slug(url)
    cleaned = clean_lines(body)

    # Clean title
    clean_title = title
    if ' : ' in clean_title:
        clean_title = clean_title.split(' : ')[-1].strip()
    clean_title = clean_title.replace(' - Beissbarth Service', '').strip()

    # Extract specs and accessories
    tech_specs = {}
    accessories = []
    description_lines = []
    
    in_tech = False
    in_acc = False
    in_config = False

    i = 0
    while i < len(cleaned):
        line = cleaned[i]
        
        # Check headings
        if any(h in line for h in ['Dane techniczne', 'PARAMETRY TECHNICZNE', 'MIERZONE PARAMETRY', 'Dane techniczne:']):
            in_tech = True
            in_acc = False
            in_config = False
            i += 1
            continue
        elif any(h in line for h in ['Wyposażenie dodatkowe', 'Opis dodatkowych akcesoriów', 'Zalecane wyposażenie']):
            in_tech = False
            in_acc = True
            in_config = False
            i += 1
            continue
        elif line == 'Konfiguracja' or line == 'Wyposażenie:':
            in_config = True
            in_tech = False
            in_acc = False
            i += 1
            continue
            
        if in_tech:
            # Parse key-value if contains ':' or '-'
            if ':' in line:
                parts = line.split(':', 1)
                k = parts[0].strip()
                v = parts[1].strip()
                if k and v:
                    tech_specs[k] = v
                elif k:
                    # check next line
                    if i + 1 < len(cleaned) and ':' not in cleaned[i+1]:
                        tech_specs[k] = cleaned[i+1]
                        i += 1
            elif ' - ' in line:
                parts = line.split(' - ', 1)
                tech_specs[parts[0].strip()] = parts[1].strip()
            else:
                # single line spec
                tech_specs[f"Parametr {len(tech_specs)+1}"] = line
        elif in_acc:
            # Check if this line looks like part of a table (Description, quantity, catalog number)
            # Example lines:
            # Moduł zdalnego sterowania (pilot/odbiornik)
            # 1x
            # 932.501.064
            # Or single line
            if line not in ['Opis', 'Zalecana ilość', 'Zalecana', 'ilość', 'No', 'No.', 'Numer katalogowy']:
                # Look ahead for quantity and catalog number
                acc_name = line
                qty = ""
                cat_no = ""
                if i + 1 < len(cleaned) and ('x' in cleaned[i+1] or cleaned[i+1].isdigit()):
                    qty = cleaned[i+1]
                    i += 1
                    if i + 1 < len(cleaned) and (any(c.isdigit() for c in cleaned[i+1])):
                        cat_no = cleaned[i+1]
                        i += 1
                elif i + 1 < len(cleaned) and (re.match(r'^\d{3}\.\d{3}\.\d{3}$', cleaned[i+1])):
                    cat_no = cleaned[i+1]
                    i += 1
                accessories.append({
                    'name': acc_name,
                    'quantity': qty,
                    'catalogNumber': cat_no,
                    'isOptional': True
                })
        elif in_config:
            if line not in ['Opis', 'Zalecana ilość', 'Zalecana', 'ilość', 'No', 'No.', 'Numer katalogowy']:
                acc_name = line
                qty = ""
                cat_no = ""
                if i + 1 < len(cleaned) and ('x' in cleaned[i+1] or cleaned[i+1].isdigit()):
                    qty = cleaned[i+1]
                    i += 1
                    if i + 1 < len(cleaned) and (any(c.isdigit() for c in cleaned[i+1])):
                        cat_no = cleaned[i+1]
                        i += 1
                accessories.append({
                    'name': acc_name,
                    'quantity': qty,
                    'catalogNumber': cat_no,
                    'isOptional': False
                })
        else:
            description_lines.append(line)
        i += 1

    # Short description
    short_desc = description_lines[0] if description_lines else clean_title
    if len(description_lines) > 1 and len(short_desc) < 40:
        short_desc = description_lines[1]

    has_full_data = len(cleaned) > 3

    # Notes on discrepancies
    notes = None
    if slug == 'demontazownica-servomat-ms-78-detail':
        notes = 'Pusta karta produktu w starym CMS - brak parametrów i opisu.'
    elif slug == 'geometria-beissbarth-ml-8-r-tech-awb-detail':
        notes = 'Niespójność w starym CMS: tytuł i URL to ML 8 R TECH AWB, lecz treść opisuje Q.Lign 3D Compact.'
    elif slug == 'tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail':
        notes = 'Niespójność w starym CMS: URL testera świateł MLD 815 zawierał opis geometrii Q.Lign T.41.'
    elif cat_slug == 'urzadzenia-oem':
        notes = 'Produkt OEM w starym CMS zawierał wyłącznie nazwę modelu bez specyfikacji technicznej.'
    elif '2013-06-24' in slug or '2017-01-13' in slug:
        notes = 'Zdublowany rekord w bazie CMS z datą/timestampem w adresie URL.'

    products.append({
        'slug': slug,
        'categorySlug': cat_slug,
        'name': clean_title,
        'shortDescription': short_desc,
        'details': description_lines,
        'technicalSpecs': tech_specs,
        'accessories': accessories,
        'hasFullData': has_full_data,
        'originalUrl': url,
        'notes': notes
    })

print(f"Wygenerowano {len(products)} ustrukturyzowanych produktów.")

ts_content = f"""/**
 * Katalog produktów Diagnostyka-Systems s.c.
 * Źródło: wyekstrahowane 1:1 ze starej bazy wiedzy www.beissbarth-service.pl (86 podstron).
 * Żadne dane nie zostały dopisane z głowy.
 */

export interface ProductAccessory {{
  name: string;
  quantity?: string;
  catalogNumber?: string;
  isOptional?: boolean;
}}

export interface ProductItem {{
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  details: string[];
  technicalSpecs: Record<string, string>;
  accessories: ProductAccessory[];
  hasFullData: boolean;
  originalUrl: string;
  notes?: string | null;
}}

export const PRODUCTS_DATA: ProductItem[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open('d:/home/strony/diagnostyka-systems/src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("src/data/products.ts został zapisany.")
