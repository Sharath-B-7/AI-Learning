import { SubtitleItem } from '../components/Subtitle';

export const MODULE_10_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 119,
    "text": "Welcome to Module 10: Skills in Claude Code.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-2",
    "startFrame": 117,
    "endFrame": 436,
    "text": "Skills are modular packages of domain knowledge, specialized instructions, and reusable workflows that teach Claude Code how to perform specialized engineering tasks.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-3",
    "startFrame": 436,
    "endFrame": 661,
    "text": "While standard prompts provide broad guidance, skills act like dedicated playbooks for specific technical challenges.",
    "highlightWords": [
      "Skills",
      "playbooks"
    ]
  },
  {
    "id": "sub-4",
    "startFrame": 661,
    "endFrame": 941,
    "text": "When a skill is enabled, Claude Code activates relevant instructions only when needed, preserving context window space while delivering expert results.",
    "highlightWords": []
  },
  {
    "id": "sub-5",
    "startFrame": 941,
    "endFrame": 1108,
    "text": "Every skill lives inside a dedicated directory containing a SKILL.md file.",
    "highlightWords": [
      "SKILL.md"
    ]
  },
  {
    "id": "sub-6",
    "startFrame": 1108,
    "endFrame": 1345,
    "text": "The YAML frontmatter at the top defines the skill name, description, and exact trigger conditions that tell Claude when to activate it.",
    "highlightWords": [
      "YAML",
      "frontmatter"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1345,
    "endFrame": 1562,
    "text": "The markdown body provides step-by-step procedures, validation rules, and error recovery strategies.",
    "highlightWords": []
  },
  {
    "id": "sub-8",
    "startFrame": 1562,
    "endFrame": 1858,
    "text": "Skills can also include executable helper scripts, example templates, and reference documentation that Claude can consult and run dynamically during execution.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-9",
    "startFrame": 1858,
    "endFrame": 2109,
    "text": "You can create custom skills for your team's proprietary frameworks, code review checklists, or automated database migrations.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-10",
    "startFrame": 2109,
    "endFrame": 2289,
    "text": "Place custom skills in the .claude/skills folder within your project or your user home directory.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-11",
    "startFrame": 2289,
    "endFrame": 2608,
    "text": "In addition, you can discover and install community skills from the marketplace to quickly add support for popular cloud providers, testing frameworks, and API integrations.",
    "highlightWords": [
      "Skills",
      "marketplace"
    ]
  },
  {
    "id": "sub-12",
    "startFrame": 2608,
    "endFrame": 2739,
    "text": "Claude Code automatically scans these directories upon startup.",
    "highlightWords": []
  },
  {
    "id": "sub-13",
    "startFrame": 2739,
    "endFrame": 2937,
    "text": "Claude Code automatically discovers installed skills and activates them when your request matches their description.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 2937,
    "endFrame": 3125,
    "text": "You can also invoke skills directly using slash commands to enforce standard operating procedures.",
    "highlightWords": [
      "Skills"
    ]
  },
  {
    "id": "sub-15",
    "startFrame": 3125,
    "endFrame": 3375,
    "text": "Before deploying a skill team-wide, test it thoroughly across different edge cases and refine the instructions based on actual usage.",
    "highlightWords": []
  },
  {
    "id": "sub-16",
    "startFrame": 3375,
    "endFrame": 3605,
    "text": "Packaging repeatable workflows into reusable skills standardizes best practices and empowers your entire development team.",
    "highlightWords": [
      "Skills"
    ]
  }
];
