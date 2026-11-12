import { SubtitleItem } from '../components/Subtitle';

export const MODULE_07_SUBTITLES: SubtitleItem[] = [
  {
    id: 'sub-1',
    startFrame: 3,
    endFrame: 130,
    text: "Context is everything Claude can see at the moment it answers you.",
    highlightWords: ["Context", "Claude"]
  },
  {
    id: 'sub-2',
    startFrame: 129,
    endFrame: 208,
    text: "Picture Claude sitting at a desk.",
    highlightWords: ["Picture", "Claude"]
  },
  {
    id: 'sub-3',
    startFrame: 208,
    endFrame: 476,
    text: "Only what is on that desk is available to work with: your instructions, the conversation history, files you shared, and tool results.",
    highlightWords: []
  },
  {
    id: 'sub-4',
    startFrame: 476,
    endFrame: 593,
    text: "Anything not on the desk simply does not exist for Claude.",
    highlightWords: ["Anything", "Claude"]
  },
  {
    id: 'sub-5',
    startFrame: 593,
    endFrame: 711,
    text: "But the desk has a size limit called the context window.",
    highlightWords: []
  },
  {
    id: 'sub-6',
    startFrame: 711,
    endFrame: 934,
    text: "When a chat grows too long or files too large, the desk clutters, causing Claude to lose track of details.",
    highlightWords: ["Claude"]
  },
  {
    id: 'sub-7',
    startFrame: 934,
    endFrame: 1174,
    text: "Keep your context clean: start a fresh chat for each new task, and share only the specific pages and files that matter.",
    highlightWords: []
  },
];
