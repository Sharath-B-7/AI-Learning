import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module05Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const versionsSpring = spring({ frame: frame - 170, fps, config: { damping: 14 } });
  const channelsSpring = spring({ frame: frame - 430, fps, config: { damping: 14 } });

  const channels = [
    { title: 'Claude Apps', desc: 'Web, desktop & mobile', icon: '💻' },
    { title: 'Claude Code', desc: 'Inside technical projects', icon: '⚡' },
    { title: 'API', desc: 'Direct developer integration', icon: '🔌' },
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
            background: THEME.colors.coralLight,
            color: THEME.colors.coralDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          PART A • MODULE 05
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          Meet <span style={{ color: THEME.colors.coral }}>Claude</span>
        </h1>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          An AI assistant created by Anthropic, built on Large Language Models
        </p>
      </div>

      {/* Model size versions */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          width: 960,
          marginBottom: 24,
          transform: `scale(${versionsSpring})`,
          opacity: versionsSpring,
        }}
      >
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.tealBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '20px 24px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.tealDark, textTransform: 'uppercase', marginBottom: 4 }}>
            Smaller Models
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
            Faster & Cheaper
          </div>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0 }}>
            Ideal for quick edits, simple sorting, and rapid turnarounds.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '20px 24px',
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.coralDark, textTransform: 'uppercase', marginBottom: 4 }}>
            Larger Models
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
            Complex Reasoning
          </div>
          <p style={{ fontSize: 14, color: THEME.colors.charcoalMuted, margin: 0 }}>
            Engineered for in-depth analysis, difficult tasks, and nuanced logic.
          </p>
        </div>
      </div>

      {/* 3 Access Channels */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          width: 960,
          transform: `scale(${channelsSpring})`,
          opacity: channelsSpring,
        }}
      >
        {channels.map((ch, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: THEME.colors.backgroundSubtle,
              border: `1px solid ${THEME.colors.borderMedium}`,
              borderRadius: THEME.radius.lg,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ fontSize: 30 }}>{ch.icon}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: THEME.colors.charcoalDark }}>{ch.title}</div>
              <div style={{ fontSize: 13, color: THEME.colors.charcoalMuted }}>{ch.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module05Scene02: React.FC = () => {
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
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.tealLight,
            color: THEME.colors.tealDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 12,
          }}
        >
          FIGURE 5 • TWO MODES OF INTERACTION
        </div>
        <h2 style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Chat vs. <span style={{ color: THEME.colors.coral }}>Agent</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 32, width: 960 }}>
        {/* Chat Mode */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card1})`,
            opacity: card1,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.blue, textTransform: 'uppercase', marginBottom: 8 }}>
            Chat Mode
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            You Ask, Claude Answers
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.5 }}>
            Interactive dialogue where you guide every step and prompt one response at a time.
          </p>
        </div>

        {/* Agent Mode */}
        <div
          style={{
            flex: 1,
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.xl,
            padding: '36px',
            boxShadow: THEME.shadows.card,
            transform: `scale(${card2})`,
            opacity: card2,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.coralDark, textTransform: 'uppercase', marginBottom: 8 }}>
            Agent Mode
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
            Takes Action with Tools
          </h3>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Given a goal, Claude autonomously plans steps, reads files, runs commands, and checks results.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Module05Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const habitsSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  const habits = [
    { num: '01', title: 'Context', desc: 'Who you are & relevant background', color: THEME.colors.teal, bg: THEME.colors.tealLight },
    { num: '02', title: 'Clear Goal', desc: 'Exactly what you want produced', color: THEME.colors.coral, bg: THEME.colors.coralLight },
    { num: '03', title: 'Exact Format', desc: 'e.g. A short email, bullet points, or a table', color: THEME.colors.blue, bg: THEME.colors.blueLight },
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
        padding: '0 100px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 36, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <h2 style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 12px 0' }}>
          Three Habits for <span style={{ color: THEME.colors.coral }}>Great Results</span>
        </h2>
        <p style={{ fontSize: 22, color: THEME.colors.charcoalMuted, margin: 0 }}>
          Consistently apply this simple 3-part formula to every request
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, width: 1020, transform: `scale(${habitsSpring})`, opacity: habitsSpring }}>
        {habits.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              padding: '32px 24px',
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: h.bg,
                color: h.color,
                fontSize: 16,
                fontWeight: 900,
                padding: '6px 18px',
                borderRadius: THEME.radius.pill,
                marginBottom: 16,
              }}
            >
              HABIT {h.num}
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 10px 0' }}>
              {h.title}
            </h3>
            <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.45 }}>
              {h.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

