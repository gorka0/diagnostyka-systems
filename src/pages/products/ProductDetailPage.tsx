import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { getProductJsonLd } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS_DATA } from '@/data/products';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { formatPolishTypography, formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { extractProductMetadata } from '@/data/catalog-rules';
import { parseProductModel, formatPrice } from '@/data/parse-rules';
import { ChevronDown, ArrowLeft, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { kategoria, slug } = useParams<{ kategoria: string; slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const product = useMemo(() => {
    return PRODUCTS_DATA.find((p) => p.slug === slug);
  }, [slug]);

  const category = useMemo(() => {
    if (!product) return undefined;
    return PRODUCT_CATEGORIES.find((c) => c.slug === product.categorySlug);
  }, [product]);

  const meta = useMemo(() => {
    return product ? extractProductMetadata(product) : null;
  }, [product]);

  // 1. Model danych: rozdzielenie wariantów, opcji i specyfikacji
  const parsedModel = useMemo(() => {
    return product ? parseProductModel(product) : null;
  }, [product]);

  // Wybrana wersja urządzenia (z URL ?wersja=... lub pierwsza domyślna)
  const versionParam = searchParams.get('wersja');
  const selectedVariant = useMemo(() => {
    if (!parsedModel || parsedModel.variants.length === 0) return null;
    if (versionParam) {
      const found = parsedModel.variants.find((v) => v.id === versionParam);
      if (found) return found;
    }
    return parsedModel.variants[0];
  }, [parsedModel, versionParam]);

  // Wybrane opcje i wyposażenie (z URL ?opcje=id1,id2)
  const optionsParam = searchParams.get('opcje');
  const [selectedOptionIds, setSelectedOptionIds] = useState<Set<string>>(() => {
    if (!optionsParam) return new Set();
    return new Set(optionsParam.split(',').filter(Boolean));
  });

  // Synchronizacja URL bez przeładowania strony i bez scrollowania
  const syncUrlState = (vId: string | null, optIds: Set<string>) => {
    const nextParams = new URLSearchParams(searchParams);
    if (vId && parsedModel && parsedModel.variants.length > 1) {
      nextParams.set('wersja', vId);
    } else {
      nextParams.delete('wersja');
    }
    if (optIds.size > 0) {
      nextParams.set('opcje', Array.from(optIds).join(','));
    } else {
      nextParams.delete('opcje');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleSelectVariant = (vId: string) => {
    syncUrlState(vId, selectedOptionIds);
  };

  const handleToggleOption = (optId: string) => {
    const next = new Set(selectedOptionIds);
    if (next.has(optId)) {
      next.delete(optId);
    } else {
      next.add(optId);
    }
    setSelectedOptionIds(next);
    syncUrlState(selectedVariant?.id || null, next);
  };

  // 5. Dane techniczne (filtrowane wg wybranego wariantu)
  const filteredSpecs = useMemo(() => {
    if (!parsedModel) return [];
    return parsedModel.specs.filter(
      (s) => !s.variantId || s.variantId === selectedVariant?.id
    );
  }, [parsedModel, selectedVariant]);

  // 3 kluczowe parametry do prawego panelu
  const topThreeSpecs = useMemo(() => {
    return filteredSpecs.slice(0, 3);
  }, [filteredSpecs]);

  // Paginacja wierszy danych technicznych (powyżej 8)
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Paginacja wierszy opcji i wyposażenia (powyżej 8)
  const [showAllOptions, setShowAllOptions] = useState(false);

  // Kalkulacja podsumowania opcji i cen
  const showPrices = COMPANY_DATA.showPrices;
  const basePrice = selectedVariant?.price ?? null;

  const selectedOptionsList = useMemo(() => {
    if (!parsedModel) return [];
    return parsedModel.options.filter((o) => selectedOptionIds.has(o.id));
  }, [parsedModel, selectedOptionIds]);

  const selectedCount = selectedOptionsList.length;
  const allSelectedPriced =
    basePrice !== null && selectedOptionsList.every((o) => o.price !== null);
  const totalCatalogPrice = useMemo(() => {
    if (basePrice === null) return null;
    return basePrice + selectedOptionsList.reduce((acc, o) => acc + (o.price || 0), 0);
  }, [basePrice, selectedOptionsList]);

  // Link CTA "Zapytaj o ofertę"
  const offerHref = useMemo(() => {
    if (!product) return '/kontakt?typ=oferta';
    const params = new URLSearchParams();
    params.set('typ', 'oferta');
    params.set('produkt', product.slug);
    if (selectedVariant && parsedModel && parsedModel.variants.length > 1) {
      params.set('wersja', selectedVariant.id);
    }
    if (selectedOptionIds.size > 0) {
      params.set('opcje', Array.from(selectedOptionIds).join(','));
    }
    return `/kontakt?${params.toString()}`;
  }, [product, selectedVariant, parsedModel, selectedOptionIds]);

  // Detekcja wysokości prawego panelu dla zachowania sticky
  const panelRef = useRef<HTMLDivElement>(null);
  const [canStick, setCanStick] = useState(true);

  useEffect(() => {
    const checkHeight = () => {
      if (panelRef.current) {
        setCanStick(panelRef.current.offsetHeight < window.innerHeight - 100);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [selectedVariant, selectedOptionIds, showPrices]);

  // Mobile Sticky Bottom Bar przy przewinięciu panelu poza ekran
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowMobileBar(isPast);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 6. Podobne urządzenia (pokazywane TYLKO gdy >= 2)
  const similarProducts = useMemo(() => {
    if (!product) return [];
    const list = PRODUCTS_DATA.filter(
      (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
    ).map((p) => ({
      product: p,
      meta: extractProductMetadata(p),
    }));
    return list.length >= 2 ? list.slice(0, 3) : [];
  }, [product]);

  // Funkcja powrotu z zachowaniem historii
  const handleBackToResults = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/produkty');
    }
  };

  if (!product || !parsedModel) {
    return (
      <div className="bg-background min-h-[80vh] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background-subtle rounded-[16px] p-12 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Urządzenie nie zostało odnalezione
            </h1>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Produkt o podanym identyfikatorze nie figuruje w katalogu.
            </p>
            <Button to="/produkty" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do katalogu produktów
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const categoryTitle = category?.name || product.categorySlug;
  const isContain = meta?.imageFit === 'contain';

  return (
    <div className="bg-background min-h-[100dvh] py-6 sm:py-10">
      {/* Canonical ZAWSZE bez parametrów zapytania URL */}
      <Seo
        title={`${product.name} – Specyfikacja techniczna | Beissbarth Diagnostyka-Systems`}
        description={product.shortDescription || 'Oficjalna aparatura diagnostyczna Beissbarth.'}
        canonicalPath={`/produkty/${product.categorySlug}/${product.slug}`}
        type="product"
        image={`/images/${product.slug}.jpg`}
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Katalog produktów', path: '/produkty' },
          { label: categoryTitle, path: `/produkty/${kategoria || product.categorySlug}` },
          {
            label: meta?.model || product.name,
            path: `/produkty/${product.categorySlug}/${product.slug}`,
          },
        ]}
        jsonLd={getProductJsonLd(product, categoryTitle)}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Górna belka nawigacji z powrotem */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-surface-border">
          <nav aria-label="Ścieżka powrotu">
            <ol className="flex items-center flex-wrap gap-2 text-[13px] text-foreground-secondary">
              <li>
                <Link
                  to="/produkty"
                  className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  Katalog
                </Link>
              </li>
              <li className="text-gray-400 select-none">/</li>
              <li>
                <Link
                  to={`/produkty/${kategoria || product.categorySlug}`}
                  className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  {categoryTitle}
                </Link>
              </li>
              <li className="text-gray-400 select-none">/</li>
              <li
                className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none"
                aria-current="page"
              >
                {meta?.model || product.name}
              </li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={handleBackToResults}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary hover:text-foreground bg-background-subtle hover:bg-surface-hover border border-surface-border py-1.5 px-3 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Wróć do wyników</span>
          </button>
        </div>

        {/*
          Siatka produktu:
          Na desktopie (lg): 12 kolumn (Lewa kolumna 7/12, Prawa kolumna 5/12).
          Na mobile (390): kolejność H1 → obrazek → panel → opis → dane → opcje → podobne.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-14 items-start">
          {/* Mobile H1 (widoczny tylko na mobile przed zdjęciem) */}
          <div className="lg:hidden col-span-1 order-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
              {meta?.model || product.name}
            </h1>
          </div>

          {/* Lewa kolumna: Na desktopie block 7 kolumn; na mobile 'contents' umożliwiający zachowanie ścisłej kolejności */}
          <div className="contents lg:block lg:col-span-7 space-y-10">
            {/* Duże zdjęcie z narożnikami pomiarowymi */}
            <div className="order-2 col-span-1">
              <div className="relative aspect-[4/3] w-full rounded-[16px] bg-[#F7F7F5] border border-surface-border p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                <CornerBrackets size={16} color="#EE9D16" />
                <SiteImage
                  name={product.slug}
                  fit={isContain ? 'contain' : 'cover'}
                  aspectRatio="4/3"
                  alt={product.name}
                  priority={true}
                  plain={true}
                  className={`w-full h-full bg-transparent border-0 ${
                    isContain ? 'mix-blend-multiply object-contain' : 'object-cover'
                  }`}
                />
              </div>
            </div>

            {/* 4. Sekcja Opis: od razu pod obrazkiem, krócej (pierwszy akapit, reszta w <details>) */}
            {(product.shortDescription || (product.details && product.details.length > 0)) && (
              <div className="order-4 col-span-1 space-y-4 pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Opis
                  </h2>
                </div>

                <div className="space-y-3.5 text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed max-w-[68ch]">
                  {product.shortDescription && (
                    <p className="text-foreground font-medium text-[16px] sm:text-[17px] leading-snug line-clamp-4">
                      {formatPolishTypography(product.shortDescription)}
                    </p>
                  )}

                  {product.details && product.details.length > 0 && (
                    <details className="group pt-2">
                      <summary className="cursor-pointer text-[14px] font-semibold text-accent-text hover:text-foreground inline-flex items-center gap-1 select-none list-none">
                        <span>Pełny opis</span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="mt-3 space-y-3 text-[15px] text-foreground-secondary leading-relaxed border-l-2 border-surface-border pl-4">
                        {product.details.map((paragraph, idx) => (
                          <p key={idx}>{formatPolishTypography(paragraph)}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* 5. Dane techniczne: 2 kolumny, label ~35% po lewej, wartość po lewej, Inter 16px, tabular-nums */}
            {filteredSpecs.length > 0 && (
              <div className="order-5 col-span-1 space-y-5 pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Dane techniczne
                  </h2>
                  {product.categorySlug === 'geometria' && (
                    <span className="text-[12px] font-semibold text-accent-text flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Atest ITS dla SKP
                    </span>
                  )}
                </div>

                <div className="divide-y divide-surface-border border-y border-surface-border">
                  {filteredSpecs.map((spec, idx) => {
                    const isHidden = !showAllSpecs && idx >= 8;
                    return (
                      <div
                        key={`${spec.label}-${idx}`}
                        className={`py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 ${
                          isHidden ? 'hidden' : ''
                        }`}
                      >
                        <div className="sm:w-[35%] sm:min-w-[200px] shrink-0 text-[14px] sm:text-[15px] text-foreground-secondary font-normal">
                          {spec.label}
                        </div>
                        <div className="flex-1 text-[15px] sm:text-[16px] text-foreground font-medium font-sans tabular-nums text-left">
                          {spec.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredSpecs.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:text-foreground py-2 transition-colors cursor-pointer"
                    aria-expanded={showAllSpecs}
                  >
                    <span>
                      {showAllSpecs
                        ? 'Zwiń dane techniczne'
                        : `Pokaż wszystkie dane techniczne (${filteredSpecs.length})`}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        showAllSpecs ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>
            )}

            {/* 3. Opcje i wyposażenie dodatkowe: tabela widoczna bez accordiona */}
            {parsedModel.options.length > 0 && (
              <div className="order-6 col-span-1 space-y-5 pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Opcje i wyposażenie dodatkowe ({parsedModel.options.length})
                  </h2>
                </div>

                <div className="divide-y divide-surface-border border-y border-surface-border">
                  {parsedModel.options.map((option, idx) => {
                    const isChecked = selectedOptionIds.has(option.id);
                    const isHidden = !showAllOptions && idx >= 8;

                    return (
                      <div
                        key={option.id}
                        className={`py-3 transition-colors ${
                          isChecked ? 'bg-surface-subtle/40' : ''
                        } ${isHidden ? 'hidden' : ''}`}
                      >
                        {/* Desktop (sm+) layout: 4 kolumny w gridzie */}
                        <div className="hidden sm:grid sm:grid-cols-12 sm:items-center sm:gap-4">
                          <div className="sm:col-span-1 flex items-center justify-center">
                            <label className="w-11 h-11 flex items-center justify-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleOption(option.id)}
                                className="w-5 h-5 rounded border-surface-border text-accent-primary focus:ring-accent-primary cursor-pointer"
                              />
                              <span className="sr-only">Wybierz {option.name}</span>
                            </label>
                          </div>

                          <div className="sm:col-span-6 flex flex-col justify-center">
                            <span className="text-[15px] font-medium text-foreground leading-snug">
                              {option.name}
                            </span>
                            {option.spec && (
                              <span className="text-[13px] text-foreground-secondary mt-0.5 leading-tight">
                                {option.spec}
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2 text-left">
                            {option.catalogNo ? (
                              <span className="font-mono text-[12px] text-foreground-secondary whitespace-nowrap">
                                {option.catalogNo}
                              </span>
                            ) : (
                              <span className="text-foreground-muted text-[12px]">—</span>
                            )}
                          </div>

                          <div className="sm:col-span-3 text-right">
                            {showPrices && option.price !== null ? (
                              <span className="text-[14px] font-bold text-foreground font-sans tabular-nums whitespace-nowrap">
                                {formatPrice(option.price, '+')}
                              </span>
                            ) : (
                              <span className="text-[13px] font-medium text-foreground-secondary whitespace-nowrap">
                                Wycena na zapytanie
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Mobile (390) layout: checkbox 44px + nazwa, pod spodem nr kat po lewej, cena po prawej */}
                        <div className="sm:hidden space-y-2">
                          <label className="flex items-start gap-3 cursor-pointer select-none">
                            <div className="w-11 h-11 -ml-2 -mt-1 flex items-center justify-center shrink-0">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleOption(option.id)}
                                className="w-5 h-5 rounded border-surface-border text-accent-primary focus:ring-accent-primary cursor-pointer"
                              />
                            </div>
                            <div className="flex-1 pt-1 min-w-0">
                              <span className="text-[14px] font-medium text-foreground leading-snug block">
                                {option.name}
                              </span>
                              {option.spec && (
                                <span className="text-[12px] text-foreground-secondary mt-0.5 block leading-tight">
                                  {option.spec}
                                </span>
                              )}
                            </div>
                          </label>

                          <div className="flex items-center justify-between pl-9 text-[12px]">
                            {option.catalogNo ? (
                              <span className="font-mono text-foreground-secondary whitespace-nowrap">
                                nr {option.catalogNo}
                              </span>
                            ) : (
                              <span className="text-foreground-muted">—</span>
                            )}

                            {showPrices && option.price !== null ? (
                              <span className="font-bold text-foreground font-sans tabular-nums whitespace-nowrap">
                                {formatPrice(option.price, '+')}
                              </span>
                            ) : (
                              <span className="font-medium text-foreground-secondary whitespace-nowrap">
                                Wycena na zapytanie
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {parsedModel.options.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllOptions(!showAllOptions)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:text-foreground py-2 transition-colors cursor-pointer"
                    aria-expanded={showAllOptions}
                  >
                    <span>
                      {showAllOptions
                        ? 'Zwiń opcje'
                        : `Pokaż wszystkie (${parsedModel.options.length})`}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        showAllOptions ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 2. Prawa kolumna: Krótki panel produktu */}
          <div className="col-span-1 lg:col-span-5 order-3 w-full self-start">
            <div
              ref={panelRef}
              className={`p-6 sm:p-7 rounded-[14px] bg-background-subtle border border-surface-border space-y-6 ${
                canStick ? 'lg:sticky lg:top-24' : ''
              } self-start`}
            >
              {/* Desktop H1 (w panelu na dużych ekranach) */}
              <div className="hidden lg:block">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  {meta?.model || product.name}
                </h1>
              </div>

              {/* 3 kluczowe parametry: rozdzielone cienką linią, bez boxów w boxie */}
              {topThreeSpecs.length > 0 && (
                <div className="divide-y divide-surface-border border-y border-surface-border">
                  {topThreeSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="py-2.5 flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[14px] sm:text-[15px] text-foreground-secondary">
                        {spec.label}
                      </span>
                      <span className="text-[18px] sm:text-[20px] font-bold text-foreground font-sans tabular-nums text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Blok ceny bazowej */}
              <div className="space-y-1">
                <span className="text-[14px] text-foreground-secondary block">
                  Cena katalogowa netto
                </span>
                <div>
                  {showPrices && basePrice !== null ? (
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-nowrap tabular-nums">
                      {formatPrice(basePrice)}
                    </span>
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      Cena na zapytanie
                    </span>
                  )}
                </div>
              </div>

              {/* Wybór wersji (jeśli >= 2): karty-radio min. 48px */}
              {parsedModel.variants.length >= 2 && (
                <div className="space-y-2.5 pt-2 border-t border-surface-border">
                  <span className="text-[13px] font-semibold text-foreground-secondary block">
                    Wersja urządzenia:
                  </span>
                  <div className="space-y-2">
                    {parsedModel.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <label
                          key={variant.id}
                          className={`flex items-start gap-3 p-3 rounded-[10px] border cursor-pointer min-h-[48px] transition-colors select-none ${
                            isSelected
                              ? 'border-accent-primary bg-background shadow-xs ring-1 ring-accent-primary'
                              : 'border-surface-border bg-background hover:border-surface-border/80'
                          }`}
                        >
                          <input
                            type="radio"
                            name="product-variant-selector"
                            value={variant.id}
                            checked={isSelected}
                            onChange={() => handleSelectVariant(variant.id)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-accent-primary bg-accent-primary text-white'
                                : 'border-surface-border bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-[14px] font-semibold text-foreground tracking-tight">
                                {variant.label}
                              </span>
                              {showPrices && variant.price !== null && (
                                <span className="text-[13px] font-bold text-foreground whitespace-nowrap tabular-nums">
                                  {formatPrice(variant.price)}
                                </span>
                              )}
                            </div>
                            {variant.description && (
                              <p className="text-[12px] text-foreground-secondary mt-0.5 leading-snug">
                                {variant.description}
                              </p>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Podsumowanie wybranych opcji */}
              {parsedModel.options.length > 0 && (
                <div className="pt-3 border-t border-surface-border space-y-1.5 text-[13px]">
                  <div className="flex items-center justify-between text-foreground font-medium">
                    <span>Wybrane opcje:</span>
                    <span className="tabular-nums font-semibold">{selectedCount}</span>
                  </div>
                  {selectedCount > 0 && (
                    <div className="text-[13px] text-foreground-secondary">
                      {showPrices && allSelectedPriced && totalCatalogPrice !== null ? (
                        <p>
                          Orientacyjnie:{' '}
                          <strong className="text-foreground font-semibold whitespace-nowrap tabular-nums">
                            {formatPrice(totalCatalogPrice)}
                          </strong>{' '}
                          (cena katalogowa)
                        </p>
                      ) : (
                        <p>oraz opcje wg wyceny</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Przycisk CTA: Zapytaj o ofertę */}
              <div className="pt-2">
                <Button
                  to={offerHref}
                  variant="primary"
                  size="md"
                  className="w-full justify-center h-[50px] text-[15px] font-semibold shadow-xs"
                >
                  {LABELS.cta.askAboutProduct}
                </Button>
              </div>

              {/* Telefon informacji handlowej pod CTA */}
              <div className="pt-4 border-t border-surface-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-surface-border flex items-center justify-center text-foreground-secondary shrink-0">
                  <Phone className="w-4 h-4 text-accent-text" />
                </div>
                <div>
                  <span className="text-[12px] text-foreground-secondary block">
                    Informacja handlowa i dobór:
                  </span>
                  <a
                    href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
                    className="text-[16px] font-bold text-foreground hover:text-accent-text transition-colors tracking-tight whitespace-nowrap tabular-nums"
                  >
                    {formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Podobne urządzenia (pokazywane TYLKO gdy >= 2) */}
        {similarProducts.length >= 2 && (
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-surface-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
                  Podobne urządzenia
                </h2>
                <p className="text-xs sm:text-sm text-foreground-secondary mt-0.5">
                  Pozostałe modele w dziale {categoryTitle}
                </p>
              </div>
              <Link
                to={`/produkty/${product.categorySlug}`}
                className="text-xs sm:text-sm font-semibold text-accent-text hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                Zobacz wszystkie ({categoryTitle}) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 no-scrollbar snap-x">
              {similarProducts.map(({ product: simProd, meta: simMeta }) => {
                const simContain = simMeta.imageFit === 'contain';
                const simUsed = simMeta.stan === 'używane';

                return (
                  <Link
                    key={simProd.slug}
                    to={`/produkty/${simProd.categorySlug}/${simProd.slug}`}
                    className="w-[165px] sm:w-auto shrink-0 snap-start group flex flex-col bg-background border border-surface-border rounded-[10px] overflow-hidden hover:border-accent transition-all duration-150 hover:shadow-xs"
                  >
                    <div className="relative aspect-square w-full bg-[#F7F7F5] overflow-hidden flex items-center justify-center p-2.5 sm:p-4">
                      <SiteImage
                        name={simProd.slug}
                        alt={simProd.name}
                        aspectRatio="1/1"
                        fit={simContain ? 'contain' : 'cover'}
                        plain={true}
                        loading="lazy"
                        className={`w-full h-full ${
                          simContain
                            ? 'object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105'
                            : 'object-cover transition-transform duration-200 group-hover:scale-105'
                        }`}
                      />
                      {simUsed && (
                        <span className="absolute top-2 left-2 bg-neutral-900 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded tracking-wide uppercase">
                          Używane
                        </span>
                      )}
                      <div className="hidden sm:flex absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-surface-border items-center justify-center text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shadow-xs">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-1 border-t border-surface-border bg-background">
                      <h4
                        className="text-[13px] sm:text-[15px] font-semibold text-foreground tracking-tight leading-snug line-clamp-2 group-hover:text-accent-text transition-colors"
                        title={simProd.name}
                      >
                        {simMeta.model}
                      </h4>
                      <p className="text-[11px] sm:text-[12px] text-foreground-secondary truncate">
                        {simMeta.typ ? `${simMeta.typ}` : ''}
                        {simMeta.typ && simMeta.seria ? ' · ' : ''}
                        {simMeta.seria ? `${simMeta.seria}` : ''}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Sticky Bottom Bar dla urządzeń mobilnych (gdy panel przewinięty) */}
      {showMobileBar && (
        <div
          role="region"
          aria-label="Szybki wybór oferty"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border p-3 sm:hidden shadow-lg animate-fade-in"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] text-foreground-secondary block truncate">
                {meta?.model || product.name}
              </span>
              <div className="text-[15px] font-extrabold text-foreground tabular-nums whitespace-nowrap">
                {showPrices && basePrice !== null ? (
                  totalCatalogPrice !== null && allSelectedPriced ? (
                    formatPrice(totalCatalogPrice)
                  ) : (
                    formatPrice(basePrice)
                  )
                ) : (
                  'Cena na zapytanie'
                )}
              </div>
            </div>
            <Button
              to={offerHref}
              variant="primary"
              size="sm"
              className="h-10 px-4 text-[13px] font-semibold whitespace-nowrap shrink-0 shadow-xs"
            >
              Zapytaj o ofertę
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
