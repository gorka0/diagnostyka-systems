import { COMPANY_DATA } from '@/data/company';
import type { ProductItem } from '@/data/products';
import type { PublicationItem } from '@/data/publications';

const BASE_URL = 'https://www.beissbarth-service.pl';

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${BASE_URL}/#localbusiness`,
    'name': `${COMPANY_DATA.name} - Autoryzowany Dystrybutor i Serwis Beissbarth`,
    'legalName': COMPANY_DATA.legalAddress.companyName,
    'description': `${COMPANY_DATA.tagline}. Siedziba w Lisim Ogonie k. Bydgoszczy i rejestracja w Łochowie (86-065, kujawsko-pomorskie). Kompleksowe wyposażenie i autoryzowany serwis SKP, ASO oraz warsztatów w regionie Bydgoszczy, Łochowa i całej Polski.`,
    'url': BASE_URL,
    'logo': `${BASE_URL}/brand/ds-logo.svg`,
    'image': `${BASE_URL}/images/budynek-firmy-lisi-ogon.jpg`,
    'telephone': COMPANY_DATA.phones.mainFax.display,
    'email': COMPANY_DATA.email,
    'taxID': COMPANY_DATA.legalAddress.nip,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': COMPANY_DATA.officeAddress.street,
      'addressLocality': COMPANY_DATA.officeAddress.city,
      'postalCode': COMPANY_DATA.officeAddress.postalCode,
      'addressRegion': 'kujawsko-pomorskie',
      'addressCountry': 'PL',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 53.1292,
      'longitude': 17.8841,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '16:00',
      },
    ],
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Bydgoszcz',
      },
      {
        '@type': 'Place',
        'name': 'Łochowo',
      },
      {
        '@type': 'Place',
        'name': 'Lisi Ogon',
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'kujawsko-pomorskie',
      },
      {
        '@type': 'Country',
        'name': 'Polska',
      },
    ],
    'priceRange': '$$$',
    'knowsAbout': [
      'Beissbarth',
      'Valeo ClimFill',
      'Geometria kół 3D',
      'Linie diagnostyczne SKP',
      'Rolkowe stanowiska hamulcowe',
      'Wyważarki do kół',
      'Montażownice opon serii TC',
      'Kalibracje okresowe ITS i TDT',
      'Oryginalne części zamienne Beissbarth',
    ],
  };
}

export function getHomepageJsonLd() {
  return [
    getLocalBusinessJsonLd(),
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      'url': BASE_URL,
      'name': 'Diagnostyka-Systems s.c. - Beissbarth Bydgoszcz, Łochowo, Polska',
      'description': 'Autoryzowany dystrybutor i serwis urządzeń diagnostycznych Beissbarth – Lisi Ogon k. Bydgoszczy, Łochowo i cała Polska.',
      'publisher': {
        '@id': `${BASE_URL}/#localbusiness`,
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/produkty?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      'inLanguage': 'pl-PL',
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      'name': COMPANY_DATA.name,
      'legalName': COMPANY_DATA.legalAddress.companyName,
      'url': BASE_URL,
      'logo': `${BASE_URL}/brand/ds-logo.svg`,
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+48 507 073 918',
          'contactType': 'technical support',
          'areaServed': 'PL',
          'availableLanguage': 'Polish',
        },
        {
          '@type': 'ContactPoint',
          'telephone': '+48 507 073 919',
          'contactType': 'sales',
          'areaServed': 'PL',
          'availableLanguage': 'Polish',
        },
      ],
    },
  ];
}

export function getProductJsonLd(product: ProductItem, categoryName?: string) {
  const photoUrl = `${BASE_URL}/images/${product.slug}.jpg`;
  const productUrl = `${BASE_URL}/produkty/${product.categorySlug}/${product.slug}`;

  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.shortDescription || `Oficjalna aparatura diagnostyczna Beissbarth: ${product.name}.`,
    'category': categoryName || product.categorySlug,
    'image': photoUrl,
    'url': productUrl,
    'brand': {
      '@type': 'Brand',
      'name': 'Beissbarth',
    },
  };

  const catalogNo =
    product.technicalSpecs?.['Numer katalogowy'] ||
    product.technicalSpecs?.['Numer katalogowy zestawu'] ||
    product.accessories?.[0]?.catalogNumber;
  if (catalogNo && !catalogNo.includes('zł')) {
    jsonLd.sku = catalogNo.trim();
    jsonLd.mpn = catalogNo.trim();
  }

  // W trybie bez cen (showPrices=false) wycinamy Offer, price i priceCurrency
  if (COMPANY_DATA.showPrices && product.priceNetto) {
    jsonLd.offers = {
      '@type': 'Offer',
      'url': productUrl,
      'priceCurrency': 'PLN',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': COMPANY_DATA.name,
        'url': BASE_URL,
      },
    };
  }

  return jsonLd;
}

export function getAboutJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'O firmie Diagnostyka-Systems s.c.',
    'url': `${BASE_URL}/o-nas`,
    'description': 'Historia firmy Diagnostyka-Systems od 2004 r. (Lisi Ogon k. Bydgoszczy, Łochowo). Autoryzacja fabryczna Beissbarth GmbH od 2005 r., certyfikaty ITS dla SKP, serwis klimatyzacji Valeo.',
    'mainEntity': {
      '@type': 'Organization',
      'name': COMPANY_DATA.name,
      'foundingDate': '2004',
      'url': BASE_URL,
      'logo': `${BASE_URL}/brand/ds-logo.svg`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': COMPANY_DATA.officeAddress.street,
        'addressLocality': COMPANY_DATA.officeAddress.city,
        'postalCode': COMPANY_DATA.officeAddress.postalCode,
        'addressCountry': 'PL',
      },
    },
  };
}

export function getServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Autoryzowany Serwis Beissbarth i Valeo',
    'serviceType': 'Serwis aparatury diagnostycznej i stacji klimatyzacji',
    'description': 'Serwis gwarancyjny i pogwarancyjny Beissbarth i Valeo dla Bydgoszczy, Łochowa i całej Polski: kalibracje dla SKP pod wymogi TDT, remonty geometrii oraz magazyn części w Lisim Ogonie.',
    'url': `${BASE_URL}/serwis`,
    'provider': {
      '@type': 'AutoRepair',
      'name': COMPANY_DATA.name,
      'telephone': COMPANY_DATA.phones.mainFax.display,
      'url': BASE_URL,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': COMPANY_DATA.officeAddress.street,
        'addressLocality': COMPANY_DATA.officeAddress.city,
        'postalCode': COMPANY_DATA.officeAddress.postalCode,
        'addressCountry': 'PL',
      },
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Bydgoszcz',
      },
      {
        '@type': 'Place',
        'name': 'Łochowo',
      },
      {
        '@type': 'Place',
        'name': 'Lisi Ogon',
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'kujawsko-pomorskie',
      },
      {
        '@type': 'Country',
        'name': 'Polska',
      },
    ],
  };
}

export function getArticleJsonLd(pub: PublicationItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': pub.title,
    'description': pub.summary,
    'datePublished': pub.publicationDate,
    'url': `${BASE_URL}/publikacje/${pub.slug}`,
    'author': {
      '@type': 'Organization',
      'name': 'Diagnostyka-Systems s.c.',
      'url': BASE_URL,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Diagnostyka-Systems s.c.',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/brand/ds-logo.svg`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/publikacje/${pub.slug}`,
    },
  };
}

export function getCollectionJsonLd(
  title: string,
  description: string,
  path: string,
  items?: Array<{ name: string; url: string; image?: string }>
) {
  const collection: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`,
  };

  if (items && items.length > 0) {
    collection.mainEntity = {
      '@type': 'ItemList',
      'numberOfItems': items.length,
      'itemListElement': items.map((it, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': it.name,
        'url': it.url.startsWith('http') ? it.url : `${BASE_URL}${it.url.startsWith('/') ? it.url : '/' + it.url}`,
        ...(it.image
          ? {
              'image': it.image.startsWith('http')
                ? it.image
                : `${BASE_URL}${it.image.startsWith('/') ? it.image : '/' + it.image}`,
            }
          : {}),
      })),
    };
  }

  return collection;
}
