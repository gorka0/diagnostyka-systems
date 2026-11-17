from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(channel="msedge")
    except Exception:
        browser = p.chromium.launch(channel="chrome")
        
    # 1. Desktop 1280px
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("http://127.0.0.1:5173/", wait_until="networkidle")
    page.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/live_header_desktop.png", clip={"x": 0, "y": 0, "width": 1280, "height": 160})
    
    # 2. Crop tightly on the logo in the header
    logo_el = page.locator("header img[src*='ds-logo']").first
    if logo_el:
        logo_el.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/live_logo_header_tight.png")
        print("Tight header logo screenshot saved")
        
    # 3. Mobile 390px
    page_m = browser.new_page(viewport={"width": 390, "height": 844})
    page_m.goto("http://127.0.0.1:5173/", wait_until="networkidle")
    page_m.screenshot(path="d:/home/strony/diagnostyka-systems/docs/ref/live_header_mobile.png", clip={"x": 0, "y": 0, "width": 390, "height": 140})
    
    browser.close()

print("All live screenshots captured successfully!")
