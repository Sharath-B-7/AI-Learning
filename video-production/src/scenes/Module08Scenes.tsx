import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module08Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const chatCard = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const terminalCard = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          PART B • MODULE 08
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Prompting and <span style={{ color: THEME.colors.coral }}>Instructions</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Directing an autonomous assistant with access to local files and system tools
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1080 }}>
        {/* Chat Comparison */}
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
          <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Conversational Chat
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Casual Q&A in a browser window. Claude only responds with text; you must manually copy-paste into your editor.
          </p>
        </div>

        {/* Terminal Directive */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${terminalCard})`,
            opacity: terminalCard,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Terminal Directives
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Structured execution commands. Claude reads real files, executes edits, and runs build tools on your system.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module08Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const block1 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const block2 = spring({ frame: frame - 220, fps, config: { damping: 14 } });
  const block3 = spring({ frame: frame - 380, fps, config: { damping: 14 } });
  const block4 = spring({ frame: frame - 540, fps, config: { damping: 14 } });

  const parts = [
    { num: '1', title: 'SITUATION', desc: 'Who you are & role context', color: THEME.colors.teal, bg: THEME.colors.tealLight, val: block1 },
    { num: '2', title: 'GOAL', desc: 'Exact deliverables & finish line', color: THEME.colors.coral, bg: THEME.colors.coralLight, val: block2 },
    { num: '3', title: 'BACKGROUND', desc: 'Files & data referenced with @', color: THEME.colors.blue, bg: THEME.colors.blueLight, val: block3 },
    { num: '4', title: 'FORMAT', desc: 'Length, tone, bullet & style limits', color: THEME.colors.purple, bg: THEME.colors.purpleLight, val: block4 },
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
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          The 4-Part Request Framework
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Four structural pillars that turn ambiguous questions into reliable execution
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, width: 1120 }}>
        {parts.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 20px',
              textAlign: 'center',
              boxShadow: THEME.shadows.card,
              transform: `scale(${p.val})`,
              opacity: p.val,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: p.bg,
                color: p.color,
                fontWeight: 900,
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              {p.num}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.charcoalDark, marginBottom: 8 }}>
              {p.title}
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalMuted, lineHeight: 1.4 }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module08Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const weakSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const strongSpring = spring({ frame: frame - 320, fps, config: { damping: 14 } });

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
          Comparing Weak vs. Strong Requests
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Vague questions fail; structured directives deliver immediate accuracy
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1120 }}>
        {/* Weak Request */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid #fecaca`,
            borderRadius: THEME.radius.xl,
            padding: '24px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${weakSpring})`,
            opacity: weakSpring,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>❌</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#dc2626' }}>Weak Request</span>
          </div>
          <div style={{ background: '#0f172a', padding: '14px', borderRadius: THEME.radius.md, color: '#f8fafc', fontFamily: THEME.fonts.mono, fontSize: 14, marginBottom: 14 }}>
            &gt; summarize this
          </div>
          <div style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.4 }}>
            • Which file? Who is the audience?<br />
            • How long should it be?<br />
            • Where should it be saved?
          </div>
        </div>

        {/* Strong Request */}
        <div
          style={{
            flex: 1.4,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '24px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${strongSpring})`,
            opacity: strongSpring,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.tealDark }}>Strong Request</span>
          </div>
          <div style={{ background: '#0f172a', padding: '14px', borderRadius: THEME.radius.md, color: '#f8fafc', fontFamily: THEME.fonts.mono, fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>
            &gt; I'm preparing for a client meeting. Summarize <span style={{ color: '#38bdf8' }}>@Q3-report.pdf</span> in 5 bullets focusing on risks. Save as <span style={{ color: '#fb923c' }}>meeting-prep.md</span>.
          </div>
          <div style={{ fontSize: 13, color: THEME.colors.tealDark, fontWeight: 600, lineHeight: 1.4 }}>
            ✓ Situation: Client meeting tomorrow<br />
            ✓ Goal: 5-bullet summary saved to meeting-prep.md<br />
            ✓ Background: Explicit @Q3-report.pdf attachment<br />
            ✓ Format: Under 20 words per point, focus on risks
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module08Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const planSpring = spring({ frame: frame - 300, fps, config: { damping: 14 } });

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
          Terminal Shortcuts & Proactive Planning
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Write structured multiline prompts and mandate step-by-step roadmaps
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Multiline Input */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${terminalSpring})`,
            opacity: terminalSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}># Multiline Input Shortcut</div>
          <div style={{ color: '#38bdf8', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Ctrl + J <span style={{ color: '#64748b' }}>or</span> Shift + Enter
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, fontFamily: THEME.fonts.sans, lineHeight: 1.4 }}>
            Allows formatting complex 4-part requests across multiple lines before submitting to the model.
          </div>
        </div>

        {/* Plan Mode */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${planSpring})`,
            opacity: planSpring,
          }}
        >
          <div style={{ background: THEME.colors.coralLight, color: THEME.colors.coralDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, display: 'inline-block', marginBottom: 10 }}>
            CRITICAL SUPERPOWER
          </div>
          <div style={{ fontFamily: THEME.fonts.mono, fontSize: 16, color: '#0f172a', fontWeight: 700, marginBottom: 8 }}>
            &gt; /plan Refactor auth module
          </div>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, lineHeight: 1.4, margin: 0 }}>
            Mandates that Claude research dependencies, produce an implementation roadmap, and wait for your explicit approval before altering code.
          </p>
        </div>
      </div>
    </div>
  );
};
