import { SubtitleItem } from '../components/Subtitle';

export const MODULE_07_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 128,
    "text": "Welcome to Module 7: Context in Claude Code.",
    "highlightWords": [
      "context"
    ]
  },
  {
    "id": "sub-2",
    "startFrame": 126,
    "endFrame": 297,
    "text": "To understand how Claude Code thinks, picture Claude sitting at a physical working desk.",
    "highlightWords": []
  },
  {
    "id": "sub-3",
    "startFrame": 297,
    "endFrame": 672,
    "text": "Everything Claude can see and remember at this exact moment is what sits on that desk: your initial prompt, previous conversation messages, file contents you have shared, and the outputs returned by tools.",
    "highlightWords": []
  },
  {
    "id": "sub-4",
    "startFrame": 672,
    "endFrame": 815,
    "text": "Anything not physically placed on the desk simply does not exist for Claude.",
    "highlightWords": []
  },
  {
    "id": "sub-5",
    "startFrame": 815,
    "endFrame": 989,
    "text": "However, this desk has a finite physical surface area known as the context window.",
    "highlightWords": [
      "context",
      "window"
    ]
  },
  {
    "id": "sub-6",
    "startFrame": 989,
    "endFrame": 1238,
    "text": "Claude features an industry-leading context window of 200,000 tokens, which equals roughly 150,000 words.",
    "highlightWords": [
      "context",
      "window",
      "tokens"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1238,
    "endFrame": 1453,
    "text": "But when you load dozens of unnecessary files or let a conversation run for hours, the desk becomes cluttered.",
    "highlightWords": []
  },
  {
    "id": "sub-8",
    "startFrame": 1453,
    "endFrame": 1684,
    "text": "Context clutter causes Claude to lose track of key constraints, misinterpret guidelines, and hallucinate details.",
    "highlightWords": [
      "context"
    ]
  },
  {
    "id": "sub-9",
    "startFrame": 1684,
    "endFrame": 1841,
    "text": "In artificial intelligence engineering, quality matters much more than quantity.",
    "highlightWords": []
  },
  {
    "id": "sub-10",
    "startFrame": 1841,
    "endFrame": 1972,
    "text": "Claude Code gives you powerful commands to keep your desk organized.",
    "highlightWords": []
  },
  {
    "id": "sub-11",
    "startFrame": 1972,
    "endFrame": 2169,
    "text": "Use the @ symbol followed by a file path to place only the specific file Claude needs onto the desk.",
    "highlightWords": [
      "@"
    ]
  },
  {
    "id": "sub-12",
    "startFrame": 2169,
    "endFrame": 2392,
    "text": "Run the /context command to inspect your active token usage and see exactly which files are occupying space.",
    "highlightWords": [
      "context",
      "/context"
    ]
  },
  {
    "id": "sub-13",
    "startFrame": 2392,
    "endFrame": 2694,
    "text": "When a session grows large, use /compact to summarize older discussion while preserving vital architectural decisions, significantly reducing context load.",
    "highlightWords": [
      "context",
      "/compact"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 2694,
    "endFrame": 2899,
    "text": "When starting a completely new feature or investigation, run /clear to completely wipe the desk clean.",
    "highlightWords": [
      "/clear"
    ]
  },
  {
    "id": "sub-15",
    "startFrame": 2899,
    "endFrame": 3175,
    "text": "Remember the golden rules: never dump entire codebases at once, share only targeted files, and start fresh for each new task.",
    "highlightWords": []
  },
  {
    "id": "sub-16",
    "startFrame": 3175,
    "endFrame": 3353,
    "text": "Regularly compacting your session keeps token consumption low and ensures sharp responses.",
    "highlightWords": []
  },
  {
    "id": "sub-17",
    "startFrame": 3353,
    "endFrame": 3572,
    "text": "A clean, organized desk guarantees that Claude provides reliable, high-precision results throughout your project.",
    "highlightWords": []
  }
];
