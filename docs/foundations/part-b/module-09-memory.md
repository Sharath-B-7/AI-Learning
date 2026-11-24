# Module 9: Memory

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: Claude Code & Agentic Systems</span>
  <span class="badge badge-level">Module 9 of 8</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

<div class="module-video-wrapper" data-module="module-09" data-video-title="Module 9: Memory">
  <div class="video-container">
    <div class="video-placeholder">
      <div class="video-placeholder-frame">
        <div class="video-placeholder-icon">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <div class="video-placeholder-meta">
          <span class="video-tag">Module Video</span>
          <h3 class="video-title">Module 9: Memory</h3>
          <p class="video-status">Video will be available soon</p>
          <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/module-09.mp4</code></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Persistent Memory in Claude Code: CLAUDE.md

Every new Claude Code session starts with an empty conversation desk. By default, Claude does not remember what you discussed yesterday or last week.

To give Claude lasting memory, Claude Code reads a plain-text markdown file called **`CLAUDE.md`** at the start of every single session. Think of `CLAUDE.md` as the onboarding notebook you hand a new colleague on their first morning: it contains project background, preferred writing style, standard commands, and team rules. For the complete specification, visit the [Glossary: CLAUDE.md](glossary.md#claudemd).

---

## Where Memory Lives on Windows

Claude Code supports different levels of memory depending on who needs the information:

| Memory Scope | File & Location | Who It Is For | Documentation |
| :--- | :--- | :--- | :--- |
| **Project Memory** | `CLAUDE.md` (in project root) | Everyone working in this project. Tracked in Git and shared across the team. | [Glossary: CLAUDE.md](glossary.md#claudemd) |
| **Personal (Project)** | `CLAUDE.local.md` (in project root) | Only you, only for this specific project. Ignored by Git. | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |
| **Personal (Global)** | `C:\Users\<you>\.claude\CLAUDE.md` | Only you, applied across every project on your Windows machine. | [Windows Setup Guide](setup-windows.md) |
| **Auto Memory** | Managed automatically; view with `/memory` | Dynamic notes Claude records for itself as it works. You can view, edit, or toggle this. | [FAQ Question 6](faq.md#6-does-claude-code-automatically-remember-my-past-session-from-last-week) |

---

## Everyday Scenario: Asha's Operations Notebook

> [!NOTE]
> **Asha's `CLAUDE.md` File:**
> Instead of reminding Claude in every prompt that she is an operations lead and prefers short bullet points, Asha creates a clean `CLAUDE.md` file in her project folder:
>
> ```markdown
> # About Me
> - Role: Operations Team Lead
>
> # Output Preferences
> - Format: Short, executive bullet points
> - Tone: Direct and professional; no filler or corporate buzzwords
> - Date format: Day Month Year (e.g., 20 November 2026)
>
> # Team Conventions
> - The weekly status report is due every Friday at 3:00 PM
> - Document templates live in .\templates\
> - Completed reports are saved in .\reports\
> ```
> Now, whenever Asha or any team member opens Claude Code in that folder, Claude automatically adheres to these standards without being reminded.

---

## Try It in Claude Code

Manage memory files and session continuity directly from the terminal as shown in the [Command Cheat Sheet](index.md#inside-claude-code-session-commands):

```text
> /init        # Claude scans your project folder and creates a starter CLAUDE.md
> /memory      # open and edit memory files in your editor; toggle auto memory
> add to CLAUDE.md: weekly reports go to senior management on Fridays
```

### Continuing Past Conversations vs. Memory

It is important to understand the difference between **persistent memory** (`CLAUDE.md`) and **reopening an old session**:

- **`CLAUDE.md`** applies to *every* session in the folder permanently.
- **Session resumption** reopens an exact past conversation with its full history:

```powershell
# In PowerShell: Resume work
claude -c          # continue the most recent session in this folder
claude -r          # choose from a list of past sessions to resume
```

Inside an active session, use `/resume` to switch to an earlier session, or `/rename weekly-report-draft` to give the current session an identifiable name for later. See [FAQ Question 6](faq.md#6-does-claude-code-automatically-remember-my-past-session-from-last-week) for session details.

---

<a id="what-to-store-vs-what-never-to-store"></a>
## What to Store and What NOT to Store

`CLAUDE.md` is loaded into active context at the start of every session, so keeping it concise and secure is critical. Learn how this pairs with security rules in [Module 13: Permissions & Safety](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files-settingsjson).

#### ✅ What to Store
- Your role, team function, and audience expectations.
- Formatting rules (bullet styles, date formats, tone guidelines).
- Project layout (where templates, reports, and data files live).
- Frequently used commands and test scripts.

#### ❌ What NEVER to Store
- **Passwords, API tokens, and access keys.**
- Customer personal identifiable information (PII) or confidential financial data.
- Temporary or one-off instructions that will not apply next week.

> [!CAUTION]
> **Security Notice:** `CLAUDE.md` is stored as plain text and is typically committed to version control (Git). Never put secrets, private keys, or credentials into any memory file. See [Module 13](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files-settingsjson) for blocking `.env` and secrets.

---

> [!TIP]
> **Maintenance Tip:** Run `/memory` once a month to review and prune your memory files. Deleting outdated instructions speeds up session startup and prevents conflicting guidance.

---

## Practical Exercises

1. **Generate Starter Memory:** In an empty project folder, run `/init`. Inspect the generated `CLAUDE.md` file and observe how Claude identified project structure.
2. **Customize Output Rules:** Add a rule to `CLAUDE.md`: `Always include a "Next Steps" section at the end of summaries.` Test it with a prompt to confirm Claude follows the rule automatically.
3. **Session Resumption:** Exit your session with `/exit`. Re-launch with `claude -c` and verify that your prior conversation context is restored.

---

## Knowledge Check

??? question "Where should you save instructions that should apply to every team member working in a shared Git repository?"
    **Answer:** In `CLAUDE.md` in the root of the project directory.

??? question "If you have personal formatting preferences that you don't want committed to the team Git repo, where should you store them?"
    **Answer:** In `CLAUDE.local.md` in the project root, or in `C:\Users\<you>\.claude\CLAUDE.md` for global personal preferences.

??? question "What is the difference between `CLAUDE.md` and `claude -c`?"
    **Answer:** `CLAUDE.md` provides lasting background and rules for all sessions. `claude -c` reopens the specific conversation history and desk state from your last session.

---

## Related Concepts & Cross-References

- **[Part B, Module 7: Context](module-07-context.md)** — How `CLAUDE.md` is loaded onto the desk.
- **[Part B, Module 8: Prompting & Instructions](module-08-prompting.md)** — Reducing repetitive prompt instructions with memory.
- **[Part B, Module 10: Skills](module-10-skills.md)** — Moving from memory guidelines to actionable workflows.
- **[Part B Glossary: CLAUDE.md](glossary.md#claudemd)** — Plain-English reference.

---

<div class="hero-actions">
  <a href="../module-08-prompting/" class="md-button">← Previous: Module 8 — Prompting & Instructions</a>
  <a href="../module-10-skills/" class="md-button md-button--primary">Next: Module 10 — Skills →</a>
</div>
