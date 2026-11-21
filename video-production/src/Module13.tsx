import React from 'react';
import { MODULE_13_SUBTITLES } from './data/module13_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module13Scene01,
  Module13Scene02,
  Module13Scene03,
  Module13Scene04,
} from './scenes/Module13Scenes';

export const Module13Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 13"
      audioFileName="module-13.mp3"
      subtitles={MODULE_13_SUBTITLES}
      scenes={[
        {
          component: <Module13Scene01 />,
          durationInFrames: 948,  // 0.00s -> 31.60s (The Principle of Least Access)
        },
        {
          component: <Module13Scene02 />,
          durationInFrames: 907,  // 31.60s -> 61.83s (The Three Permission Tiers: Allow, Ask, Deny)
        },
        {
          component: <Module13Scene03 />,
          durationInFrames: 829,  // 61.83s -> 89.47s (settings.json & Shift+Tab Modes)
        },
        {
          component: <Module13Scene04 />,
          durationInFrames: 845,  // 89.47s -> 117.62s (Approval Vigilance & Completion)
        },
      ]}
    />
  );
};
