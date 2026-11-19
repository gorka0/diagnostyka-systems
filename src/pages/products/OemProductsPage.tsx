import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { PRODUCTS_DATA, ProductItem } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight } from 'lucide-react';

interface OemBrandGroup {
  id: string;
  name: string;
  homologation: string;
  description: string;
  products: ProductItem[];
}

export const OemProductsPage: React.FC = () => {
  const oemProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === 'urzadzenia-oem');
  }, []);

  const brandGroups: OemBrandGroup[] = useMemo(() => {
    const vag: ProductItem[] = [];
    const bmw: ProductItem[] = [];
    const mercedes: ProductItem[] = [];
    const toyota: ProductItem[] = [];

    oemProducts.forEach((p) => {
      const matchStr = (p.details?.[0] || p.shortDescription || p.name).toLowerCase();
      if (matchStr.includes('bmw')) {
        bmw.push(p);
      } else if (matchStr.includes('vag') || p.name.startsWith('VAS')) {
        vag.push(p);
      } else if (matchStr.includes('mercedes')) {
        mercedes.push(p);
      } else if (matchStr.includes('toyota')) {
        toyota.push(p);
      } else {
        // default fallback to VAG if VAS
        if (p.name.includes('VAS')) vag.push(p);
        else vag.push(p);
      }
    });

    return [
      {
        id: 'bmw',
        name: 'BMW Group',
        homologation: 'Systemy pomiarowe KDS / ASO BMW & MINI',
        description: 'Systemy kontroli geometrii kół Beissbarth KDS oraz wyważarki i montażownice dedykowane dla autoryzowanych stacji dealerskich BMW Group.',
        products: bmw,
      },
      {
        id: 'vag',
        name: 'Grupa VAG',
        homologation: 'Certyfikacja fabryczna VAS (Volkswagen, Audi, SEAT, Škoda)',
        description: 'Aparatura do pomiaru geometrii podwozia, wyważarki i stanowiska diagnostyczne posiadające oficjalne numery homologacji VAS producenta.',
        products: vag,
      },
      {
        id: 'mercedes',
        name: 'Mercedes-Benz',
        homologation: 'Specyfikacja pomiarowa Daimler AG',
        description: 'Aparatura serii ML TECH oraz wyważarki kół zoptymalizowane pod procedury pomiarowe i wymagania techniczne Mercedes-Benz.',
        products: mercedes,
      },
      {
        id: 'toyota',
        name: 'Toyota',
        homologation: 'Aparatura rekomendowana dla ASO Toyota & Lexus',
        description: 'Rekomendowane przez koncern Toyota urządzenia do pomiaru geometrii podwozia 3D oraz stanowiska diagnostyczne dla autoryzowanych serwisów.',
        products: toyota,
      },
    ];
  }, [oemProducts]);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Urządzenia OEM – Homologacje BMW, VAG, Mercedes, Toyota | Diagnostyka-Systems"
        description="Aparatura diagnostyczna Beissbarth z oficjalnymi homologacjami fabrycznymi producentów pojazdów: BMW KDS, Grupa VAG (VAS), Mercedes-Benz i Toyota."
        canonicalPath="/urzadzenia-oem"
      />

      <PageHero
        variant="compact"
        breadcrumbs={[
          { label: 'Produkty', to: '/produkty' },
          { label: 'Urządzenia OEM' },
        ]}
        title="Urządzenia z homologacjami OEM"
        description="Aparatura diagnostyczna i warsztatowa Beissbarth spełniająca normy techniczne i procedury certyfikacyjne wiodących koncernów motoryzacyjnych."
      />

      {/* Sticky nawigacja kotwicowa dla 4 marek OEM */}
      <nav aria-label="Nawigacja marek OEM" className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 no-scrollbar">
            <span className="text-[13px] font-mono text-foreground-secondary uppercase tracking-wider shrink-0 mr-2">
              Marki OEM:
            </span>
            {brandGroups.map((brand) => (
              <a
                key={brand.id}
                href={`#${brand.id}`}
                className="text-[14px] sm:text-[15px] font-semibold text-foreground hover:text-accent-text transition-colors whitespace-nowrap px-3 py-1.5 rounded-[6px] hover:bg-background-subtle shrink-0"
              >
                {brand.name}{' '}
                <span className="text-[12px] font-mono text-foreground-secondary ml-1">
                  ({brand.products.length})
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">
        {brandGroups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-32 space-y-8">
            {/* Wyrazisty nagłówek typograficzny bez logo producenta */}
            <div className="border-b-2 border-foreground pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[13px] font-mono text-accent-text font-bold uppercase tracking-wider block mb-1">
                  {group.homologation}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  {group.name}
                </h2>
              </div>
              <p className="text-[15px] text-foreground-secondary max-w-[55ch] leading-relaxed">
                {formatPolishTypography(group.description)}
              </p>
            </div>

            {/* Lista urządzeń z numerami katalogowymi (monospace) i linkami do kart produktów */}
            <div className="divide-y divide-surface-border border-b border-surface-border">
              {group.products.map((product) => (
                <Link
                  key={product.slug}
                  to={`/produkty/${product.categorySlug}/${product.slug}`}
                  className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-background-subtle/80 px-3 -mx-3 rounded-[8px] transition-colors"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    {/* Numer katalogowy / homologacja w monospace */}
                    <span className="font-mono text-[16px] sm:text-[18px] font-bold text-foreground group-hover:text-accent-text transition-colors tabular-nums min-w-[120px]">
                      {product.name}
                    </span>
                    <span className="text-[14px] sm:text-[15px] text-foreground-secondary font-medium">
                      {product.shortDescription !== product.name ? product.shortDescription : 'Aparatura diagnostyczna Beissbarth'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[14px] font-semibold text-accent-text group-hover:translate-x-1 transition-transform self-end sm:self-auto shrink-0">
                    <span>Szczegóły urządzenia</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
