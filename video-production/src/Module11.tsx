import React from 'react';
import { MODULE_11_SUBTITLES } from './data/module11_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module11Scene01,
  Module11Scene02,
  Module11Scene03,
} from './scenes/Module11Scenes';

export const Module11Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 11"
      audioFileName="module-11.mp3"
      subtitles={MODULE_11_SUBTITLES}
      scenes={[
        {
          component: <Module11Scene01 />,
          durationInFrames: 445, // 0.00s -> 14.82s (Locked room & tools)
        },
        {
          component: <Module11Scene02 />,
          durationInFrames: 455, // 14.82s -> 30.00s (Figure 11: Harness workshop)
        },
        {
          component: <Module11Scene03 />,
          durationInFrames: 311, // 30.00s -> 40.37s (Triad summary)
        },
      ]}
    />
  );
};

