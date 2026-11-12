import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { SceneTransition } from '../components/SceneTransition';

interface SceneProps {
  durationInFrames: number;
}

export const Scene01Intro: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
  const badgeSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const titleSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const questionSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const nodesSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // Animated background grid lines and geometric nodes
  const nodePointers = [
    { x: 380, y: 320, color: THEME.colors.coral },
    { x: 1540, y: 300, color: THEME.colors.teal },
    { x: 320, y: 760, color: THEME.colors.teal },
    { x: 1600, y: 780, color: THEME.colors.coral },
    { x: 960, y: 180, color: THEME.colors.blue },
    { x: 960, y: 920, color: THEME.colors.purple },
  ];

  return (
    <SceneTransition durationInFrames={durationInFrames} type="scale">
      <div
        style={{
          width: '100%',
          height: '100%',
          background: THEME.colors.background,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: THEME.fonts.sans,
        }}
      >
        {/* Subtle technical background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${THEME.colors.borderMedium} 1.5px, transparent 1.5px)`,
            backgroundSize: '40px 40px',
            opacity: 0.6,
          }}
        />

        {/* Ambient floating node network */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {nodePointers.map((n, i) => {
            const pulse = Math.sin((frame + i * 20) * 0.08) * 4;
            const progress = interpolate(nodesSpring, [0, 1], [0, 1]);
            return (
              <g key={i} opacity={progress * 0.7}>
                <line
                  x1={960}
                  y1={540}
                  x2={n.x}
                  y2={n.y}
                  stroke={THEME.colors.borderLight}
                  strokeWidth={2}
                  strokeDasharray="6 6"
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={8 + pulse}
                  fill={n.color}
                  opacity={0.3}
                />
                <circle cx={n.x} cy={n.y} r={4} fill={n.color} />
              </g>
            );
          })}
        </svg>

        {/* Central Title Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 10,
            maxWidth: 1000,
          }}
        >
          {/* Top Brand Badge */}
          <div
            style={{
              opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(badgeSpring, [0, 1], [-20, 0])}px)`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: THEME.colors.cardBackground,
              padding: '8px 24px',
              borderRadius: THEME.radius.pill,
              border: `1px solid ${THEME.colors.borderLight}`,
              boxShadow: THEME.shadows.subtle,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: THEME.colors.coral,
                boxShadow: `0 0 10px ${THEME.colors.coral}`,
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: THEME.colors.charcoalDark,
              }}
            >
              AI MASTERCLASS
            </span>
            <span style={{ color: THEME.colors.charcoalSubtle }}>•</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: THEME.colors.teal,
                letterSpacing: '0.06em',
              }}
            >
              FOUNDATIONAL CURRICULUM
            </span>
          </div>

          {/* Module Heading */}
          <div
            style={{
              opacity: interpolate(titleSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(titleSpring, [0, 1], [0.92, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: THEME.colors.coral,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              PART A · MODULE 01
            </div>
            <h1
              style={{
                fontSize: 78,
                fontWeight: 900,
                color: THEME.colors.charcoalDark,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                margin: '0 0 24px 0',
              }}
            >
              What Is AI?
            </h1>
          </div>

          {/* Core Question Sub-Card */}
          <div
            style={{
              opacity: interpolate(questionSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(questionSpring, [0, 1], [25, 0])}px)`,
              background: THEME.colors.cardBackground,
              border: `1.5px solid ${THEME.colors.tealBorder}`,
              borderRadius: THEME.radius.lg,
              padding: '18px 36px',
              boxShadow: THEME.shadows.card,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: THEME.colors.tealLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: THEME.colors.tealDark,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              ?
            </div>
            <p
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: THEME.colors.charcoalBody,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              What is <strong style={{ color: THEME.colors.charcoalDark }}>Artificial Intelligence</strong>, and how does it apply to everyday work?
            </p>
          </div>
        </div>
      </div>
    </SceneTransition>
  );
};

