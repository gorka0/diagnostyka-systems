import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { ChevronDown, ArrowLeft, Phone, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { kategoria, slug } = useParams<{ kategoria: string; slug: string }>();

  const product = useMemo(() => {
    return PRODUCTS_DATA.find((p) => p.slug === slug);
  }, [slug]);

  const category = useMemo(() => {
    if (!product) return undefined;
    return PRODUCT_CATEGORIES.find((c) => c.slug === product.categorySlug);
  }, [product]);

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

  return (
    <div className="bg-background min-h-[100dvh] py-8 sm:py-12">
      <Seo
        title={`${product.name} – Specyfikacja techniczna | Beissbarth Diagnostyka-Systems`}
        description={product.shortDescription || 'Oficjalna aparatura diagnostyczna Beissbarth.'}
        canonicalPath={`/produkty/${product.categorySlug}/${product.slug}`}
        jsonLd={getProductJsonLd(product, categoryTitle)}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb nawigacyjny */}
        <nav aria-label="Ścieżka powrotu" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-[14px] text-foreground-secondary">
            <li>
              <Link to="/produkty" className="hover:text-foreground transition-colors underline-offset-2 hover:underline">
                Produkty
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
            <li className="text-foreground font-medium" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Karta produktu: 2 kolumny (Lewa: Duże zdjęcie i specyfikacja techniczna, Prawa: Sticky panel zakupu) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Lewa kolumna (7/12): Duże zdjęcie w ramce z narożnikami-nawiasami + Tabela danych technicznych */}
          <div className="lg:col-span-7 space-y-12">
            {/* Duże zdjęcie z pomarańczowymi narożnikami pomiarowymi */}
            <div className="relative aspect-[4/3] w-full rounded-[16px] bg-background-subtle border border-surface-border p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              <CornerBrackets size={16} color="#EE9D16" />
              <SiteImage
                name={product.slug}
                fit="contain"
                aspectRatio="4/3"
                alt={product.name}
                priority={true}
                className="w-full h-full bg-transparent border-0"
              />
            </div>

            {/* Tabela danych technicznych: cienkie linie, czysta hierarchia */}
            <div className="space-y-6 pt-6 border-t border-surface-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                  Dane techniczne
                </h2>
                {product.categorySlug === 'geometria' && (
                  <span className="text-[13px] font-semibold text-accent-text flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Atest ITS dla SKP
                  </span>
                )}
              </div>

              {hasSpecs ? (
                <div className="divide-y divide-surface-border border-y border-surface-border text-[15px]">
                  {specEntries.map(([key, val]) => (
                    <div
                      key={key}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <span className="text-foreground-secondary font-normal">{key}</span>
                      <span className="text-foreground font-medium text-left sm:text-right font-mono">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[15px] text-foreground-secondary py-4 border-y border-surface-border">
                  Szczegółowa karta techniczna jest dostępna na zapytanie u naszych inżynierów.
                </p>
              )}
            </div>

            {/* Zwijane wyposażenie dodatkowe (akcesoria i adaptery) */}
            {hasAccessories && (
              <details className="group border border-surface-border rounded-[12px] bg-background-subtle p-6 transition-colors">
                <summary className="cursor-pointer font-semibold text-[17px] text-foreground flex items-center justify-between select-none list-none">
                  <span>{LABELS.cta.showAccessories(product.accessories.length)}</span>
                  <ChevronDown className="w-5 h-5 text-foreground-secondary transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="mt-5 pt-4 border-t border-surface-border divide-y divide-surface-border/60">
                  {product.accessories.map((acc, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[15px]"
                    >
                      <span className="text-foreground font-medium">{acc.name}</span>
                      {acc.catalogNumber && (
                        <span className="font-mono text-[14px] text-foreground-secondary shrink-0">
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
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-[16px] bg-background-subtle border border-surface-border space-y-6">
              <div>
                <span className="text-[13px] font-semibold text-accent-text uppercase tracking-wider block mb-2">
                  {categoryTitle}
                </span>
                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight leading-snug">
                  {product.name}
                </h1>
                <p className="mt-3 text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(
                    product.shortDescription ||
                      'Oryginalna aparatura diagnostyczna Beissbarth z pełną opieką autoryzowanego serwisu.'
                  )}
                </p>
              </div>

              {/* 3 kluczowe parametry dużą czcionką z danych technicznych */}
              {topThreeSpecs.length > 0 && (
                <div className="pt-4 border-t border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topThreeSpecs.map(([paramKey, paramVal]) => (
                    <div key={paramKey} className="space-y-0.5">
                      <span
                        className="text-[18px] sm:text-[20px] font-bold text-foreground font-mono block truncate"
                        title={paramVal}
                      >
                        {paramVal}
                      </span>
                      <span
                        className="text-[12px] sm:text-[13px] text-foreground-secondary block truncate"
                        title={paramKey}
                      >
                        {paramKey}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Przycisk CTA: Zapytaj o produkt */}
              <div className="pt-2">
                <Button
                  to={`/kontakt?produkt=${encodeURIComponent(product.name)}`}
                  variant="primary"
                  size="md"
                  className="w-full justify-center h-[52px] text-[16px] font-semibold shadow-sm"
                >
                  {LABELS.cta.askAboutProduct}
                </Button>
              </div>

              {/* Telefon informacji handlowej */}
              <div className="pt-4 border-t border-surface-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-surface-border flex items-center justify-center text-foreground-secondary shrink-0">
                  <Phone className="w-4 h-4 text-accent-text" />
                </div>
                <div>
                  <span className="text-[13px] text-foreground-secondary block">
                    Informacja handlowa i dobór:
                  </span>
                  <a
                    href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
                    className="text-[18px] font-bold text-foreground hover:text-accent-text transition-colors tracking-tight"
                  >
                    {formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
