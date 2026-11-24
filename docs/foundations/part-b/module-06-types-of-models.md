# Module 6: Types of Models

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: Claude Code & Agentic Systems</span>
  <span class="badge badge-level">Module 6 of 8</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

<div class="module-video-wrapper" data-module="module-06" data-video-title="Module 6: Types of Models">
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
          <h3 class="video-title">Module 6: Types of Models</h3>
          <p class="video-status">Video will be available soon</p>
          <p class="video-hint">Local MP4 upload pending in <code>docs/assets/videos/module-06.mp4</code></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## The Idea in Brief

Claude is a family of foundation models developed by Anthropic. In [Set up Claude Code on Windows](setup-windows.md), you can seamlessly switch between different model tiers with a single slash command. Smaller models are faster and cheaper; larger models handle harder, multi-step analytical and architectural work.

For a comprehensive comparison of model capabilities and benchmark scores, see the [Part A, Module 5: Meet Claude](../part-a/module-05-meet-claude.md#different-models) and the [Part B Glossary: Model Tier](glossary.md#model-tier).

| Tier | Name in Claude Code | Good For | Trade-Off |
| :--- | :--- | :--- | :--- |
| **Smaller and faster** | `haiku` | Quick edits, renaming, simple questions | Less depth on complex multi-file problems |
| **Balanced** | `sonnet` | Most everyday work: drafting, analysis, spreadsheets | Sensible middle ground for daily productivity |
| **Most capable** | `opus` | Hard, multi-step, or high-stakes reasoning jobs | Slower and consumes more of your token allowance |

A **thinking model** works the problem through step by step before generating an answer. In Claude Code, you control this behavior via the **effort level** setting: low effort responds quickly, while high effort engages deeper reasoning cycles. For more details on reasoning mechanisms, explore the [Glossary: Thinking Model](glossary.md#thinking-model-extended-thinking). Note that extended thinking helps solve intricate logic puzzles, but human verification is always required.

---

## Everyday Scenario: Asha's Operations Decisions

> [!NOTE]
> **Asha's Model Selection Strategy:**
> - When Asha needs to fix minor typos or format text across a single document, she switches to **`haiku`** for near-instant turnaround and minimal cost.
> - For her day-to-day operations—drafting meeting summaries, compiling status updates, and analyzing team deliverables—she keeps Claude on **`sonnet`**.
> - When comparing three competing supplier quotes with conflicting terms, varying discount structures, and complex SLAs, she switches to **`opus`** and sets `/effort high` to let the model cross-examine the numbers thoroughly.

---

## Try It in Claude Code

Inside an active interactive session, you switch models and configure thinking effort dynamically using [slash commands](index.md#inside-claude-code-session-commands):

```text
> /model                 # open the interactive model picker (arrow keys, Enter)
> /model sonnet          # switch straight to the balanced model
> /model opus            # switch to the most capable model
> /effort high           # think longer on hard problems
> /effort low            # answer fast on easy ones
> /effort status         # show the current effort level
> /status                # see which model and account you are currently using
```

You can also specify your model directly when launching Claude Code from Windows PowerShell using the `--model` flag documented in the [Set up Claude Code on Windows guide](setup-windows.md#8-starting-resuming-and-leaving-sessions):

```powershell
PS C:\Work\TeamOps> claude --model sonnet
```

### Key Behaviors to Keep in Mind

- **Default Persistence:** Running `/model` saves your selection as the project default for future sessions. In the interactive picker, use the left and right arrow keys to adjust thinking effort for supported models.
- **Checking Your Quota:** Run `/usage` to inspect how much of your plan or token allowance you have consumed. This helps you gauge when a lighter model like `haiku` is sufficient.
- **Dynamic Model Availability:** Model names and capabilities evolve. The interactive `/model` picker dynamically queries and displays the exact models enabled for your account tier.

---

<a id="multimodal-models-models-that-can-see"></a>
## Multimodal: Giving Claude a Picture or Document

Claude Code supports multimodal reasoning, allowing it to inspect and extract information from screenshots, diagrams, and PDFs as detailed in [Module 7: Context](module-07-context.md#the-desk-in-claude-code):

- **Windows Clipboard Shortcut:** Capture a screenshot (e.g., with `Win + Shift + S`), click into the Claude Code prompt, and press **`Alt + V`** to paste the image directly from your clipboard.
- **File Mentions with `@`:** You can also reference an image or PDF file stored in your workspace:

```text
> @whiteboard.png turn this photo into a typed action list with owners and due dates
```

Claude reads the image pixels, transcribes handwritten notes, identifies action items, and generates a structured table.

---

> [!TIP]
> **Core Rule of Thumb:** Start with **`sonnet`** for everyday work. Drop to **`haiku`** for simple, repetitive tasks. Switch to **`opus`** or raise to **`/effort high`** when solving complex, high-stakes puzzles. Learn more in the [Worked Example: Asha\'s Weekly Report](worked-example.md#step-4-verify-model-selection).

---

## Practical Exercises

1. **Test the Model Picker:** Launch Claude Code and type `/model`. Use the arrow keys to inspect the available models and adjust the effort level, then select `sonnet`.
2. **Observe Speed Differences:** Ask `haiku` and `opus` the same question: `Explain the difference between CAPEX and OPEX in 30 words.` Notice the response speed and depth.
3. **Inspect Active Status:** Run `/status` and verify your active model, authentication identity, and current directory as detailed in [FAQ Question 4](faq.md#4-how-do-i-see-every-available-slash-command-inside-a-session).

---

## Knowledge Check

??? question "Which model tier should Asha choose if she wants to rename 20 report files quickly and economically?"
    **Answer:** `haiku`. It is the fastest and least expensive model tier, perfectly suited for straightforward edits and repetitive administrative tasks.

??? question "How can you give Claude a screenshot of an error message on Windows without saving it as an image file first?"
    **Answer:** Copy the screenshot to your Windows clipboard (`Win + Shift + S`), navigate to the Claude Code prompt, and press `Alt + V`.

??? question "Does setting `/effort high` guarantee that Claude's answer will be 100% correct?"
    **Answer:** No. While extended thinking allows the model to reason through multi-step logic and catch edge cases, human verification is always required.

---

## Related Concepts & Cross-References

- **[Part A, Module 2: What Is an LLM?](../part-a/module-02-what-is-an-llm.md)** — Understanding how models predict tokens.
- **[Part A, Module 5: Meet Claude](../part-a/module-05-meet-claude.md)** — Overview of Claude's architecture.
- **[Set up Claude Code on Windows](setup-windows.md)** — Installation and launch commands.
- **[Part B, Module 7: Context](module-07-context.md)** — How model context limits impact available desk space.
- **[Part B Glossary: Model Tiers](glossary.md#model-tier)** — Plain-English reference for model tiers.

---

<div class="hero-actions">
  <a href="../setup-windows/" class="md-button">← Set up Claude Code on Windows</a>
  <a href="../module-07-context/" class="md-button md-button--primary">Next: Module 7 — Context →</a>
</div>
