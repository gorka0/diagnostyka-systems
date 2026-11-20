import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { REFERENCES_DATA, ReferenceItem } from '@/data/references';
import { PRODUCTS_DATA } from '@/data/products';
import { COMPANY_DATA } from '@/data/company';
import { getCollectionJsonLd } from '@/utils/seo';
import { formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { ExternalLink, MapPin, Phone, ArrowRight } from 'lucide-react';

export const RealizationsPage: React.FC = () => {
  // Podział realizacji według marek (BMW, Volkswagen, pozostałe)
  const groupedReferences = useMemo(() => {
    const mbItems = REFERENCES_DATA.filter((r) => r.brand === 'Mercedes-Benz');
    const bmwItems = REFERENCES_DATA.filter((r) => r.brand === 'BMW');
    const vagItems = REFERENCES_DATA.filter((r) => r.brand === 'Volkswagen' || r.brand === 'Skoda');
    const otherItems = REFERENCES_DATA.filter((r) => r.brand === 'inne');

    return [
      {
        id: 'mercedes',
        title: 'Serwisy autoryzowane Mercedes-Benz',
        brandLabel: 'Mercedes-Benz',
        items: mbItems,
      },
      {
        id: 'bmw',
        title: 'Serwisy autoryzowane BMW',
        brandLabel: 'BMW',
        items: bmwItems,
      },
      {
        id: 'volkswagen',
        title: 'Serwisy autoryzowane Grupy VAG (Volkswagen, Skoda)',
        brandLabel: 'Grupa VAG',
        items: vagItems,
      },
      {
        id: 'inne',
        title: 'Ośrodki edukacyjne i centra techniczne',
        brandLabel: 'Edukacja i Serwis',
        items: otherItems,
      },
    ].filter((group) => group.items.length > 0);
  }, []);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Realizacje i wdrożenia urządzeń Beissbarth | Diagnostyka-Systems"
        description="Wyposażyliśmy szereg autoryzowanych i niezależnych serwisów w aparaturę pomiarową i diagnostyczną Beissbarth."
        canonicalPath="/realizacje"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Realizacje', path: '/realizacje' },
        ]}
        jsonLd={getCollectionJsonLd(
          'Realizacje i wdrożenia urządzeń Beissbarth',
          'Wyposażenie stacji ASO BMW, Volkswagen i centrów serwisowych w aparaturę Beissbarth.',
          '/realizacje'
        )}
      />

      {/* Kompaktowy nagłówek Hero: H1 i jedno zdanie oparte na bazie */}
      <div className="border-b border-surface-border bg-background-subtle py-8 sm:py-10">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-1">
                <Link to="/" className="hover:text-foreground">
                  Strona główna
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">Realizacje</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Realizacje
              </h1>
              <p className="mt-2 text-sm sm:text-base text-foreground-secondary max-w-2xl leading-relaxed">
                Wyposażyliśmy szereg autoryzowanych i niezależnych serwisów.
              </p>
            </div>
            <div className="text-sm font-mono text-foreground-secondary shrink-0">
              Łącznie:{' '}
              <strong className="text-foreground font-semibold">
                {REFERENCES_DATA.length}
              </strong>{' '}
              wdrożeń
            </div>
          </div>
        </Container>
      </div>

      {/* Główna sekcja z pozycjami w układzie editorial */}
      <Container className="py-12 sm:py-16">
        <div className="space-y-16 sm:space-y-20">
          {groupedReferences.map((group) => (
            <section key={group.id} className="space-y-8">
              {/* Nagłówek grupy z licznikiem */}
              <div className="flex items-baseline justify-between border-b border-surface-border pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {group.title}{' '}
                  <span className="text-xs sm:text-sm font-mono font-normal text-foreground-secondary">
                    ({group.items.length})
                  </span>
                </h2>
              </div>

              {/* Wiersze realizacji naprzemienne (lewo / prawo) */}
              <div className="space-y-12 sm:space-y-16">
                {group.items.map((item: ReferenceItem, idx: number) => {
                  const isReversed = idx % 2 === 1;

                  return (
                    <article
                      key={item.slug}
                      id={item.slug}
                      className={`flex flex-col lg:items-center gap-8 lg:gap-14 py-8 sm:py-12 border-b border-surface-border/70 last:border-b-0 scroll-mt-28 ${
                        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                      }`}
                    >
                      {/* Zdjęcie 3:2 w ramce z pomarańczowymi narożnikami-nawiasami */}
                      <div className="w-full lg:w-1/2 shrink-0">
                        <div className="relative aspect-[3/2] w-full rounded-[16px] overflow-hidden bg-[#F7F7F5] border border-surface-border p-3 sm:p-4">
                          <CornerBrackets size={16} color="#EE9D16" />
                          <div className="w-full h-full rounded-[12px] overflow-hidden">
                            <SiteImage
                              name={item.photo}
                              fit="cover"
                              aspectRatio="3/2"
                              plain={true}
                              alt={`Realizacja: ${item.name}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                              style={{
                                objectPosition: item.objectPosition || 'center',
                                filter: 'contrast(0.95) saturate(0.95)',
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Treść po drugiej stronie */}
                      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
                        {/* Etykieta marki i lokalizacja */}
                        <div className="flex items-center gap-2.5 text-xs text-foreground-secondary">
                          <span className="font-semibold text-accent-text uppercase tracking-wider">
                            {item.brand === 'inne' ? 'Centrum Motoryzacyjne' : item.brand}
                          </span>
                          {item.city && (
                            <>
                              <span className="text-gray-300">·</span>
                              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                                <MapPin className="w-3.5 h-3.5 text-foreground-secondary" />
                                {item.city}
                              </span>
                            </>
                          )}
                          {item.year && (
                            <>
                              <span className="text-gray-300">·</span>
                              <span className="font-mono text-foreground-secondary">
                                Rok: {item.year}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Nazwa klienta 28-32 px */}
                        <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-foreground tracking-tight leading-snug">
                          {item.name}
                        </h3>

                        {/* Link do strony klienta z ikoną zewnętrzną */}
                        <div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent hover:underline"
                          >
                            <span>Strona klienta</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>

                        {/* Zakres wdrożenia (renderowany wyłącznie, gdy istnieje) */}
                        {item.scope && (
                          <p className="text-sm sm:text-[15px] text-foreground-secondary leading-relaxed pt-1">
                            {item.scope}
                          </p>
                        )}

                        {/* Zainstalowany sprzęt z linkami do kart w katalogu (renderowany wyłącznie, gdy istnieje) */}
                        {item.equipment && item.equipment.length > 0 && (
                          <div className="pt-2 space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary block">
                              Zainstalowana aparatura:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {item.equipment.map((eqSlug) => {
                                const prod = PRODUCTS_DATA.find((p) => p.slug === eqSlug);
                                return (
                                  <Link
                                    key={eqSlug}
                                    to={
                                      prod
                                        ? `/produkty/${prod.categorySlug}/${prod.slug}`
                                        : `/produkty?q=${encodeURIComponent(eqSlug)}`
                                    }
                                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-background border border-surface-border rounded-md px-3 py-1.5 text-foreground hover:border-accent hover:text-accent-text transition-colors shadow-2xs"
                                  >
                                    <span>{prod ? prod.name : eqSlug}</span>
                                    <ArrowRight className="w-3 h-3 text-foreground-secondary" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Cytat referencyjny (renderowany wyłącznie, gdy istnieje) */}
                        {item.quote && (
                          <blockquote className="border-l-2 border-accent pl-4 py-1.5 my-2 bg-background-subtle rounded-r-md">
                            <p className="text-xs sm:text-sm italic text-foreground leading-relaxed">
                              "{item.quote.text}"
                            </p>
                            <cite className="block text-[11px] font-semibold text-foreground-secondary mt-1.5 not-italic">
                              — {item.quote.author}
                              {item.quote.role ? `, ${item.quote.role}` : ''}
                            </cite>
                          </blockquote>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Jeden prosty CTA na dole bez obietnic */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-background-subtle border border-surface-border rounded-[14px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Wyposażasz stację lub warsztat? Zapytaj o ofertę
            </h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Dobieramy aparaturę pomiarową i diagnostyczną dopasowaną do wymogów odbiorczych i specyfiki serwisu.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-foreground bg-background border border-surface-border rounded-md hover:bg-surface-hover transition-colors"
            >
              <Phone className="w-4 h-4 text-accent-text" />
              <span>{formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}</span>
            </a>
            <Button to="/kontakt" variant="primary" size="md">
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
