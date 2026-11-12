import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../../styles/theme';

export const Scene02Hierarchy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing triggers within this 535-frame scene:
  // 0 - 212: Machine Learning definition
  // 213 - 447: LLM definition
  // 448 - 534: Claude as example of LLM

  const aiSpring = spring({ frame, fps, config: { damping: 14 } });
  const mlSpring = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const llmSpring = spring({ frame: frame - 213, fps, config: { damping: 14 } });
  const claudeSpring = spring({ frame: frame - 448, fps, config: { damping: 12 } });

  // Active highlights
  const isMLActive = frame >= 0 && frame < 213;
  const isLLMActive = frame >= 213 && frame < 448;
  const isClaudeActive = frame >= 448;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 100px',
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Left: The 3 Concentric Categories + Claude Example Callout */}
      <div
        style={{
          width: 720,
          height: 640,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Layer 1: Outermost Circle - Artificial Intelligence */}
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 640,
            borderRadius: '50%',
            background: '#ffffff',
            border: `3px solid ${THEME.colors.charcoalDark}`,
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
            transform: `scale(${aiSpring})`,
            opacity: aiSpring,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 48,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: THEME.colors.charcoalDark,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Artificial Intelligence (AI)
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: THEME.colors.charcoalMuted,
              marginTop: 2,
            }}
          >
            The Big Umbrella
          </div>
        </div>

        {/* Layer 2: Middle Circle - Machine Learning */}
        <div
          style={{
            position: 'absolute',
            width: 410,
            height: 410,
            borderRadius: '50%',
            background: isMLActive ? '#fff7ed' : '#f8fafc',
            border: `3px solid ${isMLActive ? THEME.colors.coral : THEME.colors.borderDark}`,
            boxShadow: isMLActive ? '0 0 24px rgba(249, 115, 22, 0.25)' : 'none',
            transform: `scale(${mlSpring})`,
            opacity: mlSpring,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 36,
            transition: 'border 0.3s, background 0.3s',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: isMLActive ? THEME.colors.coralDark : THEME.colors.charcoalBody,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Machine Learning
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: THEME.colors.charcoalMuted,
              marginTop: 2,
            }}
          >
            Learns from vast examples
          </div>
        </div>

        {/* Layer 3: Innermost Circle - Large Language Models */}
        <div
          style={{
            position: 'absolute',
            width: 230,
            height: 230,
            borderRadius: '50%',
            background: isLLMActive ? '#f0fdfa' : '#ffffff',
            border: `3px solid ${isLLMActive ? THEME.colors.teal : THEME.colors.borderMedium}`,
            boxShadow: isLLMActive ? '0 0 24px rgba(13, 148, 136, 0.3)' : 'none',
            transform: `scale(${llmSpring})`,
            opacity: llmSpring,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            textAlign: 'center',
            transition: 'border 0.3s, background 0.3s',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: isLLMActive ? THEME.colors.tealDark : THEME.colors.charcoalDark,
              lineHeight: 1.25,
            }}
          >
            Large Language Models (LLMs)
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: THEME.colors.charcoalMuted,
              marginTop: 4,
            }}
          >
            Understands & writes human language
          </div>
        </div>

        {/* Claude Example Pointer Callout (Pointing directly to LLM circle) */}
        {frame >= 440 && (
          <div
            style={{
              position: 'absolute',
              right: -40,
              top: 275,
              transform: `scale(${claudeSpring})`,
              opacity: claudeSpring,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 30,
            }}
          >
            {/* Pointer SVG Arrow pointing into center */}
            <svg width="48" height="32" viewBox="0 0 48 32">
              <path
                d="M 44 16 L 8 16 M 18 8 L 6 16 L 18 24"
                fill="none"
                stroke={THEME.colors.teal}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              style={{
                background: THEME.colors.teal,
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: THEME.radius.lg,
                boxShadow: '0 8px 24px rgba(13, 148, 136, 0.4)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.9 }}>
                LLM EXAMPLE
              </span>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>
                Claude
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Technical Definition Cards Synchronized with Narration */}
      <div
        style={{
          width: 540,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: THEME.colors.charcoalMuted,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          Figure 1 • Nested Hierarchy
        </div>

        {/* Card 1: Machine Learning */}
        <div
          style={{
            background: '#ffffff',
            border: `2px solid ${isMLActive ? THEME.colors.coral : THEME.colors.borderLight}`,
            borderRadius: THEME.radius.lg,
            padding: '20px 24px',
            boxShadow: isMLActive ? THEME.shadows.elevated : THEME.shadows.card,
            transform: isMLActive ? 'translateX(-8px)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>Machine Learning</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.coral, background: THEME.colors.coralLight, padding: '3px 10px', borderRadius: 999 }}>Inside AI</span>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: THEME.colors.charcoalBody, lineHeight: 1.4 }}>
            Computers learn from vast examples instead of being given step-by-step rules.
          </p>
        </div>

        {/* Card 2: Large Language Models */}
        <div
          style={{
            background: '#ffffff',
            border: `2px solid ${isLLMActive ? THEME.colors.teal : THEME.colors.borderLight}`,
            borderRadius: THEME.radius.lg,
            padding: '20px 24px',
            boxShadow: isLLMActive ? THEME.shadows.elevated : THEME.shadows.card,
            transform: isLLMActive ? 'translateX(-8px)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>Large Language Models</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.teal, background: THEME.colors.tealLight, padding: '3px 10px', borderRadius: 999 }}>Inside ML</span>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: THEME.colors.charcoalBody, lineHeight: 1.4 }}>
            A type of machine learning built specifically to understand and write human language.
          </p>
        </div>

        {/* Card 3: Claude Example */}
        <div
          style={{
            background: isClaudeActive ? '#f0fdfa' : '#ffffff',
            border: `2px solid ${isClaudeActive ? THEME.colors.tealDark : THEME.colors.borderLight}`,
            borderRadius: THEME.radius.lg,
            padding: '20px 24px',
            boxShadow: isClaudeActive ? THEME.shadows.elevated : THEME.shadows.card,
            transform: isClaudeActive ? 'translateX(-8px)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.charcoalDark }}>Claude</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', background: THEME.colors.tealDark, padding: '3px 10px', borderRadius: 999 }}>LLM Instance</span>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: THEME.colors.charcoalBody, lineHeight: 1.4 }}>
            An example of an LLM that you talk to in natural language to accomplish real work.
          </p>
        </div>
      </div>
    </div>
  );
};
