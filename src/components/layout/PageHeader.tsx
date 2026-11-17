import React from 'react';
import { Link } from 'react-router-dom';
import { Crosshair } from '@/components/ui/MeasurementMarks';
import { formatPolishTypography } from '@/utils/typography';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  badge?: string;
  children?: React.ReactNode;
}

/**
 * Standardowy nagłówek podstron:
 * - Tło #F7F7F5, cienka ramka na dole
 * - Breadcrumbs
 * - H1 48 px (clamp 32-48 px), 1 zdanie opisu
 * - Wzór Crosshair przy prawej krawędzi na ok. 5% krycia
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description,
  badge,
  children,
}) => {
  return (
    <div className="relative bg-background-subtle border-b border-surface-border overflow-hidden py-12 md:py-16">
      {/* Wzór Crosshair przy prawej krawędzi (5% krycia) */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-1/3 min-w-[280px] overflow-hidden pointer-events-none text-foreground opacity-[0.05]"
      >
        <Crosshair size={48} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Okruszki (Breadcrumbs) */}
        <nav aria-label="Ścieżka powrotu" className="mb-4">
          <ol className="flex items-center flex-wrap gap-2 text-[14px] text-foreground-secondary">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400 select-none">/</span>}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Badge / Etykieta (jeśli podana) */}
        {badge && (
          <span className="inline-block text-[14px] font-semibold text-accent-text mb-2">
            {badge}
          </span>
        )}

        {/* H1 48 px */}
        <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-foreground tracking-tight leading-[1.15] max-w-[25ch]">
          {formatPolishTypography(title)}
        </h1>

        {/* 1 zdanie opisu */}
        {description && (
          <p className="mt-3 text-[16px] md:text-[18px] text-foreground-secondary leading-relaxed max-w-[65ch]">
            {formatPolishTypography(description)}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};
