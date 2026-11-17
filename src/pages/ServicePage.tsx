import React from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { formatPolishTypography, formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import {
  ShieldCheck,
  Wrench,
  Layers,
  RefreshCw,
  Package,
  ThermometerSnowflake,
} from 'lucide-react';

export const ServicePage: React.FC = () => {
  const servicePillars = [
    {
      icon: ShieldCheck,
      title: 'Naprawy gwarancyjne i pogwarancyjne',
      description:
        'Naprawy bieżące urządzeń Beissbarth i stacji Valeo na terenie całego kraju. Diagnostyka elektroniki pomiarowej, kamer CCD/3D oraz układów hydraulicznych.',
    },
    {
      icon: Wrench,
      title: 'Okresowe kalibracje dla SKP',
      description:
        'Precyzyjne kalibracje przyrządów geometrii kół, ścieżek hamulcowych i wyważarek z protokołami na potrzeby kontroli Transportowego Dozoru Technicznego.',
    },
    {
      icon: Layers,
      title: 'Remonty i regeneracja maszyn',
      description:
        'Odbudowa wyeksploatowanych wyważarek, montażownic i rolek hamulcowych: wymiana łożyskowań, regeneracja przekładni i aktualizacja oprogramowania z pisemną gwarancją.',
    },
    {
      icon: RefreshCw,
      title: 'Modernizacja systemów Microline',
      description:
        'Modernizacje systemów Microline (seria ML 1800, 4000, 4600) do środowiska Windows, z aktualną bazą danych pojazdów CARs & VANs oraz nowymi monitorami.',
    },
    {
      icon: Package,
      title: 'Magazyn oryginalnych części w Lisim Ogonie',
      description:
        'Stały stan magazynowy części zamiennych, czujników, głowic, kabli sygnałowych, zacisków, obrotnic i płyt rozprężnych z bezpośrednią wysyłką.',
    },
    {
      icon: ThermometerSnowflake,
      title: 'Serwis stacji klimatyzacji Valeo i SPX',
      description:
        'Przeglądy i naprawy stacji obsługi klimatyzacji na czynniki R134a i R1234yf: filtry osuszacze, olej pompy próżniowej, kalibracja wag i testy szczelności.',
    },
  ];

  const contactList = [
    { label: COMPANY_DATA.phones.techInfo.label, phone: COMPANY_DATA.phones.techInfo },
    { label: COMPANY_DATA.phones.salesInfo.label, phone: COMPANY_DATA.phones.salesInfo },
    {
      label: COMPANY_DATA.specialists[0].role,
      phone: {
        raw: COMPANY_DATA.specialists[0].phoneRaw,
        display: COMPANY_DATA.specialists[0].phoneDisplay,
      },
    },
    {
      label: COMPANY_DATA.specialists[1].role,
      phone: {
        raw: COMPANY_DATA.specialists[1].phoneRaw,
        display: COMPANY_DATA.specialists[1].phoneDisplay,
      },
    },
  ];

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Autoryzowany Serwis Beissbarth i Valeo | Diagnostyka-Systems"
        description="Autoryzowany serwis Beissbarth i Valeo: naprawy gwarancyjne, okresowe kalibracje geometrii dla SKP, regeneracja maszyn i oryginalne części z magazynu w Lisim Ogonie."
        canonicalPath="/serwis"
      />

      {/* Wspólny spójny nagłówek podstron: #F7F7F5, breadcrumb, H1 48 px, 1 zdanie, Crosshair 5% */}
      <PageHeader
        breadcrumbs={[{ label: 'Serwis' }]}
        title="Autoryzowany serwis urządzeń warsztatowych"
        description="Naprawy gwarancyjne i pogwarancyjne, okresowe kalibracje dla SKP, remonty maszyn oraz bezpośrednia dystrybucja oryginalnych części zamiennych z magazynu w Lisim Ogonie."
        badge="Wsparcie inżynieryjne"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* Główny blok zgłoszenia z jednym wyrazistym CTA */}
        <div className="rounded-[16px] bg-background-subtle border border-surface-border p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-[65ch] space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Zgłoszenie serwisowe lub kalibracja maszyny
            </h2>
            <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(
                'Prześlij zgłoszenie awarii lub zapotrzebowanie na kalibrację urządzenia. Zgłoszenie trafia bezpośrednio do dyżurnych techników serwisu w Lisim Ogonie.'
              )}
            </p>
          </div>

          <Button
            to="/serwis/zgloszenie"
            variant="primary"
            size="md"
            className="h-[52px] px-8 text-[16px] font-semibold shrink-0 w-full lg:w-auto justify-center"
          >
            {LABELS.cta.serviceTicket}
          </Button>
        </div>

        {/* Usługi jako duże wiersze z ikoną (nie siatka kart) */}
        <div className="space-y-6">
          <div className="max-w-[65ch]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Zakres usług serwisowych
            </h2>
            <p className="mt-2 text-[16px] text-foreground-secondary">
              Pełna obsługa inżynieryjna oparta o fabryczne procedury producenta i oryginalne części.
            </p>
          </div>

          <div className="border-t border-surface-border divide-y divide-surface-border">
            {servicePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-6"
                >
                  <div className="w-12 h-12 rounded-[10px] bg-background-subtle border border-surface-border flex items-center justify-center shrink-0 text-accent-text">
                    <IconComp className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-foreground tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed max-w-[70ch]">
                      {formatPolishTypography(pillar.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jeden blok telefonów bezpośrednich: 4 numery, min. 20 px, Inter, klikalne tel: */}
        <div className="pt-12 border-t border-surface-border">
          <div className="mb-8 max-w-[65ch]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Bezpośredni kontakt z inżynierami serwisu
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] text-foreground-secondary">
              Skontaktuj się bezpośrednio ze specjalistą odpowiedzialnym za dany typ urządzeń.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[14px] bg-background-subtle border border-surface-border space-y-2"
              >
                <span className="text-[14px] text-foreground-secondary block">
                  {item.label}
                </span>
                <a
                  href={cleanTelHref(item.phone.raw)}
                  className="text-[20px] sm:text-[22px] font-bold text-foreground hover:text-accent-text transition-colors block tracking-tight"
                >
                  {formatPhoneWithNbsp(item.phone.display)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
