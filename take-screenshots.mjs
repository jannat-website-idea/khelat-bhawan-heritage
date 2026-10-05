import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE_URL = 'https://www.khelatbhawan.com';
const OUTPUT_DIR = '/Users/jannat/.gemini/antigravity/brain/e9d2a3a3-4851-438f-93f0-a990eac553fc/website-screenshots';

const pages = [
  { name: '01_Home', hash: '' },
  { name: '02_Heritage_About', hash: '#heritage' },
  { name: '03_History_Timeline', hash: '#timeline' },
  { name: '04_Founder', hash: '#founder' },
  { name: '05_Trusts_Trustees', hash: '#trustees' },
  { name: '06_Gallery', hash: '#gallery' },
  { name: '07_Events', hash: '#events' },
  { name: '08_Reservations', hash: '#reservations' },
  { name: '09_Feedback', hash: '#feedback' },
  { name: '10_Contact', hash: '#contact' },
];

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // First load the site and wait for the loading animation to finish
  console.log('Loading site initially...');
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 60000 });
  
  // Wait long enough for any loading animation (palace entrance) to complete
  console.log('Waiting for loading animation to finish...');
  await new Promise(r => setTimeout(r, 8000));
  
  // Force-remove any loading overlay
  await page.evaluate(() => {
    document.querySelectorAll('.palace-entrance, [class*="loader"], [class*="loading"], [class*="entrance"]').forEach(el => {
      el.remove();
    });
  });
  
  await new Promise(r => setTimeout(r, 1000));

  for (const { name, hash } of pages) {
    console.log(`\n📸 Capturing: ${name}`);

    try {
      if (hash) {
        // Click navigation or change hash
        await page.evaluate((h) => {
          window.location.hash = h;
        }, hash);
        await new Promise(r => setTimeout(r, 3000));
      }
      
      // Force-remove any overlay again
      await page.evaluate(() => {
        document.querySelectorAll('.palace-entrance, [class*="loader"], [class*="loading"], [class*="entrance"]').forEach(el => {
          el.remove();
        });
      });

      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 1500));

      // Viewport screenshot
      const viewportPath = join(OUTPUT_DIR, `${name}_viewport.png`);
      await page.screenshot({ path: viewportPath, type: 'png' });
      console.log(`  ✅ Viewport: ${name}_viewport.png`);

      // Full-page screenshot
      const fullPagePath = join(OUTPUT_DIR, `${name}_fullpage.png`);
      await page.screenshot({ path: fullPagePath, type: 'png', fullPage: true });
      console.log(`  ✅ Full page: ${name}_fullpage.png`);

    } catch (err) {
      console.error(`  ❌ Error capturing ${name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 All screenshots saved to:\n${OUTPUT_DIR}`);
}

run().catch(console.error);
