import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { getCollectionJsonLd } from '@/utils/seo';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight } from 'lucide-react';

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
        {/* 1. Pierwszy artykuł jako duży hero editorial */}
        {featured && (
          <div className="relative rounded-[16px] bg-white border border-surface-border p-8 sm:p-12 shadow-sm overflow-hidden">
            <CornerBrackets size={18} color="#EE9D16" />

            <div className="max-w-[70ch] space-y-5">
              <div className="flex items-center gap-3 text-[13px] font-mono text-foreground-secondary">
                <span className="uppercase tracking-wider font-semibold text-accent-text">
                  Wyróżniona publikacja
                </span>
                <span>·</span>
                <span>{featured.publicationDate}</span>
                <span>·</span>
                <span>{featured.sourceJournal}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-foreground tracking-tight leading-[1.2]">
                {formatPolishTypography(featured.title)}
              </h2>

              <p className="text-[16px] sm:text-[18px] text-foreground-secondary leading-relaxed pt-1">
                {formatPolishTypography(featured.summary)}
              </p>

              <div className="pt-4">
                <Link
                  to={`/publikacje/${featured.slug}`}
                  className="h-11 px-6 rounded-[8px] bg-foreground text-white hover:bg-foreground/90 font-semibold text-[15px] transition-colors inline-flex items-center gap-2"
                >
                  <span>Czytaj opracowanie</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. Pozostałe artykuły jako zwarte wiersze do szybkiego skanowania */}
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
                  className="group p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-background-subtle/50 transition-colors"
                >
                  <div className="space-y-1.5 max-w-[65ch]">
                    <div className="flex items-center gap-2 text-[13px] font-mono text-foreground-secondary">
                      <span>{item.publicationDate}</span>
                      <span>·</span>
                      <span>{item.sourceJournal}</span>
                    </div>

                    <h4 className="text-[18px] sm:text-[20px] font-bold text-foreground group-hover:text-accent-text transition-colors tracking-tight">
                      {formatPolishTypography(item.title)}
                    </h4>

                    <p className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed line-clamp-2">
                      {formatPolishTypography(item.summary)}
                    </p>
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
