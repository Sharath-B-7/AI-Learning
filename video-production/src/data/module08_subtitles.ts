import { SubtitleItem } from '../components/Subtitle';

export const MODULE_08_SUBTITLES: SubtitleItem[] = [
  {
    "id": "sub-1",
    "startFrame": 3,
    "endFrame": 146,
    "text": "Welcome to Module 8: Prompting and Instructions in Claude Code.",
    "highlightWords": []
  },
  {
    "id": "sub-2",
    "startFrame": 144,
    "endFrame": 294,
    "text": "In conversational AI, prompting often feels like casual chat.",
    "highlightWords": []
  },
  {
    "id": "sub-3",
    "startFrame": 294,
    "endFrame": 515,
    "text": "But in Claude Code, you are directing an autonomous assistant with direct access to your local files and terminal tools.",
    "highlightWords": []
  },
  {
    "id": "sub-4",
    "startFrame": 515,
    "endFrame": 789,
    "text": "A vague command leads to wasted time and mistaken edits, while a structured instruction delivers precise code and automated solutions on the first attempt.",
    "highlightWords": []
  },
  {
    "id": "sub-5",
    "startFrame": 789,
    "endFrame": 946,
    "text": "Every effective request in Claude Code should incorporate four core elements:",
    "highlightWords": [
      "Situation",
      "Goal",
      "Background",
      "Format"
    ]
  },
  {
    "id": "sub-6",
    "startFrame": 946,
    "endFrame": 1140,
    "text": "Situation, explaining your project role and context; Goal, stating the exact deliverable and what finished looks like;",
    "highlightWords": [
      "Situation",
      "Goal"
    ]
  },
  {
    "id": "sub-7",
    "startFrame": 1140,
    "endFrame": 1449,
    "text": "Background, pointing Claude to relevant files using the @ symbol; and Format, specifying constraints such as file formats, bullet limits, or coding standards.",
    "highlightWords": [
      "Background",
      "Format"
    ]
  },
  {
    "id": "sub-8",
    "startFrame": 1449,
    "endFrame": 1649,
    "text": "Providing these four elements gives Claude the full picture needed to act accurately without making flawed assumptions.",
    "highlightWords": []
  },
  {
    "id": "sub-9",
    "startFrame": 1649,
    "endFrame": 1720,
    "text": "Consider this comparison.",
    "highlightWords": []
  },
  {
    "id": "sub-10",
    "startFrame": 1720,
    "endFrame": 1824,
    "text": "A weak request says: summarize this.",
    "highlightWords": []
  },
  {
    "id": "sub-11",
    "startFrame": 1824,
    "endFrame": 1989,
    "text": "Claude does not know which file you mean, who the audience is, or where to save it.",
    "highlightWords": []
  },
  {
    "id": "sub-12",
    "startFrame": 1989,
    "endFrame": 2153,
    "text": "In contrast, a strong request states: I am preparing for a client meeting.",
    "highlightWords": []
  },
  {
    "id": "sub-13",
    "startFrame": 2153,
    "endFrame": 2359,
    "text": "Summarize @Q3-report.pdf in five bullet points focusing on risks and costs.",
    "highlightWords": [
      "@Q3-report.pdf"
    ]
  },
  {
    "id": "sub-14",
    "startFrame": 2359,
    "endFrame": 2533,
    "text": "Keep each point under twenty words, and save the result as meeting-prep.md.",
    "highlightWords": []
  },
  {
    "id": "sub-15",
    "startFrame": 2533,
    "endFrame": 2674,
    "text": "The strong prompt is clear, bounded, and immediately actionable.",
    "highlightWords": []
  },
  {
    "id": "sub-16",
    "startFrame": 2674,
    "endFrame": 2916,
    "text": "Inside Claude Code, use Shift+Enter or Ctrl+J to write formatted multiline requests with clear structure.",
    "highlightWords": [
      "Format",
      "Shift+Enter",
      "Ctrl+J"
    ]
  },
  {
    "id": "sub-17",
    "startFrame": 2916,
    "endFrame": 3255,
    "text": "For complex multi-file tasks, always prefix your request with /plan, telling Claude to research the problem and propose a detailed implementation plan before touching a single file.",
    "highlightWords": [
      "/plan"
    ]
  },
  {
    "id": "sub-18",
    "startFrame": 3255,
    "endFrame": 3359,
    "text": "Review the plan carefully before execution.",
    "highlightWords": []
  },
  {
    "id": "sub-19",
    "startFrame": 3359,
    "endFrame": 3567,
    "text": "Clear instructions combined with thoughtful planning ensure total control and dependable results across your codebase.",
    "highlightWords": []
  }
];
