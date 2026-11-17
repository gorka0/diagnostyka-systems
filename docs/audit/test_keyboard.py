import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:5173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def test_keyboard_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(f"{BASE_URL}/")

        focused_elements = []
        for _ in range(12):
            page.keyboard.press("Tab")
            focused = page.evaluate("""() => {
                const el = document.activeElement;
                if (!el || el === document.body) return null;
                const style = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return {
                    tag: el.tagName,
                    text: el.innerText.trim().slice(0, 30),
                    outline: style.outline,
                    boxShadow: style.boxShadow,
                    hasRing: style.boxShadow.includes('rgb') || style.outlineStyle !== 'none'
                };
            }""")
            if focused:
                focused_elements.append(focused)

        browser.close()

    print(json.dumps(focused_elements, indent=2))
    with open(r"d:\home\strony\diagnostyka-systems\docs\audit\keyboard_test_results.json", "w", encoding="utf-8") as f:
        json.dump(focused_elements, f, indent=2)

if __name__ == "__main__":
    test_keyboard_navigation()
