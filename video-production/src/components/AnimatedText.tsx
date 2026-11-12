import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  style?: React.CSSProperties;
  slideDistance?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  fontSize = 32,
  fontWeight = 700,
  color = THEME.colors.charcoalDark,
  style,
  slideDistance = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
      mass: 0.6,
    },
  });

  const translateY = interpolate(anim, [0, 1], [slideDistance, 0]);
  const opacity = interpolate(anim, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: THEME.fonts.sans,
        lineHeight: 1.25,
        letterSpacing: '-0.02em',
        transform: `translateY(${translateY}px)`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

