import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:5173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_form_tests():
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        # --- Test 1: Kontakt - Puste pola ---
        page.goto(f"{BASE_URL}/kontakt")
        page.click('button[type="submit"]')
        # Sprawdź stan walidacji HTML5
        is_invalid = page.evaluate("""() => {
            const input = document.querySelector('input[name="imieNazwisko"]');
            return input ? input.validity.valueMissing : false;
        }""")
        results["contact_empty_validation"] = "Passed" if is_invalid else "Failed"

        # --- Test 2: Kontakt - Zły e-mail ---
        page.fill('input[name="imieNazwisko"]', "Jan Kowalski")
        page.fill('input[name="email"]', "niepoprawny-email")
        page.fill('textarea[name="wiadomosc"]', "Testowa wiadomość")
        # Checkbox RODO
        page.check('input[name="zgodaRODO"]')
        page.click('button[type="submit"]')
        email_invalid = page.evaluate("""() => {
            const input = document.querySelector('input[name="email"]');
            return input ? (input.validity.typeMismatch || !input.validity.valid) : false;
        }""")
        results["contact_invalid_email"] = "Passed" if email_invalid else "Failed"

        # --- Test 3: Kontakt - Poprawne dane ---
        page.fill('input[name="email"]', "test@example.com")
        page.fill('input[name="firma"]', "Warsztat Auto-Test")
        page.fill('input[name="telefon"]', "500 600 700")
        page.fill('input[name="tematProdukt"]', "Pytanie o wyważarkę MT 788")
        page.click('button[type="submit"]')
        page.wait_for_timeout(1000)
        success_visible = page.locator('text=Dziękujemy za kontakt').count() > 0 or page.locator('text=Wiadomość została wysłana').count() > 0
        results["contact_valid_submission"] = "Passed" if success_visible else "Failed"

        # --- Test 4: Zgłoszenie serwisowe - Poprawne dane ---
        page.goto(f"{BASE_URL}/serwis/zgloszenie")
        page.fill('input[name="firma"]', "Serwis Opon Test")
        page.fill('input[name="osoba"]', "Marek Nowak")
        page.fill('input[name="telefon"]', "501 202 303")
        page.fill('input[name="email"]', "marek@opon-test.pl")
        page.select_option('select[name="typUrzadzenia"]', value="Geometria kół 3D / CCD")
        page.fill('input[name="model"]', "ML 8 ROC")
        page.fill('textarea[name="opisUsterki"]', "Kalibracja kamer głowic pomiarowych po wymianie stanowiska.")
        page.check('input[name="zgodaRODO"]')
        page.click('button[type="submit"]')
        page.wait_for_timeout(1000)
        ticket_success = page.locator('text=Zgłoszenie zostało przyjęte').count() > 0 or page.locator('text=Numer zgłoszenia').count() > 0
        results["ticket_valid_submission"] = "Passed" if ticket_success else "Failed"

        # --- Test 5: Honeypot Test via direct fetch ---
        honeypot_res = page.evaluate("""async () => {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imieNazwisko: 'Spam Bot',
                    email: 'bot@spam.com',
                    wiadomosc: 'Buy crypto',
                    zgodaRODO: true,
                    website: 'http://spam-link.ru'
                })
            });
            const data = await res.json();
            return { status: res.status, data };
        }""")
        results["honeypot_silent_drop"] = "Passed" if (honeypot_res["status"] == 200 and honeypot_res["data"].get("success") == True) else "Failed"

        browser.close()

    print(json.dumps(results, indent=2))
    with open(r"d:\home\strony\diagnostyka-systems\docs\audit\form_test_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run_form_tests()
