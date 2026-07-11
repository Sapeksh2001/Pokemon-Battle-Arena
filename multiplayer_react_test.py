import sys
import os
import time
from playwright.sync_api import sync_playwright

# Setup screenshot paths
artifacts_dir = "/Users/sapekshsapeksh/.gemini/antigravity-ide/brain/6601837c-5feb-4b0d-9ad7-f7206e07dac7"
os.makedirs(artifacts_dir, exist_ok=True)

def run_test():
    with sync_playwright() as p:
        print("Launching browsers...")
        browser_host = p.chromium.launch(headless=True)
        browser_player = p.chromium.launch(headless=True)
        
        context_host = browser_host.new_context(viewport={"width": 1280, "height": 720})
        context_player = browser_player.new_context(viewport={"width": 1280, "height": 720})
        
        page_host = context_host.new_page()
        page_player = context_player.new_page()
        
        page_host.on("console", lambda msg: print(f"[HOST CONSOLE] {msg.type}: {msg.text}"))
        page_player.on("console", lambda msg: print(f"[PLAYER CONSOLE] {msg.type}: {msg.text}"))

        print("Navigating to app...")
        page_host.goto("http://localhost:5173")
        page_player.goto("http://localhost:5173")
        
        # 1. Login as guest
        print("Logging in as guest...")
        page_host.wait_for_selector("text=Play as Guest")
        page_host.click("text=Play as Guest")
        
        page_player.wait_for_selector("text=Play as Guest")
        page_player.click("text=Play as Guest")
        
        time.sleep(2)
        
        # 2. Host creates a room
        print("Host opening create room modal...")
        page_host.wait_for_selector("#create-room-btn")
        page_host.click("#create-room-btn")
        
        page_host.wait_for_selector("#mp-host-name-input")
        page_host.fill("#mp-host-name-input", "HostTrainer")
        page_host.press("#mp-host-name-input", "Enter")
        
        # Wait for the lobby modal to open and display the 6-digit code
        print("Waiting for room code display (6-digit number)...")
        page_host.wait_for_function("document.getElementById('room-code-display') && /^\d{6}$/.test(document.getElementById('room-code-display').textContent.trim())")
        room_code = page_host.locator("#room-code-display").text_content().strip()
        print(f"Room created successfully. Code: {room_code}")
        
        # 3. Player joins the room
        print("Player opening join room modal...")
        page_player.wait_for_selector("#join-room-btn")
        page_player.click("#join-room-btn")
        
        print("Player filling details...")
        page_player.wait_for_selector("#mp-join-code-input")
        page_player.fill("#mp-join-code-input", room_code)
        page_player.fill("#mp-join-name-input", "PlayerB")
        page_player.press("#mp-join-name-input", "Enter")
        
        # Wait for both to see player list
        print("Waiting for player list to update...")
        time.sleep(6)
        
        # Let's verify player names are present in the list
        host_list_content = page_host.locator("#room-player-list").text_content()
        player_list_content = page_player.locator("#room-player-list").text_content()
        print(f"Host list shows: {host_list_content}")
        print(f"Player list shows: {player_list_content}")
        
        page_host.screenshot(path=os.path.join(artifacts_dir, "host_lobby_sync_success.png"))
        page_player.screenshot(path=os.path.join(artifacts_dir, "player_lobby_sync_success.png"))
        
        if "HostTrainer" in host_list_content and "PlayerB" in host_list_content:
            print("SUCCESS: Both players are visible in the lobby list on Host's screen!")
        else:
            print("FAILURE: Players not visible in Host's lobby list!")
            
        if "HostTrainer" in player_list_content and "PlayerB" in player_list_content:
            print("SUCCESS: Both players are visible in the lobby list on Player B's screen!")
        else:
            print("FAILURE: Players not visible in Player B's lobby list!")
        
        browser_host.close()
        browser_player.close()

if __name__ == "__main__":
    run_test()
