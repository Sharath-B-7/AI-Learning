const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = path.resolve(__dirname, 'node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');

const MODULE_PAGES = [
  { id: '01', title: 'What Is AI?', url: 'http://127.0.0.1:8088/foundations/part-a/module-01-what-is-ai/' },
  { id: '02', title: 'What Is an LLM?', url: 'http://127.0.0.1:8088/foundations/part-a/module-02-what-is-an-llm/' },
  { id: '03', title: 'How Does an LLM Work?', url: 'http://127.0.0.1:8088/foundations/part-a/module-03-how-llms-work/' },
  { id: '04', title: 'Strengths, Limits, and Trust', url: 'http://127.0.0.1:8088/foundations/part-a/module-04-strengths-limits-trust/' },
  { id: '05', title: 'Meet Claude', url: 'http://127.0.0.1:8088/foundations/part-a/module-05-meet-claude/' },
  { id: '06', title: 'Types of Models', url: 'http://127.0.0.1:8088/foundations/part-b/module-06-types-of-models/' },
  { id: '07', title: 'Context', url: 'http://127.0.0.1:8088/foundations/part-b/module-07-context/' },
  { id: '08', title: 'Prompting and Instructions', url: 'http://127.0.0.1:8088/foundations/part-b/module-08-prompting/' },
  { id: '09', title: 'Memory', url: 'http://127.0.0.1:8088/foundations/part-b/module-09-memory/' },
  { id: '10', title: 'Skills', url: 'http://127.0.0.1:8088/foundations/part-b/module-10-skills/' },
  { id: '11', title: 'Tools and the Harness', url: 'http://127.0.0.1:8088/foundations/part-b/module-11-tools-and-harness/' },
  { id: '12', title: 'Agents', url: 'http://127.0.0.1:8088/foundations/part-b/module-12-agents/' },
  { id: '13', title: 'Permissions and Safety', url: 'http://127.0.0.1:8088/foundations/part-b/module-13-permissions-and-safety/' },
];

async function testAll13MultiSample() {
  console.log('=== MULTI-SAMPLE AUDIO PLAYBACK VERIFICATION (ALL 13 MODULES) ===\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const results = [];

  for (const m of MODULE_PAGES) {
    const page = await browser.newPage();
    try {
      await page.goto(m.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForSelector('.module-video-element', { timeout: 8000 });

      // Setup Web Audio Analyser
      await page.evaluate(() => {
        const v = document.querySelector('.module-video-element');
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
      });

      // Play video
      await page.evaluate(async () => {
        const v = document.querySelector('.module-video-element');
        if (window.__audioCtx && window.__audioCtx.state === 'suspended') {
          await window.__audioCtx.resume();
        }
        await v.play();
      });

      // Sample 5 times across 5 seconds (1.0s, 2.0s, 3.0s, 4.0s, 5.0s)
      let maxPeak = 0;
      let maxRms = 0;
      let lastTime = 0;
      let volume = 1;
      let muted = false;

      for (let step = 0; step < 5; step++) {
        await new Promise(r => setTimeout(r, 1000));
        const sample = await page.evaluate(() => {
          const v = document.querySelector('.module-video-element');
          window.__analyser.getFloatTimeDomainData(window.__pcmBuffer);
          let sumSquares = 0;
          let peak = 0;
          for (let i = 0; i < window.__pcmBuffer.length; i++) {
            const val = window.__pcmBuffer[i];
            sumSquares += val * val;
            if (Math.abs(val) > peak) peak = Math.abs(val);
          }
          const rms = Math.sqrt(sumSquares / window.__pcmBuffer.length);
          return {
            currentTime: v.currentTime,
            muted: v.muted,
            volume: v.volume,
            peak,
            rms
          };
        });

        if (sample.peak > maxPeak) maxPeak = sample.peak;
        if (sample.rms > maxRms) maxRms = sample.rms;
        lastTime = sample.currentTime;
        volume = sample.volume;
        muted = sample.muted;
      }

      const res = {
        module: m.id,
        title: m.title,
        timeSampled: `${lastTime.toFixed(1)}s`,
        volume,
        muted,
        maxPeak: parseFloat(maxPeak.toFixed(4)),
        maxRms: parseFloat(maxRms.toFixed(4)),
        audible: maxRms > 0.005,
        status: maxRms > 0.005 ? 'VERIFIED AUDIBLE' : 'INSUFFICIENT_LEVEL'
      };
      results.push(res);
      console.log(`Module ${m.id} (${m.title}): Time=${res.timeSampled}, Vol=${res.volume}, Muted=${res.muted}, MaxPeak=${res.maxPeak}, MaxRMS=${res.maxRms} -> ${res.status}`);

    } catch (err) {
      results.push({
        module: m.id,
        title: m.title,
        error: err.message,
        status: 'ERROR'
      });
      console.error(`Module ${m.id} ERROR:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n=== MULTI-SAMPLE VERIFICATION SUMMARY ===');
  console.table(results);
}

testAll13MultiSample().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});

