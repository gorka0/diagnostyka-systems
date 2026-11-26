import React, { useState, useEffect, useId, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COMPANY_DATA, ContactPurpose } from '@/data/company';
import { PRODUCTS_DATA } from '@/data/products';
import { parseProductModel } from '@/data/parse-rules';
import { formatPhoneWithNbsp } from '@/utils/typography';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  ArrowRight,
  RotateCcw,
  Wrench,
  Tag,
  Mail,
} from 'lucide-react';

export interface ContactFormProps {
  initialType?: ContactPurpose;
  initialProduct?: string;
  customTitle?: string;
  customSubtitle?: string;
  className?: string;
  onSuccess?: () => void;
}

interface FormState {
  imieNazwisko: string;
  firma: string;
  email: string;
  telefon: string;
  produkt: string;
  rodzajUrzadzenia: string;
  model: string;
  wiadomosc: string;
  opisUsterki: string;
  zgodaRODO: boolean;
  website: string; // Honeypot trap
}

interface FormErrors {
  imieNazwisko?: string;
  email?: string;
  produkt?: string;
  rodzajUrzadzenia?: string;
  model?: string;
  wiadomosc?: string;
  opisUsterki?: string;
  zgodaRODO?: string;
}

const SERVICE_EQUIPMENT_TYPES = [
  'Geometria kół 3D / CCD',
  'Wyważarka do kół',
  'Montażownica / demontażownica',
  'Linia diagnostyczna',
  'Serwis klimatyzacji',
  'Inne urządzenia warsztatowe',
] as const;

export const ContactForm: React.FC<ContactFormProps> = ({
  initialType = 'ogolne',
  initialProduct = '',
  customTitle,
  customSubtitle,
  className = '',
  onSuccess,
}) => {
  const [searchParams] = useSearchParams();
  const formUid = useId();

  // 1. Inicjalizacja typu z URL lub propa
  const parseTypeFromUrl = (): ContactPurpose => {
    const param = searchParams.get('typ') || searchParams.get('cel');
    if (param === 'serwis' || param === 'oferta' || param === 'ogolne') {
      return param;
    }
    return initialType;
  };

  const [purpose, setPurpose] = useState<ContactPurpose>(parseTypeFromUrl);

  // Funkcja budująca wstępne dane oferty z URL (nazwa, wersja, wybrane opcje bez cen)
  const buildInitialOfferState = (
    prodParam: string,
    wersjaParam: string | null,
    opcjeParam: string | null
  ): { productName: string; message: string } => {
    if (!prodParam) return { productName: '', message: '' };
    const foundProduct = PRODUCTS_DATA.find(
      (p) => p.slug === prodParam || p.name.toLowerCase() === prodParam.toLowerCase()
    );

    if (!foundProduct) {
      return { productName: prodParam, message: '' };
    }

    const parsed = parseProductModel(foundProduct);
    const selectedVariant = wersjaParam
      ? parsed.variants.find((v) => v.id === wersjaParam)
      : parsed.variants[0];

    const optIdList = opcjeParam ? opcjeParam.split(',').filter(Boolean) : [];
    const selectedOptions = parsed.options.filter((o) => optIdList.includes(o.id));

    let msg = `Dzień dobry,\n\nProszę o przygotowanie oferty na:\n- Urządzenie: ${foundProduct.name}\n`;
    if (selectedVariant && parsed.variants.length > 1) {
      msg += `- Wersja: ${selectedVariant.label}\n`;
    }
    if (selectedOptions.length > 0) {
      msg += `- Wybrane wyposażenie dodatkowe:\n`;
      selectedOptions.forEach((opt) => {
        const catInfo = opt.catalogNo ? ` (nr kat. ${opt.catalogNo})` : '';
        msg += `  * ${opt.name}${catInfo}\n`;
      });
    }

    return {
      productName: foundProduct.name,
      message: msg,
    };
  };

  // Wstępne wartości z URL (&produkt=..., &temat=..., &model=..., &wersja=..., &opcje=...)
  const initialProdParam = searchParams.get('produkt') || initialProduct || '';
  const initialWersjaParam = searchParams.get('wersja');
  const initialOpcjeParam = searchParams.get('opcje');
  const initialOffer = buildInitialOfferState(initialProdParam, initialWersjaParam, initialOpcjeParam);
  const initialModelParam = searchParams.get('model') || '';

  const [formData, setFormData] = useState<FormState>({
    imieNazwisko: '',
    firma: '',
    email: '',
    telefon: '',
    produkt: initialOffer.productName || initialProdParam,
    rodzajUrzadzenia: SERVICE_EQUIPMENT_TYPES[0],
    model: initialModelParam,
    wiadomosc: initialOffer.message,
    opisUsterki: '',
    zgodaRODO: false,
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

  // Synchronizacja parametrów URL
  useEffect(() => {
    const urlType = searchParams.get('typ') || searchParams.get('cel');
    if (urlType === 'serwis' || urlType === 'oferta' || urlType === 'ogolne') {
      setPurpose(urlType);
    }
    const prod = searchParams.get('produkt');
    const wersja = searchParams.get('wersja');
    const opcje = searchParams.get('opcje');

    if (prod) {
      const offer = buildInitialOfferState(prod, wersja, opcje);
      setFormData((prev) => ({
        ...prev,
        produkt: offer.productName || prod,
        wiadomosc: prev.wiadomosc || offer.message,
      }));
    }
    const mdl = searchParams.get('model');
    if (mdl && !formData.model) {
      setFormData((prev) => ({ ...prev, model: mdl }));
    }
  }, [searchParams]);

  // Lista podpowiedzi produktów do datalist
  const productSuggestions = useMemo(() => {
    return Array.from(new Set(PRODUCTS_DATA.map((p) => p.name))).slice(0, 30);
  }, []);

  // Przełączanie celu zapytania z zachowaniem wspólnych pól bez przewijania strony
  const handlePurposeChange = (newPurpose: ContactPurpose) => {
    setPurpose(newPurpose);
    setErrors({});
    setServerErrorMessage('');

    // Aktualizujemy query param w URL za pomocą replaceState, aby NIE przewijać strony do góry
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('typ', newPurpose);
      window.history.replaceState(null, '', url.pathname + url.search);
    } catch {
      // fallback
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Kasowanie błędu danego pola przy wpisywaniu
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Walidacja formularza przed wysyłką
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.imieNazwisko.trim()) {
      newErrors.imieNazwisko = 'Podaj imię i nazwisko.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Podaj adres e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Podaj poprawny adres e-mail (np. nazwa@domena.pl).';
    }

    if (!formData.zgodaRODO) {
      newErrors.zgodaRODO = 'Zgoda na przetwarzanie danych osobowych jest wymagana.';
    }

    if (purpose === 'serwis') {
      if (!formData.rodzajUrzadzenia) {
        newErrors.rodzajUrzadzenia = 'Wybierz rodzaj urządzenia.';
      }
      if (!formData.model.trim()) {
        newErrors.model = 'Podaj model urządzenia (np. Beissbarth ML 1800).';
      }
      if (!formData.opisUsterki.trim()) {
        newErrors.opisUsterki = 'Opisz usterkę lub zakres wymaganej usługi.';
      }
    } else {
      // ogolne lub oferta
      if (!formData.wiadomosc.trim()) {
        newErrors.wiadomosc = 'Wpisz treść wiadomości.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot trap (ochrona botów)
    if (formData.website) {
      setStatus('success');
      return;
    }

    // 2. Walidacja klienta
    if (!validate()) {
      setStatus('error');
      setServerErrorMessage('Wypełnij poprawnie wszystkie wymagane pola formularza.');
      return;
    }

    setStatus('submitting');
    setServerErrorMessage('');

    const payload = {
      cel: purpose,
      imieNazwisko: formData.imieNazwisko.trim(),
      firma: formData.firma.trim(),
      email: formData.email.trim(),
      telefon: formData.telefon.trim(),
      produkt: formData.produkt.trim(),
      rodzajUrzadzenia: formData.rodzajUrzadzenia,
      model: formData.model.trim(),
      wiadomosc: purpose === 'serwis' ? formData.opisUsterki.trim() : formData.wiadomosc.trim(),
      opisUsterki: formData.opisUsterki.trim(),
      zgodaRODO: formData.zgodaRODO,
      website: formData.website,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setStatus('success');
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        setServerErrorMessage(
          data?.error || 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub zadzwoń.'
        );
      }
    } catch {
      setStatus('error');
      setServerErrorMessage(
        'Nie udało się połączyć z serwerem. Twoje dane zostały zachowane – spróbuj ponownie lub zadzwoń.'
      );
    }
  };

  const handleResetForm = () => {
    setFormData({
      imieNazwisko: '',
      firma: '',
      email: '',
      telefon: '',
      produkt: '',
      rodzajUrzadzenia: SERVICE_EQUIPMENT_TYPES[0],
      model: '',
      wiadomosc: '',
      opisUsterki: '',
      zgodaRODO: false,
      website: '',
    });
    setErrors({});
    setStatus('idle');
    setServerErrorMessage('');
  };

  // Konfiguracja nagłówków i numerów telefonów per cel
  const purposeConfig = {
    ogolne: {
      title: customTitle || 'Napisz do nas',
      subtitle: customSubtitle || 'Odpowiemy na wskazany adres e-mail lub numer telefonu.',
      phoneLabel: 'Wolisz porozmawiać? Centrala:',
      phone: COMPANY_DATA.phones.mainFax,
      icon: Mail,
      badge: 'Pytanie ogólne',
    },
    oferta: {
      title: customTitle || 'Zapytaj o ofertę',
      subtitle: customSubtitle || 'Przygotujemy niezobowiązującą wycenę i dobierzemy aparaturę do Twojego warsztatu.',
      phoneLabel: 'Szybka wycena? Dział handlowy:',
      phone: COMPANY_DATA.phones.salesInfo,
      icon: Tag,
      badge: 'Zapytanie o ofertę',
    },
    serwis: {
      title: customTitle || 'Zgłoszenie serwisowe',
      subtitle: customSubtitle || 'Zgłoś awarię, potrzebę kalibracji lub przeglądu okresowego urządzeń.',
      phoneLabel: 'Pilna awaria? Zadzwoń:',
      phone: COMPANY_DATA.phones.techInfo,
      icon: Wrench,
      badge: 'Serwis Beissbarth',
    },
  }[purpose];

  return (
    <div className={`bg-white border border-[#D9DDE1] rounded-[16px] p-6 sm:p-9 shadow-sm overflow-hidden ${className}`}>
      {/* 1. SELEKTOR CELU (Segmented Control Desktop / Karta Mobile) */}
      <fieldset className="mb-6 border-none p-0 m-0">
        <legend className="sr-only">Cel kontaktu / rodzaj sprawy</legend>

        <div
          role="radiogroup"
          aria-label="Wybór celu zapytania"
          className="grid grid-cols-1 md:grid-cols-3 gap-1.5 p-1.5 bg-[#F1F3F5] rounded-[11px] border border-[#E2E6EA]"
        >
          {(
            [
              { id: 'ogolne', label: 'Pytanie ogólne', icon: Mail },
              { id: 'oferta', label: 'Zapytanie o ofertę', icon: Tag },
              { id: 'serwis', label: 'Zgłoszenie serwisowe', icon: Wrench },
            ] as const
          ).map((item) => {
            const isSelected = purpose === item.id;
            const Icon = item.icon;
            return (
              <label
                key={item.id}
                htmlFor={`${formUid}-purpose-${item.id}`}
                className={`relative flex items-center justify-center gap-2 h-11 px-3 rounded-[8px] cursor-pointer text-[13px] sm:text-[14px] font-semibold transition-all select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-primary has-[:focus-visible]:ring-offset-1 ${
                  isSelected
                    ? 'bg-white text-foreground shadow-xs border border-black/5 ring-1 ring-black/5'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-white/60'
                }`}
              >
                <input
                  type="radio"
                  id={`${formUid}-purpose-${item.id}`}
                  name="purpose-selector"
                  value={item.id}
                  checked={isSelected}
                  onChange={() => handlePurposeChange(item.id)}
                  className="sr-only"
                />
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isSelected ? 'text-accent-text' : 'text-foreground-secondary'
                  }`}
                />
                <span className="whitespace-nowrap tracking-tight">{item.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 2. EKRAN SUKCESU PO WYSŁANIU */}
      {status === 'success' ? (
        <div
          role="region"
          aria-live="polite"
          className="py-6 sm:py-8 space-y-6 text-center animate-fade-in"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              Dziękujemy, wiadomość została wysłana!
            </h3>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              Zgłoszenie trafiło bezpośrednio do naszych inżynierów. Odpowiemy na wskazany adres e-mail lub numer telefonu.
            </p>
          </div>

          {/* Podsumowanie wysłanych danych */}
          <div className="bg-[#F7F7F5] border border-[#D9DDE1] rounded-[12px] p-5 max-w-lg mx-auto text-left space-y-2.5 text-[14px]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-accent-text font-semibold">
              Podsumowanie zgłoszenia
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-foreground-secondary">Cel kontaktu:</span>
              <span className="font-semibold text-foreground">{purposeConfig.badge}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-foreground-secondary">Nadawca:</span>
              <span className="font-semibold text-foreground">{formData.imieNazwisko}</span>
            </div>
            {formData.firma && (
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-foreground-secondary">Firma:</span>
                <span className="font-semibold text-foreground">{formData.firma}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-foreground-secondary">E-mail:</span>
              <span className="font-semibold text-foreground">{formData.email}</span>
            </div>
            {purpose === 'oferta' && formData.produkt && (
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-foreground-secondary">Urządzenie:</span>
                <span className="font-semibold text-foreground">{formData.produkt}</span>
              </div>
            )}
            {purpose === 'serwis' && (
              <>
                <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-foreground-secondary">Aparatura:</span>
                  <span className="font-semibold text-foreground">{formData.rodzajUrzadzenia}</span>
                </div>
                {formData.model && (
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                    <span className="text-foreground-secondary">Model:</span>
                    <span className="font-semibold text-foreground">{formData.model}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Telefon bezpośredni po wysłaniu */}
          <div className="pt-2">
            <p className="text-[13px] text-foreground-secondary mb-1">
              Sprawa pilna lub potrzebujesz natychmiastowej konsultacji?
            </p>
            <a
              href={`tel:${purposeConfig.phone.raw}`}
              className="inline-flex items-center gap-2 text-[16px] font-bold text-foreground hover:text-accent-text transition-colors"
            >
              <Phone className="w-4 h-4 text-accent-text" />
              <span>{formatPhoneWithNbsp(purposeConfig.phone.display)}</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleResetForm}
              className="h-10 px-5 rounded-[8px] border border-[#D9DDE1] text-foreground hover:bg-[#F7F7F5] font-semibold text-[14px] transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-foreground-secondary" />
              <span>Wyślij kolejną wiadomość</span>
            </button>
          </div>
        </div>
      ) : (
        /* 3. WŁAŚCIWY FORMULARZ ZGŁOSZENIOWY */
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Nagłówek formularza (zależny od celu) */}
          <div className="space-y-1 pb-4 border-b border-[#E4E7EB]">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {purposeConfig.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-foreground-secondary">
              {purposeConfig.subtitle}
            </p>
          </div>

          {/* Alert ogólnego błędu */}
          {status === 'error' && serverErrorMessage && (
            <div
              role="alert"
              className="p-4 bg-red-50 border border-red-200 rounded-[10px] text-red-800 text-[14px] flex items-start gap-3 animate-fade-in"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Wystąpił błąd podczas wysyłania:</strong>
                <span>{serverErrorMessage}</span>
              </div>
            </div>
          )}

          {/* Honeypot trap (ukryty przed ludźmi) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={`${formUid}-website`}>Nie wypełniaj tego pola</label>
            <input
              type="text"
              id={`${formUid}-website`}
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Datalist z nazwami produktów */}
          <datalist id={`${formUid}-products-list`}>
            {productSuggestions.map((name, i) => (
              <option key={i} value={name} />
            ))}
          </datalist>

          {/* SIATKA PÓL FORMULARZA */}
          <div className="space-y-5">
            {/* Wiersz 1: Imię i nazwisko + Firma / Warsztat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor={`${formUid}-imieNazwisko`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Imię i nazwisko <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id={`${formUid}-imieNazwisko`}
                  name="imieNazwisko"
                  value={formData.imieNazwisko}
                  onChange={handleInputChange}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.imieNazwisko}
                  aria-describedby={errors.imieNazwisko ? `${formUid}-imie-err` : undefined}
                  placeholder="np. Jan Kowalski"
                  className={`w-full h-[52px] px-4 rounded-[8px] bg-white border text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary ${
                    errors.imieNazwisko ? 'border-red-500 bg-red-50/20' : 'border-[#D9DDE1]'
                  }`}
                />
                {errors.imieNazwisko && (
                  <p id={`${formUid}-imie-err`} className="text-[12px] text-red-600 font-medium mt-1">
                    {errors.imieNazwisko}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formUid}-firma`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Firma / Warsztat <span className="text-foreground-secondary font-normal text-[12px]">(opcjonalnie)</span>
                </label>
                <input
                  type="text"
                  id={`${formUid}-firma`}
                  name="firma"
                  value={formData.firma}
                  onChange={handleInputChange}
                  autoComplete="organization"
                  placeholder="np. Auto Serwis Kowalski s.c."
                  className="w-full h-[52px] px-4 rounded-[8px] bg-white border border-[#D9DDE1] text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                />
              </div>
            </div>

            {/* Wiersz 2: Adres e-mail + Telefon kontaktowy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor={`${formUid}-email`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Adres e-mail <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id={`${formUid}-email`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  inputMode="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${formUid}-email-err` : undefined}
                  placeholder="np. jan@warsztat-kowalski.pl"
                  className={`w-full h-[52px] px-4 rounded-[8px] bg-white border text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary ${
                    errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#D9DDE1]'
                  }`}
                />
                {errors.email && (
                  <p id={`${formUid}-email-err`} className="text-[12px] text-red-600 font-medium mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formUid}-telefon`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Numer telefonu <span className="text-foreground-secondary font-normal text-[12px]">(opcjonalnie)</span>
                </label>
                <input
                  type="tel"
                  id={`${formUid}-telefon`}
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="np. 500 123 456"
                  className="w-full h-[52px] px-4 rounded-[8px] bg-white border border-[#D9DDE1] text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                />
              </div>
            </div>

            {/* SEKCJA ZMIENNA PER CEL (BEZ SKOKU LAYOUTU) */}
            {/* A. Gdy cel === 'oferta': Pole Urządzenie / produkt */}
            {purpose === 'oferta' && (
              <div className="transition-opacity duration-150 motion-reduce:transition-none animate-fade-in">
                <label
                  htmlFor={`${formUid}-produkt`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Urządzenie / produkt <span className="text-foreground-secondary font-normal text-[12px]">(z katalogu lub własny wpis)</span>
                </label>
                <input
                  type="text"
                  id={`${formUid}-produkt`}
                  name="produkt"
                  list={`${formUid}-products-list`}
                  value={formData.produkt}
                  onChange={handleInputChange}
                  placeholder="Wpisz lub wybierz z listy (np. Beissbarth Q.Lign, Beissbarth G.30...)"
                  className="w-full h-[52px] px-4 rounded-[8px] bg-white border border-[#D9DDE1] text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                />
                <span className="text-[12px] text-foreground-secondary mt-1 block">
                  Możesz wpisać dowolną nazwę maszyny, kod OEM (np. VAS) lub wybrać sugerowany model.
                </span>
              </div>
            )}

            {/* B. Gdy cel === 'serwis': Rodzaj urządzenia + Model */}
            {purpose === 'serwis' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 transition-opacity duration-150 motion-reduce:transition-none animate-fade-in">
                <div>
                  <label
                    htmlFor={`${formUid}-rodzajUrzadzenia`}
                    className="block text-[14px] font-semibold text-foreground mb-1.5"
                  >
                    Rodzaj urządzenia <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formUid}-rodzajUrzadzenia`}
                    name="rodzajUrzadzenia"
                    value={formData.rodzajUrzadzenia}
                    onChange={handleInputChange}
                    aria-required="true"
                    className="w-full h-[52px] px-3.5 rounded-[8px] bg-white border border-[#D9DDE1] text-[16px] text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary cursor-pointer"
                  >
                    {SERVICE_EQUIPMENT_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${formUid}-model`}
                    className="block text-[14px] font-semibold text-foreground mb-1.5"
                  >
                    Model urządzenia <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id={`${formUid}-model`}
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={!!errors.model}
                    aria-describedby={errors.model ? `${formUid}-model-err` : undefined}
                    placeholder="np. Beissbarth ML 1800, MS 63..."
                    className={`w-full h-[52px] px-4 rounded-[8px] bg-white border text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary ${
                      errors.model ? 'border-red-500 bg-red-50/20' : 'border-[#D9DDE1]'
                    }`}
                  />
                  {errors.model && (
                    <p id={`${formUid}-model-err`} className="text-[12px] text-red-600 font-medium mt-1">
                      {errors.model}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Pole tekstowe wieloliniowe: Opis usterki dla serwisu LUB Wiadomość dla ogólne/oferta */}
            {purpose === 'serwis' ? (
              <div>
                <label
                  htmlFor={`${formUid}-opisUsterki`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Opis usterki lub wymaganej usługi <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                </label>
                <textarea
                  id={`${formUid}-opisUsterki`}
                  name="opisUsterki"
                  rows={4}
                  value={formData.opisUsterki}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.opisUsterki}
                  aria-describedby={errors.opisUsterki ? `${formUid}-usterka-err` : undefined}
                  placeholder="Opisz występujące objawy awarii, kody błędów na ekranie lub pożądany termin przeglądu / legalizacji..."
                  className={`w-full p-4 rounded-[8px] bg-white border text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary min-h-[130px] resize-y ${
                    errors.opisUsterki ? 'border-red-500 bg-red-50/20' : 'border-[#D9DDE1]'
                  }`}
                />
                {errors.opisUsterki && (
                  <p id={`${formUid}-usterka-err`} className="text-[12px] text-red-600 font-medium mt-1">
                    {errors.opisUsterki}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label
                  htmlFor={`${formUid}-wiadomosc`}
                  className="block text-[14px] font-semibold text-foreground mb-1.5"
                >
                  Wiadomość <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                </label>
                <textarea
                  id={`${formUid}-wiadomosc`}
                  name="wiadomosc"
                  rows={4}
                  value={formData.wiadomosc}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.wiadomosc}
                  aria-describedby={errors.wiadomosc ? `${formUid}-wiadomosc-err` : undefined}
                  placeholder={
                    purpose === 'oferta'
                      ? 'Napisz, czego potrzebujesz (np. wycena maszyny, szkolenie, transport, leasing)...'
                      : 'W czym możemy Ci pomóc? Opisz swoje pytanie...'
                  }
                  className={`w-full p-4 rounded-[8px] bg-white border text-[16px] text-foreground placeholder:text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary min-h-[130px] resize-y ${
                    errors.wiadomosc ? 'border-red-500 bg-red-50/20' : 'border-[#D9DDE1]'
                  }`}
                />
                {errors.wiadomosc && (
                  <p id={`${formUid}-wiadomosc-err`} className="text-[12px] text-red-600 font-medium mt-1">
                    {errors.wiadomosc}
                  </p>
                )}
              </div>
            )}

            {/* Zgoda RODO */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="zgodaRODO"
                  checked={formData.zgodaRODO}
                  onChange={handleInputChange}
                  aria-required="true"
                  className="w-5 h-5 mt-0.5 rounded border-[#D9DDE1] accent-[#1F2328] text-foreground focus-visible:ring-2 focus-visible:ring-foreground shrink-0 cursor-pointer"
                />
                <span className="text-[13px] text-foreground-secondary leading-relaxed">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez Diagnostyka-Systems s.c. w celu odpowiedzi na przesłane zapytanie.{' '}
                  <span className="text-accent-text font-semibold" aria-hidden="true">*</span>
                </span>
              </label>
              {errors.zgodaRODO && (
                <p className="text-[12px] text-red-600 font-medium mt-1 ml-8">
                  {errors.zgodaRODO}
                </p>
              )}
            </div>
          </div>

          {/* DÓŁ FORMULARZA: Przyciski akcji obok siebie (Wyrazisty CTA + Telefon bezpośredni) */}
          <div className="pt-5 border-t border-[#E4E7EB]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Główny, wyrazisty przycisk wysyłki (Brand Amber CTA) */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-12 px-4 rounded-[10px] bg-accent text-foreground hover:bg-accent-hover active:bg-accent-active font-bold text-[15px] sm:text-[16px] shadow-sm transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-foreground shrink-0" />
                    <span>Wysyłanie...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {purpose === 'serwis'
                        ? 'Wyślij zgłoszenie'
                        : purpose === 'oferta'
                        ? 'Wyślij zapytanie'
                        : 'Wyślij wiadomość'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-foreground stroke-[2.5] shrink-0" />
                  </>
                )}
              </button>

              {/* Drugi przycisk: bezpośredni telefon dopasowany do wybranego celu */}
              <a
                href={`tel:${purposeConfig.phone.raw}`}
                className="w-full h-12 px-4 rounded-[10px] border border-[#D9DDE1] bg-white text-foreground hover:bg-[#F7F7F5] hover:border-[#B8BEC5] font-semibold text-[14px] sm:text-[15px] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                title={`${purposeConfig.phoneLabel} ${purposeConfig.phone.display}`}
              >
                <Phone className="w-4 h-4 text-accent-text shrink-0" />
                <span className="text-foreground-secondary font-medium">Zadzwoń:</span>
                <span className="font-bold text-foreground">
                  {formatPhoneWithNbsp(purposeConfig.phone.display)}
                </span>
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
