import React from 'react';
import { MODULE_09_SUBTITLES } from './data/module09_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module09Scene01,
  Module09Scene02,
  Module09Scene03,
} from './scenes/Module09Scenes';

export const Module09Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 09"
      audioFileName="module-09.mp3"
      subtitles={MODULE_09_SUBTITLES}
      scenes={[
        {
          component: <Module09Scene01 />,
          durationInFrames: 450, // 0.00s -> 15.00s (Intro & Stateless colleague)
        },
        {
          component: <Module09Scene02 />,
          durationInFrames: 460, // 15.00s -> 30.33s (Figure 9: Short vs Persistent memory)
        },
        {
          component: <Module09Scene03 />,
          durationInFrames: 419, // 30.33s -> 44.30s (What to store vs never store)
        },
      ]}
    />
  );
};

