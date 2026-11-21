# What You Should Be Able to Do After Part B
<p class="hero-lead">Practical Competency Checklist for Claude Code on Windows</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Self-Assessment</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> Use this checklist to verify your understanding of the eight core concepts and Windows CLI workflows introduced in Modules 6 through 13. Every item represents an essential skill for real-world workplace AI tasks. Each competency includes direct links to the relevant masterclass lessons.

---

## Core Competencies Checklist

### 1. Installation & Session Setup
- [ ] Install Claude Code natively on Windows using PowerShell (`irm https://claude.ai/install.ps1 | iex`) — see [Windows Setup Guide](setup-windows.md) .
- [ ] Verify installation and environment health using `claude --version` and `claude doctor` — see [Setup Guide: Verifying Installation](setup-windows.md#6-verifying-the-installation).
- [ ] Navigate to a project directory (`cd`) and start an interactive session using `claude` — see [Setup Guide: Starting First Session](setup-windows.md#7-starting-your-first-session).
- [ ] Reopen previous sessions using `claude -c` (continue) or `claude -r` (resume menu) — see [Setup Guide: Starting and Leaving Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions).

### 2. Model Selection & Reasoning (Module 6)
- [ ] Open the interactive model picker using `/model` and switch between `haiku`, `sonnet`, and `opus` — see [Module 6: Types of Models](module-06-types-of-models.md#the-idea-in-brief).
- [ ] Adjust extended thinking levels using `/effort low` and `/effort high` based on problem complexity — see [Module 6: Thinking Models](module-06-types-of-models.md#the-idea-in-brief).
- [ ] Monitor token allowance and consumption using `/usage`.
- [ ] Paste screenshots and clipboard images into prompts on Windows using `Alt + V` — see [Module 6: Multimodal Inputs](module-06-types-of-models.md#multimodal-models-models-that-can-see).

### 3. Context Management (Module 7)
- [ ] Place specific files and folders onto the active desk using `@filename` with `Tab` autocomplete — see [Module 7: The Desk in Claude Code](module-07-context.md#the-desk-in-claude-code).
- [ ] Inspect active context fullness and token breakdown using `/context` — see [Module 7: Context](module-07-context.md#try-it-in-claude-code).
- [ ] Compress long sessions while continuing the same task using `/compact [focus]`.
- [ ] Reset the desk cleanly for a new task using `/clear`.
- [ ] Ask quick, non-polluting side questions using `/btw`.

### 4. Prompting & Instructions (Module 8)
- [ ] Construct requests using the 4-part framework: Situation, Goal, Background, and Format — see [Module 8: 4-Part Request Framework](module-08-prompting.md#the-four-parts-of-a-good-request).
- [ ] Insert line breaks without accidentally submitting using `Shift + Enter` (or `\` then Enter).
- [ ] Open long requests in an external editor using `Ctrl + G`.
- [ ] Instruct Claude to plan first using `/plan <task>` — see [Module 8: Input Shortcuts](module-08-prompting.md#try-it-in-claude-code-input-shortcuts-workflow-keys) and [Module 12](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards).
- [ ] Halt runaway generation immediately using `Esc`.

### 5. Persistent Memory (Module 9)
- [ ] Initialize a project memory file using `/init` and inspect the generated `CLAUDE.md` — see [Module 9: Memory](module-09-memory.md#persistent-memory-in-claude-code-claudemd).
- [ ] View and edit memory files interactively using `/memory` — see [Module 9: Try it in Claude Code](module-09-memory.md#try-it-in-claude-code).
- [ ] Distinguish between project memory (`CLAUDE.md`), personal memory (`CLAUDE.local.md`), and global memory.
- [ ] Understand what information belongs in memory (formatting, conventions) vs. what must never be stored (passwords, secrets).

### 6. Custom Skills (Module 10)
- [ ] Understand how a skill folder and `SKILL.md` are structured — see [Module 10: What Is a Skill](module-10-skills.md#what-is-a-skill-in-claude-code).
- [ ] Create a project skill in `.claude\skills\<name>\SKILL.md` with YAML frontmatter.
- [ ] Refresh skills after making edits using `/reload-skills`.
- [ ] Invoke skills explicitly using slash commands (`/<skill-name>`) or naturally via plain English.

### 7. Tools & The Harness (Module 11)
- [ ] Explain the role of the harness in providing tools and enforcing safety rules — see [Module 11: The Harness](module-11-tools-and-harness.md#the-harness-giving-tools-to-the-brain).
- [ ] Identify tool calls on screen: `Read`, `Edit`, `Write`, `Bash`, `PowerShell`, and `Grep` — see [Module 11: Tools on Screen](module-11-tools-and-harness.md#tools-the-models-hands).
- [ ] Run direct shell commands whose output lands on the desk using `!<command>`.
- [ ] Inspect and connect external services using `claude mcp add` and `/mcp` — see [Module 11: Connectors (MCP)](module-11-tools-and-harness.md#connectors-model-context-protocol-mcp-servers).

### 8. Autonomous Agents (Module 12)
- [ ] Explain the agent loop: Think → Act → Check → Repeat.
- [ ] Provide clear agent goals containing: Goal, Location, Limits, and Check-ins — see [Module 12: 4 Elements of an Agent Goal](module-12-agents.md#the-4-elements-of-a-reliable-agent-goal).
- [ ] Cycle permission modes using `Shift + Tab` (Normal, Accept Edits, Plan) — see [Module 12: Controls](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards) and [Module 13](module-13-permissions-and-safety.md#permission-modes-cycle-with-shift-tab).
- [ ] Roll back unintended file changes using `/rewind` or pressing `Esc` twice.
- [ ] Inspect line-by-line file modifications before approving using `/diff` — see [Worked Example: Step 8](worked-example.md#step-8-review-edits-with-diff).

### 9. Permissions & Safety (Module 13)
- [ ] Explain the three permission levels: Allow, Ask, and Deny, and rule precedence (Deny > Ask > Allow) — see [Module 13: Three Settings](module-13-permissions-and-safety.md#the-three-permission-settings-allow-ask-deny).
- [ ] View and configure permissions interactively using `/permissions`.
- [ ] Protect sensitive files (`.env`, `Payroll\`) in `.claude\settings.json`.
- [ ] Apply the principle of least access to workplace workflows — see [Glossary: Least Access](glossary.md#least-access).

### 10. End-to-End Workflow Capstone
- [ ] Walk through the complete weekly reporting scenario from setup to execution, using memory, skills, tools, and diff reviews in harmony — see [Worked Example](worked-example.md).

---

## Self-Assessment Scoring

| Items Checked | Proficiency Level | Recommended Next Step |
| :--- | :--- | :--- |
| **0 – 4** | **Foundational** | Review the "Try It in Claude Code" sections in Modules 6 through 9. |
| **5 – 7** | **Intermediate** | Practice building custom skills ([Module 10](module-10-skills.md)) and managing agent loops ([Module 12](module-12-agents.md)). |
| **8 – 10** | **Ready for Advanced Workflows** | You have mastered the core concepts behind Claude Code and are ready to deploy autonomous agents in daily operations. |

---

<div class="hero-actions">
  <a href="../faq/" class="md-button">← Previous: FAQ</a>
  <a href="../" class="md-button md-button--primary">Back to Part B Overview →</a>
</div>
