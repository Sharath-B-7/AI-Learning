const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');

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

async function testAll13Audio() {
  console.log('=== VERIFYING AUDIO PLAYBACK ON ALL 13 MODULES ===\n');

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

      // Wait 2.5 seconds to reach voice-over
      await new Promise(r => setTimeout(r, 2500));

      // Sample audio RMS
      const audioMetrics = await page.evaluate(() => {
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
          defaultMuted: v.defaultMuted,
          volume: v.volume,
          peak: parseFloat(peak.toFixed(4)),
          rms: parseFloat(rms.toFixed(4)),
          isAudible: rms > 0.005,
          paused: v.paused,
          duration: v.duration
        };
      });

      const res = {
        module: m.id,
        title: m.title,
        duration: audioMetrics.duration,
        currentTime: audioMetrics.currentTime,
        volume: audioMetrics.volume,
        muted: audioMetrics.muted,
        peak: audioMetrics.peak,
        rms: audioMetrics.rms,
        audible: audioMetrics.isAudible,
        status: audioMetrics.isAudible ? 'AUDIBLE' : 'LOW/PAUSE'
      };
      results.push(res);
      console.log(`Module ${m.id} (${m.title}): Time=${res.currentTime.toFixed(2)}s, Vol=${res.volume}, Muted=${res.muted}, Peak=${res.peak}, RMS=${res.rms} -> ${res.status}`);

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
  console.log('\n=== ALL 13 MODULES AUDIO TEST RESULTS ===');
  console.table(results);
}

testAll13Audio().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});

