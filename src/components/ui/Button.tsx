import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  children,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  // Jednolita wysokość (48-52 px), radius 10 px, font 16-17 px, weight 600, active:scale .98
  const baseClasses = 'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-200 select-none rounded-[10px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'text-[15px] px-4 h-11 gap-2 min-h-[44px]',
    md: 'text-[16px] px-6 h-[50px] gap-2.5 min-h-[50px]',
    lg: 'text-[17px] px-8 h-[52px] gap-3 min-h-[52px]',
  }[size];

  const variantClasses = {
    // Primary: Pomarańczowy akcent z grafitowym tekstem #1F2328 (rygor kontrastu WCAG AA > 6:1!)
    primary: 'bg-accent text-foreground font-semibold hover:bg-accent-hover active:bg-accent-active border border-[#D98908]/40',
    // Secondary: Biel + cienka ramka 1px #E5E7EB + grafitowy tekst
    secondary: 'bg-white text-foreground hover:bg-background-subtle border border-surface-border active:bg-[#ECEEF1]',
    // CTA: Synonim primary w rygorze jednego stylu CTA
    cta: 'bg-accent text-foreground font-semibold hover:bg-accent-hover active:bg-accent-active border border-[#D98908]/40',
    // Outline: Przezroczyste tło z cienką ramką
    outline: 'bg-transparent text-foreground hover:bg-background-subtle border border-surface-border',
    // Ghost: Czysty tekst bez tła z subtelnym tłem na hover
    ghost: 'bg-transparent text-foreground-secondary hover:text-foreground hover:bg-background-subtle',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="inline-flex items-center gap-1.5 shrink-0">{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
