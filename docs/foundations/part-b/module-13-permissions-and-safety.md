# Module 13: Permissions and Safety

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: AI Concepts</span>
  <span class="badge badge-level">Module 13 of 8</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

<div class="module-video-wrapper" data-module="module-13" data-video-title="Module 13: Permissions and Safety">
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
          <h3 class="video-title">Module 13: Permissions and Safety</h3>
          <p class="video-status">Video will be available soon</p>
          <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/module-13.mp4</code></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Permissions and Safety: Least Access

Claude Code is designed around the principle of **least access**: giving Claude only the exact permissions needed to accomplish the task, and nothing more. For detailed security policies, see [Part A, Module 4: Privacy Basics](../part-a/module-04-strengths-limits-trust.md#privacy-basics) and [Glossary: Least Access](glossary.md#least-access).

Before executing any potentially impactful action (reading a sensitive folder, modifying a file, running a script, or reaching out to the network), Claude Code checks your **allow**, **ask**, and **deny** rules.

---

## The Three Permission Settings: Allow, Ask, Deny

| Setting | What It Means | Everyday Workplace Example | Official Reference |
| :--- | :--- | :--- | :--- |
| **Allow** | Claude may perform this action immediately without asking | Reading documentation files in `.\Reports\` | [The Three Permission Settings](#the-three-permission-settings-allow-ask-deny) |
| **Ask** | Claude pauses and displays an approval prompt before proceeding | Modifying a file, deleting a draft, running a PowerShell script | [Approval Prompts](#approval-prompts-read-before-you-approve) |
| **Deny** | Claude is strictly forbidden from performing this action under any circumstance | Reading `.env`, accessing `.\secrets\`, or opening `.\Payroll\` | [Keeping Claude Away from Sensitive Files](#keeping-claude-away-from-sensitive-files-settingsjson) |

### Rule Precedence
If two rules overlap or disagree, the stricter rule **always wins**:
$$\text{Deny} > \text{Ask} > \text{Allow}$$

By default, Claude Code allows safe read-only operations within the current project folder, but asks for explicit confirmation before editing files or executing terminal commands.

---

## Everyday Scenario: Asha's Safety Boundaries

> [!NOTE]
> **Asha's Security Configuration:**
> Asha's department repository contains operational reports alongside sensitive employee payroll data and database configuration files.
>
> Before running her first Claude Code session, Asha establishes safety boundaries:
> - She sets `Read(./Reports/**)` to **Allow** so Claude can read weekly submissions freely.
> - She sets `Edit(./Reports/**)` to **Ask** so she approves any file modification before it is saved.
> - She sets `Read(./Payroll/**)` and `Read(./.env)` to **Deny**.
>
> When Asha asks Claude: *"Summarize all project files in this repository,"* Claude summarizes the reports, explicitly notifies her that `Payroll\` and `.env` were skipped due to security restrictions, and continues safely.

---

## Try It in Claude Code

### Managing Permissions Interactively
```text
> /permissions                 # open the interactive rule manager to view, add, or delete rules
> /fewer-permission-prompts    # analyze recent prompts and suggest safe read-only rules to allow
```

### Permission Modes (Cycle with `Shift + Tab`)
Review the full specification in [Glossary: Permission Mode](glossary.md#permission-mode):

| Mode | What Claude May Do Without Asking | Recommended Use Case |
| :--- | :--- | :--- |
| **Default** | Read files within project | Recommended starting mode for standard work |
| **Accept Edits** | Read and edit files in project | Trusted editing sessions where you review changes with `/diff` |
| **Plan** | Read files and research only; **no file modifications** | Initial planning, audits, and evaluating unknown code |

Launch directly into Plan mode from PowerShell:
```powershell
PS C:\Work\TeamOps> claude --permission-mode plan
```

> [!CAUTION]
> **Avoid `--dangerously-skip-permissions`:** This flag disables all human confirmation prompts and gives Claude unrestricted execution privileges. Never use this flag on production or confidential systems. Always follow the principle of least access ([Glossary: Least Access](glossary.md#least-access)).

---

## Keeping Claude Away from Sensitive Files (`settings.json`)

On Windows, permission rules are stored in JSON configuration files (see [Glossary: settings.json](glossary.md#settingsjson)):

| Settings File | Location | Applies To | Documentation |
| :--- | :--- | :--- | :--- |
| **Project Settings** | `.claude\settings.json` (in project root) | Shared across all team members in this project (committed to Git) | [Keeping Claude Away from Sensitive Files](#keeping-claude-away-from-sensitive-files-settingsjson) |
| **Personal (Project)** | `.claude\settings.local.json` | Only you, for this specific project | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |
| **Personal (Global)** | `C:\Users\<you>\.claude\settings.json` | Only you, across every project on your Windows machine | [Set up Claude Code on Windows](setup-windows.md) |

### Asha's Project Settings File (`.claude\settings.json`)

```json
{
  "permissions": {
    "allow": [
      "Read(./Reports/**)"
    ],
    "ask": [
      "Edit(./Reports/**)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)",
      "Read(./Payroll/**)"
    ]
  }
}
```

### Key Configuration Rules
- **Forward Slashes:** Paths inside permission rules always use forward slashes (`/`), even on Windows (`./Reports/**`).
- **Wildcards (`**`):** `Read(./secrets/**)` blocks every file and subfolder inside `secrets`.
- **Natural Language Updates:** You can ask Claude to update rules for you:
  ```text
  > /update-config deny reading the Payroll folder
  ```

---

## Approval Prompts: Read Before You Approve

When an action triggers an **Ask** rule, Claude displays an approval dialogue detailing the exact command or file to be modified:

```text
Claude would like to run:
  PowerShell: git push origin main

[1] Yes
[2] Yes, and don't ask again this session
[3] No
```

> [!WARNING]
> **Approval Caution:** Only choose *"Yes, and don't ask again"* for safe, repetitive, read-only actions (like opening markdown files). **Never** choose "don't ask again" for commands that delete files, commit/push code, or communicate with external servers.

---

## Good Habits for Safe AI Terminal Work

1. **Start Strict:** Begin with default or plan mode, and loosen permissions only as needed.
2. **Deny Secrets Upfront:** Ensure `.env`, credentials, private SSH keys (`id_rsa`), and personal data folders are on the **Deny** list before your first session.
3. **Always Check `/diff`:** Review the exact line-by-line diff before accepting edits.
4. **Work on Clean Copies:** Keep backups or use Git version control so you can revert any unintended changes with `git checkout` or `/rewind`.
5. **Never Paste Secrets:** Never type or paste passwords, tokens, or private customer records into prompts. See this demonstrated in the [Worked Example: Step 3](worked-example.md#step-3-enforce-security-boundaries).

---

> [!TIP]
> **Remember:** Allow what is safe, ask for what matters, and deny what is sensitive. You remain fully responsible for everything Claude generates or changes.

---

## Practical Exercises

1. **Inspect Active Permissions:** In Claude Code, run `/permissions` and view the currently configured allow, ask, and deny rules.
2. **Test Deny Protection:** Create a folder called `secrets\`, add a dummy file `passwords.txt`, and configure a deny rule: `Read(./secrets/**)`. Try asking Claude to summarize `secrets\passwords.txt` and verify that access is blocked.
3. **Use Plan Mode Safeguard:** Start a session with `claude --permission-mode plan`. Ask Claude to edit a file, and verify that Claude produces a plan but refuses to modify the file directly.

---

## Knowledge Check

??? question "If an allow rule says `Read(./Reports/**)` and a deny rule says `Read(./Reports/confidential.pdf)`, what happens when Claude tries to read `confidential.pdf`?"
    **Answer:** Access is denied. In Claude Code, Deny always overrides Allow.

??? question "Which file stores project-level permission rules that should be shared across the entire team via Git?"
    **Answer:** `.claude\settings.json` in the root of the project directory.

??? question "Why should you avoid choosing 'Yes, and don't ask again' when Claude asks to run a shell command?"
    **Answer:** Choosing 'don't ask again' removes human oversight for future commands in that session, creating risk if Claude attempts a destructive or unintended operation later.

---

## Related Concepts & Cross-References

- **[Part B, Module 11: Tools & The Harness](module-11-tools-and-harness.md)** — Understanding the tools being restricted.
- **[Part B, Module 12: Agents](module-12-agents.md)** — Supervised vs. autonomous agent execution.
- **[Part B Worked Example: Asha's Report](worked-example.md)** — Permissions in action during a weekly reporting cycle.
- **[Part B Glossary: Least Access](glossary.md#least-access)** — Plain-English definition.

---

<div class="hero-actions">
  <a href="../module-12-agents/" class="md-button">← Previous: Module 12 — Agents</a>
  <a href="../worked-example/" class="md-button md-button--primary">Next: Putting It All Together (Worked Example) →</a>
</div>
