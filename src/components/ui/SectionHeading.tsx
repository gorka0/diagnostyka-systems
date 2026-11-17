import React from 'react';
import { formatPolishTypography } from '@/utils/typography';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
  className = '',
}) => {
  const Component = as;
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-[65ch] mb-12 md:mb-16 ${alignClasses} ${className}`}>
      {/* Eyebrow: zwykły font, 14-15px, stonowany szary (zakaz pomarańczowych wersalików mono) */}
      {eyebrow && (
        <span className="text-[14px] md:text-[15px] font-medium text-foreground-secondary mb-3">
          {formatPolishTypography(eyebrow)}
        </span>
      )}
      <Component className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground text-balance leading-[1.2]">
        {formatPolishTypography(title)}
      </Component>
      {description && (
        <p className="mt-4 text-[16px] md:text-[17px] text-foreground-secondary leading-relaxed max-w-[65ch] text-pretty">
          {formatPolishTypography(description)}
        </p>
      )}
    </div>
  );
};
