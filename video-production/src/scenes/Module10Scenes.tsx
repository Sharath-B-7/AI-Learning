import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module10Scene01: React.FC = () => {
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
          PART B • MODULE 10
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
          Understanding <span style={{ color: THEME.colors.coral }}>Skills</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Reusable workflows and team standard operating procedures
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
        <div style={{ fontSize: 50, marginBottom: 12 }}>📋</div>
        <h3 style={{ fontSize: 28, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          The Recipe Card Metaphor
        </h3>
        <p style={{ fontSize: 18, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
          Once you have a good recipe, you don't reinvent the steps every time you cook: <br />
          <strong>A skill is a recipe card for Claude.</strong>
        </p>
      </div>
    </div>
  );
};

export const Module10Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const card1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const card2 = spring({ frame: frame - 100, fps, config: { damping: 14 } });

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
          FIGURE 10 • PROMPT VS SKILL
        </div>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          One-Time Prompt vs. <span style={{ color: THEME.colors.teal }}>Reusable Skill</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 1000 }}>
        {/* Prompt */}
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
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 8 }}>
            One-Time Prompt
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            Typed Each Time
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.5 }}>
            Ad-hoc instructions typed for single requests. Varies slightly every time and takes up context.
          </p>
        </div>

        {/* Skill */}
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
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.tealDark, textTransform: 'uppercase', marginBottom: 8 }}>
            Saved Skill
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            Saved Reusable Method
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: '0 0 12px 0', lineHeight: 1.5 }}>
            Packaged workflow that defines:
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Steps', 'Templates', 'Tone Guidelines', 'Final Checklist'].map((item, idx) => (
              <span
                key={idx}
                style={{
                  background: THEME.colors.tealLight,
                  color: THEME.colors.tealDark,
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: THEME.radius.pill,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Module10Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const efficiencySpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const triggerSpring = spring({ frame: frame - 200, fps, config: { damping: 14 } });

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
          Context Efficiency & <span style={{ color: THEME.colors.coral }}>When to Create a Skill</span>
        </h2>
      </div>

      {/* Desk efficiency card */}
      <div
        style={{
          width: 960,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '28px 36px',
          boxShadow: THEME.shadows.card,
          marginBottom: 24,
          transform: `scale(${efficiencySpring})`,
          opacity: efficiencySpring,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
              Keeps Your Context Desk Clean
            </div>
            <div style={{ fontSize: 16, color: THEME.colors.charcoalMuted, lineHeight: 1.45 }}>
              Claude sees only a concise summary of each available skill—loading full instructions only when needed for the active task.
            </div>
          </div>
        </div>
      </div>

      {/* Trigger rule */}
      <div
        style={{
          width: 960,
          background: THEME.colors.coralLight,
          border: `2px solid ${THEME.colors.coralBorder}`,
          borderRadius: THEME.radius.xl,
          padding: '24px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${triggerSpring})`,
          opacity: triggerSpring,
        }}
      >
        <span style={{ fontSize: 40 }}>🎯</span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.coralDark, marginBottom: 4 }}>
            The Skill Trigger Rule
          </div>
          <div style={{ fontSize: 16, color: THEME.colors.charcoalBody }}>
            Whenever you find yourself repeating instructions, or when a workflow requires consistent team standards, turn that method into a reusable skill.
          </div>
        </div>
      </div>
    </div>
  );
};

