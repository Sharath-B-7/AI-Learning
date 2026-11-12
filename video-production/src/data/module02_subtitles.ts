import { SubtitleItem } from '../components/Subtitle';

export const MODULE_02_SUBTITLES: SubtitleItem[] = [
  {
    id: 'sub-1',
    startFrame: 3,
    endFrame: 323,
    text: "A Large Language Model, or LLM, is trained on vast amounts of text\u2014books, articles, and websites\u2014learning how language works and ideas connect.",
    highlightWords: ["Language"]
  },
  {
    id: 'sub-2',
    startFrame: 321,
    endFrame: 555,
    text: "Its core mechanism is simple: given some text, it predicts what text should come next, one small piece at a time.",
    highlightWords: []
  },
  {
    id: 'sub-3',
    startFrame: 555,
    endFrame: 657,
    text: "The model does not read whole words like we do.",
    highlightWords: []
  },
  {
    id: 'sub-4',
    startFrame: 657,
    endFrame: 867,
    text: "It processes tokens\u2014small pieces of text that can be a word, part of a word, or punctuation.",
    highlightWords: []
  },
  {
    id: 'sub-5',
    startFrame: 867,
    endFrame: 1040,
    text: "When generating a response, the LLM weighs several likely options and picks one.",
    highlightWords: []
  },
  {
    id: 'sub-6',
    startFrame: 1040,
    endFrame: 1330,
    text: "Because it chooses among likely options rather than following rigid formulas, asking the same question twice can produce two different, equally reasonable answers.",
    highlightWords: ["Because"]
  },
  {
    id: 'sub-7',
    startFrame: 1330,
    endFrame: 1415,
    text: "Always read and judge the output.",
    highlightWords: ["Always"]
  },
];
