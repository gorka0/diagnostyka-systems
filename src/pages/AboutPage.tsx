import React from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { SiteImage } from '@/components/common/SiteImage';
import { CornerBrackets } from '@/components/ui/MeasurementMarks';
import { COMPANY_HISTORY } from '@/data/history';
import { PARTNERS_DATA } from '@/data/partners';
import { COMPANY_DATA } from '@/data/company';
import { formatPolishTypography } from '@/utils/typography';
import { CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="O firmie – Ponad 20 lat autoryzacji Beissbarth | Diagnostyka-Systems"
        description="Historia Diagnostyka-Systems od 2004 r. Autoryzacja fabryczna Beissbarth GmbH od 2005 r., certyfikacja ITS dla SKP, serwis stacji Valeo."
        canonicalPath="/o-nas"
      />

      {/* Wspólny spójny nagłówek podstron: #F7F7F5, breadcrumb, H1 48 px, 1 zdanie, Crosshair 5% */}
      <PageHeader
        breadcrumbs={[{ label: 'O nas' }]}
        title="O firmie Diagnostyka-Systems"
        description="Autoryzowany dystrybutor i certyfikowane centrum serwisowe aparatury diagnostycznej Beissbarth GmbH oraz urządzeń do obsługi klimatyzacji Valeo."
        badge="Ponad 20 lat autoryzacji"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 1. Profil firmy i zdjęcie siedziby */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7 space-y-5 max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-[1.2]">
              Inżynieria pomiarowa i serwis urządzeń warsztatowych
            </h2>
            <p className="text-[16px] md:text-[17px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(COMPANY_HISTORY.lead)}
            </p>
            <p className="text-[16px] md:text-[17px] text-foreground-secondary leading-relaxed">
              {formatPolishTypography(
                'Dzięki bezpośredniej autoryzacji producenta dysponujemy oryginalną dokumentacją techniczną, fabrycznymi przyrządami kalibracyjnymi oraz stałym dostępem do magazynu części zamiennych w Lisim Ogonie.'
              )}
            </p>

            <div className="pt-4 flex flex-wrap gap-8 border-t border-surface-border">
              <div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block">2004</span>
                <span className="text-[14px] text-foreground-secondary">Rozpoczęcie działalności</span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block">2005</span>
                <span className="text-[14px] text-foreground-secondary">Autoryzacja Beissbarth</span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold text-foreground block">2007</span>
                <span className="text-[14px] text-foreground-secondary">Atesty ITS dla SKP</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[16px] overflow-hidden border border-surface-border bg-background-subtle">
              <CornerBrackets size={16} color="#EE9D16" />
              <SiteImage
                name="company-building"
                fit="cover"
                aspectRatio="16/9"
                alt="Siedziba Diagnostyka-Systems w Lisim Ogonie"
                className="w-full"
              />
            </div>
            <p className="text-[14px] text-foreground-secondary mt-3">
              {COMPANY_DATA.officeAddress.street}, {COMPANY_DATA.officeAddress.city} {COMPANY_DATA.officeAddress.region}
            </p>
          </div>
        </div>

        {/* 2. Główne obszary kompetencji */}
        <div className="bg-white border border-surface-border rounded-[10px] p-8 md:p-12 mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            Główne obszary działalności
          </h2>
          <p className="text-[16px] text-foreground-secondary mb-8 max-w-[65ch]">
            Kompleksowy zakres wsparcia technicznego i handlowego dla stacji kontroli pojazdów oraz serwisów samochodowych:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPANY_HISTORY.coreActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3.5 p-4 rounded-[8px] bg-background-subtle border border-surface-border">
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <span className="text-[15px] text-foreground font-medium leading-relaxed">
                  {formatPolishTypography(activity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Historia i kamienie milowe */}
        <div className="mb-16 md:mb-24">
          <div className="mb-10 max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Historia i kamienie milowe
            </h2>
            <p className="mt-2 text-[16px] text-foreground-secondary">
              Kluczowe etapy w rozwoju firmy od 2004 roku:
            </p>
          </div>

          <div className="relative border-l border-surface-border ml-3 md:ml-4 space-y-8 pl-6 md:pl-8">
            {COMPANY_HISTORY.milestones.map((milestone, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-foreground border-2 border-white" />

                <Card padding="lg" className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-foreground">
                      {milestone.year}
                    </span>
                    <h3 className="text-[18px] font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-foreground-secondary leading-relaxed">
                    {formatPolishTypography(milestone.description)}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Partnerzy i certyfikaty (sekcja autoryzowana na /o-nas) */}
        <div className="pt-12 border-t border-surface-border">
          <div className="mb-10 max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Partnerzy i certyfikaty fabryczne
            </h2>
            <p className="mt-2 text-[16px] text-foreground-secondary">
              Oficjalne relacje partnerskie gwarantują oryginalne części zamienne oraz wsparcie inżynieryjne producentów.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-[18px] font-semibold text-foreground">
                Autoryzowane partnerstwa
              </h3>
              <div className="space-y-4">
                {PARTNERS_DATA.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-5 bg-white border border-surface-border rounded-[10px] flex items-center gap-4"
                  >
                    <div className="p-2 bg-background-subtle border border-surface-border rounded-[8px] shrink-0">
                      <img src={partner.logoPlaceholder} alt={partner.name} className="h-8 w-24 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-[16px]">{partner.name}</h4>
                      <p className="text-[14px] text-foreground-secondary mt-0.5 leading-relaxed">{partner.scope}</p>
                      <span className="text-[14px] text-foreground-secondary mt-1 block">
                        Autoryzacja od {partner.authorizationYear} r.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-[18px] font-semibold text-foreground">
                Certyfikaty i dopuszczenia (A4)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SiteImage name="cert-beissbarth" aspectRatio="4/3" />
                <SiteImage name="cert-its-skp" aspectRatio="4/3" />
                <SiteImage name="cert-valeo" aspectRatio="4/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
