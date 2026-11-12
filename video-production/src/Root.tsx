import React from 'react';
import { Composition } from 'remotion';
import { Module01Video } from './Module01';
import { Module02Video } from './Module02';
import { Module03Video } from './Module03';
import { Module04Video } from './Module04';
import { Module05Video } from './Module05';
import { Module06Video } from './Module06';
import { Module07Video } from './Module07';
import { Module08Video } from './Module08';
import { Module09Video } from './Module09';
import { Module10Video } from './Module10';
import { Module11Video } from './Module11';
import { Module12Video } from './Module12';
import { Module13Video } from './Module13';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Module01"
        component={Module01Video}
        durationInFrames={1380} // 46.00s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module02"
        component={Module02Video}
        durationInFrames={1441} // 48.03s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module03"
        component={Module03Video}
        durationInFrames={1198} // 39.93s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module04"
        component={Module04Video}
        durationInFrames={1548} // 51.60s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module05"
        component={Module05Video}
        durationInFrames={1319} // 43.97s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module06"
        component={Module06Video}
        durationInFrames={1391} // 46.37s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module07"
        component={Module07Video}
        durationInFrames={1200} // 40.00s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module08"
        component={Module08Video}
        durationInFrames={1206} // 40.20s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module09"
        component={Module09Video}
        durationInFrames={1329} // 44.30s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module10"
        component={Module10Video}
        durationInFrames={1146} // 38.20s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module11"
        component={Module11Video}
        durationInFrames={1211} // 40.37s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module12"
        component={Module12Video}
        durationInFrames={1270} // 42.33s
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Module13"
        component={Module13Video}
        durationInFrames={1289} // 42.97s
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
