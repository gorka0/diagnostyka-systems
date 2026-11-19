import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory rate limiting (max 5 zapytań na 10 minut na IP)
const ipRateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Sprawdza limit zapytań dla danego adresu IP
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (now > record.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const waitSeconds = Math.ceil((record.resetAt - now) / 1000);
    return {
      allowed: false,
      message: `Zbyt wiele prób wysłania. Odczekaj ${waitSeconds} sekund przed kolejnym zgłoszeniem.`,
    };
  }

  record.count += 1;
  return { allowed: true };
}

/**
 * Sanityzacja ciągów tekstowych przed wstrzyknięciem do maila lub nagłówków
 */
export function sanitize(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\r\n]+/g, ' ') // usunięcie łamań linii (ochrona nagłówków)
    .replace(/[<>]/g, '')     // usunięcie tagów HTML
    .trim();
}

export function sanitizeMultiline(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // usunięcie tagów HTML
    .trim();
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Konfiguracja adresów docelowych per cel formularza
 */
const TARGET_EMAILS_PER_TYPE = {
  ogolne: process.env.MAIL_TARGET_OGOLNE || process.env.MAIL_TARGET_ADDRESS || 'poczta@beissbarth-service.pl',
  oferta: process.env.MAIL_TARGET_OFERTA || process.env.MAIL_TARGET_ADDRESS || 'poczta@beissbarth-service.pl',
  serwis: process.env.MAIL_TARGET_SERWIS || process.env.MAIL_TARGET_ADDRESS || 'poczta@beissbarth-service.pl',
};

/**
 * Inicjalizacja transportera e-mail:
 * - Jeśli brak danych SMTP w .env lub włączony DEV_LOG_MAIL: zapis do pliku logu
 * - W przeciwnym razie: nodemailer z transportem SMTP
 */
export function getMailTransport() {
  const smtpHost = process.env.SMTP_HOST;
  const devLog = process.env.DEV_LOG_MAIL === 'true' || !smtpHost;

  if (devLog) {
    return {
      isDevLog: true,
      sendMail: async (mailOptions) => {
        const logEntry = {
          timestamp: new Date().toISOString(),
          to: mailOptions.to,
          from: mailOptions.from,
          replyTo: mailOptions.replyTo,
          subject: mailOptions.subject,
          text: mailOptions.text,
        };

        const formattedEntry = `
================================================================================
DATA: ${logEntry.timestamp}
DO: ${logEntry.to}
OD: ${logEntry.from}
REPLY-TO: ${logEntry.replyTo}
TEMAT: ${logEntry.subject}
--------------------------------------------------------------------------------
TREŚĆ:
${logEntry.text}
================================================================================
`;
        // Zawsze loguj do stdout/console - widoczne w logach Vercel Functions w czasie rzeczywistym
        console.log(`[DEV/SERVERLESS EMAIL LOGGED] Do: ${logEntry.to} | Temat: ${logEntry.subject}`);
        console.log(formattedEntry);

        // Bezpieczny zapis do pliku - w środowiskach Serverless (Vercel/AWS Lambda) dysk jest read-only
        try {
          const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
          const logsDir = isServerless ? path.join('/tmp', 'logs') : path.join(__dirname, 'logs');
          if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
          }
          const logFilePath = path.join(logsDir, 'emails.log');
          fs.appendFileSync(logFilePath, formattedEntry, 'utf-8');
        } catch (fsErr) {
          // Nigdy nie wywalaj funkcji z powodu read-only filesystem
          console.warn('[DEV LOG DISK WRITE SKIPPED]:', fsErr.message);
        }

        return { messageId: `mock-${Date.now()}`, response: 'Logged to console' };
      },
    };
  }

  return {
    isDevLog: false,
    sendMail: async (mailOptions) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        return await transporter.sendMail(mailOptions);
      } catch (smtpErr) {
        console.error('[SMTP SendMail Error]:', smtpErr);
        // Log zapasowy w razie problemów z siecią/SMTP
        console.warn('[FALLBACK FORM DISPATCH LOGGED]:', {
          to: mailOptions.to,
          replyTo: mailOptions.replyTo,
          subject: mailOptions.subject,
          text: mailOptions.text,
        });
        throw new Error(`Błąd wysyłki e-mail przez serwer SMTP: ${smtpErr.message || 'Nieudane połączenie'}`);
      }
    },
  };
}

/**
 * Jeden ujednolicony handler wiadomości kontaktowej, obsługujący 3 cele:
 * - 'ogolne' (Pytanie ogólne)
 * - 'oferta' (Zapytanie o ofertę)
 * - 'serwis' (Zgłoszenie serwisowe)
 */
export async function handleContactMessage(body, clientIp) {
  // 1. Honeypot check (ochrona przed spam-botami)
  if (body.website || body._gotcha) {
    console.warn(`[BOT DETECTED] Honeypot filled from IP: ${clientIp}`);
    return { success: true, message: 'Wiadomość przyjęta.' }; // cichy sukces dla botów
  }

  // 2. Rate limiting per IP
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return { success: false, error: rateLimit.message, status: 429 };
  }

  // 3. Rozpoznanie celu zapytania
  const rawCel = body.cel || body.typ;
  const cel = ['ogolne', 'oferta', 'serwis'].includes(rawCel) ? rawCel : 'ogolne';

  // 4. Ekstrakcja i sanityzacja danych
  const imieNazwisko = sanitize(body.imieNazwisko || body.osoba);
  const firma = sanitize(body.firma);
  const email = sanitize(body.email);
  const telefon = sanitize(body.telefon);
  const produkt = sanitize(body.produkt || body.tematProdukt);
  const rodzajUrzadzenia = sanitize(body.rodzajUrzadzenia || body.typUrzadzenia);
  const model = sanitize(body.model);
  const wiadomosc = sanitizeMultiline(body.wiadomosc || body.opisUsterki);
  const zgodaRODO = body.zgodaRODO === true || body.zgodaRODO === 'true';

  // 5. Walidacja wspólna
  if (!imieNazwisko) {
    return { success: false, error: 'Podaj imię i nazwisko.', status: 400 };
  }
  if (!email || !validateEmail(email)) {
    return { success: false, error: 'Podaj poprawny adres e-mail.', status: 400 };
  }
  if (!zgodaRODO) {
    return { success: false, error: 'Wymagana jest akceptacja przetwarzania danych (RODO).', status: 400 };
  }

  // 6. Walidacja per cel
  if (cel === 'serwis') {
    if (!rodzajUrzadzenia) {
      return { success: false, error: 'Wybierz rodzaj urządzenia.', status: 400 };
    }
    if (!model) {
      return { success: false, error: 'Podaj model urządzenia.', status: 400 };
    }
    if (!wiadomosc) {
      return { success: false, error: 'Wpisz opis usterki lub wymaganej usługi.', status: 400 };
    }
  } else {
    // ogolne lub oferta
    if (!wiadomosc) {
      return { success: false, error: 'Wpisz treść wiadomości.', status: 400 };
    }
  }

  // 7. Generowanie tematu wiadomości ściśle wg specyfikacji:
  // - Pytanie ogólne: "[Kontakt] imię, firma"
  // - Zapytanie o ofertę: "[Oferta] produkt, firma"
  // - Zgłoszenie serwisowe: "[Serwis] model, firma"
  let subject = '';
  if (cel === 'ogolne') {
    subject = `[Kontakt] ${imieNazwisko}${firma ? `, ${firma}` : ''}`;
  } else if (cel === 'oferta') {
    subject = `[Oferta] ${produkt || 'Oferta ogólna'}${firma ? `, ${firma}` : ''}`;
  } else if (cel === 'serwis') {
    subject = `[Serwis] ${model || rodzajUrzadzenia}${firma ? `, ${firma}` : ''}`;
  }

  const targetEmail = TARGET_EMAILS_PER_TYPE[cel] || 'poczta@beissbarth-service.pl';

  // 8. Formatowanie treści wiadomości
  const textContent = `NOWA WIADOMOŚĆ Z FORMULARZA STRONY BEISSBARTH.PL
============================================================
Data wysłania: ${new Date().toLocaleString('pl-PL')}
Adres IP klienta: ${clientIp}
Cel kontaktu: ${cel === 'serwis' ? 'Zgłoszenie serwisowe' : cel === 'oferta' ? 'Zapytanie o ofertę' : 'Pytanie ogólne'}

DANE NADAWCY:
- Imię i nazwisko: ${imieNazwisko}
- Firma / Warsztat: ${firma || 'Nie podano (klient indywidualny)'}
- Adres e-mail: ${email}
- Numer telefonu: ${telefon || 'Nie podano'}
${cel === 'oferta' ? `
SZCZEGÓŁY ZAPYTANIA O OFERTĘ:
- Urządzenie / Produkt: ${produkt || 'Zapytanie ogólne'}
` : ''}${cel === 'serwis' ? `
SZCZEGÓŁY ZGŁOSZENIA SERWISOWEGO:
- Rodzaj urządzenia: ${rodzajUrzadzenia}
- Model: ${model || 'Nie podano'}
` : ''}
TREŚĆ WIADOMOŚCI / OPIS USTERKI:
${wiadomosc}

============================================================
Zgoda RODO: Zaakceptowano
Adres zwrotny (Reply-To): ${email}
Wiadomość wygenerowana automatycznie z formularza beissbarth.pl
`;

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: process.env.SMTP_FROM || `"Diagnostyka-Systems" <${targetEmail}>`,
      to: targetEmail,
      replyTo: email,
      subject,
      text: textContent,
    });
  } catch (mailError) {
    console.error('[handleContactMessage sendMail error]:', mailError);
    return {
      success: false,
      status: 500,
      error: mailError.message || 'Wystąpił błąd podczas wysyłania wiadomości przez serwer pocztowy.',
    };
  }

  return {
    success: true,
    cel,
    subject,
    targetEmail,
    message: cel === 'serwis'
      ? 'Zgłoszenie serwisowe zostało pomyślnie zarejestrowane. Nasz inżynier techniczny skontaktuje się z Tobą.'
      : 'Dziękujemy. Twoja wiadomość została pomyślnie wysłana. Odpowiemy na wskazany adres e-mail lub numer telefonu.',
  };
}

/**
 * Alias dla kompatybilności wstecznej /api/service-ticket
 */
export async function handleServiceTicket(body, clientIp) {
  return handleContactMessage({ ...body, cel: 'serwis' }, clientIp);
}
