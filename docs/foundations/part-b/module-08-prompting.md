# Module 8: Prompting and Instructions

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: AI Concepts</span>
  <span class="badge badge-level">Module 8 of 8</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

<div class="module-video-wrapper" data-module="module-08" data-video-title="Module 8: Prompting and Instructions">
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
          <h3 class="video-title">Module 8: Prompting and Instructions</h3>
          <p class="video-status">Video will be available soon</p>
          <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/module-08.mp4</code></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

<a id="the-four-parts-of-a-good-request"></a>
## Prompting and Instructions in Claude Code

In Claude Code you prompt in plain English at the `>` prompt, exactly as you would in the web interface. The primary difference is that Claude Code is connected directly to your local file system, tools, and execution environment.

A reliable request contains four core building blocks: **Situation**, **Goal**, **Background**, and **Format**. For in-depth prompt strategies, see [Part A, Module 5: Three Habits for Good Results](../part-a/module-05-meet-claude.md#three-habits-for-good-results).

### The 4-Part Request Framework

| Part | What to Include | In Claude Code |
| :--- | :--- | :--- |
| **Situation** | Who you are and what the current scenario is | One line at the top of your prompt |
| **Goal** | Exactly what you want created, edited, or checked | Name the output file if you want one created |
| **Background** | Specific facts, input files, constraints, or decisions | Use `@file` mentions instead of copy-pasting text |
| **Format** | Desired structure, length, tone, and audience | Specify in prompt, or set permanently in `CLAUDE.md` |

---

## Comparison: Weak vs. Strong Requests

**❌ Weak Request:**
```text
> summarize this
```
*Why it fails:* Claude does not know which file you mean, who the summary is for, how long it should be, or where to save it.

**✅ Strong Request:**
```text
> I'm preparing for a client meeting tomorrow. Summarize @Q3-report.pdf
  in five bullet points, focusing on risks and costs. Keep each point
  under 20 words. Save it as meeting-prep.md.
```
*Why it succeeds:* Contains clear situation (client meeting tomorrow), goal (summarize and save as `meeting-prep.md`), background (`@Q3-report.pdf`), and constraints (5 bullets, risks and costs focus, under 20 words per point). See this in action in the [Worked Example](worked-example.md#step-5-execute-the-reusable-skill-with-specific-context).

---

## Everyday Scenario: Asha's Reminder Email

> [!NOTE]
> **Asha's Iterative Prompting:**
> Asha needs to send a vendor payment reminder.
>
> Her first prompt:
> ```text
> > draft a payment reminder email to NorthStar Supplies
> ```
> Claude generates a polite, four-paragraph email. It is well-written, but far too long for a quick workplace reminder.
>
> Instead of starting over, Asha refines it directly in the follow-up:
> ```text
> > cut this to three sentences, make the invoice number bold, and state that payment is due this Friday by 5 PM
> ```
> Claude updates the draft immediately. The second version is crisp, professional, and ready to send.

---

## Try It in Claude Code: Input Shortcuts & Workflow Keys

Inside your interactive terminal session, these keyboard shortcuts streamline typing and managing complex prompts, as summarized in the [Command Cheat Sheet](index.md#inside-claude-code-session-commands):

| Key or Command | What It Does | Documentation Link |
| :--- | :--- | :--- |
| **`Shift + Enter`** | Creates a new line without sending the message (works in Windows Terminal). In standard CMD, type `\` then press `Enter`. | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |
| **`Ctrl + G`** | Opens your current prompt in an external text editor (like Notepad or VS Code) for crafting long, structured requests. | [Set up Claude Code on Windows](setup-windows.md#7-starting-your-first-session) |
| **`Alt + V`** | Pastes a screenshot or image directly from your Windows clipboard into the prompt. | [Module 6: Multimodal Inputs](module-06-types-of-models.md#multimodal-models-models-that-can-see) |
| **`Up / Down Arrows`** | Cycles through your earlier prompt history so you can re-run or adjust previous commands. | [Command Cheat Sheet](index.md#inside-claude-code-session-commands) |
| **`/plan <task>`** | Tells Claude to research the problem, produce a step-by-step plan, and wait for your approval before making changes. | [Module 12: Plan Mode](module-12-agents.md#try-it-in-claude-code-agent-controls-safeguards) |
| **`Esc`** | Immediately pauses or interrupts Claude mid-generation if you notice it heading in the wrong direction. | [FAQ Question 8](faq.md#8-how-do-i-stop-claude-immediately-if-it-starts-making-unexpected-changes) |

---

## Useful Prompting Techniques for the Terminal

- **Provide Style Examples:** Rather than describing a tone abstractly, point to an existing file:
  ```text
  > write this update in the same style and tone as @emails\sample-reminder.txt
  ```
- **Establish Strict Boundaries:** Explicitly tell Claude what *not* to do:
  ```text
  > do not use corporate jargon; if a financial figure is missing from @budget.csv, say so rather than estimating
  ```
- **Plan Complex Changes First:** For multi-step tasks, use plan mode:
  ```text
  > /plan outline how we will reorganize the @docs\ folder, list every move, and wait for my OK
  ```
- **Invite Clarifying Questions:** Prevent misunderstandings before work begins:
  ```text
  > before you start, ask me up to three clarifying questions if anything about the requirements is unclear
  ```

---

> [!TIP]
> **Remember:** State the situation, goal, background, and format. Mention background files with `@` and always use `/plan` before allowing Claude to modify files. Explore more in [Module 12: Agents](module-12-agents.md#the-agent-loop-on-screen).

---

## Practical Exercises

1. **Multi-Line Input:** Open Claude Code in Windows Terminal and use `Shift + Enter` to write a 3-paragraph structured request with headings and bullet points.
2. **External Editor with `Ctrl + G`:** Type a partial prompt at the `>` prompt, press `Ctrl + G`, watch Notepad open, finish editing your prompt, save and close Notepad, and see the full text appear at the Claude prompt.
3. **Plan Before Action:** Run `/plan reorganize the files in @drafts\ into subfolders by year` and examine the proposed execution steps before approving.

---

## Knowledge Check

??? question "Which shortcut allows you to insert a line break without accidentally submitting your prompt in Windows Terminal?"
    **Answer:** `Shift + Enter` (or typing `\` followed by `Enter` in traditional command consoles).

??? question "Why is using `@notes.txt` better than copy-pasting the text of `notes.txt` into the prompt?"
    **Answer:** Using `@notes.txt` puts the file directly on the desk cleanly, avoids cluttering your terminal screen, handles large files efficiently, and preserves exact formatting.

??? question "What should you press if you notice Claude starting to rewrite a file you did not want changed?"
    **Answer:** Press `Esc` to immediately stop generation.

---

## Related Concepts & Cross-References

- **[Part A, Module 3: How LLMs Work](../part-a/module-03-how-llms-work.md)** — Prompt anatomy.
- **[Part B, Module 7: Context](module-07-context.md)** — Putting files on the desk with `@`.
- **[Part B, Module 9: Memory](module-09-memory.md)** — Saving permanent formatting rules in `CLAUDE.md`.
- **[Part B, Module 12: Agents](module-12-agents.md)** — Using `/plan` and managing autonomous execution.

---

<div class="hero-actions">
  <a href="../module-07-context/" class="md-button">← Previous: Module 7 — Context</a>
  <a href="../module-09-memory/" class="md-button md-button--primary">Next: Module 9 — Memory →</a>
</div>
