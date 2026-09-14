import { test, expect } from '@playwright/test';

test.describe('Pokemon Battle Arena Comprehensive Feature & Bug Test', () => {
  test('Complete end-to-end features and bug scan', async ({ page }) => {
    test.setTimeout(120000);

    const consoleMessages = [];
    const pageErrors = [];
    const failedRequests = [];

    // Automatically accept any confirm/alert dialogs (e.g. quit battle confirm)
    page.on('dialog', async dialog => {
      console.log(`[Dialog] ${dialog.type()}: "${dialog.message()}" -> Accepted`);
      await dialog.accept();
    });

    page.on('console', msg => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
      if (msg.type() === 'error') {
        console.error(`PAGE CONSOLE ERROR: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
      console.error(`UNCAUGHT PAGE ERROR: ${error.message}\n${error.stack}`);
    });

    page.on('requestfailed', req => {
      if (!req.url().includes('google-analytics.com')) {
        failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
        console.warn(`FAILED REQUEST: ${req.url()} (${req.failure()?.errorText})`);
      }
    });

    // 1. Navigation & Initial Load
    console.log('--- Step 1: Navigating to Live Firebase URL ---');
    await page.goto('https://pokemon-1248.web.app', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Pokémon Battle Arena/);
    await page.screenshot({ path: 'test_artifacts/01_initial_landing.png' });

    // 2. Verify Authentication Screen
    console.log('--- Step 2: Auth Screen Verification ---');
    const authHeader = page.locator('text=ARENA ACCESS');
    await expect(authHeader).toBeVisible({ timeout: 15000 });
    
    const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
    const guestBtn = page.getByRole('button', { name: /Play as Guest/i });
    await expect(googleBtn).toBeVisible();
    await expect(guestBtn).toBeVisible();

    // 3. Login as Guest
    console.log('--- Step 3: Logging in as Guest ---');
    await guestBtn.click();
    await page.screenshot({ path: 'test_artifacts/02_after_guest_click.png' });

    // Wait for Lobby view to be displayed
    const lobbyView = page.locator('#lobby-view');
    await expect(lobbyView).toBeVisible({ timeout: 25000 });
    console.log('Successfully transitioned to Lobby View!');
    await page.screenshot({ path: 'test_artifacts/03_lobby_view.png' });

    // 4. Test Lobby Controls & Profile Sync
    console.log('--- Step 4: Testing Lobby Elements & Controls ---');
    const trainerInput = page.locator('#trainer-name-input');
    await expect(trainerInput).toBeVisible();
    
    console.log('Updating trainer name to "Champion Ash"...');
    await trainerInput.fill('Champion Ash');
    const saveNameBtn = page.getByRole('button', { name: 'SAVE', exact: true });
    if (await saveNameBtn.isEnabled()) {
      await saveNameBtn.click();
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: 'test_artifacts/04_trainer_name_updated.png' });

    // 5. Test Quick Play Modal Flow
    console.log('--- Step 5: Testing Quick Play Modal ---');
    const quickBattleBtn = page.locator('#quick-battle-btn');
    await expect(quickBattleBtn).toBeVisible();
    await quickBattleBtn.click();

    const quickPlayModal = page.locator('#quick-play-modal');
    await expect(quickPlayModal).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test_artifacts/05_quick_play_modal.png' });

    // Toggle tier options
    console.log('Selecting Quick Play settings...');
    const selectAllTiersBtn = quickPlayModal.getByRole('button', { name: 'Select All' });
    if (await selectAllTiersBtn.isVisible()) {
      await selectAllTiersBtn.click();
      await page.waitForTimeout(500);
    }

    // 6. Start Quick Battle
    console.log('--- Step 6: Starting Quick Battle ---');
    const startBattleBtn = quickPlayModal.locator('button:has-text("START QUICK BATTLE")');
    await expect(startBattleBtn).toBeVisible();
    await startBattleBtn.click();

    // 7. Verify Transition to Arena View
    console.log('--- Step 7: Verifying Arena View ---');
    const arenaView = page.locator('#arena-view');
    await expect(arenaView).not.toHaveClass(/hidden/, { timeout: 20000 });
    await page.waitForTimeout(3000); // Allow arena engine render
    await page.screenshot({ path: 'test_artifacts/06_arena_battle_started.png' });

    // Verify Arena Components
    const endRoundBtn = page.locator('#end-round-btn');
    await expect(endRoundBtn).toBeVisible();
    
    const timerDisplay = page.locator('#timer-display');
    await expect(timerDisplay).toBeVisible();
    console.log('Timer Display Initial Value:', await timerDisplay.innerText());

    // Test Timer Controls
    console.log('Testing Timer Play / Pause / Reset...');
    const timerStart = page.locator('#timer-start');
    const timerPause = page.locator('#timer-pause');
    const timerReset = page.locator('#timer-reset');
    if (await timerStart.isVisible()) {
      await timerStart.click();
      await page.waitForTimeout(1200);
      console.log('Timer running:', await timerDisplay.innerText());
      await timerPause.click();
      await page.waitForTimeout(300);
      await timerReset.click();
      await page.waitForTimeout(300);
      console.log('Timer reset to:', await timerDisplay.innerText());
    }

    // Test RNG Roller
    console.log('Testing RNG Roller...');
    const rngBtn = page.locator('#generate-number-btn');
    if (await rngBtn.isVisible()) {
      await rngBtn.click();
      await page.waitForTimeout(500);
      const rngDisplay = page.locator('#random-number-display');
      console.log('RNG Result:', await rngDisplay.innerText());
    }

    // Test Shortcuts accordion
    console.log('Testing Shortcuts Drawer...');
    const toggleShortcuts = page.locator('#toggle-shortcuts');
    if (await toggleShortcuts.isVisible()) {
      await toggleShortcuts.click();
      await page.waitForTimeout(500);
      const shortcutsList = page.locator('#shortcuts-list');
      await expect(shortcutsList).toBeVisible();
    }

    // Inspect Player Cards & Active Pokemon in the Grid
    console.log('--- Step 8: Inspecting Active Pokemon & Team Setup ---');
    const playerCards = page.locator('#player-grid .player-card');
    const cardCount = await playerCards.count();
    console.log(`Total Player Cards in Arena Grid: ${cardCount}`);
    expect(cardCount).toBeGreaterThan(0);

    for (let i = 0; i < cardCount; i++) {
      const card = playerCards.nth(i);
      const trainerName = await card.locator('.card-trainer-name, h2').innerText().catch(() => 'Unknown');
      const pokemonName = await card.locator('.card-pokemon-name, h3').innerText().catch(() => 'None');
      const tier = await card.locator('.pokemon-tier, p').first().innerText().catch(() => 'None');
      console.log(`[Player ${i + 1}] Trainer: ${trainerName} | Active Pokémon: ${pokemonName} (${tier})`);
    }
    await page.screenshot({ path: 'test_artifacts/07_player_cards_detailed.png' });

    // Test Weather & Terrain selectors
    console.log('--- Step 9: Testing Weather & Terrain ---');
    const weatherSelect = page.locator('#weather-select');
    if (await weatherSelect.isVisible()) {
      await weatherSelect.selectOption('harsh-sunlight');
      await page.waitForTimeout(500);
    }
    const terrainSelect = page.locator('#terrain-select');
    if (await terrainSelect.isVisible()) {
      await terrainSelect.selectOption('grassy');
      await page.waitForTimeout(500);
    }

    // Test Combat Commands
    console.log('--- Step 10: Testing Combat & Attack Execution ---');
    const movePowerInput = page.locator('#move-power-input');
    if (await movePowerInput.isVisible()) {
      await movePowerInput.fill('120');
    }

    const physicalAttackBtn = page.locator('#physical-attack-btn');
    if (await physicalAttackBtn.isVisible()) {
      await physicalAttackBtn.click();
      await page.waitForTimeout(1000);
    }

    const specialAttackBtn = page.locator('#special-attack-btn');
    if (await specialAttackBtn.isVisible()) {
      await specialAttackBtn.click();
      await page.waitForTimeout(1000);
    }

    // Verify Battle Log
    const battleLog = page.locator('#battle-log');
    if (await battleLog.isVisible()) {
      console.log('Recent Battle Log Entries:');
      const logText = await battleLog.innerText();
      console.log(logText.slice(-400));
    }
    await page.screenshot({ path: 'test_artifacts/08_combat_and_log.png' });

    // Test End Round action
    console.log('--- Step 11: Testing End Round & Turn Progression ---');
    await endRoundBtn.click();
    await page.waitForTimeout(1500);
    console.log('End Round Button State:', await endRoundBtn.innerText());
    await page.screenshot({ path: 'test_artifacts/09_after_end_round.png' });

    // Test Undo action
    console.log('Testing Undo...');
    const undoBtn = page.locator('#undo-btn');
    if (await undoBtn.isVisible()) {
      await undoBtn.click();
      await page.waitForTimeout(500);
    }

    // Test Quitting Battle
    console.log('--- Step 12: Testing Quit Battle & Returning to Lobby ---');
    const quitBtn = page.locator('#quit-battle-btn');
    if (await quitBtn.isVisible()) {
      await quitBtn.click();
      await page.waitForTimeout(2000);
      await expect(arenaView).toHaveClass(/hidden/, { timeout: 10000 });
      await expect(lobbyView).not.toHaveClass(/hidden/);
      console.log('Successfully returned to Lobby after Quitting Battle!');
      await page.screenshot({ path: 'test_artifacts/10_after_quit_to_lobby.png' });
    }

    // Summary of logs and errors
    console.log('====================================');
    console.log('FINAL SUMMARY OF SCANNED ISSUES:');
    console.log(`Page Uncaught Errors (${pageErrors.length}):`, pageErrors);
    console.log(`Failed Network Requests (${failedRequests.length}):`, failedRequests);
    const seriousConsoleErrors = consoleMessages.filter(m => m.startsWith('[error]'));
    console.log(`Console Errors (${seriousConsoleErrors.length}):`, seriousConsoleErrors);
    console.log('====================================');

    expect(pageErrors.length).toBe(0);
  });
});
