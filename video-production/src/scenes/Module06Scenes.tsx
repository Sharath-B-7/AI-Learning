import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module06Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const haikuSpring = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const sonnetSpring = spring({ frame: frame - 380, fps, config: { damping: 14 } });
  const opusSpring = spring({ frame: frame - 530, fps, config: { damping: 14 } });

  const tiers = [
    {
      name: 'Haiku',
      badge: 'SMALL & FAST',
      role: 'Quick edits, sorting & short summaries',
      speed: '⚡ Lightning Fast',
      color: THEME.colors.teal,
      bg: THEME.colors.tealLight,
      border: THEME.colors.tealBorder,
      springVal: haikuSpring,
    },
    {
      name: 'Sonnet',
      badge: 'BALANCED MID-RANGE',
      role: 'Everyday drafting, coding & analysis',
      speed: '⚖️ Optimal Balance',
      color: THEME.colors.coral,
      bg: THEME.colors.coralLight,
      border: THEME.colors.coralBorder,
      springVal: sonnetSpring,
    },
    {
      name: 'Opus',
      badge: 'MOST CAPABLE',
      role: 'Hard, multi-step & high-stakes problems',
      speed: '🧠 Deep Reasoning',
      color: THEME.colors.blue,
      bg: THEME.colors.blueLight,
      border: THEME.colors.borderMedium,
      springVal: opusSpring,
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
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          The Claude <span style={{ color: THEME.colors.coral }}>Model Family</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Like hiring help: match the model tier to the task
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1060 }}>
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${t.border}`,
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
                fontSize: 13,
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
            <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 16px 0', lineHeight: 1.45 }}>
              {t.role}
            </p>
            <div
              style={{
                marginTop: 'auto',
                fontSize: 14,
                fontWeight: 700,
                color: THEME.colors.charcoalMuted,
                background: THEME.colors.backgroundSubtle,
                padding: '8px 12px',
                borderRadius: THEME.radius.md,
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

export const Module06Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 180, fps, config: { damping: 14 } });

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
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Thinking Models & <span style={{ color: THEME.colors.teal }}>Multimodal Inputs</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1000 }}>
        {/* Thinking models */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card1})`,
            opacity: card1,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>📝</div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            Thinking Models
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 16px 0', lineHeight: 1.5 }}>
            Work through complex logic step by step before answering—like working it out on paper.
          </p>
          <div
            style={{
              background: THEME.colors.backgroundSubtle,
              padding: '8px 16px',
              borderRadius: THEME.radius.pill,
              fontSize: 14,
              fontWeight: 700,
              color: THEME.colors.charcoalMuted,
            }}
          >
            Enhanced reasoning for math & architecture
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
          <div style={{ fontSize: 44, marginBottom: 12 }}>🖼️</div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            Multimodal Processing
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 16px 0', lineHeight: 1.5 }}>
            Claude understands rich visual documents alongside text:
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {['📊 Charts', '📄 PDFs', '🖊️ Whiteboards'].map((tag, idx) => (
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

export const Module06Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ruleSpring = spring({ frame, fps, config: { damping: 14 } });

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
          transform: `scale(${ruleSpring})`,
          opacity: ruleSpring,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '48px 64px',
          boxShadow: THEME.shadows.card,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 20,
          }}
        >
          FIGURE 6 • SELECTION STRATEGY
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 16px 0' }}>
          Match the Model to the Job
        </h2>
        <div
          style={{
            background: THEME.colors.tealLight,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.pill,
            padding: '16px 36px',
            display: 'inline-block',
            fontSize: 24,
            fontWeight: 800,
            color: THEME.colors.tealDark,
            marginBottom: 20,
          }}
        >
          Start balanced with Sonnet — bigger is not always better!
        </div>
        <p style={{ fontSize: 18, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Smaller models run faster and cost less for standard tasks.
        </p>
      </div>
    </div>
  );
};

