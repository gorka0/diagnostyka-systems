import React from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { COMPANY_DATA } from '@/data/company';
import { ArrowLeft, Clock, Wrench } from 'lucide-react';

export interface PlaceholderPageProps {
  title: string;
  eyebrow: string;
  description: string;
  plannedContents: string[];
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  eyebrow,
  description,
  plannedContents,
}) => {
  return (
    <div>
      <div className="bg-background-subtle border-b border-surface-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: title }]} />
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8">
            <Card padding="lg" className="border-dashed border-2 bg-surface-muted/50">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="accent" size="sm">ETAP 1: FUNDAMENTY</Badge>
                <span className="text-xs font-mono text-foreground-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  Strona w przygotowaniu merytorycznym
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                Planowana zawartość modułu ({title}):
              </h3>

              <ul className="space-y-2.5 mb-6">
                {plannedContents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="font-mono text-xs text-accent font-bold mt-0.5">[{idx + 1}]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-surface-border flex flex-wrap gap-3">
                <Button to="/" variant="secondary" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
                  Powrót do fundamentów
                </Button>
                <Button to="/kontakt?typ=serwis" variant="cta" size="sm" icon={<Wrench className="w-3.5 h-3.5" />}>
                  Zgłoś serwis Beissbarth
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <Card padding="md" className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Kontakt bezpośredni:</h4>
              <div className="text-xs text-foreground-muted space-y-1.5 font-mono">
                <div>Serwis: <strong className="text-foreground">{COMPANY_DATA.phones.techInfo.display}</strong></div>
                <div>Handel: <strong className="text-foreground">{COMPANY_DATA.phones.salesInfo.display}</strong></div>
                <div>E-mail: <strong className="text-foreground">{COMPANY_DATA.email}</strong></div>
              </div>
              <div className="text-[11px] text-foreground-subtle pt-2 border-t border-surface-border">
                {COMPANY_DATA.officeAddress.fullInline}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};
