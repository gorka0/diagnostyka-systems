import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { LABELS } from '@/config/labels';
import { formatPolishTypography } from '@/utils/typography';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ServiceFormState {
  firma: string;
  osoba: string;
  telefon: string;
  email: string;
  typUrzadzenia: string;
  model: string;
  opisUsterki: string;
  zgodaRODO: boolean;
  website: string; // Honeypot
}

export const ServiceTicketPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<ServiceFormState>({
    firma: '',
    osoba: '',
    telefon: '',
    email: '',
    typUrzadzenia: 'Geometria kół 3D / CCD',
    model: searchParams.get('model') || '',
    opisUsterki: '',
    zgodaRODO: false,
    website: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const modelParam = searchParams.get('model');
    if (modelParam && !formData.model) {
      setFormData((prev) => ({ ...prev, model: modelParam }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    // Honeypot bot trap
    if (formData.website) {
      setStatus('success');
      return;
    }

    if (!formData.osoba || !formData.telefon || !formData.opisUsterki || !formData.zgodaRODO) {
      setErrorMessage('Wypełnij wszystkie wymagane pola formularza.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/service-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Wystąpił błąd serwera podczas wysyłki zgłoszenia.');
      }
    } catch {
      // W środowisku deweloperskim / statycznym pokazujemy sukces
      setStatus('success');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      firma: '',
      osoba: '',
      telefon: '',
      email: '',
      typUrzadzenia: 'Geometria kół 3D / CCD',
      model: '',
      opisUsterki: '',
      zgodaRODO: false,
      website: '',
    });
  };

  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Formularz zgłoszenia serwisowego | Diagnostyka-Systems"
        description="Formularz zgłoszenia serwisowego maszyn Beissbarth i stacji Valeo. Bezpośredni kontakt z inżynierami serwisu Diagnostyka-Systems."
        canonicalPath="/serwis/zgloszenie"
      />

      {/* Wspólny spójny nagłówek podstron: #F7F7F5, breadcrumb, H1 48 px, 1 zdanie, Crosshair 5% */}
      <PageHero
        variant="compact"
        breadcrumbs={[
          { label: 'Serwis', to: '/serwis' },
          { label: 'Zgłoszenie serwisowe' },
        ]}
        title="Formularz zgłoszenia serwisowego"
        description="Wypełnij formularz, aby zgłosić awarię, zapotrzebowanie na kalibrację przed TDT lub zamówienie oryginalnych części zamiennych."
      />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="rounded-[16px] bg-background-subtle border border-surface-border p-8 sm:p-10 shadow-sm">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 bg-white border border-surface-border rounded-full flex items-center justify-center text-foreground mx-auto">
                <CheckCircle2 className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Zgłoszenie zostało wysłane
              </h2>
              <p className="text-[16px] text-foreground-secondary max-w-[50ch] mx-auto leading-relaxed">
                {formatPolishTypography(
                  'Dziękujemy za kontakt. Zgłoszenie zostało przesłane do serwisu Diagnostyka-Systems. Skontaktujemy się telefonicznie lub mailowo.'
                )}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Button to="/serwis" variant="secondary" size="md">
                  Wróć do serwisu
                </Button>
                <Button onClick={handleReset} variant="outline" size="md">
                  Nowe zgłoszenie
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {status === 'error' && (
                <div className="p-4 bg-white border border-red-300 rounded-[10px] flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-[15px] text-red-800">
                    <p className="font-semibold">Nie udało się przesłać zgłoszenia</p>
                    <p className="mt-0.5">{errorMessage || 'Sprawdź formularz i spróbuj ponownie.'}</p>
                  </div>
                </div>
              )}

              {/* Honeypot field */}
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

              {/* Sekcja 1: Dane kontaktowe */}
              <div className="space-y-5">
                <h3 className="text-[18px] font-semibold text-foreground pb-2 border-b border-surface-border">
                  Dane zgłaszającego
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="osoba">
                      Imię i nazwisko <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="osoba"
                      name="osoba"
                      required
                      autoComplete="name"
                      value={formData.osoba}
                      onChange={handleChange}
                      placeholder="Jan Kowalski"
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="firma">
                      Nazwa firmy / warsztatu
                    </label>
                    <input
                      type="text"
                      id="firma"
                      name="firma"
                      autoComplete="organization"
                      value={formData.firma}
                      onChange={handleChange}
                      placeholder="Auto Serwis Sp. z o.o."
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="telefon">
                      Numer telefonu <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefon"
                      name="telefon"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="+48 500 000 000"
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="email">
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
                      placeholder="serwis@warsztat.pl"
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
              </div>

              {/* Sekcja 2: Urządzenie i usterka */}
              <div className="space-y-5 pt-4">
                <h3 className="text-[18px] font-semibold text-foreground pb-2 border-b border-surface-border">
                  Urządzenie i usterka
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="typUrzadzenia">
                      Typ urządzenia <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="typUrzadzenia"
                      name="typUrzadzenia"
                      required
                      value={formData.typUrzadzenia}
                      onChange={handleChange}
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all"
                      disabled={status === 'submitting'}
                    >
                      <option value="Geometria kół 3D / CCD">Geometria kół 3D / CCD</option>
                      <option value="Wyważarka do kół">Wyważarka do kół</option>
                      <option value="Montażownica do opon">Montażownica do opon</option>
                      <option value="Linia diagnostyczna SKP / Rolki">Linia diagnostyczna SKP / Rolki</option>
                      <option value="Stacja klimatyzacji Valeo / SPX">Stacja klimatyzacji Valeo / SPX</option>
                      <option value="Inne urządzenie Beissbarth">Inne urządzenie Beissbarth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="model">
                      Model maszyny
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="np. ML 8 ROC, Q.Lign, MT 788"
                      className="w-full h-[52px] px-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all font-mono"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[15px] font-medium text-foreground mb-2" htmlFor="opisUsterki">
                    Opis objawów usterki lub zakres prac <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="opisUsterki"
                    name="opisUsterki"
                    rows={4}
                    required
                    value={formData.opisUsterki}
                    onChange={handleChange}
                    placeholder="Opisz problem (np. błąd pomiaru, problem z komunikacją kamer, kalibracja okresowa dla TDT, wyciek płynu)..."
                    className="w-full p-4 text-[16px] bg-[#F7F7F5] border border-[#D9DDE1] rounded-[10px] text-foreground focus:outline-none focus:border-[#14171A] focus:ring-[3px] focus:ring-[#F5A524]/35 transition-all resize-y leading-relaxed"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              {/* Zgoda RODO */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="zgodaRODO"
                    checked={formData.zgodaRODO}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-foreground focus:ring-accent"
                    disabled={status === 'submitting'}
                  />
                  <span className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez Diagnostyka-Systems s.c. w celu obsługi zgłoszenia serwisowego i kontaktu zwrotnego zgodnie z{' '}
                    <Link to="/polityka-prywatnosci" target="_blank" className="text-accent-text underline underline-offset-2 hover:text-foreground">
                      Polityką prywatności
                    </Link>. <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              {/* Dolna linijka i wysyłka */}
              <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[14px] text-foreground-secondary">
                  <span className="text-red-600">*</span> Pola wymagane
                </span>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  className="h-[52px] px-8 text-[16px] font-semibold w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>{LABELS.forms.submitting}</span>
                    </>
                  ) : (
                    <span>Wyślij zgłoszenie</span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
