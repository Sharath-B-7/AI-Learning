import React from 'react';
import { MODULE_09_SUBTITLES } from './data/module09_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module09Scene01,
  Module09Scene02,
  Module09Scene03,
  Module09Scene04,
} from './scenes/Module09Scenes';

export const Module09Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="Part B • Module 9"
      audioFileName="module-09.mp3"
      subtitles={MODULE_09_SUBTITLES}
      scenes={[
        {
          component: <Module09Scene01 />,
          durationInFrames: 819,  // 0.00s -> 27.30s (The Blank Slate Dilemma)
        },
        {
          component: <Module09Scene02 />,
          durationInFrames: 974,  // 27.30s -> 59.76s (CLAUDE.md Handbook)
        },
        {
          component: <Module09Scene03 />,
          durationInFrames: 977,  // 59.76s -> 92.34s (Windows Locations & Data Hygiene)
        },
        {
          component: <Module09Scene04 />,
          durationInFrames: 865,  // 92.34s -> 121.15s (Inspecting with /memory & Rules)
        },
      ]}
    />
  );
};
