const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');
const TARGET_URL = 'http://127.0.0.1:8000/foundations/part-a/module-01-what-is-ai/';

async function diagnose() {
  console.log('--- DIAGNOSING MKDOCS SERVE VIDEO LOADING ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
  page.on('request', req => {
    if (req.url().includes('.mp4')) {
      console.log('MP4 REQUEST HEADERS:', req.headers());
    }
  });
  page.on('response', res => {
    if (res.url().includes('.mp4')) {
      console.log('MP4 RESPONSE STATUS:', res.status(), res.statusText());
      console.log('MP4 RESPONSE HEADERS:', res.headers());
    }
  });
  page.on('requestfailed', req => {
    if (req.url().includes('.mp4')) {
      console.log('MP4 REQUEST FAILED:', req.url(), req.failure());
    }
  });

  console.log('Navigating to', TARGET_URL);
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.module-video-element', { timeout: 10000 });

  // Wait 3 seconds to observe initial load state
  await new Promise(r => setTimeout(r, 3000));

  const state1 = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    return {
      currentSrc: v.currentSrc,
      src: v.src,
      networkState: v.networkState,
      readyState: v.readyState,
      duration: v.duration,
      paused: v.paused,
      currentTime: v.currentTime,
      error: v.error ? { code: v.error.code, message: v.error.message } : null
    };
  });
  console.log('Initial Video State:', state1);

  console.log('Attempting to call play()...');
  const playRes = await page.evaluate(async () => {
    const v = document.querySelector('.module-video-element');
    try {
      await v.play();
      return { success: true, currentTime: v.currentTime };
    } catch (e) {
      return { success: false, error: e.toString() };
    }
  });
  console.log('Play Result:', playRes);

  await new Promise(r => setTimeout(r, 2000));

  const state2 = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    return {
      currentSrc: v.currentSrc,
      networkState: v.networkState,
      readyState: v.readyState,
      duration: v.duration,
      paused: v.paused,
      currentTime: v.currentTime,
      error: v.error ? { code: v.error.code, message: v.error.message } : null
    };
  });
  console.log('State after play():', state2);

  await browser.close();
}

diagnose().catch(err => {
  console.error('Diagnosis Failed:', err);
  process.exit(1);
});

