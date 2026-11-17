import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'lg',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 md:p-5',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  }[padding];

  const hoverClasses = hoverable
    ? 'transition-colors duration-150 hover:border-foreground/40'
    : '';

  return (
    <div
      className={`bg-white border border-surface-border rounded-[10px] ${paddingClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
