import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module09Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          PART B • MODULE 09
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Persistent Memory: <span style={{ color: THEME.colors.coral }}>CLAUDE.md</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Overcoming the blank-slate dilemma across terminal sessions
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1080 }}>
        {/* Default Session Behavior */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card1})`,
            opacity: card1,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🌅</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            The Blank Slate
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Every new PowerShell session starts fresh. Claude has no memory of past chats, previous bugs, or architectural decisions.
          </p>
        </div>

        {/* The Solution */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card2})`,
            opacity: card2,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📖</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            CLAUDE.md Solution
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalMuted, lineHeight: 1.5, margin: 0 }}>
            Saved project instructions read automatically on startup, establishing build commands, testing standards, and rules permanently.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module09Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const bookSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const listSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          CLAUDE.md: The Project Onboarding Handbook
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Automatically ingested into working memory before your first prompt
        </p>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1100 }}>
        {/* Handbook visual */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            border: `2px solid #1e293b`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${bookSpring})`,
            opacity: bookSpring,
            fontFamily: THEME.fonts.mono,
          }}
        >
          <div style={{ color: '#38bdf8', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            # ./CLAUDE.md (Root Project Handbook)
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
            ## Build &amp; Test Commands<br />
            - Run tests: `npm test`<br />
            - Build bundle: `npm run build`<br /><br />
            ## Code Architecture<br />
            - Follow strict TypeScript schemas<br />
            - Use React functional components<br />
            - Never commit API keys
          </div>
        </div>

        {/* Benefits List */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '28px 32px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${listSpring})`,
            opacity: listSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 16 }}>
            What CLAUDE.md Achieves:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: THEME.colors.charcoalBody }}>
            <div>✓ <strong>Zero Repetition:</strong> Never re-type lint or test commands.</div>
            <div>✓ <strong>Team Consistency:</strong> Committed to Git; every dev shares rules.</div>
            <div>✓ <strong>Instant Alignment:</strong> Claude acts like an onboarded senior engineer.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module09Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const safeCard = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const forbiddenCard = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          Windows Locations &amp; Data Hygiene
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Global profile memory vs. project repository memory
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1120 }}>
        {/* Safe to Store */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${safeCard})`,
            opacity: safeCard,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.tealDark }}>Always Store</span>
          </div>
          <div style={{ fontSize: 14, color: THEME.colors.charcoalBody, lineHeight: 1.6 }}>
            • Preferred package manager (`npm` vs. `pnpm`)<br />
            • Build, test &amp; lint commands<br />
            • Project directory conventions<br />
            • Core architectural boundaries
          </div>
          <div style={{ marginTop: 14, background: THEME.colors.backgroundSubtle, padding: '8px 12px', borderRadius: THEME.radius.md, fontSize: 12, fontFamily: THEME.fonts.mono, color: '#475569' }}>
            Path: .\CLAUDE.md (Project Root)
          </div>
        </div>

        {/* Never Store */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid #fecaca`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${forbiddenCard})`,
            opacity: forbiddenCard,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>🚫</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#dc2626' }}>Never Store (Forbidden)</span>
          </div>
          <div style={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.6 }}>
            • Database passwords &amp; secrets<br />
            • Cloud API keys or access tokens<br />
            • `.env` credentials or certificates<br />
            • Customer PII or confidential data
          </div>
          <div style={{ marginTop: 14, background: '#fef2f2', padding: '8px 12px', borderRadius: THEME.radius.md, fontSize: 12, fontFamily: THEME.fonts.mono, color: '#b91c1c' }}>
            Warning: Stored rules are visible to all collaborators!
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module09Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const recapSpring = spring({ frame: frame - 280, fps, config: { damping: 14 } });

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
          Inspecting Memory &amp; Best Practices
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Verify active instructions with /memory and keep documentation concise
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1080 }}>
        {/* Terminal Memory Command */}
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
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}># Inspect Loaded Project Instructions</div>
          <div style={{ color: '#f8fafc', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            <span style={{ color: '#38bdf8' }}>&gt;</span> <span style={{ color: '#a78bfa' }}>/memory</span>
          </div>
          <div style={{ color: '#64748b', fontSize: 13, fontFamily: THEME.fonts.sans, lineHeight: 1.4 }}>
            Opens the Memory Inspector modal, displaying both Global profile rules and active Project `CLAUDE.md` directives.
          </div>
        </div>

        {/* Golden Rule */}
        <div
          style={{
            flex: 1.2,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${recapSpring})`,
            opacity: recapSpring,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: THEME.colors.tealLight, color: THEME.colors.tealDark, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: THEME.radius.pill, alignSelf: 'flex-start', marginBottom: 10 }}>
            GOLDEN RULE
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
            Keep Memory Concise
          </h3>
          <p style={{ fontSize: 15, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Concise, specific instructions get followed accurately. Bloated, unfocused memory files get diluted. Treat CLAUDE.md as a living document.
          </p>
        </div>
      </div>
    </div>
  );
};
