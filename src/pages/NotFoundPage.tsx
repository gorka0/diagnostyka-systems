import React from 'react';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[70dvh] flex flex-col justify-center py-16 md:py-24">
      <Seo
        title="Błąd 404 – Nie znaleziono strony | Diagnostyka-Systems"
        description="Szukana podstrona nie istnieje lub została przeniesiona do nowej struktury katalogu."
      />
      <Container>
        <Breadcrumbs items={[{ label: 'Błąd 404' }]} />

        <div className="max-w-xl mx-auto text-center mt-8 bg-white border border-surface-border rounded-[10px] p-8 md:p-12">
          <span className="text-[14px] font-semibold text-foreground-secondary block mb-2">
            Błąd 404
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Nie odnaleziono strony
          </h1>
          <p className="text-[16px] text-foreground-secondary leading-relaxed mb-8">
            Adres URL, którego szukasz, mógł zostać zmieniony lub strona została przeniesiona do nowej struktury katalogu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/" variant="primary" size="md">
              Wróć na stronę główną
            </Button>
            <Button to="/produkty" variant="secondary" size="md">
              Katalog produktów
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
