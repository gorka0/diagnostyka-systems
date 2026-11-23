import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CornerBrackets } from './MeasurementMarks';
import { SiteImage } from '@/components/common/SiteImage';

export interface RealizationLightboxItem {
  photo?: string;
  title: string;
  caption?: string;
  productUrl?: string;
  isCatalogProduct?: boolean;
}

export interface RealizationLightboxProps {
  items: RealizationLightboxItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
}

export const RealizationLightbox: React.FC<RealizationLightboxProps> = ({
  items,
  initialIndex = 0,
  isOpen,
  onClose,
  clientName,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const total = items.length;
  const currentItem = items[activeIndex] || items[0];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Obsługa klawiatury i blokada scrolla
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
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
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Obsługa gestów dotykowych (swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || !currentItem) return null;

  const displayTitle = currentItem.title || currentItem.caption || 'Zainstalowane wyposażenie';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Podgląd: ${displayTitle}`}
      className="fixed inset-0 z-50 bg-graphite-900/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative max-w-[620px] w-full bg-white rounded-[16px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <CornerBrackets size={16} color="#EE9D16" />

        {/* Pasek nagłówka */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-surface-border">
          <div className="pr-4">
            <span className="text-[13px] font-semibold text-accent-text uppercase tracking-wider block">
              {clientName ? `Wyposażenie: ${clientName}` : 'Wyposażenie obiektu'}
              {total > 1 ? ` (${activeIndex + 1} z ${total})` : ''}
            </span>
            <h3 className="text-[17px] sm:text-[19px] font-semibold text-foreground leading-snug mt-0.5">
              {displayTitle}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors shrink-0"
            aria-label="Zamknij podgląd (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Obszar zdjęcia */}
        <div className="p-4 sm:p-6 bg-background-subtle flex flex-col items-center justify-center max-h-[70vh] overflow-y-auto">
          <div className="relative max-w-[480px] w-full aspect-[4/3] bg-[#F7F7F5] border border-surface-border rounded-[10px] shadow-sm overflow-hidden flex items-center justify-center p-3">
            {currentItem.photo ? (
              <SiteImage
                name={currentItem.photo}
                fit="contain"
                plain={true}
                alt={displayTitle}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-sm text-foreground-secondary text-center p-4">
                Brak zdjęcia podglądowego
              </div>
            )}
          </div>

          {/* Podpis lub informacja o modelu */}
          {currentItem.caption && currentItem.caption !== currentItem.title && (
            <p className="mt-3 text-[14px] text-foreground-secondary text-center max-w-[480px]">
              {currentItem.caption}
            </p>
          )}

          {/* Link do karty produktu w katalogu jeśli to produkt katalogowy */}
          {currentItem.productUrl && (
            <div className="mt-4">
              <Link
                to={currentItem.productUrl}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-accent-text hover:bg-accent rounded-md transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Przejdź do karty produktu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Pasek nawigacji dolnej (gdy > 1 pozycja) */}
        {total > 1 && (
          <div className="flex items-center justify-between p-4 bg-white border-t border-surface-border">
            <button
              type="button"
              onClick={handlePrev}
              className="h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground hover:text-accent-text hover:bg-background-subtle rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              aria-label="Poprzednia pozycja (Strzałka w lewo)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Poprzednia</span>
            </button>

            <span className="text-[13px] text-foreground-secondary hidden sm:inline">
              Nawigacja: klawisze ← / → lub przeciągnięcie
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground hover:text-accent-text hover:bg-background-subtle rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              aria-label="Następna pozycja (Strzałka w prawo)"
            >
              <span>Następna</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
