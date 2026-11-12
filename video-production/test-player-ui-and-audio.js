const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');

const TARGETS = [
  { id: '01', url: 'http://127.0.0.1:8000/foundations/part-a/module-01-what-is-ai/' },
  { id: '02', url: 'http://127.0.0.1:8000/foundations/part-a/module-02-what-is-an-llm/' },
  { id: '13', url: 'http://127.0.0.1:8000/foundations/part-b/module-13-permissions-and-safety/' },
];

async function testPlayerUI() {
  console.log('=== TESTING ENHANCED VIDEO PLAYER UI & AUDIO GUARANTEE ===\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  for (const t of TARGETS) {
    console.log(`--- Testing Module ${t.id} ---`);
    const page = await browser.newPage();
    await page.goto(t.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.module-video-element', { timeout: 8000 });

    const initial = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      const btn = document.querySelector('.video-audio-toggle-btn');
      const label = document.querySelector('.audio-label');
      const icon = document.querySelector('.audio-icon');
      return {
        videoMuted: v.muted,
        videoVolume: v.volume,
        btnExists: !!btn,
        btnText: label ? label.textContent.trim() : null,
        btnIcon: icon ? icon.textContent.trim() : null,
        isMutedClass: btn ? btn.classList.contains('is-muted') : null
      };
    });
    console.log('Initial Player State:', initial);

    // Test clicking the audio toggle button to Mute
    await page.click('.video-audio-toggle-btn');
    const afterMuteClick = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      const btn = document.querySelector('.video-audio-toggle-btn');
      const label = document.querySelector('.audio-label');
      return {
        videoMuted: v.muted,
        videoVolume: v.volume,
        btnText: label ? label.textContent.trim() : null,
        isMutedClass: btn.classList.contains('is-muted')
      };
    });
    console.log('After Mute Click:', afterMuteClick);

    // Test clicking the audio toggle button to Unmute
    await page.click('.video-audio-toggle-btn');
    const afterUnmuteClick = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      const btn = document.querySelector('.video-audio-toggle-btn');
      const label = document.querySelector('.audio-label');
      return {
        videoMuted: v.muted,
        videoVolume: v.volume,
        btnText: label ? label.textContent.trim() : null,
        isMutedClass: btn.classList.contains('is-muted')
      };
    });
    console.log('After Unmute Click:', afterUnmuteClick);

    // Play video and verify volume is 1.0 and unmuted
    await page.evaluate(async () => {
      const v = document.querySelector('.module-video-element');
      await v.play();
    });
    await new Promise(r => setTimeout(r, 1000));

    const duringPlay = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      return {
        paused: v.paused,
        currentTime: v.currentTime,
        muted: v.muted,
        volume: v.volume
      };
    });
    console.log('During Playback:', duringPlay);

    // Take screenshot of the player with audio indicator
    const screenshotPath = path.resolve(__dirname, `renders/player-audio-module-${t.id}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot: ${screenshotPath}\n`);

    await page.close();
  }

  await browser.close();
  console.log('=== PLAYER UI & AUDIO VERIFICATION COMPLETE ===');
}

testPlayerUI().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
