import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module11Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const roomSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const toolsSpring = spring({ frame: frame - 180, fps, config: { damping: 14 } });

  const toolCapabilities = [
    { title: 'Spreadsheets', desc: 'Read & analyze data tables', icon: '📊' },
    { title: 'Web Search', desc: 'Retrieve current information', icon: '🌐' },
    { title: 'Calculations', desc: 'Execute precise computation', icon: '🔢' },
    { title: 'Documents', desc: 'Create & modify real files', icon: '📄' },
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
          PART B • MODULE 11
        </div>
        <h1 style={{ fontSize: 54, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Tools & <span style={{ color: THEME.colors.coral }}>The Harness</span>
        </h1>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The Locked Room Metaphor & Giving the Model Hands
        </p>
      </div>

      <div
        style={{
          width: 960,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '24px 32px',
          boxShadow: THEME.shadows.card,
          marginBottom: 20,
          textAlign: 'center',
          transform: `scale(${roomSpring})`,
          opacity: roomSpring,
        }}
      >
        <p style={{ fontSize: 18, color: THEME.colors.charcoalBody, margin: 0 }}>
          🚪 <strong>The Locked Room:</strong> A model alone is like a clever person in a locked room passing notes under the door.<br />
          <strong>Tools are the model's hands</strong>, allowing it to interact directly with the world.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: 960, transform: `scale(${toolsSpring})`, opacity: toolsSpring }}>
        {toolCapabilities.map((t, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.backgroundSubtle,
              border: `1px solid ${THEME.colors.borderMedium}`,
              borderRadius: THEME.radius.lg,
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>{t.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>{t.title}</div>
            <div style={{ fontSize: 12, color: THEME.colors.charcoalMuted }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module11Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const workshopSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
      <div style={{ textAlign: 'center', marginBottom: 28, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.tealLight,
            color: THEME.colors.tealDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 10,
          }}
        >
          FIGURE 11 • THE HARNESS WORKSHOP
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          The Software Wrapped Around the Model
        </h2>
      </div>

      <div
        style={{
          width: 960,
          background: THEME.colors.cardBackground,
          border: `3px solid ${THEME.colors.tealBorder}`,
          borderRadius: THEME.radius.xl,
          padding: '36px',
          boxShadow: THEME.shadows.card,
          transform: `scale(${workshopSpring})`,
          opacity: workshopSpring,
        }}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div
            style={{
              width: 240,
              padding: '24px',
              background: THEME.colors.tealLight,
              borderRadius: THEME.radius.lg,
              textAlign: 'center',
              border: `1px solid ${THEME.colors.tealBorder}`,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.tealDark }}>Model Brain</div>
            <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted, marginTop: 4 }}>Thinks & Reasons</div>
          </div>

          <div style={{ fontSize: 28, color: THEME.colors.tealDark }}>➔</div>

          <div
            style={{
              flex: 1,
              padding: '24px',
              background: THEME.colors.backgroundSubtle,
              border: `2px solid ${THEME.colors.borderMedium}`,
              borderRadius: THEME.radius.lg,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 8 }}>
              🏭 The Harness Workshop
            </div>
            <div style={{ fontSize: 15, color: THEME.colors.charcoalBody, lineHeight: 1.5, marginBottom: 12 }}>
              Provides tools, executes the agent loop, and strictly enforces permissions.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ background: '#ffffff', border: `1px solid ${THEME.colors.borderLight}`, padding: '4px 12px', borderRadius: THEME.radius.pill, fontSize: 13, fontWeight: 700 }}>
                Claude App (Consumer Harness)
              </span>
              <span style={{ background: '#ffffff', border: `1px solid ${THEME.colors.borderLight}`, padding: '4px 12px', borderRadius: THEME.radius.pill, fontSize: 13, fontWeight: 700 }}>
                Claude Code (Developer Harness)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module11Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const triadSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const triad = [
    { role: 'THE MODEL', action: 'Thinks', desc: 'Processes text & reasons', color: THEME.colors.blue, icon: '🧠' },
    { role: 'TOOLS', action: 'Act', desc: 'Allows Claude to take action', color: THEME.colors.coral, icon: '🛠️' },
    { role: 'THE HARNESS', action: 'Governs', desc: 'Provides tools & enforces rules', color: THEME.colors.teal, icon: '🏭' },
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
      <div style={{ textAlign: 'center', marginBottom: 32, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          In Short: <span style={{ color: THEME.colors.teal }}>You Decide What Claude Can Do</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 960, transform: `scale(${triadSpring})`, opacity: triadSpring }}>
        {triad.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 20px',
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, textTransform: 'uppercase', marginBottom: 4 }}>
              {item.role}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: THEME.colors.charcoalDark, marginBottom: 6 }}>
              {item.action}
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

