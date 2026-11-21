# Putting It All Together: Asha's Weekly Report
<p class="hero-lead">An End-to-End Windows CLI Workflow Demonstrating Modules 6 to 13</p>

<div class="doc-header-badges">
  <span class="badge badge-surface">Curriculum: Company AI Training</span>
  <span class="badge badge-level">Part B: Capstone Demonstration</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> **The Real-World Scenario:**
> It is Friday afternoon. Asha, our operations team lead, needs to assemble her team's weekly status report from raw task lists, verify budget numbers, format the report according to senior management standards, and save the final Markdown deliverable in the company archive.
>
> Rather than spending two hours manually copying rows and formatting bullet points, Asha uses Claude Code in her Windows PowerShell terminal. Every step in this workflow illustrates one of the core concepts taught in Modules 6 through 13.

---

## The End-to-End Terminal Walkthrough

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ASHA'S FRIDAY WORKFLOW                          │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Launch in Plan Mode    →  cd C:\Work\TeamOps && claude --mode plan  │
│ 2. Set Up Memory          →  /init & /memory (CLAUDE.md)               │
│ 3. Enforce Permissions    →  /permissions (Deny .env & Payroll)        │
│ 4. Select Model Tier      →  /model sonnet                             │
│ 5. Trigger Skill          →  /weekly-report use @tasks\week47.xlsx     │
│ 6. Review Plan & Diff     →  Approve plan, inspect /diff               │
│ 7. High-Effort Checking   →  /effort high to verify spreadsheet totals │
│ 8. Clean Desk             →  /clear for next task                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Step 1: Safe Launch from PowerShell
Asha opens Windows PowerShell and navigates to her project workspace. She launches Claude Code directly in Plan mode ([Module 12: Agents](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards)) to ensure no files are altered before she approves the plan:

```powershell
PS C:\Users\Asha> cd C:\Work\TeamOps
PS C:\Work\TeamOps> claude --permission-mode plan
```

---

### Step 2: Establish Memory (`CLAUDE.md`)
Claude Code starts up. Asha confirms that her persistent background rules are active using `/memory`, as detailed in [Module 9: Memory](module-09-memory.md#persistent-memory-in-claude-code-claudemd):

```text
> /memory
```
Claude confirms that `CLAUDE.md` is loaded:
- Role: Operations Team Lead
- Tone: Executive summary, short bullet points, no jargon
- Date Format: Day Month Year (e.g., 20 November 2026)
- Report destination: `.\reports\weekly-<date>.md`

---

### Step 3: Enforce Security Boundaries
Asha checks her permission boundaries using `/permissions` as described in [Module 13: Permissions & Safety](module-13-permissions-and-safety.md#the-three-permission-settings-allow-ask-deny):

```text
> /permissions
```
The active rules in `.claude\settings.json` confirm:
- **Allow:** `Read(./Reports/**)`, `Read(./tasks/**)`
- **Ask:** `Edit(./Reports/**)`
- **Deny:** `Read(./.env)`, `Read(./Payroll/**)`, `Read(./secrets/**)`

---

### Step 4: Verify Model Selection
For drafting and organizing content, Sonnet offers the ideal balance of speed and analytical depth ([Module 6: Types of Models](module-06-types-of-models.md#the-idea-in-brief)):

```text
> /model sonnet
```

---

### Step 5: Execute the Reusable Skill with Specific Context
Asha invokes her pre-built team skill ([Module 10](module-10-skills.md) and [Agent Skills Guide](module-10-skills.md#step-by-step-building-ashas-weekly-report-skill)), pointing Claude at this week's spreadsheet using `@` ([Module 7](module-07-context.md)) and providing a clear, concise instruction ([Module 8](module-08-prompting.md)):

```text
> /weekly-report use @tasks\week47.xlsx
```

---

### Step 6: The Autonomous Agent Loop in Action
Because Claude is in Plan mode ([Module 12: Agents](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards)) ([Module 12](module-12-agents.md)), it executes the research phase without altering files:
1. `Read(tasks\week47.xlsx)` — Inspects task status, completion dates, and blockers.
2. `Read(.claude\skills\weekly-report\template.md)` — Loads the four-part layout: Done, In Progress, Risks, Next Week.
3. Claude presents a structured plan on screen:
   - 4 completed milestones identified.
   - 2 in-progress initiatives summarized.
   - 1 operational risk (delayed hardware delivery) flagged.
   - Proposed output file: `reports\weekly-20-nov-2026.md`.

Asha reviews the plan, approves it, and switches mode (`Shift + Tab`) to authorize file generation.

---

### Step 7: Verification with Extended Thinking (`/effort high`)
Before finalizing the report, Asha wants to ensure every metric total in the summary matches the raw spreadsheet:

```text
> /effort high
> check every financial total and task count against @tasks\week47.xlsx. If any discrepancy exists, flag it explicitly.
```
With `/effort high` ([Module 6](module-06-types-of-models.md) and [Extended Thinking](module-06-types-of-models.md#the-idea-in-brief)), Claude takes additional reasoning steps, verifies the calculations line by line, catches a 5% rounding discrepancy in the operations cost total, and corrects it.

---

### Step 8: Review Edits with `/diff`
Before closing the session, Asha inspects the exact line-by-line modifications made to her workspace using `/diff` ([Module 12: Controls](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards)):

```text
> /diff
```
The terminal displays a clean green-and-red diff showing the newly created `reports\weekly-20-nov-2026.md` file. Everything aligns with her expectations.

---

### Step 9: Clean Context Desk for the Next Task
With the report safely saved to disk, Asha clears the active context desk so she can start an afternoon research task with a clean slate:

```text
> /clear
```
Claude empties the active desk. The session history is safely archived and accessible anytime via `claude -r` as documented in [Set up Claude Code on Windows: Sessions](setup-windows.md#8-starting-resuming-and-leaving-sessions) and [FAQ Question 5](faq.md#5-what-is-the-practical-difference-between-clear-and-compact).

---

## Concept Mapping: Modules 6 to 13 in the Terminal

| Module | Core AI Concept | How It Appears in Asha's Terminal | Documentation Reference |
| :--- | :--- | :--- | :--- |
| **Module 6** | **Types of Models** | `/model sonnet` for drafting; `/effort high` for numerical cross-checking. | [Module 6: Types of Models](module-06-types-of-models.md) |
| **Module 7** | **Context** | `@tasks\week47.xlsx` placed onto the desk; `/clear` resets the desk afterward. | [Module 7: Context](module-07-context.md) |
| **Module 8** | **Prompting & Instructions** | Clear 4-part request with situation, goal, background file, and format rules. | [Module 8: Prompting](module-08-prompting.md) |
| **Module 9** | **Memory** | `CLAUDE.md` automatically loaded at startup, enforcing Asha's tone and preferences. | [Module 9: Memory](module-09-memory.md) |
| **Module 10** | **Skills** | `/weekly-report` packages the multi-step checklist into a single command. | [Module 10: Skills](module-10-skills.md) |
| **Module 11** | **Tools & The Harness** | Transparent tool lines on screen: `Read(tasks\week47.xlsx)`, `Write(reports\...)`. | [Module 11: Tools & The Harness](module-11-tools-and-harness.md) |
| **Module 12** | **Agents** | Autonomous Plan → Act → Check loop; supervised execution with `/plan` and `/diff`. | [Module 12: Agents](module-12-agents.md) |
| **Module 13** | **Permissions & Safety** | Least-access enforcement: `Payroll\` and `.env` denied; edits require human OK. | [Module 13: Permissions & Safety](module-13-permissions-and-safety.md) |

---

> [!TIP]
> **Key Takeaway:** No single AI concept works in isolation. Real workplace productivity comes from combining model selection, clean context management, persistent memory, reusable skills, and strict permission boundaries into a cohesive daily workflow. Learn more in the [Windows Command Cheat Sheet](index.md#windows-command-cheat-sheet).

---

<div class="hero-actions">
  <a href="../module-13-permissions-and-safety/" class="md-button">← Previous: Module 13 — Permissions & Safety</a>
  <a href="../glossary/" class="md-button md-button--primary">Next: Glossary & Reference →</a>
</div>
