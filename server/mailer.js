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
/**
 * Buduje responsywny szablon HTML wiadomości e-mail w stylu strony Beissbarth / Diagnostyka-Systems:
 * - Ciemny, techniczny nagłówek grafitowy (#14171A) z markowym bursztynem (#EE9D16)
 * - Pasek szybkich akcji bezpośrednich (odpowiedz e-mail, zadzwoń jednym kliknięciem)
 * - Czytelna siatka danych nadawcy i parametrów sprawy
 * - Wyróżniony blok treści z lewym akcentem
 * - Stopka techniczna ze stemplem czasowym, IP i RODO
 */
export function buildEmailHtml({
  cel,
  imieNazwisko,
  firma,
  email,
  telefon,
  produkt,
  rodzajUrzadzenia,
  model,
  wiadomosc,
  clientIp,
  subject,
}) {
  const formattedDate = new Date().toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const celTitle =
    cel === 'serwis'
      ? 'Zgłoszenie serwisowe'
      : cel === 'oferta'
      ? 'Zapytanie o ofertę'
      : 'Pytanie ogólne';

  const celBadgeBg = cel === 'serwis' ? '#EE9D16' : cel === 'oferta' ? '#F5A524' : '#2A3036';
  const celBadgeText = cel === 'ogolne' ? '#FFFFFF' : '#14171A';

  const cleanPhone = telefon ? telefon.replace(/[^\d+]/g, '') : '';
  const escapedMessage = (wiadomosc || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F7F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2328; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F7F7F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Główny arkusz e-mail (600px) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D9DDE1; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <!-- Pasek nagłówkowy: ciemny grafit #14171A z bursztynową krawędzią -->
          <tr>
            <td style="background-color: #14171A; padding: 26px 32px; border-bottom: 3px solid #EE9D16;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #EE9D16; margin-bottom: 6px;">
                      DIAGNOSTYKA-SYSTEMS • BEISSBARTH
                    </div>
                    <div style="margin: 0; font-size: 19px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                      Nowa wiadomość ze strony www
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: ${celBadgeBg}; color: ${celBadgeText}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 6px;">
                      ${celTitle}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pasek szybkich akcji (One-Click Reply & Call) -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 14px 32px; border-bottom: 1px solid #E5E7EB;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size: 13px; color: #4B5563;">
                    Bezpośredni kontakt:
                  </td>
                  <td align="right">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background-color: #1F2328; color: #FFFFFF; font-size: 12px; font-weight: 600; text-decoration: none; padding: 7px 13px; border-radius: 6px; margin-right: 6px;">
                      ✉ Odpowiedz e-mail
                    </a>
                    ${
                      cleanPhone
                        ? `<a href="tel:${cleanPhone}" style="display: inline-block; background-color: #EE9D16; color: #14171A; font-size: 12px; font-weight: 700; text-decoration: none; padding: 7px 13px; border-radius: 6px;">
                            📞 Zadzwoń: ${telefon}
                          </a>`
                        : ''
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Treść główna formularza -->
          <tr>
            <td style="padding: 28px 32px;">

              <!-- Tabela: DANE NADAWCY -->
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6B7280; margin-bottom: 10px;">
                DANE NADAWCY
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563; width: 140px;">
                    Imię i nazwisko:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 600; color: #1F2328;">
                    ${imieNazwisko}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563;">
                    Firma / Warsztat:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 600; color: #1F2328;">
                    ${firma || '<span style="color: #9CA3AF; font-weight: 400;">Klient indywidualny</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563;">
                    Adres e-mail:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 600; color: #1F2328;">
                    <a href="mailto:${email}" style="color: #A15C00; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563;">
                    Numer telefonu:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 600; color: #1F2328;">
                    ${
                      cleanPhone
                        ? `<a href="tel:${cleanPhone}" style="color: #1F2328; text-decoration: none; font-weight: 700;">${telefon}</a>`
                        : '<span style="color: #9CA3AF; font-weight: 400;">Nie podano</span>'
                    }
                  </td>
                </tr>
              </table>

              ${
                cel === 'oferta'
                  ? `<!-- Szczegóły oferty -->
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6B7280; margin-bottom: 10px;">
                ZAPYTANIE O APARATURĘ
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563; width: 140px;">
                    Urządzenie:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 700; color: #A15C00;">
                    ${produkt || 'Zapytanie ogólne o ofertę'}
                  </td>
                </tr>
              </table>`
                  : ''
              }

              ${
                cel === 'serwis'
                  ? `<!-- Szczegóły serwisu -->
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6B7280; margin-bottom: 10px;">
                SZCZEGÓŁY ZGŁOSZENIA SERWISOWEGO
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563; width: 140px;">
                    Rodzaj aparatury:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 700; color: #1F2328;">
                    ${rodzajUrzadzenia}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 14px; color: #4B5563;">
                    Model urządzenia:
                  </td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #F1F3F5; font-size: 15px; font-weight: 600; color: #1F2328;">
                    ${model || '<span style="color: #9CA3AF; font-weight: 400;">Nie podano</span>'}
                  </td>
                </tr>
              </table>`
                  : ''
              }

              <!-- Treść wiadomości / Opis usterki -->
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6B7280; margin-bottom: 10px;">
                ${cel === 'serwis' ? 'OPIS USTERKI / USŁUGI' : 'TREŚĆ WIADOMOŚCI'}
              </div>
              <div style="background-color: #F7F7F5; border: 1px solid #E5E7EB; border-left: 4px solid #EE9D16; border-radius: 8px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #1F2328; margin-bottom: 10px;">
                ${escapedMessage}
              </div>

            </td>
          </tr>

          <!-- Stopka techniczna -->
          <tr>
            <td style="background-color: #F7F7F5; padding: 20px 32px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; line-height: 1.5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-weight: 600; color: #1F2328;">Diagnostyka-Systems s.c. • Autoryzowany Serwis Beissbarth</div>
                    <div style="color: #9CA3AF; margin-top: 4px;">
                      Wysłano: ${formattedDate} • IP: ${clientIp} • Zgoda RODO: Zaakceptowano
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://beissbarth.pl" target="_blank" style="color: #A15C00; font-weight: 700; text-decoration: none; font-size: 13px;">
                      beissbarth.pl →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
      // Auto-korekta: poczta.home.pl (62.129.245.180) to webmail blokujący połączenia SMTP z zewnątrz (ETIMEDOUT).
      // Prawidłowym serwerem pocztowym domeny beissbarth-service.pl jest beissbarth-service.pl (79.96.215.238).
      let host = process.env.SMTP_HOST;
      if (host === 'poczta.home.pl' || host === '62.129.245.180') {
        console.warn(`[SMTP AUTO-FIX] Zamiana błędnego hosta '${host}' na właściwy serwer domeny 'beissbarth-service.pl'`);
        host = 'beissbarth-service.pl';
      }

      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const secure = process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === 'true'
        : port === 465;

      const transporterConfig = {
        host,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
        tls: {
          rejectUnauthorized: false,
        },
      };

      try {
        const transporter = nodemailer.createTransport(transporterConfig);
        return await transporter.sendMail(mailOptions);
      } catch (smtpErr) {
        console.error('[SMTP SendMail Error]:', smtpErr);

        // Jeśli port 465 miał timeout i port nie był sztywno zdefiniowany w env, spróbuj portu 587 (STARTTLS)
        if (
          (smtpErr.code === 'ETIMEDOUT' || smtpErr.code === 'ECONNREFUSED' || smtpErr.message?.includes('ETIMEDOUT')) &&
          port === 465 &&
          !process.env.SMTP_PORT
        ) {
          console.warn('[SMTP RETRY] Próba wysyłki przez alternatywny port 587 (STARTTLS)...');
          try {
            const fallbackTransporter = nodemailer.createTransport({
              ...transporterConfig,
              port: 587,
              secure: false,
              requireTLS: true,
            });
            return await fallbackTransporter.sendMail(mailOptions);
          } catch (retryErr) {
            console.error('[SMTP Retry 587 Error]:', retryErr);
          }
        }

        // Log zapasowy w razie problemów z siecią/SMTP – zapytanie nigdy nie przepada
        console.warn('[FALLBACK FORM DISPATCH LOGGED]:', {
          to: mailOptions.to,
          replyTo: mailOptions.replyTo,
          subject: mailOptions.subject,
          text: mailOptions.text,
        });
        throw new Error(`Błąd wysyłki e-mail przez serwer SMTP (${host}:${port}): ${smtpErr.message || 'Nieudane połączenie'}`);
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

  const htmlContent = buildEmailHtml({
    cel,
    imieNazwisko,
    firma,
    email,
    telefon,
    produkt,
    rodzajUrzadzenia,
    model,
    wiadomosc,
    clientIp,
    subject,
  });

  // Nadawca wiadomości (MAIL FROM) - musi należeć do uwierzytelnionego konta SMTP (np. formularz@beissbarth-service.pl),
  // inaczej serwer pocztowy (home.pl) odrzuca wysyłkę z błędem 553 (Sender address rejected: not owned by user).
  const smtpUser = process.env.SMTP_USER || 'formularz@beissbarth-service.pl';
  const customFrom = process.env.SMTP_FROM;
  const isCustomDomainSender =
    customFrom &&
    (customFrom.includes('@beissbarth-service.pl') || customFrom.includes('@beissbarth.pl'));
  const senderEmail = isCustomDomainSender ? customFrom : smtpUser;
  const fromHeader = `"Diagnostyka-Systems" <${senderEmail}>`;

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: fromHeader,
      to: targetEmail,
      replyTo: email,
      subject,
      text: textContent,
      html: htmlContent,
      envelope: {
        from: senderEmail,
        to: targetEmail,
      },
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
