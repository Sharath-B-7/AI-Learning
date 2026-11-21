import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module07Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const deskSpring = spring({ frame: frame - 100, fps, config: { damping: 14 } });
  const item1 = spring({ frame: frame - 220, fps, config: { damping: 14 } });
  const item2 = spring({ frame: frame - 360, fps, config: { damping: 14 } });
  const item3 = spring({ frame: frame - 500, fps, config: { damping: 14 } });
  const item4 = spring({ frame: frame - 640, fps, config: { damping: 14 } });

  const deskItems = [
    { title: 'Your Prompt', desc: 'Current question & task instructions', icon: '💬', val: item1 },
    { title: 'Chat History', desc: 'Previous back-and-forth messages', icon: '📜', val: item2 },
    { title: 'Shared Files', desc: 'Documents & code added with @', icon: '📁', val: item3 },
    { title: 'Tool Outputs', desc: 'Compiler logs & terminal results', icon: '⚡', val: item4 },
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
          PART B • MODULE 07
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Understanding <span style={{ color: THEME.colors.coral }}>Context</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The physical desk metaphor: only what is on the desk exists for Claude
        </p>
      </div>

      {/* Desk visualization */}
      <div
        style={{
          width: 1120,
          background: THEME.colors.cardBackground,
          border: `3px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 32px',
          boxShadow: THEME.shadows.card,
          transform: `scale(${deskSpring})`,
          opacity: deskSpring,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🖥️</span> Claude's Working Workspace (Active Desk)
          </div>
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill }}>
            ACTIVE CONTEXT
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {deskItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: THEME.colors.backgroundSubtle,
                border: `1.5px solid ${THEME.colors.borderMedium}`,
                borderRadius: THEME.radius.lg,
                padding: '20px',
                textAlign: 'center',
                transform: `scale(${item.val})`,
                opacity: item.val,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
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
  const gaugeSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const warningSpring = spring({ frame: frame - 480, fps, config: { damping: 14 } });

  // Progress gauge animation
  const fillProgress = interpolate(frame, [100, 350], [25, 92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          The Context Window: 200,000 Tokens
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Roughly 150,000 words — massive, yet still finite
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1100 }}>
        {/* Token Capacity Meter */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${gaugeSpring})`,
            opacity: gaugeSpring,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 16 }}>
            Surface Area Capacity
          </div>
          <div
            style={{
              height: 28,
              background: '#e2e8f0',
              borderRadius: THEME.radius.pill,
              overflow: 'hidden',
              position: 'relative',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: `${fillProgress}%`,
                height: '100%',
                background: fillProgress > 80 ? 'linear-gradient(90deg, #f97316, #ef4444)' : 'linear-gradient(90deg, #0d9488, #f97316)',
                borderRadius: THEME.radius.pill,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, color: THEME.colors.charcoalMuted }}>
            <span>0 Tokens (Clean Desk)</span>
            <span style={{ color: fillProgress > 80 ? '#ea580c' : '#0d9488' }}>
              {Math.round(fillProgress * 2000)} / 200,000 Tokens
            </span>
          </div>
        </div>

        {/* Clutter Warning */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${warningSpring})`,
            opacity: warningSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>⚠️</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.coralDark }}>
              Context Clutter Risk
            </span>
          </div>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalBody, lineHeight: 1.5, margin: '0 0 12px 0' }}>
            Overloading the desk causes Claude to forget instructions, misinterpret rules, and hallucinate answers.
          </p>
          <div style={{ background: THEME.colors.coralLight, color: THEME.colors.coralDark, fontSize: 14, fontWeight: 800, padding: '8px 14px', borderRadius: THEME.radius.md, textAlign: 'center' }}>
            Quality Matters More Than Quantity!
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
  const cmd1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const cmd2 = spring({ frame: frame - 280, fps, config: { damping: 14 } });
  const cmd3 = spring({ frame: frame - 520, fps, config: { damping: 14 } });

  const commands = [
    {
      syntax: '> @src/auth.ts Review password hashing',
      label: '1. Target Specific Files with @',
      desc: 'Places only the exact file needed onto the desk instead of the entire repo.',
      val: cmd1,
      color: THEME.colors.teal,
    },
    {
      syntax: '> /context',
      label: '2. Inspect Desk Usage with /context',
      desc: 'Displays active token consumption and lists every loaded file and message.',
      val: cmd2,
      color: THEME.colors.coral,
    },
    {
      syntax: '> /compact',
      label: '3. Compress Chat History with /compact',
      desc: 'Summarizes older conversation turns while keeping key project decisions.',
      val: cmd3,
      color: THEME.colors.blue,
    },
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
      <div style={{ textAlign: 'center', marginBottom: 30, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Claude Code Context Management Commands
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Take proactive control of your working memory during active development
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 1040 }}>
        {commands.map((c, i) => (
          <div
            key={i}
            style={{
              background: '#0f172a',
              border: `2px solid #1e293b`,
              borderRadius: THEME.radius.lg,
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: THEME.shadows.card,
              transform: `scale(${c.val})`,
              opacity: c.val,
            }}
          >
            <div>
              <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                {c.label}
              </div>
              <div style={{ color: '#f8fafc', fontFamily: THEME.fonts.mono, fontSize: 16, fontWeight: 600 }}>
                {c.syntax}
              </div>
            </div>
            <div style={{ maxWidth: 420, color: '#cbd5e1', fontSize: 14, textAlign: 'right', lineHeight: 1.4 }}>
              {c.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module07Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const rulesSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
      <div style={{ textAlign: 'center', marginBottom: 30, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Golden Rules for a Clean Context Desk
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Wipe the desk clean when starting new features to preserve focus
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Terminal Clear */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '32px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${terminalSpring})`,
            opacity: terminalSpring,
            fontFamily: THEME.fonts.mono,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}># Wipe Context Clean</div>
          <div style={{ color: '#f8fafc', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> <span style={{ color: '#f97316' }}>/clear</span>
          </div>
          <div style={{ color: '#64748b', fontSize: 14, fontFamily: THEME.fonts.sans, lineHeight: 1.5 }}>
            Resets working context to 0 tokens for your next task while preserving persistent CLAUDE.md guidelines.
          </div>
        </div>

        {/* Rules Checklist */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px 32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${rulesSpring})`,
            opacity: rulesSpring,
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, display: 'inline-block', marginBottom: 12 }}>
            BEST PRACTICES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Never dump entire codebases at once — be selective',
              'Share only targeted files with the @ operator',
              'Run /compact when sessions grow long',
              'Run /clear when switching to an unrelated task',
            ].map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: THEME.colors.charcoalDark, fontWeight: 600 }}>
                <span style={{ color: THEME.colors.teal, fontSize: 18 }}>✓</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
