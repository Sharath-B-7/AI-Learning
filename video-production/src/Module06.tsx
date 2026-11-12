import React from 'react';
import { MODULE_06_SUBTITLES } from './data/module06_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module06Scene01,
  Module06Scene02,
  Module06Scene03,
} from './scenes/Module06Scenes';

export const Module06Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 06"
      audioFileName="module-06.mp3"
      subtitles={MODULE_06_SUBTITLES}
      scenes={[
        {
          component: <Module06Scene01 />,
          durationInFrames: 750, // 0.00s -> 25.00s (Haiku, Sonnet, Opus tiers)
        },
        {
          component: <Module06Scene02 />,
          durationInFrames: 420, // 25.00s -> 39.00s (Thinking models & Multimodal)
        },
        {
          component: <Module06Scene03 />,
          durationInFrames: 221, // 39.00s -> 46.37s (Figure 6: Match model to job)
        },
      ]}
    />
  );
};

