const { chromium } = require('C:/Users/ren11/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'); const path = require('node:path');
(async () => { const browser = await chromium.launch({headless:true}); try { const page=await browser.newPage({viewport:{width:1200,height:900}});
await page.route('http://nezui.local/**',async route=>{const pathname=new URL(route.request().url()).pathname;const file=path.join(process.cwd(),'apps/playground/dist',pathname==='/'?'index.html':pathname);await route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'});});
await page.goto('http://nezui.local/');await page.getByRole('navigation',{name:'コンポーネント',exact:true}).getByRole('button',{name:/^Motion /}).click();
fs.mkdirSync('artifacts/motion-frames',{recursive:true});let frame=0;
for(const preset of ['fade','rise','scale','slide']) { await page.getByLabel('動き',{exact:true}).selectOption(preset);for(let cycle=0;cycle<2;cycle++){await page.getByRole('button',{name:cycle===0?'非表示にする':'表示する',exact:true}).click();for(let i=0;i<6;i++){await page.screenshot({path:`artifacts/motion-frames/${String(frame++).padStart(3,'0')}.png`,clip:{x:224,y:88,width:952,height:720}});await page.waitForTimeout(45);}}}
console.log(`Captured ${frame} motion frames`);
}finally{await browser.close();}})();
