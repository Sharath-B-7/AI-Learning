import React from 'react';
import { MODULE_04_SUBTITLES } from './data/module04_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module04Scene01,
  Module04Scene02,
  Module04Scene03,
} from './scenes/Module04Scenes';

export const Module04Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part A: AI Fundamentals"
      moduleBadge="Part A • Module 4"
      audioFileName="module-04.mp3"
      subtitles={MODULE_04_SUBTITLES}
      scenes={[
        {
          component: <Module04Scene01 />,
          durationInFrames: 720, // 0.00s -> 24.00s (Strengths vs Limits & Uneven skill)
        },
        {
          component: <Module04Scene02 />,
          durationInFrames: 560, // 24.00s -> 42.67s (Figure 4: Stakes spectrum)
        },
        {
          component: <Module04Scene03 />,
          durationInFrames: 268, // 42.67s -> 51.60s (Privacy & Shield)
        },
      ]}
    />
  );
};

