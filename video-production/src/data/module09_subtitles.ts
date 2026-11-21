import { SubtitleItem } from '../components/Subtitle';

export const MODULE_09_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 119,
    "text": "Welcome to Module 9: Memory in Claude Code.",
    "highlightWords": [
      "memory"
    ]
  },
  {
    "id": "sub-2",
    "startFrame": 118,
    "endFrame": 365,
    "text": "By default, every time you open Windows PowerShell and start a new Claude Code session, Claude begins with a completely blank slate.",
    "highlightWords": []
  },
  {
    "id": "sub-3",
    "startFrame": 365,
    "endFrame": 573,
    "text": "It has no memory of past conversations, previous bug fixes, or your team's coding conventions.",
    "highlightWords": [
      "memory"
    ]
  },
  {
    "id": "sub-4",
    "startFrame": 573,
    "endFrame": 819,
    "text": "While this guarantees clean context, constantly repeating your build commands and stylistic rules wastes valuable engineering time.",
    "highlightWords": []
  },
  {
    "id": "sub-5",
    "startFrame": 819,
    "endFrame": 1026,
    "text": "To solve this, Claude Code introduces persistent memory through a markdown file named CLAUDE.md.",
    "highlightWords": [
      "CLAUDE.md",
      "memory"
    ]
  },
  {
    "id": "sub-6",
    "startFrame": 1026,
    "endFrame": 1162,
    "text": "Think of CLAUDE.md as an onboarding handbook for your project.",
    "highlightWords": [
      "CLAUDE.md",
      "Project",
      "handbook"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1162,
    "endFrame": 1365,
    "text": "Whenever Claude Code starts, it automatically reads this file and keeps its instructions active in memory.",
    "highlightWords": [
      "memory"
    ]
  },
  {
    "id": "sub-8",
    "startFrame": 1365,
    "endFrame": 1793,
    "text": "Claude Code supports a three-level memory hierarchy: Global memory in your user profile for machine-wide settings; Project memory in the repository root for team standards; and Directory memory inside subfolders for localized rules.",
    "highlightWords": [
      "Global",
      "Project",
      "Directory",
      "memory"
    ]
  },
  {
    "id": "sub-9",
    "startFrame": 1793,
    "endFrame": 2116,
    "text": "Your project CLAUDE.md should document essential engineering workflows: exact test commands, linting rules, formatting requirements, and architectural boundaries.",
    "highlightWords": [
      "CLAUDE.md",
      "Project"
    ]
  },
  {
    "id": "sub-10",
    "startFrame": 2116,
    "endFrame": 2333,
    "text": "Explicitly state forbidden practices, such as libraries not to install or directories that must never be edited.",
    "highlightWords": []
  },
  {
    "id": "sub-11",
    "startFrame": 2333,
    "endFrame": 2500,
    "text": "Use clear bullet points and code snippets rather than lengthy narrative explanations.",
    "highlightWords": []
  },
  {
    "id": "sub-12",
    "startFrame": 2500,
    "endFrame": 2770,
    "text": "Every line in CLAUDE.md consumes context window space, so focus exclusively on high-value instructions that prevent recurring mistakes.",
    "highlightWords": [
      "CLAUDE.md"
    ]
  },
  {
    "id": "sub-13",
    "startFrame": 2770,
    "endFrame": 2954,
    "text": "Treat CLAUDE.md as living documentation that evolves alongside your software repository.",
    "highlightWords": [
      "CLAUDE.md"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 2954,
    "endFrame": 3173,
    "text": "When you correct Claude during a session, capture that lesson and add it to CLAUDE.md so the mistake is never repeated.",
    "highlightWords": [
      "CLAUDE.md"
    ]
  },
  {
    "id": "sub-15",
    "startFrame": 3173,
    "endFrame": 3374,
    "text": "Share the file with your team through version control so every engineer benefits from consistent AI behavior.",
    "highlightWords": []
  },
  {
    "id": "sub-16",
    "startFrame": 3374,
    "endFrame": 3633,
    "text": "Maintaining a concise, well-structured memory file ensures that Claude delivers production-grade results aligned with your team's standards from day one.",
    "highlightWords": [
      "memory"
    ]
  }
];
