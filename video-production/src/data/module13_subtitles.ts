import { SubtitleItem } from '../components/Subtitle';

export const MODULE_13_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 152,
    "text": "Welcome to Module 13: Permissions and Security in Claude Code.",
    "highlightWords": [
      "Permissions",
      "Security"
    ]
  },
  {
    "id": "sub-2",
    "startFrame": 151,
    "endFrame": 474,
    "text": "Because Claude Code has direct access to your local filesystem, Windows terminal, and development toolchain, understanding permissions and security is essential for safe operation.",
    "highlightWords": [
      "Permissions",
      "Security"
    ]
  },
  {
    "id": "sub-3",
    "startFrame": 474,
    "endFrame": 773,
    "text": "Without proper safeguards, an autonomous agent could accidentally overwrite critical files, execute dangerous shell commands, or expose sensitive secrets.",
    "highlightWords": []
  },
  {
    "id": "sub-4",
    "startFrame": 773,
    "endFrame": 948,
    "text": "Security is not an afterthought; it is the foundation of dependable AI collaboration.",
    "highlightWords": [
      "Security"
    ]
  },
  {
    "id": "sub-5",
    "startFrame": 948,
    "endFrame": 1089,
    "text": "Every action in Claude Code falls under one of three permission tiers.",
    "highlightWords": []
  },
  {
    "id": "sub-6",
    "startFrame": 1089,
    "endFrame": 1294,
    "text": "Allow permits safe actions, such as reading public files or inspecting directory trees without asking.",
    "highlightWords": [
      "Allow",
      "Ask"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1294,
    "endFrame": 1506,
    "text": "Ask requires Claude to pause and request your explicit approval before modifying code or executing commands.",
    "highlightWords": [
      "Ask"
    ]
  },
  {
    "id": "sub-8",
    "startFrame": 1506,
    "endFrame": 1669,
    "text": "Deny completely blocks access to forbidden files or destructive operations.",
    "highlightWords": [
      "Deny"
    ]
  },
  {
    "id": "sub-9",
    "startFrame": 1669,
    "endFrame": 1855,
    "text": "Crucially, stricter rules always win: Deny beats Ask, and Ask beats Allow.",
    "highlightWords": [
      "Allow",
      "Ask",
      "Deny"
    ]
  },
  {
    "id": "sub-10",
    "startFrame": 1855,
    "endFrame": 2033,
    "text": "On Windows, project permissions are configured inside .claude/settings.json.",
    "highlightWords": [
      "Permissions",
      "settings.json",
      ".claude/settings.json"
    ]
  },
  {
    "id": "sub-11",
    "startFrame": 2033,
    "endFrame": 2301,
    "text": "Use deny rules to lock down sensitive .env files, API tokens, database credentials, and SSH keys.",
    "highlightWords": [
      "Deny",
      ".env"
    ]
  },
  {
    "id": "sub-12",
    "startFrame": 2301,
    "endFrame": 2684,
    "text": "During an active terminal session, you can quickly cycle through permission modes by pressing Shift+Tab, switching seamlessly between Normal mode, Accept Edits mode, and Plan mode where no files can be altered.",
    "highlightWords": [
      "Shift+Tab"
    ]
  },
  {
    "id": "sub-13",
    "startFrame": 2684,
    "endFrame": 2955,
    "text": "Always treat approval prompts with vigilance: inspect the exact shell command, verify the target file path, and read before you approve.",
    "highlightWords": []
  },
  {
    "id": "sub-14",
    "startFrame": 2955,
    "endFrame": 3216,
    "text": "By combining strict settings.json boundaries with interactive permission modes, you maintain an airtight, safe terminal workspace.",
    "highlightWords": [
      "settings.json"
    ]
  },
  {
    "id": "sub-15",
    "startFrame": 3216,
    "endFrame": 3527,
    "text": "You now have the complete educational foundation to build safely, efficiently, and effectively with Claude Code across all thirteen modules of the AI Masterclass.",
    "highlightWords": []
  }
];
