import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCTS_DATA } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/data/company';
import { cleanTelHref, formatPhoneWithNbsp } from '@/utils/typography';

export const UsedProductsPage: React.FC = () => {
  const usedProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === 'produkty-uzywane');
  }, []);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Używane urządzenia diagnostyczne z gwarancją | Diagnostyka-Systems"
        description="Sprawdzona aparatura diagnostyczna Beissbarth po fabrycznym remoncie w Lisim Ogonie. Geometria kół i linie diagnostyczne objęte 6-miesięczną gwarancją serwisu."
        canonicalPath="/produkty-uzywane"
      />

      <PageHero
        variant="compact"
        breadcrumbs={[
          { label: 'Produkty', to: '/produkty' },
          { label: 'Produkty używane' },
        ]}
        title="Używane urządzenia diagnostyczne z gwarancją"
        description="Aparatura diagnostyczna Beissbarth po kompleksowej regeneracji w serwisie w Lisim Ogonie, w pełni sprawna technicznie i objęta 6-miesięczną gwarancją serwisu."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 md:space-y-16">
        {/* Baner gwarancji: 6 miesięcy na maszyny zregenerowane */}
        <div className="rounded-[14px] bg-background-subtle border border-surface-border p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-surface-border flex items-center justify-center shrink-0 text-foreground shadow-sm">
              <ShieldCheck className="w-6 h-6 text-foreground stroke-[1.5]" />
            </div>
            <div className="space-y-1 max-w-[65ch]">
              <h2 className="text-xl font-semibold text-foreground tracking-tight">
                6 miesięcy gwarancji na zregenerowane maszyny
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Każde oferowane urządzenie przechodzi demontaż, weryfikację podzespołów, wymianę elementów eksploatacyjnych, kalibrację na stanowisku wzorcowym oraz aktualizację oprogramowania.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-0.5 shrink-0">
            <span className="text-[13px] text-foreground-secondary block">
              Dział handlowy:
            </span>
            <a
              href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
              className="text-xl sm:text-2xl font-bold font-mono text-foreground hover:text-accent-text transition-colors tabular-nums whitespace-nowrap"
            >
              {formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}
            </a>
          </div>
        </div>

        {/* Tabela / Wiersze zamiast kart: miniatura, model, stan, link */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Dostępne urządzenia zregenerowane ({usedProducts.length})
            </h3>
          </div>

          <div className="bg-white border border-surface-border rounded-[14px] overflow-hidden shadow-sm divide-y divide-surface-border">
            {usedProducts.map((product) => (
              <div
                key={product.slug}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-background-subtle/50 transition-colors"
              >
                {/* Miniatura 1:1 + model + opis */}
                <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[10px] bg-background-subtle border border-surface-border overflow-hidden shrink-0 flex items-center justify-center p-2">
                    <SiteImage
                      name={product.slug}
                      plain
                      fit="contain"
                      aspectRatio="1/1"
                      alt={product.name}
                      className="max-h-full max-w-full"
                    />
                  </div>

                  <div className="space-y-1.5 max-w-[55ch]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-[18px] sm:text-[20px] font-bold text-foreground tracking-tight">
                        {product.name}
                      </h4>
                      <span className="inline-block px-2.5 py-0.5 text-[12px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                        Po regeneracji · Gwarancja 6 mies.
                      </span>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                      {formatPolishTypography(product.shortDescription)}
                    </p>
                  </div>
                </div>

                {/* Status i akcja */}
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-surface-border">
                  <div className="text-left md:text-right">
                    <span className="text-[12px] font-mono text-foreground-secondary uppercase tracking-wider block">
                      Status
                    </span>
                    <span className="text-[14px] font-semibold text-foreground block">
                      Stanowisko w Lisim Ogonie
                    </span>
                  </div>

                  <Link
                    to={`/produkty/${product.categorySlug}/${product.slug}`}
                    className="h-10 px-5 rounded-[8px] bg-foreground text-white hover:bg-foreground/90 font-semibold text-[14px] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Karta urządzenia</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dolna belka informacyjna */}
        <div className="p-8 rounded-[14px] bg-background-subtle border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-[65ch]">
            <h4 className="text-lg font-semibold text-foreground">
              Szukasz innego modelu maszyny po regeneracji?
            </h4>
            <p className="text-[14px] text-foreground-secondary leading-relaxed">
              Stany magazynowe urządzeń używanych zmieniają się na bieżąco. Skontaktuj się z naszym serwisem, aby sprawdzić maszyny przygotowywane do sprzedaży.
            </p>
          </div>
          <Link
            to="/kontakt"
            className="h-11 px-6 rounded-[8px] bg-white border border-surface-border hover:bg-gray-100 font-semibold text-[14px] text-foreground transition-colors inline-flex items-center gap-2 shrink-0"
          >
            <span>Zapytaj o dostępność</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
