import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../../styles/theme';

export const Scene03Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({ frame, fps, config: { damping: 14 } });
  const rightSpring = spring({ frame: frame - 12, fps, config: { damping: 14 } });

  // 4 capability pills stagger
  const cap1 = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const cap2 = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  const cap3 = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const cap4 = spring({ frame: frame - 55, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        fontFamily: THEME.fonts.sans,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: THEME.colors.coralDark,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Comparing AI Tools
      </div>

      <h2
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: THEME.colors.charcoalDark,
          margin: '0 0 44px 0',
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        Narrow Everyday Tools vs General-Purpose Assistant
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 36,
          width: '100%',
          maxWidth: 1280,
        }}
      >
        {/* Left: Narrow AI */}
        <div
          style={{
            transform: `scale(${leftSpring})`,
            opacity: leftSpring,
            background: '#ffffff',
            border: `2px solid ${THEME.colors.borderLight}`,
            borderRadius: THEME.radius.xl,
            padding: '32px 36px',
            boxShadow: THEME.shadows.card,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: THEME.colors.charcoalSubtle,
              }}
            />
            <span style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.charcoalMuted, textTransform: 'uppercase' }}>
              Narrow AI Tools
            </span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 12 }}>
            One Fixed Job
          </div>

          <p style={{ fontSize: 17, color: THEME.colors.charcoalBody, lineHeight: 1.5, marginBottom: 24 }}>
            Built to perform a single isolated function behind the scenes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
            <div style={{ background: '#f8fafc', border: `1px solid ${THEME.colors.borderLight}`, padding: '12px 18px', borderRadius: THEME.radius.md, fontSize: 16, fontWeight: 600, color: THEME.colors.charcoalBody, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: THEME.colors.charcoalMuted }}>✉️</span> Email Spam Filtering
            </div>
            <div style={{ background: '#f8fafc', border: `1px solid ${THEME.colors.borderLight}`, padding: '12px 18px', borderRadius: THEME.radius.md, fontSize: 16, fontWeight: 600, color: THEME.colors.charcoalBody, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: THEME.colors.charcoalMuted }}>⌨️</span> Next-Word Keyboard Suggestions
            </div>
          </div>
        </div>

        {/* Right: General-Purpose Assistant (Claude) */}
        <div
          style={{
            transform: `scale(${rightSpring})`,
            opacity: rightSpring,
            background: '#ffffff',
            border: `3px solid ${THEME.colors.teal}`,
            borderRadius: THEME.radius.xl,
            padding: '32px 36px',
            boxShadow: '0 16px 40px rgba(13, 148, 136, 0.15)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: THEME.colors.teal,
                }}
              />
              <span style={{ fontSize: 20, fontWeight: 800, color: THEME.colors.tealDark, textTransform: 'uppercase' }}>
                Claude
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, background: THEME.colors.tealLight, color: THEME.colors.tealDark, padding: '4px 12px', borderRadius: 999 }}>
              GENERAL-PURPOSE ASSISTANT
            </span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 800, color: THEME.colors.charcoalDark, marginBottom: 12 }}>
            Conversational & Adaptive
          </div>

          <p style={{ fontSize: 17, color: THEME.colors.charcoalBody, lineHeight: 1.5, marginBottom: 20 }}>
            You talk to it in normal human language to assist across diverse cognitive tasks:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 'auto' }}>
            <div style={{ transform: `scale(${cap1})`, opacity: cap1, background: '#f0fdfa', border: `1.5px solid ${THEME.colors.tealBorder}`, padding: '14px 18px', borderRadius: THEME.radius.md, fontSize: 17, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>✍️</span> Writing
            </div>
            <div style={{ transform: `scale(${cap2})`, opacity: cap2, background: '#f0fdfa', border: `1.5px solid ${THEME.colors.tealBorder}`, padding: '14px 18px', borderRadius: THEME.radius.md, fontSize: 17, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📑</span> Summarizing
            </div>
            <div style={{ transform: `scale(${cap3})`, opacity: cap3, background: '#f0fdfa', border: `1.5px solid ${THEME.colors.tealBorder}`, padding: '14px 18px', borderRadius: THEME.radius.md, fontSize: 17, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>💡</span> Explaining
            </div>
            <div style={{ transform: `scale(${cap4})`, opacity: cap4, background: '#f0fdfa', border: `1.5px solid ${THEME.colors.tealBorder}`, padding: '14px 18px', borderRadius: THEME.radius.md, fontSize: 17, fontWeight: 800, color: THEME.colors.tealDark, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📊</span> Analyzing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

