import React from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { COMPANY_DATA } from '@/data/company';
import { formatPhoneWithNbsp } from '@/utils/typography';
import { Phone, AlertTriangle } from 'lucide-react';

export const ServiceTicketPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Zgłoszenie serwisowe – Autoryzowany Serwis Beissbarth | Diagnostyka-Systems"
        description="Formularz zgłoszenia serwisowego maszyn Beissbarth i stacji Valeo. Bezpośredni kontakt z inżynierami serwisu Diagnostyka-Systems."
        canonicalPath="/serwis/zgloszenie"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Serwis', path: '/serwis' },
          { label: 'Zgłoszenie serwisowe', path: '/serwis/zgloszenie' },
        ]}
      />

      <PageHero
        variant="compact"
        breadcrumbs={[
          { label: 'Serwis', to: '/serwis' },
          { label: 'Zgłoszenie serwisowe' },
        ]}
        title="Zgłoszenie serwisowe"
        description="Wypełnij formularz, aby zgłosić awarię, zapotrzebowanie na kalibrację przed TDT lub zamówienie oryginalnych części zamiennych."
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
        {/* Baner pilnej awarii (telefon techniczny) */}
        <div className="p-4 sm:p-5 bg-amber-500/10 border border-amber-500/30 rounded-[12px] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-text shrink-0" />
            <div>
              <p className="text-[14px] font-semibold text-foreground">
                Pilna awaria na stanowisku SKP lub ASO?
              </p>
              <p className="text-[13px] text-foreground-secondary">
                Zadzwoń bezpośrednio do inżyniera dyżurnego serwisu technicznego.
              </p>
            </div>
          </div>
          <a
            href={`tel:${COMPANY_DATA.phones.techInfo.raw}`}
            className="h-10 px-4 rounded-[8px] bg-foreground text-white hover:bg-foreground/90 font-semibold text-[14px] transition-colors inline-flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4 text-accent-primary" />
            <span>{formatPhoneWithNbsp(COMPANY_DATA.phones.techInfo.display)}</span>
          </a>
        </div>

        {/* Jeden uniwersalny formularz z initialType="serwis" */}
        <ContactForm initialType="serwis" customTitle="Formularz zgłoszenia serwisowego" />
      </div>
    </div>
  );
};
