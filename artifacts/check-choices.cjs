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
 await select('ChoiceGroup');
 await page.getByRole('radio',{name:/すばやく/}).check();
 assert.match(await page.locator('.nezui-demo-content output').innerText(),/fast/);
 const all=page.getByRole('checkbox',{name:'すべてのツールを選択'});
 assert.equal(await all.evaluate(el=>el.indeterminate),true);
 await all.check(); assert.equal(await page.getByRole('checkbox',{name:'Web検索',exact:true}).isChecked(),true);
 await page.getByRole('checkbox',{name:'Web検索',exact:true}).uncheck(); assert.equal(await all.evaluate(el=>el.indeterminate),true);
 for(const layout of ['cards','chips','list']) { await page.getByLabel('表示パターン').selectOption(layout); assert.equal(await page.getByRole('radio',{name:/すばやく/}).isChecked(),true); for(const width of [320,768,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);} }
 await page.getByLabel('表示パターン').selectOption('cards');
 await page.screenshot({path:'artifacts/nezui-choice-patterns.png',fullPage:true});
 await select('NavigationItem');await page.getByRole('button',{name:/プロジェクト NezUI/}).click();assert.equal(await page.getByRole('button',{name:/プロジェクト NezUI/}).getAttribute('aria-current'),'page');
 await select('ToggleButton');const toggle=page.getByRole('button',{name:'ピン留め',exact:true});await toggle.focus();await page.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-pressed'),'true');await page.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-pressed'),'false');
 await select('IconButton');assert.equal(await page.getByRole('button',{name:'sendを試す'}).getAttribute('data-shape'),'circle');await page.screenshot({path:'artifacts/nezui-icon-button-variants.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: selection, mixed state, layouts, keyboard toggle, shared icon button');
 } finally { await browser.close(); }
})();
