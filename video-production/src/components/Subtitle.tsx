import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';

export interface SubtitleItem {
  id: string;
  startFrame: number;
  endFrame: number;
  text: string;
  highlightWords?: string[];
}

interface SubtitleProps {
  subtitles: SubtitleItem[];
}

export const Subtitle: React.FC<SubtitleProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();

  // Find the currently active subtitle item
  const currentItem = subtitles.find(
    (item) => frame >= item.startFrame && frame <= item.endFrame
  );

  if (!currentItem) return null;

  // Gentle fade in and fade out near boundaries
  const localFrame = frame - currentItem.startFrame;
  const duration = currentItem.endFrame - currentItem.startFrame;
  const fadeIn = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(localFrame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Render text with highlighted keywords
  const renderTextWithHighlights = () => {
    if (!currentItem.highlightWords || currentItem.highlightWords.length === 0) {
      return currentItem.text;
    }

    const words = currentItem.text.split(' ');
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const isHighlighted = currentItem.highlightWords?.some(
        (hw) => hw.toLowerCase() === cleanWord
      );

      if (isHighlighted) {
        return (
          <span
            key={idx}
            style={{
              color: THEME.colors.subtitleHighlight,
              fontWeight: 800,
            }}
          >
            {word}{' '}
          </span>
        );
      }
      return <span key={idx}>{word} </span>;
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        pointerEvents: 'none',
        opacity,
      }}
    >
      <div
        style={{
          background: THEME.colors.subtitleBg,
          color: THEME.colors.subtitleText,
          padding: '14px 28px',
          borderRadius: THEME.radius.lg,
          fontSize: 24,
          fontWeight: 600,
          fontFamily: THEME.fonts.sans,
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          maxWidth: '85%',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {renderTextWithHighlights()}
      </div>
    </div>
  );
};

