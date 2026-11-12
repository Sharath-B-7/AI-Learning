import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module03Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14 } });
  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 14 } });

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
          transform: `scale(${badgeSpring})`,
          opacity: badgeSpring,
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
        Part A • Module 03
      </div>

      <h1
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 72,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 20px 0',
          textAlign: 'center',
        }}
      >
        How Does an <span style={{ color: THEME.colors.coral }}>LLM Work</span>?
      </h1>

      <p style={{ fontSize: 28, color: THEME.colors.charcoalMuted, margin: 0, textAlign: 'center' }}>
        The 4-Step Journey: From Training to Your Reply
      </p>
    </div>
  );
};

export const Module03Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });
  const step1Spring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const step2Spring = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const step3Spring = spring({ frame: frame - 380, fps, config: { damping: 14 } });
  const step4Spring = spring({ frame: frame - 520, fps, config: { damping: 14 } });

  const steps = [
    { num: '01', title: 'Pre-Training', subtitle: 'Learns patterns & facts from vast text', color: THEME.colors.coral, springVal: step1Spring },
    { num: '02', title: 'Fine-Tuning', subtitle: 'Human feedback shapes a helpful assistant', color: THEME.colors.coral, springVal: step2Spring },
    { num: '03', title: 'Tokenization', subtitle: 'Your message is converted into tokens', color: THEME.colors.teal, springVal: step3Spring },
    { num: '04', title: 'Generation', subtitle: 'Predicts reply token-by-token', color: THEME.colors.teal, springVal: step4Spring },
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
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${headerSpring})`, opacity: headerSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.tealLight,
            color: THEME.colors.tealDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          FIGURE 3 • THE 4-STEP PIPELINE
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          From Model Training to Your Generated Reply
        </h2>
      </div>

      {/* 4 Cards Pipeline */}
      <div style={{ display: 'flex', gap: 20, width: 1100, alignItems: 'stretch' }}>
        {steps.map((st, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '24px 20px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${st.springVal})`,
              opacity: st.springVal,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: st.color,
                background: st.color === THEME.colors.coral ? THEME.colors.coralLight : THEME.colors.tealLight,
                padding: '4px 12px',
                borderRadius: THEME.radius.pill,
                alignSelf: 'flex-start',
                marginBottom: 16,
              }}
            >
              STEP {st.num}
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {st.title}
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.4 }}>
              {st.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module03Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const card3 = spring({ frame: frame - 50, fps, config: { damping: 14 } });

  const essentials = [
    {
      title: 'Knowledge Cutoff',
      badge: 'FIXED DATE',
      desc: 'The model has a fixed cutoff date and does not know newer facts.',
      icon: '📅',
      color: THEME.colors.charcoalDark,
      springVal: card1,
    },
    {
      title: 'No Live Lookup',
      badge: 'TRAINED MEMORY',
      desc: 'Answers are generated from training weights, not live web lookups.',
      icon: '🔌',
      color: THEME.colors.blue,
      springVal: card2,
    },
    {
      title: 'Hallucination Risk',
      badge: 'ALWAYS VERIFY',
      desc: 'Can invent false details with complete confidence. Always check!',
      icon: '⚠️',
      color: THEME.colors.coral,
      springVal: card3,
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
        padding: '0 100px',
      }}
    >
      <h2
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 50,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 36px 0',
          textAlign: 'center',
        }}
      >
        Three Critical <span style={{ color: THEME.colors.coral }}>Essentials</span>
      </h2>

      <div style={{ display: 'flex', gap: 28, width: 1040 }}>
        {essentials.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '32px 24px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${item.springVal})`,
              opacity: item.springVal,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>{item.icon}</div>
            <span
              style={{
                display: 'inline-block',
                fontSize: 13,
                fontWeight: 800,
                color: item.color,
                background: THEME.colors.backgroundSubtle,
                padding: '4px 12px',
                borderRadius: THEME.radius.pill,
                marginBottom: 12,
              }}
            >
              {item.badge}
            </span>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.45 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

