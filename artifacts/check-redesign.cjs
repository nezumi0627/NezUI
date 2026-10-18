const { chromium } = require('C:/Users/ren11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.route('http://nezui.local/**', async route => { const fs = require('node:fs'); const path = require('node:path'); const pathname = new URL(route.request().url()).pathname; const file = path.join(process.cwd(), 'apps/playground/dist', pathname === '/' ? 'index.html' : pathname); await route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'}); }); await page.goto('http://nezui.local/');
 await page.screenshot({path:'artifacts/nezui-redesign.png'});
 await page.getByRole('radio',{name:'outline',exact:true}).check();
 await page.getByRole('button',{name:'変更を保存',exact:true}).click();
 if(!await page.getByRole('status').textContent()) throw Error('Button feedback missing');
 await page.getByRole('button',{name:'Input 02'}).click();
 await page.getByLabel('メールアドレス',{exact:true}).fill('hello@nezui.dev');
 await page.getByRole('button',{name:'Dialog 03'}).click();
 await page.getByRole('button',{name:'変更を保存…',exact:true}).click();
 await page.keyboard.press('Escape');
 if(await page.locator('dialog').evaluate(el=>el.open)) throw Error('Dialog failed to close');
 for(const width of [320,768,1024,1440]) {
   await page.setViewportSize({width,height:1000});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error('Overflow at '+width);
 }
 await page.getByLabel('テーマ',{exact:true}).selectOption('light');
 await page.screenshot({path:'artifacts/nezui-redesign-light.png'});
 console.log(JSON.stringify({errors,checks:['button feedback','input editing','dialog Escape','responsive widths 320/768/1024/1440','light theme']}));
 await browser.close();
})();

