import React from 'react';
import { MODULE_12_SUBTITLES } from './data/module12_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module12Scene01,
  Module12Scene02,
  Module12Scene03,
  Module12Scene04,
} from './scenes/Module12Scenes';

export const Module12Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 12"
      audioFileName="module-12.mp3"
      subtitles={MODULE_12_SUBTITLES}
      scenes={[
        {
          component: <Module12Scene01 />,
          durationInFrames: 884,  // 0.00s -> 29.47s (Conversation to Delegation)
        },
        {
          component: <Module12Scene02 />,
          durationInFrames: 882,  // 29.47s -> 58.87s (The Autonomous Agent Loop)
        },
        {
          component: <Module12Scene03 />,
          durationInFrames: 876,  // 58.87s -> 88.07s (The 4 Elements of an Agent Goal)
        },
        {
          component: <Module12Scene04 />,
          durationInFrames: 909,  // 88.07s -> 118.37s (Supervisor Toolkit: /plan, /diff, Subagents)
        },
      ]}
    />
  );
};
