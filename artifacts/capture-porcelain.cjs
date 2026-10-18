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
 fs.mkdirSync('artifacts/porcelain-frames',{recursive:true});let frame=0;
 const snap=async()=>{await page.screenshot({path:`artifacts/porcelain-frames/${String(frame++).padStart(3,'0')}.png`,clip:{x:224,y:80,width:1216,height:740}});};
 const sequence=async(action)=>{await action();for(let n=0;n<5;n++){await snap();await page.waitForTimeout(60);}};
 await select('SegmentedControl');await snap();const before=await page.locator('.nezui-segmented-indicator').evaluate(el=>getComputedStyle(el).transform);await sequence(()=>page.getByRole('radio',{name:'標準',exact:true}).check());const after=await page.locator('.nezui-segmented-indicator').evaluate(el=>getComputedStyle(el).transform);assert.notEqual(before,after);await sequence(()=>page.getByRole('radio',{name:'コンパクト',exact:true}).check());
 await select('Tabs');await snap();await sequence(()=>page.getByRole('tab',{name:'履歴'}).click());await sequence(()=>page.getByRole('tab',{name:'設定'}).click());
 await select('Switch');await snap();await sequence(()=>page.getByRole('switch',{name:'通知を有効にする'}).uncheck());await sequence(()=>page.getByRole('switch',{name:'通知を有効にする'}).check());
 await select('ChoiceGroup');await page.getByLabel('表示パターン').selectOption('cards');await snap();await sequence(()=>page.getByRole('radio',{name:/すばやく/}).check());await sequence(()=>page.getByRole('checkbox',{name:'すべてのツールを選択'}).check());
 await page.screenshot({path:'artifacts/nezui-porcelain-light.png',fullPage:true});
 await page.getByLabel('テーマ',{exact:true}).selectOption('dark');await page.screenshot({path:'artifacts/nezui-porcelain-dark.png',fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await select('SegmentedControl');const duration=await page.locator('.nezui-segmented-indicator').evaluate(el=>getComputedStyle(el).transitionDuration);assert.ok(parseFloat(duration)<=.001);
 assert.deepEqual(errors,[]);console.log(`Captured ${frame} frames; indicator movement and reduced motion verified`);
 } finally { await browser.close(); }
})();
