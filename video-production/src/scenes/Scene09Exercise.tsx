import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene09Exercise: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Task 1: Writing (~2.8s, frame 84)
  const task1 = spring({ frame: frame - 84, fps, config: { damping: 14, stiffness: 90 } });

  // Task 2: Reading (~5.5s, frame 165)
  const task2 = spring({ frame: frame - 165, fps, config: { damping: 14, stiffness: 90 } });

  // Task 3: Organizing Information (~7.8s, frame 234)
  const task3 = spring({ frame: frame - 234, fps, config: { damping: 14, stiffness: 90 } });

  // "That concludes Module 1..." (~15s, frame 450)
  const conclusionSpring = spring({ frame: frame - 450, fps, config: { damping: 14, stiffness: 90 } });

  // Final branding (~23s, frame 690)
  const finalBrandSpring = spring({ frame: frame - 690, fps, config: { damping: 14, stiffness: 90 } });

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
        <Branding currentScene={9} totalScenes={9} sceneTitle="Hands-On Workplace Exercise" />

        {/* Phase A: Exercise Cards (frames 0 to 450) */}
        {frame < 460 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1400 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
                Hands-On Exercise
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
                Identify Three Tasks in Your Workday
              </h2>
            </div>

            {/* 3 Task Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 32,
                width: '100%',
              }}
            >
              {/* Card 1: Writing */}
              <div
                style={{
                  background: THEME.colors.cardBackground,
                  borderRadius: THEME.radius.lg,
                  border: `2px solid ${task1 > 0.5 ? THEME.colors.coralBorder : THEME.colors.borderLight}`,
                  boxShadow: task1 > 0.5 ? THEME.shadows.glowCoral : THEME.shadows.card,
                  padding: '36px 30px',
                  opacity: interpolate(task1, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(task1, [0, 1], [30, 0])}px)`,
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: THEME.colors.coralLight, color: THEME.colors.coralDark, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 26, fontWeight: 900 }}>
                  01
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.coral, textTransform: 'uppercase', marginBottom: 8 }}>
                  Task Type 1
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
                  Writing
                </h3>
                <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
                  Where do you draft emails, proposals, memos, client messages, or status reports?
                </p>
              </div>

              {/* Card 2: Reading */}
              <div
                style={{
                  background: THEME.colors.cardBackground,
                  borderRadius: THEME.radius.lg,
                  border: `2px solid ${task2 > 0.5 ? THEME.colors.tealBorder : THEME.colors.borderLight}`,
                  boxShadow: task2 > 0.5 ? THEME.shadows.glowTeal : THEME.shadows.card,
                  padding: '36px 30px',
                  opacity: interpolate(task2, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(task2, [0, 1], [30, 0])}px)`,
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: THEME.colors.tealLight, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 26, fontWeight: 900 }}>
                  02
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.teal, textTransform: 'uppercase', marginBottom: 8 }}>
                  Task Type 2
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
                  Reading
                </h3>
                <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
                  Where do you spend time digesting lengthy documents, research PDFs, or complex threads?
                </p>
              </div>

              {/* Card 3: Organizing Information */}
              <div
                style={{
                  background: THEME.colors.cardBackground,
                  borderRadius: THEME.radius.lg,
                  border: `2px solid ${task3 > 0.5 ? THEME.colors.blue : THEME.colors.borderLight}`,
                  boxShadow: task3 > 0.5 ? THEME.shadows.card : THEME.shadows.card,
                  padding: '36px 30px',
                  opacity: interpolate(task3, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(task3, [0, 1], [30, 0])}px)`,
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: THEME.colors.blueLight, color: THEME.colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 26, fontWeight: 900 }}>
                  03
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 8 }}>
                  Task Type 3
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
                  Organizing
                </h3>
                <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
                  Where do you synthesize meeting notes, categorize action items, or structure tables?
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Phase B: Module Conclusion & Outro Branding (frames 460 to end) */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: 1000,
              marginTop: 40,
              opacity: interpolate(conclusionSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(conclusionSpring, [0, 1], [0.94, 1])})`,
            }}
          >
            {/* Conclusion Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: THEME.colors.tealLight,
                color: THEME.colors.tealDark,
                padding: '6px 20px',
                borderRadius: THEME.radius.pill,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              ✓ Module 01 Complete
            </div>

            <h2
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: THEME.colors.charcoalDark,
                lineHeight: 1.15,
                margin: '0 0 20px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Coming Up in Module 02: What Is an LLM?
            </h2>

            <p
              style={{
                fontSize: 22,
                color: THEME.colors.charcoalMuted,
                maxWidth: 800,
                lineHeight: 1.5,
                margin: '0 0 40px 0',
              }}
            >
              Discover how Large Language Models generate text piece by piece through next-token prediction.
            </p>

            {/* Outro Brand Card */}
            <div
              style={{
                opacity: interpolate(finalBrandSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(finalBrandSpring, [0, 1], [20, 0])}px)`,
                background: THEME.colors.charcoalDark,
                color: '#ffffff',
                padding: '24px 48px',
                borderRadius: THEME.radius.xl,
                boxShadow: THEME.shadows.elevated,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: THEME.colors.coral }} />
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.06em' }}>AI MASTERCLASS</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: THEME.colors.tealBorder, letterSpacing: '0.04em' }}>
                AUTHORED BY TACTIVE AI TEAM
              </div>
            </div>
          </div>
        )}
      </div>
    </SceneTransition>
  );
};

