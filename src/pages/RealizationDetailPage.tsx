import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { SiteImage } from '@/components/common/SiteImage';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { Button } from '@/components/ui/Button';
import { REFERENCES_DATA } from '@/data/references';
import { PRODUCTS_DATA } from '@/data/products';
import { ArrowLeft, ArrowRight, ExternalLink, MapPin } from 'lucide-react';

/**
 * Normalizacja sluga ze starych adresów CMS (np. '12-bmw-sikora.html' -> 'bmw-sikora')
 */
export function normalizeRealizationSlug(rawSlug: string): string {
  let clean = rawSlug.replace(/\.html$/i, '');
  // Usunięcie prefiksu numerycznego (np. '12-bmw-sikora' -> 'bmw-sikora')
  clean = clean.replace(/^\d+-/, '');
  return clean;
}

export const RealizationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/realizacje" replace />;
  }

  const cleanSlug = normalizeRealizationSlug(slug);
  const realization = REFERENCES_DATA.find((r) => r.slug === cleanSlug);

  if (!realization) {
    return <Navigate to="/realizacje" replace />;
  }

  // ZASADA: Jeśli realizacja NIE posiada bogatej treści (scope ani equipment),
  // nie tworzymy pustej podstrony (thin content) – przekierowujemy na kotwicę /realizacje#slug!
  const hasRichContent = Boolean(realization.scope || (realization.equipment && realization.equipment.length > 0));

  if (!hasRichContent) {
    return <Navigate to={`/realizacje#${realization.slug}`} replace />;
  }

  // Jeśli w przyszłości klient dostarczy dane i realizacja ma scope lub equipment:
  return (
    <div className="bg-background min-h-[100dvh] py-10 sm:py-16">
      <Seo
        title={`${realization.name} – Realizacja | Diagnostyka-Systems`}
        description={realization.scope || `Wdrożenie aparatury diagnostycznej Beissbarth w serwisie ${realization.name}.`}
        canonicalPath={`/realizacje/${realization.slug}`}
      />

      <Container>
        <div className="mb-8">
          <Link
            to="/realizacje"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary hover:text-foreground transition-colors py-1.5 px-3 rounded-md border border-surface-border bg-background-subtle"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Wróć do wszystkich realizacji
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[3/2] w-full rounded-[16px] overflow-hidden bg-[#F7F7F5] border border-surface-border p-4">
              <CornerBrackets size={16} color="#EE9D16" />
              <div className="w-full h-full rounded-[12px] overflow-hidden">
                <SiteImage
                  name={realization.photo}
                  fit="cover"
                  aspectRatio="3/2"
                  plain={true}
                  alt={`Realizacja: ${realization.name}`}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: realization.objectPosition || 'center',
                    filter: 'contrast(0.95) saturate(0.95)',
                  }}
                />
              </div>
            </div>

            {realization.gallery && realization.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3 pt-4">
                {realization.gallery.map((imgKey, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-md overflow-hidden border border-surface-border">
                    <SiteImage name={imgKey} aspectRatio="4/3" fit="cover" plain={true} alt={`${realization.name} - zdjęcie ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-foreground-secondary mb-2">
                <span className="font-semibold text-accent-text uppercase tracking-wider">
                  {realization.brand === 'inne' ? 'Centrum Motoryzacyjne' : realization.brand}
                </span>
                {realization.city && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {realization.city}
                    </span>
                  </>
                )}
                {realization.year && (
                  <>
                    <span>·</span>
                    <span className="font-mono">{realization.year}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {realization.name}
              </h1>
              <div className="mt-3">
                <a
                  href={realization.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline"
                >
                  <span>Odwiedź stronę klienta</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {realization.scope && (
              <div className="pt-4 border-t border-surface-border">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-2">
                  Zakres wdrożenia
                </h2>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {realization.scope}
                </p>
              </div>
            )}

            {realization.equipment && realization.equipment.length > 0 && (
              <div className="pt-4 border-t border-surface-border">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-3">
                  Zainstalowane urządzenia
                </h2>
                <div className="flex flex-col gap-2">
                  {realization.equipment.map((eqSlug) => {
                    const prod = PRODUCTS_DATA.find((p) => p.slug === eqSlug);
                    return (
                      <Link
                        key={eqSlug}
                        to={prod ? `/produkty/${prod.categorySlug}/${prod.slug}` : `/produkty`}
                        className="flex items-center justify-between p-3 bg-background-subtle border border-surface-border rounded-md hover:border-accent hover:text-accent-text transition-colors text-xs font-medium"
                      >
                        <span>{prod ? prod.name : eqSlug}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {realization.quote && (
              <blockquote className="border-l-2 border-accent pl-4 py-2 bg-background-subtle rounded-r-md">
                <p className="text-sm italic text-foreground leading-relaxed">
                  "{realization.quote.text}"
                </p>
                <cite className="block text-xs font-semibold text-foreground-secondary mt-1 not-italic">
                  — {realization.quote.author}{realization.quote.role ? `, ${realization.quote.role}` : ''}
                </cite>
              </blockquote>
            )}

            <div className="pt-6 border-t border-surface-border">
              <Button to="/kontakt" variant="primary" className="w-full justify-center">
                Zapytaj o wyposażenie podobnego obiektu
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
