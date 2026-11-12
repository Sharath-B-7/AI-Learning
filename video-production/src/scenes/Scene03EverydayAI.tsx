import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';
import { Branding } from '../components/Branding';

interface SceneProps {
  durationInFrames: number;
}

export const Scene03EverydayAI: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequential card reveal matching narration:
  // "Your email filters spam" (~3.5s in, frame 105)
  const item1Spring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // "Your phone suggests the next word as you type" (~6s in, frame 180)
  const item2Spring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // "Streaming apps recommend what to watch" (~9.1s in, frame 273)
  const item3Spring = spring({
    frame: frame - 273,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // "and maps estimate your travel time" (~11.3s in, frame 339)
  const item4Spring = spring({
    frame: frame - 339,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // "These are examples of AI designed for specific tasks" (~13.8s in, frame 414)
  const bannerSpring = spring({
    frame: frame - 414,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

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
        <Branding currentScene={3} totalScenes={9} sceneTitle="AI in Everyday Life" />

        {/* Section Heading */}
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
            Real-World Precedents
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
            You Already Use AI Every Day Without Noticing
          </h2>
        </div>

        {/* 4 Software UI Mockups Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            width: '100%',
            maxWidth: 1540,
            marginBottom: 28,
          }}
        >
          {/* Mockup 1: Email Spam Filter */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${item1Spring > 0.5 ? THEME.colors.coralBorder : THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.card,
              padding: 24,
              opacity: interpolate(item1Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(item1Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: THEME.colors.coral, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Email Client
              </span>
              <span style={{ background: THEME.colors.coralLight, color: THEME.colors.coralDark, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                Spam Filter
              </span>
            </div>
            <div style={{ background: THEME.colors.backgroundSubtle, padding: '12px 14px', borderRadius: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.charcoalDark }}>Urgent Prize Notification!</div>
              <div style={{ fontSize: 11, color: THEME.colors.charcoalMuted, marginTop: 2 }}>From: claim-reward-now@unknown.com</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.colors.coralDark, fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: THEME.colors.coral }} />
              Auto-diverted to Spam folder
            </div>
          </div>

          {/* Mockup 2: Phone Next-Word Suggestions */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${item2Spring > 0.5 ? THEME.colors.tealBorder : THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.card,
              padding: 24,
              opacity: interpolate(item2Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(item2Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: THEME.colors.teal, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Smart Keyboard
              </span>
              <span style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                Predictive
              </span>
            </div>
            <div style={{ background: THEME.colors.backgroundSubtle, padding: '12px 14px', borderRadius: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: THEME.colors.charcoalDark }}>
                "Let's schedule the meeting for <span style={{ borderBottom: '2px solid #0d9488' }}>|</span>"
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['tomorrow', '2:00 PM', 'the team'].map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    background: idx === 0 ? THEME.colors.tealLight : '#ffffff',
                    border: `1px solid ${idx === 0 ? THEME.colors.tealBorder : THEME.colors.borderLight}`,
                    color: idx === 0 ? THEME.colors.tealDark : THEME.colors.charcoalMuted,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: 6,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Mockup 3: Streaming Recommendations */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${item3Spring > 0.5 ? THEME.colors.blue : THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.card,
              padding: 24,
              opacity: interpolate(item3Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(item3Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: THEME.colors.blue, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Streaming App
              </span>
              <span style={{ background: THEME.colors.blueLight, color: THEME.colors.blue, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                98% Match
              </span>
            </div>
            <div style={{ background: THEME.colors.backgroundSubtle, padding: '12px 14px', borderRadius: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.charcoalDark }}>Because you watched:</div>
              <div style={{ fontSize: 11, color: THEME.colors.charcoalMuted, marginTop: 2 }}>Technology Documentaries</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.colors.blue, fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: THEME.colors.blue }} />
              Personalized Watchlist Generated
            </div>
          </div>

          {/* Mockup 4: Maps Route Estimation */}
          <div
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.radius.lg,
              border: `1.5px solid ${item4Spring > 0.5 ? THEME.colors.purple : THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.card,
              padding: 24,
              opacity: interpolate(item4Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(item4Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: THEME.colors.purple, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Navigation Map
              </span>
              <span style={{ background: THEME.colors.purpleLight, color: THEME.colors.purple, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                Live ETA
              </span>
            </div>
            <div style={{ background: THEME.colors.backgroundSubtle, padding: '12px 14px', borderRadius: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: THEME.colors.charcoalDark }}>24 min (14.2 km)</div>
              <div style={{ fontSize: 11, color: '#10b981', marginTop: 2, fontWeight: 700 }}>Fastest route · Avoids traffic jam</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.colors.purple, fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: THEME.colors.purple }} />
              Dynamic congestion estimation
            </div>
          </div>
        </div>

        {/* Synthesizing Banner: "AI Designed for Specific Tasks" */}
        <div
          style={{
            opacity: interpolate(bannerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(bannerSpring, [0, 1], [20, 0])}px)`,
            background: THEME.colors.charcoalDark,
            color: '#ffffff',
            borderRadius: THEME.radius.lg,
            padding: '16px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: THEME.shadows.elevated,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: THEME.colors.coral,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            !
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>
            These are all examples of <span style={{ color: THEME.colors.coral }}>AI Designed for Specific Tasks</span> (Narrow AI)
          </div>
        </div>
      </div>
    </SceneTransition>
  );
};

