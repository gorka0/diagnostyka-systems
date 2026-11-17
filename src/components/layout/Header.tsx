import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { LABELS } from '@/config/labels';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  // Transparentny header TYLKO na stronie głównej przy scrollu <= 24 px
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;

  const closeMenu = () => setMobileMenuOpen(false);

  // Nasłuchiwanie przewijania > 24 px z throttlingiem przez requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Klasy tła i obramowania
  const headerContainerClass = isTransparent
    ? 'bg-transparent border-b border-white/10 text-white'
    : 'bg-white/90 backdrop-blur-md border-b border-surface-border text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.05)]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-250 ease-out ${headerContainerClass}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo: na ciemnym tle wariant mono-light, na jasnym wariant full */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            onClick={closeMenu}
            title="Diagnostyka-Systems s.c. - Strona główna"
          >
            <Logo
              variant={isTransparent ? 'mono' : 'full'}
              className="h-11 sm:h-12 w-auto transition-opacity duration-200"
              alt="Diagnostyka-Systems s.c."
            />
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
                  `nav-link-item px-3.5 py-2 text-[15px] font-medium transition-colors ${
                    isTransparent
                      ? isActive
                        ? 'text-white font-semibold active'
                        : 'text-white/80 hover:text-white'
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

          {/* CTA: Zgłoszenie serwisowe */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button
              to="/serwis/zgloszenie"
              variant="primary"
              size="md"
              className={isTransparent ? 'shadow-[0_2px_12px_rgba(245,165,36,0.3)]' : ''}
            >
              {LABELS.cta.serviceTicket}
            </Button>
          </div>

          {/* Przycisk Menu Mobilnego */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-background-subtle'
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
        <div className="lg:hidden bg-white text-foreground border-b border-surface-border animate-in slide-in-from-top-4 duration-200 shadow-xl">
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
                to="/serwis/zgloszenie"
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
