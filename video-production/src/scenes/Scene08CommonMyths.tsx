import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene08CommonMyths: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Myth 1: "First, AI thinks like a human..." (~2.5s, frame 75)
  const myth1 = spring({ frame: frame - 75, fps, config: { damping: 14, stiffness: 90 } });

  // Myth 2: "Second, AI is just like Google..." (~10.5s, frame 315)
  const myth2 = spring({ frame: frame - 315, fps, config: { damping: 14, stiffness: 90 } });

  // Myth 3: "Third, AI is always right..." (~19.1s, frame 573)
  const myth3 = spring({ frame: frame - 573, fps, config: { damping: 14, stiffness: 90 } });

  // Myth 4: "Fourth, AI learns from me instantly..." (~25.0s, frame 750)
  const myth4 = spring({ frame: frame - 750, fps, config: { damping: 14, stiffness: 90 } });

  const myths = [
    {
      num: '01',
      myth: '“AI thinks like a human.”',
      reality: 'It does not. It is mathematical next-token prediction, even if natural-sounding.',
      springVal: myth1,
      color: THEME.colors.coral,
    },
    {
      num: '02',
      myth: '“It’s just like Google.”',
      reality: 'Google retrieves existing web links. Claude writes a completely new answer each time.',
      springVal: myth2,
      color: THEME.colors.blue,
    },
    {
      num: '03',
      myth: '“AI is always right.”',
      reality: 'It can be wrong while sounding completely confident. Always verify critical facts.',
      springVal: myth3,
      color: THEME.colors.purple,
    },
    {
      num: '04',
      myth: '“It learns from me instantly.”',
      reality: 'The model weights do not change. It only references what sits in the current chat.',
      springVal: myth4,
      color: THEME.colors.teal,
    },
  ];

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
        <Branding currentScene={8} totalScenes={9} sceneTitle="Debunking AI Misconceptions" />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
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
            Critical Calibration
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
            Four Common Myths About AI
          </h2>
        </div>

        {/* 2x2 Grid of Myths vs Realities */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            width: '100%',
            maxWidth: 1360,
          }}
        >
          {myths.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: THEME.colors.cardBackground,
                borderRadius: THEME.radius.lg,
                border: `2px solid ${m.springVal > 0.5 ? m.color : THEME.colors.borderLight}`,
                boxShadow: m.springVal > 0.5 ? THEME.shadows.card : THEME.shadows.subtle,
                padding: '24px 28px',
                opacity: interpolate(m.springVal, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(m.springVal, [0, 1], [25, 0])}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Myth Line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 4,
                  }}
                >
                  Myth {m.num}
                </span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#dc2626', textDecoration: 'line-through' }}>
                  {m.myth}
                </span>
              </div>

              {/* Reality Line */}
              <div
                style={{
                  background: THEME.colors.backgroundSubtle,
                  borderRadius: 8,
                  padding: '12px 16px',
                  borderLeft: `4px solid ${THEME.colors.teal}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <span style={{ color: THEME.colors.teal, fontWeight: 900, fontSize: 16 }}>✓</span>
                <div style={{ fontSize: 15, fontWeight: 600, color: THEME.colors.charcoalBody, lineHeight: 1.45 }}>
                  <strong style={{ color: THEME.colors.charcoalDark }}>Reality: </strong>
                  {m.reality}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SceneTransition>
  );
};

