# Video Production Script: Module 13 – Permissions and Safety

**Module Number:** Module 13
**Module Title:** Permissions and Safety
**Top-Left Label:** `Part B • Module 13`
**Course Section:** Part B: Claude Code & Agentic Systems
**Audio Duration:** 1m 57.6s (117.62s)
**Total Frames (30fps):** 3529
**Word Count:** 257 words
**Narration Voice:** `en-US-ChristopherNeural` (Rate: `+0%` - Natural Part A Pace)
**Speaking Pace:** 131.1 WPM (Normalized to match Part A)

---

## Production Blueprint & Scene Breakdown

### Scene 1: Why Terminal Security Matters
- **Duration:** 948 frames (31.60s)

### Scene 2: The Three Permission Tiers (Allow, Ask, Deny)
- **Duration:** 907 frames (30.23s)

### Scene 3: settings.json & Shift+Tab Modes
- **Duration:** 829 frames (27.63s)

### Scene 4: Approval Vigilance & Masterclass Conclusion
- **Duration:** 845 frames (28.17s)

## Full Narration Script
[
  {
    "text": "Welcome to Module 13: Permissions and Security in Claude Code.",
    "startMs": 100,
    "endMs": 5075,
    "durationMs": 4975
  },
  {
    "text": "Because Claude Code has direct access to your local filesystem, Windows terminal, and development toolchain, understanding permissions and security is essential for safe operation.",
    "startMs": 5025,
    "endMs": 15788,
    "durationMs": 10762
  },
  {
    "text": "Without proper safeguards, an autonomous agent could accidentally overwrite critical files, execute dangerous shell commands, or expose sensitive secrets.",
    "startMs": 15788,
    "endMs": 25775,
    "durationMs": 9988
  },
  {
    "text": "Security is not an afterthought; it is the foundation of dependable AI collaboration.",
    "startMs": 25775,
    "endMs": 31588,
    "durationMs": 5812
  },
  {
    "text": "Every action in Claude Code falls under one of three permission tiers.",
    "startMs": 31588,
    "endMs": 36300,
    "durationMs": 4712
  },
  {
    "text": "Allow permits safe actions, such as reading public files or inspecting directory trees without asking.",
    "startMs": 36300,
    "endMs": 43138,
    "durationMs": 6838
  },
  {
    "text": "Ask requires Claude to pause and request your explicit approval before modifying code or executing commands.",
    "startMs": 43138,
    "endMs": 50188,
    "durationMs": 7050
  },
  {
    "text": "Deny completely blocks access to forbidden files or destructive operations.",
    "startMs": 50188,
    "endMs": 55638,
    "durationMs": 5450
  },
  {
    "text": "Crucially, stricter rules always win: Deny beats Ask, and Ask beats Allow.",
    "startMs": 55638,
    "endMs": 61838,
    "durationMs": 6200
  },
  {
    "text": "On Windows, project permissions are configured inside dot claude settings dot json.",
    "startMs": 61838,
    "endMs": 67775,
    "durationMs": 5938
  },
  {
    "text": "Use deny rules to lock down sensitive dot env files, API tokens, database credentials, and SSH keys.",
    "startMs": 67775,
    "endMs": 76712,
    "durationMs": 8938
  },
  {
    "text": "During an active terminal session, you can quickly cycle through permission modes by pressing Shift plus Tab, switching seamlessly between Normal mode, Accept Edits mode, and Plan mode where no files can be altered.",
    "startMs": 76712,
    "endMs": 89475,
    "durationMs": 12762
  },
  {
    "text": "Always treat approval prompts with vigilance: inspect the exact shell command, verify the target file path, and read before you approve.",
    "startMs": 89475,
    "endMs": 98488,
    "durationMs": 9012
  },
  {
    "text": "By combining strict settings dot json boundaries with interactive permission modes, you maintain an airtight, safe terminal workspace.",
    "startMs": 98488,
    "endMs": 107212,
    "durationMs": 8725
  },
  {
    "text": "You now have the complete educational foundation to build safely, efficiently, and effectively with Claude Code across all thirteen modules of the AI Masterclass.",
    "startMs": 107212,
    "endMs": 117562,
    "durationMs": 10350
  }
]
