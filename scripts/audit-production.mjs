import puppeteer from 'puppeteer';

const BASE_URL = process.env.AUDIT_URL || 'https://khelatbhawan.com/';
const routes = ['home', 'heritage', 'timeline', 'founder', 'trustees', 'gallery', 'events', 'rental', 'feedback', 'contact'];
const results = [];

const record = (viewport, route, check, pass, detail = '') => {
  results.push({viewport, route, check, pass, detail});
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function auditViewport(browser, viewportName, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const errors = [];
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(`console: ${message.text()}`);
  });

  await page.goto(BASE_URL, {waitUntil: 'domcontentloaded', timeout: 60000});
  await page.waitForSelector('[data-page-content]', {timeout: 30000});
  await page.waitForFunction(() => !document.querySelector('.palace-entrance'), {timeout: 20000});

  for (const route of routes) {
    await page.evaluate((nextRoute) => {
      window.location.hash = nextRoute === 'home' ? '' : nextRoute;
    }, route);
    await wait(650);

    const state = await page.evaluate(() => {
      const pageContent = document.querySelector('[data-page-content]');
      const video = document.querySelector('.royal-hero__film');
      return {
        hash: window.location.hash,
        title: document.title,
        mainVisible: Boolean(pageContent && pageContent.getBoundingClientRect().height > 100),
        bodyHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        videoSource: video?.currentSrc || '',
        videoReadyState: video?.readyState ?? -1,
        videoPaused: video?.paused ?? true,
      };
    });

    const expectedHash = route === 'home' ? '' : `#${route}`;
    record(viewportName, route, 'route', state.hash === expectedHash, `${state.hash || '(home)'} / ${state.title}`);
    record(viewportName, route, 'visible content', state.mainVisible, `height ${state.bodyHeight}px`);
    record(viewportName, route, 'horizontal layout', state.horizontalOverflow <= 2, `${state.horizontalOverflow}px overflow`);

    if (route === 'home') {
      record(viewportName, route, 'hero video source', Boolean(state.videoSource), state.videoSource);
      record(viewportName, route, 'hero video loaded', state.videoReadyState >= 2, `readyState ${state.videoReadyState}, paused ${state.videoPaused}`);
    }

    if (state.bodyHeight > state.viewportHeight + 200) {
      await page.evaluate(() => window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight - window.innerHeight)));
      await wait(350);
      const afterScroll = await page.evaluate(() => ({hash: window.location.hash, y: window.scrollY}));
      record(viewportName, route, 'scroll keeps route', afterScroll.hash === expectedHash && afterScroll.y > 0, `${afterScroll.hash || '(home)'} at ${afterScroll.y}px`);
    }
  }

  await page.evaluate(() => { window.location.hash = 'rental'; });
  await wait(650);
  const bookingOpened = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')];
    const button = buttons.find((item) => /book a date now|reserve|book/i.test(item.textContent || ''));
    button?.click();
    return Boolean(button);
  });
  await wait(350);
  record(viewportName, 'rental', 'booking trigger', bookingOpened, 'booking call-to-action found');

  if (bookingOpened) {
    const phone = await page.$('input[autocomplete="tel"]');
    if (phone) {
      await phone.type('abc123456789012345');
      const phoneValue = await page.evaluate((input) => input.value, phone);
      record(viewportName, 'rental', 'phone input sanitization', /^\+?\d{0,12}$/.test(phoneValue) && !/[a-z]/i.test(phoneValue), phoneValue);
    }

    await page.keyboard.press('ArrowLeft');
    await wait(250);
    const modalState = await page.evaluate(() => ({hash: window.location.hash, dialog: Boolean(document.querySelector('[role="dialog"]'))}));
    record(viewportName, 'rental', 'arrow key stays in booking', modalState.hash === '#rental' && modalState.dialog, JSON.stringify(modalState));
  }

  record(viewportName, 'global', 'runtime errors', errors.length === 0, errors.slice(0, 6).join(' | '));
  await page.close();
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
try {
  await auditViewport(browser, 'desktop', {width: 1440, height: 900, deviceScaleFactor: 1});
  await auditViewport(browser, 'mobile', {width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true});
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.pass);
for (const result of results) {
  console.log(`${result.pass ? 'PASS' : 'FAIL'}\t${result.viewport}\t${result.route}\t${result.check}\t${result.detail}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) process.exitCode = 1;
