import React from 'react';
import { MODULE_13_SUBTITLES } from './data/module13_subtitles';
import { ModuleComposition } from './template/ModuleComposition';
import {
  Module13Scene01,
  Module13Scene02,
  Module13Scene03,
} from './scenes/Module13Scenes';

export const Module13Video: React.FC = () => {
  return (
    <ModuleComposition
      partTitle="Part B: AI Concepts for Working with Systems"
      moduleBadge="PART B · MODULE 13"
      audioFileName="module-13.mp3"
      subtitles={MODULE_13_SUBTITLES}
      scenes={[
        {
          component: <Module13Scene01 />,
          durationInFrames: 450, // 0.00s -> 15.11s (Least access & keys)
        },
        {
          component: <Module13Scene02 />,
          durationInFrames: 580, // 15.11s -> 34.42s (Figure 13: 3 Security settings)
        },
        {
          component: <Module13Scene03 />,
          durationInFrames: 259, // 34.42s -> 42.97s (Rule precedence: Deny > Ask > Allow)
        },
      ]}
    />
  );
};

