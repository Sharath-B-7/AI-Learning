# Glossary: Part B Terms in Plain English

<div class="doc-header-badges">
  <span class="badge badge-surface">Part B: AI Concepts</span>
  <span class="badge badge-level">System & Architecture Vocabulary</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

> [!NOTE]
> This glossary covers the advanced structural and architectural terms introduced in Part B. Each term links directly to its in-depth module explanation. For foundational terms (such as *AI, LLM, token, hallucination, and pretraining*), see the [Part A Glossary](../part-a/glossary.md).

---

| Term | Plain-English Meaning | Primary Module Reference |
| :--- | :--- | :--- |
| <a id="model-tier"></a>**Model Tier** | A specific size and capability version within an AI family, ranging from small and fast (Haiku) to balanced (Sonnet) and highly capable (Opus). | [Module 6: Model Tiers](module-06-types-of-models.md#model-tiers-small-medium-and-large) |
| <a id="reasoning-model-thinking-model"></a>**Reasoning (Thinking) Model** | A model capable of working through a problem step by step on a "scratchpad" before producing its final answer. | [Module 6: Reasoning Models](module-06-types-of-models.md#standard-models-vs-thinking-reasoning-models) |
| <a id="multimodal"></a>**Multimodal** | An AI model that can process visual inputs (such as photos, charts, and screenshots) in addition to text. | [Module 6: Multimodal Models](module-06-types-of-models.md#multimodal-models-models-that-can-see) |
| <a id="context"></a>**Context** | The collection of messages, files, and background information currently active on Claude's "desk." | [Module 7: Context](module-07-context.md) |
| <a id="context-window"></a>**Context Window** | The maximum volume of text and files an AI model can hold in its active attention span at one time. | [Module 7: Desk Size Limit](module-07-context.md#the-desk-has-a-size-limit-the-context-window) |
| <a id="prompting"></a>**Prompting** | The craft of formulating clear requests, context, and constraints so an AI assistant produces reliable, high-quality results. | [Module 8: Prompting](module-08-prompting.md) |
| <a id="few-shot-examples"></a>**Few-Shot Examples** | Showing 1 or 2 concrete examples ("golden samples") of the desired output within your prompt to guide the AI's pattern matching. | [Module 8: Prompting Techniques](module-08-prompting.md#five-practical-prompting-techniques) |
| <a id="memory-saved-memory"></a>**Memory (Saved Memory)** | Standing information or preferences saved across conversations so Claude can recall them in future sessions without retyping. | [Module 9: Memory](module-09-memory.md) |
| <a id="project-instructions"></a>**Project Instructions** | Persistent system instructions attached to a Claude Project that govern the behavior, tone, and rules of all chats within that project. | [Module 9: Short-Term vs. Saved](module-09-memory.md#short-term-vs-saved-persistent-memory) |
| <a id="skill"></a>**Skill** | A saved, repeatable recipe of instructions, templates, and checklists designed for a specific recurring task. | [Module 10: Skills](module-10-skills.md) |
| <a id="tool"></a>**Tool** | A function or software capability (such as a calculator, web search, or file reader) that a model invokes to take action. | [Module 11: The Model's Hands](module-11-tools-and-harness.md#tools-the-models-hands) |
| <a id="harness"></a>**Harness** | The complete software wrapper around an AI model that provides tools, coordinates the execution loop, and enforces security rules. | [Module 11: The Harness Workshop](module-11-tools-and-harness.md#the-harness-the-complete-workshop) |
| <a id="connector"></a>**Connector** | A secure software bridge linking Claude to an external application (such as Google Drive, Slack, GitHub, or Microsoft 365). | [Module 11: Connectors](module-11-tools-and-harness.md#connectors) |
| <a id="agent"></a>**Agent** | An AI system that is given a high-level goal and autonomously executes multi-step work using tools until the goal is achieved. | [Module 12: Agents](module-12-agents.md) |
| <a id="agent-loop"></a>**Agent Loop** | The repetitive cycle executed by an agent: **Think** (plan next step), **Act** (run a tool), and **Check** (verify the result). | [Module 12: The Agent Loop](module-12-agents.md#the-agent-loop-think-act-check) |
| <a id="subagent"></a>**Subagent** | An independent helper spawned by an agent to execute one part of a larger job using its own clean, isolated context desk. | [Module 12: Subagents](module-12-agents.md#subagents-helpers-for-large-jobs) |
| <a id="permissions"></a>**Permission** | A configurable rule governing whether an agent is allowed to execute an action freely, must pause for approval, or is strictly blocked. | [Module 13: Permissions](module-13-permissions-and-safety.md) |
| <a id="allow-ask-deny"></a>**Allow, Ask, Deny** | The three permission states: **Allow** (execute without asking), **Ask** (pause for human OK), and **Deny** (strictly forbidden). | [Module 13: Three Settings](module-13-permissions-and-safety.md#the-three-permission-settings-allow-ask-deny) |
| <a id="deny-rule"></a>**Deny Rule** | A security boundary that permanently blocks Claude from reading or editing specific sensitive files, folders, or tools. | [Module 13: Sensitive Files](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files) |
| <a id="approval-prompt"></a>**Approval Prompt** | A dialog box where an agent halts and presents its proposed tool execution or file modification for human sign-off. | [Module 13: Approval Prompts](module-13-permissions-and-safety.md#approval-prompts-read-before-you-click) |
| <a id="least-access"></a>**Least Access** | The core security principle of granting an AI assistant only the minimal permissions required for the immediate task. | [Module 13: Security Habits](module-13-permissions-and-safety.md#good-security-habits) |
| <a id="env-file"></a>**`.env` File** | A configuration file used in software projects to store database passwords, API tokens, and secret keys; should always be denied. | [Module 13: Sensitive Files](module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files) |

---

<div class="hero-actions">
  <a href="../worked-example/" class="md-button">← Worked Example: Asha's Report</a>
  <a href="../faq/" class="md-button md-button--primary">Next: Part B Frequently Asked Questions →</a>
</div>
