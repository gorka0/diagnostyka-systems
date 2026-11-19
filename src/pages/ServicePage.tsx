import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { COMPANY_DATA } from '@/data/company';
import { getServiceJsonLd } from '@/utils/seo';
import { formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import {
  Wrench,
  ThermometerSnowflake,
  Package,
  CheckCircle2,
} from 'lucide-react';

export const ServicePage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Autoryzowany Serwis Beissbarth i Valeo | Diagnostyka-Systems"
        description="Autoryzowany serwis Beissbarth i Valeo: naprawy gwarancyjne, okresowe kalibracje geometrii dla SKP, regeneracja maszyn i oryginalne części z magazynu w Lisim Ogonie."
        canonicalPath="/serwis"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Serwis', path: '/serwis' },
        ]}
        jsonLd={getServiceJsonLd()}
      />

      {/* Hero dark: graphite-900, Crosshair pattern, biały H1, jedno zdanie, CTA */}
      <PageHero
        variant="dark"
        breadcrumbs={[{ label: 'Serwis' }]}
        title="Autoryzowany serwis urządzeń warsztatowych"
        description="Naprawy gwarancyjne i pogwarancyjne aparatury Beissbarth i stacji klimatyzacji Valeo, okresowe kalibracje dla SKP pod wymogi TDT oraz centralny magazyn części w Lisim Ogonie."
        cta={
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-2">
            <Button
              to="/zgloszenie-serwisowe"
              variant="primary"
              size="lg"
              className="h-12 px-7 text-[16px] font-semibold"
            >
              Zgłoszenie serwisowe
            </Button>
            <div className="flex items-center gap-3 text-white">
              <span className="text-[13px] text-white/60 uppercase tracking-wider block font-mono">
                Informacja techniczna:
              </span>
              <a
                href={cleanTelHref(COMPANY_DATA.phones.techInfo.raw)}
                className="text-2xl sm:text-[26px] font-bold font-mono text-white hover:text-accent-text transition-colors tabular-nums"
              >
                {formatPhoneWithNbsp(COMPANY_DATA.phones.techInfo.display)}
              </a>
            </div>
          </div>
        }
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Usługi pogrupowane w 3 kolumnach tematycznych z bezpośrednim specjalistą */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Kolumna 1: Geometria, wyważanie i diagnostyka (Beissbarth) */}
          <div className="flex flex-col justify-between bg-white border border-surface-border rounded-[16px] p-7 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Wrench className="w-6 h-6 text-foreground stroke-[1.5]" />
                <h2 className="text-xl font-semibold text-foreground tracking-tight leading-snug">
                  Geometria, wyważanie i diagnostyka (Beissbarth)
                </h2>
              </div>

              <div className="space-y-4 text-[15px] text-foreground-secondary leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Naprawy gwarancyjne i pogwarancyjne:</strong> diagnostyka elektroniki pomiarowej, kamer CCD/3D oraz układów hydraulicznych.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Kalibracje okresowe dla SKP:</strong> protokoły wzorcowania geometrii kół i ścieżek hamulcowych pod wymogi TDT i ITS.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Remonty i regeneracja maszyn:</strong> wymiana łożyskowań, regeneracja przekładni wyważarek i montażownic.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Modernizacja Microline:</strong> aktualizacja systemów ML 1800, 4000, 4600 do środowiska Windows z nową bazą pojazdów.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border space-y-1">
              <span className="text-[12px] font-mono text-foreground-secondary uppercase tracking-wider block">
                {COMPANY_DATA.specialists[0].role}
              </span>
              <a
                href={cleanTelHref(COMPANY_DATA.specialists[0].phoneRaw)}
                className="text-2xl font-bold font-mono text-foreground hover:text-accent-text transition-colors tabular-nums block"
              >
                {formatPhoneWithNbsp(COMPANY_DATA.specialists[0].phoneDisplay)}
              </a>
            </div>
          </div>

          {/* Kolumna 2: Klimatyzacja (Valeo, SPX) */}
          <div className="flex flex-col justify-between bg-white border border-surface-border rounded-[16px] p-7 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ThermometerSnowflake className="w-6 h-6 text-foreground stroke-[1.5]" />
                <h2 className="text-xl font-semibold text-foreground tracking-tight leading-snug">
                  Klimatyzacja (Valeo, SPX)
                </h2>
              </div>

              <div className="space-y-4 text-[15px] text-foreground-secondary leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Autoryzowany serwis stacji AC:</strong> obsługa urządzeń na czynniki chłodnicze R134a oraz R1234yf.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Przeglądy okresowe:</strong> wymiana filtrów osuszaczy, wymiana oleju w pompach próżniowych oraz testy wydajnościowe.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Precyzyjne kalibracje:</strong> wzorcowanie wag czynnika, wag oleju świeżego i przepracowanego oraz testy szczelności podciśnieniowej.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Części eksploatacyjne Valeo:</strong> szybkozłącza serwisowe, węże robocze, uszczelnienia i elektrozawory.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border space-y-1">
              <span className="text-[12px] font-mono text-foreground-secondary uppercase tracking-wider block">
                {COMPANY_DATA.specialists[1].role}
              </span>
              <a
                href={cleanTelHref(COMPANY_DATA.specialists[1].phoneRaw)}
                className="text-2xl font-bold font-mono text-foreground hover:text-accent-text transition-colors tabular-nums block"
              >
                {formatPhoneWithNbsp(COMPANY_DATA.specialists[1].phoneDisplay)}
              </a>
            </div>
          </div>

          {/* Kolumna 3: Części zamienne */}
          <div className="flex flex-col justify-between bg-white border border-surface-border rounded-[16px] p-7 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-foreground stroke-[1.5]" />
                <h2 className="text-xl font-semibold text-foreground tracking-tight leading-snug">
                  Części zamienne
                </h2>
              </div>

              <div className="space-y-4 text-[15px] text-foreground-secondary leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Centralny magazyn w Lisim Ogonie:</strong> stały stan części zamiennych do aparatury Beissbarth i stacji Valeo.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Akcesoria geometrii:</strong> głowice CCD/3D, przewody sygnałowe, obrotnice mechaniczne i płyty rozprężne.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Elementy mechaniczne i pneumatyczne:</strong> pasy napędowe, siłowniki, czujniki ciśnienia i zawory sterujące.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground font-semibold">Szybka wysyłka:</strong> realizacja zamówień magazynowych i wysyłka kurierska na terenie całego kraju.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border space-y-1">
              <span className="text-[12px] font-mono text-foreground-secondary uppercase tracking-wider block">
                {COMPANY_DATA.phones.techInfo.label}
              </span>
              <a
                href={cleanTelHref(COMPANY_DATA.phones.techInfo.raw)}
                className="text-2xl font-bold font-mono text-foreground hover:text-accent-text transition-colors tabular-nums block"
              >
                {formatPhoneWithNbsp(COMPANY_DATA.phones.techInfo.display)}
              </a>
            </div>
          </div>
        </div>

        {/* Pasek CTA na końcu strony */}
        <div className="mt-14 rounded-[14px] bg-background-subtle border border-surface-border p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground tracking-tight">
              Potrzebujesz serwisu, kalibracji lub części zamiennych?
            </h3>
            <p className="text-[15px] text-foreground-secondary">
              Wypełnij formularz zgłoszenia serwisowego lub skontaktuj się bezpośrednio z inżynierem serwisu.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Button to="/zgloszenie-serwisowe" variant="primary" size="md">
              Zgłoszenie serwisowe
            </Button>
            <Button to="/kontakt" variant="secondary" size="md">
              Kontakt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
