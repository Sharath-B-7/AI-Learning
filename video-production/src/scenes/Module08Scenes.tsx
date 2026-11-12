import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module08Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const cardSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
        padding: '0 120px',
      }}
    >
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          background: THEME.colors.coralLight,
          border: `1px solid ${THEME.colors.coralBorder}`,
          color: THEME.colors.coralDark,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '8px 24px',
          borderRadius: THEME.radius.pill,
          marginBottom: 24,
        }}
      >
        PART B • MODULE 08
      </div>

      <h1
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 68,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 20px 0',
          textAlign: 'center',
        }}
      >
        Prompting & <span style={{ color: THEME.colors.coral }}>Instructions</span>
      </h1>

      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '28px 48px',
          boxShadow: THEME.shadows.card,
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 24, color: THEME.colors.charcoalBody, margin: 0 }}>
          A prompt is simply what you type to Claude: <br />
          <strong>Ask clearly, just as you would with a brilliant new colleague.</strong>
        </p>
      </div>
    </div>
  );
};

export const Module08Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const p1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const p2 = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const p3 = spring({ frame: frame - 230, fps, config: { damping: 14 } });
  const p4 = spring({ frame: frame - 340, fps, config: { damping: 14 } });

  const parts = [
    { num: '01', title: 'Situation', desc: 'Explaining who you are & the context', color: THEME.colors.coral, springVal: p1 },
    { num: '02', title: 'Goal', desc: 'Stating exactly what you want produced', color: THEME.colors.teal, springVal: p2 },
    { num: '03', title: 'Background', desc: 'Providing the facts, rules & files needed', color: THEME.colors.blue, springVal: p3 },
    { num: '04', title: 'Format', desc: 'Specifying length, structure & tone', color: THEME.colors.purple, springVal: p4 },
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
      <div style={{ textAlign: 'center', marginBottom: 28, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.tealLight,
            color: THEME.colors.tealDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 10,
          }}
        >
          FIGURE 8 • ANATOMY OF A GOOD REQUEST
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          The Four Parts of an Effective Prompt
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, width: 1060 }}>
        {parts.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 20px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${p.springVal})`,
              opacity: p.springVal,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: p.color,
                background: THEME.colors.backgroundSubtle,
                padding: '4px 12px',
                borderRadius: THEME.radius.pill,
                alignSelf: 'flex-start',
                marginBottom: 14,
              }}
            >
              PART {p.num}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.45 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module08Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const tipsSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const draftSpring = spring({ frame: frame - 200, fps, config: { damping: 14 } });

  const tips = [
    { title: 'Show an Example', desc: 'Paste a reference sample to imitate', icon: '📋' },
    { title: 'Set Boundaries', desc: 'Specify what to avoid (e.g. no jargon)', icon: '🚧' },
    { title: 'Break into Steps', desc: 'Divide large tasks into smaller milestones', icon: '🪜' },
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
      <div style={{ textAlign: 'center', marginBottom: 28, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Techniques & <span style={{ color: THEME.colors.teal }}>Iterative Refinement</span>
        </h2>
      </div>

      {/* 3 Tips */}
      <div style={{ display: 'flex', gap: 24, width: 1000, marginBottom: 24, transform: `scale(${tipsSpring})`, opacity: tipsSpring }}>
        {tips.map((t, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.lg,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ fontSize: 32 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>{t.title}</div>
              <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Working Draft Callout */}
      <div
        style={{
          width: 1000,
          background: THEME.colors.tealLight,
          border: `2px solid ${THEME.colors.tealBorder}`,
          borderRadius: THEME.radius.xl,
          padding: '24px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${draftSpring})`,
          opacity: draftSpring,
        }}
      >
        <span style={{ fontSize: 40 }}>💡</span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.tealDark, marginBottom: 4 }}>
            Treat the First Reply as a Working Draft
          </div>
          <div style={{ fontSize: 16, color: THEME.colors.charcoalBody }}>
            A quick follow-up correction saves time and guides Claude to the exact answer you need.
          </div>
        </div>
      </div>
    </div>
  );
};

