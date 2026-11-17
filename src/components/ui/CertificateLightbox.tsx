import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CornerBrackets } from './MeasurementMarks';

export interface CertificateItem {
  id: string;
  imageKey: string;
  imageSrc: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: 'cert-beissbarth',
    imageKey: 'cert-beissbarth',
    imageSrc: '/images/certyfikat-autoryzacji-beissbarth.jpg',
    title: 'Certyfikat Autoryzacji Beissbarth GmbH',
    issuer: 'Beissbarth GmbH, Monachium',
    year: 'Od 2005 r.',
    description: 'Oficjalna autoryzacja fabryczna w zakresie dystrybucji, kalibracji i bezpośredniej opieki serwisowej urządzeń Beissbarth.',
  },
  {
    id: 'cert-its-skp',
    imageKey: 'cert-its-skp',
    imageSrc: '/images/certyfikat-its-skp.jpg',
    title: 'Certyfikat Zgodności ITS dla SKP',
    issuer: 'Instytut Transportu Samochodowego w Warszawie',
    year: 'Od 2007 r.',
    description: 'Urzędowy atest dopuszczający systemy geometrii kół i linie diagnostyczne do przeprowadzania badań technicznych na Stacjach Kontroli Pojazdów.',
  },
  {
    id: 'cert-valeo',
    imageKey: 'cert-valeo',
    imageSrc: '/images/certyfikat-autoryzacji-valeo.jpg',
    title: 'Certyfikat Serwisowy Valeo & SPX',
    issuer: 'Valeo Service / Grupa SPX',
    year: 'Od 2007 r.',
    description: 'Autoryzowany serwis gwarancyjny i pogwarancyjny stacji klimatyzacji Valeo ClimFill, Robinair i OTC.',
  },
];

export const CertificateLightbox: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOpen = activeIndex !== null;
  const currentCert = isOpen ? CERTIFICATES_LIST[activeIndex] : null;

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + CERTIFICATES_LIST.length) % CERTIFICATES_LIST.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % CERTIFICATES_LIST.length
    );
  }, []);

  // Blokada scrolla i obsługa klawiatury (Esc, strzałki)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus trap: przenieś focus na przycisk zamknięcia po otwarciu
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Obsługa gestów dotykowych (swipe left/right)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    // Próg przeciągnięcia 50 px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div>
      {/* Siatka 3 miniatur o proporcji 3:4 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CERTIFICATES_LIST.map((cert, index) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative flex flex-col text-left bg-white border border-surface-border rounded-[12px] p-4 transition-all duration-200 hover:border-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label={`Powiększ certyfikat: ${cert.title}`}
          >
            {/* Ramka z miniaturą A4 (3:4) */}
            <div className="relative aspect-[3/4] w-full rounded-[8px] overflow-hidden bg-background-subtle border border-surface-border flex items-center justify-center p-3 select-none">
              <CornerBrackets size={12} color="#EE9D16" className="opacity-75" />

              {/* Zdjęcie z fallbackiem technicznym */}
              <div className="w-full h-full flex flex-col items-center justify-between p-4 bg-white border border-dashed border-gray-300 rounded-[6px] text-center">
                <span className="text-[12px] font-semibold text-accent-text uppercase tracking-wider">
                  Atest oficjalny
                </span>
                <div className="my-auto space-y-1">
                  <div className="text-[15px] font-semibold text-foreground leading-tight">
                    {cert.title}
                  </div>
                  <div className="text-[13px] text-foreground-secondary">
                    {cert.issuer}
                  </div>
                </div>
                <div className="text-[12px] font-medium text-foreground-secondary">
                  {cert.year}
                </div>
              </div>

              {/* Ikona powiększenia przy hoverze */}
              <div className="absolute inset-0 bg-graphite-900/0 group-hover:bg-graphite-900/30 transition-colors flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-graphite-900 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-200">
                  <ZoomIn className="w-5 h-5 text-accent-text" />
                </div>
              </div>
            </div>

            {/* Podpis pod miniaturą */}
            <div className="mt-3">
              <span className="text-[15px] font-semibold text-foreground block group-hover:text-accent-text transition-colors">
                {cert.title}
              </span>
              <span className="text-[14px] text-foreground-secondary block mt-0.5">
                {cert.issuer} · {cert.year}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Dostępny Lightbox Modal */}
      {isOpen && currentCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd certyfikatu: ${currentCert.title}`}
          className="fixed inset-0 z-50 bg-graphite-900/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Kontener modalny z zatrzymaniem propagacji kliku */}
          <div
            className="relative max-w-[560px] w-full bg-white rounded-[16px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Narożniki-nawiasy w motywie marki */}
            <CornerBrackets size={16} color="#EE9D16" />

            {/* Pasek nagłówka */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-surface-border">
              <div>
                <span className="text-[13px] font-semibold text-accent-text uppercase tracking-wider block">
                  Dokumentacja fabryczna ({activeIndex + 1} z {CERTIFICATES_LIST.length})
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-foreground leading-snug">
                  {currentCert.title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors shrink-0"
                aria-label="Zamknij podgląd certyfikatu (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ciało certyfikatu (A4 proporcje z podziałką techniczną) */}
            <div className="p-6 bg-background-subtle flex flex-col items-center">
              <div className="w-full max-w-[360px] aspect-[1/1.41] bg-white border border-surface-border rounded-[8px] shadow-sm p-6 flex flex-col justify-between text-center">
                <div className="border-b border-surface-border pb-3">
                  <span className="text-[12px] font-semibold text-accent-text uppercase tracking-wider">
                    Certyfikat Autoryzacji
                  </span>
                  <div className="text-[16px] font-bold text-foreground mt-1">
                    DIAGNOSTYKA-SYSTEMS S.C.
                  </div>
                  <div className="text-[13px] text-foreground-secondary">
                    Lisi Ogon k. Bydgoszczy
                  </div>
                </div>

                <div className="py-6 space-y-3">
                  <div className="text-[18px] font-semibold text-foreground">
                    {currentCert.title}
                  </div>
                  <p className="text-[14px] text-foreground-secondary leading-relaxed">
                    {currentCert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-border text-[13px] text-foreground-secondary flex justify-between items-center">
                  <span>Wydano: {currentCert.year}</span>
                  <span className="font-medium text-foreground">{currentCert.issuer}</span>
                </div>
              </div>
            </div>

            {/* Stopka z nawigacją poprzedni / następny */}
            <div className="flex items-center justify-between p-4 bg-white border-t border-surface-border">
              <button
                type="button"
                onClick={handlePrev}
                className="h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground hover:text-accent-text hover:bg-background-subtle rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label="Poprzedni certyfikat (Strzałka w lewo)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Poprzedni</span>
              </button>

              <span className="text-[14px] text-foreground-secondary">
                Użyj klawiszy ← / → lub przeciągnij
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground hover:text-accent-text hover:bg-background-subtle rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label="Następny certyfikat (Strzałka w prawo)"
              >
                <span>Następny</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
