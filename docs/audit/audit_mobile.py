import os
import sys
import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:5173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"d:\home\strony\diagnostyka-systems\docs\audit\screenshots\post_fix"

PAGES_TO_TEST = [
    ("/", "homepage"),
    ("/o-nas", "about"),
    ("/oferta", "offer"),
    ("/produkty", "products"),
    ("/produkty/geometria", "category_geometria"),
    ("/produkty/geometria/ml-1800-8r", "product_ml1800"),
    ("/urzadzenia-oem", "oem"),
    ("/produkty-uzywane", "used"),
    ("/serwis", "service"),
    ("/serwis/zgloszenie", "ticket"),
    ("/realizacje", "realizations"),
    ("/publikacje", "publications"),
    ("/kontakt", "contact"),
    ("/polityka-prywatnosci", "privacy"),
    ("/404-test", "not_found")
]

VIEWPORTS = [
    {"name": "360", "width": 360, "height": 640},
    {"name": "390", "width": 390, "height": 844},
    {"name": "414", "width": 414, "height": 896},
    {"name": "768", "width": 768, "height": 1024},
    {"name": "1024", "width": 1024, "height": 768},
    {"name": "landscape_844x390", "width": 844, "height": 390}
]

def run_mobile_audit():
    results = {
        "overflow_issues": [],
        "input_font_size_issues": [],
        "touch_target_issues": [],
        "tel_mailto_issues": [],
        "hamburger_tests": [],
        "screenshots": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        for vp in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1" if vp["width"] <= 414 or vp["name"].startswith("landscape") else None
            )
            page = context.new_page()

            for path, slug in PAGES_TO_TEST:
                url = f"{BASE_URL}{path}"
                try:
                    page.goto(url, wait_until="networkidle", timeout=15000)
                except Exception as e:
                    page.goto(url, wait_until="load", timeout=15000)

                # Check horizontal scroll / overflow
                overflow_info = page.evaluate("""() => {
                    const docWidth = document.documentElement.scrollWidth;
                    const winWidth = window.innerWidth;
                    const overflows = [];
                    if (docWidth > winWidth + 1) {
                        const all = document.querySelectorAll('*');
                        for (const el of all) {
                            const rect = el.getBoundingClientRect();
                            if (rect.right > winWidth + 1) {
                                overflows.push({
                                    tag: el.tagName,
                                    id: el.id,
                                    className: (el.className || '').toString().slice(0, 80),
                                    right: Math.round(rect.right),
                                    width: Math.round(rect.width)
                                });
                            }
                        }
                    }
                    return {
                        hasOverflow: docWidth > winWidth + 1,
                        scrollWidth: docWidth,
                        innerWidth: winWidth,
                        overflows: overflows.slice(0, 10)
                    };
                }""")

                if overflow_info["hasOverflow"]:
                    results["overflow_issues"].append({
                        "viewport": vp["name"],
                        "path": path,
                        "scrollWidth": overflow_info["scrollWidth"],
                        "innerWidth": overflow_info["innerWidth"],
                        "offenders": overflow_info["overflows"]
                    })

                # Check font size of inputs & selects (< 16px causes iOS zoom)
                input_fonts = page.evaluate("""() => {
                    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea');
                    const smallInputs = [];
                    inputs.forEach(inp => {
                        const style = window.getComputedStyle(inp);
                        const fs = parseFloat(style.fontSize);
                        if (fs < 16) {
                            smallInputs.push({
                                name: inp.name || inp.id || inp.placeholder,
                                fontSize: style.fontSize,
                                tag: inp.tagName
                            });
                        }
                    });
                    return smallInputs;
                }""")
                if input_fonts:
                    results["input_font_size_issues"].append({
                        "viewport": vp["name"],
                        "path": path,
                        "smallInputs": input_fonts
                    })

                # Check phone and email links
                contact_links = page.evaluate("""() => {
                    const links = Array.from(document.querySelectorAll('a'));
                    const telLinks = links.filter(a => a.href.startsWith('tel:'));
                    const mailLinks = links.filter(a => a.href.startsWith('mailto:'));
                    // Look for raw phone numbers in text that might not be wrapped in tel:
                    const bodyText = document.body.innerText;
                    const rawPhoneMatches = bodyText.match(/(?:\\+48\\s*)?\\d{3}\\s*\\d{3}\\s*\\d{3}/g) || [];
                    return {
                        telCount: telLinks.length,
                        mailCount: mailLinks.length,
                        phonesFound: rawPhoneMatches.length
                    };
                }""")

                # Take screenshot on 360, 390, 768, 1024, landscape for key pages
                if vp["name"] in ["360", "390", "768", "1024", "landscape_844x390"] and slug in ["homepage", "ticket", "contact", "product_ml1800", "category_geometria"]:
                    shot_path = os.path.join(OUTPUT_DIR, f"{slug}_{vp['name']}.png")
                    page.screenshot(path=shot_path, full_page=False)
                    results["screenshots"].append(shot_path)

            # Test hamburger menu specifically on mobile viewport 390
            if vp["name"] == "390":
                page.goto(f"{BASE_URL}/", wait_until="networkidle")
                
                # Check hamburger button
                btn_info = page.evaluate("""() => {
                    const btn = document.querySelector('button[aria-label*="menu" i], button[aria-label*="nawigacj" i], header button');
                    if (!btn) return null;
                    const rect = btn.getBoundingClientRect();
                    return {
                        ariaLabel: btn.getAttribute('aria-label'),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        is44px: rect.width >= 44 && rect.height >= 44
                    };
                }""")

                # Click hamburger
                hamburger_test = {"button_info": btn_info, "open_success": False, "body_locked": False, "close_success": False}
                try:
                    # Look for hamburger button
                    btn = page.locator('header button').first
                    btn.click()
                    page.wait_for_timeout(300)

                    # Check if menu visible and body scroll locked
                    body_overflow = page.evaluate("() => document.body.style.overflow")
                    menu_visible = page.locator('nav, [role="dialog"], [aria-modal="true"]').count() > 0
                    
                    shot_menu = os.path.join(OUTPUT_DIR, "menu_opened_390.png")
                    page.screenshot(path=shot_menu)
                    results["screenshots"].append(shot_menu)

                    hamburger_test["open_success"] = menu_visible
                    hamburger_test["body_locked"] = body_overflow in ["hidden", "clip"]

                    # Click close or outside or click button again
                    btn.click()
                    page.wait_for_timeout(300)
                    body_overflow_after = page.evaluate("() => document.body.style.overflow")
                    hamburger_test["close_success"] = body_overflow_after != "hidden"
                except Exception as e:
                    hamburger_test["error"] = str(e)

                results["hamburger_tests"].append(hamburger_test)

            context.close()

        browser.close()

    report_path = r"d:\home\strony\diagnostyka-systems\docs\audit\mobile_audit_report_postfix.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Mobile audit finished. Report saved to {report_path}")

if __name__ == "__main__":
    run_mobile_audit()
