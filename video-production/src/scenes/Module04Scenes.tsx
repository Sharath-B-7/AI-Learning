import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module04Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const panelsSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const unevenSpring = spring({ frame: frame - 500, fps, config: { damping: 14 } });

  const strengths = ['Drafting messages', 'Rewriting for clarity', 'Summarizing long docs', 'Explaining difficult concepts', 'Organizing messy tables'];
  const limits = ['Exact figures & numbers', 'Mental calculations', 'Recent real-time events', 'Information not shared with it'];

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
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          PART A • MODULE 04
        </div>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          AI Strengths vs. <span style={{ color: THEME.colors.coral }}>Areas Requiring Care</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1040, transform: `scale(${panelsSpring})`, opacity: panelsSpring }}>
        {/* Strengths */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>✨</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.tealDark }}>Where AI Excels</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {strengths.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: THEME.colors.charcoalBody }}>
                <span style={{ color: THEME.colors.teal, fontWeight: 900 }}>✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Limits */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.coralDark }}>Requires Human Care</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {limits.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: THEME.colors.charcoalBody }}>
                <span style={{ color: THEME.colors.coral, fontWeight: 900 }}>!</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Uneven skill badge */}
      <div
        style={{
          marginTop: 24,
          background: THEME.colors.backgroundSubtle,
          border: `1px solid ${THEME.colors.borderMedium}`,
          padding: '10px 28px',
          borderRadius: THEME.radius.pill,
          fontSize: 16,
          fontWeight: 700,
          color: THEME.colors.charcoalMuted,
          transform: `scale(${unevenSpring})`,
          opacity: unevenSpring,
        }}
      >
        📌 AI skill is uneven: success on one task does not guarantee success on another.
      </div>
    </div>
  );
};

export const Module04Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const card3 = spring({ frame: frame - 250, fps, config: { damping: 14 } });

  const tiers = [
    {
      title: 'Low Stakes',
      badge: 'QUICK READ',
      action: 'A quick read is enough',
      example: 'Brainstorming, rough drafts, concept outlines',
      color: THEME.colors.teal,
      bg: THEME.colors.tealLight,
      springVal: card1,
    },
    {
      title: 'Medium Stakes',
      badge: 'VERIFY KEY FACTS',
      action: 'Check key facts & figures',
      example: 'Shared internal reports, team memos',
      color: THEME.colors.blue,
      bg: THEME.colors.blueLight,
      springVal: card2,
    },
    {
      title: 'High Stakes',
      badge: 'FULL EXPERT REVIEW',
      action: 'Conduct full review with an expert',
      example: 'Legal, financial, or customer-facing work',
      color: THEME.colors.coral,
      bg: THEME.colors.coralLight,
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
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
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
          FIGURE 4 • THE TRUST RULE
        </div>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Check in Proportion to the Stakes
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1060 }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 24px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${t.springVal})`,
              opacity: t.springVal,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                background: t.bg,
                color: t.color,
                fontSize: 14,
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: THEME.radius.pill,
                alignSelf: 'flex-start',
                marginBottom: 14,
              }}
            >
              {t.badge}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {t.title}
            </h3>
            <p style={{ fontSize: 17, fontWeight: 700, color: t.color, margin: '0 0 12px 0' }}>
              {t.action}
            </p>
            <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0, marginTop: 'auto' }}>
              e.g. {t.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module04Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldSpring = spring({ frame, fps, config: { damping: 14 } });

  const protectedItems = [
    { label: 'Passwords & Credentials', icon: '🔑' },
    { label: 'Customer Personal Data (PII)', icon: '👤' },
    { label: 'Confidential Company Information', icon: '🔒' },
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
        padding: '0 120px',
      }}
    >
      <div
        style={{
          transform: `scale(${shieldSpring})`,
          opacity: shieldSpring,
          background: THEME.colors.cardBackground,
          border: `3px solid ${THEME.colors.coral}`,
          borderRadius: THEME.radius.xl,
          padding: '48px 64px',
          boxShadow: THEME.shadows.card,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 16 }}>🛡️</div>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 16px 0' }}>
          Protect Confidentiality & Privacy
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.coralDark, fontWeight: 800, margin: '0 0 32px 0' }}>
          Never paste confidential or sensitive assets into AI prompts:
        </p>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {protectedItems.map((p, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: THEME.colors.coralLight,
                border: `1px solid ${THEME.colors.coralBorder}`,
                borderRadius: THEME.radius.lg,
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: THEME.colors.coralDark }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

