import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { PUBLICATIONS_DATA, PublicationItem } from '@/data/publications';
import { formatPolishTypography } from '@/utils/typography';
import { ArrowRight } from 'lucide-react';

export const PublicationsPage: React.FC = () => {
  return (
    <div className="bg-background min-h-[100dvh]">
      <Seo
        title="Publikacje branżowe i wiedza techniczna | Diagnostyka-Systems"
        description="Eksperckie opracowania techniczne Diagnostyka-Systems w prasie motoryzacyjnej: rentowność geometrii 3D, wymogi dopuszczeń TDT/ITS dla Stacji Kontroli Pojazdów."
        canonicalPath="/publikacje"
      />
      <PageHeader
        breadcrumbs={[{ label: 'Publikacje' }]}
        title="Publikacje branżowe i baza wiedzy"
        description="Opracowania inżynierskie i analizy rentowności przygotowane przez ekspertów Diagnostyka-Systems dla pism motoryzacyjnych."
      />
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
          {PUBLICATIONS_DATA.map((item: PublicationItem) => (
            <Card
              key={item.id}
              padding="lg"
              className="bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[14px] font-medium text-foreground-secondary block">
                  {item.publicationDate} · {item.sourceJournal}
                </span>

                <h2 className="text-[20px] font-semibold text-foreground leading-snug">
                  {formatPolishTypography(item.title)}
                </h2>

                <p className="text-[15px] text-foreground-secondary leading-relaxed">
                  {formatPolishTypography(item.summary)}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-surface-border">
                <Link
                  to={`/publikacje/${item.slug}`}
                  className="text-[15px] font-semibold text-accent-text hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Czytaj artykuł</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  </div>
);
};
