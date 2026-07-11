import sys
import os
import time
from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Log all errors and console messages with detailed formatting
        page.on("console", lambda msg: print(f"[CONSOLE] {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"[PAGE ERROR STACK]\n{err.stack}\n"))

        print("Navigating to app...")
        page.goto("http://localhost:5173")
        
        page.wait_for_selector("text=Play as Guest")
        page.click("text=Play as Guest")
        
        time.sleep(2)
        
        page.wait_for_selector("#create-room-btn")
        page.click("#create-room-btn")
        
        page.wait_for_selector("#mp-host-name-input")
        page.fill("#mp-host-name-input", "HostTrainer")
        page.press("#mp-host-name-input", "Enter")
        
        # Wait a few seconds to let React render/crash
        time.sleep(5)
        
        browser.close()

if __name__ == "__main__":
    run_test()
