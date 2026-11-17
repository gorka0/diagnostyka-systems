import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS_DATA } from '@/data/products';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { kategoria } = useParams<{ kategoria: string }>();
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  const category = useMemo(() => {
    return PRODUCT_CATEGORIES.find((c) => c.slug === kategoria);
  }, [kategoria]);

  const categoryProducts = useMemo(() => {
    if (!kategoria) return [];
    return PRODUCTS_DATA.filter((p) => p.categorySlug === kategoria);
  }, [kategoria]);

  const subcategories = useMemo(() => {
    if (!category?.subcategories) return [];
    return category.subcategories;
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (activeSubcategory === 'all') return categoryProducts;
    return categoryProducts.filter((p) => {
      if (p.subcategory) return p.subcategory === activeSubcategory;
      const subLower = activeSubcategory.toLowerCase();
      if (subLower.includes('wyważarki')) {
        return p.name.toLowerCase().includes('wyważarka') || p.originalUrl.includes('wywazarki');
      }
      if (subLower.includes('demontażownice')) {
        return (
          p.name.toLowerCase().includes('demontażownica') ||
          p.name.toLowerCase().includes('servomat') ||
          p.originalUrl.includes('demontazownice')
        );
      }
      if (subLower.includes('geometria')) {
        return p.name.toLowerCase().includes('geometria') || p.originalUrl.includes('geometria');
      }
      return (
        p.name.toLowerCase().includes(subLower) ||
        p.shortDescription.toLowerCase().includes(subLower)
      );
    });
  }, [categoryProducts, activeSubcategory]);

  if (!category) {
    return (
      <div className="bg-background min-h-[80vh] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background-subtle rounded-[16px] p-12 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Kategoria nie została odnaleziona
            </h1>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Kategoria o podanym adresie nie istnieje w katalogu.
            </p>
            <Button to="/produkty" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do katalogu produktów
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title={`${category.name} | Urządzenia Beissbarth – Diagnostyka-Systems`}
        description={category.description}
        canonicalPath={`/produkty/${category.slug}`}
      />

      {/* Spójny nagłówek podstrony: #F7F7F5, breadcrumb, H1 48 px, 1 zdanie, Crosshair 5% */}
      <PageHeader
        breadcrumbs={[
          { label: 'Produkty', to: '/produkty' },
          { label: category.name },
        ]}
        title={category.name}
        description={category.description}
        badge="Kategoria urządzeń"
      />

      {/* Poziome pigułki filtru, sticky pod headerem (top-20) */}
      {subcategories.length > 0 && (
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-surface-border py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveSubcategory('all')}
                className={`text-[14px] sm:text-[15px] px-4 py-2 rounded-full transition-colors font-medium shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  activeSubcategory === 'all'
                    ? 'bg-graphite-900 text-white'
                    : 'bg-background-subtle hover:bg-gray-200 text-foreground-secondary'
                }`}
              >
                Wszystkie ({categoryProducts.length})
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveSubcategory(sub)}
                  className={`text-[14px] sm:text-[15px] px-4 py-2 rounded-full transition-colors font-medium shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                    activeSubcategory === sub
                      ? 'bg-graphite-900 text-white'
                      : 'bg-background-subtle hover:bg-gray-200 text-foreground-secondary'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Główna sekcja z siatką kart produktów */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {filteredProducts.length === 0 ? (
          <div className="bg-background-subtle rounded-[16px] p-12 text-center max-w-lg mx-auto">
            <h2 className="text-[18px] font-semibold text-foreground mb-2">
              Karty produktów w przygotowaniu
            </h2>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Szczegółowa oferta urządzeń w tym dziale jest dostępna bezpośrednio u naszych doradców technicznych.
            </p>
            <Button
              to={`/kontakt?temat=Zapytanie o ${encodeURIComponent(category.name)}`}
              variant="primary"
            >
              Zapytaj o urządzenia
            </Button>
          </div>
        ) : (
          /* Karty produktów: bez ramek, tło #F7F7F5, zdjęcie object-contain */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                to={`/produkty/${category.slug}/${product.slug}`}
                className="group flex flex-col justify-between h-full bg-background-subtle rounded-[16px] p-6 sm:p-7 transition-all duration-300 hover:bg-[#EEF0F2] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                {/* Zdjęcie produktu na białym tle z paddingiem (object-contain) */}
                <div className="mb-6 aspect-[4/3] w-full rounded-[12px] bg-white overflow-hidden p-4 flex items-center justify-center">
                  <SiteImage
                    name={product.slug}
                    fit="contain"
                    aspectRatio="4/3"
                    alt={product.name}
                    className="w-full h-full bg-transparent border-0 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="text-[20px] font-semibold text-foreground group-hover:text-accent-text transition-colors line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                      {formatPolishTypography(product.shortDescription)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-[15px] font-semibold text-foreground group-hover:text-accent-text transition-colors">
                    <span>Zobacz dane techniczne</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
