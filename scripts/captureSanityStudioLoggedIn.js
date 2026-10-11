import puppeteer from 'puppeteer';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Go to studio
  await page.goto('https://khelatbhawan.com/studio', { waitUntil: 'domcontentloaded' });

  // Studio access uses the signed-in Sanity/Google session. Never inject API tokens
  // into browser storage or cookies.
  console.log('Navigating to studio structure...');
  await page.goto('https://khelatbhawan.com/studio/desk', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 6000));

  const path = '/Users/jannat/.gemini/antigravity/brain/e9d2a3a3-4851-438f-93f0-a990eac553fc/sanity_studio_desk_view.png';
  await page.screenshot({ path });
  console.log('Sanity Studio desk screenshot captured:', path);

  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
