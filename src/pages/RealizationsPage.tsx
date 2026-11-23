import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { CornerBrackets, Crosshair } from '@/components/ui/MeasurementMarks';
import {
  RealizationLightbox,
  RealizationLightboxItem,
} from '@/components/ui/RealizationLightbox';
import { REFERENCES_DATA, ReferenceItem, ReferenceEquipment } from '@/data/references';
import { PRODUCTS_DATA } from '@/data/products';
import { COMPANY_DATA } from '@/data/company';
import { getCollectionJsonLd } from '@/utils/seo';
import { formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { ExternalLink, MapPin, Phone } from 'lucide-react';

export const RealizationsPage: React.FC = () => {
  // Stan aktywnego lightboxu (wyposażenie lub galeria obiektu)
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    items: RealizationLightboxItem[];
    initialIndex: number;
    clientName: string;
  }>({
    isOpen: false,
    items: [],
    initialIndex: 0,
    clientName: '',
  });

  // Jedna siatka kart posortowana według marki, potem nazwy
  const sortedReferences = useMemo(() => {
    return [...REFERENCES_DATA].sort((a, b) => {
      const brandA = a.brand === 'inne' ? 'Inne' : a.brand;
      const brandB = b.brand === 'inne' ? 'Inne' : b.brand;
      const brandCompare = brandA.localeCompare(brandB, 'pl');
      if (brandCompare !== 0) return brandCompare;
      return a.name.localeCompare(b.name, 'pl');
    });
  }, []);

  const openEquipmentLightbox = (item: ReferenceItem, initialIdx: number = 0) => {
    if (!item.equipment || item.equipment.length === 0) return;

    const items: RealizationLightboxItem[] = item.equipment.map((eq: ReferenceEquipment) => {
      const prod = eq.productSlug
        ? PRODUCTS_DATA.find((p) => p.slug === eq.productSlug)
        : undefined;

      return {
        photo: prod ? prod.slug : eq.photo,
        title: prod ? prod.name : eq.name || eq.caption || 'Zainstalowane urządzenie',
        caption: eq.caption || (prod ? prod.shortDescription : undefined),
        productUrl: prod ? `/produkty/${prod.categorySlug}/${prod.slug}` : undefined,
        isCatalogProduct: Boolean(prod),
      };
    });

    setLightboxData({
      isOpen: true,
      items,
      initialIndex: initialIdx,
      clientName: item.name,
    });
  };

  const openCoverLightbox = (item: ReferenceItem) => {
    const photos = [item.cover, ...(item.gallery || [])].filter((p): p is string => Boolean(p));
    if (photos.length <= 1) return;

    const items: RealizationLightboxItem[] = photos.map((img, idx) => ({
      photo: img,
      title: `${item.name}`,
      caption: `Zdjęcie obiektu wdrożeniowego (${idx + 1} z ${photos.length})`,
    }));

    setLightboxData({
      isOpen: true,
      items,
      initialIndex: 0,
      clientName: item.name,
    });
  };

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

      {/* Kompaktowy nagłówek Hero: H1 i jedno zdanie oparte na źródłach */}
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
            <div className="text-sm text-foreground-secondary shrink-0 font-normal">
              Łącznie:{' '}
              <strong className="text-foreground font-semibold">
                {sortedReferences.length}
              </strong>{' '}
              wdrożeń
            </div>
          </div>
        </Container>
      </div>

      {/* Główna sekcja: 2 kolumny na desktopie, 1 kolumna na mobile */}
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {sortedReferences.map((item: ReferenceItem) => {
            const hasCover = Boolean(item.cover);
            const hasMultiCover = Boolean(hasCover && item.gallery && item.gallery.length > 0);
            const hasEquipment = Boolean(item.equipment && item.equipment.length > 0);
            const equipmentList = item.equipment || [];
            const visibleEquipment = equipmentList.slice(0, 3);
            const remainingCount = equipmentList.length - 3;

            return (
              <article
                key={item.slug}
                id={item.slug}
                className="relative flex flex-col bg-white border border-surface-border rounded-[16px] p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow duration-200 scroll-mt-28"
              >
                {/* Kotwica kompatybilności wstecznej dla #zst-kutno */}
                {item.slug === 'zs1-kutno' && (
                  <span id="zst-kutno" className="absolute -top-28 pointer-events-none invisible" />
                )}

                {/* 1. OKŁADKA 3:2 */}
                <div className="relative aspect-[3/2] w-full rounded-[14px] overflow-hidden bg-[#F7F7F5] border border-surface-border/80 mb-5">
                  <CornerBrackets size={16} color="#EE9D16" />

                  {hasCover ? (
                    hasMultiCover ? (
                      <button
                        type="button"
                        onClick={() => openCoverLightbox(item)}
                        className="w-full h-full text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent block"
                        aria-label={`Powiększ zdjęcia obiektu ${item.name}`}
                      >
                        <SiteImage
                          name={item.cover!}
                          fit="cover"
                          aspectRatio="3/2"
                          plain={true}
                          alt={`Obiekt: ${item.name}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          style={{
                            objectPosition: item.objectPosition || 'center',
                            filter: 'contrast(0.95) saturate(0.95)',
                          }}
                        />
                      </button>
                    ) : (
                      <div className="w-full h-full overflow-hidden">
                        <SiteImage
                          name={item.cover!}
                          fit="cover"
                          aspectRatio="3/2"
                          plain={true}
                          alt={`Obiekt: ${item.name}`}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: item.objectPosition || 'center',
                            filter: 'contrast(0.95) saturate(0.95)',
                          }}
                        />
                      </div>
                    )
                  ) : (
                    /* Wariant bez zdjęcia: panel #F7F7F5 z nazwą 24px/600, marka/miasto, wzór Crosshair 6% */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#F7F7F5]">
                      <Crosshair size={48} opacity={0.06} className="text-foreground" />
                      <span className="relative z-10 text-[22px] sm:text-[24px] font-semibold text-foreground tracking-tight leading-snug max-w-sm">
                        {item.name}
                      </span>
                      <span className="relative z-10 text-[15px] text-[#4B5563] mt-2">
                        {item.brand === 'inne' ? 'Edukacja techniczna' : item.brand}
                        {item.city ? ` · ${item.city}` : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. DANE REALIZACJI */}
                <div className="flex flex-col flex-1">
                  {/* Linia meta: marka · pin miasto, 15 px, kolor #4B5563, zwykły font */}
                  <div className="flex items-center gap-2 text-[15px] text-[#4B5563] leading-normal">
                    <span>{item.brand === 'inne' ? 'Edukacja techniczna' : item.brand}</span>
                    {item.city && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
                          <span>{item.city}</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Nazwa klienta: 20-22 px, 600 */}
                  <h2 className="text-[20px] sm:text-[22px] font-semibold text-foreground tracking-tight mt-1.5 leading-snug">
                    {item.name}
                  </h2>

                  {/* Link Strona klienta z ikoną zewnętrzną */}
                  <div className="mt-2.5">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent hover:underline w-fit min-h-[32px]"
                    >
                      <span>Strona klienta</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>

                  {/* 3. SEKCJA WYPOSAŻENIE (renderowana WYŁĄCZNIE gdy equipment nie jest puste) */}
                  {hasEquipment && (
                    <div className="mt-5 pt-4 border-t border-surface-border">
                      <span className="text-[15px] text-[#4B5563] block mb-3 font-normal">
                        Wyposażenie
                      </span>

                      {/* Rząd miniatur z zawijaniem na mobile (bez poziomego scrolla) */}
                      <div className="flex flex-wrap items-start gap-3 sm:gap-4">
                        {visibleEquipment.map((eq: ReferenceEquipment, eqIdx: number) => {
                          const prod = eq.productSlug
                            ? PRODUCTS_DATA.find((p) => p.slug === eq.productSlug)
                            : undefined;

                          const modelName = prod ? prod.name : eq.name;
                          const photoSrc = prod ? prod.slug : eq.photo;
                          const isCatalog = Boolean(prod);
                          const productHref = prod
                            ? `/produkty/${prod.categorySlug}/${prod.slug}`
                            : undefined;

                          const thumbnailContent = (
                            <>
                              {/* Kwadrat 72 px (88 px od 1280 px), tło #F7F7F5, ramka 1px #E5E7EB, p-2, object-contain */}
                              <div className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] min-h-[44px] min-w-[44px] rounded-[8px] bg-[#F7F7F5] border border-[#E5E7EB] p-2 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors overflow-hidden">
                                {photoSrc ? (
                                  <SiteImage
                                    name={photoSrc}
                                    fit="contain"
                                    aspectRatio="1/1"
                                    plain={true}
                                    alt={modelName || 'Wyposażenie'}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[11px] text-foreground-secondary">
                                    Sprzęt
                                  </div>
                                )}
                              </div>

                              {/* Nazwa modelu: 14-15 px, max 2 linie, monospace dla symbolu */}
                              {modelName ? (
                                <span className="text-[13px] sm:text-[14px] font-mono text-foreground line-clamp-2 max-w-[88px] group-hover:underline leading-tight">
                                  {modelName}
                                </span>
                              ) : null}
                            </>
                          );

                          return isCatalog && productHref ? (
                            <Link
                              key={eqIdx}
                              to={productHref}
                              className="group flex flex-col items-center text-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[8px]"
                              title={`Przejdź do: ${modelName}`}
                            >
                              {thumbnailContent}
                            </Link>
                          ) : (
                            <button
                              key={eqIdx}
                              type="button"
                              onClick={() => openEquipmentLightbox(item, eqIdx)}
                              className="group flex flex-col items-center text-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[8px]"
                              title={modelName ? `Powiększ: ${modelName}` : 'Powiększ zdjęcie urządzenia'}
                              aria-label={modelName ? `Powiększ wyposażenie: ${modelName}` : 'Powiększ zdjęcie urządzenia'}
                            >
                              {thumbnailContent}
                            </button>
                          );
                        })}

                        {/* Kafelek "+N" przy więcej niż 3 pozycjach wyposażenia */}
                        {remainingCount > 0 && (
                          <button
                            type="button"
                            onClick={() => openEquipmentLightbox(item, 3)}
                            className="group flex flex-col items-center text-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[8px]"
                            aria-label={`Zobacz wszystkie pozycje wyposażenia (${equipmentList.length})`}
                          >
                            <div className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] min-h-[44px] min-w-[44px] rounded-[8px] bg-[#F7F7F5] border border-[#E5E7EB] flex flex-col items-center justify-center shrink-0 group-hover:border-accent text-foreground group-hover:text-accent-text transition-colors">
                              <span className="text-[17px] font-bold">+{remainingCount}</span>
                            </div>
                            <span className="text-[12px] sm:text-[13px] text-foreground-secondary group-hover:text-foreground line-clamp-2 max-w-[88px] leading-tight">
                              Więcej
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Czysty CTA na dole bez obietnic */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-background-subtle border border-surface-border rounded-[14px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Wyposażasz stację lub warsztat? Zapytaj o ofertę
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={cleanTelHref(COMPANY_DATA.phones.salesInfo.raw)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-foreground bg-background border border-surface-border rounded-md hover:bg-surface-hover transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-accent-text" />
              <span>{formatPhoneWithNbsp(COMPANY_DATA.phones.salesInfo.display)}</span>
            </a>
            <Button to="/kontakt" variant="primary" size="md" className="min-h-[44px]">
              Zapytaj o ofertę
            </Button>
          </div>
        </div>
      </Container>

      {/* Dostępny Lightbox Modal */}
      <RealizationLightbox
        isOpen={lightboxData.isOpen}
        items={lightboxData.items}
        initialIndex={lightboxData.initialIndex}
        clientName={lightboxData.clientName}
        onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
