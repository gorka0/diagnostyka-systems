import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  showHome = true,
}) => {
  return (
    <nav aria-label="Okruszki chleba" className={`py-4 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-[14px] text-foreground-secondary">
        {showHome && (
          <li>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              title="Strona główna"
            >
              <Home className="w-4 h-4 text-foreground-secondary" />
              <span className="sr-only">Strona główna</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li className="text-foreground-secondary/60">
                <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </li>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="hover:text-foreground transition-colors font-normal"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`font-medium ${isLast ? 'text-foreground' : ''}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
