import { handleServiceTicket, handleContactMessage } from './mailer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runDevTests() {
  console.log('--- TEST 1: Zgłoszenie serwisowe (Dev Mode) ---');
  const servicePayload = {
    firma: 'ASO Auto-Centrum Bydgoszcz',
    osoba: 'Krzysztof Nowak (Kierownik Serwisu)',
    telefon: '501 234 567',
    email: 'krzysztof.nowak@auto-centrum.example.pl',
    typUrzadzenia: 'Geometria 3D',
    model: 'Beissbarth ML 8 ROC (SN: 2018-88412)',
    opisUsterki: 'Występuje błąd komunikacji z lewą przednią głowicą CCD po uruchomieniu programu pomiarowego. Proszę o pilną kalibrację i diagnostykę na stanowisku.',
    zgodaRODO: true,
  };

  const serviceResult = await handleServiceTicket(servicePayload, '127.0.0.1');
  console.log('Wynik zgłoszenia serwisowego:', serviceResult);

  console.log('\n--- TEST 2: Formularz kontaktowy z zapytaniem o produkt (Dev Mode) ---');
  const contactPayload = {
    imieNazwisko: 'Michał Wiśniewski',
    firma: 'Okręgowa Stacja Kontroli Pojazdów Wiśniewski',
    telefon: '602 987 654',
    email: 'biuro@oskp-wisniewski.example.pl',
    tematProdukt: 'Geometria Beissbarth Q.Lign 3D Compact',
    wiadomosc: 'Dzień dobry, proszę o przesłanie szczegółowej oferty cenowej oraz specyfikacji technicznej urządzenia Q.Lign 3D z opcją montażu i szkolenia na terenie woj. kujawsko-pomorskiego.',
    zgodaRODO: true,
  };

  const contactResult = await handleContactMessage(contactPayload, '127.0.0.1');
  console.log('Wynik formularza kontaktowego:', contactResult);

  console.log('\n--- TEST 3: Honeypot / Bot defense ---');
  const botPayload = {
    firma: 'Spam Corp',
    osoba: 'Bot',
    telefon: '123',
    email: 'bot@spam.com',
    typUrzadzenia: 'Inne',
    opisUsterki: 'Buy crypto',
    website: 'http://spam-link.example.com', // Honeypot trap!
    zgodaRODO: true,
  };
  const botResult = await handleServiceTicket(botPayload, '192.168.1.99');
  console.log('Wynik zgłoszenia bota (powinien być cichy sukces):', botResult);

  // Weryfikacja zawartości pliku logów
  const logFile = path.join(__dirname, 'logs', 'emails.log');
  if (fs.existsSync(logFile)) {
    const logContent = fs.readFileSync(logFile, 'utf-8');
    console.log(`\n Plik ${logFile} został zaktualizowany (${logContent.length} bajtów).`);
    console.log('Ostatnie 30 linii logu:');
    const lines = logContent.trim().split('\n');
    console.log(lines.slice(-30).join('\n'));
  }
}

runDevTests().catch(console.error);
