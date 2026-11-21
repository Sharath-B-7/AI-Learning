import React from 'react';
import { MODULE_01_SUBTITLES } from './data/module01_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import { Scene01Intro } from './template/scenes/Scene01Intro';
import { Scene02Hierarchy } from './template/scenes/Scene02Hierarchy';
import { Scene03Comparison } from './template/scenes/Scene03Comparison';
import { Scene04Colleague } from './template/scenes/Scene04Colleague';

export const Module01Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part A: AI Fundamentals"
      moduleBadge="Part A • Module 1"
      audioFileName="module-01.mp3"
      subtitles={MODULE_01_SUBTITLES}
      scenes={[
        {
          component: <Scene01Intro />,
          durationInFrames: 231, // 0.00s -> 7.70s
        },
        {
          component: <Scene02Hierarchy />,
          durationInFrames: 535, // 7.70s -> 25.53s
        },
        {
          component: <Scene03Comparison />,
          durationInFrames: 311, // 25.53s -> 35.90s
        },
        {
          component: <Scene04Colleague />,
          durationInFrames: 303, // 35.90s -> 46.00s
        },
      ]}
    />
  );
};
