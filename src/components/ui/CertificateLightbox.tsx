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
    imageSrc: '/images/cert-beissbarth.webp',
    title: 'Certyfikat Autoryzacji Beissbarth GmbH',
    issuer: 'Beissbarth GmbH, Monachium',
    year: 'Od 2005 r.',
    description: 'Oficjalna autoryzacja fabryczna w zakresie dystrybucji, kalibracji i bezpośredniej opieki serwisowej urządzeń Beissbarth.',
  },
  {
    id: 'cert-klima',
    imageKey: 'cert-its-skp',
    imageSrc: '/images/cert-its-skp.webp',
    title: 'Świadectwo Kwalifikacyjne Kfz-Klimaanlagen',
    issuer: 'ZDK / Monachium (Grupa SPX)',
    year: '2002 r.',
    description: 'Imienne świadectwo kwalifikacji technicznych w zakresie obsługi i serwisu stacji klimatyzacji wg wytycznych ZDK i normy VBG20.',
  },
  {
    id: 'cert-valeo',
    imageKey: 'cert-valeo',
    imageSrc: '/images/cert-valeo.webp',
    title: 'Certyfikat Serwisowy Valeo ClimFill',
    issuer: 'Valeo Service Eastern Europe',
    year: 'Od 2007 r.',
    description: 'Autoryzacja do przeprowadzania napraw gwarancyjnych i pogwarancyjnych stacji klimatyzacji Valeo ClimFill.',
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
            className="group relative flex flex-col text-left bg-white border border-surface-border rounded-[12px] p-4 transition-[border-color,box-shadow] duration-200 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label={`${cert.title} – powiększ skan dokumentu`}
          >
            {/* Ramka z miniaturą A4 (3:4) */}
            <div className="relative aspect-[3/4] w-full rounded-[8px] overflow-hidden bg-background-subtle border border-surface-border/70 flex items-center justify-center p-3 select-none">
              {/* Prawdziwy skan dokumentu certyfikatu */}
              <img
                src={cert.imageSrc}
                alt={cert.title}
                className="w-full h-full object-contain shadow-xs border border-black/[0.08] rounded-[4px] bg-white group-hover:scale-[1.015] transition-transform duration-200"
                decoding="async"
              />

              {/* Ikona powiększenia przy hoverze */}
              <div className="absolute inset-0 bg-graphite-900/0 group-hover:bg-graphite-900/15 transition-colors flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/95 border border-black/10 shadow-md flex items-center justify-center text-graphite-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
            className="relative max-w-[560px] w-full bg-white rounded-[16px] shadow-2xl overflow-hidden border border-white/20 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Narożniki-nawiasy w motywie marki */}
            <CornerBrackets size={16} color="#EE9D16" />

            {/* Pasek nagłówka */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-surface-border">
              <div>
                <span className="text-[13px] font-semibold text-accent-text block">
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

            {/* Ciało certyfikatu (skan dokumentu z opisem) */}
            <div className="p-4 sm:p-6 bg-background-subtle flex flex-col items-center justify-center max-h-[70vh] overflow-y-auto">
              <div className="relative max-w-[420px] w-full bg-white border border-surface-border rounded-[8px] shadow-lg overflow-hidden flex items-center justify-center p-2">
                <img
                  src={currentCert.imageSrc}
                  alt={currentCert.title}
                  className="max-h-[55vh] w-auto object-contain mx-auto rounded"
                />
              </div>
              <p className="mt-3 text-[14px] text-foreground-secondary text-center max-w-[480px]">
                {currentCert.description}
              </p>
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
