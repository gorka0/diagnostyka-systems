import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

/**
 * Plugin wycinający pola i wartości cen z publicznych bundli JS i danych
 * w czasie buildu, gdy COMPANY_DATA.showPrices === false.
 * Gdy showPrices === true, plugin nie ingeruje w kod i pełne dane wracają 1:1.
 */
function stripPricesPlugin(): Plugin {
  return {
    name: 'strip-prices-plugin',
    enforce: 'pre',
    transform(code, id) {
      const companyFile = path.resolve(__dirname, 'src/data/company.ts');
      let showPrices = false;
      try {
        const companySrc = fs.readFileSync(companyFile, 'utf-8');
        const match = companySrc.match(/showPrices:\s*(true|false)/);
        if (match && match[1] === 'true') {
          showPrices = true;
        }
      } catch {
        showPrices = false;
      }

      // Gdy showPrices=true, nic nie wycinamy
      if (showPrices) {
        return null;
      }

      const normalizedId = id.replace(/\\/g, '/');

      // 1. products.ts - usunięcie pól priceNetto, priceVariants i cen w accessories
      if (normalizedId.endsWith('/src/data/products.ts')) {
        let transformed = code;
        transformed = transformed.replace(/"priceNetto":\s*"[^"]*",?\r?\n?/g, '');
        transformed = transformed.replace(/"priceVariants":\s*\[[\s\S]*?\],?\r?\n?/g, '');
        // Usunięcie nawiasów z ceną w catalogNumber, np. "1 691 602 115 (5 200 zł netto)" -> "1 691 602 115"
        transformed = transformed.replace(/\s*\([^)]*zł[^)]*\)/gi, '');
        // Usunięcie wierszy catalogNumber będących samą kwotą
        transformed = transformed.replace(/"catalogNumber":\s*"\+?[0-9\.\s]+zł\s*netto",?\r?\n?/g, '');
        return { code: transformed, map: null };
      }

      // 2. promotions.ts - usunięcie pola priceNetto
      if (normalizedId.endsWith('/src/data/promotions.ts')) {
        let transformed = code;
        transformed = transformed.replace(/priceNetto:\s*'[^']*',?\r?\n?/g, '');
        return { code: transformed, map: null };
      }

      // 3. parse-rules.ts - wyzerowanie cen wariantów bazowych do null
      if (normalizedId.endsWith('/src/data/parse-rules.ts')) {
        let transformed = code;
        transformed = transformed.replace(/price:\s*[0-9]+,/g, 'price: null,');
        return { code: transformed, map: null };
      }

      return null;
    },
  };
}

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const clientIp =
          (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
          req.socket.remoteAddress ||
          '127.0.0.1';

        if (req.method === 'POST' && (url.pathname === '/api/service-ticket' || url.pathname === '/api/contact')) {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = bodyStr ? JSON.parse(bodyStr) : {};
              const { handleServiceTicket, handleContactMessage } = await import('./server/mailer.js');
              let result;
              if (url.pathname === '/api/service-ticket') {
                result = await handleServiceTicket(body, clientIp);
              } else {
                result = await handleContactMessage(body, clientIp);
              }
              res.statusCode = result.status || 200;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: false, error: err?.message || 'Błąd API' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stripPricesPlugin(), apiDevMiddleware()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
