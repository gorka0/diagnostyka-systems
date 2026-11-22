import React from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, CornerBrackets } from '@/components/ui/MeasurementMarks';
import { formatPolishTypography } from '@/utils/typography';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface PageHeroProps {
  variant: 'dark' | 'split' | 'compact';
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  metrics?: MetricItem[];
  cta?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Zunifikowany i zróżnicowany nagłówek podstron (PageHero):
 * - dark: graphite-900 (#14171A), wzór Crosshair, biały H1 (interlinia >= 1.2), 1 zdanie, CTA
 * - split: jasny układ 2-kolumnowy (tekst + metryki po lewej, zdjęcie w pomarańczowych narożnikach po prawej)
 * - compact: minimalistyczny nagłówek #F7F7F5 z okruszkami (katalog, realizacje, publikacje)
 *
 * Zgodnie z audytem KROK 4: całkowity brak pomarańczowych badge/eyebrow-ów.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  variant,
  breadcrumbs,
  title,
  description,
  image,
  metrics,
  cta,
  children,
  className = '',
}) => {
  // 1. WARIANT DARK (np. /serwis, /kontakt)
  if (variant === 'dark') {
    return (
      <div className={`relative bg-[#14171A] text-white border-b border-white/10 overflow-hidden py-14 md:py-20 ${className}`}>
        {/* Subtelny celownik w tle (Crosshair) */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-[0.07] text-white"
        >
          <Crosshair size={384} />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Ścieżka powrotu" className="mb-4">
              <ol className="flex items-center flex-wrap gap-2 text-[14px] text-white/60">
                {breadcrumbs.map((crumb, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-white/40 select-none">/</span>}
                    {crumb.to ? (
                      <Link
                        to={crumb.to}
                        className="hover:text-white transition-colors underline-offset-2 hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-medium" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="max-w-[75ch] space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white tracking-tight leading-[1.25] text-balance">
              {formatPolishTypography(title)}
            </h1>

            {description && (
              <p className="text-[17px] sm:text-[19px] text-white/75 leading-relaxed font-normal">
                {formatPolishTypography(description)}
              </p>
            )}

            {cta && <div className="pt-4">{cta}</div>}
            {children && <div className="pt-4">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  // 2. WARIANT SPLIT (np. /o-nas)
  if (variant === 'split') {
    return (
      <div className={`relative bg-background-subtle border-b border-surface-border overflow-hidden py-12 md:py-20 ${className}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Ścieżka powrotu" className="mb-6">
              <ol className="flex items-center flex-wrap gap-2 text-[14px] text-foreground-secondary">
                {breadcrumbs.map((crumb, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-gray-400 select-none">/</span>}
                    {crumb.to ? (
                      <Link
                        to={crumb.to}
                        className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Lewa kolumna: Nagłówek, opis, metryki */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-foreground tracking-tight leading-[1.25] text-balance">
                {formatPolishTypography(title)}
              </h1>

              {description && (
                <p className="text-[17px] sm:text-[18px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(description)}
                </p>
              )}

              {metrics && metrics.length > 0 && (
                <div className="pt-4 flex flex-wrap gap-8 border-t border-surface-border">
                  {metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground block tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-[13px] sm:text-[14px] text-foreground-secondary font-medium block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {cta && <div className="pt-2">{cta}</div>}
              {children}
            </div>

            {/* Prawa kolumna: Zdjęcie z pomarańczowymi narożnikami */}
            {image && (
              <div className="lg:col-span-5">
                <div className="relative rounded-[16px] overflow-hidden border border-surface-border bg-white shadow-sm">
                  <CornerBrackets size={18} color="#EE9D16" />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full aspect-[1024/338] object-cover object-center block"
                    loading="eager"
                  />
                </div>
                {image.caption && (
                  <p className="text-[13px] text-foreground-secondary mt-2.5">
                    {image.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. WARIANT COMPACT (#F7F7F5, breadcrumb, H1, 1 zdanie)
  return (
    <div className={`relative bg-background-subtle border-b border-surface-border overflow-hidden py-10 md:py-14 ${className}`}>
      {/* Bardzo delikatny celownik w tle na 3% */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-[0.03] text-foreground overflow-hidden"
      >
        <Crosshair size={320} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Ścieżka powrotu" className="mb-3">
            <ol className="flex items-center flex-wrap gap-2 text-[14px] text-foreground-secondary">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-gray-400 select-none">/</span>}
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-foreground tracking-tight leading-[1.25]">
          {formatPolishTypography(title)}
        </h1>

        {description && (
          <p className="mt-2.5 text-[16px] sm:text-[17px] text-foreground-secondary leading-relaxed max-w-[70ch]">
            {formatPolishTypography(description)}
          </p>
        )}

        {cta && <div className="mt-4">{cta}</div>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};
