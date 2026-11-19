import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

const BASE_URL = 'https://www.beissbarth-service.pl';
const DEFAULT_IMAGE = `${BASE_URL}/images/budynek-firmy-lisi-ogon.jpg`;

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  breadcrumbs,
  jsonLd,
  noindex,
}) => {
  useEffect(() => {
    // 1. Tytuł strony
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta description
    setMeta('name', 'description', description);

    // 3. Robots meta (noindex dla stron z filtrami / wyszukiwaniem)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, follow');
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // 4. Canonical link
    const cleanPath = canonicalPath
      ? canonicalPath.startsWith('/')
        ? canonicalPath
        : '/' + canonicalPath
      : window.location.pathname;
    const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl || `${BASE_URL}/`);

    // 5. OpenGraph
    const fullImageUrl = image
      ? image.startsWith('http')
        ? image
        : `${BASE_URL}${image.startsWith('/') ? image : '/' + image}`
      : DEFAULT_IMAGE;

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl || `${BASE_URL}/`);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Diagnostyka-Systems s.c. - Beissbarth Polska');
    setMeta('property', 'og:locale', 'pl_PL');
    setMeta('property', 'og:image', fullImageUrl);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);

    // 6. Twitter Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImageUrl);

    // 7. Structured Data (JSON-LD)
    const graphItems: any[] = [];

    // Dodanie BreadcrumbList jeśli przekazano
    if (breadcrumbs && breadcrumbs.length > 0) {
      graphItems.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.label,
          ...(crumb.path
            ? {
                item: `${BASE_URL}${crumb.path.startsWith('/') ? crumb.path : '/' + crumb.path}`,
              }
            : {}),
        })),
      });
    }

    // Dodanie przekazanego jsonLd
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        graphItems.push(...jsonLd);
      } else if (jsonLd['@graph']) {
        graphItems.push(...jsonLd['@graph']);
      } else {
        graphItems.push(jsonLd);
      }
    }

    const SCRIPT_ID = 'seo-json-ld';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (graphItems.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      // Jeżeli tylko jeden item i ma już @context, zapisz go wprost, w przeciwnym wypadku stwórz standardowy @graph
      const finalJson =
        graphItems.length === 1 && graphItems[0]['@context']
          ? graphItems[0]
          : {
              '@context': 'https://schema.org',
              '@graph': graphItems.map((item) => {
                const copy = { ...item };
                delete copy['@context'];
                return copy;
              }),
            };
      scriptTag.textContent = JSON.stringify(finalJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const tag = document.getElementById(SCRIPT_ID);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalPath, image, type, breadcrumbs, jsonLd, noindex]);

  return null;
};
