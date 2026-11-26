/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F7F5', // Jedyne drugie tło sekcji (naprzemiennie z bielą)
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F7F5',
          border: '#E5E7EB', // Czysta 1px ramka
        },
        foreground: {
          DEFAULT: '#1F2328', // Główny grafit tekstu (WCAG AAA)
          secondary: '#4B5563', // Tekst drugorzędny (min. 4.5:1 kontrastu na bieli i #F7F7F5)
          muted: '#4B5563',     // Zgodność wsteczna
        },
        'surface-hover': '#F3F4F6',
        'surface-subtle': '#F7F7F5',
        'primary-soft': '#FFF7E6',
        accent: {
          DEFAULT: '#EE9D16', // Pomarańcz z logo na tło głównego CTA
          primary: '#EE9D16',
          hover: '#D98908',
          active: '#BF7400',
          text: '#A15C00',    // Ciemny odcień pomarańczu na teksty/linki (min. 4.5:1 kontrastu)
          light: '#F5A524',   // Jaśniejszy akcent na ciemne tła graphite (kontrast ~9:1 na #14171A)
          subtle: '#FFF7E6',
          border: '#F5A524',
          surface: '#F7F7F5',
        },
        graphite: {
          900: '#14171A', // Ciemne sekcje premium (Hero, Blok Serwisu, Stopka)
          800: '#1C2024', // Wypełnienia paneli technicznych i placeholderów na ciemnym
          700: '#2A3036',
        },
        brand: {
          gray: '#898685',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Rygor typograficzny: nic poniżej 14px (poza 13px copyright w stopce)
        'copyright': ['13px', { lineHeight: '1.5' }],
        'xs': ['14px', { lineHeight: '1.5' }],
        'sm': ['15px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'body-lg': ['17px', { lineHeight: '1.6' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.3' }],
        '2xl': ['24px', { lineHeight: '1.25' }],
        'h3': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        DEFAULT: '10px',
        md: '10px',
        lg: '10px',
        xl: '10px',
        '2xl': '10px',
      },
      boxShadow: {
        // Precyzyjna, stonowana głębia bez AI glowów i rozmycia
        DEFAULT: '0 1px 2px 0 rgba(20, 23, 26, 0.04)',
        '2xs': '0 1px 1px 0 rgba(20, 23, 26, 0.03)',
        xs: '0 1px 2px 0 rgba(20, 23, 26, 0.05)',
        subtle: '0 1px 2px 0 rgba(20, 23, 26, 0.04)',
        sm: '0 1px 3px 0 rgba(20, 23, 26, 0.06), 0 1px 2px -1px rgba(20, 23, 26, 0.04)',
        md: '0 4px 12px -2px rgba(20, 23, 26, 0.07), 0 2px 4px -2px rgba(20, 23, 26, 0.04)',
        lg: '0 10px 24px -4px rgba(20, 23, 26, 0.1), 0 4px 8px -2px rgba(20, 23, 26, 0.05)',
        xl: '0 16px 36px -6px rgba(20, 23, 26, 0.14)',
        '2xl': '0 24px 48px -12px rgba(20, 23, 26, 0.22)',
        inner: 'inset 0 2px 4px 0 rgba(20, 23, 26, 0.04)',
        none: 'none',
      },
      maxWidth: {
        container: '1200px',
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
