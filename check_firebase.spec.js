import { test, expect } from '@playwright/test';

test('Automatically check Pokemon Battle Arena', async ({ page }) => {
  // Navigate to the Firebase link
  console.log('Navigating to https://pokemon-1248.web.app...');
  await page.goto('https://pokemon-1248.web.app');

  // Wait for the main content to load
  await page.waitForLoadState('networkidle');

  // Verify the page title
  const title = await page.title();
  console.log('Page Title:', title);
  
  // Extract text from the page to see what's rendering
  const bodyText = await page.locator('body').innerText();
  console.log('Page Content Preview:');
  console.log(bodyText.substring(0, 500));

  // Take a screenshot of the app
  await page.screenshot({ path: 'firebase_app_screenshot.png' });
  console.log('Screenshot saved as firebase_app_screenshot.png');
});
