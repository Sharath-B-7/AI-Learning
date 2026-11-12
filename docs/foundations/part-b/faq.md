# Commonly Asked Questions: Part B

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: AI Concepts</span>
  <span class="badge badge-level">Frequently Asked Questions</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

---

## Models

### 1. Is the biggest model always the best choice?
No. Larger models take longer to respond and consume more computing budget. For simple tasks (such as fixing grammar or sorting bullet points), smaller models like Haiku are just as effective and significantly faster (see [Module 6: Model Tiers](module-06-types-of-models.md#model-tiers-small-medium-and-large)).

### 2. What does "thinking" actually do?
The model generates internal reasoning tokens before writing its visible response. It systematically works through intermediate calculations, checks for logical traps, and tests edge cases. This dramatically improves performance on hard analytical problems, but is unnecessary for straightforward drafting (see [Module 6: Reasoning Models](module-06-types-of-models.md#standard-models-vs-thinking-reasoning-models)).

### 3. If thinking is on, can I trust the answer without checking?
No. While extended thinking substantially increases accuracy, it does not make the model infallible. You must continue to verify high-stakes numbers and factual claims using the **Trust Rule** (see [Part A, Module 4: The Trust Rule](../part-a/module-04-strengths-limits-trust.md#the-trust-rule-check-in-proportion-to-the-stakes)).

### 4. Can Claude read images and PDFs?
Yes. Modern Claude models are multimodal, allowing you to upload PNG/JPEG screenshots, whiteboard photos, scanned PDF reports, and spreadsheets alongside your prompt (see [Module 6: Multimodal Models](module-06-types-of-models.md#multimodal-models-models-that-can-see)).

---

## Context and Prompts

### 5. Why does Claude seem to forget things in a long chat?
The context desk has a finite limit (the context window). In very long, meandering chats, earlier messages may get pushed out of view or dilute the model's attention. Start a fresh chat for new tasks, or ask Claude to summarize the conversation before continuing (see [Module 7: Context Desk Limit](module-07-context.md#the-desk-has-a-size-limit-the-context-window)).

### 6. Is a longer prompt always a better prompt?
No. High-quality, focused context is what matters. Pasting an unedited 100-page document full of irrelevant data makes it harder for Claude to isolate the critical facts (see [Module 7: Quality Over Quantity](module-07-context.md#quality-matters-more-than-quantity)).

### 7. Do I have to repeat my background in every new chat?
Not if you store it. By configuring **Project Instructions** or saved **Memory notes** ([Module 9: Memory](module-09-memory.md)), Claude automatically reads your role, preferences, and formatting standards at the start of every session.

---

## Memory and Skills

### 8. Does memory mean Claude is learning from me?
No. The underlying neural network weights are static and do not retrain during your chats. "Memory" simply means saving a file or preference note that is prepended to the context desk at the start of future conversations (see [Module 9: Claude Does Not Remember by Default](module-09-memory.md#claude-does-not-remember-by-default)).

### 9. What should I never save in memory?
Never save passwords, API keys, customer personal identifiable information (PII), or confidential corporate secrets. Store preferences and role guidelines, not credentials (see [Module 9: What to Store](module-09-memory.md#what-to-store-vs-what-never-to-store) and [Part A, Module 4: Privacy Basics](../part-a/module-04-strengths-limits-trust.md#privacy-basics)).

### 10. Is a skill the same as a prompt?
A prompt is a one-time instruction. A **skill** is a saved, repeatable recipe containing templates, steps, and quality checklists that anyone on your team can invoke repeatedly (see [Module 10: Skill vs. Prompt](module-10-skills.md#skill-vs-prompt)).

---

## Tools, Agents, and Permissions

### 11. What is the difference between the Claude app and Claude Code?
Both use the same Claude model family, but they operate inside different **harnesses**. The Claude web/desktop app is designed for conversational drafting and visual artifacts. Claude Code is a terminal-based harness built for software development, with tools to read directories, edit files, and run test suites (see [Module 11: The Harness Workshop](module-11-tools-and-harness.md#the-harness-the-complete-workshop) and [Part A, Module 5: Ways to Use Claude](../part-a/module-05-meet-claude.md#ways-to-use-claude)).

### 12. Can Claude open my files or email by itself?
Only if you explicitly connect the application or place the files inside an approved workspace directory. The harness enforces strict boundaries—Claude cannot scan your computer uninvited (see [Module 11: Connectors](module-11-tools-and-harness.md#connectors)).

### 13. Who is responsible if Claude makes a mistake while acting?
**You are.** An AI assistant is a tool operating under your direction. That is why permissions exist and why you must review all proposed changes before they are saved, executed, or emailed (see [Module 13: Permissions & Safety](module-13-permissions-and-safety.md)).

### 14. What is the difference between a chatbot and an agent?
In a chat, you ask and Claude answers. An agent is handed an overarching goal and autonomously loops through **Think, Act, and Check**—using tools until the job is completed (see [Module 12: Chat vs. Agent](module-12-agents.md#chat-vs-agent)).

### 15. When should I use an agent instead of a normal chat?
Use an agent for multi-step jobs involving multiple files, iterative calculations, or complex audits. Use a normal chat for quick questions, ideation, and single-pass text rewrites (see [Module 12: When to Use an Agent](module-12-agents.md#when-to-use-an-agent-vs-a-normal-chat)).

### 16. Can an agent make mistakes along the way?
Yes. An early incorrect assumption can compound across subsequent steps. Prevent this by providing clear constraints and instructing the agent to pause for mandatory check-ins at key milestones (see [Module 12: Giving an Agent a Good Goal](module-12-agents.md#giving-an-agent-a-good-goal)).

### 17. Can I stop Claude from reading a particular file, such as a `.env` file?
Yes. In Claude Code, you can add a **Deny rule** inside `.claude/settings.json` (e.g., `"deny": ["Read(./.env)"]`). Claude is then permanently blocked from opening that file (see [Module 13: Sensitive Files](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files)).

### 18. What is the difference between "Ask" and "Deny"?
- **Ask:** Claude pauses execution and presents a prompt waiting for your manual OK before proceeding.
- **Deny:** Claude is strictly and permanently blocked from attempting the action under any circumstances.
*(See [Module 13: Three Settings: Allow, Ask, Deny](module-13-permissions-and-safety.md#the-three-permission-settings-allow-ask-deny)).*

### 19. If I deny a file, is it completely safe?
A deny rule is a powerful operational guardrail, but true defense-in-depth requires keeping production secrets out of shared workspace repositories entirely. Follow your company's information security standards at all times (see [Module 13: Security Habits](module-13-permissions-and-safety.md#good-security-habits)).

---

<div class="hero-actions">
  <a href="../glossary/" class="md-button">← Part B Glossary</a>
  <a href="../learning-checklist/" class="md-button md-button--primary">Next: Part B Learning Checklist →</a>
</div>
