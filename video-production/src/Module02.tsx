import React from 'react';
import { MODULE_02_SUBTITLES } from './data/module02_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module02Scene01,
  Module02Scene02,
  Module02Scene03,
  Module02Scene04,
} from './scenes/Module02Scenes';

export const Module02Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part A: AI Fundamentals"
      moduleBadge="PART A · MODULE 02"
      audioFileName="module-02.mp3"
      subtitles={MODULE_02_SUBTITLES}
      scenes={[
        {
          component: <Module02Scene01 />,
          durationInFrames: 325, // 0.00s -> 10.83s (Training on vast text)
        },
        {
          component: <Module02Scene02 />,
          durationInFrames: 540, // 10.83s -> 28.83s (Token breakdown & prediction)
        },
        {
          component: <Module02Scene03 />,
          durationInFrames: 175, // 28.83s -> 34.66s (Probability fork)
        },
        {
          component: <Module02Scene04 />,
          durationInFrames: 401, // 34.66s -> 48.03s (Rigid vs Probabilistic & Judge)
        },
      ]}
    />
  );
};

