import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { LABELS } from '@/config/labels';
import { Menu, X } from 'lucide-react';

/**
 * Trzystopniowa płynna interpolacja tła nagłówka na stronie głównej:
 * 1. p: 0.00 .. 0.50 (0 -> 150 px):   czarny grafit (#14171A) -> techniczny stalowy szary (#434A54)
 * 2. p: 0.50 .. 0.80 (150 -> 240 px): stalowy szary (#434A54) -> jasny srebrny szary (#DCE0E5)
 * 3. p: 0.80 .. 1.00 (240 -> 300 px): srebrny szary (#DCE0E5) -> czysta premium biel (#FFFFFF)
 */
function getHeaderBackground(p: number): string {
  if (p <= 0.5) {
    // 0.0 -> 0.5: (20, 23, 26, 0.82) -> (67, 74, 84, 0.92)
    const t = p / 0.5;
    const r = Math.round(20 + t * (67 - 20));
    const g = Math.round(23 + t * (74 - 23));
    const b = Math.round(26 + t * (84 - 26));
    const a = (0.82 + t * (0.92 - 0.82)).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (p <= 0.8) {
    // 0.5 -> 0.8: (67, 74, 84, 0.92) -> (220, 224, 229, 0.95)
    const t = (p - 0.5) / 0.3;
    const r = Math.round(67 + t * (220 - 67));
    const g = Math.round(74 + t * (224 - 74));
    const b = Math.round(84 + t * (229 - 84));
    const a = (0.92 + t * (0.95 - 0.92)).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    // 0.8 -> 1.0: (220, 224, 229, 0.95) -> (255, 255, 255, 0.97)
    const t = (p - 0.8) / 0.2;
    const r = Math.round(220 + t * (255 - 220));
    const g = Math.round(224 + t * (255 - 224));
    const b = Math.round(229 + t * (255 - 229));
    const a = (0.95 + t * (0.97 - 0.95)).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

/**
 * Płynna interpolacja dolnego obrysu (hairline)
 */
function getHeaderBorder(p: number): string {
  if (p <= 0.6) {
    const t = p / 0.6;
    const alpha = (0.14 - t * 0.08).toFixed(3);
    return `rgba(255, 255, 255, ${alpha})`;
  } else {
    const t = (p - 0.6) / 0.4;
    const alpha = (t * 0.08).toFixed(3);
    return `rgba(20, 23, 26, ${alpha})`;
  }
}

/**
 * Cień pojawiający się miękko w końcowej fazie przewijania
 */
function getHeaderShadow(p: number): string {
  if (p < 0.65) return 'none';
  const t = (p - 0.65) / 0.35;
  const a1 = (t * 0.05).toFixed(3);
  const a2 = (t * 0.06).toFixed(3);
  return `0 1px 3px 0 rgba(0, 0, 0, ${a1}), 0 4px 16px -2px rgba(20, 23, 26, ${a2})`;
}

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Wartość 0 (góra strony głównej) do 1 (przewinięte >= 300 px lub podstrona)
  const [scrollProgress, setScrollProgress] = useState(isHome ? 0 : 1);
  const lastProgressRef = useRef(isHome ? 0 : 1);

  const closeMenu = () => setMobileMenuOpen(false);

  // Płynne śledzenie pozycji przewinięcia na stronie głównej
  useEffect(() => {
    if (!isHome) {
      setScrollProgress(1);
      lastProgressRef.current = 1;
      return;
    }

    let ticking = false;

    const updateScroll = () => {
      const y = window.scrollY;
      // Zakres płynnego przejścia czarny -> szary -> biały: 0 do 300 px
      const p = Math.min(Math.max(y / 300, 0), 1);

      // Aktualizuj stan tylko przy wymiernej zmianie (>0.01) lub na krańcach (0 i 1)
      if (Math.abs(p - lastProgressRef.current) >= 0.015 || p === 0 || p === 1) {
        lastProgressRef.current = p;
        setScrollProgress(p);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Blokada scrolla i zamykanie klawiszem Escape przy otwartym menu mobilnym
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // Gdy menu mobilne jest otwarte, header natychmiast staje się biały
  const effectiveProgress = !isHome || mobileMenuOpen ? 1 : scrollProgress;

  // Punkt zwrotny kontrastu tekstu:
  // p < 0.65 -> tło jest ciemne lub ciemnoszare, tekst jest czysto biały (#FFFFFF) z pełnym kontrastem
  // p >= 0.65 -> tło staje się jasnoszare i białe, tekst przechodzi w ciemny grafit (#14171A)
  const isLightMode = effectiveProgress >= 0.65;

  // Płynne przenikanie logo:
  // p: 0.00 .. 0.55 -> mono-light 100%
  // p: 0.55 .. 0.72 -> cross-fade obu wersji (sygnet w tym samym miejscu, litery miękko przechodzą)
  // p: 0.72 .. 1.00 -> full 100%
  const monoLogoOpacity = Math.max(0, Math.min(1, (0.72 - effectiveProgress) / 0.17));
  const fullLogoOpacity = Math.max(0, Math.min(1, (effectiveProgress - 0.55) / 0.17));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-[background-color,border-color,box-shadow] duration-150 ease-out"
      style={{
        backgroundColor: getHeaderBackground(effectiveProgress),
        borderBottomColor: getHeaderBorder(effectiveProgress),
        boxShadow: getHeaderShadow(effectiveProgress),
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo z płynnym cross-fade bez skoku layoutu */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            onClick={closeMenu}
            title="Diagnostyka-Systems s.c. - Strona główna"
          >
            <div className="relative h-11 sm:h-12 w-[160px] flex items-center">
              <Logo
                variant="mono"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-11 sm:h-12 w-auto pointer-events-none transition-opacity duration-150"
                style={{ opacity: monoLogoOpacity }}
                alt="Diagnostyka-Systems s.c."
              />
              <Logo
                variant="full"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-11 sm:h-12 w-auto pointer-events-none transition-opacity duration-150"
                style={{ opacity: fullLogoOpacity }}
                alt="Diagnostyka-Systems s.c."
              />
            </div>
          </Link>

          {/* Nawigacja desktopowa */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Nawigacja główna"
          >
            {LABELS.nav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-item px-3.5 py-2 text-[15px] font-medium transition-colors duration-200 ${
                    !isLightMode
                      ? isActive
                        ? 'text-white font-semibold active'
                        : 'text-white/85 hover:text-white'
                      : isActive
                        ? 'text-foreground font-semibold active'
                        : 'text-foreground-secondary hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA: Zgłoszenie serwisowe -> Przekierowanie do /kontakt?typ=serwis */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button
              to="/kontakt?typ=serwis"
              variant="primary"
              size="md"
              className={!isLightMode ? 'border-white/20 shadow-sm' : ''}
            >
              {LABELS.cta.serviceTicket}
            </Button>
          </div>

          {/* Przycisk Menu Mobilnego */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-200 ${
                !isLightMode
                  ? 'text-white hover:bg-white/10 focus-visible:ring-accent-light'
                  : 'text-foreground hover:bg-background-subtle focus-visible:ring-foreground'
              }`}
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobilne (Pełny overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-foreground border-b border-surface-border animate-fade-in shadow-xl">
          <nav className="max-w-[1200px] mx-auto px-4 py-6 space-y-2">
            {LABELS.nav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-[8px] text-[17px] font-medium transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold bg-background-subtle border-l-4 border-accent'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background-subtle'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-surface-border">
              <Button
                to="/kontakt?typ=serwis"
                variant="primary"
                size="md"
                className="w-full justify-center h-12 text-[16px]"
                onClick={closeMenu}
              >
                {LABELS.cta.serviceTicket}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
