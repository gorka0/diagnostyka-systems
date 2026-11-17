<?php
/**
 * Diagnostyka-Systems s.c. - PHP Mail Transport Fallback
 * Dla tradycyjnego hostingu współdzielonego (Apache / Nginx + PHP)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metoda niedozwolona']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nieprawidłowy format danych JSON']);
    exit;
}

// Honeypot check
if (!empty($data['website']) || !empty($data['_gotcha'])) {
    echo json_encode(['success' => true, 'message' => 'Przyjęto']);
    exit;
}

$targetEmail = 'poczta@beissbarth-service.pl';
$type = isset($_GET['type']) ? $_GET['type'] : (isset($data['typUrzadzenia']) ? 'service' : 'contact');

if ($type === 'service') {
    $firma = htmlspecialchars(trim($data['firma'] ?? ''));
    $osoba = htmlspecialchars(trim($data['osoba'] ?? ''));
    $telefon = htmlspecialchars(trim($data['telefon'] ?? ''));
    $email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $typUrzadzenia = htmlspecialchars(trim($data['typUrzadzenia'] ?? ''));
    $model = htmlspecialchars(trim($data['model'] ?? ''));
    $opis = htmlspecialchars(trim($data['opisUsterki'] ?? ''));
    $zgoda = !empty($data['zgodaRODO']);

    if (!$firma || !$osoba || !$telefon || !$email || !$typUrzadzenia || !$opis || !$zgoda) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Wypełnij wszystkie wymagane pola formularza.']);
        exit;
    }

    $subject = "=?UTF-8?B?" . base64_encode("[Zgłoszenie serwisowe] {$firma}, " . ($model ?: $typUrzadzenia)) . "?=";
    $body = "ZGŁOSZENIE SERWISOWE BEISSBARTH / VALEO\n";
    $body .= "Data: " . date('Y-m-d H:i:s') . "\n\n";
    $body .= "Firma: {$firma}\n";
    $body .= "Osoba kontaktowa: {$osoba}\n";
    $body .= "Telefon: {$telefon}\n";
    $body .= "E-mail: {$email}\n";
    $body .= "Typ urządzenia: {$typUrzadzenia}\n";
    $body .= "Model / Nr seryjny: {$model}\n\n";
    $body .= "Opis usterki:\n{$opis}\n\n";
    $body .= "Zgoda RODO: Zaakceptowano\n";

    $headers = "From: Diagnostyka-Systems Serwis <{$targetEmail}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sent = @mail($targetEmail, $subject, $body, $headers);
    if ($sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Zgłoszenie serwisowe zostało pomyślnie wysłane.',
            'ticketNumber' => 'DS-' . substr(time(), -6)
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Błąd wysyłki e-mail przez funkcję mail().']);
    }
    exit;
}

// Contact form
$imie = htmlspecialchars(trim($data['imieNazwisko'] ?? ''));
$firma = htmlspecialchars(trim($data['firma'] ?? ''));
$telefon = htmlspecialchars(trim($data['telefon'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$temat = htmlspecialchars(trim($data['tematProdukt'] ?? 'Zapytanie ogólne'));
$wiadomosc = htmlspecialchars(trim($data['wiadomosc'] ?? ''));
$zgoda = !empty($data['zgodaRODO']);

if (!$imie || !$email || !$wiadomosc || !$zgoda) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Wypełnij wymagane pola (Imię i nazwisko, E-mail, Wiadomość).']);
    exit;
}

$subject = "=?UTF-8?B?" . base64_encode("[Zapytanie ze strony] {$temat} - {$imie}") . "?=";
$body = "NOWE ZAPYTANIE ZE STRONY WWW\n";
$body .= "Data: " . date('Y-m-d H:i:s') . "\n\n";
$body .= "Nadawca: {$imie}\n";
$body .= "Firma: {$firma}\n";
$body .= "Telefon: {$telefon}\n";
$body .= "E-mail: {$email}\n";
$body .= "Temat / Produkt: {$temat}\n\n";
$body .= "Wiadomość:\n{$wiadomosc}\n\n";
$body .= "Zgoda RODO: Zaakceptowano\n";

$headers = "From: Diagnostyka-Systems Kontakt <{$targetEmail}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($targetEmail, $subject, $body, $headers);
if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Dziękujemy. Wiadomość została pomyślnie wysłana.'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Błąd wysyłki e-mail.']);
}
