import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { Branding } from '../components/Branding';
import { Subtitle, SubtitleItem } from '../components/Subtitle';
import { THEME } from '../styles/theme';

export interface SceneConfig {
  component: React.ReactNode;
  durationInFrames: number;
}

interface ModuleCompositionProps {
  partTitle: string;
  moduleBadge: string;
  audioFileName: string;
  subtitles: SubtitleItem[];
  scenes: SceneConfig[];
}

export const ModuleComposition: React.FC<ModuleCompositionProps> = ({
  partTitle,
  moduleBadge,
  audioFileName,
  subtitles,
  scenes,
}) => {
  let accumulatedFrame = 0;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: THEME.colors.background,
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(13, 148, 136, 0.05) 0%, transparent 40%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Audio Layer */}
      <Audio src={staticFile(`audio/${audioFileName}`)} />

      {/* Top Branding Header */}
      <Branding moduleBadge={moduleBadge} />

      {/* Synchronized Scenes */}
      {scenes.map((scene, idx) => {
        const from = accumulatedFrame;
        accumulatedFrame += scene.durationInFrames;

        return (
          <Sequence
            key={idx}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={`Scene-${idx + 1}`}
          >
            {scene.component}
          </Sequence>
        );
      })}

      {/* Subtitles Layer */}
      <Subtitle subtitles={subtitles} />
    </div>
  );
};

