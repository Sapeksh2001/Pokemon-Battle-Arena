import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Security Audit Fix Verification', () => {
  test('database.rules.json has strict validation and no open alias writes or error leaks', () => {
    const rulesPath = path.resolve('database.rules.json');
    expect(fs.existsSync(rulesPath)).toBe(true);
    
    const rulesContent = fs.readFileSync(rulesPath, 'utf8');
    const rules = JSON.parse(rulesContent);

    // Verify roomAliases rules
    expect(rules.rules.roomAliases).toBeDefined();
    // VUL-10: Must not have node-level .read
    expect(rules.rules.roomAliases['.read']).toBeUndefined();
    // VUL-03: Must not have node-level .write
    expect(rules.rules.roomAliases['.write']).toBeUndefined();
    // Room code scoped
    expect(rules.rules.roomAliases['$room_code']).toBeDefined();
    expect(rules.rules.roomAliases['$room_code']['.write']).toContain('!data.exists() || data.val() === newData.val()');

    // VUL-04: Verify errors node is scoped by $uid
    expect(rules.rules.errors).toBeDefined();
    expect(rules.rules.errors['.read']).toBeUndefined();
    expect(rules.rules.errors['.write']).toBeUndefined();
    expect(rules.rules.errors['$uid']).toBeDefined();
    expect(rules.rules.errors['$uid']['.read']).toContain('auth.uid === $uid');
    expect(rules.rules.errors['$uid']['.write']).toContain('auth.uid === $uid');

    // VUL-07: Verify player validation
    const playerRules = rules.rules.rooms['$room_id'].players['$player_id'];
    expect(playerRules['.validate']).toBeDefined();
    expect(playerRules['.validate']).toContain('newData.hasChildren');

    // VUL-06: Verify state hp bounds
    const stateRules = rules.rules.rooms['$room_id'].state;
    expect(stateRules.players['$pid'].hp['.validate']).toContain('1000');
  });

  test('firebase.json contains CSP, HSTS, and Permissions-Policy headers', () => {
    const fbPath = path.resolve('firebase.json');
    const fbContent = fs.readFileSync(fbPath, 'utf8');
    const fbConfig = JSON.parse(fbContent);

    const headersList = fbConfig.hosting.headers;
    const globalHeader = headersList.find(h => h.source === '**');
    expect(globalHeader).toBeDefined();

    const keys = globalHeader.headers.map(h => h.key);
    expect(keys).toContain('Content-Security-Policy');
    expect(keys).toContain('Strict-Transport-Security');
    expect(keys).toContain('Permissions-Policy');

    const csp = globalHeader.headers.find(h => h.key === 'Content-Security-Policy').value;
    expect(csp).toContain('https://play.pokemonshowdown.com');
    expect(csp).toContain("frame-ancestors 'none'");
  });

  test('.gitignore contains .env and .env*.local', () => {
    const gitignorePath = path.resolve('.gitignore');
    const content = fs.readFileSync(gitignorePath, 'utf8');
    expect(content).toContain('.env');
    expect(content).toContain('.env*.local');
  });

  test('socket.io-client is uninstalled from package.json', () => {
    const pkgPath = path.resolve('package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    expect(pkg.dependencies['socket.io-client']).toBeUndefined();
    expect(pkg.scripts['test']).toBe('playwright test');
  });
});
