import React from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Seo } from '@/components/common/Seo';
import { COMPANY_DATA } from '@/data/company';
import { openCookieSettings } from '@/components/cookies/consent';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh] py-10 md:py-16">
      <Seo
        title="Polityka prywatności i plików cookies | Diagnostyka-Systems s.c."
        description="Zasady przetwarzania danych osobowych (RODO) oraz wykorzystywania plików cookies w serwisie Diagnostyka-Systems s.c."
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
              Dokument określa zasady przetwarzania danych osobowych oraz wykorzystania plików cookies i technologii pamięci lokalnej w witrynie internetowej Diagnostyka-Systems s.c.
            </p>

            <div className="p-4 bg-background-subtle border border-surface-border rounded-[10px] text-[14px] text-foreground-secondary leading-relaxed mt-4">
              <strong className="text-foreground block mb-0.5">Wzorzec do weryfikacji prawnej:</strong>
              Niniejszy dokument stanowi szablon operacyjny opracowany na podstawie danych rejestrowych spółki oraz faktycznych mechanizmów technicznych serwisu. Podlega weryfikacji i zatwierdzeniu przez radcę prawnego.
            </div>
          </header>

          <div className="space-y-10 text-[16px] text-foreground leading-[1.6]">
            {/* 1. Administrator */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                1. Administrator Danych Osobowych
              </h2>
              <p className="text-foreground-secondary">
                Administratorem danych osobowych zbieranych za pośrednictwem serwisu internetowego jest spółka cywilna:
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
                  Siedziba, magazyn i adres do korespondencji: {COMPANY_DATA.officeAddress.fullInline}
                </p>
                <p className="text-foreground-secondary">
                  E-mail: {COMPANY_DATA.email} · Centrala tel./fax: {COMPANY_DATA.phones.mainFax.display}
                </p>
              </div>
            </section>

            {/* 2. Cele i podstawy */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                2. Cele i podstawy prawne przetwarzania danych
              </h2>
              <p className="text-foreground-secondary">
                Dane osobowe przekazywane w formularzach serwisu przetwarzane są wyłącznie w celach biznesowych B2B:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[15px] text-foreground-secondary">
                <li>
                  <strong className="text-foreground">Obsługa zgłoszeń serwisowych:</strong> na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy lub podjęcia działań na żądanie osoby przed zawarciem umowy).
                </li>
                <li>
                  <strong className="text-foreground">Obsługa zapytań ofertowych i kontaktowych:</strong> na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora polegający na bieżącym kontakcie handlowym i technicznym z klientami).
                </li>
                <li>
                  <strong className="text-foreground">Wypełnienie obowiązków podatkowych i księgowych:</strong> na podstawie art. 6 ust. 1 lit. c RODO w przypadku realizacji zamówień, napraw lub sprzedaży urządzeń.
                </li>
              </ul>
            </section>

            {/* 3. Odbiorcy danych */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                3. Odbiorcy danych osobowych
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Dane mogą być udostępniane podmiotom przetwarzającym je na zlecenie Administratora w zakresie niezbędnym do funkcjonowania serwisu:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-foreground-secondary">
                <li>Dostawcy usług hostingowych i utrzymania infrastruktury serwerowej witryny,</li>
                <li>Dostawcy usług poczty elektronicznej obsługującej korespondencję firmy,</li>
                <li>Upoważnionym pracownikom i inżynierom serwisu Diagnostyka-Systems s.c.</li>
              </ul>
            </section>

            {/* 4. Okres przechowywania */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                4. Okres przechowywania danych
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Dane przetwarzane w celu obsługi zapytania kontaktowego przechowywane są przez okres trwania kontaktu biznesowego lub do czasu zgłoszenia sprzeciwu. W przypadku zgłoszeń serwisowych zakończonych realizacją usługi dane przechowywane są przez okres wymagany przepisami prawa podatkowego i rachunkowości (zazwyczaj 5 lat od końca roku podatkowego) lub przez czas trwania gwarancji na sprzęt.
              </p>
            </section>

            {/* 5. Prawa osób, których dane dotyczą */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                5. Prawa osoby, której dane dotyczą
              </h2>
              <p className="text-[15px] text-foreground-secondary leading-relaxed">
                Każdej osobie, której dane dotyczą, przysługuje prawo:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-foreground-secondary">
                <li>dostępu do swoich danych osobowych oraz otrzymania ich kopii,</li>
                <li>sprostowania (poprawiania) swoich danych,</li>
                <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
                <li>ograniczenia przetwarzania danych,</li>
                <li>wniesienia sprzeciwu wobec przetwarzania danych,</li>
                <li>wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa).</li>
              </ul>
              <p className="text-[15px] text-foreground-secondary pt-1">
                W celu realizacji powyższych praw prosimy o kontakt pod adresem: <strong className="text-foreground">{COMPANY_DATA.email}</strong>.
              </p>
            </section>

            {/* 6. Pliki cookies i technologie zewnętrzne */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                6. Pliki cookies, localStorage i usługi zewnętrzne
              </h2>
              <div className="space-y-3 text-[15px] text-foreground-secondary leading-relaxed">
                <p>
                  Witryna <strong className="text-foreground">nie stosuje</strong> inwazyjnych ciasteczek marketingowych, pikseli śledzących (np. Meta Pixel) ani zewnętrznych sieci reklamowych.
                </p>
                <p>
                  Stosowane są wyłącznie niezbędne techniczne mechanizmy pamięci przeglądarki (sesyjne cookies / pamięć podręczna), służące prawidłowemu wyświetlaniu interfejsu, nawigacji oraz zabezpieczeniu formularzy kontaktowych przed spamem (mechanizm honeypot).
                </p>
                <div className="p-4 bg-background-subtle border border-surface-border rounded-[8px]">
                  <strong className="text-foreground block mb-1">Interaktywna mapa dojazdu Google Maps:</strong>
                  Mapa lokalizacji w zakładce Kontakt nie pobiera danych ani plików cookies firmy trzeciej (Google) w sposób automatyczny podczas ładowania podstrony. Zewnętrzny iframe mapy ładowany jest wyłącznie po świadomym kliknięciu przez użytkownika przycisku <em>„Załaduj mapę na stronie”</em> lub wyrażeniu zgody w banerze cookies. Alternatywnie dostępny jest bezpośredni odnośnik otwierający trasę w aplikacji Google Maps w nowej karcie.
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="h-10 px-5 rounded-[8px] bg-foreground text-white font-semibold text-[14px] hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    Zmień preferencje plików cookie
                  </button>
                </div>
              </div>
            </section>
          </div>
        </article>
      </Container>
    </div>
  );
};
