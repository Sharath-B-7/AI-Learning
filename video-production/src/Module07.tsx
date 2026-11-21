import React from 'react';
import { MODULE_07_SUBTITLES } from './data/module07_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module07Scene01,
  Module07Scene02,
  Module07Scene03,
  Module07Scene04,
} from './scenes/Module07Scenes';

export const Module07Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 7"
      audioFileName="module-07.mp3"
      subtitles={MODULE_07_SUBTITLES}
      scenes={[
        {
          component: <Module07Scene01 />,
          durationInFrames: 815,  // 0.00s -> 27.17s (The Physical Desk Analogy)
        },
        {
          component: <Module07Scene02 />,
          durationInFrames: 1026, // 27.17s -> 61.37s (The Context Window & Clutter)
        },
        {
          component: <Module07Scene03 />,
          durationInFrames: 853,  // 61.37s -> 89.80s (Commands: @file, /context, /compact)
        },
        {
          component: <Module07Scene04 />,
          durationInFrames: 880,  // 89.80s -> 119.14s (/clear & Clean Desk Checklist)
        },
      ]}
    />
  );
};
