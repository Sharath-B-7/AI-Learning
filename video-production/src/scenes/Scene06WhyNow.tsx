import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene06WhyNow: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three converging forces matching speech:
  // "First, huge amounts of text..." (~4.2s, frame 126)
  const factor1 = spring({ frame: frame - 126, fps, config: { damping: 14, stiffness: 90 } });

  // "Second, computers became much more powerful..." (~7.8s, frame 234)
  const factor2 = spring({ frame: frame - 234, fps, config: { damping: 14, stiffness: 90 } });

  // "Third, better ways of designing these systems..." (~11.0s, frame 330)
  const factor3 = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 90 } });

  // Convergence animation towards center
  const convergence = spring({ frame: frame - 360, fps, config: { damping: 16, stiffness: 80 } });

  return (
    <SceneTransition durationInFrames={durationInFrames} type="fade">
      <div
        style={{
          width: '100%',
          height: '100%',
          background: THEME.colors.background,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: THEME.fonts.sans,
          padding: '110px 80px 70px 80px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Branding currentScene={6} totalScenes={9} sceneTitle="Why Is This Happening Now?" />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: THEME.colors.coral,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            The Catalyst Forces
          </div>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: THEME.colors.charcoalDark,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Three Converging Breakthroughs
          </h2>
        </div>

        {/* Three Factor Cards Connected to Center */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            width: '100%',
            maxWidth: 1400,
          }}
        >
          {/* Factor 1: Huge Text Data */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `2px solid ${factor1 > 0.5 ? THEME.colors.coralBorder : THEME.colors.borderLight}`,
              boxShadow: factor1 > 0.5 ? THEME.shadows.glowCoral : THEME.shadows.card,
              padding: '36px 30px',
              opacity: interpolate(factor1, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(factor1, [0, 1], [-40, 0])}px)`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: THEME.colors.coralLight,
                color: THEME.colors.coralDark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              1
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.coral, textTransform: 'uppercase', marginBottom: 8 }}>
              Massive Data
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
              Huge Amounts of Text
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
              Digitized world knowledge, research libraries, and open web text available as learning corpora.
            </p>
          </div>

          {/* Factor 2: Powerful Compute */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `2px solid ${factor2 > 0.5 ? THEME.colors.tealBorder : THEME.colors.borderLight}`,
              boxShadow: factor2 > 0.5 ? THEME.shadows.glowTeal : THEME.shadows.card,
              padding: '36px 30px',
              opacity: interpolate(factor2, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(factor2, [0, 1], [40, 0])}px)`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: THEME.colors.tealLight,
                color: THEME.colors.tealDark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              2
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.teal, textTransform: 'uppercase', marginBottom: 8 }}>
              Hardware Scale
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
              More Powerful Computers
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
              Specialized GPU hardware clusters capable of processing trillions of token parameters.
            </p>
          </div>

          {/* Factor 3: Better Design */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `2px solid ${factor3 > 0.5 ? THEME.colors.blue : THEME.colors.borderLight}`,
              boxShadow: factor3 > 0.5 ? THEME.shadows.card : THEME.shadows.card,
              padding: '36px 30px',
              opacity: interpolate(factor3, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(factor3, [0, 1], [40, 0])}px)`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: THEME.colors.blueLight,
                color: THEME.colors.blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              3
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 8 }}>
              Architectures
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
              Better System Design
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
              Novel neural network architectures (attention mechanisms) allowing models to learn relationships across text.
            </p>
          </div>
        </div>

        {/* Synthesis convergence badge */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(convergence, [0, 1], [0, 1]),
            transform: `scale(${interpolate(convergence, [0, 1], [0.9, 1])})`,
            background: THEME.colors.charcoalDark,
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: THEME.radius.pill,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: THEME.shadows.elevated,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <span style={{ color: THEME.colors.coral, fontSize: 18 }}>▼</span>
          All three forces combined to create today's Large Language Models
        </div>
      </div>
    </SceneTransition>
  );
};

