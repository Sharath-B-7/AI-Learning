import React from 'react';
import { MODULE_08_SUBTITLES } from './data/module08_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module08Scene01,
  Module08Scene02,
  Module08Scene03,
} from './scenes/Module08Scenes';

export const Module08Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 08"
      audioFileName="module-08.mp3"
      subtitles={MODULE_08_SUBTITLES}
      scenes={[
        {
          component: <Module08Scene01 />,
          durationInFrames: 240, // 0.00s -> 8.00s (Intro & Collaboration)
        },
        {
          component: <Module08Scene02 />,
          durationInFrames: 480, // 8.00s -> 24.00s (Figure 8: 4 parts of prompt)
        },
        {
          component: <Module08Scene03 />,
          durationInFrames: 486, // 24.00s -> 40.20s (Techniques & Working draft)
        },
      ]}
    />
  );
};

