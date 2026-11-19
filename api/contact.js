import { handleContactMessage } from '../server/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metoda niedozwolona (tylko POST)' });
  }

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const result = await handleContactMessage(body, clientIp);
    return res.status(result.status || 200).json(result);
  } catch (error) {
    console.error('[API /api/contact error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Błąd przetwarzania wiadomości.',
    });
  }
}
