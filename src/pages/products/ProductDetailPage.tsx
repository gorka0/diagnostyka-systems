import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { ChevronDown, ArrowLeft, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { kategoria, slug } = useParams<{ kategoria: string; slug: string }>();
  const navigate = useNavigate();

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

  // 3 Podobne urządzenia z tej samej kategorii (z wyłączeniem aktualnego)
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_DATA
      .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
      .slice(0, 3)
      .map((p) => ({
        product: p,
        meta: extractProductMetadata(p),
      }));
  }, [product]);

  // Funkcja powrotu z zachowaniem filtrów i pozycji scrolla w historii przeglądarki
  const handleBackToResults = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/produkty');
    }
  };

  if (!product) {
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
  const specEntries = Object.entries(product.technicalSpecs);
  const topThreeSpecs = specEntries.slice(0, 3);
  const hasSpecs = specEntries.length > 0;
  const hasAccessories = product.accessories.length > 0;
  const isContain = meta?.imageFit === 'contain';

  return (
    <div className="bg-background min-h-[100dvh] py-6 sm:py-10">
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
          { label: meta?.model || product.name, path: `/produkty/${product.categorySlug}/${product.slug}` },
        ]}
        jsonLd={getProductJsonLd(product, categoryTitle)}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Górna belka nawigacji z przyciskiem "Wróć do wyników" */}
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
              <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
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

        {/* Karta produktu: 2 kolumny (Lewa: Duże zdjęcie i specyfikacja techniczna, Prawa: Sticky panel zakupu) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Lewa kolumna (7/12): Duże zdjęcie w ramce z narożnikami-nawiasami + Tabela danych technicznych */}
          <div className="lg:col-span-7 space-y-10">
            {/* Duże zdjęcie z pomarańczowymi narożnikami pomiarowymi */}
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

            {/* Tabela danych technicznych: tylko gdy produkt posiada dane techniczne w bazie */}
            {hasSpecs && (
              <div className="space-y-5 pt-4 border-t border-surface-border">
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

                <div className="divide-y divide-surface-border border-y border-surface-border text-[14px]">
                  {specEntries.map(([key, val]) => (
                    <div
                      key={key}
                      className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                    >
                      <span className="text-foreground-secondary">{key}</span>
                      <span className="text-foreground font-medium text-left sm:text-right font-mono">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zwijane wyposażenie dodatkowe (akcesoria i adaptery) */}
            {hasAccessories && (
              <details className="group border border-surface-border rounded-[12px] bg-background-subtle p-5 transition-colors">
                <summary className="cursor-pointer font-semibold text-[15px] text-foreground flex items-center justify-between select-none list-none">
                  <span>{LABELS.cta.showAccessories(product.accessories.length)}</span>
                  <ChevronDown className="w-4 h-4 text-foreground-secondary transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="mt-4 pt-3 border-t border-surface-border divide-y divide-surface-border/60">
                  {product.accessories.map((acc, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[14px]"
                    >
                      <span className="text-foreground font-medium">{acc.name}</span>
                      {acc.catalogNumber && (
                        <span className="font-mono text-[13px] text-foreground-secondary shrink-0">
                          Nr kat. {acc.catalogNumber}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>

          {/* Prawa kolumna (5/12): Sticky panel (nazwa, krótki opis, 3 kluczowe parametry, CTA, telefon) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 sm:p-7 rounded-[14px] bg-background-subtle border border-surface-border space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-accent-text uppercase tracking-wider">
                    {categoryTitle}
                  </span>
                  {meta?.seria && (
                    <span className="text-xs text-foreground-secondary">
                      · {meta.seria}
                    </span>
                  )}
                  {meta?.stan === 'używane' && (
                    <span className="bg-neutral-900 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">
                      Używane
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  {meta?.model || product.name}
                </h1>
                {meta?.model !== product.name && (
                  <p className="text-xs text-foreground-secondary mt-1 font-mono">
                    {product.name}
                  </p>
                )}
                <p className="mt-3 text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(
                    product.shortDescription ||
                      'Oryginalna aparatura diagnostyczna Beissbarth z pełną opieką autoryzowanego serwisu.'
                  )}
                </p>
              </div>

              {/* Kluczowe parametry techniczne urządzenia - czytelne kafelki metryk bez ucinania tekstu */}
              {topThreeSpecs.length > 0 && (
                <div className="pt-4 border-t border-surface-border">
                  <div className="space-y-2">
                    {topThreeSpecs.map(([paramKey, paramVal]) => (
                      <div
                        key={paramKey}
                        className="py-2.5 px-3.5 rounded-[10px] bg-background border border-surface-border transition-colors hover:border-surface-border/80"
                      >
                        <span className="text-[11px] font-semibold text-foreground-secondary uppercase tracking-wider block">
                          {paramKey}
                        </span>
                        <span className="text-[14px] sm:text-[15px] font-bold text-foreground font-mono mt-0.5 block leading-snug break-words">
                          {paramVal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cena katalogowa urządzenia */}
              {product.priceNetto && (
                <div className="pt-4 border-t border-surface-border">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-foreground-secondary">
                      Cena katalogowa
                    </span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono tracking-tight">
                        {product.priceNetto.replace(' netto', '')}
                      </span>
                      <span className="text-xs font-semibold text-foreground-secondary ml-1.5 uppercase">
                        netto
                      </span>
                    </div>
                  </div>
                  {product.priceVariants && product.priceVariants.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-surface-border/60 space-y-1.5">
                      {product.priceVariants.map((v, i) => (
                        <div key={i} className="flex items-center justify-between text-xs text-foreground-secondary">
                          <span>{v.label}</span>
                          <span className="font-mono font-semibold text-foreground">{v.priceNetto}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Przycisk CTA: Zapytaj o produkt */}
              <div className="pt-2">
                <Button
                  to={`/kontakt?typ=oferta&produkt=${encodeURIComponent(product.name)}`}
                  variant="primary"
                  size="md"
                  className="w-full justify-center h-[50px] text-[15px] font-semibold shadow-xs"
                >
                  {LABELS.cta.askAboutProduct}
                </Button>
              </div>

              {/* Telefon informacji handlowej */}
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
                    className="text-[16px] font-bold text-foreground hover:text-accent-text transition-colors tracking-tight"
                  >
                    {formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Podobne urządzenia z tej samej kategorii */}
        {similarProducts.length > 0 && (
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

            {/* Na mobilce: zmniejszone, w poziomym rzędzie obok siebie (scroll/swipe); na desktopie: siatka 3 kolumny */}
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
    </div>
  );
};