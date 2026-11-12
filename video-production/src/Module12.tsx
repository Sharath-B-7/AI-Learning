import React from 'react';
import { MODULE_12_SUBTITLES } from './data/module12_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module12Scene01,
  Module12Scene02,
  Module12Scene03,
} from './scenes/Module12Scenes';

export const Module12Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 12"
      audioFileName="module-12.mp3"
      subtitles={MODULE_12_SUBTITLES}
      scenes={[
        {
          component: <Module12Scene01 />,
          durationInFrames: 325, // 0.00s -> 10.81s (Chat vs Agent)
        },
        {
          component: <Module12Scene02 />,
          durationInFrames: 650, // 10.81s -> 32.44s (Figure 12: Loop & Subagents)
        },
        {
          component: <Module12Scene03 />,
          durationInFrames: 295, // 32.44s -> 42.33s (4 Goal Pillars)
        },
      ]}
    />
  );
};

