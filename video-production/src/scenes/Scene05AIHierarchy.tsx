import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene05AIHierarchy: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequential levels matching narration:
  // "AI is the big umbrella" (~7.8s, frame 234)
  const l1Spring = spring({ frame: frame - 234, fps, config: { damping: 14, stiffness: 90 } });

  // "Machine learning is a way of building AI..." (~15.2s, frame 456)
  const l2Spring = spring({ frame: frame - 456, fps, config: { damping: 14, stiffness: 90 } });

  // "A large language model, or LLM..." (~22.8s, frame 684)
  const l3Spring = spring({ frame: frame - 684, fps, config: { damping: 14, stiffness: 90 } });

  // "Claude is one example" (~27.2s, frame 816)
  const claudeSpring = spring({ frame: frame - 816, fps, config: { damping: 12, stiffness: 100 } });

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
        <Branding currentScene={5} totalScenes={9} sceneTitle="How the Terms Fit Together" />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: THEME.colors.teal,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Conceptual Hierarchy
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
            Each Term Sits Inside the One Before It
          </h2>
        </div>

        {/* Concentric Nested Technical Architecture */}
        <div
          style={{
            position: 'relative',
            width: 1360,
            height: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Level 1: Outer Container — Artificial Intelligence */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: THEME.colors.cardBackground,
              borderRadius: 32,
              border: `2.5px solid ${THEME.colors.charcoalDark}`,
              boxShadow: THEME.shadows.card,
              padding: '24px 32px',
              opacity: interpolate(l1Spring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(l1Spring, [0, 1], [0.94, 1])})`,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ background: THEME.colors.charcoalDark, color: '#ffffff', fontSize: 13, fontWeight: 900, padding: '4px 12px', borderRadius: 6 }}>
                  LEVEL 1
                </span>
                <span style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark }}>
                  Artificial Intelligence (The Umbrella)
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: THEME.colors.charcoalMuted }}>
                Computers performing smart tasks
              </span>
            </div>

            {/* Level 2: Middle Container — Machine Learning */}
            <div
              style={{
                position: 'absolute',
                top: 70,
                bottom: 24,
                left: 32,
                right: 32,
                background: THEME.colors.backgroundSubtle,
                borderRadius: 24,
                border: `2px solid ${THEME.colors.teal}`,
                padding: '20px 28px',
                opacity: interpolate(l2Spring, [0, 1], [0, 1]),
                transform: `scale(${interpolate(l2Spring, [0, 1], [0.96, 1])})`,
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: THEME.colors.teal, color: '#ffffff', fontSize: 13, fontWeight: 900, padding: '4px 12px', borderRadius: 6 }}>
                    LEVEL 2
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.tealDark }}>
                    Machine Learning
                  </span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: THEME.colors.charcoalMuted }}>
                  Learning patterns from many examples instead of step-by-step rules
                </span>
              </div>

              {/* Level 3: Inner Container — Large Language Models */}
              <div
                style={{
                  position: 'absolute',
                  top: 65,
                  bottom: 20,
                  left: 28,
                  right: 28,
                  background: THEME.colors.cardBackground,
                  borderRadius: 18,
                  border: `2px solid ${THEME.colors.coral}`,
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: THEME.shadows.subtle,
                  opacity: interpolate(l3Spring, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(l3Spring, [0, 1], [0.96, 1])})`,
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ background: THEME.colors.coral, color: '#ffffff', fontSize: 12, fontWeight: 900, padding: '3px 10px', borderRadius: 6 }}>
                      LEVEL 3
                    </span>
                    <span style={{ fontSize: 19, fontWeight: 800, color: THEME.colors.coralDark }}>
                      Large Language Models (LLMs)
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted, fontWeight: 500 }}>
                    Specialized neural models built to understand and write human language
                  </div>
                </div>

                {/* Claude Badge Example */}
                <div
                  style={{
                    opacity: interpolate(claudeSpring, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(claudeSpring, [0, 1], [0.8, 1])})`,
                    background: `linear-gradient(135deg, ${THEME.colors.coral} 0%, ${THEME.colors.coralDark} 100%)`,
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: THEME.radius.md,
                    boxShadow: THEME.shadows.glowCoral,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 20 }}>✦</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                      Concrete Example
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>Claude by Anthropic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneTransition>
  );
};

