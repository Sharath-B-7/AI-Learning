# Commonly Asked Questions: Part B & Windows CLI
<p class="hero-lead">Practical Answers to Real-World Questions About Claude Code</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Reference & Support</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> Here are direct, verified answers to the 10 most common questions asked by team members transitioning to Claude Code on Windows. For additional technical help, check the [Set up Claude Code on Windows guide](setup-windows.md).

---

### 1. Do I need WSL or Linux installed on my Windows PC to use Claude Code?
**No.** Claude Code runs natively on Windows 10 (version 1809+) and Windows 11 inside standard PowerShell or Command Prompt (CMD). WSL (Windows Subsystem for Linux) is completely optional and only needed if your specific project relies on native Linux build toolchains. See the [Windows Setup Guide](setup-windows.md) .

---

### 2. Do I need Windows Administrator privileges to install Claude Code?
**No.** The standard installation command (`irm https://claude.ai/install.ps1 | iex`) installs Claude Code into your personal user profile directory (`%LOCALAPPDATA%` or `%USERPROFILE%`). It requires no administrative elevation.

---

### 3. Windows displays an error: `'claude' is not recognized as an internal or external command. How do I fix it?
This occurs when your terminal window was opened before the installer finished adding the Claude Code directory to your Windows user `PATH` environment variable.
- **Fix 1:** Close all open PowerShell/CMD windows and open a fresh terminal window.
- **Fix 2:** If it still fails, log out of Windows and log back in, or run `claude doctor` to inspect PATH configuration. See [Set up Claude Code on Windows: Verifying Installation](setup-windows.md#6-verifying-the-installation).

---

### 4. How do I see every available slash command inside a session?
Type **`/`** alone at the prompt and press `Enter`, or run **`/help`**. This opens an interactive, searchable menu of all available built-in commands, tools, and custom project skills. See the full list in the [Command Cheat Sheet](index.md#inside-claude-code-session-commands).

---

### 5. What is the practical difference between `/clear` and `/compact`?
- **`/clear`** completely wipes the current context desk clean. Use it when you are transitioning to an entirely new, unrelated task. (Your previous conversation is still saved and can be reopened with `claude -r`).
- **`/compact [focus]`** summarizes earlier conversation history into a concise briefing, freeing up token capacity on the desk while keeping you in the same ongoing workflow. Read more in [Module 7: Context](module-07-context.md#try-it-in-claude-code) and the [Glossary: Compact](glossary.md#compact-compact).

---

### 6. Does Claude Code automatically remember my past session from last week?
**Not automatically.** Each new session starts with a fresh desk. Persistent memory across sessions is handled by **`CLAUDE.md`**, which loads every time ([Module 9: Memory](module-09-memory.md#persistent-memory-in-claude-code-claudemd)). If you specifically want to resume a previous conversation, launch Claude using **`claude -c`** (continue last) or **`claude -r`** (pick from history) as explained in [Set up Claude Code on Windows: Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions).

---

### 7. Is a skill the same thing as a slash command?
Every skill you create in `.claude\skills\<name>\SKILL.md` automatically registers as a custom slash command (`/<name>`). However, skills are more powerful: Claude Code can also autonomously discover and invoke the skill when you ask for something in plain English that matches the skill's description. Read [Module 10: Skills](module-10-skills.md#what-is-a-skill-in-claude-code).

---

### 8. How do I stop Claude immediately if it starts making unexpected changes?
Press **`Esc`** once to immediately pause execution. The work completed so far is preserved, and you can redirect Claude. If you want to undo file modifications made during that turn, press **`Esc` twice** or run **`/rewind`** to revert to an earlier checkpoint. Documented in [Module 12: Agents](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards).

---

### 9. Can I prevent Claude from reading my private `.env` or passwords file?
**Yes.** Add a deny rule to `.claude\settings.json`:
```json
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./secrets/**)"]
  }
}
```
You can also set this interactively by typing `/permissions` or asking `> /update-config deny reading the .env file`. Review [Module 13: Permissions & Safety](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files-settingsjson).

---

### 10. Who is legally and professionally responsible if Claude makes a mistake?
**You are.** AI tools like Claude Code are assistants that execute instructions under your supervision. Always use **Plan mode** for complex work, read confirmation prompts before approving actions, and inspect modifications with **`/diff`** before sharing or deploying deliverables. Review [Part A, Module 4: The Trust Rule](../part-a/module-04-strengths-limits-trust.md#the-trust-rule-check-in-proportion-to-the-stakes) and [Module 13: Good Habits](module-13-permissions-and-safety.md#good-habits-for-safe-ai-terminal-work).

---

## Additional Windows CLI Tips

??? question "How do I update Claude Code to the latest version?"
    Run `claude update` from your PowerShell terminal. If you installed via the official installer script, Claude Code also checks for updates automatically in the background. See [Set up Claude Code on Windows: Updating](setup-windows.md#8-starting-resuming-and-leaving-sessions).

??? question "Can I use Claude Code behind a corporate proxy?"
    Yes. Claude Code respects standard Windows environment variables: `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`. Set these in PowerShell or your Windows System Environment settings. Set these in PowerShell or your Windows System Environment settings.

??? question "How do I switch which Anthropic account I am signed into?"
    Run `claude /doctor` or delete the authentication credentials using `claude auth logout`, then run `claude` to trigger a new browser sign-in.

---

<div class="hero-actions">
  <a href="../glossary/" class="md-button">← Previous: Glossary</a>
  <a href="../learning-checklist/" class="md-button md-button--primary">Next: Learning Checklist →</a>
</div>
