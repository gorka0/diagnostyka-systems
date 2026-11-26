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
import { Price } from '@/components/common/Price';
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

  // Model danych: warianty, opcje, specyfikacja
  const parsedModel = useMemo(() => {
    return product ? parseProductModel(product) : null;
  }, [product]);

  // Ujednolicony tytuł (QB 4 zamiast QB.4)
  const cleanTitle = useMemo(() => {
    if (!product) return '';
    let t = meta?.model || product.name;
    if (t.startsWith('QB.4')) t = t.replace('QB.4', 'QB 4');
    return t;
  }, [meta, product]);

  // Podtytuł typu urządzenia (z danych technicznych lub metadanych)
  const productTypeSubtitle = useMemo(() => {
    if (!product) return '';
    return (
      product.technicalSpecs['Typ urządzenia'] ||
      product.technicalSpecs['Rodzaj urządzenia'] ||
      meta?.typ ||
      category?.name ||
      ''
    );
  }, [product, meta, category]);

  // Czy produkt ma certyfikat ITS dla SKP
  const hasItsCert = useMemo(() => {
    if (!product) return false;
    const desc = (product.shortDescription || '').toLowerCase();
    const specsVals = Object.values(product.technicalSpecs).join(' ').toLowerCase();
    return (
      product.categorySlug === 'geometria' ||
      desc.includes('its') ||
      specsVals.includes('its') ||
      specsVals.includes('skp')
    );
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

  // Synchronizacja URL
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

  // Dane techniczne (filtrowane wg wybranego wariantu)
  const filteredSpecs = useMemo(() => {
    if (!parsedModel) return [];
    return parsedModel.specs.filter(
      (s) => !s.variantId || s.variantId === selectedVariant?.id
    );
  }, [parsedModel, selectedVariant]);

  // Zwijanie sekcji: jeśli N <= 12 wszystko widoczne; jeśli > 12: pokaż 10 + przycisk
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);

  // Auto-rozwijanie listy opcji, jeśli jakakolwiek zaznaczona opcja ma indeks >= 10
  useEffect(() => {
    if (!parsedModel || showAllOptions) return;
    const hasPreselectedBeyondThreshold = parsedModel.options.some(
      (opt, idx) => idx >= 10 && selectedOptionIds.has(opt.id)
    );
    if (hasPreselectedBeyondThreshold) {
      setShowAllOptions(true);
    }
  }, [parsedModel, selectedOptionIds, showAllOptions]);

  // Zwijany pełny opis
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Galeria zdjęć (wsparcie dla wielu zdjęć)
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    return [product.slug];
  }, [product]);

  // Kalkulacja podsumowania cen i opcji
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

  // Ref panelu do obserwacji scrolla na mobile
  const panelRef = useRef<HTMLDivElement>(null);
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

  // Podobne urządzenia (pokazywane TYLKO gdy >= 2)
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
      {/* Canonical ZAWSZE bez parametrów URL */}
      <Seo
        title={`${cleanTitle} – Specyfikacja techniczna | Beissbarth Diagnostyka-Systems`}
        description={product.shortDescription || 'Oficjalna aparatura diagnostyczna Beissbarth.'}
        canonicalPath={`/produkty/${product.categorySlug}/${product.slug}`}
        type="product"
        image={`/images/${product.slug}.jpg`}
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Katalog produktów', path: '/produkty' },
          { label: categoryTitle, path: `/produkty/${kategoria || product.categorySlug}` },
          {
            label: cleanTitle,
            path: `/produkty/${product.categorySlug}/${product.slug}`,
          },
        ]}
        jsonLd={getProductJsonLd(product, categoryTitle)}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Górna belka nawigacji breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-surface-border">
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
                {cleanTitle}
              </li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={handleBackToResults}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary hover:text-foreground bg-background-subtle hover:bg-surface-hover border border-surface-border py-1.5 px-3 rounded-md transition-colors self-start sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Wróć do wyników</span>
          </button>
        </div>

        {/* 2. HIERARCHIA: H1 na pełną szerokość nad obiema kolumnami */}
        <header className="mb-8 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {cleanTitle}
            </h1>
            {hasItsCert && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Atest ITS dla SKP
              </span>
            )}
          </div>
          {productTypeSubtitle && (
            <p className="text-[15px] sm:text-[16px] text-foreground-secondary font-normal">
              {productTypeSubtitle}
            </p>
          )}
        </header>

        {/*
          Siatka produktu:
          - Kolumna główna: elastyczna minmax(0, 1fr)
          - Panel zakupu: stała szerokość 380px (clamp 340-400)
          - Odstęp między kolumnami: 56-64px
          - Panel sticky z top = header + 24px (top-24)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-14 xl:gap-16">
          {/* LEWA KOLUMNA: Galeria zdjęć, Opis, Dane techniczne, Opcje i wyposażenie */}
          <div className="space-y-10 order-1">
            {/* 6. Galeria produktu: kontener 4:3 na #F7F7F5 */}
            <div className="space-y-3">
              <div
                className={`relative aspect-[4/3] w-full rounded-[16px] bg-[#F7F7F5] border border-surface-border flex items-center justify-center overflow-hidden ${
                  isContain ? 'p-6 sm:p-8' : 'p-0'
                }`}
              >
                {isContain && <CornerBrackets size={16} color="#EE9D16" />}
                <SiteImage
                  name={galleryImages[activeImageIndex] || product.slug}
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

              {/* Miniatury pod spodem (gdy produkt ma więcej niż jedno zdjęcie) */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((imgName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-[8px] bg-[#F7F7F5] border overflow-hidden transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328] ${
                        activeImageIndex === idx
                          ? 'border-[#1F2328] ring-2 ring-[#1F2328]'
                          : 'border-surface-border hover:border-surface-border/80'
                      }`}
                    >
                      <SiteImage
                        name={imgName}
                        fit={isContain ? 'contain' : 'cover'}
                        aspectRatio="4/3"
                        alt={`${product.name} - miniatura ${idx + 1}`}
                        plain={true}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Sekcja Opis: akapit wprowadzający + wyraźny przycisk pełnego opisu */}
            {(product.shortDescription || (product.details && product.details.length > 0)) && (
              <section aria-labelledby="product-desc-heading" className="space-y-3 pt-4 border-t border-surface-border">
                <h2 id="product-desc-heading" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Opis
                </h2>

                <div className="space-y-3 text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed max-w-[68ch]">
                  {product.shortDescription && (
                    <p className="text-foreground font-medium text-[16px] sm:text-[17px] leading-snug">
                      {formatPolishTypography(product.shortDescription)}
                    </p>
                  )}

                  {product.details && product.details.length > 0 && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        aria-expanded={isDescriptionOpen}
                        aria-controls="full-product-description"
                        className="min-h-[44px] inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#A15C00] hover:text-[#7A4500] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328] focus-visible:ring-offset-2 rounded"
                      >
                        <span>{isDescriptionOpen ? 'Zwiń pełny opis' : 'Pełny opis'}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isDescriptionOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Pełny opis w DOM dla SEO */}
                      <div
                        id="full-product-description"
                        className={`space-y-3 text-[15px] text-foreground-secondary leading-relaxed border-l-2 border-surface-border pl-4 mt-2 ${
                          isDescriptionOpen ? 'block' : 'hidden'
                        }`}
                      >
                        {product.details.map((paragraph, idx) => (
                          <p key={idx}>{formatPolishTypography(paragraph)}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 4 & 5. Dane techniczne: N <= 12 wszystko widoczne; powyżej 10 + przycisk */}
            {filteredSpecs.length > 0 && (
              <section aria-labelledby="product-specs-heading" className="space-y-5 pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between">
                  <h2 id="product-specs-heading" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Dane techniczne
                  </h2>
                </div>

                <div className="divide-y divide-surface-border border-y border-surface-border">
                  {filteredSpecs.map((spec, idx) => {
                    const isBeyondLimit = filteredSpecs.length > 12 && idx >= 10;
                    const isHidden = isBeyondLimit && !showAllSpecs;
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

                {filteredSpecs.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:text-foreground py-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328] focus-visible:ring-offset-2 rounded"
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
              </section>
            )}

            {/* 5. Tabela opcji: odszumiona, z kotwicą #opcje i scroll-margin-top */}
            {parsedModel.options.length > 0 && (
              <section
                id="opcje"
                aria-labelledby="product-options-heading"
                className="space-y-4 pt-4 border-t border-surface-border scroll-mt-28"
              >
                <div>
                  <h2 id="product-options-heading" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                    Opcje i wyposażenie dodatkowe ({parsedModel.options.length})
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-foreground-secondary mt-1">
                    Zaznacz opcje, które chcesz uwzględnić w zapytaniu
                  </p>
                </div>

                <div className="divide-y divide-surface-border border-y border-surface-border">
                  {parsedModel.options.map((option, idx) => {
                    const isChecked = selectedOptionIds.has(option.id);
                    const isBeyondLimit = parsedModel.options.length > 12 && idx >= 10;
                    const isHidden = isBeyondLimit && !showAllOptions && !isChecked;

                    return (
                      <label
                        key={option.id}
                        className={`block py-3 px-2 sm:px-3 rounded-[8px] transition-colors cursor-pointer select-none border-l-2 ${
                          isChecked
                            ? 'bg-background-subtle border-l-accent'
                            : 'border-l-transparent hover:bg-background-subtle/60'
                        } ${isHidden ? 'hidden' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox 24px z polem dotykowym 44px */}
                          <div className="w-11 h-11 -ml-2 -mt-2 flex items-center justify-center shrink-0">
                            <input
                              type="checkbox"
                              value={option.id}
                              checked={isChecked}
                              onChange={() => handleToggleOption(option.id)}
                              className="w-5 h-5 rounded border-gray-300 text-foreground accent-[#1F2328] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer"
                            />
                          </div>

                          {/* Treść opcji: pełna szerokość, nazwa + numer katalogowy w 2. linii */}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                              <span className="text-[15px] font-medium text-foreground leading-snug">
                                {option.name}
                              </span>
                              {option.catalogNo && (
                                <span className="font-mono text-[13px] sm:text-[14px] text-[#4B5563] shrink-0 sm:text-right">
                                  nr {option.catalogNo}
                                </span>
                              )}
                              {showPrices && option.price !== null && (
                                <Price
                                  amount={option.price}
                                  prefix="+"
                                  className="text-[15px] font-bold text-foreground font-sans tabular-nums whitespace-nowrap shrink-0"
                                />
                              )}
                            </div>
                            {option.spec && (
                              <span className="text-[13px] text-foreground-secondary mt-1 block leading-normal">
                                {option.spec}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {parsedModel.options.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllOptions(!showAllOptions)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:text-foreground py-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328] focus-visible:ring-offset-2 rounded"
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
              </section>
            )}
          </div>

          {/* PRAWA KOLUMNA: Krótki panel produktu (stała szerokość 380px, sticky top-24) */}
          <aside
            ref={panelRef}
            aria-label="Panel zakupu urządzenia"
            className="order-2 w-full lg:w-[380px] lg:shrink-0 p-6 sm:p-7 rounded-[14px] bg-background-subtle border border-surface-border space-y-5 lg:sticky lg:top-24 self-start"
          >
              {/* 3. Blok wyceny lub ceny katalogowej */}
              <div className="space-y-1">
                {showPrices && basePrice !== null ? (
                  <>
                    <span className="text-[13px] sm:text-[14px] text-foreground-secondary block font-normal">
                      Cena katalogowa
                    </span>
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-nowrap tabular-nums">
                        {formatPrice(basePrice)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-foreground tracking-tight">
                      Wycena indywidualna
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-normal mt-1">
                      Cenę ustalamy po zapytaniu. Wybraną wersję i opcje dołączymy do zapytania.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Wybór wersji (jeśli >= 2): karty-radio z obrysem 2px #1F2328 i tłem #F7F7F5 */}
              {parsedModel.variants.length >= 2 && (
                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <span className="text-[13px] font-semibold text-foreground-secondary block">
                    Wybierz wersję urządzenia:
                  </span>
                  <div className="space-y-2">
                    {parsedModel.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <label
                          key={variant.id}
                          className={`flex items-start gap-3 p-3.5 rounded-[10px] cursor-pointer min-h-[48px] transition-[border-color,background-color,box-shadow] duration-150 select-none focus-within:ring-2 focus-within:ring-foreground focus-within:ring-offset-2 ${
                            isSelected
                              ? 'border-2 border-foreground bg-white shadow-xs'
                              : 'border border-surface-border bg-white/65 hover:bg-white hover:border-gray-300'
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
                          {/* Wypełniona kropka radio */}
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-[#1F2328] bg-[#1F2328]'
                                : 'border-surface-border bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-[16px] font-semibold text-foreground tracking-tight">
                                {variant.label}
                              </span>
                              {showPrices && variant.price !== null && (
                                <Price
                                  amount={variant.price}
                                  className="text-[16px] sm:text-[17px] font-bold text-foreground whitespace-nowrap tabular-nums shrink-0"
                                />
                              )}
                            </div>
                            {variant.description && (
                              <p className="text-[15px] text-foreground-secondary mt-1 leading-snug">
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

              {/* 3. Podsumowanie opcji */}
              <div className="pt-2 border-t border-surface-border text-[13px] sm:text-[14px]">
                {selectedCount === 0 ? (
                  <div className="flex flex-col gap-1 text-foreground-secondary">
                    <span>Opcje dodatkowe wybierzesz poniżej</span>
                    {parsedModel.options.length > 0 && (
                      <a
                        href="#opcje"
                        className="text-accent-text hover:text-foreground font-semibold inline-flex items-center gap-1 transition-colors self-start"
                      >
                        Przejdź do opcji ({parsedModel.options.length})
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1 text-foreground-secondary">
                    {showPrices ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-foreground font-medium">
                          <span>Wybrane opcje:</span>
                          <span className="tabular-nums font-semibold">{selectedCount}</span>
                        </div>
                        {allSelectedPriced && totalCatalogPrice !== null && (
                          <p>
                            Orientacyjnie:{' '}
                            <Price
                              amount={totalCatalogPrice}
                              className="text-foreground font-bold whitespace-nowrap tabular-nums"
                            />{' '}
                            (cena katalogowa)
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[14px] text-foreground font-medium">
                        Do zapytania:{' '}
                        {parsedModel.variants.length > 1 && selectedVariant ? (
                          <>
                            wersja <span className="font-semibold">{selectedVariant.label}</span>, opcje:{' '}
                            <span className="font-semibold tabular-nums">{selectedCount}</span>
                          </>
                        ) : (
                          <>
                            opcje: <span className="font-semibold tabular-nums">{selectedCount}</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Przycisk CTA: Zapytaj o ofertę */}
              <div className="pt-1">
                <Button
                  to={offerHref}
                  variant="primary"
                  size="md"
                  className="w-full justify-center h-[50px] text-[15px] font-semibold shadow-xs"
                >
                  {LABELS.cta.askAboutProduct}
                </Button>
              </div>

              {/* 3. Telefon informacji handlowej: etykieta dokładnie "Informacja handlowa" */}
              <div className="pt-3 border-t border-surface-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-surface-border flex items-center justify-center text-foreground-secondary shrink-0">
                  <Phone className="w-4 h-4 text-accent-text" />
                </div>
                <div>
                  <span className="text-[12px] text-foreground-secondary block">
                    Informacja handlowa:
                  </span>
                  <a
                    href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
                    className="text-[16px] font-bold text-foreground hover:text-accent-text transition-colors tracking-tight whitespace-nowrap tabular-nums"
                  >
                    {formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}
                  </a>
                </div>
              </div>
            </aside>
        </div>

        {/* 6. Podobne urządzenia (pokazywane TYLKO gdy >= 2) */}
        {similarProducts.length >= 2 && (
          <section aria-labelledby="similar-products-heading" className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-surface-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <div>
                <h2 id="similar-products-heading" className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
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
                    className="w-[165px] sm:w-auto shrink-0 snap-start group flex flex-col bg-background border border-surface-border rounded-[10px] overflow-hidden hover:border-accent transition-all duration-150 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2328]"
                  >
                    <div
                      className={`relative aspect-square w-full bg-[#F7F7F5] overflow-hidden flex items-center justify-center ${
                        simContain ? 'p-2.5 sm:p-4' : 'p-0'
                      }`}
                    >
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
                      <h3
                        className="text-[13px] sm:text-[15px] font-semibold text-foreground tracking-tight leading-snug line-clamp-2 group-hover:text-accent-text transition-colors"
                        title={simProd.name}
                      >
                        {simMeta.model}
                      </h3>
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
          </section>
        )}
      </div>

      {/* Floating Sticky Bottom Bar dla urządzeń mobilnych (gdy panel przewinięty) */}
      {showMobileBar && (
        <aside
          role="region"
          aria-label="Szybki wybór oferty"
          className="fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border p-3 sm:hidden shadow-lg animate-fade-in"
          style={{
            bottom: 'var(--cookie-banner-h, 0px)',
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {showPrices ? (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[11px] text-foreground-secondary block truncate">
                  {cleanTitle}
                </span>
                <div className="text-[15px] font-extrabold text-foreground tabular-nums whitespace-nowrap">
                  {totalCatalogPrice !== null && allSelectedPriced ? (
                    <Price amount={totalCatalogPrice} />
                  ) : (
                    <Price amount={basePrice} />
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
          ) : (
            <Button
              to={offerHref}
              variant="primary"
              size="md"
              className="w-full h-11 text-[15px] font-semibold shadow-xs justify-center"
            >
              Zapytaj o ofertę
            </Button>
          )}
        </aside>
      )}
    </div>
  );
};
