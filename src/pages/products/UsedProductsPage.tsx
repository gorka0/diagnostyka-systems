import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCTS_DATA } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const UsedProductsPage: React.FC = () => {
  const usedProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === 'produkty-uzywane');
  }, []);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Używane urządzenia diagnostyczne z gwarancją | Diagnostyka-Systems"
        description="Sprawdzona aparatura diagnostyczna Beissbarth po fabrycznym remoncie kapitalnym w Lisim Ogonie. Geometria kół i linie diagnostyczne objęte pisemną gwarancją."
        canonicalPath="/produkty-uzywane"
      />
      <PageHeader
        breadcrumbs={[
          { label: 'Produkty', to: '/produkty' },
          { label: 'Produkty używane' },
        ]}
        title="Używane urządzenia diagnostyczne z gwarancją"
        description="Aparatura diagnostyczna Beissbarth po fabrycznym remoncie kapitalnym w serwisie w Lisim Ogonie, w pełni sprawna technicznie i objęta pisemną gwarancją."
      />
      <div className="py-12 md:py-16">
        <Container>
          {/* 3 Filary gwarancji urządzeń używanych */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card padding="lg" className="space-y-3">
            <ShieldCheck className="w-6 h-6 text-foreground stroke-[1.5]" />
            <h2 className="text-[18px] font-semibold text-foreground">
              Fabryczny remont kapitalny
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(
                'Każde urządzenie przechodzi pełny demontaż, weryfikację podzespołów, wymianę elementów eksploatacyjnych oraz testy na stanowiskach wzorcowych.'
              )}
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <ShieldCheck className="w-6 h-6 text-foreground stroke-[1.5]" />
            <h2 className="text-[18px] font-semibold text-foreground">
              Pisemna gwarancja serwisu
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(
                'Udzielamy pisemnej gwarancji autoryzowanego serwisu Beissbarth na wszystkie odnowione maszyny oraz zapewniamy stałą dostępność części zamiennych.'
              )}
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <ShieldCheck className="w-6 h-6 text-foreground stroke-[1.5]" />
            <h2 className="text-[18px] font-semibold text-foreground">
              Legalizacja i atesty ITS
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(
                'Urządzenia przeznaczone dla Stacji Kontroli Pojazdów dostarczamy z aktualnym świadectwem kalibracji oraz kompletną dokumentacją odbiorową.'
              )}
            </p>
          </Card>
        </div>

        {/* Lista produktów używanych */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Aktualnie dostępne urządzenia z gwarancją
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {usedProducts.map((product) => (
              <Link
                key={product.slug}
                to={`/produkty/${product.categorySlug}/${product.slug}`}
                className="group flex flex-col h-full bg-white border border-surface-border rounded-[10px] p-6 hover:border-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <div className="mb-5 overflow-hidden rounded-[8px] bg-background-subtle">
                  <SiteImage
                    name={product.slug}
                    fit="contain"
                    aspectRatio="4/3"
                    alt={product.name}
                    className="w-full group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h2 className="text-[18px] font-semibold text-foreground group-hover:text-accent-text transition-colors line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                      {formatPolishTypography(product.shortDescription)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between text-[15px] font-semibold text-foreground group-hover:text-accent-text">
                    <span>Zobacz specyfikację</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA kontaktowe */}
        <div className="p-8 md:p-12 bg-white border border-surface-border rounded-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-[65ch] space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Szukasz konkretnego modelu urządzenia używanego?
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              Skontaktuj się z naszym działem technicznym. Zapytaj o urządzenia będące w trakcie regeneracji i przygotowywane do sprzedaży.
            </p>
          </div>
          <Button to="/kontakt" variant="primary" size="md" className="shrink-0">
            Skontaktuj się z nami
          </Button>
        </div>
      </Container>
    </div>
  </div>
);
};
