import React, { useState } from 'react';
import { Seo } from '@/components/common/Seo';
import { getLocalBusinessJsonLd } from '@/utils/seo';
import { PageHero } from '@/components/layout/PageHero';
import { COMPANY_DATA } from '@/data/company';
import { formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { ContactForm } from '@/components/forms/ContactForm';
import { MapPin, ExternalLink, MousePointer2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // 4 numery bezpośrednie z company.ts
  const directPhones = [
    {
      label: COMPANY_DATA.phones.techInfo.label,
      phone: COMPANY_DATA.phones.techInfo,
    },
    {
      label: COMPANY_DATA.phones.salesInfo.label,
      phone: COMPANY_DATA.phones.salesInfo,
    },
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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Diagnostyka-Systems, ul. Potulicka 38, 86-065 Lisi Ogon'
  )}`;

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Kontakt i Serwis Bydgoszcz – Diagnostyka-Systems s.c."
        description="Skontaktuj się z autoryzowanym dystrybutorem i serwisem Beissbarth: formularz z wyborem celu, bezpośrednie telefony do inżynierów, magazyn Lisi Ogon k. Bydgoszczy."
        canonicalPath="/kontakt"
        jsonLd={getLocalBusinessJsonLd()}
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Kontakt', path: '/kontakt' },
        ]}
      />

      <PageHero
        variant="compact"
        breadcrumbs={[{ label: 'Kontakt' }]}
        title="Kontakt z inżynierami i serwisem"
        description="Jeden punkt kontaktu: zapytania o ofertę, zgłoszenia awarii oraz bezpośrednie telefony do specjalistów technicznych."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
        {/* Główny grid: Lewa strona = Ciemny panel z telefonami i adresem (5 kolumn), Prawa = Formularz z wyborem celu (7 kolumn) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lewa strona: Ciemny panel carbon / graphite #14171A (telefony + adres) - 5 kolumn */}
          <div className="lg:col-span-5 bg-[#14171A] text-white rounded-[16px] p-7 sm:p-9 border border-white/10 space-y-9 shadow-lg">
            {/* Lista telefonów bezpośrednich */}
            <div className="space-y-5">
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Bezpośrednie telefony
              </h2>

              <div className="divide-y divide-white/10">
                {directPhones.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <span className="text-[14px] sm:text-[15px] text-white/70 block">
                      {item.label}
                    </span>
                    <a
                      href={cleanTelHref(item.phone.raw)}
                      className="text-[26px] sm:text-[28px] font-bold font-mono text-white hover:text-accent-text transition-colors tracking-tight tabular-nums block"
                    >
                      {formatPhoneWithNbsp(item.phone.display)}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Separator z podziałką pomiarową */}
            <div className="relative border-t border-white/15 pt-8">
              <div aria-hidden="true" className="absolute -top-[5px] left-0 right-0 flex justify-between px-2 text-white/30 text-[10px] font-mono select-none">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>

              {/* Siedziba i magazyn operacyjny */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Siedziba i magazyn
                </h3>
                <div className="text-[15px] text-white/80 leading-relaxed space-y-0.5">
                  <p className="font-semibold text-white">{COMPANY_DATA.name}</p>
                  <p>{COMPANY_DATA.officeAddress.street}</p>
                  <p>
                    {COMPANY_DATA.officeAddress.postalCode} {COMPANY_DATA.officeAddress.city}{' '}
                    {COMPANY_DATA.officeAddress.region}
                  </p>
                </div>

                <div className="pt-2 space-y-1.5 text-[14px] text-white/75">
                  <p>
                    <span className="text-white/60">Centrala tel./fax: </span>
                    <a
                      href={cleanTelHref(COMPANY_DATA.phones.mainFax.raw)}
                      className="text-white hover:text-accent-text underline underline-offset-2"
                    >
                      {formatPhoneWithNbsp(COMPANY_DATA.phones.mainFax.display)}
                    </a>
                  </p>
                  <p>
                    <span className="text-white/60">E-mail: </span>
                    <a
                      href={`mailto:${COMPANY_DATA.email}`}
                      className="text-white hover:text-accent-text underline underline-offset-2"
                    >
                      {COMPANY_DATA.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Dane rejestrowe */}
            <div className="border-t border-white/15 pt-7 space-y-2 text-[13px] text-white/65 leading-relaxed">
              <h4 className="text-[14px] font-semibold text-white">
                Dane rejestrowe spółki
              </h4>
              <p>{COMPANY_DATA.legalAddress.companyName}</p>
              <p>
                {COMPANY_DATA.legalAddress.street}, {COMPANY_DATA.legalAddress.postalCode}{' '}
                {COMPANY_DATA.legalAddress.city}
              </p>
              <p className="font-mono pt-1 text-white/80">
                NIP: {COMPANY_DATA.legalAddress.nip} · REGON: {COMPANY_DATA.legalAddress.regon}
              </p>
            </div>
          </div>

          {/* Prawa strona: Jeden uniwersalny formularz kontaktowy z wyborem celu (7 kolumn) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Mapa dojazdu poniżej (desktop: hover; mobile: button) */}
        <section className="pt-8 border-t border-surface-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl font-semibold text-foreground tracking-tight">
                  Lokalizacja i dojazd
                </h3>
                {!mapLoaded && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-subtle text-foreground-secondary text-[12px] font-medium border border-surface-border">
                    <MousePointer2 className="w-3.5 h-3.5 text-accent-text" />
                    <span>Aktywacja po najechaniu kursorem</span>
                  </span>
                )}
              </div>
              <p className="text-[14px] text-foreground-secondary mt-1">
                Lisi Ogon k. Bydgoszczy, ul. Potulicka 38 (przy drodze krajowej S10/S5)
              </p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-accent-text hover:underline inline-flex items-center gap-1.5"
            >
              <span>Otwórz w Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div
            id="contact-map"
            tabIndex={!mapLoaded ? 0 : undefined}
            onFocus={() => setMapLoaded(true)}
            onMouseEnter={() => setMapLoaded(true)}
            aria-label={!mapLoaded ? 'Obszar mapy dojazdu. Najedź kursorem myszy na desktopie lub kliknij przycisk na telefonie, aby załadować interaktywną mapę.' : undefined}
            className={`aspect-[21/9] min-h-[300px] w-full rounded-[16px] overflow-hidden border border-surface-border bg-background-subtle flex flex-col items-center justify-center relative transition-colors ${
              !mapLoaded ? 'hover:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/40' : ''
            }`}
          >
            {!mapLoaded ? (
              <div className="p-8 text-center space-y-4 max-w-md">
                <div className="w-12 h-12 rounded-full bg-white border border-surface-border flex items-center justify-center mx-auto text-foreground shadow-sm">
                  <MapPin className="w-6 h-6 text-accent-text" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-[16px]">
                    Siedziba i magazyn Diagnostyka-Systems
                  </p>
                  <p className="text-[14px] text-foreground-secondary mt-1">
                    ul. Potulicka 38, 86-065 Lisi Ogon
                  </p>
                </div>

                {/* DESKTOP */}
                <div className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-surface-border text-[13px] text-foreground font-medium shadow-2xs whitespace-nowrap">
                  <MousePointer2 className="w-4 h-4 text-accent-text" />
                  <span>Najedź kursorem myszy, aby załadować mapę</span>
                </div>

                {/* MOBILE */}
                <div className="sm:hidden pt-2">
                  <button
                    type="button"
                    onClick={() => setMapLoaded(true)}
                    className="h-11 px-6 text-[14px] font-semibold text-foreground bg-white border border-surface-border rounded-[10px] shadow-sm active:bg-gray-100 transition-colors inline-flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-accent-text" />
                    <span>Załaduj interaktywną mapę</span>
                  </button>
                  <p className="text-[12px] text-foreground-muted mt-2">
                    Dotknij przycisk, aby włączyć podgląd
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                title="Lokalizacja Diagnostyka-Systems s.c."
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2394.241571216524!2d17.886071377033583!3d53.12384797222502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47031478c9ebaaab%3A0xb3bfebbfbe3d7ba1!2sPotulicka%2038%2C%2086-065%20Lisi%20Ogon!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
