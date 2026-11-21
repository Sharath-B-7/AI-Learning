import React from 'react';
import { MODULE_06_SUBTITLES } from './data/module06_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module06Scene01,
  Module06Scene02,
  Module06Scene03,
  Module06Scene04,
} from './scenes/Module06Scenes';

export const Module06Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 6"
      audioFileName="module-06.mp3"
      subtitles={MODULE_06_SUBTITLES}
      scenes={[
        {
          component: <Module06Scene01 />,
          durationInFrames: 912, // 0.00s -> 30.40s (Intro & Model Family)
        },
        {
          component: <Module06Scene02 />,
          durationInFrames: 1135, // 30.40s -> 68.23s (Haiku vs Sonnet vs Opus)
        },
        {
          component: <Module06Scene03 />,
          durationInFrames: 838,  // 68.23s -> 96.16s (Extended Thinking & Multimodal)
        },
        {
          component: <Module06Scene04 />,
          durationInFrames: 806,  // 96.16s -> 123.05s (CLI Commands & Selection Strategy)
        },
      ]}
    />
  );
};
