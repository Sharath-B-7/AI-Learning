# Commonly Asked Questions: Part A

<div class="doc-header-badges">
  <span class="badge badge-surface">Part A: AI Fundamentals</span>
  <span class="badge badge-level">Frequently Asked Questions</span>
  <span class="badge badge-verified">Attribution: Tactive AI Team</span>
</div>

---

## Understanding AI

### 1. Is AI actually intelligent?
It is very good at working with language, recognizing patterns, and synthesizing text, but it does not think, feel, or possess consciousness like a human. Treat it as a powerful, specialized assistant with clear strengths and defined limitations (see [Module 1: What Is AI?](module-01-what-is-ai.md)).

### 2. What's the difference between AI, machine learning, and an LLM?
- **AI** is the overarching field of computers doing "smart" tasks.
- **Machine Learning** is a technique within AI where the computer learns patterns from examples rather than programmed rules.
- **An LLM** is a specific type of machine learning model specialized in processing and writing human language.
*(See the hierarchy table in [Module 1: How the Terms Fit Together](module-01-what-is-ai.md#how-the-terms-fit-together)).*

### 3. Is Claude the same as Google?
No. Google is an indexed search engine that directs you to existing web pages created by humans. Claude writes an original response each time by predicting text based on what it learned and what you provide in your prompt (see [Module 1: Common Myths](module-01-what-is-ai.md#common-myths)).

---

## How It Behaves

### 4. Why does it give different answers to the same question?
An LLM chooses probabilistically among likely response tokens, so there is natural variation (see [Module 2: Tokens](module-02-what-is-an-llm.md#tokens)). You can use this to your advantage by asking Claude to provide multiple options or approaches (see [Module 2: Why Answers Differ](module-02-what-is-an-llm.md#why-answers-can-differ-each-time)).

### 5. Why does it sometimes make things up?
It generates text that sounds coherent and plausible, not text that has been cross-checked against a factual database. When it lacks information, it may bridge the gap with a plausible guess (a [hallucination](glossary.md#hallucination)). Always verify important claims (see [Module 3: Hallucination](module-03-how-llms-work.md#3-hallucination) and [Module 4: Where It Needs Care](module-04-strengths-limits-trust.md#where-it-needs-care)).

### 6. Does it know today's news?
Not on its own. Its base training stops at a [knowledge cutoff](glossary.md#knowledge-cutoff) date. It can only discuss current news if you enable the **Web Search** tool or paste the relevant news article into the conversation (see [Module 3: Knowledge Cutoff](module-03-how-llms-work.md#1-it-has-a-knowledge-cutoff)).

### 7. Does it remember my earlier chats?
By default, every new chat conversation starts with a completely blank slate. In [Part B, Module 9: Memory](../part-b/module-09-memory.md#persistent-memory-in-claude-code-claudemd), you will learn how **Saved Memory** and **Project Instructions** allow you to preserve persistent background across conversations.

### 8. Does it learn from what I type?
It does not update its permanent model weights during your conversation. It only uses what you have typed within that specific active session. For how your enterprise handles conversation retention, follow your company's official AI policy (see [Module 4: Privacy Basics](module-04-strengths-limits-trust.md#privacy-basics)).

---

## Using It Well

### 9. How do I know if an answer is correct?
Apply the **Trust Rule**: check in proportion to the stakes. A rough draft or brainstorm needs only a quick skim. Financial numbers, client emails, and executive reports require factual verification against original source files (see [Module 4: The Trust Rule](module-04-strengths-limits-trust.md#the-trust-rule-check-in-proportion-to-the-stakes)).

### 10. Why is it sometimes bad at math?
Standard language models predict the next character or word; they do not calculate like a spreadsheet (see [Module 4: Uneven Skill](module-04-strengths-limits-trust.md#uneven-skill)). Claude is far more reliable at math when it invokes its built-in code execution tool (see [Part B, Module 11: Tools & The Harness](../part-b/module-11-tools-and-harness.md#the-tools-you-will-see-on-screen)) or when you ask it to show its work step by step.

### 11. Do I need to write perfect prompts?
No. Simply state your **Context**, your **Goal**, and your desired **Format** (see [Module 5: Three Habits for Good Results](module-05-meet-claude.md#three-habits-for-good-results) and [Part B, Module 8: Prompting](../part-b/module-08-prompting.md#the-4-part-request-framework)). If the first answer is not quite right, reply and tell Claude what to adjust. Prompting is a dialogue, not a one-shot exam.

### 12. What should I do if the answer isn't what I wanted?
Do not start over from scratch. Reply in the same conversation with specific feedback, such as: *"Make this 50% shorter,"* *"Change the tone to formal,"* or *"You forgot to include the deadline from my original notes."*

### 13. Which model should I use?
Smaller, faster models for simple classification and edits; balanced models for everyday writing; and the most capable models (or models with thinking enabled) for complex logic and analysis. [Part B, Module 6: Types of Models](../part-b/module-06-types-of-models.md#the-idea-in-brief) covers model selection in detail.

---

## Safety

### 14. What can I paste into Claude?
Always follow your company data policy. By default: **never** paste passwords, API secrets, customer personal identifiable information (PII), or unapproved confidential contracts (see [Module 4: Privacy Basics](module-04-strengths-limits-trust.md#privacy-basics) and [Part B, Module 13: Permissions & Safety](../part-b/module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files-settingsjson)).

### 15. Can it be wrong and still sound sure?
Yes. Large language models frequently sound polite, authoritative, and completely confident even when generating factually incorrect details. Confidence is a style trait, not proof of correctness (see [Module 4: Uneven Skill](module-04-strengths-limits-trust.md#uneven-skill)).

---

<div class="hero-actions">
  <a href="../glossary/" class="md-button">← Part A Glossary</a>
  <a href="../learning-checklist/" class="md-button md-button--primary">Next: Part A Learning Checklist →</a>
</div>
