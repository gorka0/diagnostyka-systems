import React, { useLayoutEffect, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { cleanTelHref } from '@/utils/typography';
import { Phone, Wrench } from 'lucide-react';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Przewinięcie na górę strony wyłącznie przy zmianie podstrony (pathname) – zmiana parametrów URL (searchParams) nie przewija strony
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const handleResetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    handleResetScroll();
    window.addEventListener('beforeunload', handleResetScroll);
    return () => window.removeEventListener('beforeunload', handleResetScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground pb-[76px] lg:pb-0">
      <Header />
      <main className={`flex-1 ${isHome ? 'pt-0' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer />

      {/* Cienki dolny pasek akcji na mobile (zabezpieczony safe-area iOS, równy grid 50/50 bez rozjeżdżania) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-surface-border px-3.5 py-2.5 grid grid-cols-2 gap-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href={cleanTelHref(COMPANY_DATA.phones.techInfo.raw)}
          className="w-full h-11 px-2.5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[14px] font-semibold text-foreground bg-white border border-surface-border rounded-[10px] active:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground select-none whitespace-nowrap overflow-hidden shadow-2xs"
        >
          <Phone className="w-4 h-4 text-foreground-secondary shrink-0" />
          <span className="whitespace-nowrap">{LABELS.cta.callNow}</span>
        </a>
        <Link
          to="/kontakt?typ=serwis"
          className="w-full h-11 px-2.5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px] font-semibold text-foreground bg-accent border border-[#D98908]/40 rounded-[10px] active:bg-accent-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground select-none whitespace-nowrap overflow-hidden shadow-2xs"
        >
          <Wrench className="w-4 h-4 text-foreground shrink-0" />
          <span className="font-semibold text-[14px] whitespace-nowrap">
            Zgłoszenie<span className="hidden min-[430px]:inline"> serwisowe</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
