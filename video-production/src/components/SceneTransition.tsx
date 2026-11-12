import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SceneTransitionProps {
  children: React.ReactNode;
  durationInFrames: number;
  transitionDuration?: number;
  type?: 'fade' | 'slide-up' | 'scale';
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  durationInFrames,
  transitionDuration = 15,
  type = 'scale',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 90,
      mass: 0.8,
    },
  });

  // Exit interpolation
  const exitProgress = interpolate(
    frame,
    [durationInFrames - transitionDuration, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);

  let transform = '';
  if (type === 'scale') {
    const scaleEnter = interpolate(enterSpring, [0, 1], [0.94, 1]);
    const scaleExit = interpolate(exitProgress, [0, 1], [1, 1.04]);
    transform = `scale(${scaleEnter * scaleExit})`;
  } else if (type === 'slide-up') {
    const translateY = interpolate(enterSpring, [0, 1], [30, 0]) + interpolate(exitProgress, [0, 1], [0, -30]);
    transform = `translateY(${translateY}px)`;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        transform,
      }}
    >
      {children}
    </div>
  );
};

