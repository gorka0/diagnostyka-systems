import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { getArticleJsonLd } from '@/utils/seo';
import { formatPolishTypography } from '@/utils/typography';
import {
  ArrowLeft,
  FileText,
  Maximize2,
  X,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const PublicationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const publication = useMemo(() => {
    return PUBLICATIONS_DATA.find((p) => p.slug === slug);
  }, [slug]);

  // Obsługa klawisza ESC dla powiększenia skanu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  if (!publication) {
    return (
      <div className="bg-background min-h-[100dvh] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-surface-border rounded-[14px] p-12 text-center max-w-lg mx-auto shadow-sm">
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Artykuł nie został odnaleziony
            </h1>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Publikacja o podanym adresie nie istnieje w bazie wiedzy.
            </p>
            <Button to="/publikacje" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do listy publikacji
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title={`${publication.title} – Publikacja branżowa | Diagnostyka-Systems`}
        description={publication.summary}
        canonicalPath={`/publikacje/${publication.slug}`}
        type="article"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Publikacje', path: '/publikacje' },
          { label: publication.title, path: `/publikacje/${publication.slug}` },
        ]}
        jsonLd={getArticleJsonLd(publication)}
      />

      <PageHero
        variant="compact"
        breadcrumbs={[
          { label: 'Publikacje', to: '/publikacje' },
          { label: publication.title },
        ]}
        title={publication.title}
        description={`${publication.sourceJournal} · ${publication.publicationDate}${publication.pageNumber ? ` · ${publication.pageNumber}` : ''}`}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {/* Pasek metryk / wskaźników biznesowych */}
        {publication.metrics && publication.metrics.length > 0 && (
          <section
            aria-label="Kluczowe wskaźniki publikacji"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {publication.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-surface-border rounded-[12px] p-5 shadow-sm space-y-1.5"
              >
                <div className="text-[12px] font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent-text" />
                  <span>{m.label}</span>
                </div>
                <div className="text-2xl sm:text-[26px] font-bold text-foreground tracking-tight">
                  {m.value}
                </div>
                <div className="text-[13px] text-foreground-secondary">
                  {m.note}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Układ dwukolumnowy: Treść merytoryczna artykułu + Oryginalny skan w bocznej kolumnie */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Lewa kolumna: Pełna treść redakcyjna (~68ch) */}
          <article className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* Lead artykułu */}
            <div className="p-6 sm:p-8 bg-white border-l-4 border-l-accent-primary border-y border-r border-surface-border rounded-r-[12px] shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-widest text-accent-text block mb-2 font-semibold">
                Wprowadzenie redakcyjne
              </span>
              <p className="text-[17px] sm:text-[19px] text-foreground font-medium leading-[1.6]">
                {formatPolishTypography(publication.lead)}
              </p>
            </div>

            {/* Poszczególne sekcje artykułu */}
            <div className="space-y-10">
              {publication.sections.map((section, sIdx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="space-y-4 pt-4 border-t border-surface-border first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[12px] font-mono text-accent-text font-bold">
                      0{sIdx + 1}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {formatPolishTypography(section.title)}
                    </h2>
                  </div>

                  <div className="space-y-4 text-[16px] sm:text-[17px] text-foreground-secondary leading-[1.7]">
                    {section.paragraphs.map((pText, pIdx) => (
                      <p key={pIdx}>
                        {formatPolishTypography(pText)}
                      </p>
                    ))}
                  </div>

                  {section.callout && (
                    <div className="my-5 p-5 bg-background-subtle border border-surface-border rounded-[10px] flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                      <p className="text-[14px] sm:text-[15px] text-foreground font-medium italic leading-relaxed">
                        {formatPolishTypography(section.callout)}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Kluczowy wniosek inżynierski */}
            {publication.keyTakeaway && (
              <div className="p-6 sm:p-7 bg-foreground text-white rounded-[14px] space-y-2">
                <div className="flex items-center gap-2 text-accent-primary text-[12px] font-mono uppercase tracking-wider font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Wniosek ekspertów Diagnostyka-Systems</span>
                </div>
                <p className="text-[16px] sm:text-[17px] text-neutral-200 leading-relaxed font-medium">
                  {formatPolishTypography(publication.keyTakeaway)}
                </p>
              </div>
            )}

            {/* Dolna nawigacja */}
            <div className="pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/publikacje"
                className="text-[14px] sm:text-[15px] font-semibold text-foreground hover:text-accent-text inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Wszystkie publikacje</span>
              </Link>

              <div className="text-[13px] text-foreground-secondary font-mono">
                Źródło: {publication.sourceJournal}
              </div>
            </div>
          </article>

          {/* Prawa kolumna: Oryginalny Skan Archiwalny (Sticky) */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white border border-surface-border rounded-[14px] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-wider text-foreground-secondary">
                  <FileText className="w-4 h-4 text-accent-text" />
                  <span>Oryginalny skan prasowy</span>
                </div>
                {publication.pageNumber && (
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-background-subtle border border-surface-border rounded text-foreground-secondary">
                    {publication.pageNumber}
                  </span>
                )}
              </div>

              {/* Podgląd skanu z możliwością kliknięcia do pełnego ekranu */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-[8px] border border-surface-border bg-neutral-100 aspect-[3/4] shadow-inner"
                title="Kliknij, aby otworzyć pełny skan artykułu"
              >
                <picture>
                  <source srcSet={publication.scanImage} type="image/webp" />
                  <img
                    src={publication.scanImageJpg}
                    alt={`Oryginalny skan artykułu: ${publication.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </picture>

                <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="h-10 px-4 rounded-full bg-white text-foreground font-semibold text-[13px] shadow-lg flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-accent-text" />
                    Powiększ skan
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-surface-border">
                <div className="text-[12px] text-foreground-secondary leading-snug">
                  Artykuł ukazał się drukiem w kwartalniku motoryzacyjnym <strong className="text-foreground">{publication.sourceJournal}</strong> ({publication.publicationDate}).
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="w-full h-10 px-4 rounded-[8px] bg-foreground text-white hover:bg-foreground/90 font-semibold text-[14px] transition-colors flex items-center justify-center gap-2"
                  >
                    <Maximize2 className="w-4 h-4 text-accent-primary" />
                    <span>Zobacz pełny skan strony</span>
                  </button>

                  <a
                    href={publication.scanImageJpg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 px-4 rounded-[8px] border border-surface-border text-foreground hover:bg-background-subtle font-medium text-[13px] transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-foreground-secondary" />
                    <span>Otwórz plik skanu w nowej karcie</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Karta doradztwa technicznego */}
            <div className="bg-background-subtle border border-surface-border rounded-[14px] p-5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent-text font-bold block">
                Doradztwo inwestycyjne
              </span>
              <h3 className="text-[16px] font-bold text-foreground leading-snug">
                Planujesz doposażenie lub otwarcie serwisu?
              </h3>
              <p className="text-[13px] text-foreground-secondary leading-relaxed">
                Nasi inżynierowie bezpłatnie obliczą stopę zwrotu (ROI) dla geometrii 3D, linii diagnostycznej lub montażownicy pod Twój warsztat.
              </p>
              <Button
                to="/kontakt"
                variant="outline"
                className="w-full text-[13px] h-9 px-3 whitespace-nowrap inline-flex items-center justify-center gap-1.5"
              >
                <span>Skonsultuj z inżynierem</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-0.5" />
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Lightbox / Pełnoekranowy podgląd oryginalnego skanu */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Powiększenie skanu publikacji"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Pasek nagłówka okna */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="text-[14px] sm:text-[16px] font-bold">
                {publication.title}
              </div>
              <div className="text-[12px] text-neutral-400 font-mono">
                {publication.sourceJournal} · {publication.publicationDate}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={publication.scanImageJpg}
                download
                className="h-9 px-3 rounded-[6px] bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium transition-colors flex items-center gap-1.5"
              >
                Pobierz skan
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Zamknij (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Kontener skanu z możliwością przewijania */}
          <div
            className="w-full max-w-4xl flex-1 overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source srcSet={publication.scanImage} type="image/webp" />
              <img
                src={publication.scanImageJpg}
                alt={`Powiększony skan: ${publication.title}`}
                className="max-h-[85vh] w-auto object-contain rounded-[8px] shadow-2xl border border-white/10"
              />
            </picture>
          </div>

          <div className="text-[12px] text-neutral-400 pt-2 shrink-0 font-mono">
            Kliknij poza obrazkiem lub wciśnij klawisz ESC, aby zamknąć.
          </div>
        </div>
      )}
    </div>
  );
};
