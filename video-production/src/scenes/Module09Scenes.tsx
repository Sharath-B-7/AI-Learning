import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module09Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const cardSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

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
            marginBottom: 12,
          }}
        >
          PART B • MODULE 09
        </div>
        <h1 style={{ fontSize: 60, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Understanding <span style={{ color: THEME.colors.coral }}>Memory</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          How Claude handles conversations and saved instructions
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
          textAlign: 'center',
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
        }}
      >
        <div style={{ fontSize: 50, marginBottom: 12 }}>🌅</div>
        <h3 style={{ fontSize: 28, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          The Stateless Colleague Metaphor
        </h3>
        <p style={{ fontSize: 18, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
          Imagine a colleague who wakes up every morning with no memory of yesterday: <br />
          <strong>Each conversation starts fresh, with no carry-over from earlier chats.</strong>
        </p>
      </div>
    </div>
  );
};

export const Module09Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 120, fps, config: { damping: 14 } });

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
          FIGURE 9 • TWO FORMS OF MEMORY
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Short-Term vs. <span style={{ color: THEME.colors.teal }}>Persistent Memory</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1000 }}>
        {/* Short-term */}
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
          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 6 }}>
            Short-Term Memory
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Lives Only in Current Chat
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.45 }}>
            Remembers what you said earlier in the active conversation, but disappears when you start a new chat.
          </p>
        </div>

        {/* Persistent */}
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
          <div style={{ fontSize: 36, marginBottom: 12 }}>📓</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.tealDark, textTransform: 'uppercase', marginBottom: 6 }}>
            Persistent (Saved) Memory
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
            Notebook Read at Every Chat Start
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.45 }}>
            Stored notes you control—like project instructions or formatting guidelines—read automatically at the start of new chats.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module09Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const panelsSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const storeItems = ['Your specific role & industry', 'Formatting & tone preferences', 'Project rules & team conventions'];
  const neverItems = ['Passwords or API keys', 'Customer personal data (PII)', 'Confidential company secrets'];

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
          What to Store vs. <span style={{ color: THEME.colors.coral }}>What NEVER to Store</span>
        </h2>
        <p style={{ fontSize: 20, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Memory is a notebook you control: keep it clean, accurate, and safe
        </p>
      </div>

      <div style={{ display: 'flex', gap: 28, width: 1000, transform: `scale(${panelsSpring})`, opacity: panelsSpring }}>
        {/* What to store */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.tealDark, marginBottom: 14 }}>
            ✓ Store in Saved Notes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {storeItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: THEME.colors.charcoalBody }}>
                <span style={{ color: THEME.colors.teal, fontWeight: 900 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Never store */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '28px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.coralDark, marginBottom: 14 }}>
            ✕ NEVER Store in Notes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {neverItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: THEME.colors.charcoalBody }}>
                <span style={{ color: THEME.colors.coral, fontWeight: 900 }}>✕</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

