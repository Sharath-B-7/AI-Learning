const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');

const MODULES_TO_TEST = [
  { id: '01', pageUrl: 'http://127.0.0.1:8088/foundations/part-a/module-01-what-is-ai/', videoUrl: 'http://127.0.0.1:8088/assets/videos/module-01.mp4' },
  { id: '02', pageUrl: 'http://127.0.0.1:8088/foundations/part-a/module-02-what-is-an-llm/', videoUrl: 'http://127.0.0.1:8088/assets/videos/module-02.mp4' },
  { id: '13', pageUrl: 'http://127.0.0.1:8088/foundations/part-b/module-13-permissions-and-safety/', videoUrl: 'http://127.0.0.1:8088/assets/videos/module-13.mp4' }
];

async function inspectAudio() {
  console.log('=== STARTING AUDIO & VIDEO PLAYER INVESTIGATION ===');
  console.log('Chrome Path:', CHROME_PATH);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  for (const mod of MODULES_TO_TEST) {
    console.log(`\n======================================================`);
    console.log(`TESTING MODULE ${mod.id}: Website Playback`);
    console.log(`URL: ${mod.pageUrl}`);
    console.log(`======================================================`);

    const page = await browser.newPage();
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => consoleLogs.push(`[ERROR] ${err.message}`));

    await page.goto(mod.pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Wait for video element mounted by video-player.js
    await page.waitForSelector('.module-video-wrapper .module-video-element', { timeout: 8000 });

    // 1. Inspect DOM properties BEFORE play
    const prePlayState = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      return {
        src: v.src,
        currentSrc: v.currentSrc,
        muted: v.muted,
        defaultMuted: v.defaultMuted,
        volume: v.volume,
        autoplay: v.autoplay,
        paused: v.paused,
        duration: v.duration,
        readyState: v.readyState,
        networkState: v.networkState,
        hasAudioTracks: typeof v.audioTracks !== 'undefined' ? v.audioTracks.length : 'unsupported API',
        error: v.error ? { code: v.error.code, message: v.error.message } : null,
        outerHTML: v.outerHTML.substring(0, 300)
      };
    });
    console.log('Pre-play Video Properties:', JSON.stringify(prePlayState, null, 2));

    // 2. Set up Web Audio Analyser to monitor actual output
    await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const source = ctx.createMediaElementSource(v);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        window.__audioCtx = ctx;
        window.__analyser = analyser;
        window.__pcmBuffer = new Float32Array(analyser.fftSize);
      } catch (e) {
        window.__audioSetupError = e.toString();
      }
    });

    // 3. Initiate playback
    const playResult = await page.evaluate(async () => {
      const v = document.querySelector('.module-video-element');
      if (window.__audioCtx && window.__audioCtx.state === 'suspended') {
        await window.__audioCtx.resume();
      }
      try {
        await v.play();
        return { success: true };
      } catch (e) {
        return { success: false, error: e.toString() };
      }
    });
    console.log('play() invocation:', playResult);

    // 4. Sample audio across 6 seconds of playback
    const samples = [];
    for (let s = 1; s <= 4; s++) {
      await new Promise(r => setTimeout(r, 1500));
      const sample = await page.evaluate(() => {
        const v = document.querySelector('.module-video-element');
        let rms = 0;
        let peak = 0;
        let setupErr = window.__audioSetupError || null;

        if (window.__analyser && window.__pcmBuffer) {
          window.__analyser.getFloatTimeDomainData(window.__pcmBuffer);
          let sumSquares = 0;
          for (let i = 0; i < window.__pcmBuffer.length; i++) {
            const val = window.__pcmBuffer[i];
            sumSquares += val * val;
            if (Math.abs(val) > peak) peak = Math.abs(val);
          }
          rms = Math.sqrt(sumSquares / window.__pcmBuffer.length);
        }

        return {
          currentTime: v.currentTime,
          paused: v.paused,
          muted: v.muted,
          volume: v.volume,
          audioCtxState: window.__audioCtx ? window.__audioCtx.state : null,
          setupError: setupErr,
          peak: parseFloat(peak.toFixed(4)),
          rms: parseFloat(rms.toFixed(4)),
          isAudible: rms > 0.005
        };
      });
      samples.push(sample);
      console.log(`Sample ${s} at ${sample.currentTime.toFixed(2)}s: Volume=${sample.volume}, Muted=${sample.muted}, Peak=${sample.peak}, RMS=${sample.rms}, Audible=${sample.isAudible}`);
    }

    // 5. Check volume control changes
    const volumeTest = await page.evaluate(() => {
      const v = document.querySelector('.module-video-element');
      v.volume = 0.5;
      const atHalf = v.volume;
      v.volume = 1.0;
      const atFull = v.volume;
      v.muted = true;
      const mutedState = v.muted;
      v.muted = false;
      const unmutedState = v.muted;
      return { atHalf, atFull, mutedState, unmutedState };
    });
    console.log('Volume/Mute Control Test:', volumeTest);

    await page.close();

    // 6. Direct MP4 playback in browser
    console.log(`\n--- Direct MP4 Playback Test for Module ${mod.id} ---`);
    console.log(`Direct URL: ${mod.videoUrl}`);
    const directPage = await browser.newPage();
    await directPage.goto(mod.videoUrl, { waitUntil: 'load' });
    const directState = await directPage.evaluate(async () => {
      const v = document.querySelector('video');
      if (!v) return { error: 'No video element on direct MP4 page' };
      
      const beforePlay = {
        muted: v.muted,
        defaultMuted: v.defaultMuted,
        volume: v.volume,
        duration: v.duration,
        currentSrc: v.currentSrc
      };

      try {
        await v.play();
        await new Promise(r => setTimeout(r, 1000));
        return {
          ...beforePlay,
          currentTimeAfterPlay: v.currentTime,
          paused: v.paused,
          mutedAfterPlay: v.muted
        };
      } catch (e) {
        return { ...beforePlay, playError: e.toString() };
      }
    });
    console.log('Direct MP4 State:', JSON.stringify(directState, null, 2));
    await directPage.close();
  }

  await browser.close();
  console.log('\n=== INVESTIGATION RUN COMPLETE ===');
}

inspectAudio().catch(err => {
  console.error('Investigation Failed:', err);
  process.exit(1);
});
