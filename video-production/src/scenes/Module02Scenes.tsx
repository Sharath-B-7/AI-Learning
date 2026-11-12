import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Module02Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({ frame, fps, config: { damping: 14 } });
  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const cardsSpring = spring({ frame: frame - 16, fps, config: { damping: 14 } });
  const floatY = Math.sin(frame / 20) * 4;

  const sources = [
    { title: 'Books', desc: 'Narrative structures & depth', icon: '📚', color: THEME.colors.coral },
    { title: 'Articles', desc: 'Facts, news & explanations', icon: '📰', color: THEME.colors.teal },
    { title: 'Websites', desc: 'Discussions & global knowledge', icon: '🌐', color: THEME.colors.blue },
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
        padding: '0 120px',
      }}
    >
      <div
        style={{
          transform: `scale(${badgeSpring})`,
          opacity: badgeSpring,
          background: THEME.colors.coralLight,
          border: `1px solid ${THEME.colors.coralBorder}`,
          color: THEME.colors.coralDark,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '8px 24px',
          borderRadius: THEME.radius.pill,
          marginBottom: 20,
        }}
      >
        Part A • Module 02
      </div>

      <h1
        style={{
          transform: `scale(${titleSpring}) translateY(${floatY}px)`,
          opacity: titleSpring,
          fontSize: 70,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 24px 0',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        What Is a <span style={{ color: THEME.colors.coral }}>Large Language Model</span>?
      </h1>

      <p
        style={{
          fontSize: 26,
          color: THEME.colors.charcoalMuted,
          margin: '0 0 40px 0',
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        Trained on vast amounts of text to learn how language works and ideas connect.
      </p>

      {/* 3 Source Cards */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          transform: `scale(${cardsSpring})`,
          opacity: cardsSpring,
        }}
      >
        {sources.map((src, i) => (
          <div
            key={i}
            style={{
              width: 280,
              padding: '28px 24px',
              background: THEME.colors.cardBackground,
              border: `2px solid ${THEME.colors.borderLight}`,
              borderRadius: THEME.radius.xl,
              boxShadow: THEME.shadows.card,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 12 }}>{src.icon}</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, margin: '0 0 8px 0' }}>
              {src.title}
            </h3>
            <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0 }}>
              {src.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module02Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });
  const tokensSpring = spring({ frame: frame - 12, fps, config: { damping: 14 } });

  const tokens = [
    { label: 'Word', example: 'predict', color: THEME.colors.teal, bg: THEME.colors.tealLight },
    { label: 'Part of Word', example: 'ing', color: THEME.colors.coral, bg: THEME.colors.coralLight },
    { label: 'Punctuation', example: ',', color: THEME.colors.blue, bg: THEME.colors.blueLight },
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
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: THEME.colors.tealLight,
            color: THEME.colors.tealDark,
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 20px',
            borderRadius: THEME.radius.pill,
            marginBottom: 16,
          }}
        >
          CORE MECHANISM
        </div>
        <h2 style={{ fontSize: 54, fontWeight: 900, color: THEME.colors.charcoalDark, margin: '0 0 16px 0' }}>
          Predicting Text <span style={{ color: THEME.colors.teal }}>One Token at a Time</span>
        </h2>
        <p style={{ fontSize: 24, color: THEME.colors.charcoalMuted, margin: 0 }}>
          The model does not read whole words like humans do—it processes tokens.
        </p>
      </div>

      {/* Token Demonstration Box */}
      <div
        style={{
          transform: `scale(${tokensSpring})`,
          opacity: tokensSpring,
          display: 'flex',
          gap: 32,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '40px 60px',
          boxShadow: THEME.shadows.card,
        }}
      >
        {tokens.map((t, idx) => (
          <div key={idx} style={{ textAlign: 'center', width: 220 }}>
            <div
              style={{
                background: t.bg,
                border: `2px solid ${t.color}`,
                borderRadius: THEME.radius.lg,
                padding: '24px 16px',
                marginBottom: 16,
                fontFamily: THEME.fonts.mono,
                fontSize: 36,
                fontWeight: 800,
                color: t.color,
              }}
            >
              {t.example}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 4 }}>
              {t.label}
            </div>
            <div style={{ fontSize: 15, color: THEME.colors.charcoalSubtle }}>
              Token Type
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Module02Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const treeSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });

  // Unlabeled relative probability bars (strictly following user correction)
  const candidates = [
    { text: 'smart', widthPercent: 85, isChosen: true, color: THEME.colors.teal },
    { text: 'helpful', widthPercent: 55, isChosen: false, color: THEME.colors.charcoalMuted },
    { text: 'capable', widthPercent: 35, isChosen: false, color: THEME.colors.charcoalMuted },
    { text: 'rapid', widthPercent: 18, isChosen: false, color: THEME.colors.charcoalMuted },
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
          FIGURE 2 • NEXT-TOKEN SELECTION
        </div>
        <h2 style={{ fontSize: 50, fontWeight: 900, color: THEME.colors.charcoalDark, margin: 0 }}>
          Weighing Several Likely Options
        </h2>
      </div>

      <div
        style={{
          transform: `scale(${treeSpring})`,
          opacity: treeSpring,
          width: 900,
          background: THEME.colors.cardBackground,
          border: `2px solid ${THEME.colors.borderLight}`,
          borderRadius: THEME.radius.xl,
          padding: '36px 48px',
          boxShadow: THEME.shadows.card,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.charcoalMuted, marginBottom: 24 }}>
          Input Prompt: <span style={{ color: THEME.colors.charcoalDark, fontWeight: 800 }}>"Claude is a..."</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {candidates.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 140,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 24,
                  fontWeight: 800,
                  color: c.isChosen ? THEME.colors.tealDark : THEME.colors.charcoalBody,
                  textAlign: 'right',
                }}
              >
                "{c.text}"
              </div>

              {/* Unlabeled probability bar */}
              <div
                style={{
                  flex: 1,
                  height: 32,
                  background: THEME.colors.backgroundSubtle,
                  borderRadius: THEME.radius.pill,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: `${c.widthPercent}%`,
                    height: '100%',
                    background: c.isChosen ? THEME.colors.teal : THEME.colors.borderMedium,
                    borderRadius: THEME.radius.pill,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>

              <div style={{ width: 130 }}>
                {c.isChosen && (
                  <span
                    style={{
                      background: THEME.colors.tealLight,
                      color: THEME.colors.tealDark,
                      border: `1px solid ${THEME.colors.tealBorder}`,
                      fontSize: 14,
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: THEME.radius.pill,
                    }}
                  >
                    SELECTED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Module02Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const compareSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const ruleSpring = spring({ frame: frame - 20, fps, config: { damping: 14 } });

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
        padding: '0 120px',
      }}
    >
      <h2
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          fontSize: 52,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 32px 0',
          textAlign: 'center',
        }}
      >
        Probabilistic vs. <span style={{ color: THEME.colors.coral }}>Rigid Formulas</span>
      </h2>

      <div
        style={{
          transform: `scale(${compareSpring})`,
          opacity: compareSpring,
          display: 'flex',
          gap: 32,
          marginBottom: 36,
          width: 960,
        }}
      >
        {/* Rigid software */}
        <div
          style={{
            flex: 1,
            padding: '28px',
            background: THEME.colors.backgroundSubtle,
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.lg,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.charcoalMuted, textTransform: 'uppercase', marginBottom: 8 }}>
            Traditional Software
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 12 }}>
            Rigid Formula
          </div>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalMuted, margin: 0, lineHeight: 1.5 }}>
            Same input always yields the exact same calculated output.
          </p>
        </div>

        {/* LLM */}
        <div
          style={{
            flex: 1,
            padding: '28px',
            background: THEME.colors.cardBackground,
            border: `2px solid ${THEME.colors.coralBorder}`,
            borderRadius: THEME.radius.lg,
            boxShadow: THEME.shadows.card,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.coral, textTransform: 'uppercase', marginBottom: 8 }}>
            Large Language Model
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 12 }}>
            Likely Options Selection
          </div>
          <p style={{ fontSize: 16, color: THEME.colors.charcoalBody, margin: 0, lineHeight: 1.5 }}>
            Same question can produce two different, equally reasonable answers.
          </p>
        </div>
      </div>

      {/* Crucial takeaway rule */}
      <div
        style={{
          transform: `scale(${ruleSpring})`,
          opacity: ruleSpring,
          background: THEME.colors.tealLight,
          border: `2px solid ${THEME.colors.tealBorder}`,
          borderRadius: THEME.radius.pill,
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 24 }}>⚖️</span>
        <span style={{ fontSize: 22, fontWeight: 800, color: THEME.colors.tealDark }}>
          Always read and judge the output.
        </span>
      </div>
    </div>
  );
};

