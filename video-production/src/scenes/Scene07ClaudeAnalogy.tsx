import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene07ClaudeAnalogy: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: "Imagine a new colleague who has read an enormous amount..." (frame 30)
  const colleagueSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 90 } });

  // Step 2: "But knows nothing about company, customers, project..." (~7s in, frame 210)
  const gapsSpring = spring({ frame: frame - 210, fps, config: { damping: 14, stiffness: 90 } });

  // Step 3: "Until you provide that information..." (~14s in, frame 420)
  const briefSpring = spring({ frame: frame - 420, fps, config: { damping: 14, stiffness: 90 } });

  // Step 4: "Good results come from explaining things clearly and checking their work" (~17s in, frame 510)
  const verifySpring = spring({ frame: frame - 510, fps, config: { damping: 14, stiffness: 90 } });

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
        <Branding currentScene={7} totalScenes={9} sceneTitle="Mental Model for Claude" />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
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
            The New Colleague Analogy
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
            Brilliant & Fast, But Unbriefed on Your Business
          </h2>
        </div>

        {/* Two-Column Abstract Technical Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 36,
            width: '100%',
            maxWidth: 1400,
          }}
        >
          {/* Left Column: Strengths & The Knowledge Base */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.card,
              padding: '32px 36px',
              opacity: interpolate(colleagueSpring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(colleagueSpring, [0, 1], [-30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: THEME.radius.sm, background: THEME.colors.tealLight, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20 }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>Default Capabilities</div>
                <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted }}>Broad, high-speed general knowledge</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Read an Enormous Amount', sub: 'Extensive knowledge across thousands of public domains' },
                { title: 'Works Instantly', sub: 'Generates drafts and structures in seconds' },
                { title: 'Willing to Help with Anything', sub: 'Writing, summarizing, coding, and brainstorming' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: THEME.colors.backgroundSubtle, padding: '12px 18px', borderRadius: 8, borderLeft: `3px solid ${THEME.colors.teal}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: THEME.colors.charcoalDark }}>✓ {item.title}</div>
                  <div style={{ fontSize: 12, color: THEME.colors.charcoalMuted, marginTop: 2 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Missing Context & Mandatory Briefing */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${gapsSpring > 0.5 ? THEME.colors.coralBorder : THEME.colors.borderLight}`,
              boxShadow: gapsSpring > 0.5 ? THEME.shadows.glowCoral : THEME.shadows.card,
              padding: '32px 36px',
              opacity: interpolate(gapsSpring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(gapsSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: THEME.radius.sm, background: THEME.colors.coralLight, color: THEME.colors.coralDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20 }}>
                !
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>What It Knows Nothing About</div>
                <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted }}>Until you explicitly provide context</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                'Your Company (internal processes, org structure, acronyms)',
                'Your Customers (account histories, preferences, contracts)',
                'Your Project (deadlines, goals, constraints, draft notes)',
              ].map((gap, idx) => (
                <div key={idx} style={{ background: THEME.colors.backgroundSubtle, padding: '10px 16px', borderRadius: 8, borderLeft: `3px solid ${THEME.colors.coral}`, fontSize: 13, fontWeight: 600, color: THEME.colors.charcoalDark }}>
                  ✕ {gap}
                </div>
              ))}
            </div>

            {/* Checkpoint Banner */}
            <div
              style={{
                opacity: interpolate(verifySpring, [0, 1], [0, 1]),
                background: THEME.colors.charcoalDark,
                color: '#ffffff',
                padding: '12px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ color: THEME.colors.coral }}>★</span>
              Good results require clear briefing and checking their work.
            </div>
          </div>
        </div>
      </div>
    </SceneTransition>
  );
};

