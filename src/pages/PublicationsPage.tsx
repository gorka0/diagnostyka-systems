import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { getCollectionJsonLd } from '@/utils/seo';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight, FileText } from 'lucide-react';

export const PublicationsPage: React.FC = () => {
  const featured = PUBLICATIONS_DATA[0];
  const remaining = PUBLICATIONS_DATA.slice(1);

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Publikacje branżowe i wiedza techniczna | Diagnostyka-Systems"
        description="Eksperckie opracowania techniczne Diagnostyka-Systems w prasie motoryzacyjnej: rentowność geometrii 3D, wymogi dopuszczeń TDT/ITS dla Stacji Kontroli Pojazdów."
        canonicalPath="/publikacje"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Publikacje', path: '/publikacje' },
        ]}
        jsonLd={getCollectionJsonLd(
          'Publikacje branżowe i wiedza techniczna',
          'Eksperckie opracowania techniczne Diagnostyka-Systems w prasie motoryzacyjnej.',
          '/publikacje'
        )}
      />

      <PageHero
        variant="compact"
        breadcrumbs={[{ label: 'Publikacje' }]}
        title="Publikacje branżowe i baza wiedzy"
        description="Opracowania inżynierskie i analizy rentowności przygotowane przez ekspertów Diagnostyka-Systems dla czasopism motoryzacyjnych."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14 md:space-y-16">
        {/* 1. Pierwszy artykuł jako duży hero editorial z podglądem skanu */}
        {featured && (
          <div className="relative rounded-[16px] bg-white border border-surface-border p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
            <CornerBrackets size={18} color="#EE9D16" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3 text-[13px] font-mono text-foreground-secondary flex-wrap">
                  <span className="uppercase tracking-wider font-semibold text-accent-text">
                    Wyróżniona publikacja
                  </span>
                  <span>·</span>
                  <span>{featured.publicationDate}</span>
                  <span>·</span>
                  <span>{featured.sourceJournal}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-foreground tracking-tight leading-[1.2]">
                  {formatPolishTypography(featured.title)}
                </h2>

                {featured.subtitle && (
                  <p className="text-[15px] sm:text-[16px] text-accent-text font-medium">
                    {formatPolishTypography(featured.subtitle)}
                  </p>
                )}

                <p className="text-[15px] sm:text-[17px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(featured.summary)}
                </p>

                {/* Kluczowe metryki w pigułce */}
                {featured.metrics && featured.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {featured.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 bg-background-subtle border border-surface-border rounded-[8px]"
                      >
                        <div className="text-[11px] font-mono text-foreground-secondary uppercase tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-[16px] font-bold text-foreground">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3">
                  <Link
                    to={`/publikacje/${featured.slug}`}
                    className="h-11 px-6 rounded-[8px] bg-foreground text-white hover:bg-foreground/90 font-semibold text-[15px] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Czytaj pełny artykuł i skan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Miniatura skanu drukowanego */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <Link
                  to={`/publikacje/${featured.slug}`}
                  className="group relative block w-full max-w-[260px] aspect-[3/4] rounded-[10px] overflow-hidden border border-surface-border bg-neutral-100 shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                >
                  <picture>
                    <source srcSet={featured.scanImage} type="image/webp" />
                    <img
                      src={featured.scanImageJpg}
                      alt={`Skan: ${featured.title}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </picture>

                  <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="h-9 px-3 rounded-full bg-white text-foreground font-semibold text-[12px] shadow flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-accent-text" />
                      Otwórz skan
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. Pozostałe artykuły z miniaturami skanów */}
        {remaining.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground tracking-tight">
              Archiwum opracowań technicznych
            </h3>

            <div className="bg-white border border-surface-border rounded-[14px] overflow-hidden shadow-sm divide-y divide-surface-border">
              {remaining.map((item) => (
                <Link
                  key={item.id}
                  to={`/publikacje/${item.slug}`}
                  className="group p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-background-subtle/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 max-w-[70ch]">
                    {/* Miniaturka skanu w wierszu */}
                    <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-[6px] overflow-hidden border border-surface-border bg-neutral-100 shadow-sm hidden xs:block">
                      <picture>
                        <source srcSet={item.scanImage} type="image/webp" />
                        <img
                          src={item.scanImageJpg}
                          alt={item.title}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </picture>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[13px] font-mono text-foreground-secondary flex-wrap">
                        <span>{item.publicationDate}</span>
                        <span>·</span>
                        <span>{item.sourceJournal}</span>
                        {item.pageNumber && (
                          <>
                            <span>·</span>
                            <span>{item.pageNumber}</span>
                          </>
                        )}
                      </div>

                      <h4 className="text-[18px] sm:text-[20px] font-bold text-foreground group-hover:text-accent-text transition-colors tracking-tight">
                        {formatPolishTypography(item.title)}
                      </h4>

                      <p className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                        {formatPolishTypography(item.summary)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[14px] font-semibold text-accent-text group-hover:translate-x-1 transition-transform shrink-0 self-end sm:self-auto">
                    <span>Czytaj artykuł</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
