const { chromium } = require('C:/Users/ren11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
(async () => {
 const browser = await chromium.launch({headless:true});
 try {
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 page.setDefaultTimeout(5000); const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.route('http://nezui.local/**', async route => { const pathname = new URL(route.request().url()).pathname; const file = path.join(process.cwd(), 'apps/playground/dist', pathname === '/' ? 'index.html' : pathname); await route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'}); });
 await page.goto('http://nezui.local/');
 const nav = page.getByRole('navigation',{name:'コンポーネント',exact:true});
 const names = await nav.locator('button > span:first-child').allTextContents();
 const select = async name => { await nav.getByRole('button',{name:new RegExp('^'+name+' \\d+$')}).click(); await page.getByRole('heading',{level:1,name,exact:true}).waitFor(); };
 fs.mkdirSync('artifacts/design-audit-before',{recursive:true});
 for(const name of names) { await select(name); await page.locator('.nezui-preview-stage').screenshot({path:`artifacts/design-audit-before/${name}.png`}); }
 console.log(`Captured ${names.length} component previews`);
 } finally { await browser.close(); }
})();
