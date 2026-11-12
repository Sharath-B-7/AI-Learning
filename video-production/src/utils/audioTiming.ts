import { SCENES_TIMING, SceneMeta } from '../data/module01';

export const FPS = 30;

export function frameToSeconds(frame: number, fps: number = FPS): number {
  return frame / fps;
}

export function secondsToFrame(seconds: number, fps: number = FPS): number {
  return Math.round(seconds * fps);
}

export function getSceneAtFrame(frame: number): SceneMeta | undefined {
  return SCENES_TIMING.find(
    (scene) =>
      frame >= scene.startFrame &&
      frame < scene.startFrame + scene.durationInFrames
  );
}

export function getLocalSceneFrame(frame: number, scene: SceneMeta): number {
  return Math.max(0, frame - scene.startFrame);
}

