import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module12Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const chatCard = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const agentCard = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          PART B • MODULE 12
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Understanding <span style={{ color: THEME.colors.coral }}>Agents</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The fundamental shift from turn-by-turn conversation to autonomous delegation
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1080 }}>
        {/* Chat */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${chatCard})`,
            opacity: chatCard,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>💬</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Conversational Chat
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            You ask a question; Claude answers. You manually copy files, execute tests, and decide every subsequent micro-step yourself.
          </p>
        </div>

        {/* Agent */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${agentCard})`,
            opacity: agentCard,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Autonomous Agent
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            You define a high-level outcome. Claude plans its own sequence, opens files, makes edits, and checks results autonomously.
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
  const p1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const p2 = spring({ frame: frame - 220, fps, config: { damping: 14 } });
  const p3 = spring({ frame: frame - 380, fps, config: { damping: 14 } });
  const selfCorrect = spring({ frame: frame - 580, fps, config: { damping: 14 } });

  const loopNodes = [
    { num: '1', title: 'PLAN', desc: 'Formulates strategy & inspects file scope', color: THEME.colors.blue, bg: THEME.colors.blueLight, val: p1 },
    { num: '2', title: 'ACT', desc: 'Applies surgical edits & runs terminal commands', color: THEME.colors.coral, bg: THEME.colors.coralLight, val: p2 },
    { num: '3', title: 'CHECK', desc: 'Reads compiler logs & tests to self-correct', color: THEME.colors.teal, bg: THEME.colors.tealLight, val: p3 },
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
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          The Autonomous Agent Loop
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Plan, Act, and Check: iterative self-correction until the finish line
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1100, marginBottom: 28 }}>
        {loopNodes.map((node, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: THEME.shadows.card,
              transform: `scale(${node.val})`,
              opacity: node.val,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: node.bg,
                color: node.color,
                fontWeight: 900,
                fontSize: 20,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              {node.num}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, marginBottom: 8 }}>
              {node.title}
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted, lineHeight: 1.4 }}>
              {node.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Self-correction banner */}
      <div
        style={{
          width: 1100,
          background: '#ecfdf5',
          border: `2px solid ${THEME.colors.tealBorder}`,
          borderRadius: THEME.radius.lg,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          transform: `scale(${selfCorrect})`,
          opacity: selfCorrect,
        }}
      >
        <span style={{ fontSize: 24 }}>🔄</span>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#047857' }}>
          Autonomous Self-Correction: When compiler or test errors arise, Claude diagnoses the failure log and repeats the loop without human prompting.
        </div>
      </div>
    </div>
  );
};

export const Module12Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const e1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const e2 = spring({ frame: frame - 200, fps, config: { damping: 14 } });
  const e3 = spring({ frame: frame - 340, fps, config: { damping: 14 } });
  const e4 = spring({ frame: frame - 480, fps, config: { damping: 14 } });

  const elements = [
    { title: '1. GOAL', desc: 'Exact definition of "finished" (e.g. generate a table of drafts)', val: e1 },
    { title: '2. LOCATION', desc: 'Bound the specific directory scope (e.g. In @Reports\\)', val: e2 },
    { title: '3. LIMITS', desc: 'Negative constraints (e.g. "Do not delete or rename anything")', val: e3 },
    { title: '4. CHECK-INS', desc: 'Human milestones (e.g. "Show me the list before proceeding")', val: e4 },
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
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          The 4 Elements of a Reliable Agent Goal
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Prevent runaway edits with strict bounded instructions
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, width: 1040 }}>
        {elements.map((elem, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '24px 28px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${elem.val})`,
              opacity: elem.val,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900, color: THEME.colors.coral, marginBottom: 6 }}>
              {elem.title}
            </div>
            <div style={{ fontSize: 15, color: THEME.colors.charcoalBody, lineHeight: 1.4 }}>
              {elem.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module12Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const tool1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const tool2 = spring({ frame: frame - 220, fps, config: { damping: 14 } });
  const tool3 = spring({ frame: frame - 380, fps, config: { damping: 14 } });

  const tools = [
    { cmd: '> /plan', name: 'Plan Mode', desc: 'Claude researches files and outputs an actionable roadmap before altering code.', val: tool1 },
    { cmd: '> /diff', name: 'Diff Inspection', desc: 'Inspects exact line-by-line file changes before you grant approval.', val: tool2 },
    { cmd: 'Subagents', name: 'Parallel Helpers', desc: 'Launches isolated subagents on fresh desks for large multi-stage projects.', val: tool3 },
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
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Staying in Control: The Supervisor Toolkit
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          You set the finish line; the agent navigates; you approve the arrival
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1080 }}>
        {tools.map((t, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: '#0f172a',
              border: `2px solid #1e293b`,
              borderRadius: THEME.radius.xl,
              padding: '24px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${t.val})`,
              opacity: t.val,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ color: '#38bdf8', fontFamily: THEME.fonts.mono, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              {t.cmd}
            </div>
            <div style={{ color: '#f8fafc', fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
              {t.name}
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, flex: 1 }}>
              {t.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
