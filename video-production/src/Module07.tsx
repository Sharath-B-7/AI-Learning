import React from 'react';
import { MODULE_07_SUBTITLES } from './data/module07_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module07Scene01,
  Module07Scene02,
  Module07Scene03,
} from './scenes/Module07Scenes';

export const Module07Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 07"
      audioFileName="module-07.mp3"
      subtitles={MODULE_07_SUBTITLES}
      scenes={[
        {
          component: <Module07Scene01 />,
          durationInFrames: 480, // 0.00s -> 16.00s (Figure 7: The Desk Metaphor)
        },
        {
          component: <Module07Scene02 />,
          durationInFrames: 450, // 16.00s -> 31.00s (Context Window & Clutter)
        },
        {
          component: <Module07Scene03 />,
          durationInFrames: 270, // 31.00s -> 40.00s (Clean context habits)
        },
      ]}
    />
  );
};

