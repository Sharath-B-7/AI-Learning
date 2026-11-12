import React from 'react';
import { MODULE_05_SUBTITLES } from './data/module05_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module05Scene01,
  Module05Scene02,
  Module05Scene03,
} from './scenes/Module05Scenes';

export const Module05Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part A: AI Fundamentals"
      moduleBadge="PART A · MODULE 05"
      audioFileName="module-05.mp3"
      subtitles={MODULE_05_SUBTITLES}
      scenes={[
        {
          component: <Module05Scene01 />,
          durationInFrames: 700, // 0.00s -> 23.36s (Intro, model versions & access)
        },
        {
          component: <Module05Scene02 />,
          durationInFrames: 280, // 23.36s -> 32.67s (Figure 5: Chat vs Agent)
        },
        {
          component: <Module05Scene03 />,
          durationInFrames: 339, // 32.67s -> 43.97s (3 Habits: Context, Goal, Format)
        },
      ]}
    />
  );
};

