import React from 'react';
import { MODULE_10_SUBTITLES } from './data/module10_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module10Scene01,
  Module10Scene02,
  Module10Scene03,
  Module10Scene04,
} from './scenes/Module10Scenes';

export const Module10Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 10"
      audioFileName="module-10.mp3"
      subtitles={MODULE_10_SUBTITLES}
      scenes={[
        {
          component: <Module10Scene01 />,
          durationInFrames: 941,  // 0.00s -> 31.37s (Recipe Card Analogy & Skills vs Prompts)
        },
        {
          component: <Module10Scene02 />,
          durationInFrames: 917,  // 31.37s -> 61.92s (Where Skills Live & SKILL.md Anatomy)
        },
        {
          component: <Module10Scene03 />,
          durationInFrames: 881,  // 61.92s -> 91.31s (Progressive Disclosure & Clean Desk)
        },
        {
          component: <Module10Scene04 />,
          durationInFrames: 868,  // 91.31s -> 120.24s (Invoking Skills & Team Standards)
        },
      ]}
    />
  );
};
