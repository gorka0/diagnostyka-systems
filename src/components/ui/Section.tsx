import React from 'react';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'subtle';
  containerSize?: 'default' | 'narrow' | 'wide';
  borderTop?: boolean;
  borderBottom?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  containerSize = 'default',
  borderTop = false,
  borderBottom = false,
  ...props
}) => {
  // Rygorystycznie dwa tła w całym serwisie: czysta biel i ciepły szary #F7F7F5
  const bgClasses = {
    white: 'bg-background',
    subtle: 'bg-background-subtle',
  }[background];

  const borderClasses = `
    ${borderTop ? 'border-t border-surface-border' : ''}
    ${borderBottom ? 'border-b border-surface-border' : ''}
  `;

  // Luźny, przestrzenny oddech: 64px mobile -> 96-112px desktop
  return (
    <section
      className={`py-16 md:py-24 lg:py-28 ${bgClasses} ${borderClasses} ${className}`}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
};
