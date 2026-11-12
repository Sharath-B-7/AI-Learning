import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module07Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const deskSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const deskItems = [
    { title: 'Your Instructions', desc: 'The immediate task & goals', icon: '📝', color: THEME.colors.coral },
    { title: 'Chat History', desc: 'Previous back-and-forth messages', icon: '💬', color: THEME.colors.blue },
    { title: 'Shared Files', desc: 'Attached documents & code', icon: '📄', color: THEME.colors.teal },
    { title: 'Tool Results', desc: 'Data fetched from system tools', icon: '⚙️', color: THEME.colors.purple },
  ];

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
        padding: '0 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 10,
          }}
        >
          FIGURE 7 • THE DESK METAPHOR
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Context: <span style={{ color: THEME.colors.coral }}>What Is on the Desk</span>
        </h1>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Claude can only see and work with what is currently on its desk
        </p>
      </div>

      {/* The Desk Surface */}
      <div
        style={{
          width: 1000,
          background: THEME.colors.cardBackground,
          border: `3px solid ${THEME.colors.borderMedium}`,
          borderRadius: THEME.radius.xl,
          padding: '32px',
          boxShadow: THEME.shadows.card,
          transform: `scale(${deskSpring})`,
          opacity: deskSpring,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {deskItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: THEME.colors.backgroundSubtle,
                border: `2px solid ${THEME.colors.borderLight}`,
                borderRadius: THEME.radius.lg,
                padding: '24px 16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: item.color, marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Module07Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const meterSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
        padding: '0 100px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          The <span style={{ color: THEME.colors.coral }}>Context Window</span> Limit
        </h2>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Anything not on the desk simply does not exist for Claude
        </p>
      </div>

      <div
        style={{
          width: 900,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 48px',
          boxShadow: THEME.shadows.card,
          transform: `scale(${meterSpring})`,
          opacity: meterSpring,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark }}>Context Window Capacity</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.coralDark }}>Desk Clutter Warning</span>
        </div>

        {/* Capacity Bar */}
        <div
          style={{
            height: 36,
            background: THEME.colors.backgroundSubtle,
            borderRadius: THEME.radius.pill,
            overflow: 'hidden',
            marginBottom: 24,
            border: `1px solid ${THEME.colors.borderMedium}`,
          }}
        >
          <div
            style={{
              width: '85%',
              height: '100%',
              background: `linear-gradient(90deg, ${THEME.colors.teal} 0%, ${THEME.colors.coral} 100%)`,
              borderRadius: THEME.radius.pill,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1, padding: '16px', background: THEME.colors.coralLight, borderRadius: THEME.radius.md }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.coralDark, marginBottom: 4 }}>
              ⚠️ Why Clutter Matters
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalBody }}>
              When chats grow too long or files too large, Claude can lose track of earlier instructions.
            </div>
          </div>

          <div style={{ flex: 1, padding: '16px', background: THEME.colors.tealLight, borderRadius: THEME.radius.md }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.tealDark, marginBottom: 4 }}>
              ✓ Clean Desk Advantage
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalBody }}>
              Focused context keeps responses sharp, accurate, and aligned with your immediate goals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module07Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const rulesSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const habits = [
    { title: 'Start a Fresh Chat', desc: 'Open a new conversation for each distinct task or project phase', icon: '✨' },
    { title: 'Share Relevant Files Only', desc: 'Upload only the specific chapters or sections that matter for this job', icon: '🎯' },
  ];

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
        padding: '0 100px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          Keep Your <span style={{ color: THEME.colors.teal }}>Context Clean</span>
        </h2>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Two essential habits for peak accuracy and performance
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 960, transform: `scale(${rulesSpring})`, opacity: rulesSpring }}>
        {habits.map((h, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.tealBorder}`,
              borderRadius: THEME.radius.xl,
              padding: '36px 32px',
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 16 }}>{h.icon}</div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
              {h.title}
            </h3>
            <p style={{ fontSize: 17, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.5 }}>
              {h.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

