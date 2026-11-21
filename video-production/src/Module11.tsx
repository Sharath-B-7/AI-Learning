import React from 'react';
import { MODULE_11_SUBTITLES } from './data/module11_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module11Scene01,
  Module11Scene02,
  Module11Scene03,
  Module11Scene04,
} from './scenes/Module11Scenes';

export const Module11Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 11"
      audioFileName="module-11.mp3"
      subtitles={MODULE_11_SUBTITLES}
      scenes={[
        {
          component: <Module11Scene01 />,
          durationInFrames: 972,  // 0.00s -> 32.40s (The Brain in a Locked Room & Harness)
        },
        {
          component: <Module11Scene02 />,
          durationInFrames: 968,  // 32.40s -> 64.67s (Built-In Tools Grid)
        },
        {
          component: <Module11Scene03 />,
          durationInFrames: 806,  // 64.67s -> 91.53s (Direct Shell Bypass with !)
        },
        {
          component: <Module11Scene04 />,
          durationInFrames: 1022, // 91.53s -> 125.62s (MCP Connectors & Harness Formula)
        },
      ]}
    />
  );
};
