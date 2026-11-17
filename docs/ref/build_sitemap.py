import json
from datetime import datetime

with open('d:/home/strony/diagnostyka-systems/src/data/products.ts', 'r', encoding='utf-8') as f:
    p_content = f.read()
start = p_content.find('export const PRODUCTS_DATA: ProductItem[] = ') + len('export const PRODUCTS_DATA: ProductItem[] = ')
end = p_content.rfind(';')
products = json.loads(p_content[start:end].strip())

with open('d:/home/strony/diagnostyka-systems/src/data/categories.ts', 'r', encoding='utf-8') as f:
    c_content = f.read()

# Extract category slugs
cat_slugs = [
    'wywazarki-do-kol',
    'demontazownice',
    'geometria',
    'linie-diagnostyczne',
    'urzadzenia-oem',
    'serwis-klimatyzacji',
    'pojazdy-ciezarowe',
    'produkty-uzywane',
    'nowosci'
]

today = datetime.now().strftime('%Y-%m-%d')
base_url = 'https://www.beissbarth-service.pl'

urls = [
    # Główne podstrony
    {'loc': f"{base_url}/", 'priority': '1.0', 'changefreq': 'weekly'},
    {'loc': f"{base_url}/o-nas", 'priority': '0.8', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/oferta", 'priority': '0.9', 'changefreq': 'weekly'},
    {'loc': f"{base_url}/produkty", 'priority': '0.9', 'changefreq': 'weekly'},
    {'loc': f"{base_url}/urzadzenia-oem", 'priority': '0.85', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/produkty-uzywane", 'priority': '0.85', 'changefreq': 'weekly'},
    {'loc': f"{base_url}/serwis", 'priority': '0.9', 'changefreq': 'weekly'},
    {'loc': f"{base_url}/serwis/zgloszenie", 'priority': '0.85', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/realizacje", 'priority': '0.75', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/publikacje", 'priority': '0.75', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/publikacje/rentownosc-ogumienia", 'priority': '0.7', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/publikacje/vademecum-warsztatu-samochodowego", 'priority': '0.7', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/kontakt", 'priority': '0.9', 'changefreq': 'monthly'},
    {'loc': f"{base_url}/polityka-prywatnosci", 'priority': '0.3', 'changefreq': 'yearly'},
]

# Kategorie
for c in cat_slugs:
    urls.append({
        'loc': f"{base_url}/produkty/{c}",
        'priority': '0.8',
        'changefreq': 'weekly'
    })

# Produkty
for p in products:
    urls.append({
        'loc': f"{base_url}/produkty/{p['categorySlug']}/{p['slug']}",
        'priority': '0.75',
        'changefreq': 'monthly'
    })

# Generate sitemap.xml
xml = ['<?xml version="1.0" encoding="UTF-8"?>']
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
for u in urls:
    xml.append('  <url>')
    xml.append(f"    <loc>{u['loc']}</loc>")
    xml.append(f"    <lastmod>{today}</lastmod>")
    xml.append(f"    <changefreq>{u['changefreq']}</changefreq>")
    xml.append(f"    <priority>{u['priority']}</priority>")
    xml.append('  </url>')
xml.append('</urlset>')

with open('d:/home/strony/diagnostyka-systems/public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml) + '\n')

# Generate robots.txt
robots_txt = f"""# Robots.txt for Diagnostyka-Systems s.c. (beissbarth-service.pl)
User-agent: *
Allow: /
Disallow: /api/
Disallow: /server/

Sitemap: {base_url}/sitemap.xml
"""

with open('d:/home/strony/diagnostyka-systems/public/robots.txt', 'w', encoding='utf-8') as f:
    f.write(robots_txt)

print(f"Generated public/sitemap.xml with {len(urls)} URLs and public/robots.txt!")
