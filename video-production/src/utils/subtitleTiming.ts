import { SubtitleItem } from '../components/Subtitle';
import { SUBTITLES } from '../data/module01';

export function getActiveSubtitle(
  frame: number,
  subtitles: SubtitleItem[] = SUBTITLES
): SubtitleItem | undefined {
  return subtitles.find(
    (item) => frame >= item.startFrame && frame <= item.endFrame
  );
}

export function getSubtitlesForRange(
  startFrame: number,
  endFrame: number,
  subtitles: SubtitleItem[] = SUBTITLES
): SubtitleItem[] {
  return subtitles.filter(
    (item) => item.endFrame >= startFrame && item.startFrame <= endFrame
  );
}

