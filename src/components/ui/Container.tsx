import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
  ...props
}) => {
  // Zunifikowana szerokość kontenera: 1200px (lub węższa 800px dla formularzy/artykułów)
  const sizeClasses = {
    narrow: 'max-w-[800px]',
    default: 'max-w-[1200px]',
    wide: 'max-w-[1200px]',
  }[size];

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
