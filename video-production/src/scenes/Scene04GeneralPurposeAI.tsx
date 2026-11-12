import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene04GeneralPurposeAI: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Prompt typing effect: "You communicate with it using normal language..." (~5s in, frame 150)
  const promptProgress = interpolate(frame, [150, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // The 5 capabilities appearing sequentially (~8s onwards):
  // 1. Write (frame 250)
  // 2. Summarize (frame 275)
  // 3. Explain (frame 300)
  // 4. Plan (frame 325)
  // 5. Analyze (frame 350)
  const cap1 = spring({ frame: frame - 250, fps, config: { damping: 14, stiffness: 100 } });
  const cap2 = spring({ frame: frame - 275, fps, config: { damping: 14, stiffness: 100 } });
  const cap3 = spring({ frame: frame - 300, fps, config: { damping: 14, stiffness: 100 } });
  const cap4 = spring({ frame: frame - 325, fps, config: { damping: 14, stiffness: 100 } });
  const cap5 = spring({ frame: frame - 350, fps, config: { damping: 14, stiffness: 100 } });

  const capabilities = [
    { title: 'Write', desc: 'Draft reports, emails, specs', springVal: cap1, color: THEME.colors.coral },
    { title: 'Summarize', desc: 'Condense dense documents', springVal: cap2, color: THEME.colors.teal },
    { title: 'Explain', desc: 'Clarify complex concepts', springVal: cap3, color: THEME.colors.blue },
    { title: 'Plan', desc: 'Structure projects & workflows', springVal: cap4, color: THEME.colors.purple },
    { title: 'Analyze', desc: 'Compare datasets & spot trends', springVal: cap5, color: THEME.colors.amber },
  ];

  const fullPrompt = "Help me outline the quarterly project timeline and summarize key milestones...";
  const charsShown = Math.floor(promptProgress * fullPrompt.length);
  const displayedPrompt = fullPrompt.slice(0, charsShown);

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
        <Branding currentScene={4} totalScenes={9} sceneTitle="General-Purpose Assistant" />

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
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
            The Shift to General-Purpose
          </div>
          <h2
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: THEME.colors.charcoalDark,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            A Versatile Assistant Communicating in Natural Language
          </h2>
        </div>

        {/* Main Interface Mockup Card */}
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            background: THEME.colors.cardBackground,
            borderRadius: THEME.radius.xl,
            border: `1.5px solid ${THEME.colors.borderLight}`,
            boxShadow: THEME.shadows.card,
            padding: '30px 40px',
            marginBottom: 36,
            opacity: interpolate(enterSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Mock Window Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f87171' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ marginLeft: 16, fontSize: 13, fontWeight: 700, color: THEME.colors.charcoalSubtle, letterSpacing: '0.04em' }}>
              CLAUDE ASSISTANT · CONVERSATIONAL INTERACTION
            </span>
          </div>

          {/* Natural Language Prompt Input Bar */}
          <div
            style={{
              background: THEME.colors.backgroundSubtle,
              border: `1.5px solid ${THEME.colors.borderMedium}`,
              borderRadius: THEME.radius.md,
              padding: '16px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 18,
              fontFamily: THEME.fonts.mono,
              color: THEME.colors.charcoalDark,
            }}
          >
            <span style={{ color: THEME.colors.teal, fontWeight: 900 }}>❯</span>
            <span>{displayedPrompt}</span>
            {promptProgress < 1 && (
              <span style={{ width: 8, height: 20, background: THEME.colors.teal, display: 'inline-block' }} />
            )}
          </div>
        </div>

        {/* 5 Capability Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 20,
            width: '100%',
            maxWidth: 1400,
          }}
        >
          {capabilities.map((c, i) => (
            <div
              key={i}
              style={{
                background: THEME.colors.cardBackground,
                borderRadius: THEME.radius.lg,
                border: `2px solid ${c.springVal > 0.5 ? c.color : THEME.colors.borderLight}`,
                boxShadow: c.springVal > 0.5 ? THEME.shadows.card : THEME.shadows.subtle,
                padding: '24px 20px',
                textAlign: 'center',
                opacity: interpolate(c.springVal, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(c.springVal, [0, 1], [35, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `${c.color}15`,
                  color: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                0{i + 1}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: THEME.colors.charcoalDark,
                  margin: '0 0 6px 0',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: THEME.colors.charcoalMuted,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SceneTransition>
  );
};

