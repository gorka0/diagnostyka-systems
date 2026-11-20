import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS_DATA, ProductItem } from '@/data/products';
import { getCollectionJsonLd } from '@/utils/seo';
import {
  extractProductMetadata,
  matchesProductSearch,
  ProductMetadata,
} from '@/data/catalog-rules';
import { ArrowLeft, ArrowRight, LayoutGrid, List, SlidersHorizontal, Search, X } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { kategoria } = useParams<{ kategoria: string }>();
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = useMemo(() => {
    return PRODUCT_CATEGORIES.find((c) => c.slug === kategoria);
  }, [kategoria]);

  const categoryProductsWithMeta = useMemo(() => {
    if (!kategoria) return [];
    return PRODUCTS_DATA.filter((p) => p.categorySlug === kategoria).map((product) => ({
      product,
      meta: extractProductMetadata(product),
    }));
  }, [kategoria]);

  const subcategories = useMemo(() => {
    if (!category?.subcategories) return [];
    return category.subcategories;
  }, [category]);

  const filteredProducts = useMemo(() => {
    return categoryProductsWithMeta.filter(({ product, meta }) => {
      // 1. Wyszukiwarka tekstowa
      if (searchQuery && !matchesProductSearch(product, meta, searchQuery)) {
        return false;
      }

      // 2. Podkategoria
      if (activeSubcategory === 'all') return true;

      if (product.subcategory) return product.subcategory === activeSubcategory;
      const subLower = activeSubcategory.toLowerCase();
      if (subLower.includes('wyważarki')) {
        return (
          meta.typ === 'Wyważarka do kół' ||
          product.name.toLowerCase().includes('wyważarka') ||
          product.originalUrl.includes('wywazarki')
        );
      }
      if (subLower.includes('demontażownice')) {
        return (
          meta.typ === 'Demontażownica' ||
          product.name.toLowerCase().includes('demontażownica') ||
          product.originalUrl.includes('demontazownice')
        );
      }
      if (subLower.includes('geometria')) {
        return (
          meta.typ === 'Geometria kół' ||
          product.name.toLowerCase().includes('geometria') ||
          product.originalUrl.includes('geometria')
        );
      }
      return (
        product.name.toLowerCase().includes(subLower) ||
        product.shortDescription.toLowerCase().includes(subLower)
      );
    });
  }, [categoryProductsWithMeta, activeSubcategory, searchQuery]);

  if (!category) {
    return (
      <div className="bg-background min-h-[80vh] py-16">
        <Container>
          <div className="bg-background-subtle border border-surface-border rounded-[14px] p-12 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Kategoria nie została odnaleziona
            </h1>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Kategoria o podanym adresie nie figuruje w katalogu.
            </p>
            <Button to="/produkty" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do katalogu produktów
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Renderowanie karty siatki (Grid)
  const renderGridCard = ({ product, meta }: { product: ProductItem; meta: ProductMetadata }) => {
    const isContain = meta.imageFit === 'contain';
    const isUsed = meta.stan === 'używane';

    return (
      <Link
        key={product.slug}
        to={`/produkty/${category.slug}/${product.slug}`}
        className="group flex flex-col bg-background border border-surface-border rounded-[10px] overflow-hidden hover:border-accent transition-all duration-150 hover:shadow-sm"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '360px' }}
      >
        <div className="relative aspect-square w-full bg-[#F7F7F5] overflow-hidden flex items-center justify-center p-4">
          <SiteImage
            name={product.slug}
            alt={product.name}
            aspectRatio="1/1"
            fit={isContain ? 'contain' : 'cover'}
            plain={true}
            loading="lazy"
            className={`w-full h-full ${
              isContain
                ? 'object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105'
                : 'object-cover transition-transform duration-200 group-hover:scale-105'
            }`}
          />

          {isUsed && (
            <span className="absolute top-2.5 left-2.5 bg-neutral-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
              Używane
            </span>
          )}

          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-surface-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shadow-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between gap-2 border-t border-surface-border bg-background">
          <div>
            <h4
              className="text-[15px] sm:text-[16px] font-semibold text-foreground tracking-tight leading-snug line-clamp-2 group-hover:text-accent-text transition-colors"
              title={product.name}
            >
              {meta.model}
            </h4>
            <p className="text-[12px] text-foreground-secondary mt-1 truncate">
              {meta.typ ? `${meta.typ}` : ''}
              {meta.typ && meta.seria ? ' · ' : ''}
              {meta.seria ? `${meta.seria}` : ''}
              {!meta.typ && !meta.seria && meta.oemBrand ? `OEM · ${meta.oemBrand}` : ''}
            </p>
          </div>
          {product.priceNetto && (
            <div className="pt-2 border-t border-surface-border/60 flex items-baseline justify-between">
              <span className="text-[11px] font-medium text-foreground-secondary uppercase tracking-wider">Cena</span>
              <span className="text-[13px] font-mono font-bold text-foreground">
                {product.priceNetto}
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  };

  // Renderowanie wiersza listy (List)
  const renderListRow = ({ product, meta }: { product: ProductItem; meta: ProductMetadata }) => {
    const isContain = meta.imageFit === 'contain';
    const isUsed = meta.stan === 'używane';

    return (
      <Link
        key={product.slug}
        to={`/produkty/${category.slug}/${product.slug}`}
        className="group flex items-center justify-between py-2 sm:py-2.5 px-3 sm:px-4 bg-background border border-surface-border rounded-[8px] hover:border-accent hover:bg-background-subtle hover:shadow-2xs transition-all duration-150"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '64px' }}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
          {/* Bezpośrednie zdjęcie bez zbędnego kontenera-matrioszki */}
          <SiteImage
            name={product.slug}
            alt={product.name}
            aspectRatio="1/1"
            fit={isContain ? 'contain' : 'cover'}
            plain={true}
            loading="lazy"
            className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 mix-blend-multiply transition-transform duration-150 group-hover:scale-105 ${
              isContain ? 'object-contain' : 'object-cover'
            }`}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[14px] sm:text-[15px] font-semibold text-foreground truncate group-hover:text-accent-text transition-colors leading-snug">
                {meta.model}
              </h4>
              {isUsed && (
                <span className="bg-neutral-900 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase shrink-0">
                  Używane
                </span>
              )}
            </div>
            <p className="text-[12px] sm:text-[13px] text-foreground-secondary truncate mt-0.5">
              {meta.typ ? `${meta.typ}` : ''}
              {meta.typ && meta.seria ? ' · ' : ''}
              {meta.seria ? `${meta.seria}` : ''}
              {!meta.typ && !meta.seria && meta.oemBrand ? `OEM · ${meta.oemBrand}` : ''}
            </p>
          </div>
        </div>

        {/* Prawa strona: cena + strzałka */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3 pl-2">
          {product.priceNetto && (
            <span className="text-[11px] sm:text-[13px] font-mono font-bold text-foreground text-right whitespace-nowrap">
              {product.priceNetto}
            </span>
          )}
          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-foreground-secondary group-hover:text-accent-text group-hover:translate-x-0.5 transition-all">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title={`${category.name} | Urządzenia Beissbarth – Diagnostyka-Systems`}
        description={category.description}
        canonicalPath={`/produkty/${category.slug}`}
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Katalog produktów', path: '/produkty' },
          { label: category.name, path: `/produkty/${category.slug}` },
        ]}
        jsonLd={getCollectionJsonLd(
          category.name,
          category.description,
          `/produkty/${category.slug}`,
          categoryProductsWithMeta.map(({ product }) => ({
            name: product.name,
            url: `/produkty/${category.slug}/${product.slug}`,
            image: `/images/${product.slug}.jpg`,
          }))
        )}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Katalog', to: '/produkty' },
          { label: category.name },
        ]}
        title={category.name}
        description={category.description}
        badge="Kategoria urządzeń"
      />

      {/* Pasek narzędziowy: podkategorie, wyszukiwarka, widok siatka/lista */}
      <div className="border-b border-surface-border bg-background sticky top-[72px] z-20 py-3 shadow-xs">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Pigułki podkategorii (jeśli istnieją) */}
            {subcategories.length > 0 ? (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  type="button"
                  onClick={() => setActiveSubcategory('all')}
                  className={`min-h-[38px] px-3.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors flex items-center ${
                    activeSubcategory === 'all'
                      ? 'bg-foreground text-background border-foreground font-semibold'
                      : 'bg-background border-surface-border text-foreground hover:bg-surface-hover'
                  }`}
                >
                  Wszystkie ({categoryProductsWithMeta.length})
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setActiveSubcategory(sub)}
                    className={`min-h-[38px] px-3.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors flex items-center ${
                      activeSubcategory === sub
                        ? 'bg-accent text-white border-accent font-semibold'
                        : 'bg-background border-surface-border text-foreground hover:bg-surface-hover'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-foreground-secondary font-mono">
                Liczba pozycji:{' '}
                <strong className="text-foreground">{categoryProductsWithMeta.length}</strong>
              </div>
            )}

            {/* Prawa strona paska narzędziowego */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              {/* Szybka wyszukiwarka w kategorii */}
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtruj w kategorii..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-background border border-surface-border rounded-md text-foreground placeholder:text-foreground-secondary focus:outline-none focus:border-accent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Przełącznik Siatka / Lista */}
              <div className="flex items-center border border-surface-border rounded-md overflow-hidden bg-background">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title="Widok siatki"
                  className={`p-1.5 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-foreground text-background'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  title="Widok listy"
                  className={`p-1.5 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-foreground text-background'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Link do pełnego katalogu z parametrem tej kategorii */}
              <Link
                to={`/produkty?kat=${category.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-accent-text hover:text-accent border border-accent/20 bg-primary-soft rounded-md transition-colors"
                title="Przejdź do pełnego katalogu z filtrami fasetowymi"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Zaawansowane filtry</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Główna zawartość z siatką / listą */}
      <Container className="py-10 sm:py-14">
        {filteredProducts.length === 0 ? (
          <div className="bg-background-subtle border border-surface-border rounded-[14px] p-10 text-center max-w-lg mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Brak urządzeń w tym widoku
            </h2>
            <p className="text-sm text-foreground-secondary mb-6">
              Nie znaleziono maszyn dla wybranego filtra. Skontaktuj się z nami w celu potwierdzenia
              dostępności.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveSubcategory('all');
                  setSearchQuery('');
                }}
              >
                Resetuj filtry
              </Button>
              <Button
                to={`/kontakt?typ=oferta&produkt=${encodeURIComponent(category.name)}`}
                variant="primary"
                size="sm"
              >
                Zapytaj o urządzenia
              </Button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(renderGridCard)}
          </div>
        ) : (
          <div className="flex flex-col space-y-2">{filteredProducts.map(renderListRow)}</div>
        )}

        {/* Dolna belka nawigacji powrotnej */}
        <div className="mt-12 pt-6 border-t border-surface-border flex items-center justify-between">
          <Link
            to="/produkty"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wróć do pełnego katalogu urządzeń
          </Link>
          <Link
            to={`/kontakt?typ=oferta&produkt=${encodeURIComponent(category.name)}`}
            className="text-sm font-semibold text-accent-text hover:underline"
          >
            Skonsultuj dobór maszyny z doradcą →
          </Link>
        </div>
      </Container>
    </div>
  );
};