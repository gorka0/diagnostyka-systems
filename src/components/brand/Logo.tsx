import React from 'react';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'full' | 'mark' | 'mono';
  className?: string;
  alt?: string;
}

/**
 * Komponent Logo Diagnostyka-Systems s.c.
 *
 * Warianty:
 * - full: pełne logo (mark + typografia w krzywych + linie pomiarowe) na jasne tło
 * - mark: sam znak sygnetu (DS z siatką pomiarową)
 * - mono: jednokolorowy biały wariant na ciemne tła
 *
 * Podmiana na oficjalny wektor klienta wymaga jedynie zastąpienia plików w /public/brand/
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  alt = 'Diagnostyka-Systems s.c.',
  ...props
}) => {
  const sources = {
    full: '/brand/ds-logo.svg',
    mark: '/brand/ds-mark.svg',
    mono: '/brand/ds-logo-mono-light.svg',
  };

  const defaultDimensions = {
    full: { width: 174, height: 60 },
    mark: { width: 60, height: 60 },
    mono: { width: 174, height: 60 },
  };

  const dims = defaultDimensions[variant];

  return (
    <img
      src={sources[variant]}
      alt={alt}
      width={dims.width}
      height={dims.height}
      className={`inline-block select-none ${className}`}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
};
