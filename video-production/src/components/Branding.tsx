import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';

interface BrandingProps {
  currentScene?: number;
  totalScenes?: number;
  sceneTitle?: string;
  hideHeader?: boolean;
}

export const Branding: React.FC<BrandingProps> = ({
  currentScene = 1,
  totalScenes = 9,
  sceneTitle,
  hideHeader = false,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (hideHeader) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 60,
        right: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        opacity,
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Brand logo & track */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            background: THEME.colors.charcoalDark,
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '0.08em',
            padding: '6px 14px',
            borderRadius: THEME.radius.sm,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: THEME.shadows.subtle,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: THEME.colors.coral,
              display: 'inline-block',
            }}
          />
          AI MASTERCLASS
        </div>

        <div
          style={{
            color: THEME.colors.charcoalMuted,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          PART A · MODULE 01
        </div>
      </div>

      {/* Scene indicator & progress */}
      {sceneTitle && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: THEME.colors.tealDark,
              background: THEME.colors.tealLight,
              padding: '4px 12px',
              borderRadius: THEME.radius.pill,
              border: `1px solid ${THEME.colors.tealBorder}`,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Scene {currentScene} of {totalScenes}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: THEME.colors.charcoalDark,
            }}
          >
            {sceneTitle}
          </div>
        </div>
      )}
    </div>
  );
};

