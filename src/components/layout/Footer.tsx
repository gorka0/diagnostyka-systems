import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { formatPolishTypography, formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { openCookieSettings } from '@/components/cookies/consent';

export const Footer: React.FC = () => {
  // Szybkie linki (maksymalnie 6 kluczowych pozycji z menu)
  const footerLinks = [
    { label: 'O nas', to: '/o-nas' },
    { label: 'Oferta', to: '/oferta' },
    { label: 'Produkty', to: '/produkty' },
    { label: 'Serwis', to: '/serwis' },
    { label: 'Realizacje', to: '/realizacje' },
    { label: 'Publikacje', to: '/publikacje' },
  ];

  return (
    <footer className="bg-graphite-900 border-t border-white/12 text-white text-[15px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Maksymalnie 3 kolumny w rygorystycznym układzie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Kolumna 1: Logo mono-light + 1 zwięzłe zdanie (5 kolumn) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light rounded"
              title="Diagnostyka-Systems s.c."
            >
              <Logo variant="mono" className="h-11 w-auto" alt="Diagnostyka-Systems s.c." />
            </Link>
            <p className="text-[15px] md:text-[16px] text-white/72 leading-relaxed max-w-[42ch]">
              {formatPolishTypography(LABELS.footer.tagline)}
            </p>
          </div>

          {/* Kolumna 2: Kontakt, adres i duży numer centrali (4 kolumny) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-semibold text-white text-[16px] tracking-tight">
              Kontakt i siedziba
            </h3>
            <div className="text-[15px] text-white/72 space-y-1 leading-relaxed">
              <p className="font-medium text-white">{COMPANY_DATA.name}</p>
              <p>{COMPANY_DATA.officeAddress.street}</p>
              <p>
                {COMPANY_DATA.officeAddress.postalCode} {COMPANY_DATA.officeAddress.city}{' '}
                {COMPANY_DATA.officeAddress.region}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <div>
                <span className="text-[13px] text-white/60 block">Centrala tel. / fax:</span>
                <a
                  href={cleanTelHref(COMPANY_DATA.phones.mainFax.raw)}
                  className="text-[20px] md:text-[22px] font-semibold text-white hover:text-accent-light tracking-tight transition-colors inline-block"
                >
                  {formatPhoneWithNbsp(COMPANY_DATA.phones.mainFax.display)}
                </a>
              </div>
              <p className="text-[15px]">
                <span className="text-white/60">E-mail: </span>
                <a
                  href={`mailto:${COMPANY_DATA.email}`}
                  className="text-white hover:text-accent-light underline underline-offset-4 font-medium transition-colors"
                >
                  {COMPANY_DATA.email}
                </a>
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/kontakt"
                className="text-[15px] font-semibold text-accent-light hover:underline inline-flex items-center gap-1.5 transition-colors"
              >
                {LABELS.cta.allContacts} →
              </Link>
            </div>
          </div>

          {/* Kolumna 3: Szybkie linki (3 kolumny) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-semibold text-white text-[16px] tracking-tight">
              Nawigacja
            </h3>
            <ul className="space-y-2.5 text-[15px] text-white/72">
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/polityka-prywatnosci"
                  className="text-[14px] text-white/60 hover:text-white underline underline-offset-2 transition-colors block"
                >
                  {LABELS.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-[14px] text-white/60 hover:text-white underline underline-offset-2 transition-colors cursor-pointer block text-left"
                >
                  Ustawienia plików cookie
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dane rejestrowe w jednej linii na dole + prawa autorskie i autor wdrożenia */}
        <div className="mt-16 pt-8 pb-4 border-t border-white/10 text-white/60 space-y-3">
          <p className="text-[13px] sm:text-[14px] leading-[1.7] text-balance">
            <span className="font-medium text-white/85">Dane rejestrowe spółki: </span>
            {COMPANY_DATA.legalAddress.companyName}, {COMPANY_DATA.legalAddress.street},{' '}
            {COMPANY_DATA.legalAddress.postalCode} {COMPANY_DATA.legalAddress.city} · NIP:{' '}
            <span className="font-mono text-white/80">{COMPANY_DATA.legalAddress.nip}</span> · REGON:{' '}
            <span className="font-mono text-white/80">{COMPANY_DATA.legalAddress.regon}</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 text-[12px] sm:text-[13px] text-white/70 font-mono">
            <p>
              © {new Date().getFullYear()} {LABELS.footer.allRightsReserved}
            </p>
            <p>
              <span>Projekt i wdrożenie: </span>
              <a
                href="https://www.studiowzrostu.pl"
                target="_blank"
                rel="noopener"
                className="text-white/80 hover:text-accent-light underline underline-offset-2 decoration-white/35 hover:decoration-accent-light transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-light rounded-xs"
              >
                Studio Wzrostu
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
