import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCTS_DATA, ProductItem } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight } from 'lucide-react';

interface OemBrand {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

const OEM_BRANDS: OemBrand[] = [
  {
    id: 'vag',
    name: 'Grupa VAG (Volkswagen, Audi, Seat, Skoda)',
    tagline: 'Certyfikacja VAS',
    description: 'Aparatura do pomiaru geometrii podwozia, wyważarki i urządzenia warsztatowe posiadające oficjalne numery homologacji VAS producenta.',
  },
  {
    id: 'bmw',
    name: 'BMW Group',
    tagline: 'Systemy KDS',
    description: 'Systemy kontroli geometrii kół Beissbarth KDS dedykowane dla autoryzowanych stacji dealerskich BMW i MINI na całym świecie.',
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    tagline: 'Aparatura dedykowana',
    description: 'Specjalne wersje systemów geometrii kół serii ML TECH oraz wyważarek zoptymalizowane pod procedury pomiarowe Daimler AG.',
  },
  {
    id: 'toyota',
    name: 'Toyota / Lexus',
    tagline: 'Wyposażenie ASO Toyota',
    description: 'Rekomendowane przez koncern Toyota urządzenia do pomiaru geometrii podwozia i wyważania kół dla autoryzowanych stacji.',
  },
];

export const OemProductsPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const oemProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === 'urzadzenia-oem');
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'all') return oemProducts;
    return oemProducts.filter((p) => {
      const q = selectedBrand.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    });
  }, [oemProducts, selectedBrand]);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Urządzenia OEM – Homologacje BMW, VAG, Mercedes, Toyota | Diagnostyka-Systems"
        description="Aparatura diagnostyczna Beissbarth z oficjalnymi homologacjami fabrycznymi producentów pojazdów: BMW KDS, Grupa VAG (VAS), Mercedes-Benz i Toyota."
        canonicalPath="/urzadzenia-oem"
      />
      <PageHeader
        breadcrumbs={[
          { label: 'Produkty', to: '/produkty' },
          { label: 'Urządzenia OEM' },
        ]}
        title="Urządzenia z homologacjami OEM"
        description="Oficjalna aparatura diagnostyczna i warsztatowa Beissbarth spełniająca rygorystyczne normy techniczne i procedury certyfikacyjne wiodących koncernów motoryzacyjnych."
      />
      <div className="py-12 md:py-16">
        <Container>
          {/* Filtry marek */}
          <div className="flex items-center gap-2 flex-wrap mb-10 pb-6 border-b border-surface-border">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedBrand === 'all'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Wszyscy producenci ({oemProducts.length})
            </button>
            <button
              onClick={() => setSelectedBrand('vag')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedBrand === 'vag'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Grupa VAG (VAS)
            </button>
            <button
              onClick={() => setSelectedBrand('bmw')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedBrand === 'bmw'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              BMW Group (KDS)
            </button>
            <button
              onClick={() => setSelectedBrand('mercedes')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedBrand === 'mercedes'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Mercedes-Benz
            </button>
            <button
              onClick={() => setSelectedBrand('toyota')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedBrand === 'toyota'
                  ? 'bg-foreground text-white'
                  : 'bg-white hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Toyota
            </button>
          </div>

          {/* 4 Kluczowe programy homologacji */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {OEM_BRANDS.map((brand) => (
            <Card key={brand.id} padding="lg" className="space-y-3">
              <span className="text-[14px] font-medium text-foreground-secondary block">
                {brand.tagline}
              </span>
              <h2 className="text-[18px] font-semibold text-foreground">
                {brand.name}
              </h2>
              <p className="text-[14px] md:text-[15px] text-foreground-secondary leading-relaxed">
                {formatPolishTypography(brand.description)}
              </p>
            </Card>
          ))}
        </div>

        {/* Lista urządzeń OEM */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Aparatura z certyfikacją fabryczną
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: ProductItem) => (
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
                    <span>Zobacz dane techniczne</span>
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
              Szukasz urządzenia dla konkretnego standardu ASO?
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              Doradzimy w doborze aparatury spełniającej wymogi certyfikacyjne Twojej marki dealerskiej.
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
