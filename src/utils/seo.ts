import { COMPANY_DATA } from '@/data/company';
import type { ProductItem } from '@/data/products';

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': 'https://www.beissbarth-service.pl/#localbusiness',
    'name': `${COMPANY_DATA.name} - Beissbarth Serwis Bydgoszcz`,
    'legalName': COMPANY_DATA.legalAddress.companyName,
    'description': `${COMPANY_DATA.tagline}. Geometria 3D, linie diagnostyczne SKP, wyważarki, demontażownice kół oraz serwis klimatyzacji Valeo. Siedziba i magazyn: Lisi Ogon k. Bydgoszczy.`,
    'url': 'https://www.beissbarth-service.pl',
    'telephone': COMPANY_DATA.phones.mainFax.display,
    'email': COMPANY_DATA.email,
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
  };
}

export function getProductJsonLd(product: ProductItem, categoryName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.shortDescription,
    'category': categoryName || product.categorySlug,
    'brand': {
      '@type': 'Brand',
      'name': 'Beissbarth',
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'PLN',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': COMPANY_DATA.name,
      },
    },
  };
}
