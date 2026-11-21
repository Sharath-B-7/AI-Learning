import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module06Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 280, fps, config: { damping: 14 } });
  const card3 = spring({ frame: frame - 440, fps, config: { damping: 14 } });

  const badges = [
    { title: 'SPEED', desc: 'Latency & Triage', color: THEME.colors.teal, bg: THEME.colors.tealLight, val: card1 },
    { title: 'BALANCE', desc: 'Everyday Workhorse', color: THEME.colors.coral, bg: THEME.colors.coralLight, val: card2 },
    { title: 'INTELLIGENCE', desc: 'Complex Architecture', color: THEME.colors.blue, bg: THEME.colors.blueLight, val: card3 },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 40, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          PART B • MODULE 06
        </div>
        <h1 style={{ fontSize: 58, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          The Claude <span style={{ color: THEME.colors.coral }}>Model Family</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Anthropic foundation models: engineering tradeoffs in speed, cost & depth
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1100 }}>
        {badges.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '36px 28px',
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
              transform: `scale(${b.val})`,
              opacity: b.val,
            }}
          >
            <div
              style={{
                background: b.bg,
                color: b.color,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: THEME.radius.pill,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              {b.title}
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {b.desc}
            </h3>
            <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0 }}>
              Tailored for distinct operational workloads on Windows
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module06Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const haikuSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const sonnetSpring = spring({ frame: frame - 380, fps, config: { damping: 14 } });
  const opusSpring = spring({ frame: frame - 720, fps, config: { damping: 14 } });

  const tiers = [
    {
      name: 'Haiku',
      badge: 'LIGHTWEIGHT & RAPID',
      role: 'Quick edits, file sorting & basic classification',
      speed: '⚡ Lightning Fast (~$0.25/MTok)',
      color: THEME.colors.teal,
      bg: THEME.colors.tealLight,
      border: THEME.colors.tealBorder,
      springVal: haikuSpring,
      active: frame >= 60 && frame < 380,
    },
    {
      name: 'Sonnet',
      badge: 'BALANCED WORKHORSE',
      role: 'Everyday coding, architecture planning & analysis',
      speed: '⚖️ Standard Developer Daily (~$3/MTok)',
      color: THEME.colors.coral,
      bg: THEME.colors.coralLight,
      border: THEME.colors.coralBorder,
      springVal: sonnetSpring,
      active: frame >= 380 && frame < 720,
    },
    {
      name: 'Opus',
      badge: 'MAXIMUM INTELLIGENCE',
      role: 'Challenging high-stakes reasoning & deep refactoring',
      speed: '🧠 Deep Cognitive Power (~$15/MTok)',
      color: THEME.colors.blue,
      bg: THEME.colors.blueLight,
      border: THEME.colors.borderMedium,
      springVal: opusSpring,
      active: frame >= 720,
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Comparing the Three Model Tiers
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Match the model capability directly to the stakes of your task
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1160 }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${t.active ? t.color : t.border}`,
              borderRadius: THEME.radius.xl,
              padding: '30px 24px',
              boxShadow: t.active ? THEME.shadows.elevated : THEME.shadows.card,
              transform: `scale(${t.active ? 1.04 : 1.0})`,
              transition: 'all 0.3s ease',
              opacity: t.springVal,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                background: t.bg,
                color: t.color,
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: THEME.radius.pill,
                alignSelf: 'flex-start',
                marginBottom: 16,
              }}
            >
              {t.badge}
            </div>
            <h3 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              Claude {t.name}
            </h3>
            <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 16px 0', lineHeight: 1.5, flex: 1 }}>
              {t.role}
            </p>
            <div
              style={{
                background: THEME.colors.backgroundSubtle,
                padding: '10px 14px',
                borderRadius: THEME.radius.md,
                fontSize: 13,
                fontWeight: 700,
                color: THEME.colors.charcoalMuted,
              }}
            >
              {t.speed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module06Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 380, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 100px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 40, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Advanced Capabilities: Extended Thinking & Multimodal
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Scratchpad reasoning for algorithms and visual document comprehension
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1100 }}>
        {/* Extended Thinking */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card1})`,
            opacity: card1,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Extended Thinking
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 18px 0', lineHeight: 1.5 }}>
            Grants Claude dedicated scratchpad space to reason through difficult edge cases before outputting code.
          </p>
          <div
            style={{
              background: '#0f172a',
              color: '#38bdf8',
              fontFamily: THEME.fonts.mono,
              padding: '12px 18px',
              borderRadius: THEME.radius.md,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            &gt; /effort high
          </div>
        </div>

        {/* Multimodal */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card2})`,
            opacity: card2,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Multimodal Processing
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 18px 0', lineHeight: 1.5 }}>
            Drag and drop architectural diagrams, UI mockups, and PDFs directly into your terminal session.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {['📊 System Architecture', '📄 PDF Reports', '📐 UI Wireframes'].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: THEME.colors.tealLight,
                  color: THEME.colors.tealDark,
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: THEME.radius.pill,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module06Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const recapSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: THEME.fonts.sans,
        padding: '0 100px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 30, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Claude Code CLI & In-Session Commands
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Launch with a model flag in PowerShell or switch dynamically inside your session
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1100 }}>
        {/* Terminal commands */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${terminalSpring})`,
            opacity: terminalSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}># Windows PowerShell Launch</div>
          <div style={{ color: '#f8fafc', fontSize: 16, marginBottom: 20 }}>
            <span style={{ color: '#38bdf8' }}>PS&gt;</span> claude <span style={{ color: '#fb923c' }}>--model</span> sonnet
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}># Switch Model Inside Active Session</div>
          <div style={{ color: '#f8fafc', fontSize: 16 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> <span style={{ color: '#a78bfa' }}>/model</span>
          </div>
        </div>

        {/* Golden Rule Recap */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${recapSpring})`,
            opacity: recapSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: THEME.colors.tealLight,
              color: THEME.colors.tealDark,
              fontSize: 13,
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: THEME.radius.pill,
              alignSelf: 'flex-start',
              marginBottom: 12,
            }}
          >
            GOLDEN RULE
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Match the Model to the Task
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Start with <strong>Sonnet</strong> for daily work. Switch to <strong>Haiku</strong> for rapid triage, and summon <strong>Opus</strong> for complex architecture. Bigger is not always better!
          </p>
        </div>
      </div>
    </div>
  );
};
