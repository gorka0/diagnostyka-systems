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
        accent: {
          DEFAULT: '#EE9D16', // Pomarańcz z logo na tło głównego CTA
          hover: '#D98908',
          active: '#BF7400',
          text: '#A15C00',    // Ciemny odcień pomarańczu na teksty/linki (min. 4.5:1 kontrastu)
          light: '#F5A524',   // Jaśniejszy akcent na ciemne tła graphite (kontrast ~9:1 na #14171A)
          surface: '#F7F7F5',
          border: '#E5E7EB',
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
        // Zero slopowych cieni – czyste, subtelne ramki 1px
        DEFAULT: 'none',
        sm: 'none',
        md: 'none',
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
