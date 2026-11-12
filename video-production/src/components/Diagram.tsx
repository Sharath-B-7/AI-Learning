import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

interface NodeProps {
  x: number;
  y: number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
  highlight?: boolean;
  color?: string;
  width?: number;
}

export const DiagramNode: React.FC<NodeProps> = ({
  x,
  y,
  title,
  subtitle,
  icon,
  delay = 0,
  highlight = false,
  color = THEME.colors.teal,
  width = 240,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  const scale = interpolate(enter, [0, 1], [0.8, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        background: THEME.colors.cardBackground,
        border: `2px solid ${highlight ? color : THEME.colors.borderLight}`,
        borderRadius: THEME.radius.md,
        padding: '16px 20px',
        boxShadow: highlight ? THEME.shadows.glowTeal : THEME.shadows.card,
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        zIndex: 10,
        fontFamily: THEME.fonts.sans,
      }}
    >
      {icon && (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: THEME.radius.sm,
            background: highlight ? `${color}18` : THEME.colors.backgroundSubtle,
            border: `1px solid ${highlight ? color : THEME.colors.borderMedium}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}
      <div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: THEME.colors.charcoalDark,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: THEME.colors.charcoalMuted,
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
  color?: string;
  dashed?: boolean;
}

export const DiagramConnection: React.FC<ConnectionProps> = ({
  from,
  to,
  delay = 0,
  color = THEME.colors.teal,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const midX = from.x + dx / 2;

  const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;

  // Flowing dot along the curve
  const pulseOffset = (frame * 2.5) % 100;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* Background track line */}
      <path
        d={path}
        fill="none"
        stroke={THEME.colors.borderLight}
        strokeWidth="3"
        strokeDasharray={dashed ? '6 6' : undefined}
      />
      {/* Animated drawing line */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeDasharray="1000"
        strokeDashoffset={1000 * (1 - progress)}
      />
      {/* Flowing particle when fully drawn */}
      {progress > 0.8 && (
        <circle
          r="4"
          fill={color}
          filter={`drop-shadow(0 0 6px ${color})`}
        >
          <animateMotion
            path={path}
            dur="2.5s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
          />
        </circle>
      )}
    </svg>
  );
};

