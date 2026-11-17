import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { PUBLICATIONS_DATA } from '@/data/publications';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowLeft } from 'lucide-react';

export const PublicationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const publication = useMemo(() => {
    return PUBLICATIONS_DATA.find((p) => p.slug === slug);
  }, [slug]);

  if (!publication) {
    return (
      <div className="bg-background min-h-[100dvh] py-16">
        <Container>
          <div className="bg-white border border-surface-border rounded-[10px] p-12 text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Artykuł nie został odnaleziony
            </h1>
            <p className="text-[15px] text-foreground-secondary mb-6">
              Publikacja o podanym adresie nie istnieje w bazie wiedzy.
            </p>
            <Button to="/publikacje" variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do listy artykułów
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const isRentownosc = publication.slug === 'rentownosc-ogumienia';

  return (
    <div className="bg-background min-h-[100dvh] py-10 md:py-16">
      <Seo
        title={`${publication.title} – Publikacja branżowa | Diagnostyka-Systems`}
        description={publication.summary}
        canonicalPath={`/publikacje/${publication.slug}`}
      />
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Publikacje', to: '/publikacje' },
            { label: publication.title },
          ]}
        />

        {/* Czysty układ redakcyjny o szerokości ok. 68 znaków (bez bocznych kolumn) */}
        <article className="mt-8 max-w-[68ch] mx-auto">
          {/* Nagłówek artykułu */}
          <header className="mb-12 pb-8 border-b border-surface-border space-y-4">
            <span className="text-[14px] font-medium text-foreground-secondary block">
              {publication.publicationDate} · {publication.sourceJournal}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-[1.15] text-balance">
              {formatPolishTypography(publication.title)}
            </h1>

            <p className="text-[17px] md:text-[18px] text-foreground-secondary leading-relaxed pt-2 text-pretty">
              {formatPolishTypography(publication.summary)}
            </p>
          </header>

          {/* Treść merytoryczna */}
          <div className="space-y-8 text-[16px] md:text-[17px] text-foreground leading-[1.6]">
            {isRentownosc ? (
              <>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Wskaźniki opłacalności nowoczesnego stanowiska geometrii kół
                  </h2>
                  <p>
                    {formatPolishTypography(
                      'W dobie rosnącej konkurencji na rynku usług wulkanizacyjnych i mechanicznych, sama wymiana i wyważanie opon przestaje generować zadowalającą marżę. W artykule opublikowanym w kwartalniku „Moto części” eksperci Diagnostyka-Systems przeprowadzili szczegółową analizę ekonomiczną opłacalności wdrożenia stanowiska komputerowej geometrii kół w technologii 3D.'
                    )}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">
                    Kluczowe czynniki skracające czas zwrotu z inwestycji (ROI)
                  </h3>
                  <div className="space-y-4 pt-2">
                    <div className="p-5 bg-background-subtle border border-surface-border rounded-[10px]">
                      <strong className="text-foreground block text-[17px] font-semibold mb-1">
                        Kompensacja bicia przez przetaczanie (ROC)
                      </strong>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed">
                        {formatPolishTypography(
                          'Eliminacja czasochłonnego podnoszenia pojazdu na podnośniku skraca fazę pomiarową z 20–30 minut do niespełna 2 minut na pojazd.'
                        )}
                      </p>
                    </div>

                    <div className="p-5 bg-background-subtle border border-surface-border rounded-[10px]">
                      <strong className="text-foreground block text-[17px] font-semibold mb-1">
                        Kompleksowa usługa „opona + geometria”
                      </strong>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed">
                        {formatPolishTypography(
                          'Zaproponowanie szybkiej kontroli geometrii przy każdej sezonowej wymianie kół konwertuje ponad 35% klientów na płatną usługę regulacji zbieżności.'
                        )}
                      </p>
                    </div>

                    <div className="p-5 bg-background-subtle border border-surface-border rounded-[10px]">
                      <strong className="text-foreground block text-[17px] font-semibold mb-1">
                        Graficzny protokół pomiarowy dla klienta
                      </strong>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed">
                        {formatPolishTypography(
                          'Czytelny protokół pomiarowy przed i po regulacji buduje bezdyskusyjne zaufanie klienta do zasadności wykonanej naprawy.'
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">
                    Podsumowanie ekonomiczne
                  </h3>
                  <p>
                    {formatPolishTypography(
                      'Inwestycja w aparaturę Beissbarth (np. Microline 8 ROC lub nowsze serie Q.Lign) przy średnim obciążeniu 3–4 pomiarów dziennie pozwala na całkowity zwrot nakładów kapitałowych w okresie poniżej 12 miesięcy, generując stabilne źródło wysokomarżowego przychodu przez kolejne lata bezawaryjnej pracy.'
                    )}
                  </p>
                </section>
              </>
            ) : (
              <>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Standardy wyposażenia warsztatu i Stacji Kontroli Pojazdów
                  </h2>
                  <p>
                    {formatPolishTypography(
                      'Opracowanie „Vademecum warsztatu samochodowego” stanowi kompendium wiedzy dla inwestorów planujących budowę nowej Stacji Kontroli Pojazdów (SKP/OSKP) oraz modernizację istniejących serwisów pod kątem spełnienia rygorystycznych norm prawnych w Polsce.'
                    )}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">
                    Wymogi certyfikacji ITS i Transportowego Dozoru Technicznego
                  </h3>
                  <div className="space-y-4 pt-2">
                    <div className="p-5 bg-background-subtle border border-surface-border rounded-[10px]">
                      <strong className="text-foreground block text-[17px] font-semibold mb-1">
                        Atesty i certyfikaty typu
                      </strong>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed">
                        {formatPolishTypography(
                          'Każde urządzenie do pomiaru geometrii i badania sił hamowania na SKP musi posiadać aktualny certyfikat Instytutu Transportu Samochodowego dopuszczający do badań urzędowych.'
                        )}
                      </p>
                    </div>

                    <div className="p-5 bg-background-subtle border border-surface-border rounded-[10px]">
                      <strong className="text-foreground block text-[17px] font-semibold mb-1">
                        Procedury okresowych kalibracji
                      </strong>
                      <p className="text-[15px] text-foreground-secondary leading-relaxed">
                        {formatPolishTypography(
                          'Regularne kalibracje z wystawieniem oficjalnych świadectw są bezwzględnym warunkiem pozytywnego przejścia corocznych kontroli TDT na stacji kontroli.'
                        )}
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          <div className="mt-14 pt-8 border-t border-surface-border flex items-center justify-between">
            <Link
              to="/publikacje"
              className="text-[15px] font-semibold text-foreground hover:text-accent-text inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wróć do listy artykułów</span>
            </Link>

            <Button to="/kontakt" variant="secondary" size="md">
              Skonsultuj z inżynierem
            </Button>
          </div>
        </article>
      </Container>
    </div>
  );
};
