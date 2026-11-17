import json

with open('d:/home/strony/diagnostyka-systems/docs/ref/products_analysis.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Categories assignment mapping based on URL and title
# 1. Nowości:
#    - tester-ustawienia-swiatel-beissbarth-mld-815-77-86-detail (Q.Lign T.41)
# 2. Wyważarki do kół:
#    - wywazarka-beissbarth-mt-zero-6-lcd-aw-detail (G20)
#    - wywazarka-beissbarth-mt-zero-6-touch-awlp-detail (G30)
#    - wywazarka-beissbarth-mt-zero-6-lcd-awl-detail (G30P)
#    - wywazarka-beissbarth-mt-zero-6-lcd-awlp-detail (G50)
#    - wywazarka-beissbarth-mt-zero-6-touch-awl-detail (G60 P Pro)
# 3. Demontażownice:
#    - ms-500-demontazownica-beissbarth-serii-g-frame-detail (TC 22)
#    - ms-530-demontazownica-beissbarth-serii-g-frame-detail (TC 22 PRO)
#    - ms-530-v1-demontazownica-beissbarth-serii-g-frame-detail (TC 45 PRO)
#    - ms-630-demontazownica-beissbarth-serii-g-frame-detail (TC 45 Pro 2)
#    - ms-630-v1-demontazownica-beissbarth-serii-g-frame-detail (TC 47 L Pro 2)
# 4. Geometria:
#    - ml-1800-8r (ML 8 ROC)
#    - ml-easy-3d (ML EASY 3D / Easy CCD Excellence)
#    - geometria-beissbarth-ml-8-r-tech-awb-detail (ML 8 R TECH AWB / Q.Lign 3D Compact)
# 5. Linie diagnostyczne:
#    - linia-diagnostyczna-beissbarth-sl-640-detail (SL 640)
#    - linia-diagnostyczna-beissbarth-sl-600-detail (SL 600)
# 6. Produkty używane:
#    - geometria-beissbarth-ml-1800-8r2017-01-13-08-15-53_-detail (ML 1800-8R Używana)
#    - geometria-beissbarth-microline-4000-windows-detail (Microline 4000)
#    - geometria-beissbarth-microline-4600-detail (Microline 4600)
#    - linia-diagnostyczna-beissbarth-stl-7000-detail (STL 7000)
# 7. Pojazdy ciężarowe:
#    - wywazarka-beissbarth-mt-788-detail (MT 788)
#    - wywazarka-beissbarth-mt-795t-detail (MT 795T)
#    - demontazownica-servomat-ms-70-detail (Servomat MS 70)
#    - demontazownica-beissbarth-ms-75-detail (Servomat MS 75)
#    - demontazownica-servomat-ms-78-detail (Servomat MS 78 - pusta!)
#    - demontazownica-servomat-ms-80-detail (Servomat MS 80)
#    - geometria-ciezarowe/geometria-beissbarth-ml-8-r-tech-awb-detail (ML 8 R TECH AWB ciężarowe / Q.Lign Compact)
# 8. Urządzenia OEM:
#    - VAG (8 produktów): VAS 6279, VAS 6360, VAS 6595, VAS 6602, VAS 6603, VAS 6651, VAS 6767, VAS 6783
#    - Mercedes (5 produktów): ML 81R TECH, ML 81 TECH, MT 848, MT 868ADT, BD 620 PC
#    - BMW (8 produktów): KDS II, Geometria KDS 3D, MT 825D, MT 825D (timestamp), MT 848AD, MT 868ADT (timestamp), MS 65, MS 680
#    - Toyota (2 produkty): EASY 3D OEM, BD 640 Toyota
# 9. Serwis klimatyzacji:
#    - 0 produktów w starym CMS (pusta kategoria na podstronie /produkty/serwis-klimatyzacji.html)

counts = {
    'nowosci': 0,
    'wywazarki-do-kol': 0,
    'demontazownice': 0,
    'geometria': 0,
    'linie-diagnostyczne': 0,
    'produkty-uzywane': 0,
    'pojazdy-ciezarowe': 0,
    'urzadzenia-oem': 0,
    'serwis-klimatyzacji': 0
}

for p in products:
    url = p['url']
    if 'produkty/nowosci' in url:
        counts['nowosci'] += 1
    elif 'produkty/wywazarki-do-kol/' in url and 'pojazdy-ciezarowe' not in url:
        counts['wywazarki-do-kol'] += 1
    elif 'produkty/demontazownice/' in url and 'pojazdy-ciezarowe' not in url:
        counts['demontazownice'] += 1
    elif ('produkty/geometria/' in url or url in ['https://www.beissbarth-service.pl/ml-1800-8r.html', 'https://www.beissbarth-service.pl/ml-easy-3d.html']) and 'pojazdy-ciezarowe' not in url and 'produkty-uzywane' not in url:
        counts['geometria'] += 1
    elif 'produkty/linie-diagnostyczne/' in url and 'produkty-uzywane' not in url:
        counts['linie-diagnostyczne'] += 1
    elif 'produkty/produkty-uzywane/' in url:
        counts['produkty-uzywane'] += 1
    elif 'produkty/pojazdy-ciezarowe/' in url:
        counts['pojazdy-ciezarowe'] += 1
    elif 'produkty/urzadzenia-dla-marki/' in url:
        counts['urzadzenia-oem'] += 1
    elif 'produkty/serwis-klimatyzacji' in url:
        counts['serwis-klimatyzacji'] += 1

print("Liczba produktów wg kategorii w starym CMS:")
for k, v in counts.items():
    print(f"  - {k}: {v}")
print(f"SUMA: {sum(counts.values())}")
