import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS_DATA, ProductItem } from '@/data/products';
import { COMPANY_DATA } from '@/data/company';
import { getCollectionJsonLd } from '@/utils/seo';
import {
  extractProductMetadata,
  matchesProductSearch,
  FACET_TYPES,
  FACET_SERIES,
  FACET_APPLICATIONS,
  FACET_CONDITIONS,
  FACET_OEM_BRANDS,
  ProductMetadata,
} from '@/data/catalog-rules';
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  ArrowRight,
  Phone,
  RotateCcw,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parsowanie parametrów z URL
  const queryParam = searchParams.get('q') || '';
  const selectedCategories = useMemo(() => {
    const raw = searchParams.get('kat');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedTypes = useMemo(() => {
    const raw = searchParams.get('typ');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedSeries = useMemo(() => {
    const raw = searchParams.get('seria');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedApplications = useMemo(() => {
    const raw = searchParams.get('zast');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedConditions = useMemo(() => {
    const raw = searchParams.get('stan');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedOemBrands = useMemo(() => {
    const raw = searchParams.get('oem');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const sortOrder = searchParams.get('sort') || 'default';
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  // 8 głównych kategorii (bez syntetycznej "nowosci")
  const mainCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((c) => c.slug !== 'nowosci');
  }, []);

  // Wszystkie produkty z wyliczonymi metadanymi
  const allProductsWithMeta = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug !== 'nowosci').map((product) => ({
      product,
      meta: extractProductMetadata(product),
    }));
  }, []);

  // Skrót klawiszowy '/' do skupienia pola wyszukiwarki
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Blokada scrolla przy otwartym bottom sheet na mobile
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileFiltersOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileFiltersOpen]);

  // Pomocnicza funkcja aktualizacji parametrów w URL
  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (!val) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next, { replace: true });
  };

  const toggleArrayParam = (paramName: string, currentValues: string[], item: string) => {
    const exists = currentValues.includes(item);
    const updated = exists ? currentValues.filter((v) => v !== item) : [...currentValues, item];
    updateParams({ [paramName]: updated.length > 0 ? updated.join(',') : null });
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    queryParam.length > 0 ||
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedSeries.length > 0 ||
    selectedApplications.length > 0 ||
    selectedConditions.length > 0 ||
    selectedOemBrands.length > 0 ||
    sortOrder !== 'default';

  const totalActiveFilterCount =
    (queryParam ? 1 : 0) +
    selectedCategories.length +
    selectedTypes.length +
    selectedSeries.length +
    selectedApplications.length +
    selectedConditions.length +
    selectedOemBrands.length;

  // Filtrowanie produktów
  const filteredProducts = useMemo(() => {
    return allProductsWithMeta.filter(({ product, meta }) => {
      // 1. Wyszukiwarka
      if (queryParam && !matchesProductSearch(product, meta, queryParam)) {
        return false;
      }
      // 2. Kategoria
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.categorySlug)
      ) {
        return false;
      }
      // 3. Typ
      if (selectedTypes.length > 0 && (!meta.typ || !selectedTypes.includes(meta.typ))) {
        return false;
      }
      // 4. Seria
      if (selectedSeries.length > 0 && (!meta.seria || !selectedSeries.includes(meta.seria))) {
        return false;
      }
      // 5. Zastosowanie
      if (
        selectedApplications.length > 0 &&
        !selectedApplications.includes(meta.zastosowanie)
      ) {
        return false;
      }
      // 6. Stan
      if (selectedConditions.length > 0 && !selectedConditions.includes(meta.stan)) {
        return false;
      }
      // 7. Marka OEM
      if (
        selectedOemBrands.length > 0 &&
        (!meta.oemBrand || !selectedOemBrands.includes(meta.oemBrand))
      ) {
        return false;
      }
      return true;
    });
  }, [
    allProductsWithMeta,
    queryParam,
    selectedCategories,
    selectedTypes,
    selectedSeries,
    selectedApplications,
    selectedConditions,
    selectedOemBrands,
  ]);

  // Sortowanie
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOrder === 'name-asc') {
      list.sort((a, b) => a.meta.model.localeCompare(b.meta.model, 'pl'));
    } else if (sortOrder === 'name-desc') {
      list.sort((a, b) => b.meta.model.localeCompare(a.meta.model, 'pl'));
    }
    return list;
  }, [filteredProducts, sortOrder]);

  // Dynamiczne zliczanie opcji facetów (dla aktualnie aktywnych pozostałych filtrów)
  const facetCounts = useMemo(() => {
    // Pomocnik do wyliczania bazy produktów z pominięciem konkretnego wymiaru
    const getBaseFor = (skipDimension: 'cat' | 'typ' | 'seria' | 'zast' | 'stan' | 'oem') => {
      return allProductsWithMeta.filter(({ product, meta }) => {
        if (queryParam && !matchesProductSearch(product, meta, queryParam)) return false;
        if (skipDimension !== 'cat' && selectedCategories.length > 0 && !selectedCategories.includes(product.categorySlug)) return false;
        if (skipDimension !== 'typ' && selectedTypes.length > 0 && (!meta.typ || !selectedTypes.includes(meta.typ))) return false;
        if (skipDimension !== 'seria' && selectedSeries.length > 0 && (!meta.seria || !selectedSeries.includes(meta.seria))) return false;
        if (skipDimension !== 'zast' && selectedApplications.length > 0 && !selectedApplications.includes(meta.zastosowanie)) return false;
        if (skipDimension !== 'stan' && selectedConditions.length > 0 && !selectedConditions.includes(meta.stan)) return false;
        if (skipDimension !== 'oem' && selectedOemBrands.length > 0 && (!meta.oemBrand || !selectedOemBrands.includes(meta.oemBrand))) return false;
        return true;
      });
    };

    const catBase = getBaseFor('cat');
    const categories: Record<string, number> = {};
    mainCategories.forEach((c) => {
      categories[c.slug] = catBase.filter((p) => p.product.categorySlug === c.slug).length;
    });

    const typBase = getBaseFor('typ');
    const types: Record<string, number> = {};
    FACET_TYPES.forEach((t) => {
      types[t] = typBase.filter((p) => p.meta.typ === t).length;
    });

    const seriaBase = getBaseFor('seria');
    const series: Record<string, number> = {};
    FACET_SERIES.forEach((s) => {
      series[s] = seriaBase.filter((p) => p.meta.seria === s).length;
    });

    const zastBase = getBaseFor('zast');
    const applications: Record<string, number> = {};
    FACET_APPLICATIONS.forEach((a) => {
      applications[a] = zastBase.filter((p) => p.meta.zastosowanie === a).length;
    });

    const stanBase = getBaseFor('stan');
    const conditions: Record<string, number> = {};
    FACET_CONDITIONS.forEach((c) => {
      conditions[c] = stanBase.filter((p) => p.meta.stan === c).length;
    });

    const oemBase = getBaseFor('oem');
    const oemBrands: Record<string, number> = {};
    FACET_OEM_BRANDS.forEach((b) => {
      oemBrands[b] = oemBase.filter((p) => p.meta.oemBrand === b).length;
    });

    return { categories, types, series, applications, conditions, oemBrands };
  }, [
    allProductsWithMeta,
    queryParam,
    selectedCategories,
    selectedTypes,
    selectedSeries,
    selectedApplications,
    selectedConditions,
    selectedOemBrands,
    mainCategories,
  ]);

  // Domyślny widok grupowany (gdy brak filtrów i wyszukiwania oraz sortowanie domyślne)
  const isDefaultGroupedView = !hasActiveFilters && sortOrder === 'default';

  // Grupowanie produktów według kategorii dla widoku domyślnego
  const groupedProducts = useMemo(() => {
    if (!isDefaultGroupedView) return [];
    return mainCategories
      .map((cat) => {
        const prods = sortedProducts.filter((p) => p.product.categorySlug === cat.slug);
        return {
          category: cat,
          products: prods,
        };
      })
      .filter((g) => g.products.length > 0);
  }, [isDefaultGroupedView, mainCategories, sortedProducts]);

  // Zawartość panelu filtrów (wspólna dla desktop i mobile)
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* 1. Kategoria */}
      <div>
        <h3 className="text-[13px] font-semibold text-foreground-secondary mb-3">
          Kategoria
        </h3>
        <div className="space-y-1.5">
          {mainCategories.map((cat) => {
            const count = facetCounts.categories[cat.slug] || 0;
            const isChecked = selectedCategories.includes(cat.slug);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={cat.slug}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('kat', selectedCategories, cat.slug)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px]">{cat.name}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Typ urządzenia */}
      <details className="group border-t border-surface-border pt-4" open>
        <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-semibold text-foreground-secondary py-1 list-none">
          <span>Typ urządzenia</span>
          <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1.5">
          {FACET_TYPES.map((typ) => {
            const count = facetCounts.types[typ] || 0;
            const isChecked = selectedTypes.includes(typ);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={typ}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('typ', selectedTypes, typ)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px]">{typ}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </details>

      {/* 3. Seria */}
      <details className="group border-t border-surface-border pt-4" open>
        <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-semibold text-foreground-secondary py-1 list-none">
          <span>Seria</span>
          <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {FACET_SERIES.map((seria) => {
            const count = facetCounts.series[seria] || 0;
            const isChecked = selectedSeries.includes(seria);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={seria}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('seria', selectedSeries, seria)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px]">{seria}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </details>

      {/* 4. Zastosowanie */}
      <details className="group border-t border-surface-border pt-4" open>
        <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-semibold text-foreground-secondary py-1 list-none">
          <span>Zastosowanie</span>
          <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1.5">
          {FACET_APPLICATIONS.map((zast) => {
            const count = facetCounts.applications[zast] || 0;
            const isChecked = selectedApplications.includes(zast);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={zast}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('zast', selectedApplications, zast)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px] capitalize">{zast}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </details>

      {/* 5. Stan (Nowe / Używane) */}
      <details className="group border-t border-surface-border pt-4">
        <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-semibold text-foreground-secondary py-1 list-none">
          <span>Stan urządzenia</span>
          <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1.5">
          {FACET_CONDITIONS.map((cond) => {
            const count = facetCounts.conditions[cond] || 0;
            const isChecked = selectedConditions.includes(cond);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={cond}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('stan', selectedConditions, cond)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px] capitalize">{cond}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </details>

      {/* 6. Marka OEM */}
      <details className="group border-t border-surface-border pt-4">
        <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-semibold text-foreground-secondary py-1 list-none">
          <span>Homologacja OEM</span>
          <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1.5">
          {FACET_OEM_BRANDS.map((brand) => {
            const count = facetCounts.oemBrands[brand] || 0;
            const isChecked = selectedOemBrands.includes(brand);
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={brand}
                className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors cursor-pointer select-none ${
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed text-foreground-secondary'
                    : isChecked
                    ? 'bg-primary-soft text-accent-text font-medium'
                    : 'text-foreground hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleArrayParam('oem', selectedOemBrands, brand)}
                    className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-[#1F2328] shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <span className="truncate text-[13px]">{brand}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-foreground-secondary shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </details>

      {/* Przycisk czyszczenia filtrów */}
      {hasActiveFilters && (
        <div className="pt-2">
          <button
            type="button"
            onClick={clearAllFilters}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-foreground-secondary hover:text-foreground bg-background border border-surface-border rounded-md hover:bg-surface-hover transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Wyczyść wszystkie filtry
          </button>
        </div>
      )}
    </div>
  );

  // Renderowanie pojedynczej karty w widoku siatki (Grid)
  const renderGridCard = ({ product, meta }: { product: ProductItem; meta: ProductMetadata }) => {
    const isContain = meta.imageFit === 'contain';
    const isUsed = meta.stan === 'używane';

    return (
      <Link
        key={product.slug}
        to={`/produkty/${product.categorySlug}/${product.slug}`}
        className="group flex flex-col bg-background border border-surface-border rounded-[10px] overflow-hidden hover:border-foreground/35 transition-[border-color,box-shadow] duration-150 hover:shadow-sm"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '360px' }}
      >
        {/* Kontener zdjęcia 1:1 na #F7F7F5 */}
        <div
          className={`relative aspect-square w-full bg-[#F7F7F5] overflow-hidden flex items-center justify-center ${
            isContain ? 'p-4' : 'p-0'
          }`}
        >
          <SiteImage
            name={product.slug}
            alt={product.name}
            aspectRatio="1/1"
            fit={isContain ? 'contain' : 'cover'}
            plain={true}
            loading="lazy"
            className={`w-full h-full ${
              isContain
                ? 'object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-[1.03]'
                : 'object-cover transition-transform duration-200 group-hover:scale-[1.03]'
            }`}
          />

          {/* Oznaczenie "Używane" */}
          {isUsed && (
            <span className="absolute top-2.5 left-2.5 bg-foreground text-white text-[12px] font-medium px-2.5 py-0.5 rounded-[6px]">
              Używane
            </span>
          )}

          {/* Strzałka hover w prawym górnym rogu */}
          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 border border-surface-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-[opacity,transform] duration-150 shadow-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Informacje o produkcie */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-2 border-t border-surface-border bg-background">
          <div>
            <h4
              className="text-[15px] sm:text-[16px] font-semibold text-foreground tracking-tight leading-snug line-clamp-2 group-hover:text-accent-text transition-colors"
              title={product.name}
            >
              {meta.model}
            </h4>
            <p className="text-[12px] text-foreground-secondary mt-1 line-clamp-1">
              {meta.typ ? `${meta.typ}` : ''}
              {meta.typ && meta.seria ? ' · ' : ''}
              {meta.seria ? `${meta.seria}` : ''}
              {!meta.typ && !meta.seria && meta.oemBrand ? `OEM · ${meta.oemBrand}` : ''}
            </p>
          </div>
          {COMPANY_DATA.showPrices && product.priceNetto && (
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

  // Renderowanie wiersza w widoku listy (List)
  const renderListRow = ({ product, meta }: { product: ProductItem; meta: ProductMetadata }) => {
    const isContain = meta.imageFit === 'contain';
    const isUsed = meta.stan === 'używane';

    return (
      <Link
        key={product.slug}
        to={`/produkty/${product.categorySlug}/${product.slug}`}
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

          {/* Model i meta */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[14px] sm:text-[15px] font-semibold text-foreground line-clamp-2 group-hover:text-accent-text transition-colors leading-snug">
                {meta.model}
              </h4>
              {isUsed && (
                <span className="bg-neutral-900 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase shrink-0">
                  Używane
                </span>
              )}
            </div>
            <p className="text-[12px] sm:text-[13px] text-foreground-secondary line-clamp-1 mt-0.5">
              {meta.typ ? `${meta.typ}` : ''}
              {meta.typ && meta.seria ? ' · ' : ''}
              {meta.seria ? `${meta.seria}` : ''}
              {!meta.typ && !meta.seria && meta.oemBrand ? `OEM · ${meta.oemBrand}` : ''}
            </p>
          </div>
        </div>

        {/* Prawa strona: cena + strzałka */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3 pl-2">
          {COMPANY_DATA.showPrices && product.priceNetto && (
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
        title="Katalog urządzeń diagnostycznych Beissbarth | Diagnostyka-Systems"
        description="Oferta aparatury warsztatowej Beissbarth: geometria kół 3D i CCD, wyważarki do kół, montażownice opon serii TC, linie rolkowe SKP, stacje klimatyzacji Valeo."
        canonicalPath="/produkty"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Katalog produktów', path: '/produkty' },
        ]}
        jsonLd={
          !hasActiveFilters
            ? getCollectionJsonLd(
                'Katalog urządzeń diagnostycznych Beissbarth',
                'Oferta aparatury warsztatowej Beissbarth: geometria kół 3D i CCD, wyważarki do kół, montażownice opon serii TC, linie rolkowe SKP.',
                '/produkty'
              )
            : undefined
        }
        noindex={hasActiveFilters}
      />

      {/* Kompaktowy nagłówek strony z licznikiem */}
      <div className="border-b border-surface-border bg-background-subtle py-6 sm:py-8">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-1">
                <Link to="/" className="hover:text-foreground">
                  Strona główna
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">Katalog urządzeń</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Katalog urządzeń
              </h1>
            </div>
            <div className="text-sm text-foreground-secondary font-mono">
              <span className="text-foreground font-semibold">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1
                ? 'urządzenie'
                : [2, 3, 4].includes(filteredProducts.length % 10) &&
                  ![12, 13, 14].includes(filteredProducts.length % 100)
                ? 'urządzenia'
                : 'urządzeń'}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile: Sticky pasek pod headerem z wyszukiwarką i jednym dużym przyciskiem filtrów */}
      <div className="lg:hidden sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-surface-border px-4 py-3 space-y-2.5 shadow-xs">
        {/* Wyszukiwarka na pełną szerokość */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none" />
          <input
            type="text"
            value={queryParam}
            onChange={(e) => updateParams({ q: e.target.value || null })}
            placeholder="Szukaj modelu, serii (np. Q.Lign, ML, MS)"
            className="w-full h-11 pl-10 pr-9 text-[14px] bg-background border border-surface-border rounded-[8px] text-foreground placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          />
          {queryParam && (
            <button
              type="button"
              onClick={() => updateParams({ q: null })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground p-1"
              aria-label="Wyczyść wyszukiwanie"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Jeden duży, wyrazisty przycisk filtrów */}
        <button
          type="button"
          onClick={() => setIsMobileFiltersOpen(true)}
          className={`w-full h-12 px-4 rounded-[10px] font-bold text-[14px] flex items-center justify-between border transition-all cursor-pointer shadow-sm active:scale-[0.99] ${
            totalActiveFilterCount > 0
              ? 'bg-accent text-foreground border-accent hover:bg-accent-hover'
              : 'bg-[#14171A] text-white border-[#14171A] hover:bg-[#20252A]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className={`w-4 h-4 ${totalActiveFilterCount > 0 ? 'text-foreground' : 'text-accent'}`} />
            <span>Filtry i kategorie</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[12px]">
            {totalActiveFilterCount > 0 ? (
              <span className="bg-[#14171A] text-accent font-bold px-2.5 py-0.5 rounded-full">
                {totalActiveFilterCount} {totalActiveFilterCount === 1 ? 'aktywny' : 'aktywne'}
              </span>
            ) : (
              <span className="text-neutral-400 font-normal">
                {filteredProducts.length} urządzeń
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Główny kontener katalogu: 2 kolumny na desktopie */}
      <Container className="py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEWY SIDEBAR (280px, sticky na desktopie) */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 bg-background">
            <div className="border border-surface-border rounded-[10px] p-5 bg-background shadow-xs space-y-6">
              {/* a) Wyszukiwarka */}
              <div>
                <label
                  htmlFor="desktop-search"
                  className="block text-[13px] font-semibold text-foreground-secondary mb-2"
                >
                  Wyszukiwarka
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
                  <input
                    ref={searchInputRef}
                    id="desktop-search"
                    type="text"
                    value={queryParam}
                    onChange={(e) => updateParams({ q: e.target.value || null })}
                    placeholder="Model, seria, nr kat. (/)"
                    className="w-full pl-9 pr-8 py-2 text-xs bg-background border border-surface-border rounded-md text-foreground placeholder:text-foreground-secondary focus:outline-none focus:border-accent"
                  />
                  {queryParam ? (
                    <button
                      type="button"
                      onClick={() => updateParams({ q: null })}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-foreground-secondary border border-surface-border rounded px-1 font-mono bg-background-subtle pointer-events-none">
                      /
                    </kbd>
                  )}
                </div>
              </div>

              {/* b, c, d) Kategoria, facety, wyczyść filtry */}
              {renderFilterControls()}
            </div>
          </aside>

          {/* PRAWA CZĘŚĆ: WYNIKI I KONTROLKI GÓRNE */}
          <main className="flex-1 min-w-0 w-full">
            {/* Pasek kontrolny nad wynikami: sortowanie, widok, licznik */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-surface-border mb-6">
              {/* Licznik wyników */}
              <div className="text-sm text-foreground-secondary">
                Znaleziono:{' '}
                <strong className="text-foreground font-semibold">
                  {sortedProducts.length}
                </strong>{' '}
                urządzeń
              </div>

              {/* Narzędzia: sortowanie + widok siatka/lista */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Sortowanie */}
                <div className="flex items-center gap-1.5 text-xs text-foreground-secondary">
                  <span>Sortuj:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      updateParams({
                        sort: e.target.value === 'default' ? null : e.target.value,
                      })
                    }
                    className="bg-background border border-surface-border rounded-md py-1.5 px-2 text-xs text-foreground font-medium focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="default">Domyślnie</option>
                    <option value="name-asc">Nazwa: A-Z</option>
                    <option value="name-desc">Nazwa: Z-A</option>
                  </select>
                </div>

                {/* Przełącznik Siatka / Lista */}
                <div className="flex items-center border border-surface-border rounded-md overflow-hidden bg-background">
                  <button
                    type="button"
                    onClick={() => updateParams({ view: null })}
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
                    onClick={() => updateParams({ view: 'list' })}
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
              </div>
            </div>

            {/* Aktywne filtry jako usuwalne chipy */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-foreground-secondary mr-1">Aktywne filtry:</span>

                {queryParam && (
                  <span className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground">
                    Fraza: <strong>{queryParam}</strong>
                    <button
                      type="button"
                      onClick={() => updateParams({ q: null })}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategories.map((slug) => {
                  const catObj = mainCategories.find((c) => c.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1 text-xs bg-primary-soft border border-accent/20 rounded-md px-2.5 py-1 text-accent-text"
                    >
                      Kategoria: {catObj?.name || slug}
                      <button
                        type="button"
                        onClick={() => toggleArrayParam('kat', selectedCategories, slug)}
                        className="ml-1 hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}

                {selectedTypes.map((typ) => (
                  <span
                    key={typ}
                    className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground"
                  >
                    Typ: {typ}
                    <button
                      type="button"
                      onClick={() => toggleArrayParam('typ', selectedTypes, typ)}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {selectedSeries.map((seria) => (
                  <span
                    key={seria}
                    className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground"
                  >
                    Seria: {seria}
                    <button
                      type="button"
                      onClick={() => toggleArrayParam('seria', selectedSeries, seria)}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {selectedApplications.map((zast) => (
                  <span
                    key={zast}
                    className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground"
                  >
                    Zastosowanie: {zast}
                    <button
                      type="button"
                      onClick={() => toggleArrayParam('zast', selectedApplications, zast)}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {selectedConditions.map((cond) => (
                  <span
                    key={cond}
                    className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground"
                  >
                    Stan: {cond}
                    <button
                      type="button"
                      onClick={() => toggleArrayParam('stan', selectedConditions, cond)}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {selectedOemBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 text-xs bg-background-subtle border border-surface-border rounded-md px-2.5 py-1 text-foreground"
                  >
                    OEM: {brand}
                    <button
                      type="button"
                      onClick={() => toggleArrayParam('oem', selectedOemBrands, brand)}
                      className="ml-1 text-foreground-secondary hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-accent-text hover:underline ml-2"
                >
                  Wyczyść wszystko
                </button>
              </div>
            )}

            {/* PREZENTACJA WYNIKÓW */}
            {sortedProducts.length === 0 ? (
              /* Stan pusty */
              <div className="bg-background-subtle border border-surface-border rounded-[12px] p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-white border border-surface-border mx-auto flex items-center justify-center text-foreground-secondary mb-4">
                  <Search className="w-6 h-6 text-foreground-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Brak wyników dla podanych kryteriów
                </h3>
                <p className="text-sm text-foreground-secondary mb-6 leading-relaxed">
                  Nie znaleziono urządzeń odpowiadających wybranym filtrom. Spróbuj zmienić parametry
                  lub skontaktuj się z naszym doradcą technicznym.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-background border border-surface-border rounded-md text-foreground hover:bg-surface-hover transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Wyczyść filtry
                  </button>
                  <a
                    href="tel:507073919"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-accent text-foreground rounded-md hover:bg-accent-hover transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Informacja handlowa: 507 073 919
                  </a>
                </div>
              </div>
            ) : isDefaultGroupedView ? (
              /* Domyślny widok pogrupowany według kategorii */
              <div className={viewMode === 'grid' ? 'space-y-12' : 'space-y-8'}>
                {groupedProducts.map(({ category, products }) => (
                  <section key={category.slug}>
                    <div
                      className={`flex items-baseline justify-between border-b border-surface-border ${
                        viewMode === 'grid' ? 'pb-3 mb-6' : 'pb-2 mb-3'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-lg sm:text-xl font-bold text-foreground">
                          {category.name}
                        </h2>
                        <span className="text-xs font-mono text-foreground-secondary">
                          ({products.length})
                        </span>
                      </div>
                      <Link
                        to={`/produkty/${category.slug}`}
                        className="text-xs font-medium text-accent-text hover:underline flex items-center gap-1"
                      >
                        Zobacz kategorię <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {products.map(renderGridCard)}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">{products.map(renderListRow)}</div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              /* Płaska lista wyników (po filtracji, wyszukiwaniu lub zmianie sortowania) */
              <div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {sortedProducts.map(renderGridCard)}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">{sortedProducts.map(renderListRow)}</div>
                )}
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* MOBILE BOTTOM SHEET NA FILTRY */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Tło zaciemniające */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Panel dolny (pełna wysokość) */}
          <div className="relative z-10 bg-background w-full h-[90vh] max-h-[90vh] rounded-t-[20px] flex flex-col overflow-hidden shadow-2xl border-t border-surface-border">
            {/* Nagłówek panelu */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-background">
              <div>
                <h2 className="text-base font-bold text-foreground">Filtry katalogu</h2>
                <p className="text-xs text-foreground-secondary">
                  Dopasuj kryteria wyboru urządzeń
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-background-subtle border border-surface-border flex items-center justify-center text-foreground-secondary hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Treść filtrów (scrollowalna) */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterControls()}
            </div>

            {/* Stopka panelu z przyciskami */}
            <div className="p-4 border-t border-surface-border bg-background flex items-center gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 text-xs font-semibold text-foreground-secondary hover:text-foreground bg-background-subtle border border-surface-border rounded-lg text-center"
              >
                Wyczyść
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-[2] py-3 px-4 text-xs font-semibold text-foreground bg-accent rounded-lg text-center hover:bg-accent-hover transition-colors min-h-[44px]"
              >
                Pokaż urządzenia ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};