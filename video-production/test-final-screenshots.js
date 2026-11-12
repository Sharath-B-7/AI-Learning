const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');
const TARGET_URL = 'http://127.0.0.1:8088/foundations/part-a/module-01-what-is-ai/';
const ARTIFACT_DIR = '/home/sharath/.gemini/antigravity/brain/b0297b49-6e6c-4ace-8cf8-55b1147d4d12';

async function captureFinalAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();

  // 1. Desktop Viewport
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.module-video-element', { timeout: 10000 });

  // Play video to 15 seconds so Scene 02 is visibly playing inside the HTML5 player
  await page.evaluate(async () => {
    const v = document.querySelector('.module-video-element');
    v.currentTime = 15.0;
    await new Promise(r => setTimeout(r, 600));
  });

  const desktopPath = path.resolve(__dirname, 'renders/final-audit-desktop.png');
  await page.screenshot({ path: desktopPath });
  fs.copyFileSync(desktopPath, path.join(ARTIFACT_DIR, 'final-audit-desktop.png'));

  // 2. Tablet Viewport
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise(r => setTimeout(r, 300));
  const tabletPath = path.resolve(__dirname, 'renders/final-audit-tablet.png');
  await page.screenshot({ path: tabletPath });
  fs.copyFileSync(tabletPath, path.join(ARTIFACT_DIR, 'final-audit-tablet.png'));

  // 3. Mobile Viewport
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 300));
  const mobilePath = path.resolve(__dirname, 'renders/final-audit-mobile.png');
  await page.screenshot({ path: mobilePath });
  fs.copyFileSync(mobilePath, path.join(ARTIFACT_DIR, 'final-audit-mobile.png'));

  // Check state
  const state = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    return {
      duration: v.duration,
      currentTime: v.currentTime,
      readyState: v.readyState,
      videoWidth: v.offsetWidth,
      videoHeight: v.offsetHeight
    };
  });
  console.log('Final In-Browser State:', JSON.stringify(state, null, 2));

  await browser.close();
}

captureFinalAudit().catch(err => {
  console.error('Final Screenshot Capture Failed:', err);
  process.exit(1);
});

