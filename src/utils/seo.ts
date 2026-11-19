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
    'description': `${COMPANY_DATA.tagline}. Kompleksowe wyposażenie i autoryzowany serwis SKP, ASO oraz warsztatów mechanicznych i oponiarskich w Polsce. Geometria 3D, linie diagnostyczne, wyważarki, demontażownice kół oraz serwis klimatyzacji Valeo.`,
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
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
    'priceRange': '$$$',
    'knowsAbout': [
      'Beissbarth',
      'Valeo ClimFill',
      'Geometria kół 3D',
      'Linie diagnostyczne SKP',
      'Rolkowe stanowiska hamulcowe',
      'Wyważarki do kół',
      'Montażownice opon z ramą G-Frame',
      'Kalibracje okresowe ITS i TDT',
      'Oryginalne części zamienne Beissbarth',
    ],
  };
}

export function getProductJsonLd(product: ProductItem, categoryName?: string) {
  const photoUrl = `${BASE_URL}/images/${product.slug}.jpg`;
  const productUrl = `${BASE_URL}/produkty/${product.categorySlug}/${product.slug}`;

  return {
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
    'offers': {
      '@type': 'Offer',
      'url': productUrl,
      'priceCurrency': 'PLN',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': COMPANY_DATA.name,
        'url': BASE_URL,
      },
    },
  };
}

export function getAboutJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'O firmie Diagnostyka-Systems s.c.',
    'url': `${BASE_URL}/o-nas`,
    'description': 'Historia firmy Diagnostyka-Systems od 2004 r. Autoryzacja fabryczna Beissbarth GmbH od 2005 r., certyfikaty ITS dla SKP, autoryzacja serwisu klimatyzacji Valeo.',
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
    'description': 'Serwis gwarancyjny i pogwarancyjny Beissbarth i Valeo, okresowe kalibracje dla SKP pod wymogi TDT, remonty kapitalne geometrii oraz magazyn części zamiennych w Lisim Ogonie.',
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
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
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

export function getCollectionJsonLd(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`,
  };
}
