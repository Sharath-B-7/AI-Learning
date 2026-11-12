import React from 'react';
import { MODULE_10_SUBTITLES } from './data/module10_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module10Scene01,
  Module10Scene02,
  Module10Scene03,
} from './scenes/Module10Scenes';

export const Module10Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 10"
      audioFileName="module-10.mp3"
      subtitles={MODULE_10_SUBTITLES}
      scenes={[
        {
          component: <Module10Scene01 />,
          durationInFrames: 290, // 0.00s -> 9.66s (Recipe card metaphor)
        },
        {
          component: <Module10Scene02 />,
          durationInFrames: 300, // 9.66s -> 19.66s (Figure 10: Prompt vs Skill)
        },
        {
          component: <Module10Scene03 />,
          durationInFrames: 556, // 19.66s -> 38.20s (Context efficiency & Trigger rule)
        },
      ]}
    />
  );
};

