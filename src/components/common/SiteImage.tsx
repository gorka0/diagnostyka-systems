import React, { useState } from 'react';
import { IMAGE_CONFIG, type ImageKey, type ImageSpec } from '@/config/images';
import { Crosshair } from '@/components/ui/MeasurementMarks';

export interface SiteImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: ImageKey | string;
  className?: string;
  fit?: 'cover' | 'contain';
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '4/5' | '16/10' | '3/4';
  priority?: boolean;
  theme?: 'light' | 'dark';
  plain?: boolean;
}

/**
 * Komponent SiteImage z uproszczonym placeholderem zgodnym ze specyfikacją:
 * - Wersja jasna: jasnoszary blok w docelowych proporcjach, ramka border-surface-border.
 * - Wersja ciemna (Hero): panel graphite-800 z siatką pomiarową Crosshair i etykietą celową.
 * - Wersja plain (katalog): czysty obraz bez wymuszonego paddingu i dodatkowej zewnętrznej ramki.
 */
export const SiteImage: React.FC<SiteImageProps> = ({
  name,
  className = '',
  fit = 'cover',
  aspectRatio,
  priority = false,
  theme = 'light',
  plain = false,
  ...props
}) => {
  const [loadError, setLoadError] = useState(false);

  const spec: ImageSpec = IMAGE_CONFIG[name] || {
    fileName: `${name}.jpg`,
    path: `/images/${name}.jpg`,
    dimensions: '1200×900',
    aspectRatio: '4/3',
    label: props.alt || `Urządzenie Beissbarth (${name})`,
    category: 'products',
    alt: props.alt || `Zdjęcie urządzenia ${name}`,
  };

  const ratio = (aspectRatio || spec.aspectRatio || '4/3') as string;

  // Obliczenie wymiarów do atrybutów width i height (zapobieganie CLS)
  const [dimWidth, dimHeight] = (spec.dimensions || '1200×900')
    .split(/[x×]/)
    .map((v) => parseInt(v.trim(), 10) || undefined);

  // Proporcje CSS
  const aspectMap: Record<string, string> = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
    '4/5': 'aspect-[4/5]',
    '16/10': 'aspect-[16/10]',
    '3/4': 'aspect-[3/4]',
  };
  const aspectClass = aspectMap[ratio] || 'aspect-[4/3]';

  const fitClass =
    fit === 'contain'
      ? plain
        ? 'object-contain'
        : 'object-contain p-4 md:p-6 bg-white'
      : 'object-cover';
  const containerBg = plain
    ? ''
    : theme === 'dark'
    ? 'bg-graphite-800 border-white/12 border rounded-[16px]'
    : 'bg-background-subtle border-surface-border border rounded-[16px]';

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${containerBg} ${aspectClass} ${className}`}
    >
      {!loadError ? (
        <picture className="w-full h-full block">
          <source
            srcSet={spec.path.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            type="image/webp"
          />
          <img
            src={spec.path}
            alt={props.alt || spec.alt}
            width={props.width || dimWidth || 1200}
            height={props.height || dimHeight || 900}
            onError={() => setLoadError(true)}
            className={`w-full h-full ${fitClass} transition-opacity duration-150`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...({ fetchpriority: priority ? 'high' : 'low' } as any)}
            {...props}
          />
        </picture>
      ) : theme === 'dark' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-graphite-800 text-white relative overflow-hidden">
          <Crosshair size={48} opacity={0.08} />
          <span className="relative z-10 text-[14px] md:text-[15px] font-normal text-white/70">
            Zdjęcie: {spec.fileName} · {spec.dimensions.replace('x', '×')}
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center select-none bg-background-subtle border border-dashed border-gray-300 rounded-[10px]">
          <span className="text-[14px] md:text-[15px] font-normal text-foreground-secondary">
            Zdjęcie: {spec.fileName} · {spec.dimensions.replace('x', '×')}
          </span>
        </div>
      )}
    </div>
  );
};
