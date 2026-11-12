import React from 'react';
import { MODULE_03_SUBTITLES } from './data/module03_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module03Scene01,
  Module03Scene02,
  Module03Scene03,
} from './scenes/Module03Scenes';

export const Module03Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part A: AI Fundamentals"
      moduleBadge="PART A · MODULE 03"
      audioFileName="module-03.mp3"
      subtitles={MODULE_03_SUBTITLES}
      scenes={[
        {
          component: <Module03Scene01 />,
          durationInFrames: 95, // 0.00s -> 3.16s (Intro)
        },
        {
          component: <Module03Scene02 />,
          durationInFrames: 715, // 3.16s -> 27.00s (4 steps pipeline)
        },
        {
          component: <Module03Scene03 />,
          durationInFrames: 388, // 27.00s -> 39.93s (3 essentials)
        },
      ]}
    />
  );
};

