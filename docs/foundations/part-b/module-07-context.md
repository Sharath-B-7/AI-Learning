# Module 7: Context

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: AI Concepts</span>
  <span class="badge badge-level">Module 7 of 8</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

<div class="module-video-wrapper" data-module="module-07" data-video-title="Module 7: Context">
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
          <h3 class="video-title">Module 7: Context</h3>
          <p class="video-status">Video will be available soon</p>
          <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/module-07.mp4</code></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

<a id="the-desk-analogy"></a>
## The Desk in Claude Code

In Claude Code, **context** is like a physical work desk. The desk holds everything Claude can see and remember right now: the directory where you started Claude, plus the ongoing conversation history.

Claude can read files in your project directory when it needs them, but it works faster, cheaper, and far more accurately when you point it at the exact files that matter. For architectural details, review [Part A, Module 2: What Is an LLM?](../part-a/module-02-what-is-an-llm.md#what-is-an-llm) and the [Glossary: Context Window](glossary.md#context-window).

### What Sits on the Desk?

1. **Your instructions:** What you type at the interactive `>` prompt.
2. **The conversation so far:** Previous questions, clarifications, and responses in this session.
3. **Local files:** Anything inside the folder where you launched `claude`. (Files outside this folder are off the desk unless explicitly added).
4. **Tool results:** Terminal command outputs, files Claude opened, and web pages fetched.
5. **Memory files:** `CLAUDE.md`, automatically loaded at the start of every session (detailed in [Module 9](module-09-memory.md) and [Module 9: Memory](module-09-memory.md#persistent-memory-in-claude-code-claudemd)).

---

## Everyday Scenario: Asha's Missing Meeting Notes

> [!NOTE]
> **Asha's Context Lesson:**
> Asha opens Claude Code and types: *"Summarize yesterday's operations meeting."*
>
> Claude searches the root directory, finds no file named "yesterday", and asks for clarification.
>
> Asha remembers the desk concept: Claude cannot guess which file she means. She types:
> ```text
> > @notes\2026-11-18-meeting.md summarize this into key decisions and next steps
> ```
> By explicitly placing the specific file onto Claude's desk with `@`, Claude immediately reads the correct notes and delivers a precise summary.

---

## Try It in Claude Code

Inside your interactive Claude Code session, use these commands to manage what sits on the desk as listed in the [Command Cheat Sheet](index.md#inside-claude-code-session-commands):

```text
> @report.docx summarize the risks          # put one specific file on the desk
> @Reports\ list what is in this folder     # point at an entire folder
> /add-dir C:\Work\SharedTemplates          # add a directory outside the project
> /context                                  # see a visual meter of how full the desk is
> /compact keep the decisions and open tasks # summarize earlier chat to free space
> /clear                                    # wipe the desk fresh for a new task
> /btw what does "CAPEX" mean?              # ask a side question without saving it to history
```

### Context Management Commands

| Command | When to Use It | Official Reference |
| :--- | :--- | :--- |
| **`@file` or `@folder\`** | Put specific files or folders on the desk. Type `@` and press `Tab` to autocomplete filenames. | [Glossary: @ Mention](glossary.md#mention) |
| **`/context`** | Use when responses seem sluggish or confused. Displays a colored visual grid of what fills the context window. | [Glossary: Context Window](glossary.md#context-window) |
| **`/compact [focus]`** | Use when a session is getting long, but you want to continue working on the same task. Compresses history while preserving key context. | [Glossary: Compact](glossary.md#compact-compact) |
| **`/clear`** | Use when starting a completely different task. Wipes the active desk. (Your previous conversation remains accessible via `claude -r`). | [FAQ Question 5](faq.md#5-what-is-the-practical-difference-between-clear-and-compact) |
| **`/add-dir <path>`** | Use when your task requires access to templates, data, or files located in another folder on your PC. | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |
| **`/btw <question>`** | Use when you want a quick explanation or definition that shouldn't pollute the ongoing project context. | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |

---

<a id="the-desk-has-a-size-limit-the-context-window"></a>
## The Desk Has a Size Limit (The Context Window)

The **context window** is the physical surface area of the desk.

Claude features an industry-leading [context window](glossary.md#context-window) (typically 200,000 [tokens](../part-a/module-02-what-is-an-llm.md#tokens), roughly 150,000 words or 500 pages of text). While massive, the desk is still finite:

- **Attention limits:** In a very long conversation with dozens of back-and-forth turns, the desk fills up with old discussion and tool output.
- **Clutter reduces precision:** When the desk is overcrowded, Claude may lose track of earlier constraints, repeat itself, or miss subtle details ("lost in the middle").
- **Monitoring capacity:** You can inspect your active token allowance and how full the desk is at any point by typing `/context` in your session.

---

## Quality Matters More Than Quantity

A common beginner mistake is placing too many files on the desk at once. If you load 50 spreadsheets when only one is needed, Claude has to search through thousands of irrelevant words to find what you want. Claude also uses prompt caching (reusing static project context) to optimize speed and cost when reusing static project files.

### Golden Rules for Clean Context

- **Start fresh:** Run `/clear` (or start a new session) whenever you switch topics or finish a project milestone.
- **Selective inclusion:** Mention only the files that matter using `@file`, rather than instructing Claude to "read everything in C:\Work".
- **Compact proactively:** In long troubleshooting or research sessions, run `/compact keep the main findings` before context reaches capacity.
- **The 80% Rule:** Keep your context utilization below 80%. When context is crowded, models tend to overlook subtle constraints. See how Asha manages desk space in the [Worked Example](worked-example.md#step-9-clean-context-desk-for-the-next-task).

---

> [!TIP]
> **Remember:** Claude knows only what is on its desk. If an answer is inaccurate or missing facts, the information was likely off the desk. Add it explicitly with `@`.

---

## Practical Exercises

1. **Autocomplete with `@`:** Create a text file called `project-brief.txt` in your folder. Start Claude Code, type `@proj` and hit `Tab` to experience file autocomplete.
2. **Inspect Context Usage:** Run `/context` to view your current token utilization and see what proportion is consumed by system instructions vs. conversation.
3. **Test Ephemeral Questions with `/btw`:** Type `/btw what is the difference between JSON and YAML?` Notice that Claude answers your question without adding the exchange to the active conversation history.

---

## Knowledge Check

??? question "What command should you use when you finish drafting a report and want to start an unrelated budget analysis in the same session?"
    **Answer:** `/clear`. It resets the active context desk so details from the report do not confuse the budget analysis.

??? question "How do you provide Claude with access to a shared template folder located outside your project directory?"
    **Answer:** Use `/add-dir <path>`, for example: `/add-dir C:\Work\SharedTemplates`.

??? question "What is the difference between `/clear` and `/compact`?"
    **Answer:** `/clear` wipes the active conversation completely for a fresh start. `/compact` summarizes the existing conversation to free up space while continuing work on the same task.

---

## Related Concepts & Cross-References

- **[Part A, Module 3: How LLMs Work](../part-a/module-03-how-llms-work.md)** — Context basics.
- **[Part B, Module 8: Prompting & Instructions](module-08-prompting.md)** — Structuring requests with background files.
- **[Part B, Module 9: Memory](module-09-memory.md)** — How `CLAUDE.md` provides persistent background on every desk.
- **[Part B Glossary: Context Window](glossary.md#context-window)** — Plain-English explanation of tokens and context capacity.

---

<div class="hero-actions">
  <a href="../module-06-types-of-models/" class="md-button">← Previous: Module 6 — Types of Models</a>
  <a href="../module-08-prompting/" class="md-button md-button--primary">Next: Module 8 — Prompting & Instructions →</a>
</div>
