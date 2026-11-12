import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../../styles/theme';

export const Scene04Colleague: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1Spring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2Spring = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const outroSpring = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // Fade out at end of video (last 15 frames)
  const fadeOut = interpolate(frame, [285, 303], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px',
        fontFamily: THEME.fonts.sans,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 16,
          fontWeight: 800,
          color: THEME.colors.coralDark,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        A Useful Mental Model
      </div>

      <h2
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 52,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 40px 0',
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        Working With Claude
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
          width: '100%',
          maxWidth: 1180,
          marginBottom: 36,
        }}
      >
        {/* The New Colleague Card */}
        <div
          style={{
            transform: `scale(${card1Spring})`,
            opacity: card1Spring,
            background: '#ffffff',
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px 36px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: THEME.radius.md,
                background: THEME.colors.coralLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              🤝
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.coralDark, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Mental Model
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.charcoalDark }}>
                The New Colleague
              </div>
            </div>
          </div>

          <p style={{ fontSize: 17, color: THEME.colors.charcoalBody, lineHeight: 1.5, margin: 0 }}>
            Read an enormous amount and works instantly, but knows nothing about your company, projects, or customers until you explain it.
          </p>
        </div>

        {/* The Action Rules Card */}
        <div
          style={{
            transform: `scale(${card2Spring})`,
            opacity: card2Spring,
            background: '#ffffff',
            border: `2px solid ${THEME.colors.teal}`,
            borderRadius: THEME.radius.xl,
            padding: '32px 36px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: THEME.radius.md,
                background: THEME.colors.tealLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              ✅
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.tealDark, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Best Practices
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.charcoalDark }}>
                Two Essential Habits
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#f0fdfa', border: `1px solid ${THEME.colors.tealBorder}`, padding: '10px 16px', borderRadius: THEME.radius.md, fontSize: 16, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>1.</span> Provide Clear Context
            </div>
            <div style={{ background: '#f0fdfa', border: `1px solid ${THEME.colors.tealBorder}`, padding: '10px 16px', borderRadius: THEME.radius.md, fontSize: 16, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>2.</span> Always Verify Their Work
            </div>
          </div>
        </div>
      </div>

      {/* AI Masterclass Outro Bar */}
      <div
        style={{
          transform: `scale(${outroSpring})`,
          opacity: outroSpring,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: THEME.colors.charcoalDark,
          color: '#ffffff',
          padding: '10px 24px',
          borderRadius: 999,
          boxShadow: THEME.shadows.card,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.colors.coral }} />
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.06em' }}>AI MASTERCLASS</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>Continue to Module 02: What Is an LLM?</span>
      </div>
    </div>
  );
};

