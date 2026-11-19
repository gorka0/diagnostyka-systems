import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { getArticleJsonLd } from '@/utils/seo';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowLeft, Calendar, Building2 } from 'lucide-react';

export const PublicationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const publication = useMemo(() => {
    return PUBLICATIONS_DATA.find((p) => p.slug === slug);
  }, [slug]);

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

  // Symulowane sekcje H2 dla publikacji (obecnie publikacje w bazie to noty bibliograficzne z 1 sekcją H2)
  // Gdy H2 >= 3, dynamicznie włącza się sticky spis treści po lewej
  const sections = [
    { id: 'informacje', title: 'Informacja o publikacji archiwalnej' },
  ];
  const showToc = sections.length >= 3;

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
        description={`${publication.sourceJournal} · ${publication.publicationDate}`}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className={showToc ? 'grid grid-cols-1 lg:grid-cols-12 gap-12' : 'max-w-[68ch] mx-auto'}>
          {/* Sticky Spis Treści po lewej (tylko gdy sekcji H2 >= 3) */}
          {showToc && (
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white border border-surface-border rounded-[12px] p-6 space-y-3">
                <span className="text-[12px] font-mono text-foreground-secondary uppercase tracking-wider block">
                  Spis treści
                </span>
                <nav className="space-y-2">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="text-[14px] text-foreground-secondary hover:text-foreground block transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Kolumna artykułu o szerokości czytania ~68ch */}
          <article className={showToc ? 'lg:col-span-8 max-w-[68ch] space-y-10' : 'space-y-10'}>
            <header className="space-y-4 pb-8 border-b border-surface-border">
              <div className="flex items-center gap-4 text-[14px] font-mono text-foreground-secondary flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-foreground-secondary" />
                  {publication.publicationDate}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-foreground-secondary" />
                  {publication.sourceJournal}
                </span>
              </div>

              <p className="text-[18px] sm:text-[19px] text-foreground font-medium leading-relaxed">
                {formatPolishTypography(publication.summary)}
              </p>
            </header>

            {/* Treść merytoryczna publikacji */}
            <div className="space-y-8 text-[16px] sm:text-[17px] text-foreground leading-[1.6]">
              <section id="informacje" className="p-7 sm:p-9 bg-white border border-surface-border rounded-[14px] space-y-4 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                  Informacja o publikacji archiwalnej
                </h2>
                <div className="space-y-2.5 text-[15px] text-foreground-secondary leading-relaxed">
                  <p>
                    <strong className="text-foreground font-semibold">Tytuł publikacji: </strong>
                    {publication.title}
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">Czasopismo: </strong>
                    {publication.sourceJournal}
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">Data wydania: </strong>
                    {publication.publicationDate}
                  </p>
                  <p className="pt-3 border-t border-surface-border">
                    {formatPolishTypography(
                      'Artykuł ukazał się drukiem w specjalistycznej prasie motoryzacyjnej i stanowi część dorobku inżynierskiego zespołu Diagnostyka-Systems s.c. Pełny tekst publikacji w wersji drukowanej jest dostępny do wglądu w siedzibie naszej firmy w Lisim Ogonie lub w archiwach wydawnictwa.'
                    )}
                  </p>
                </div>
              </section>
            </div>

            <footer className="pt-8 border-t border-surface-border flex items-center justify-between">
              <Link
                to="/publikacje"
                className="text-[14px] sm:text-[15px] font-semibold text-foreground hover:text-accent-text inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Wróć do listy publikacji</span>
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};
