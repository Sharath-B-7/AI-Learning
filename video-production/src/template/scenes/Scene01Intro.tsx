import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../../styles/theme';

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const badgeSpring = spring({ frame, fps, config: { damping: 14 } });
  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const cardSpring = spring({ frame: frame - 16, fps, config: { damping: 14 } });

  // Subtle float
  const floatY = Math.sin(frame / 20) * 4;

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
        position: 'relative',
      }}
    >
      {/* Module Pill */}
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
          boxShadow: THEME.shadows.subtle,
        }}
      >
        Part A • Module 01
      </div>

      {/* Main Title */}
      <h1
        style={{
          transform: `scale(${titleSpring}) translateY(${floatY}px)`,
          opacity: titleSpring,
          fontSize: 76,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 32px 0',
          letterSpacing: '-0.03em',
          textAlign: 'center',
        }}
      >
        What Is <span style={{ color: THEME.colors.coral }}>Artificial Intelligence</span>?
      </h1>

      {/* The Umbrella Concept Card */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 48px',
          maxWidth: 960,
          boxShadow: THEME.shadows.card,
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: THEME.radius.lg,
            background: THEME.colors.tealLight,
            border: `1px solid ${THEME.colors.tealBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={THEME.colors.tealDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>

        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: THEME.colors.tealDark,
              marginBottom: 8,
              letterSpacing: '0.02em',
            }}
          >
            THE BIG UMBRELLA
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: THEME.colors.charcoalBody,
              lineHeight: 1.35,
            }}
          >
            Computer programs that perform smart tasks normally requiring human thinking.
          </div>
        </div>
      </div>
    </div>
  );
};
