import React, { useState, useMemo } from 'react';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { REFERENCES_DATA, ReferenceItem } from '@/data/references';
import { formatPolishTypography } from '@/utils/typography';

export const RealizationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReferences = useMemo(() => {
    if (selectedCategory === 'all') return REFERENCES_DATA;
    return REFERENCES_DATA.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Realizacje i wdrożenia urządzeń Beissbarth | Diagnostyka-Systems"
        description="Wybrane realizacje wyposażenia stref diagnostyki podwozia i geometrii 3D Beissbarth w autoryzowanych stacjach dealerskich ASO i stacjach kontroli pojazdów."
        canonicalPath="/realizacje"
      />
      <PageHeader
        breadcrumbs={[{ label: 'Realizacje' }]}
        title="Realizacje i wdrożenia"
        description="Wybrane realizacje wyposażenia stref diagnostyki podwozia, geometrii kół oraz urządzeń warsztatowych w autoryzowanych stacjach dealerskich i centrach motoryzacyjnych."
      />
      <div className="py-12 md:py-16">
        <Container>
          {/* Filtry kategorii wdrożeń */}
          <div className="flex items-center gap-2 flex-wrap mb-10 pb-6 border-b border-surface-border">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedCategory === 'all'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Wszystkie ({REFERENCES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('ASO')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedCategory === 'ASO'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Autoryzowane Stacje Dealerskie (ASO)
            </button>
            <button
              onClick={() => setSelectedCategory('CUM')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedCategory === 'CUM'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Centra Motoryzacyjne i SKP
            </button>
          </div>

          {/* Siatka realizacji */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
          {filteredReferences.map((item: ReferenceItem) => (
            <Card
              key={item.id}
              padding="none"
              className="bg-white flex flex-col justify-between overflow-hidden border border-surface-border"
            >
              <div>
                <div className="overflow-hidden bg-background-subtle border-b border-surface-border">
                  <SiteImage
                    name={item.slug}
                    fit="cover"
                    aspectRatio="4/3"
                    alt={item.clientName}
                    className="w-full"
                  />
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[14px] font-medium text-foreground-secondary block">
                    {item.category === 'ASO' ? 'Autoryzowany Serwis Dealerski' : 'Centrum Motoryzacyjne'}
                  </span>
                  <h2 className="text-[18px] font-semibold text-foreground">
                    {item.clientName}
                  </h2>
                  <p className="text-[15px] text-foreground-secondary leading-relaxed pt-1">
                    {formatPolishTypography(item.description)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA do kontaktu */}
        <div className="p-8 md:p-12 bg-white border border-surface-border rounded-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-[65ch] space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Planujesz modernizację lub wyposażenie stanowiska?
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              Skontaktuj się z nami. Pomożemy w doborze aparatury pomiarowej, przygotowaniu fundamentów oraz procedurach odbiorowych.
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
