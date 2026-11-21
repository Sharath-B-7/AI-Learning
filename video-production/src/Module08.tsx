import React from 'react';
import { MODULE_08_SUBTITLES } from './data/module08_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module08Scene01,
  Module08Scene02,
  Module08Scene03,
  Module08Scene04,
} from './scenes/Module08Scenes';

export const Module08Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 8"
      audioFileName="module-08.mp3"
      subtitles={MODULE_08_SUBTITLES}
      scenes={[
        {
          component: <Module08Scene01 />,
          durationInFrames: 789,  // 0.00s -> 26.30s (Chat vs. Terminal Directives)
        },
        {
          component: <Module08Scene02 />,
          durationInFrames: 860,  // 26.30s -> 54.98s (The 4-Part Request Framework)
        },
        {
          component: <Module08Scene03 />,
          durationInFrames: 1025, // 54.98s -> 89.15s (Weak vs. Strong Comparison)
        },
        {
          component: <Module08Scene04 />,
          durationInFrames: 895,  // 89.15s -> 118.97s (Shortcuts: Ctrl+J & /plan)
        },
      ]}
    />
  );
};
