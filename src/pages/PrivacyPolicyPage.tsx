import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Seo } from '@/components/common/Seo';
import { COMPANY_DATA } from '@/data/company';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh] py-10 md:py-16">
      <Seo
        title="Polityka prywatności i plików cookies | Diagnostyka-Systems s.c."
        description="Zasady przetwarzania danych osobowych (RODO) oraz wykorzystywania plików cookies w serwisie Diagnostyka-Systems s.c., autoryzowanego serwisu Beissbarth."
        canonicalPath="/polityka-prywatnosci"
      />
      <Container>
        <Breadcrumbs items={[{ label: 'Polityka prywatności' }]} />

        <article className="mt-8 max-w-[68ch] mx-auto">
          <header className="mb-10 pb-8 border-b border-surface-border space-y-3">
            <span className="text-[14px] font-medium text-foreground-secondary block">
              Nota prawna i RODO
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
              Polityka prywatności i plików cookies
            </h1>
            <p className="text-[15px] md:text-[16px] text-foreground-secondary leading-relaxed pt-1">
              Dokument określa zasady przetwarzania danych osobowych oraz wykorzystania plików cookies w witrynie internetowej Diagnostyka-Systems s.c.
            </p>

            <div className="p-4 bg-background-subtle border border-surface-border rounded-[10px] text-[14px] text-foreground-secondary leading-relaxed mt-4">
              <strong className="text-foreground block mb-0.5">Informacja prawna:</strong>
              Dokument stanowi wzorzec opracowany na podstawie danych rejestrowych spółki i wymaga formalnej weryfikacji przez radcę prawnego przed audytem.
            </div>
          </header>

          <div className="space-y-10 text-[16px] text-foreground leading-[1.6]">
            {/* 1. Administrator */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                1. Administrator Danych Osobowych
              </h2>
              <p className="text-foreground-secondary">
                Administratorem Państwa danych osobowych jest spółka cywilna:
              </p>
              <div className="p-5 bg-white border border-surface-border rounded-[10px] space-y-1.5 text-[15px]">
                <p className="font-semibold text-foreground">{COMPANY_DATA.legalAddress.companyName}</p>
                <p className="text-foreground-secondary">
                  Adres rejestrowy: {COMPANY_DATA.legalAddress.street}, {COMPANY_DATA.legalAddress.postalCode} {COMPANY_DATA.legalAddress.city}
                </p>
                <p className="text-foreground-secondary">
                  NIP: {COMPANY_DATA.legalAddress.nip} · REGON: {COMPANY_DATA.legalAddress.regon}
                </p>
                <p className="pt-2 text-foreground font-medium">
                  Adres korespondencyjny i magazyn: {COMPANY_DATA.officeAddress.fullInline}
                </p>
                <p className="text-foreground-secondary">
                  E-mail: {COMPANY_DATA.email} · Tel.: {COMPANY_DATA.phones.mainFax.display}
                </p>
              </div>
            </section>

            {/* 2. Cele i podstawy */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                2. Cele i podstawy prawne przetwarzania danych
              </h2>
              <p className="text-foreground-secondary">
                Dane osobowe przetwarzane są w następujących celach:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-foreground-secondary">
                <li>
                  <strong className="text-foreground">Obsługa zgłoszeń serwisowych:</strong> na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy lub podjęcia działań na żądanie osoby).
                </li>
                <li>
                  <strong className="text-foreground">Obsługa formularza kontaktowego:</strong> na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora polegający na obsłudze zapytań klientów B2B).
                </li>
                <li>
                  <strong className="text-foreground">Wypełnienie obowiązków prawno-podatkowych:</strong> na podstawie art. 6 ust. 1 lit. c RODO (wystawianie faktur, archiwizacja dokumentacji).
                </li>
              </ul>
            </section>

            {/* 3. Prawa użytkownika */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                3. Prawa osób, których dane dotyczą
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Każdej osobie przysługuje prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu oraz prawo do przenoszenia danych. W celu realizacji praw prosimy o kontakt pod adresem: {COMPANY_DATA.email}.
              </p>
            </section>

            {/* 4. Pliki cookies */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                4. Pliki cookies
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Serwis nie wykorzystuje inwazyjnych trackerów reklamowych ani zewnętrznych skryptów śledzących. Stosowane są wyłącznie niezbędne techniczne pliki cookies służące prawidłowemu działaniu witryny i zabezpieczeniu formularzy.
              </p>
            </section>
          </div>
        </article>
      </Container>
    </div>
  );
};
