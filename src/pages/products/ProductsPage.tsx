import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS_DATA } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { Search, ArrowRight } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 8 głównych kategorii (bez "Nowości")
  const mainCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((c) => c.slug !== 'nowosci');
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Ignorujemy kategorię nowości
      if (product.categorySlug === 'nowosci') return false;

      const matchesCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;

      if (!searchTerm.trim()) {
        return matchesCategory;
      }

      const q = searchTerm.toLowerCase();
      const inName = product.name.toLowerCase().includes(q);
      const inDesc = product.shortDescription.toLowerCase().includes(q);

      return matchesCategory && (inName || inDesc);
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Katalog urządzeń diagnostycznych Beissbarth | Diagnostyka-Systems"
        description="Oferta aparatury warsztatowej Beissbarth: geometria kół 3D i CCD, wyważarki, montażownice opon G-Frame, linie rolkowe SKP, stacje klimatyzacji Valeo."
        canonicalPath="/produkty"
      />
      <PageHeader
        breadcrumbs={[{ label: 'Produkty' }]}
        title="Katalog urządzeń diagnostycznych"
        description="Aparatura pomiarowa i wyposażenie warsztatowe dla Stacji Kontroli Pojazdów, serwisów ASO oraz warsztatów mechanicznych."
      />
      <div className="py-12 md:py-16">
        <Container>
          {/* Wyszukiwarka i filtry kategorii */}
          <div className="bg-background-subtle border border-surface-border rounded-[14px] p-6 mb-12">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Szukaj urządzenia (np. Q.Lign, ML 8, MT 788, G-Frame)..."
                className="w-full h-[52px] pl-12 pr-4 text-[16px] bg-white border border-[#D9DDE1] rounded-[10px] text-foreground placeholder:text-foreground-secondary/70 focus:outline-none focus:border-graphite-900 focus:ring-4 focus:ring-accent-light/35 transition-all"
              />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-foreground-secondary hover:text-foreground font-medium"
              >
                Wyczyść
              </button>
            )}
          </div>

          {/* Filtry kategorii: 8 głównych kategorii */}
          <div className="flex items-center gap-2 flex-wrap mt-6 pt-6 border-t border-surface-border">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                selectedCategory === 'all'
                  ? 'bg-foreground text-white'
                  : 'bg-background hover:bg-background-subtle text-foreground-secondary border border-surface-border'
              }`}
            >
              Wszystkie ({PRODUCTS_DATA.filter((p) => p.categorySlug !== 'nowosci').length})
            </button>
            {mainCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`text-[15px] px-4 py-2 rounded-[8px] transition-colors font-medium ${
                  selectedCategory === cat.slug
                    ? 'bg-foreground text-white'
                    : 'bg-background hover:bg-background-subtle text-foreground-secondary border border-surface-border'
                }`}
              >
                {cat.name} ({cat.productCount})
              </button>
            ))}
          </div>
        </div>

        {/* Siatka produktów równej wysokości */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-surface-border rounded-[10px] p-12 text-center max-w-lg mx-auto">
            <h2 className="text-[18px] font-semibold text-foreground mb-2">
              Brak pasujących urządzeń
            </h2>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Nie znaleziono produktów dla wpisanej frazy.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center text-[15px] font-semibold px-5 py-2.5 bg-foreground text-white rounded-[10px] hover:bg-foreground/90 transition-colors"
            >
              Zresetuj filtry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const cat = mainCategories.find((c) => c.slug === product.categorySlug);
              return (
                <Link
                  key={`${product.categorySlug}-${product.slug}`}
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
                      <span className="text-[14px] font-medium text-foreground-secondary block mb-1">
                        {cat?.name || product.categorySlug}
                      </span>
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
              );
            })}
          </div>
        )}
      </Container>
    </div>
  </div>
);
};
