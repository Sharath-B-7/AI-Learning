import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module12Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const compareSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 10,
          }}
        >
          PART B • MODULE 12
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Autonomous <span style={{ color: THEME.colors.coral }}>Agents</span>
        </h1>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Tools let Claude act; an agent finishes a complete multi-step job
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 960, transform: `scale(${compareSpring})`, opacity: compareSpring }}>
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 6 }}>
            Chat Mode
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Interactive Guidance
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.5 }}>
            You ask questions, inspect each reply, and manually guide every single step.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.coralDark, textTransform: 'uppercase', marginBottom: 6 }}>
            Agent Mode
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Goal-Driven Execution
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            You specify the objective; Claude plans the steps, acts with tools, and loops until done.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module12Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const loopSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const subagentSpring = spring({ frame: frame - 400, fps, config: { damping: 14 } });

  const loopSteps = [
    { title: 'Think', desc: 'Plan next action', color: THEME.colors.blue, icon: '🧠' },
    { title: 'Act', desc: 'Execute tool command', color: THEME.colors.coral, icon: '🛠️' },
    { title: 'Check Result', desc: 'Verify output & errors', color: THEME.colors.teal, icon: '🔍' },
    { title: 'Repeat', desc: 'Until goal is met', color: THEME.colors.purple, icon: '🔁' },
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
          FIGURE 12 • THE AUTONOMOUS AGENT LOOP
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Think ➔ Act ➔ Check ➔ Repeat
        </h2>
      </div>

      {/* The 4 Loop Nodes */}
      <div style={{ display: 'flex', gap: 16, width: 1000, marginBottom: 24, transform: `scale(${loopSpring})`, opacity: loopSpring }}>
        {loopSteps.map((st, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: THEME.shadows.card,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{st.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: st.color, marginBottom: 4 }}>
              {st.title}
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted }}>
              {st.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Subagents banner */}
      <div
        style={{
          width: 1000,
          background: THEME.colors.tealLight,
          border: `2px solid ${THEME.colors.tealBorder}`,
          borderRadius: THEME.radius.lg,
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transform: `scale(${subagentSpring})`,
          opacity: subagentSpring,
        }}
      >
        <span style={{ fontSize: 32 }}>👥</span>
        <div>
          <span style={{ fontSize: 17, fontWeight: 800, color: THEME.colors.tealDark }}>
            Parallel Subagents:
          </span>
          <span style={{ fontSize: 15, color: THEME.colors.charcoalBody, marginLeft: 8 }}>
            For large multi-file tasks, Claude can launch parallel helper subagents with fresh desks to divide and conquer.
          </span>
        </div>
      </div>
    </div>
  );
};

export const Module12Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const pillarsSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const pillars = [
    { title: 'Clear Goal', desc: 'Exactly what done looks like', icon: '🎯' },
    { title: 'Designated Files', desc: 'Specific folders to inspect & edit', icon: '📁' },
    { title: 'Strict Limits', desc: 'Boundaries on actions & depth', icon: '🚧' },
    { title: 'Check-In Points', desc: 'Required approvals before major changes', icon: '🛑' },
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
      <div style={{ textAlign: 'center', marginBottom: 28, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          The Four <span style={{ color: THEME.colors.coral }}>Goal Pillars</span>
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Always provide these four elements to keep autonomous agents safe and aligned
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, width: 1040, transform: `scale(${pillarsSpring})`, opacity: pillarsSpring }}>
        {pillars.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 20px',
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>{p.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.45 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

