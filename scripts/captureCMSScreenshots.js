import puppeteer from 'puppeteer';
import path from 'path';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to website with #cms...');
  await page.goto('https://khelatbhawan.com/#cms', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait 2 seconds for animations
  await new Promise(r => setTimeout(r, 2000));

  const artifactDir = '/Users/jannat/.gemini/antigravity/brain/e9d2a3a3-4851-438f-93f0-a990eac553fc';

  // 1. Screenshot of Events Section (with calendar button & highlights)
  const ss1Path = path.join(artifactDir, 'cms_events_section.png');
  await page.screenshot({ path: ss1Path });
  console.log('Captured Events section screenshot:', ss1Path);

  // Click on "Open Interactive Calendar"
  const calendarBtn = await page.$('button ::-p-text(Open Interactive Calendar)');
  if (calendarBtn) {
    await calendarBtn.click();
    await new Promise(r => setTimeout(r, 800));
    const ssCalendarPath = path.join(artifactDir, 'cms_events_calendar_picker.png');
    await page.screenshot({ path: ssCalendarPath });
    console.log('Captured Events with calendar open:', ssCalendarPath);
  }

  // 2. Click on "Reservations & Bookings" tab
  const reservationsTab = await page.$('aside button ::-p-text(Reservations & Bookings)');
  if (reservationsTab) {
    await reservationsTab.click();
    await new Promise(r => setTimeout(r, 1000));
    const ss2Path = path.join(artifactDir, 'cms_reservations_inbox.png');
    await page.screenshot({ path: ss2Path });
    console.log('Captured Reservations Inbox screenshot:', ss2Path);
  }

  // 3. Click on "Visual Gallery & Films"
  const galleryTab = await page.$('aside button ::-p-text(Visual Gallery & Films)');
  if (galleryTab) {
    await galleryTab.click();
    await new Promise(r => setTimeout(r, 1000));
    const ss3Path = path.join(artifactDir, 'cms_gallery_section.png');
    await page.screenshot({ path: ss3Path });
    console.log('Captured Gallery section screenshot:', ss3Path);
  }

  // 4. Click on "Guest Reviews & Feedback"
  const feedbackTab = await page.$('aside button ::-p-text(Guest Reviews & Feedback)');
  if (feedbackTab) {
    await feedbackTab.click();
    await new Promise(r => setTimeout(r, 1000));
    const ss4Path = path.join(artifactDir, 'cms_feedback_section.png');
    await page.screenshot({ path: ss4Path });
    console.log('Captured Feedback section screenshot:', ss4Path);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
