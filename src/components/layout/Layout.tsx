import React, { useLayoutEffect } from 'react';
import { Outlet, Link, useLocation, ScrollRestoration } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { COMPANY_DATA } from '@/data/company';
import { LABELS } from '@/config/labels';
import { cleanTelHref } from '@/utils/typography';
import { Phone, Wrench } from 'lucide-react';

export const Layout: React.FC = () => {
  const { pathname, search } = useLocation();

  // Natychmiastowe przewinięcie na samą górę strony przy przejściu na dowolną podstronę
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  const isHome = pathname === '/';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground pb-[76px] lg:pb-0">
      <ScrollRestoration />
      <Header />
      <main className={`flex-1 ${isHome ? 'pt-0' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer />

      {/* Cienki dolny pasek akcji na mobile (zabezpieczony safe-area iOS) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-surface-border px-4 py-3 flex items-center gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a
          href={cleanTelHref(COMPANY_DATA.phones.techInfo.raw)}
          className="flex-1 h-11 px-4 inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-foreground bg-white border border-surface-border rounded-[10px] active:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground select-none"
        >
          <Phone className="w-4 h-4 text-foreground-secondary shrink-0" />
          <span>{LABELS.cta.callNow}</span>
        </a>
        <Link
          to="/serwis/zgloszenie"
          className="flex-1 h-11 px-4 inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-foreground bg-accent border border-[#D98908]/40 rounded-[10px] active:bg-accent-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground select-none"
        >
          <Wrench className="w-4 h-4 text-foreground shrink-0" />
          <span className="truncate">{LABELS.cta.serviceTicket}</span>
        </Link>
      </div>
    </div>
  );
};
