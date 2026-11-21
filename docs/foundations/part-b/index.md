# Part B: AI Concepts for Working with AI Systems
<p class="hero-lead">Core Building Blocks Behind Claude Code & Windows CLI Workflows</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Track: Part B (8 Modules)</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> **Who This Is For:** This part is for anyone who has finished Part A and will use Claude Code on a Windows laptop (PowerShell or CMD). Here we explain eight core ideas that sit behind every agentic AI system you will use: which model tier to pick, what sits on Claude's desk (context), how to prompt effectively, how Claude preserves information across sessions (memory), how to save and reuse proven workflows (skills), how Claude takes action on your computer (tools and the harness), how it works autonomously through complex goals (agents), and how to maintain strict control (permissions and safety).
> 
> The first three modules (6–8) focus on getting high-quality responses in conversations. The subsequent modules (9–13) show how Claude operates as an autonomous agent in your local terminal, with strict permission boundaries.

Every concept is explained in plain English with practical everyday examples following **Asha**, an operations team lead learning to use [Set up Claude Code on Windows](setup-windows.md) to automate reporting, data analysis, and team workflows. Each module includes exact, verified Windows CLI commands, cross-references to official documentation, and practical exercises.

---

## What Is in This Part

| Topic / Module | Focus Area | The Big Idea | Key Commands |
| :--- | :--- | :--- | :--- |
| **[Set up Claude Code on Windows](setup-windows.md)** | Setup & Installation | Install, verify, and launch Claude Code natively on Windows 10/11 | `irm ...`, `claude doctor`, `claude` |
| **[Module 6](module-06-types-of-models.md)** | Types of Models | Pick the right model tier for the task (speed vs. capability) | `/model`, `/effort`, `claude --model` |
| **[Module 7](module-07-context.md)** | Context | Claude only knows what is on its desk; manage active attention | `@file`, `/context`, `/compact`, `/clear` |
| **[Module 8](module-08-prompting.md)** | Prompting & Instructions | A clear 4-part request gets a reliable, high-quality answer | `Shift+Enter`, `/plan`, `Esc`, `@file` |
| **[Module 9](module-09-memory.md)** | Memory | Persistent background in `CLAUDE.md` across daily sessions | `/init`, `/memory`, `claude -c`, `claude -r` |
| **[Module 10](module-10-skills.md)** | Skills | Package reusable multi-step workflows into slash commands | `.claude\skills\`, `/skills`, `/<skill>` |
| **[Module 11](module-11-tools-and-harness.md)** | Tools and the Harness | How Claude interacts with your local system and external services | `!command`, `/mcp`, `/status`, `/doctor` |
| **[Module 12](module-12-agents.md)** | Agents | The autonomous loop: Plan → Act → Check → Repeat | `/plan`, `Shift+Tab`, `Esc`, `/rewind`, `/diff` |
| **[Module 13](module-13-permissions-and-safety.md)** | Permissions and Safety | Enforce least-privilege access: Allow, Ask, and Deny rules | `/permissions`, `.claude\settings.json` |

---

## How to Read the Command Boxes

Throughout this part, you will see commands styled for the Windows command-line environment:

- **`PS C:\Users\Asha> ...`**: Commands typed in Windows PowerShell **before** starting Claude Code.
- **`> ...`**: Commands typed inside an active Claude Code interactive session at its prompt.
- **`/command`**: Slash commands inside Claude Code. Type `/` alone or run [`/help`](faq.md#4-how-do-i-see-every-available-slash-command-inside-a-session) to see the full list of available commands.
- **`# Comment`**: Explanations for your reference. Do not type the `#` or the comment text.

---

## Windows Command Cheat Sheet

### Terminal Commands (PowerShell / CMD)

| Command | What It Does | Documentation Reference |
| :--- | :--- | :--- |
| `irm https://claude.ai/install.ps1 \| iex` | Installs or updates Claude Code via PowerShell | [Set up Claude Code on Windows](setup-windows.md#3-installing-claude-code) |
| `claude --version` | Displays the installed Claude Code version | [Setup Guide: Verification](setup-windows.md#6-verifying-the-installation) |
| `claude doctor` | Runs self-diagnostics on dependencies, permissions, and network | [Setup Guide: Diagnostics](setup-windows.md#6-verifying-the-installation) |
| `claude` | Launches an interactive session in the current folder | [Setup Guide: First Session](setup-windows.md#7-starting-your-first-session) |
| `claude -c` | Resumes the most recent session in the current workspace | [Setup Guide: Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions) |
| `claude -r` | Interactively browse and resume past sessions | [Setup Guide: Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions) |
| `claude -p "..."` | Executes a single prompt in headless/batch mode without entering interactive chat | [Setup Guide: Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions) |
| `claude --model sonnet` | Starts a session using a specific model tier (`haiku`, `sonnet`, `opus`) | [Module 6: Types of Models](module-06-types-of-models.md#try-it-in-claude-code) |
| `claude --permission-mode plan` | Starts directly in Plan mode (prevents unintended file modifications) | [Module 13: Permissions](module-13-permissions-and-safety.md#permission-modes-cycle-with-shift-tab) |
| `claude mcp add / list / remove` | Manages external Model Context Protocol (MCP) tool connectors | [Module 11: Connectors (MCP)](module-11-tools-and-harness.md#connectors-model-context-protocol-mcp-servers) |
| `claude update` | Updates Claude Code to the latest release | [Setup Guide: Updating](setup-windows.md#8-starting-resuming-and-leaving-sessions) |

### Inside Claude Code Session Commands

| Module Area | Key Commands & Shortcuts | Documentation Link |
| :--- | :--- | :--- |
| **Models (Mod 6)** | `/model` (model picker), `/effort <level>` (thinking budget), `/usage` (tokens), `Alt+V` (paste image) | [Module 6: Types of Models](module-06-types-of-models.md#try-it-in-claude-code) |
| **Context (Mod 7)** | `@filename` (add file to desk), `/context` (visual grid), `/compact` (summarize), `/clear` (reset desk) | [Module 7: Context](module-07-context.md#try-it-in-claude-code) |
| **Prompting (Mod 8)** | `Shift+Enter` (new line), `Ctrl+G` (editor), `Up`/`Down` (history), `/plan <task>`, `Esc` (pause) | [Module 8: Prompting](module-08-prompting.md#try-it-in-claude-code-input-shortcuts-workflow-keys) |
| **Memory (Mod 9)** | `/init` (starter `CLAUDE.md`), `/memory` (manage memory), `/resume` (switch sessions) | [Module 9: Memory](module-09-memory.md#try-it-in-claude-code) |
| **Skills (Mod 10)** | `/skills` (list skills), `/reload-skills` (refresh), `/<skill-name>` (execute custom workflow) | [Module 10: Skills](module-10-skills.md#step-by-step-building-ashas-weekly-report-skill) |
| **Tools (Mod 11)** | `!<cmd>` (run shell command), `/status` (diagnostics), `/doctor` (health), `/mcp` (connectors) | [Module 11: Tools & Harness](module-11-tools-and-harness.md#try-it-in-claude-code) |
| **Agents (Mod 12)** | `/plan` (plan mode), `Shift+Tab` (cycle modes), `Esc Esc` / `/rewind` (rollback), `/diff` (review edits) | [Module 12: Agents](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards) |
| **Permissions (Mod 13)** | `/permissions` (allow/ask/deny rules), `Shift+Tab` (mode switch), `.claude\settings.json` | [Module 13: Permissions](module-13-permissions-and-safety.md#try-it-in-claude-code) |
| **General** | `/help` (list slash commands), `/exit` (leave session), `Ctrl+C` (cancel active turn) | [Setup Guide: Verification](setup-windows.md#6-verifying-the-installation) |

---

## Capstone & Reference Materials

- **[Putting It All Together (Worked Example)](worked-example.md):** Follow Asha's Friday weekly status report from setup to execution, using all eight concepts in harmony.
- **[Glossary: Part B Terms in Plain English](glossary.md):** Clear definitions of CLI, `@ mentions`, `CLAUDE.md`, `SKILL.md`, MCP, permission modes, and agent loops.
- **[Commonly Asked Questions (FAQ)](faq.md):** 10 critical questions answered on Windows compatibility, permissions, skills, memory, and safety.
- **[What You Should Be Able to Do (Learning Checklist)](learning-checklist.md):** Practical competency checklist covering installation, model selection, prompt design, skills, and permission enforcement.

---

<div class="hero-actions">
  <a href="setup-windows/" class="md-button md-button--primary">Start: Set up Claude Code on Windows →</a>
  <a href="../part-a/" class="md-button">← Review Part A: Fundamentals</a>
</div>
