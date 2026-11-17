import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPolishTypography } from '@/utils/typography';
import { Compass, Disc, Activity, Wind, GraduationCap, ArrowRight, Truck } from 'lucide-react';

export const OfferPage: React.FC = () => {
  const offerPillars = [
    {
      icon: <Compass className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Geometria kół i osi Beissbarth',
      target: 'Dla SKP, ASO i warsztatów mechanicznych',
      description:
        'Komputerowe systemy pomiaru geometrii kół i osi (Microline 8 ROC, ML Easy 3D, Q.Lign). Kompensacja przez przetoczenie bez podnoszenia osi, atesty ITS dla SKP oraz wersje z homologacjami fabrycznymi OEM.',
      link: '/produkty/geometria',
      linkLabel: 'Zobacz geometrię kół',
    },
    {
      icon: <Activity className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Rolkowe linie diagnostyczne',
      target: 'Dla Stacji Kontroli Pojazdów (SKP i OSKP)',
      description:
        'Stanowiska rolkowe serii Screen-Testline (SL 600, SL 640 4x4), testery amortyzatorów EUSAMA, płyty zbieżności i szarpaki hydrauliczne. Badanie sił hamowania do 7,5 kN na oś i wsparcie przy odbiorach TDT.',
      link: '/produkty/linie-diagnostyczne',
      linkLabel: 'Zobacz linie diagnostyczne',
    },
    {
      icon: <Disc className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Montażownice i wyważarki do kół',
      target: 'Dla serwisów oponiarskich i wulkanizacji',
      description:
        'Wyważarki serii MT Zero z sonarami bezdotykowymi oraz montażownice z ramą G-Frame (TC 22, TC 45, TC 47) z ramionami pomocniczymi TCX Pro do bezpiecznego montażu opon UHP i Run-Flat.',
      link: '/produkty/wywazarki-do-kol',
      linkLabel: 'Zobacz montaż i wyważanie',
    },
    {
      icon: <Truck className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Obsługa kół pojazdów ciężarowych',
      target: 'Dla serwisów TIR, rolniczych i transportowych',
      description:
        'Elektrohydrauliczne montażownice Servomat (MS 70, MS 75, MS 78, MS 80) o udźwigu do 2,2 t oraz wyważarki ciężarowe MT 788 i MT 795T o masie koła do 160 kg do kół o średnicy do 2500 mm.',
      link: '/produkty/pojazdy-ciezarowe',
      linkLabel: 'Zobacz sprzęt ciężarowy',
    },
    {
      icon: <Wind className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Stacje obsługi klimatyzacji Valeo i Robinair',
      target: 'Dla warsztatów mechanicznych',
      description:
        'Stacje do automatycznej obsługi układów klimatyzacji na czynniki R134a oraz R1234yf (m.in. Valeo ClimFill). Dostęp do oryginalnych filtrów, pomp próżniowych, złączy i legalizacji wag.',
      link: '/serwis',
      linkLabel: 'Sprawdź serwis klimatyzacji',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-foreground stroke-[1.5]" />,
      title: 'Szkolenia personelu i doradztwo techniczne',
      target: 'Dla diagnostów i mechaników',
      description:
        'Szkolenia praktyczne z obsługi geometrii 3D, procedur kalibracji, interpretacji wyników pomiarowych oraz doboru konfiguracji urządzeń przed zakupem.',
      link: '/kontakt',
      linkLabel: 'Zapytaj o szkolenie',
    },
  ];

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Oferta urządzeń diagnostycznych i wyposażenia SKP | Diagnostyka-Systems"
        description="Oferta aparatury diagnostycznej Beissbarth i stacji klimatyzacji Valeo: geometria 3D, ścieżki hamulcowe SKP, wyważarki, demontażownice, szkolenia personelu."
        canonicalPath="/oferta"
      />
      <PageHeader
        breadcrumbs={[{ label: 'Oferta' }]}
        title="Oferta aparatury i wyposażenia warsztatów"
        description="Dostarczamy precyzyjną aparaturę diagnostyczną Beissbarth oraz stacje klimatyzacji Valeo z pełnym wsparciem wdrożeniowym i serwisowym."
      />
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
          {offerPillars.map((item, idx) => (
            <Card key={idx} padding="lg" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>{item.icon}</div>
                <div>
                  <span className="text-[14px] text-foreground-secondary block mb-1">
                    {item.target}
                  </span>
                  <h2 className="text-[20px] font-semibold text-foreground leading-snug">
                    {item.title}
                  </h2>
                </div>
                <p className="text-[15px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(item.description)}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <Link
                  to={item.link}
                  className="text-[15px] font-semibold text-foreground hover:text-accent-text inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{item.linkLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Sekcja kontaktu w ofercie */}
        <div className="p-8 md:p-12 bg-white border border-surface-border rounded-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-[65ch] space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Potrzebujesz wyceny lub konfiguracji stanowiska?
            </h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              Przygotowujemy indywidualne zestawienia sprzętowe dopasowane do wymagań TDT, geometrii stanowiska oraz profilu Twojego serwisu.
            </p>
          </div>
          <Button to="/kontakt" variant="primary" size="md" className="shrink-0">
            Skontaktuj się z doradcą
          </Button>
        </div>
      </Container>
    </div>
  </div>
);
};
