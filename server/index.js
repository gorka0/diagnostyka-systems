import http from 'http';
import dotenv from 'dotenv';
import { handleServiceTicket, handleContactMessage } from './mailer.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      // Zabezpieczenie przed zbyt dużym payloadem (> 1MB)
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Nagłówki CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'POST' && url.pathname === '/api/service-ticket') {
    try {
      const body = await parseJsonBody(req);
      const result = await handleServiceTicket(body, clientIp);
      res.writeHead(result.status || 200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(result));
    } catch (err) {
      console.error('[SERVER ERROR /api/service-ticket]:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: 'Wewnętrzny błąd serwera pocztowego.' }));
    }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    try {
      const body = await parseJsonBody(req);
      const result = await handleContactMessage(body, clientIp);
      res.writeHead(result.status || 200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(result));
    } catch (err) {
      console.error('[SERVER ERROR /api/contact]:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: 'Wewnętrzny błąd serwera pocztowego.' }));
    }
    return;
  }

  // 404 dla nieznanych tras API
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: false, error: 'Endpoint nie istnieje' }));
});

server.listen(PORT, () => {
  console.log(`[DIAGNOSTYKA-SYSTEMS MAILER] Serwer API uruchomiony na porcie ${PORT}`);
  console.log(`- POST http://localhost:${PORT}/api/service-ticket`);
  console.log(`- POST http://localhost:${PORT}/api/contact`);
});
