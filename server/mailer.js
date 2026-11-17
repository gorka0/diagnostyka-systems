import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prosty in-memory rate limiting (max 5 zapytań na 10 minut na IP)
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
        const logsDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logsDir)) {
          fs.mkdirSync(logsDir, { recursive: true });
        }

        const logEntry = {
          timestamp: new Date().toISOString(),
          to: mailOptions.to,
          from: mailOptions.from,
          replyTo: mailOptions.replyTo,
          subject: mailOptions.subject,
          text: mailOptions.text,
        };

        const logFilePath = path.join(logsDir, 'emails.log');
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
        fs.appendFileSync(logFilePath, formattedEntry, 'utf-8');
        console.log(`[DEV EMAIL LOGGED] Do: ${logEntry.to} | Temat: ${logEntry.subject} -> Zapisano w server/logs/emails.log`);

        return { messageId: `mock-${Date.now()}`, response: 'Logged to file' };
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

      return transporter.sendMail(mailOptions);
    },
  };
}

/**
 * Obsługa formularza zgłoszenia serwisowego
 */
export async function handleServiceTicket(body, clientIp) {
  // 1. Honeypot check (bot prevention)
  if (body.website || body._gotcha) {
    console.warn(`[BOT DETECTED] Honeypot filled from IP: ${clientIp}`);
    return { success: true, message: 'Zgłoszenie przyjęte.' }; // cichy sukces dla botów
  }

  // 2. Rate limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return { success: false, error: rateLimit.message, status: 429 };
  }

  // 3. Walidacja pól wymaganych
  const firma = sanitize(body.firma);
  const osoba = sanitize(body.osoba);
  const telefon = sanitize(body.telefon);
  const email = sanitize(body.email);
  const typUrzadzenia = sanitize(body.typUrzadzenia);
  const model = sanitize(body.model);
  const opisUsterki = sanitizeMultiline(body.opisUsterki);
  const zgodaRODO = body.zgodaRODO === true || body.zgodaRODO === 'true';

  if (!firma || !osoba || !telefon || !email || !opisUrzadzeniaValidation(typUrzadzenia) || !opisUsterki) {
    return {
      success: false,
      error: 'Wypełnij wszystkie wymagane pola formularza zgłoszenia.',
      status: 400,
    };
  }

  if (!validateEmail(email)) {
    return { success: false, error: 'Podaj poprawny adres e-mail.', status: 400 };
  }

  if (!zgodaRODO) {
    return { success: false, error: 'Wymagana jest akceptacja przetwarzania danych (RODO).', status: 400 };
  }

  // 4. Przygotowanie treści e-maila do firmy
  const targetEmail = process.env.MAIL_TARGET_ADDRESS || 'poczta@beissbarth-service.pl';
  const subject = `[Zgłoszenie serwisowe] ${firma}, ${model || typUrzadzenia}`;

  const textContent = `
ZGŁOSZENIE SERWISOWE BEISSBARTH / VALEO
============================================================
Data zgłoszenia: ${new Date().toLocaleString('pl-PL')}
Adres IP klienta: ${clientIp}

DANE ZGŁASZAJĄCEGO:
- Firma: ${firma}
- Osoba kontaktowa: ${osoba}
- Numer telefonu: ${telefon}
- E-mail kontaktowy: ${email}

DANE APARATURY:
- Typ urządzenia: ${typUrzadzenia}
- Model / Numer seryjny: ${model || 'Nie podano'}

OPIS USTERKI / ZAKRES PRAC:
${opisUsterki}

============================================================
Zgoda RODO: Zaakceptowano
Wiadomość wygenerowana automatycznie z formularza beissbarth-service.pl
`;

  const transport = getMailTransport();
  await transport.sendMail({
    from: process.env.SMTP_FROM || `"Diagnostyka-Systems Serwis" <${targetEmail}>`,
    to: targetEmail,
    replyTo: email,
    subject,
    text: textContent,
  });

  return {
    success: true,
    message: 'Zgłoszenie serwisowe zostało pomyślnie przesłane do działu technicznego Diagnostyka-Systems.',
    ticketNumber: `DS-${Date.now().toString().slice(-6)}`,
  };
}

/**
 * Obsługa formularza kontaktowego
 */
export async function handleContactMessage(body, clientIp) {
  // 1. Honeypot check
  if (body.website || body._gotcha) {
    console.warn(`[BOT DETECTED] Honeypot filled from IP: ${clientIp}`);
    return { success: true, message: 'Wiadomość przyjęta.' };
  }

  // 2. Rate limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return { success: false, error: rateLimit.message, status: 429 };
  }

  // 3. Walidacja pól
  const imieNazwisko = sanitize(body.imieNazwisko);
  const firma = sanitize(body.firma);
  const telefon = sanitize(body.telefon);
  const email = sanitize(body.email);
  const tematProdukt = sanitize(body.tematProdukt);
  const wiadomosc = sanitizeMultiline(body.wiadomosc);
  const zgodaRODO = body.zgodaRODO === true || body.zgodaRODO === 'true';

  if (!imieNazwisko || !email || !wiadomosc) {
    return {
      success: false,
      error: 'Wypełnij wymagane pola (Imię i nazwisko, E-mail, Wiadomość).',
      status: 400,
    };
  }

  if (!validateEmail(email)) {
    return { success: false, error: 'Podaj poprawny adres e-mail.', status: 400 };
  }

  if (!zgodaRODO) {
    return { success: false, error: 'Wymagana jest akceptacja przetwarzania danych (RODO).', status: 400 };
  }

  // 4. Przygotowanie wiadomości
  const targetEmail = process.env.MAIL_TARGET_ADDRESS || 'poczta@beissbarth-service.pl';
  const subject = `[Zapytanie ze strony] ${tematProdukt ? tematProdukt + ' - ' : ''}${imieNazwisko}`;

  const textContent = `
NOWE ZAPYTANIE ZE STRONY WWW
============================================================
Data wysłania: ${new Date().toLocaleString('pl-PL')}
Adres IP: ${clientIp}

NADAWCA:
- Imię i nazwisko: ${imieNazwisko}
- Firma: ${firma || 'Osoba prywatna / brak'}
- Telefon: ${telefon || 'Nie podano'}
- E-mail: ${email}
- Temat / Dotyczy produktu: ${tematProdukt || 'Zapytanie ogólne'}

TREŚĆ WIADOMOŚCI:
${wiadomosc}

============================================================
Zgoda RODO: Zaakceptowano
Odpowiedz bezpośrednio na ten e-mail, aby skontaktować się z nadawcą.
`;

  const transport = getMailTransport();
  await transport.sendMail({
    from: process.env.SMTP_FROM || `"Diagnostyka-Systems Kontakt" <${targetEmail}>`,
    to: targetEmail,
    replyTo: email,
    subject,
    text: textContent,
  });

  return {
    success: true,
    message: 'Dziękujemy. Twoja wiadomość została pomyślnie wysłana. Odpowiemy w najbliższym dniu roboczym.',
  };
}

function opisUrzadzeniaValidation(val) {
  return typeof val === 'string' && val.length > 0;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
