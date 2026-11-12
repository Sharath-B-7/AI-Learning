import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module13Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const keysSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
          PART B • MODULE 13
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
          Permissions & <span style={{ color: THEME.colors.coral }}>Safety</span>
        </h1>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Claude can only do what its harness allows
        </p>
      </div>

      <div
        style={{
          width: 960,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 48px',
          boxShadow: THEME.shadows.card,
          textAlign: 'center',
          transform: `scale(${keysSpring})`,
          opacity: keysSpring,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🗝️</div>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          The Principle of Least Access
        </h3>
        <p style={{ fontSize: 18, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
          Just like giving a colleague keys only to the specific rooms they need for their job: <br />
          <strong>Permissions define what Claude may read, change, or send.</strong>
        </p>
      </div>
    </div>
  );
};

export const Module13Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const s1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const s2 = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const s3 = spring({ frame: frame - 360, fps, config: { damping: 14 } });

  const settings = [
    {
      level: 'ALLOW',
      title: 'Free Action',
      desc: 'Actions Claude can do freely without stopping',
      example: 'e.g. Reading project documentation and source code',
      color: '#16a34a',
      bg: '#dcfce7',
      border: '#86efac',
      icon: '🟢',
      springVal: s1,
    },
    {
      level: 'ASK',
      title: 'Wait for Approval',
      desc: 'Claude stops and requests your explicit confirmation',
      example: 'e.g. Modifying files, running commands, sending emails',
      color: '#ca8a04',
      bg: '#fef9c3',
      border: '#fde047',
      icon: '🟡',
      springVal: s2,
    },
    {
      level: 'DENY',
      title: 'Completely Blocked',
      desc: 'Hard barrier: Claude cannot access under any circumstance',
      example: 'e.g. Passwords, .env files, customer PII, payroll',
      color: '#dc2626',
      bg: '#fee2e2',
      border: '#fca5a5',
      icon: '🔴',
      springVal: s3,
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
          FIGURE 13 • 3 SECURITY SETTINGS
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Allow, Ask, or Deny
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1040 }}>
        {settings.map((s, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${s.border}`,
              borderRadius: THEME.radius.xl,
              padding: '28px 24px',
              boxShadow: THEME.shadows.card,
              transform: `scale(${s.springVal})`,
              opacity: s.springVal,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span
                style={{
                  background: s.bg,
                  color: s.color,
                  fontSize: 15,
                  fontWeight: 900,
                  padding: '4px 12px',
                  borderRadius: THEME.radius.pill,
                }}
              >
                {s.level}
              </span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 15, color: THEME.colors.charcoalBody, margin: '0 0 12px 0', lineHeight: 1.45 }}>
              {s.desc}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 13, color: THEME.colors.charcoalMuted, background: THEME.colors.backgroundSubtle, padding: '8px 12px', borderRadius: THEME.radius.md }}>
              {s.example}
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
  const precedenceSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
        <h2 style={{ fontSize: 48, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Stricter Rules <span style={{ color: THEME.colors.coral }}>Always Win</span>
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The rule precedence hierarchy guarantees safety
        </p>
      </div>

      <div
        style={{
          width: 960,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 48px',
          boxShadow: THEME.shadows.card,
          textAlign: 'center',
          transform: `scale(${precedenceSpring})`,
          opacity: precedenceSpring,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
          <div style={{ background: '#fee2e2', color: '#dc2626', border: '2px solid #fca5a5', padding: '16px 32px', borderRadius: THEME.radius.xl, fontSize: 28, fontWeight: 900 }}>
            DENY
          </div>
          <span style={{ fontSize: 36, color: THEME.colors.charcoalDark, fontWeight: 900 }}>&gt;</span>
          <div style={{ background: '#fef9c3', color: '#ca8a04', border: '2px solid #fde047', padding: '16px 32px', borderRadius: THEME.radius.xl, fontSize: 28, fontWeight: 900 }}>
            ASK
          </div>
          <span style={{ fontSize: 36, color: THEME.colors.charcoalDark, fontWeight: 900 }}>&gt;</span>
          <div style={{ background: '#dcfce7', color: '#16a34a', border: '2px solid #86efac', padding: '16px 32px', borderRadius: THEME.radius.xl, fontSize: 28, fontWeight: 900 }}>
            ALLOW
          </div>
        </div>

        <p style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, margin: 0 }}>
          Deny beats Ask, and Ask beats Allow: <strong>You stay in control.</strong>
        </p>
      </div>
    </div>
  );
};

