import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'partner' | 'success' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-sm tracking-wide select-none';

  const sizeClasses = {
    sm: 'text-[14px] px-2.5 py-0.5 gap-1 font-medium',
    md: 'text-[15px] px-3 py-1 gap-1.5',
  }[size];

  const variantClasses = {
    neutral: 'bg-surface-muted text-foreground-muted border border-surface-border',
    accent: 'bg-accent-subtle text-foreground border border-accent-border font-semibold',
    partner: 'bg-white text-foreground border border-surface-border shadow-subtle',
    success: 'bg-[#EBF7EE] text-[#1B7F37] border border-[#BCE4C7]',
    outline: 'bg-transparent text-foreground border border-surface-border',
    subtle: 'bg-background text-foreground-muted border border-surface-border',
  }[variant];

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
