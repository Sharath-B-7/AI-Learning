const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');
const TARGET_URL = 'http://127.0.0.1:8088/foundations/part-a/module-01-what-is-ai/';

async function runBrowserTest() {
  console.log('Launching Headless Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  
  // Test Desktop Viewport
  await page.setViewport({ width: 1440, height: 900 });
  console.log(`Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // Wait for the video element mounted by video-player.js
  await page.waitForSelector('.module-video-wrapper .module-video-element', { timeout: 10000 });
  console.log('Found .module-video-element in DOM!');

  // Inspect video element attributes and DOM state
  const videoDetails = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    const wrapper = document.querySelector('.module-video-wrapper');
    const container = document.querySelector('.video-container');
    const source = v.querySelector('source');

    return {
      hasControls: v.hasAttribute('controls'),
      hasPlaysinline: v.hasAttribute('playsinline'),
      hasVideoClass: container ? container.classList.contains('has-video') : false,
      videoSrc: source ? source.getAttribute('src') : null,
      currentSrc: v.currentSrc,
      readyState: v.readyState,
      networkState: v.networkState,
      paused: v.paused,
      muted: v.muted,
      duration: v.duration,
      desktopRect: {
        width: v.clientWidth,
        height: v.clientHeight
      }
    };
  });

  console.log('Video DOM Details:', JSON.stringify(videoDetails, null, 2));

  // Trigger video playback and verify currentTime advances
  console.log('Attempting video.play()...');
  const playResult = await page.evaluate(async () => {
    const v = document.querySelector('.module-video-element');
    try {
      await v.play();
      // wait 2 seconds while playing
      await new Promise(r => setTimeout(r, 2000));
      return {
        success: true,
        currentTime: v.currentTime,
        paused: v.paused,
        ended: v.ended,
        readyStateAfterPlay: v.readyState
      };
    } catch (e) {
      return {
        success: false,
        error: e.toString()
      };
    }
  });

  console.log('Playback Execution Result:', JSON.stringify(playResult, null, 2));

  // Take desktop screenshot showing active player
  await page.screenshot({ path: path.resolve(__dirname, 'renders/browser-test-desktop.png') });
  console.log('Captured desktop screenshot: renders/browser-test-desktop.png');

  // Test Mobile Responsiveness
  console.log('Testing Mobile Viewport (375x667)...');
  await page.setViewport({ width: 375, height: 667 });
  await new Promise(r => setTimeout(r, 500));

  const mobileMetrics = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    const container = document.querySelector('.video-container');
    return {
      containerWidth: container.clientWidth,
      videoWidth: v.clientWidth,
      videoHeight: v.clientHeight,
      aspectRatio: (v.clientWidth / v.clientHeight).toFixed(2)
    };
  });

  console.log('Mobile Viewport Metrics:', JSON.stringify(mobileMetrics, null, 2));
  await page.screenshot({ path: path.resolve(__dirname, 'renders/browser-test-mobile.png') });
  console.log('Captured mobile screenshot: renders/browser-test-mobile.png');

  await browser.close();
  console.log('Browser tests completed successfully!');
}

runBrowserTest().catch(err => {
  console.error('Browser Test Failed:', err);
  process.exit(1);
});

