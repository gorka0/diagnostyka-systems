import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { getLocalBusinessJsonLd } from '@/utils/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { formatPolishTypography, formatPhoneWithNbsp, cleanTelHref } from '@/utils/typography';
import { CheckCircle2, AlertCircle, Loader2, MapPin, ExternalLink, MousePointer2 } from 'lucide-react';

interface ContactFormState {
  imieNazwisko: string;
  firma: string;
  telefon: string;
  email: string;
  tematProdukt: string;
  wiadomosc: string;
  zgodaRODO: boolean;
  website: string; // Honeypot
}

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<ContactFormState>({
    imieNazwisko: '',
    firma: '',
    telefon: '',
    email: '',
    tematProdukt: searchParams.get('produkt') || searchParams.get('temat') || '',
    wiadomosc: '',
    zgodaRODO: false,
    website: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const prod = searchParams.get('produkt');
    const temat = searchParams.get('temat');
    if (prod && !formData.tematProdukt) {
      setFormData((prev) => ({
        ...prev,
        tematProdukt: `Zapytanie o produkt: ${prod}`,
        wiadomosc: `Dzień dobry, proszę o przesłanie oferty cenowej i specyfikacji technicznej dla urządzenia ${prod}.`,
      }));
    } else if (temat && !formData.tematProdukt) {
      setFormData((prev) => ({
        ...prev,
        tematProdukt: temat,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot trap
    if (formData.website) {
      setStatus('success');
      return;
    }

    if (!formData.imieNazwisko || !formData.email || !formData.wiadomosc || !formData.zgodaRODO) {
      setErrorMessage('Wypełnij wszystkie wymagane pola formularza.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie lub zadzwoń bezpośrednio.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      imieNazwisko: '',
      firma: '',
      telefon: '',
      email: '',
      tematProdukt: '',
      wiadomosc: '',
      zgodaRODO: false,
      website: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

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
        title="Kontakt i dojazd | Diagnostyka-Systems s.c."
        description="Dane kontaktowe, bezpośrednie telefony do inżynierów i specjalistów oraz formularz kontaktowy Diagnostyka-Systems s.c. Siedziba i magazyn: Lisi Ogon k. Bydgoszczy."
        canonicalPath="/kontakt"
        breadcrumbs={[
          { label: 'Strona główna', path: '/' },
          { label: 'Kontakt', path: '/kontakt' },
        ]}
        jsonLd={getLocalBusinessJsonLd()}
      />

      {/* Kompaktowy nagłówek podstrony */}
      <PageHero
        variant="compact"
        breadcrumbs={[{ label: 'Kontakt' }]}
        title="Kontakt i dojazd"
        description="Bezpośrednie telefony do inżynierów i doradców technicznych oraz formularz kontaktowy biura w Lisim Ogonie."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 md:space-y-20">
        {/* Układ 2-kolumnowy: Lewy ciemny panel graphite-900 (telefony + adres) + Prawy biały formularz */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lewy ciemny panel (graphite-900) - 5 kolumn */}
          <div className="lg:col-span-5 bg-[#14171A] text-white rounded-[16px] p-7 sm:p-9 border border-white/10 space-y-9 shadow-lg">
            {/* 1. Cztery bezpośrednie telefony jako duże wiersze (numer 28 px, podpis 15 px) */}
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

            {/* Separator z motywem podziałki pomiarowej (tick marks) */}
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

            {/* Separator i dane rejestrowe */}
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

          {/* Prawa strona: Formularz kontaktowy na białym tle (7 kolumn) */}
          <div className="lg:col-span-7 bg-white border border-surface-border rounded-[16px] p-7 sm:p-10 shadow-sm">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-14 h-14 bg-background-subtle border border-surface-border rounded-full flex items-center justify-center text-foreground mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {LABELS.forms.successTitle}
                </h3>
                <p className="text-[16px] text-foreground-secondary max-w-[50ch] mx-auto leading-relaxed">
                  {formatPolishTypography(LABELS.forms.successDesc)}
                </p>
                <div className="pt-4">
                  <Button onClick={handleReset} variant="secondary" size="md">
                    Napisz kolejną wiadomość
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Napisz do nas
                  </h2>
                  <p className="mt-1 text-[15px] text-foreground-secondary">
                    Odpowiemy bezpośrednio na wskazany adres e-mail lub numer telefonu.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-[14px] text-red-800">
                      <p className="font-semibold">Wystąpił błąd</p>
                      <p className="mt-0.5">{errorMessage || 'Sprawdź formularz i spróbuj ponownie.'}</p>
                    </div>
                  </div>
                )}

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Pola formularza: duże inputy 52px, tło #F7F7F5, ramka #D9DDE1 */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="imieNazwisko">
                      Imię i nazwisko <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="imieNazwisko"
                      name="imieNazwisko"
                      required
                      autoComplete="name"
                      value={formData.imieNazwisko}
                      onChange={handleChange}
                      placeholder="Jan Kowalski"
                      className="w-full h-[52px] px-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="firma">
                        Firma / Warsztat
                      </label>
                      <input
                        type="text"
                        id="firma"
                        name="firma"
                        autoComplete="organization"
                        value={formData.firma}
                        onChange={handleChange}
                        placeholder="Nazwa firmy (opcjonalnie)"
                        className="w-full h-[52px] px-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="telefon">
                        Numer telefonu
                      </label>
                      <input
                        type="tel"
                        id="telefon"
                        name="telefon"
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.telefon}
                        onChange={handleChange}
                        placeholder="+48 500 000 000"
                        className="w-full h-[52px] px-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all"
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="email">
                      Adres e-mail <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="twoj-email@domena.pl"
                      className="w-full h-[52px] px-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="tematProdukt">
                      Temat zapytania / Urządzenie
                    </label>
                    <input
                      type="text"
                      id="tematProdukt"
                      name="tematProdukt"
                      value={formData.tematProdukt}
                      onChange={handleChange}
                      placeholder="np. Zapytanie o geometrię kół Q.Lign 3D"
                      className="w-full h-[52px] px-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-1.5" htmlFor="wiadomosc">
                      Wiadomość <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="wiadomosc"
                      name="wiadomosc"
                      rows={5}
                      required
                      value={formData.wiadomosc}
                      onChange={handleChange}
                      placeholder="Wpisz treść zapytania..."
                      className="w-full p-4 text-[15px] sm:text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#EE9D16]/30 transition-all resize-y leading-relaxed"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="zgodaRODO"
                        checked={formData.zgodaRODO}
                        onChange={handleChange}
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-foreground focus:ring-accent"
                        disabled={status === 'submitting'}
                      />
                      <span className="text-[13px] sm:text-[14px] text-foreground-secondary leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Diagnostyka-Systems s.c. w celu udzielenia odpowiedzi na przesłane zapytanie zgodnie z{' '}
                        <Link to="/polityka-prywatnosci" target="_blank" className="text-accent-text underline underline-offset-2 hover:text-foreground">
                          Polityką prywatności
                        </Link>. <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[13px] text-foreground-secondary">
                    <span className="text-red-600">*</span> Pola wymagane
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="h-[52px] px-8 text-[16px] font-semibold w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span>{LABELS.forms.submitting}</span>
                      </>
                    ) : (
                      <span>{LABELS.cta.sendMessage}</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Mapa dojazdu poniżej (desktop: aktywacja po najechaniu kursorem; mobile: przycisk dotykowy) */}
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

                {/* DESKTOP: Informacja o aktywacji kursorem myszy (brak mylącego przycisku) */}
                <div className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-surface-border text-[13px] text-foreground font-medium shadow-2xs whitespace-nowrap">
                  <MousePointer2 className="w-4 h-4 text-accent-text" />
                  <span>Najedź kursorem myszy, aby załadować mapę</span>
                </div>

                {/* MOBILE: Wyraźny przycisk dotykowy (zapobiega blokowaniu przewijania strony gestem) */}
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
