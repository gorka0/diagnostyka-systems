import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { getHomepageJsonLd } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import { SiteImage } from '@/components/common/SiteImage';
import { Crosshair, CornerBrackets, MeasurementDivider } from '@/components/ui/MeasurementMarks';
import { CertificateLightbox } from '@/components/ui/CertificateLightbox';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PROMOTIONS_DATA } from '@/data/promotions';
import { REFERENCES_DATA } from '@/data/references';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { PARTNERS_DATA } from '@/data/partners';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { formatPolishTypography, formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import {
  MapPin,
  ArrowRight,
  Wrench,
  SlidersHorizontal,
  RefreshCw,
  Layers,
  Phone,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const activePromo = PROMOTIONS_DATA.find((p) => p.active);
  // 8 głównych kategorii w układzie Bento
  const mainCategories = PRODUCT_CATEGORIES.filter((c) => c.slug !== 'nowosci').slice(0, 8);
  const featuredCategories = mainCategories.filter((c) => c.featured);
  const standardCategories = mainCategories.filter((c) => !c.featured);

  // 2 najnowsze publikacje
  const recentPublications = PUBLICATIONS_DATA.slice(0, 2);

  // 3 grupy odbiorców z bazy wiedzy (układ editorial)
  const targetGroups = [
    {
      title: 'Stacje Kontroli Pojazdów (SKP)',
      description:
        'Certyfikowane systemy pomiaru geometrii kół i osi oraz linie diagnostyczne dopuszczone urzędowo atestami ITS do badań technicznych.',
      link: '/produkty/linie-diagnostyczne',
    },
    {
      title: 'Autoryzowane Stacje Obsługi (ASO)',
      description:
        'Aparatura diagnostyczna i cyfrowe przyrządy do świateł Matrix LED (MLD 815) z certyfikacją do badań i kalibracji reflektorów w ASO i SKP.',
      link: '/produkty/urzadzenia-do-swiatel',
    },
    {
      title: 'Warsztaty mechaniczne i oponiarskie',
      description:
        'Wyważarki diagnostyczne, montażownice serii TC do opon Run-Flat oraz stacje klimatyzacji z bezpośrednią opieką serwisową z Lisiego Ogona.',
      link: '/oferta',
    },
  ];

  // 4 usługi serwisu w siatce 2x2 z bazy wiedzy
  const serviceHighlights = [
    {
      icon: Wrench,
      title: 'Serwis gwarancyjny i pogwarancyjny',
      description:
        'Fabryczna opieka serwisowa urządzeń Beissbarth i stacji klimatyzacji Valeo / SPX mobilnymi wozami na terenie całej Polski.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Kalibracje i atesty okresowe',
      description:
        'Certyfikowane kalibracje przyrządami fabrycznymi przed odbiorami TDT oraz okresowe badania zgodności z normami ITS.',
    },
    {
      icon: RefreshCw,
      title: 'Remonty i regeneracja podzespołów',
      description:
        'Kompleksowa odbudowa mechaniczna i elektroniczna urządzeń używanych (geometrii i rolek hamulcowych) z gwarancją serwisu.',
    },
    {
      icon: Layers,
      title: 'Magazyn oryginalnych części zamiennych',
      description:
        'Bezpośredni dostęp do magazynu części w Lisim Ogonie k. Bydgoszczy oraz szybkie dostawy z fabryki w Monachium.',
    },
  ];

  return (
    <div>
      <Seo
        title="Beissbarth serwis Bydgoszcz, Łochowo – Wyposażenie SKP i warsztatów | Diagnostyka-Systems"
        description="Autoryzowany dystrybutor i serwis Beissbarth – Bydgoszcz, Łochowo, Lisi Ogon i cała Polska. Geometria kół 3D, linie SKP, wyważarki, montażownice."
        canonicalPath="/"
        jsonLd={getHomepageJsonLd()}
      />

      {/* 1. NOWE HERO (CIEMNA SEKCJA GRAPHITE-900) */}
      <section className="relative bg-graphite-900 text-white overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 lg:pb-24">
        {/* Wzór siatki pomiarowej Crosshair (6% krycia) */}
        <div aria-hidden="true" className="absolute inset-0 text-white opacity-[0.06] pointer-events-none">
          <Crosshair size={64} />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-8 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lewa kolumna (kol. 1-8): Treść i CTA */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              {/* Eyebrow: 14-15 px z małą pomarańczową kropką */}
              <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-normal text-white/80">
                <span className="w-2 h-2 rounded-full bg-accent-light shrink-0" />
                <span>Autoryzowany dystrybutor i serwis Beissbarth</span>
              </div>

              {/* H1: proporcjonalny rytm na mobile i desktop */}
              <h1 className="text-[29px] min-[420px]:text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[58px] font-semibold text-white tracking-[-0.025em] leading-[1.08] text-balance">
                Sprzęt diagnostyczny i serwis Beissbarth dla warsztatów i stacji kontroli pojazdów
              </h1>

              {/* 1 zdanie opisu, 16-20 px */}
              <p className="text-[16px] sm:text-[19px] lg:text-[20px] text-white/75 leading-relaxed max-w-[56ch] text-pretty">
                {formatPolishTypography(
                  'Siedziba i magazyn w Lisim Ogonie k. Bydgoszczy, rejestracja w Łochowie. Obsługujemy SKP, ASO i serwisy w całej Polsce.'
                )}
              </p>

              {/* Dwa przyciski o wysokości 50-52 px */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  to="/produkty"
                  variant="primary"
                  size="md"
                  className="h-[48px] sm:h-[52px] px-7 sm:px-8 text-[16px] font-semibold justify-center"
                >
                  {LABELS.cta.seeProducts}
                </Button>
                <Button
                  to="/kontakt?typ=serwis"
                  variant="outline"
                  size="md"
                  className="h-[48px] sm:h-[52px] px-7 sm:px-8 text-[16px] font-semibold justify-center border-white/75 text-white hover:bg-white/10"
                >
                  {LABELS.cta.serviceTicket}
                </Button>
              </div>
            </div>

            {/* Prawa kolumna (kol. 9-12): 3 fakty w pionie z delikatnym rozdzieleniem */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/12 lg:pl-8 pt-4 lg:pt-0">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <span className="text-[26px] sm:text-[36px] lg:text-[40px] font-semibold text-white tabular-nums tracking-tight block">
                    2004
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-white/72 block leading-snug">
                    założenie firmy
                  </span>
                </div>
                <div className="border-l border-white/12 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0 lg:border-t lg:border-white/12 lg:pt-4 space-y-1">
                  <span className="text-[26px] sm:text-[36px] lg:text-[40px] font-semibold text-white tabular-nums tracking-tight block">
                    2005
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-white/72 block leading-snug">
                    autoryzacja Beissbarth
                  </span>
                </div>
                <div className="border-l border-white/12 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0 lg:border-t lg:border-white/12 lg:pt-4 space-y-1">
                  <span className="text-[26px] sm:text-[36px] lg:text-[40px] font-semibold text-white tabular-nums tracking-tight block">
                    2007
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-white/72 block leading-snug">
                    uprawnienia ITS dla SKP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panoramiczne zdjęcie siedziby i floty w poziomie bez ucinania (naturalne proporcje 1024/338) */}
          <div className="relative w-full">
            <CornerBrackets size={16} color="#F5A524" />

            <div className="relative aspect-[1024/338] w-full rounded-[16px] overflow-hidden border border-white/12 bg-graphite-800 shadow-2xl">
              <picture className="w-full h-full block">
                <source srcSet="/images/budynek-firmy-lisi-ogon.webp" type="image/webp" />
                <img
                  src="/images/budynek-firmy-lisi-ogon.jpg"
                  alt="Siedziba, magazyn i flota serwisowa Diagnostyka-Systems w Lisim Ogonie k. Bydgoszczy"
                  width={1024}
                  height={338}
                  className="w-full h-full object-cover object-center"
                  {...({ fetchpriority: 'high' } as any)}
                  loading="eager"
                  decoding="async"
                />
              </picture>

              {/* Chip 'Lisi Ogon k. Bydgoszczy' w lewym dolnym rogu */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-[8px] bg-graphite-900/85 backdrop-blur-md border border-white/15 text-white/90 text-[11px] sm:text-[13px] font-medium shadow-lg select-none">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-light shrink-0" />
                <span>Lisi Ogon k. Bydgoszczy</span>
              </div>
            </div>
          </div>

          {/* Podziałka pomiarowa CAD zamykająca blok Hero */}
          <div className="pt-4">
            <MeasurementDivider dark={true} />
          </div>
        </div>
      </section>

      {/* 2. AKTUALNA PROMOCJA (BIAŁA KARTA PONIŻEJ HERO) */}
      {activePromo && (
        <section className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 mb-16 md:mb-24">
          <div className="bg-white rounded-[16px] border border-surface-border p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Lewa: Zdjęcie produktu bez wewnętrznej ramki-matrioszki */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="w-full max-w-[220px] aspect-square rounded-[12px] bg-[#F7F7F5] border border-surface-border/60 p-4 flex items-center justify-center overflow-hidden">
                  <SiteImage
                    name="ml-8-easy-ccd-excellence"
                    fit="contain"
                    plain={true}
                    aspectRatio="1/1"
                    alt={activePromo.title}
                    className="w-full h-full mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Środek: Tytuł i jedna linia szczegółów */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[13px] font-semibold text-accent-text block">
                  Oferta specjalna
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight leading-tight">
                  {formatPolishTypography(activePromo.title)}
                </h2>
                <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(
                    'Kompensacja przez przetaczanie · Certyfikat ITS dla SKP · Dostawa i szkolenie w cenie'
                  )}
                </p>
              </div>

              {/* Prawa: Cena (gdy włączona) lub fakty z oferty i przycisk Zapytaj o promocję */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-surface-border">
                {COMPANY_DATA.showPrices && activePromo.showPrice && activePromo.priceNetto ? (
                  <div>
                    <span className="text-[38px] sm:text-[44px] font-bold text-foreground tracking-tight leading-none tabular-nums block">
                      {activePromo.priceNetto}
                    </span>
                    <span className="text-[14px] text-foreground-secondary block mt-1">
                      cena netto (zestaw gotowy do pracy)
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1 text-left lg:text-right max-w-[30ch]">
                    {activePromo.bonus && (
                      <span className="text-[14px] sm:text-[15px] font-semibold text-foreground block leading-snug">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle -mt-0.5" />
                        {formatPolishTypography(activePromo.bonus)}
                      </span>
                    )}
                    <span className="text-[13px] text-foreground-secondary block">
                      Oficjalna konfiguracja i doradztwo techniczne
                    </span>
                  </div>
                )}
                <Button
                  to={`/kontakt?typ=oferta&produkt=${encodeURIComponent(activePromo.title)}`}
                  variant="primary"
                  size="md"
                  className="h-[50px] sm:h-[52px] px-7 text-[16px] font-semibold w-full sm:w-auto justify-center"
                >
                  {LABELS.cta.askAboutPromotion}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. KATEGORIE PRODUKTÓW (UKŁAD BENTO GRID) */}
      <section className="bg-white py-16 md:py-24 border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-[65ch]">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight">
              Kategorie urządzeń
            </h2>
            <p className="mt-3 text-[16px] sm:text-[18px] text-foreground-secondary leading-relaxed">
              Autoryzowana aparatura pomiarowa Beissbarth GmbH z gwarancją fabryczną i certyfikacją ITS.
            </p>
          </div>

          <div className="space-y-6">
            {/* Rząd 1 Bento: 2 duże karty (Geometria kół i Wyważarki do kół) po 6 kolumn (16:10) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {featuredCategories.map((cat) => {
                const isScenePhoto = cat.slug === 'geometria';
                return (
                  <Link
                    key={cat.id}
                    to={`/produkty/${cat.slug}`}
                    className="group relative lg:col-span-6 rounded-[14px] p-5 sm:p-7 flex flex-col justify-between bg-white border border-surface-border hover:border-foreground/30 hover:shadow-md transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    {/* Nagłówek karty */}
                    <div className="flex items-center justify-between gap-4 z-10">
                      <span className="text-[13px] font-semibold text-accent-text">
                        Wiodąca linia aparatury
                      </span>
                      <div className="w-9 h-9 rounded-full border border-surface-border bg-background-subtle flex items-center justify-center text-foreground transition-[background-color,border-color,transform] duration-200 group-hover:bg-accent group-hover:border-accent group-hover:translate-x-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pojedyncze czyste okno zdjęcia bez matrioszki */}
                    <div
                      className={`relative my-6 aspect-[16/10] w-full rounded-[10px] bg-[#F7F7F5] border border-surface-border/60 flex items-center justify-center overflow-hidden ${
                        isScenePhoto ? 'p-0' : 'p-4'
                      }`}
                    >
                      <CornerBrackets
                        size={14}
                        color="#EE9D16"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      <SiteImage
                        name={cat.imageKey || `cat-${cat.slug}`}
                        fit={isScenePhoto ? 'cover' : 'contain'}
                        plain={true}
                        aspectRatio="16/10"
                        alt={cat.name}
                        className={`w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02] ${
                          isScenePhoto ? 'object-cover' : 'mix-blend-multiply object-contain'
                        }`}
                      />
                    </div>

                    {/* Nazwa i zwięzły opis */}
                    <div className="z-10 space-y-1">
                      <h3 className="text-[21px] sm:text-[22px] font-semibold text-foreground tracking-tight group-hover:text-accent-text transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                        {formatPolishTypography(cat.description)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Rząd 2 Bento: 6 mniejszych kart w 3 kolumnach (4:3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {standardCategories.map((cat) => {
                const isScenePhoto = cat.slug === 'linie-diagnostyczne';
                const isWhiteCutout =
                  cat.slug === 'demontazownice' || cat.slug === 'urzadzenia-do-swiatel';
                return (
                  <Link
                    key={cat.id}
                    to={`/produkty/${cat.slug}`}
                    className="group relative rounded-[14px] p-5 sm:p-6 flex flex-col justify-between bg-white border border-surface-border hover:border-foreground/30 hover:shadow-md transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    {/* Strzałka w prawym górnym rogu */}
                    <div className="flex items-center justify-end z-10">
                      <div className="w-9 h-9 rounded-full border border-surface-border bg-background-subtle flex items-center justify-center text-foreground transition-[background-color,border-color,transform] duration-200 group-hover:bg-accent group-hover:border-accent group-hover:translate-x-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pojedyncze czyste okno zdjęcia 4:3 */}
                    <div
                      className={`relative my-5 aspect-[4/3] w-full rounded-[10px] bg-[#F7F7F5] border border-surface-border/60 flex items-center justify-center overflow-hidden ${
                        isScenePhoto ? 'p-0' : isWhiteCutout ? 'p-4' : 'p-2.5'
                      }`}
                    >
                      <CornerBrackets
                        size={12}
                        color="#EE9D16"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      <SiteImage
                        name={cat.imageKey || `cat-${cat.slug}`}
                        fit={isScenePhoto ? 'cover' : 'contain'}
                        plain={true}
                        aspectRatio="4/3"
                        alt={cat.name}
                        className={`w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02] ${
                          isScenePhoto
                            ? 'object-cover'
                            : isWhiteCutout
                              ? 'mix-blend-multiply object-contain'
                              : 'object-contain rounded-[6px]'
                        }`}
                      />
                    </div>

                    {/* Nazwa i opis */}
                    <div className="z-10 space-y-1">
                      <h3 className="text-[20px] font-semibold text-foreground tracking-tight group-hover:text-accent-text transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[14px] text-foreground-secondary leading-relaxed line-clamp-2">
                        {formatPolishTypography(cat.description)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. DLA KOGO (UKŁAD EDITORIAL ZAMIAST 3 KART) */}
      <section className="bg-background-subtle py-16 md:py-24 border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Lewa kolumna (4/12): Nagłówek i jedno zdanie */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[14px] font-semibold text-accent-text block">
                Zastosowania
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight">
                Dla kogo pracujemy
              </h2>
              <p className="text-[16px] text-foreground-secondary leading-relaxed">
                Aparatura diagnostyczna i wsparcie serwisowe dopasowane do profilu działalności:
              </p>
            </div>

            {/* Prawa kolumna (8/12): 3 wiersze oddzielone hairline */}
            <div className="lg:col-span-8 border-t border-surface-border divide-y divide-surface-border">
              {targetGroups.map((group, idx) => (
                <Link
                  key={idx}
                  to={group.link}
                  className="group py-6 sm:py-8 px-4 -mx-4 rounded-[12px] flex items-center justify-between gap-6 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <div className="space-y-1.5 max-w-[58ch]">
                    <h3 className="text-[22px] sm:text-[24px] font-semibold text-foreground tracking-tight group-hover:text-accent-text transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
                      {formatPolishTypography(group.description)}
                    </p>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full border border-surface-border flex items-center justify-center text-foreground-secondary transition-[border-color,color,transform] duration-200 group-hover:border-foreground group-hover:text-foreground group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERWIS (CIEMNY BLOK GRAPHITE-900 Z ZAMYKAJĄCYM CTA) */}
      <section className="relative bg-graphite-900 text-white overflow-hidden py-20 md:py-28 border-b border-surface-border">
        {/* Wzór siatki pomiarowej Crosshair */}
        <div aria-hidden="true" className="absolute inset-0 text-white opacity-[0.06] pointer-events-none">
          <Crosshair size={64} />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-[70ch] mb-12 sm:mb-16">
            <span className="text-[14px] font-semibold text-accent-light block mb-2">
              Autoryzowane wsparcie techniczne
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white tracking-tight leading-[1.1]">
              Autoryzowany serwis Beissbarth i Valeo w Polsce
            </h2>
            <p className="mt-3 text-[17px] sm:text-[19px] text-white/75 leading-relaxed">
              Dysponujemy fabryczną dokumentacją inżynieryjną, przyrządami kalibracyjnymi oraz magazynem oryginalnych części zamiennych w Lisim Ogonie k. Bydgoszczy i Łochowa.
            </p>
          </div>

          {/* 4 usługi z ikonami w siatce 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
            {serviceHighlights.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-[12px] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-200">
                  <div className="w-11 h-11 rounded-[10px] bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-accent-light">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[19px] font-semibold text-white tracking-tight">
                      {srv.title}
                    </h3>
                    <p className="text-[15px] text-white/72 leading-relaxed">
                      {formatPolishTypography(srv.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Podziałka pomiarowa CAD nad blokiem CTA */}
          <div className="pt-4 pb-2">
            <MeasurementDivider dark={true} />
          </div>

          {/* Blok CTA: Przycisk primary + duży telefon */}
          <div className="pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                to="/kontakt?typ=serwis"
                variant="primary"
                size="md"
                className="h-[52px] px-8 text-[16px] font-semibold justify-center"
              >
                {LABELS.cta.serviceTicket}
              </Button>
              <Link
                to="/serwis"
                className="h-[52px] px-6 inline-flex items-center justify-center text-[15px] font-semibold text-white/80 hover:text-white border border-white/20 rounded-[10px] hover:bg-white/5 transition-colors"
              >
                Pełny opis usług serwisowych →
              </Link>
            </div>

            {/* Duży numer telefonu technicznego */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-accent-light/15 border border-accent-light/30 flex items-center justify-center text-accent-light shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[13px] text-white/60 block">
                  Informacja techniczna i zgłoszenia awarii:
                </span>
                <a
                  href={cleanTelHref(COMPANY_DATA.phones.techInfo.raw)}
                  className="text-[22px] sm:text-[26px] font-bold text-white hover:text-accent-light tracking-tight transition-colors inline-block"
                >
                  {formatPhoneWithNbsp(COMPANY_DATA.phones.techInfo.display)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REALIZACJE (NOWY UKŁAD Z DUŻĄ TYPOGRAFIĄ) */}
      <section className="bg-white py-16 md:py-24 border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-surface-border">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Realizacje
              </h2>
              <p className="mt-1 text-[16px] text-foreground-secondary">
                Wdrożenia aparatury pomiarowej w stacjach ASO i centrach diagnostycznych w całej Polsce.
              </p>
            </div>
            <Link
              to="/realizacje"
              className="text-[15px] font-semibold text-accent-text hover:underline inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Wszystkie realizacje</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Nazwy w dużej typografii (24-28 px, #4B5563, hover grafit) oddzielone hairline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
            {REFERENCES_DATA.map((ref) => (
              <div
                key={ref.slug}
                className="py-4 border-b border-surface-border flex flex-col justify-center transition-colors group"
              >
                <Link
                  to={`/realizacje#${ref.slug}`}
                  className="text-[22px] sm:text-[24px] font-semibold text-foreground-secondary group-hover:text-foreground transition-colors tracking-tight"
                >
                  {ref.name}
                </Link>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-accent-text hover:underline mt-1 inline-flex items-center gap-1"
                >
                  <span>{ref.url.replace(/^https?:\/\//, '')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PUBLIKACJE (2 DUŻE WIERSZE ARTYKUŁY ZAMIAST KART) */}
      <section className="bg-background-subtle py-16 md:py-24 border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-surface-border">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Publikacje branżowe
              </h2>
              <p className="mt-1 text-[16px] text-foreground-secondary">
                Opracowania techniczne inżynierów Diagnostyka-Systems publikowane w prasie motoryzacyjnej.
              </p>
            </div>
            <Link
              to="/publikacje"
              className="text-[15px] font-semibold text-accent-text hover:underline inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Wszystkie publikacje</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2 duże wiersze-artykuły */}
          <div className="space-y-6">
            {recentPublications.map((pub) => (
              <Link
                key={pub.id}
                to={`/publikacje/${pub.slug}`}
                className="group block p-6 sm:p-8 bg-white border border-surface-border rounded-[14px] transition-[border-color,box-shadow] duration-200 hover:border-foreground/25 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-[75ch]">
                    <span className="text-[14px] font-medium text-foreground-secondary block">
                      {pub.publicationDate} · {pub.sourceJournal}
                    </span>
                    <h3 className="text-[22px] sm:text-[24px] font-semibold text-foreground tracking-tight group-hover:text-accent-text transition-colors">
                      {formatPolishTypography(pub.title)}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
                      {formatPolishTypography(pub.summary)}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-[15px] font-semibold text-accent-text group-hover:translate-x-1 transition-transform">
                    <span>Czytaj artykuł</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARTNERZY TECHNOLOGICZNI I CERTYFIKATY */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* (1) Rząd logotypów partnerów w kartach */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Autoryzowani partnerzy
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-[16px] bg-background-subtle border border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {PARTNERS_DATA.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-24 bg-white border border-surface-border hover:border-foreground/30 rounded-[12px] p-4 flex items-center justify-center transition-[border-color,box-shadow] duration-200 shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  title={`${partner.name} - Autoryzacja od ${partner.authorizationYear} r.`}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-12 max-w-[180px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* (2) Certyfikaty jako 3 miniatury 3:4 z interaktywnym lightboxem */}
          <div className="space-y-6 pt-10 border-t border-surface-border">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Certyfikaty i dopuszczenia
              </h2>
              <p className="mt-1 text-[15px] sm:text-[16px] text-foreground-secondary">
                Kliknij certyfikat, aby powiększyć dokumentację dopuszczającą aparaturę do badań na SKP.
              </p>
            </div>

            <CertificateLightbox />
          </div>
        </div>
      </section>
    </div>
  );
};
