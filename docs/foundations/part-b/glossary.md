# Glossary: Part B AI & CLI Terms in Plain English
<p class="hero-lead">Everyday Meanings for Technical Concepts in Claude Code</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Reference Guide</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> This glossary provides clear, jargon-free definitions for the key technical terms used across Modules 6 through 13. Bookmark this page for quick reference during your day-to-day work with Claude Code on Windows.

---

## Quick Reference Index

| Category | Terms Included | Official Documentation |
| :--- | :--- | :--- |
| **Command-Line & Windows** | CLI, Terminal / PowerShell / CMD, Slash Command, `@ Mention` | [Set up Claude Code on Windows](setup-windows.md) |
| **Context & Memory** | Desk (Context), Context Window, Compact, `CLAUDE.md`, Progressive Disclosure | [Module 7: Context](module-07-context.md) & [Module 9: Memory](module-09-memory.md) |
| **Architecture & Tools** | Model Tier, Thinking Model (Extended Thinking), Harness, MCP Server | [Module 11: Tools & The Harness](module-11-tools-and-harness.md) |
| **Autonomous Systems** | Agent, Agent Loop, Subagent, Plan Mode, Checkpoint / Rewind | [Module 12: Agents](module-12-agents.md) |
| **Security & Control** | Least Access, Permission Mode, `settings.json`, `.env` | [Module 13: Permissions & Safety](module-13-permissions-and-safety.md) |

---

## Detailed Definitions

### CLI (Command-Line Interface)
A computer program that you operate by typing text commands into a terminal window, rather than clicking graphical buttons and menus. Claude Code is a CLI application that runs inside Windows PowerShell or CMD.

### Terminal / PowerShell / CMD
The text window on Windows where you type commands to interact directly with your operating system. PowerShell is modern and powerful; Command Prompt (CMD) is the traditional Windows command interpreter. See the [Windows Setup Guide](setup-windows.md) and [Set up Claude Code on Windows](setup-windows.md).

### Slash Command
A command typed inside an active Claude Code session that begins with a forward slash (`/`), such as `/model`, `/context`, `/plan`, or `/help`. Slash commands control Claude Code's settings and tools. View the full list in the [Command Cheat Sheet](index.md#inside-claude-code-session-commands).

### `@ Mention`
Typing the `@` symbol followed by a file or directory name (for example, `@report.docx` or `@tasks\`) inside a Claude Code prompt. This places that specific file directly onto Claude's active context desk. Documented in [Module 7: Context](module-07-context.md#the-desk-in-claude-code).

<a id="the-desk-analogy"></a>
### Desk (Context)
The mental workspace of everything Claude can see and remember in the active turn: your prompt, files added via `@`, outputs from executed tools, conversation history, and `CLAUDE.md`.

<a id="context-window"></a>
### Context Window
The maximum amount of information (measured in tokens) that an AI model can hold on its desk at one time. When context fills up, earlier details may be pushed out of memory. Read more in [Module 7: The Context Window](module-07-context.md#the-desk-has-a-size-limit-the-context-window).

### Compact (`/compact`)
An operation that summarizes the existing conversation history to free up space on the desk while preserving essential decisions, tasks, and file context. Described in [Module 7: Context Commands](module-07-context.md#try-it-in-claude-code).

<a id="claudemd"></a>
### `CLAUDE.md`
A plain-text Markdown file located in your project root or user home directory that Claude Code automatically reads at the start of every session. It serves as persistent memory for team guidelines, role descriptions, and project conventions. Read [Module 9: Memory](module-09-memory.md#persistent-memory-in-claude-code-claudemd).

<a id="progressive-disclosure"></a>
### Progressive Disclosure
An architectural pattern used by Claude Code skills where only short skill descriptions are loaded into active context at startup. Full instructions and templates are loaded only when the skill is actually triggered, keeping context lean. Detailed in [Module 10: How Skills Stay Efficient](module-10-skills.md#how-skills-stay-efficient-progressive-disclosure).

<a id="model-tier"></a>
### Model Tier
Different versions within an AI model family optimized for different trade-offs (see [Module 6: Types of Models](module-06-types-of-models.md#the-idea-in-brief) and [Part A, Module 5: Meet Claude](../part-a/module-05-meet-claude.md#different-models)):
- **`haiku`:** Smaller, fast, and cost-effective; ideal for simple queries and edits.
- **`sonnet`:** Balanced; the standard choice for daily writing, coding, and analysis.
- **`opus`:** Most capable; designed for complex multi-step reasoning and high-stakes tasks.

### Thinking Model (Extended Thinking)
A model configuration where the AI spends additional internal compute cycles reasoning through steps, exploring alternatives, and verifying logic before printing its answer. Controlled in Claude Code via `/effort`. Learn more in [Module 6: The Idea in Brief](module-06-types-of-models.md#the-idea-in-brief).

<a id="harness"></a>
### Harness
The software environment built around an AI model that equips it with tools (such as reading files, running terminal commands, or searching the web) and enforces security boundaries. Claude Code is the harness for Claude. Read [Module 11: Tools & The Harness](module-11-tools-and-harness.md).

### MCP Server (Model Context Protocol)
An open standard connector that links Claude Code to external tools and data sources, including Jira, Notion, GitHub, SQL databases, or enterprise web services. Explore [Module 11: Connectors (MCP)](module-11-tools-and-harness.md#connectors-model-context-protocol-mcp-servers).

### Agent
An AI system configured to work autonomously toward a specified goal: planning steps, invoking tools, inspecting outputs, correcting errors, and iterating until the objective is complete.

<a id="agent-loop"></a>
### Agent Loop
The cyclical process executed by an agent: **Think** (plan next step) → **Act** (run a tool) → **Check** (evaluate tool output) → **Repeat** (continue until goal is reached).

### Subagent
A temporary, isolated helper agent spawned by the main Claude Code process to execute a focused sub-task with its own independent context desk, reporting results back to the main agent. Consult [Module 12: Subagents](module-12-agents.md#subagents-specialized-helpers-for-big-jobs).

### Plan Mode
A permission state where Claude investigates files and drafts a comprehensive step-by-step plan, but is strictly prohibited from modifying files or running destructive commands until you grant approval. Documented in [Module 12: Agent Controls](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards).

### Checkpoint / Rewind (`/rewind`)
A saved state in Claude Code allowing you to roll back conversation turns and undo file modifications if an agent takes an unintended path.

<a id="least-access"></a>
### Least Access
The fundamental security principle that an AI system should be granted only the minimum permissions required to perform its immediate task, and no more. See [Module 13: Permissions & Safety](module-13-permissions-and-safety.md#permissions-and-safety-least-access).

### Permission Mode
A global setting (cycled via `Shift + Tab`) that controls how much autonomy Claude Code has before requiring human approval: Default (ask before edits), Accept Edits (auto-approve edits), or Plan (read-only).

### `settings.json`
The configuration file located in `.claude\settings.json` where your project's allow, ask, and deny permission rules are stored. Detailed in [Module 13: Keeping Claude Away from Sensitive Files](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files-settingsjson).

### `.env`
A configuration file commonly used in software projects to store private secrets, database passwords, and API keys. `.env` files should always be added to your Claude Code **Deny** list.

---

<div class="hero-actions">
  <a href="../worked-example/" class="md-button">← Previous: Putting It All Together</a>
  <a href="../faq/" class="md-button md-button--primary">Next: Frequently Asked Questions →</a>
</div>
