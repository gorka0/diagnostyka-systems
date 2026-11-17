import React, { useId } from 'react';

/**
 * 1. MOTYW MARKI: "LINIE POMIAROWE"
 * Subtelna aparatura pomiarowa Beissbarth (krzyż pomiarowy, siatka kalibracyjna,
 * narożniki-nawiasy i separator z podziałką).
 * Wszystko jako inline SVG, czyste 1px hairlines, aria-hidden.
 */

export interface CrosshairProps {
  className?: string;
  size?: number;
  opacity?: number;
}

/**
 * Tło siatki z krzyżami pomiarowymi (Crosshair Pattern).
 * Używane w: hero, bloku serwisu, nagłówkach podstron.
 */
export const Crosshair: React.FC<CrosshairProps> = ({
  className = '',
  size = 64,
  opacity,
}) => {
  const rawId = useId();
  const patternId = `crosshair-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={opacity !== undefined ? { opacity } : undefined}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {/* Krzyż pomiarowy na przecięciu siatki */}
          <path
            d={`M ${size / 2} ${size / 2 - 7} L ${size / 2} ${size / 2 + 7} M ${size / 2 - 7} ${size / 2} L ${size / 2 + 7} ${size / 2}`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
          {/* Drobne punkty kalibracyjne */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="1"
            fill="currentColor"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

/**
 * Narożniki-nawiasy (Corner brackets) o wymiarze 16 px na dużych zdjęciach i panelach.
 * Rysowane jednorazowo przy załadowaniu (stroke-dashoffset 700 ms).
 */
export interface CornerBracketsProps {
  className?: string;
  size?: number; // 14-16 px
  color?: string;
}

export const CornerBrackets: React.FC<CornerBracketsProps> = ({
  className = '',
  size = 16,
  color = '#F5A524',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
    >
      {/* Lewy górny narożnik */}
      <svg
        className="absolute top-2 left-2 animate-draw-bracket"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M 1 15 L 1 1 L 15 1"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>

      {/* Prawy górny narożnik */}
      <svg
        className="absolute top-2 right-2 animate-draw-bracket"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M 1 1 L 15 1 L 15 15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>

      {/* Lewy dolny narożnik */}
      <svg
        className="absolute bottom-2 left-2 animate-draw-bracket"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M 1 1 L 1 15 L 15 15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>

      {/* Prawy dolny narożnik */}
      <svg
        className="absolute bottom-2 right-2 animate-draw-bracket"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M 1 15 L 15 15 L 15 1"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};

/**
 * Separator z podziałką pomiarową (kreski co 8 px, większe co 32 px).
 * Zgodny z zasadą: użycie wyłącznie w 2-3 kluczowych miejscach.
 */
export interface MeasurementDividerProps {
  className?: string;
  dark?: boolean;
}

export const MeasurementDivider: React.FC<MeasurementDividerProps> = ({
  className = '',
  dark = false,
}) => {
  const rawId = useId();
  const patternId = `ruler-${rawId.replace(/:/g, '')}`;

  const strokeColor = dark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(31, 35, 40, 0.2)';
  const majorColor = dark ? '#F5A524' : '#EE9D16';
  const baselineColor = dark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none py-2 ${className}`}
    >
      <svg
        className="w-full h-3"
        preserveAspectRatio="none"
        viewBox="0 0 1200 12"
      >
        <defs>
          <pattern
            id={patternId}
            width="32"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {/* Kreski co 8 px */}
            <line x1="0" y1="12" x2="0" y2="4" stroke={majorColor} strokeWidth="1.5" />
            <line x1="8" y1="12" x2="8" y2="8" stroke={strokeColor} strokeWidth="1" />
            <line x1="16" y1="12" x2="16" y2="6" stroke={strokeColor} strokeWidth="1" />
            <line x1="24" y1="12" x2="24" y2="8" stroke={strokeColor} strokeWidth="1" />
          </pattern>
        </defs>
        {/* Dolna linia bazowa */}
        <line x1="0" y1="11.5" x2="1200" y2="11.5" stroke={baselineColor} strokeWidth="1" />
        {/* Podziałka */}
        <rect x="0" y="0" width="100%" height="12" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
