from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(channel="msedge")
    except Exception:
        browser = p.chromium.launch(channel="chrome")
    page = browser.new_page(viewport={"width": 1200, "height": 900})
    page.goto("file:///d:/home/strony/diagnostyka-systems/docs/ref/inspect_visual.html")
    page.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/inspect_visual.png", full_page=True)
    browser.close()
print("inspect_visual.png captured successfully")
