import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module13Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const vaultSpring = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const rulesCard = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          PART B • MODULE 13
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Permissions and <span style={{ color: THEME.colors.coral }}>Safety</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The principle of least access: granting only minimal permissions required
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1080 }}>
        {/* Least Access Vault */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${vaultSpring})`,
            opacity: vaultSpring,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🛡️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Least Access Security
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Like giving a contractor keys only to the specific room being painted, Claude receives access only to intended workspace folders.
          </p>
        </div>

        {/* Protection Pillars */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${rulesCard})`,
            opacity: rulesCard,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Airtight Safeguards
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Guarantees that sensitive environment variables, private API keys, and production databases remain completely isolated.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module13Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const allowCard = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const askCard = spring({ frame: frame - 220, fps, config: { damping: 14 } });
  const denyCard = spring({ frame: frame - 380, fps, config: { damping: 14 } });

  const tiers = [
    { title: 'ALLOW', desc: 'Safe actions execute freely (e.g. read files & directories)', color: '#047857', bg: '#ecfdf5', border: '#a7f3d0', val: allowCard, badge: '🟢 Read-Only Safe' },
    { title: 'ASK', desc: 'Pauses for human confirmation before writing files or running commands', color: '#b45309', bg: '#fef3c7', border: '#fde68a', val: askCard, badge: '🟡 Human Gate' },
    { title: 'DENY', desc: 'Strictly blocks access to forbidden files or risky scripts', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca', val: denyCard, badge: '🔴 Absolute Block' },
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
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          The Three Permission Settings &amp; Precedence
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Security Law: Deny beats Ask, and Ask beats Allow
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1100 }}>
        {tiers.map((t, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${t.border}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: THEME.shadows.card,
              transform: `scale(${t.val})`,
              opacity: t.val,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ background: t.bg, color: t.color, fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'center', marginBottom: 16 }}>
              {t.badge}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: t.color, marginBottom: 10 }}>
              {t.title}
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.charcoalBody, lineHeight: 1.5, flex: 1 }}>
              {t.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module13Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const jsonSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const modeSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          settings.json &amp; Interactive Permission Modes
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Lock down sensitive files and cycle execution modes with Shift + Tab
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1100 }}>
        {/* JSON Config */}
        <div
          style={{
            flex: 1.2,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${jsonSpring})`,
            opacity: jsonSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#38bdf8', fontSize: 13, marginBottom: 8 }}># .claude\settings.json (Deny Rules)</div>
          <div style={{ color: '#f8fafc', fontSize: 13, lineHeight: 1.6 }}>
            {`{`}<br />
            &nbsp;&nbsp;<span style={{ color: '#a78bfa' }}>"permissions"</span>: {`{`}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>"deny"</span>: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"*.env*"</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"credentials.json"</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"private.key"</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;]<br />
            &nbsp;&nbsp;{`}`}<br />
            {`}`}
          </div>
        </div>

        {/* Permission Modes */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${modeSpring})`,
            opacity: modeSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'flex-start', marginBottom: 10 }}>
            KEYBOARD SHORTCUT
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.charcoalDark, marginBottom: 10 }}>
            Shift + Tab
          </div>
          <div style={{ fontSize: 14, color: THEME.colors.charcoalBody, lineHeight: 1.5 }}>
            Cycles through 3 interactive modes:<br />
            • <strong>Normal:</strong> Prompts on each edit<br />
            • <strong>Accept Edits:</strong> Auto-approves file writes<br />
            • <strong>Plan Mode:</strong> Strictly read-only research
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module13Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const promptSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const badgeSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          Approval Vigilance &amp; Part B Completion
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Always read before you approve — security is non-negotiable
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Approval Prompt Box */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '24px 28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${promptSpring})`,
            opacity: promptSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#f59e0b', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            ⚠️ Human Approval Requested:
          </div>
          <div style={{ color: '#f8fafc', fontSize: 14, marginBottom: 12 }}>
            Claude wants to run:<br />
            <span style={{ color: '#38bdf8' }}>npm test -- --coverage</span>
          </div>
          <div style={{ color: '#10b981', fontSize: 14, fontWeight: 700 }}>
            [y] Approve &nbsp;&nbsp; [n] Reject &nbsp;&nbsp; [e] Explain
          </div>
        </div>

        {/* Completion Celebration Card */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${badgeSpring})`,
            opacity: badgeSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'flex-start', marginBottom: 10 }}>
            AI MASTERCLASS • PART B
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Empowered, Productive &amp; Secure
          </h3>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            You now possess the foundational knowledge to harness Claude Code effectively across model tiers, context, prompting, memory, skills, tools, and agents.
          </p>
        </div>
      </div>
    </div>
  );
};
