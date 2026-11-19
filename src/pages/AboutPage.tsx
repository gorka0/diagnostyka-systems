import React from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { CertificateLightbox } from '@/components/ui/CertificateLightbox';
import { COMPANY_HISTORY } from '@/data/history';
import { PARTNERS_DATA } from '@/data/partners';
import { COMPANY_DATA } from '@/data/company';
import { getAboutJsonLd } from '@/utils/seo';
import { formatPolishTypography } from '@/utils/typography';
import { ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="O firmie – Autoryzacja Beissbarth od 2005 r. | Diagnostyka-Systems"
        description="Historia Diagnostyka-Systems od 2004 r. Autoryzacja fabryczna Beissbarth GmbH od 2005 r., certyfikacja ITS dla SKP, serwis stacji Valeo."
        canonicalPath="/o-nas"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'O nas', path: '/o-nas' },
        ]}
        jsonLd={getAboutJsonLd()}
      />

      {/* Hero split: jasny, tekst i metryki po lewej, zdjęcie siedziby z pomarańczowymi narożnikami po prawej */}
      <PageHero
        variant="split"
        breadcrumbs={[{ label: 'O nas' }]}
        title="O firmie Diagnostyka-Systems"
        description="Firma powstała w 2004 roku, koncentrując się na autoryzowanym serwisie i dystrybucji aparatury diagnostycznej Beissbarth GmbH oraz stacji obsługi klimatyzacji Valeo."
        metrics={[
          { value: '2004', label: 'Początek działalności' },
          { value: '2005', label: 'Autoryzacja Beissbarth' },
          { value: '2007', label: 'Atesty ITS dla SKP' },
        ]}
        image={{
          src: '/images/budynek-firmy-lisi-ogon.webp',
          alt: 'Siedziba i magazyn Diagnostyka-Systems w Lisim Ogonie',
          caption: `${COMPANY_DATA.officeAddress.street}, ${COMPANY_DATA.officeAddress.city} k. Bydgoszczy`,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* 1. Historia firmy jako pionowa oś czasu z motywem linii pomiarowej */}
        <section className="space-y-12">
          <div className="max-w-[65ch]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Kamienie milowe rozwoju
            </h2>
            <p className="mt-2 text-[16px] text-foreground-secondary leading-relaxed">
              Kluczowe etapy rozwoju autoryzacji fabrycznych, certyfikacji technicznych oraz rozbudowy bazy serwisowo-magazynowej.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 border-l border-surface-border space-y-12 sm:space-y-14 ml-2 sm:ml-4">
            {COMPANY_HISTORY.milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Znacznik-krzyżyk pomiarowy na osi czasu */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 flex items-center justify-center text-foreground font-mono font-bold select-none"
                >
                  <span className="text-[16px] text-accent-text leading-none">+</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline">
                  {/* Rok w monospace po lewej */}
                  <div className="md:col-span-3">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight tabular-nums block">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Treść po prawej bez ramek wokół wpisów */}
                  <div className="md:col-span-9 space-y-2 max-w-[65ch]">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
                      {formatPolishTypography(milestone.description)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Autoryzacje i certyfikaty – jedna spójna sekcja z logotypami i miniaturami z lightboxem */}
        <section className="pt-16 border-t border-surface-border space-y-12">
          <div className="max-w-[65ch]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Autoryzacje fabryczne i certyfikaty
            </h2>
            <p className="mt-2 text-[16px] text-foreground-secondary leading-relaxed">
              Oficjalne partnerstwa technologiczne potwierdzone certyfikatami fabrycznymi producentów oraz atestami jednostek certyfikujących.
            </p>
          </div>

          {/* Rząd logotypów partnerów */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {PARTNERS_DATA.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-surface-border rounded-[14px] p-6 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="h-12 flex items-center">
                    <img
                      src={partner.logoPlaceholder}
                      alt={partner.name}
                      className="max-h-10 max-w-[160px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-foreground">
                      {partner.name}
                    </h3>
                    <span className="text-[13px] font-mono text-foreground-secondary block mt-0.5">
                      Autoryzacja od {partner.authorizationYear} r.
                    </span>
                  </div>
                  <p className="text-[14px] text-foreground-secondary leading-relaxed">
                    {formatPolishTypography(partner.scope)}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border">
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-accent-text hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Strona producenta</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Certyfikaty z interaktywnym lightboxem */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold text-foreground tracking-tight">
              Dokumenty certyfikacyjne
            </h3>

            <CertificateLightbox />
          </div>
        </section>
      </div>
    </div>
  );
};
