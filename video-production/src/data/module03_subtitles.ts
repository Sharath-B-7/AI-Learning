import { SubtitleItem } from '../components/Subtitle';

export const MODULE_03_SUBTITLES: SubtitleItem[] = [
  {
    id: 'sub-1',
    startFrame: 3,
    endFrame: 95,
    text: "An LLM works in four steps.",
    highlightWords: []
  },
  {
    id: 'sub-2',
    startFrame: 93,
    endFrame: 523,
    text: "The first two happen before you use it: pre-training, where the model reads vast text collections to learn general language patterns and facts; and fine-tuning with human feedback, which trains it to be a helpful, polite assistant that follows instructions.",
    highlightWords: []
  },
  {
    id: 'sub-3',
    startFrame: 523,
    endFrame: 661,
    text: "When you send a message, step three turns your text into tokens.",
    highlightWords: []
  },
  {
    id: 'sub-4',
    startFrame: 661,
    endFrame: 805,
    text: "Step four predicts the reply piece by piece, token by token.",
    highlightWords: []
  },
  {
    id: 'sub-5',
    startFrame: 805,
    endFrame: 1172,
    text: "Always keep three essentials in mind: the model has a fixed knowledge cutoff date, it does not look things up by default, and it can invent false details with complete confidence\u2014known as a hallucination.",
    highlightWords: ["Always"]
  },
];
