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
 for (const theme of ['dark','light']) {
   await page.getByLabel('テーマ',{exact:true}).selectOption(theme);
   for (const name of names) {
     await select(name);
     for (const width of [320,768,1440]) {
       await page.setViewportSize({width,height:1000});
       assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} overflow at ${width} ${theme}`);
     }
   }
 }
 await page.getByLabel('テーマ',{exact:true}).selectOption('dark');
 await select('Switch');
 const toggle=page.getByRole('switch',{name:'通知を有効にする'}); await toggle.uncheck(); assert.equal(await toggle.isChecked(),false);
 await select('SearchField'); await page.getByLabel('ファイルを検索').fill('theme'); assert.equal(await page.getByRole('status').textContent(),'theme.css');
 await select('Tabs'); await page.getByRole('tab',{name:'概要'}).focus(); await page.keyboard.press('ArrowRight'); assert.equal(await page.getByRole('tab',{name:'履歴'}).getAttribute('aria-selected'),'true');
 await select('Select'); await page.getByRole('button',{name:'公開範囲 自分のみ'}).click(); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); assert.match(await page.locator('.nezui-select-trigger').innerText(),/チーム/);
 await select('DropdownMenu'); await page.getByRole('button',{name:'ファイル操作'}).click(); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); assert.match(await page.getByRole('status').textContent(),/アーカイブ/);
 await select('ContextMenu'); await page.locator('.nezui-context-target').focus(); await page.keyboard.press('Shift+F10'); await page.getByRole('menuitem',{name:'詳細を表示'}).click(); assert.match(await page.getByRole('status').textContent(),/設定ファイル/);
 await select('Toast'); await page.getByRole('button',{name:'通知を閉じる'}).click(); assert.equal(await page.locator('.nezui-toast').count(),0); await page.getByRole('button',{name:'通知を表示'}).click(); assert.equal(await page.locator('.nezui-toast').count(),1);
 await select('Tooltip'); await page.getByRole('button',{name:'保存について'}).focus(); assert.equal(await page.getByRole('tooltip').isVisible(),true); await page.keyboard.press('Escape'); assert.equal(await page.getByRole('tooltip').isVisible(),false);
 await select('Popover'); await page.getByRole('button',{name:'表示オプション'}).click(); assert.equal(await page.locator('[popover]').evaluate(el=>el.matches(':popover-open')),true); await page.keyboard.press('Escape');
 await select('Motion');
 await page.screenshot({path:'artifacts/nezui-motion.png',fullPage:true});
 await page.getByRole('button',{name:'非表示にする'}).click(); await page.waitForTimeout(200); assert.equal(await page.locator('.nezui-motion').getAttribute('inert'),'');
 await page.emulateMedia({reducedMotion:'reduce'}); assert.equal(await page.locator('.nezui-motion').evaluate(el=>getComputedStyle(el).transform),'none');
 await page.getByRole('button',{name:'表示する',exact:true}).click();
 await page.screenshot({path:'artifacts/nezui-motion-reduced.png',fullPage:true});
 await select('Button'); await page.screenshot({path:'artifacts/nezui-library.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({catalogEntries:names.length,layoutChecks:names.length*6,interactionChecks:10,pageErrors:errors}));
 } finally { await browser.close(); }
})();

