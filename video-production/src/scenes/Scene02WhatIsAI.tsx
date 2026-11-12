import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene02WhatIsAI: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const coreSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const card1Spring = spring({
    frame: frame - 180, // ~6s into scene: "understanding language"
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const card2Spring = spring({
    frame: frame - 250, // ~8.3s: "spotting patterns"
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const card3Spring = spring({
    frame: frame - 310, // ~10.3s: "and making suggestions"
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const pulse = Math.sin(frame * 0.1) * 3;

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
          padding: '120px 80px 80px 80px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Branding currentScene={2} totalScenes={9} sceneTitle="Defining Artificial Intelligence" />

        {/* Central Definition Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 1100,
            marginBottom: 40,
            opacity: interpolate(coreSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(coreSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: THEME.colors.teal,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Core Definition
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: THEME.colors.charcoalDark,
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Programs That Perform Tasks Requiring Human Thinking
          </h2>
          <p
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: THEME.colors.charcoalMuted,
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            Unlike static calculators, an <strong style={{ color: THEME.colors.coral }}>AI system</strong> processes unstructured inputs to interpret meaning and infer outcomes.
          </p>
        </div>

        {/* Technical Three-Node Architecture */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 36,
            width: '100%',
            maxWidth: 1400,
            marginTop: 20,
          }}
        >
          {/* Card 1: Understanding Language */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              padding: '36px 30px',
              border: `2px solid ${card1Spring > 0.5 ? THEME.colors.tealBorder : THEME.colors.borderLight}`,
              boxShadow: card1Spring > 0.5 ? THEME.shadows.glowTeal : THEME.shadows.card,
              opacity: interpolate(card1Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px)`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: THEME.radius.md,
                background: THEME.colors.tealLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                color: THEME.colors.tealDark,
              }}
            >
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="8" y1="9" x2="16" y2="9"></line>
                <line x1="8" y1="13" x2="14" y2="13"></line>
              </svg>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: THEME.colors.teal,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Capability 01
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: THEME.colors.charcoalDark,
                margin: '0 0 12px 0',
              }}
            >
              Understanding Language
            </h3>
            <p
              style={{
                fontSize: 16,
                color: THEME.colors.charcoalMuted,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Interpreting sentences, parsing complex instructions, semantic intent, and context across paragraphs.
            </p>
          </div>

          {/* Card 2: Spotting Patterns */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              padding: '36px 30px',
              border: `2px solid ${card2Spring > 0.5 ? THEME.colors.coralBorder : THEME.colors.borderLight}`,
              boxShadow: card2Spring > 0.5 ? THEME.shadows.glowCoral : THEME.shadows.card,
              opacity: interpolate(card2Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px)`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: THEME.radius.md,
                background: THEME.colors.coralLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                color: THEME.colors.coralDark,
              }}
            >
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: THEME.colors.coral,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Capability 02
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: THEME.colors.charcoalDark,
                margin: '0 0 12px 0',
              }}
            >
              Spotting Patterns
            </h3>
            <p
              style={{
                fontSize: 16,
                color: THEME.colors.charcoalMuted,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Finding trends in noisy text, correlating scattered data points, and detecting underlying structures.
            </p>
          </div>

          {/* Card 3: Making Suggestions */}
          <div
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              padding: '36px 30px',
              border: `2px solid ${card3Spring > 0.5 ? THEME.colors.blue : THEME.colors.borderLight}`,
              boxShadow: card3Spring > 0.5 ? THEME.shadows.card : THEME.shadows.card,
              opacity: interpolate(card3Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(card3Spring, [0, 1], [40, 0])}px)`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: THEME.radius.md,
                background: THEME.colors.blueLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                color: THEME.colors.blue,
              }}
            >
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="12 8 8 12 12 16 12 8"></polygon>
                <line x1="16" y1="12" x2="12" y2="12"></line>
              </svg>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: THEME.colors.blue,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Capability 03
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: THEME.colors.charcoalDark,
                margin: '0 0 12px 0',
              }}
            >
              Making Suggestions
            </h3>
            <p
              style={{
                fontSize: 16,
                color: THEME.colors.charcoalMuted,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Recommending next words, formulating actionable draft proposals, and predicting likely completions.
            </p>
          </div>
        </div>
      </div>
    </SceneTransition>
  );
};

