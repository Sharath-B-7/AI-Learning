const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');
const TARGET_URL = 'http://127.0.0.1:8088/foundations/part-a/module-01-what-is-ai/';

async function verifyFullPlayback() {
  console.log('--- STARTING COMPREHENSIVE PLAYBACK & AUDIO VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to target page:', TARGET_URL);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // 1. Verify Video Element in DOM
  await page.waitForSelector('.module-video-wrapper .module-video-element', { timeout: 10000 });
  console.log('SUCCESS: Video player mounted in DOM.');

  // 2. Set up Web Audio Analyser & Event Tracking in Browser Context
  await page.evaluate(() => {
    window.__playbackMetrics = {
      events: [],
      samples: [],
      errors: [],
      stallCount: 0,
      waitingCount: 0,
      endedFired: false
    };

    const v = document.querySelector('.module-video-element');
    
    // Web Audio API setup to measure actual audio waveform energy
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaElementSource(v);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      window.__audioAnalyser = analyser;
      window.__audioCtx = audioCtx;
      window.__audioData = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      window.__playbackMetrics.audioError = e.toString();
    }

    // Monitor all standard HTML5 Media Events
    v.addEventListener('waiting', () => { window.__playbackMetrics.waitingCount++; window.__playbackMetrics.events.push('waiting'); });
    v.addEventListener('stalled', () => { window.__playbackMetrics.stallCount++; window.__playbackMetrics.events.push('stalled'); });
    v.addEventListener('error', (e) => { window.__playbackMetrics.errors.push(e.message || 'MediaError'); });
    v.addEventListener('ended', () => { window.__playbackMetrics.endedFired = true; window.__playbackMetrics.events.push('ended'); });
    v.addEventListener('playing', () => { window.__playbackMetrics.events.push('playing'); });
  });

  // 3. Start Playback
  console.log('Initiating video.play()...');
  const playInitiated = await page.evaluate(async () => {
    const v = document.querySelector('.module-video-element');
    if (window.__audioCtx && window.__audioCtx.state === 'suspended') {
      await window.__audioCtx.resume();
    }
    await v.play();
    return {
      paused: v.paused,
      duration: v.duration,
      readyState: v.readyState
    };
  });
  console.log('Playback initiated:', playInitiated);

  // 4. Sample metrics every 4 seconds across the complete 46s duration
  const totalSamples = 12; // 12 samples * 4s = ~48s
  for (let i = 1; i <= totalSamples; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const sample = await page.evaluate((sampleIdx) => {
      const v = document.querySelector('.module-video-element');
      let audioRms = 0;
      if (window.__audioAnalyser && window.__audioData) {
        window.__audioAnalyser.getByteTimeDomainData(window.__audioData);
        let sum = 0;
        for (let j = 0; j < window.__audioData.length; j++) {
          const val = (window.__audioData[j] - 128) / 128;
          sum += val * val;
        }
        audioRms = Math.sqrt(sum / window.__audioData.length);
      }

      let bufferedEnd = 0;
      if (v.buffered.length > 0) {
        bufferedEnd = v.buffered.end(v.buffered.length - 1);
      }

      const info = {
        sample: sampleIdx,
        time: parseFloat(v.currentTime.toFixed(2)),
        bufferedEnd: parseFloat(bufferedEnd.toFixed(2)),
        paused: v.paused,
        ended: v.ended,
        readyState: v.readyState,
        audioRms: parseFloat(audioRms.toFixed(4)),
        isAudioActive: audioRms > 0.001
      };
      window.__playbackMetrics.samples.push(info);
      return info;
    }, i);

    console.log(`[Sample ${i.toString().padStart(2, '0')}] Time: ${sample.time.toFixed(1)}s / ${playInitiated.duration.toFixed(1)}s | Buffered: ${sample.bufferedEnd}s | Audio RMS: ${sample.audioRms} (${sample.isAudioActive ? 'AUDIO ACTIVE' : 'PAUSE/FADE'}) | Ended: ${sample.ended}`);

    if (sample.ended) {
      console.log('Video has reached the end naturally via ended event!');
      break;
    }
  }

  // 5. Final Full Playback Audit
  const finalAudit = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    return {
      duration: v.duration,
      currentTime: v.currentTime,
      ended: v.ended,
      stalls: window.__playbackMetrics.stallCount,
      waiting: window.__playbackMetrics.waitingCount,
      errors: window.__playbackMetrics.errors,
      sampleCount: window.__playbackMetrics.samples.length,
      audioActiveCount: window.__playbackMetrics.samples.filter(s => s.isAudioActive).length
    };
  });
  console.log('\n--- FULL PLAYBACK AUDIT REPORT ---');
  console.log(JSON.stringify(finalAudit, null, 2));

  // 6. Test Fresh MkDocs Page Reload Verification
  console.log('\nTesting Fresh Page Reload...');
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.module-video-wrapper .module-video-element', { timeout: 10000 });
  const reloadState = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    return {
      mounted: !!v,
      hasControls: v.hasAttribute('controls'),
      readyState: v.readyState,
      duration: v.duration,
      currentSrc: v.currentSrc
    };
  });
  console.log('Reload Verification Result:', reloadState);

  // 7. High-Resolution Screenshots for Visual Inspection
  console.log('\nCapturing High-Resolution Screenshots...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: path.resolve(__dirname, 'renders/audit-desktop-1440.png'), fullPage: false });

  await page.setViewport({ width: 375, height: 812 }); // iPhone X/11/12 mobile viewport
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve(__dirname, 'renders/audit-mobile-375.png'), fullPage: false });

  await page.setViewport({ width: 768, height: 1024 }); // iPad tablet viewport
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve(__dirname, 'renders/audit-tablet-768.png'), fullPage: false });

  // 8. Overflow & Layout Audit
  const layoutAudit = await page.evaluate(() => {
    const v = document.querySelector('.module-video-element');
    const container = document.querySelector('.video-container');
    const body = document.body;
    return {
      bodyScrollWidth: body.scrollWidth,
      windowInnerWidth: window.innerWidth,
      horizontalOverflow: body.scrollWidth > window.innerWidth,
      videoWidth: v.offsetWidth,
      videoHeight: v.offsetHeight,
      containerWidth: container.offsetWidth
    };
  });
  console.log('Mobile Layout Overflow Audit:', layoutAudit);

  await browser.close();
  console.log('--- ALL CHECKS COMPLETED ---');
}

verifyFullPlayback().catch(err => {
  console.error('Playback Verification Failed:', err);
  process.exit(1);
});

