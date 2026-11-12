/**
 * AI MASTERCLASS — Interactive Sunburst Knowledge Map
 * Powered by local D3.js (v7.9.2)
 * Sourced strictly from Part A (Fundamentals) and Part B (Systems Concepts)
 */

(function () {
  'use strict';

  // 88-node curriculum hierarchy matching Part A & Part B documentation
  const curriculumData = {
  "name": "AI MASTERCLASS",
  "shortName": "AI MASTERCLASS",
  "id": "root",
  "category": "Portal Overview",
  "url": "index.md",
  "description": "Internal AI Learning Documentation Portal \u2014 From Core Fundamentals to Advanced Systems.",
  "color": "#4f46e5",
  "children": [
    {
      "name": "Part A \u2014 AI Fundamentals",
      "shortName": "Part A: Fundamentals",
      "id": "part-a",
      "category": "Foundational Track",
      "url": "foundations/part-a/index.md",
      "description": "A beginner's guide to understanding what AI is, how Large Language Models work, what they do well, where they fail, and completing your first real work task.",
      "color": "#0ea5e9",
      "children": [
        {
          "name": "Module 1: What Is AI?",
          "shortName": "M1: What Is AI?",
          "id": "m1",
          "category": "Part A \u00b7 Module 1",
          "url": "foundations/part-a/module-01-what-is-ai.md",
          "description": "Broad definitions of AI, machine learning from examples, and how Claude acts as a general-purpose assistant.",
          "color": "#38bdf8",
          "children": [
            {
              "name": "How the Terms Fit Together",
              "shortName": "Terms Hierarchy",
              "id": "m1-terms",
              "category": "Module 1",
              "url": "foundations/part-a/module-01-what-is-ai.md#how-the-terms-fit-together",
              "description": "AI as the big umbrella, Machine Learning as learning from examples, and LLMs as language specialists.",
              "value": 1
            },
            {
              "name": "Why Is This Happening Now?",
              "shortName": "Why Now?",
              "id": "m1-why-now",
              "category": "Module 1",
              "url": "foundations/part-a/module-01-what-is-ai.md#why-is-this-happening-now",
              "description": "Three converging forces: massive text datasets, powerful computing hardware, and neural network advances.",
              "value": 1
            },
            {
              "name": "A Useful Way to Think About Claude",
              "shortName": "New Colleague",
              "id": "m1-analogy",
              "category": "Module 1",
              "url": "foundations/part-a/module-01-what-is-ai.md#a-useful-way-to-think-about-claude",
              "description": "The New Colleague analogy: knowledgeable and fast, but knowing nothing about your company until briefed.",
              "value": 1
            },
            {
              "name": "Common Myths",
              "shortName": "Common Myths",
              "id": "m1-myths",
              "category": "Module 1",
              "url": "foundations/part-a/module-01-what-is-ai.md#common-myths",
              "description": "Debunking myths: Claude does not think like a human, is not like Google, and is not always right.",
              "value": 1
            },
            {
              "name": "Hands-On Exercise: Workday Tasks",
              "shortName": "Workday Tasks",
              "id": "m1-try-it",
              "category": "Module 1",
              "url": "foundations/part-a/module-01-what-is-ai.md#try-it",
              "description": "Identify three everyday workplace tasks involving writing, reading, or organizing information.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 2: What Is an LLM?",
          "shortName": "M2: What Is an LLM?",
          "id": "m2",
          "category": "Part A \u00b7 Module 2",
          "url": "foundations/part-a/module-02-what-is-an-llm.md",
          "description": "Large Language Models, predicting the next piece of text, tokens, and why answers differ each time.",
          "color": "#0284c7",
          "children": [
            {
              "name": "Next-Token Prediction",
              "shortName": "Next Token",
              "id": "m2-prediction",
              "category": "Module 2",
              "url": "foundations/part-a/module-02-what-is-an-llm.md#module-2-what-is-an-llm",
              "description": "How LLMs generate output by predicting the most likely next word or punctuation mark.",
              "value": 1
            },
            {
              "name": "Tokens & Context Ceilings",
              "shortName": "Tokens",
              "id": "m2-tokens",
              "category": "Module 2",
              "url": "foundations/part-a/module-02-what-is-an-llm.md#tokens",
              "description": "Text pieces that measure input volume, context limits, and computing costs.",
              "value": 1
            },
            {
              "name": "Why Answers Can Differ Each Time",
              "shortName": "Variance",
              "id": "m2-variance",
              "category": "Module 2",
              "url": "foundations/part-a/module-02-what-is-an-llm.md#why-answers-can-differ-each-time",
              "description": "Probabilistic token selection and why outputs naturally vary across identical prompts.",
              "value": 1
            },
            {
              "name": "Hands-On Exercise: Three Answers",
              "shortName": "Compare 3 Turns",
              "id": "m2-try-it",
              "category": "Module 2",
              "url": "foundations/part-a/module-02-what-is-an-llm.md#try-it",
              "description": "Ask Claude the same meeting question three times and evaluate what changed and what stayed constant.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 3: How LLMs Work",
          "shortName": "M3: How LLMs Work",
          "id": "m3",
          "category": "Part A \u00b7 Module 3",
          "url": "foundations/part-a/module-03-how-llms-work.md",
          "description": "The four steps from training to reply: pretraining, fine-tuning, knowledge cutoffs, and hallucinations.",
          "color": "#059669",
          "children": [
            {
              "name": "Step 1: Learning from Text (Pretraining)",
              "shortName": "1. Pretraining",
              "id": "m3-pretrain",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#the-four-steps",
              "description": "Reading vast libraries of text to absorb grammar, broad facts, and linguistic patterns.",
              "value": 1
            },
            {
              "name": "Step 2: Learning to Be Helpful (Fine-Tuning)",
              "shortName": "2. Fine-Tuning",
              "id": "m3-finetune",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#the-four-steps",
              "description": "Training with human feedback and constitutional guardrails to follow instructions politely.",
              "value": 1
            },
            {
              "name": "Steps 3 & 4: Answering Piece by Piece",
              "shortName": "3 & 4. Generation",
              "id": "m3-inference",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#the-four-steps",
              "description": "Converting your prompt into tokens and streaming the reply gradually across your screen.",
              "value": 1
            },
            {
              "name": "Knowledge Cutoff & Live Search",
              "shortName": "Cutoff Date",
              "id": "m3-cutoff",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#three-important-things-to-know",
              "description": "Static training datasets stop at a date; real-time facts require web search tools or supplied text.",
              "value": 1
            },
            {
              "name": "Hallucination & Confident Errors",
              "shortName": "Hallucinations",
              "id": "m3-hallucination",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#three-important-things-to-know",
              "description": "Why LLMs sometimes generate plausible-sounding falsehoods with complete confidence.",
              "value": 1
            },
            {
              "name": "Hands-On Exercise: Company Knowledge",
              "shortName": "Company Test",
              "id": "m3-try-it",
              "category": "Module 3",
              "url": "foundations/part-a/module-03-how-llms-work.md#try-it",
              "description": "Test Claude with internal company terms to observe how it handles information outside its training.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 4: Strengths, Limits & Trust",
          "shortName": "M4: Strengths & Trust",
          "id": "m4",
          "category": "Part A \u00b7 Module 4",
          "url": "foundations/part-a/module-04-strengths-limits-trust.md",
          "description": "Where AI excels, where it needs care, uneven skill, the Trust Rule, and corporate privacy basics.",
          "color": "#10b981",
          "children": [
            {
              "name": "What AI Is Good At",
              "shortName": "AI Strengths",
              "id": "m4-strengths",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#what-ai-is-good-at",
              "description": "Drafting, rewriting, summarizing, simplifying technical topics, and organizing messy notes.",
              "value": 1
            },
            {
              "name": "Where It Needs Care",
              "shortName": "Care Areas",
              "id": "m4-limits",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#where-it-needs-care",
              "description": "Exact calculations, dates, quotes, recent news, and offline documents it cannot see.",
              "value": 1
            },
            {
              "name": "Uneven Skill",
              "shortName": "Uneven Skill",
              "id": "m4-uneven",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#uneven-skill",
              "description": "Competence in one complex area does not guarantee accuracy in seemingly simple tasks.",
              "value": 1
            },
            {
              "name": "The Trust Rule: Stakes Assessment",
              "shortName": "Trust Rule",
              "id": "m4-trust-rule",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#the-trust-rule-check-in-proportion-to-the-stakes",
              "description": "Check in proportion to stakes: quick read for drafts, rigorous review for legal and finance.",
              "value": 1
            },
            {
              "name": "Privacy & Data Protection Basics",
              "shortName": "Privacy Basics",
              "id": "m4-privacy",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#privacy-basics",
              "description": "Never paste passwords, customer PII, or confidential secrets into conversational prompts.",
              "value": 1
            },
            {
              "name": "Hands-On Exercise: Finding Mistakes",
              "shortName": "Find Failure",
              "id": "m4-try-it",
              "category": "Module 4",
              "url": "foundations/part-a/module-04-strengths-limits-trust.md#try-it",
              "description": "Intentionally give Claude a tricky riddle or calculation to observe failure modes firsthand.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 5: Meet Claude",
          "shortName": "M5: Meet Claude",
          "id": "m5",
          "category": "Part A \u00b7 Module 5",
          "url": "foundations/part-a/module-05-meet-claude.md",
          "description": "Claude model tiers, ways to access (App, CLI, API), chat vs. agent, and the 3 request habits.",
          "color": "#14b8a6",
          "children": [
            {
              "name": "Different Model Sizes",
              "shortName": "Model Sizes",
              "id": "m5-sizes",
              "category": "Module 5",
              "url": "foundations/part-a/module-05-meet-claude.md#different-models",
              "description": "Smaller models for speed and economy; larger models for deep multi-step reasoning.",
              "value": 1
            },
            {
              "name": "Ways to Use Claude (App, CLI, API)",
              "shortName": "Ways to Use",
              "id": "m5-surfaces",
              "category": "Module 5",
              "url": "foundations/part-a/module-05-meet-claude.md#ways-to-use-claude",
              "description": "Claude App for everyday work, Claude Code for terminal developers, and API for systems.",
              "value": 1
            },
            {
              "name": "Chat vs. Agent",
              "shortName": "Chat vs Agent",
              "id": "m5-chat-agent",
              "category": "Module 5",
              "url": "foundations/part-a/module-05-meet-claude.md#chat-vs-agent",
              "description": "Single-turn conversational answers vs. autonomous multi-step execution with tools.",
              "value": 1
            },
            {
              "name": "Three Habits for Good Results",
              "shortName": "3 Habits",
              "id": "m5-habits",
              "category": "Module 5",
              "url": "foundations/part-a/module-05-meet-claude.md#three-habits-for-good-results",
              "description": "Give Context, State the Goal, and Ask for the Format in every prompt.",
              "value": 1
            },
            {
              "name": "Hands-On Exercise: First Work Task",
              "shortName": "First Work Task",
              "id": "m5-try-it",
              "category": "Module 5",
              "url": "foundations/part-a/module-05-meet-claude.md#try-it-your-first-real-work-task",
              "description": "Prompt Claude for a real workplace task using the Three Habits and check output using the Trust Rule.",
              "value": 1
            }
          ]
        },
        {
          "name": "Part A Reference & Tools",
          "shortName": "Part A Reference",
          "id": "part-a-ref",
          "category": "Part A \u00b7 Reference",
          "url": "foundations/part-a/glossary.md",
          "description": "Plain-English vocabulary, common question FAQs, and competency learning checklist.",
          "color": "#06b6d4",
          "children": [
            {
              "name": "Glossary: AI Terms in Plain English",
              "shortName": "Plain Glossary",
              "id": "ref-glossary-a",
              "category": "Part A Reference",
              "url": "foundations/part-a/glossary.md",
              "description": "Plain definitions of AI, machine learning, model, LLM, token, hallucination, and cutoff.",
              "value": 1
            },
            {
              "name": "Frequently Asked Questions",
              "shortName": "Common FAQs",
              "id": "ref-faq-a",
              "category": "Part A Reference",
              "url": "foundations/part-a/faq.md",
              "description": "15 direct answers on intelligence, different answers, math limitations, and safety.",
              "value": 1
            },
            {
              "name": "What You Should Be Able to Do",
              "shortName": "Part A Checklist",
              "id": "ref-checklist-a",
              "category": "Part A Reference",
              "url": "foundations/part-a/learning-checklist.md",
              "description": "Checklist of 9 core competencies mastered after completing Part A Fundamentals.",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "Part B \u2014 AI Concepts for Systems",
      "shortName": "Part B: Concepts",
      "id": "part-b",
      "category": "Systems Track",
      "url": "foundations/part-b/index.md",
      "description": "The eight core architectural building blocks: model tiers, context desks, memory, skills, harnesses, autonomous agents, and safety permissions.",
      "color": "#6366f1",
      "children": [
        {
          "name": "Module 6: Types of Models",
          "shortName": "M6: Types of Models",
          "id": "m6",
          "category": "Part B \u00b7 Module 6",
          "url": "foundations/part-b/module-06-types-of-models.md",
          "description": "Small, medium, and large model tiers; standard vs. reasoning models; multimodal vision capabilities.",
          "color": "#818cf8",
          "children": [
            {
              "name": "Model Tiers: Small, Medium, Large",
              "shortName": "Model Tiers",
              "id": "m6-tiers",
              "category": "Module 6",
              "url": "foundations/part-b/module-06-types-of-models.md#model-tiers-small-medium-and-large",
              "description": "Matching task complexity: Haiku for quick edits, Sonnet for everyday balance, Opus for deep complexity.",
              "value": 1
            },
            {
              "name": "Standard vs. Reasoning Models",
              "shortName": "Reasoning Models",
              "id": "m6-reasoning",
              "category": "Module 6",
              "url": "foundations/part-b/module-06-types-of-models.md#standard-models-vs-thinking-reasoning-models",
              "description": "How extended thinking scratchpads improve complex logic, coding, and mathematical reasoning.",
              "value": 1
            },
            {
              "name": "Multimodal Models: Vision",
              "shortName": "Multimodal Vision",
              "id": "m6-multimodal",
              "category": "Module 6",
              "url": "foundations/part-b/module-06-types-of-models.md#multimodal-models-models-that-can-see",
              "description": "Inspecting whiteboard photos, scanned PDF forms, diagrams, and financial charts.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 7: Context",
          "shortName": "M7: Context",
          "id": "m7",
          "category": "Part B \u00b7 Module 7",
          "url": "foundations/part-b/module-07-context.md",
          "description": "The desk metaphor, context window limits, and why clean high-signal context beats cluttered noise.",
          "color": "#7c3aed",
          "children": [
            {
              "name": "The Desk Analogy",
              "shortName": "The Desk",
              "id": "m7-desk",
              "category": "Module 7",
              "url": "foundations/part-b/module-07-context.md#the-desk-analogy",
              "description": "Claude only knows what sits on its physical desk: prompt, chat history, files, and tool results.",
              "value": 1
            },
            {
              "name": "Desk Limit: The Context Window",
              "shortName": "Context Window",
              "id": "m7-window",
              "category": "Module 7",
              "url": "foundations/part-b/module-07-context.md#the-desk-has-a-size-limit-the-context-window",
              "description": "The 200,000 token boundary and avoiding attention dilution in meandering chats.",
              "value": 1
            },
            {
              "name": "Quality Matters More Than Quantity",
              "shortName": "Quality Context",
              "id": "m7-quality",
              "category": "Module 7",
              "url": "foundations/part-b/module-07-context.md#quality-matters-more-than-quantity",
              "description": "Pasting only the two pages that matter rather than an 80-page noisy PDF document.",
              "value": 1
            },
            {
              "name": "Context Management Practices",
              "shortName": "Desk Hygiene",
              "id": "m7-practices",
              "category": "Module 7",
              "url": "foundations/part-b/module-07-context.md#best-practices-for-context-management",
              "description": "Start fresh chats for new tasks, share relevant excerpts, and summarize before resetting.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 8: Prompting & Instructions",
          "shortName": "M8: Prompting",
          "id": "m8",
          "category": "Part B \u00b7 Module 8",
          "url": "foundations/part-b/module-08-prompting.md",
          "description": "The four parts of a good request (Situation, Goal, Background, Format) and few-shot examples.",
          "color": "#8b5cf6",
          "children": [
            {
              "name": "The Four Parts: S.G.B.F.",
              "shortName": "4 Parts: SGBF",
              "id": "m8-sgbf",
              "category": "Module 8",
              "url": "foundations/part-b/module-08-prompting.md#the-four-parts-of-a-good-request",
              "description": "Structure prompts with Situation, Goal, Background, and Format for reliable high-quality output.",
              "value": 1
            },
            {
              "name": "Few-Shot Prompting: Golden Samples",
              "shortName": "Few-Shot Examples",
              "id": "m8-few-shot",
              "category": "Module 8",
              "url": "foundations/part-b/module-08-prompting.md#five-practical-prompting-techniques",
              "description": "Providing 1 or 2 concrete sample outputs teaches tone and structure faster than explanations.",
              "value": 1
            },
            {
              "name": "Explicit Negative Boundaries",
              "shortName": "Negative Rules",
              "id": "m8-negative",
              "category": "Module 8",
              "url": "foundations/part-b/module-08-prompting.md#five-practical-prompting-techniques",
              "description": "Telling Claude what NOT to do: no filler phrases, no bullet points, or no corporate jargon.",
              "value": 1
            },
            {
              "name": "Sequential Steps & Interview Mode",
              "shortName": "Steps & Interview",
              "id": "m8-techniques",
              "category": "Module 8",
              "url": "foundations/part-b/module-08-prompting.md#five-practical-prompting-techniques",
              "description": "Breaking complex tasks into sequence and having Claude interview you to uncover missing details.",
              "value": 1
            },
            {
              "name": "Iterative Refinement",
              "shortName": "Iterative Turns",
              "id": "m8-iterate",
              "category": "Module 8",
              "url": "foundations/part-b/module-08-prompting.md#five-practical-prompting-techniques",
              "description": "Treating initial output as a rough draft and shaping it across multi-turn feedback.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 9: Memory",
          "shortName": "M9: Memory",
          "id": "m9",
          "category": "Part B \u00b7 Module 9",
          "url": "foundations/part-b/module-09-memory.md",
          "description": "Short-term vs. saved memory, Project instructions, CLAUDE.md, and what to store vs. never store.",
          "color": "#a855f7",
          "children": [
            {
              "name": "Claude Starts with a Blank Slate",
              "shortName": "Blank Slate",
              "id": "m9-blank-slate",
              "category": "Module 9",
              "url": "foundations/part-b/module-09-memory.md#claude-does-not-remember-by-default",
              "description": "Chats are independent by default; memory is explicitly configured persistence.",
              "value": 1
            },
            {
              "name": "Short-Term vs. Saved Memory",
              "shortName": "Saved Memory",
              "id": "m9-types",
              "category": "Module 9",
              "url": "foundations/part-b/module-09-memory.md#short-term-vs-saved-persistent-memory",
              "description": "Session desk vs. standing notes prepended automatically at the start of each new conversation.",
              "value": 1
            },
            {
              "name": "Three Ways Saved Memory Is Implemented",
              "shortName": "Implementation",
              "id": "m9-impl",
              "category": "Module 9",
              "url": "foundations/part-b/module-09-memory.md#three-ways-saved-memory-is-implemented",
              "description": "App preference memory, Claude Project Instructions, and CLAUDE.md repository files.",
              "value": 1
            },
            {
              "name": "What to Store vs. Never Store",
              "shortName": "Store vs Never",
              "id": "m9-rules",
              "category": "Module 9",
              "url": "foundations/part-b/module-09-memory.md#what-to-store-vs-what-never-to-store",
              "description": "Store job roles, date formats, and preferences; never store passwords, client PII, or secrets.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 10: Skills",
          "shortName": "M10: Skills",
          "id": "m10",
          "category": "Part B \u00b7 Module 10",
          "url": "foundations/part-b/module-10-skills.md",
          "description": "Reusable recipe cards, skill vs. prompt, context conservation, and when to create a skill.",
          "color": "#d946ef",
          "children": [
            {
              "name": "What a Skill Is: Reusable Recipe",
              "shortName": "Recipe Card",
              "id": "m10-what-is",
              "category": "Module 10",
              "url": "foundations/part-b/module-10-skills.md#what-a-skill-is",
              "description": "Standardized instructions, templates, tone guidelines, and quality completion checklists.",
              "value": 1
            },
            {
              "name": "Skill vs. One-Off Prompt",
              "shortName": "Skill vs Prompt",
              "id": "m10-comparison",
              "category": "Module 10",
              "url": "foundations/part-b/module-10-skills.md#skill-vs-prompt",
              "description": "Ad-hoc typing vs. write-once, test-once, share-everywhere team standardization.",
              "value": 1
            },
            {
              "name": "Context Conservation Efficiency",
              "shortName": "Efficiency",
              "id": "m10-efficiency",
              "category": "Module 10",
              "url": "foundations/part-b/module-10-skills.md#how-skills-stay-efficient-context-conservation",
              "description": "Loading skill instructions onto the desk only when their trigger task is requested.",
              "value": 1
            },
            {
              "name": "When to Turn a Prompt into a Skill",
              "shortName": "When to Make",
              "id": "m10-when",
              "category": "Module 10",
              "url": "foundations/part-b/module-10-skills.md#when-to-turn-a-prompt-into-a-skill",
              "description": "Create skills when repeating tasks >3 times, enforcing compliance, or sharing across teams.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 11: Tools & The Harness",
          "shortName": "M11: Tools & Harness",
          "id": "m11",
          "category": "Part B \u00b7 Module 11",
          "url": "foundations/part-b/module-11-tools-and-harness.md",
          "description": "Tools as the model's hands, the harness as the workshop, and connectors to external software.",
          "color": "#ec4899",
          "children": [
            {
              "name": "Tools: The Model's Hands",
              "shortName": "Model Hands",
              "id": "m11-tools",
              "category": "Module 11",
              "url": "foundations/part-b/module-11-tools-and-harness.md#tools-the-models-hands",
              "description": "External software functions: file readers, calculators, live web search, and API calls.",
              "value": 1
            },
            {
              "name": "The Harness: Complete Workshop",
              "shortName": "The Harness",
              "id": "m11-harness",
              "category": "Module 11",
              "url": "foundations/part-b/module-11-tools-and-harness.md#the-harness-the-complete-workshop",
              "description": "The software wrapper providing tools, running execution loops, and enforcing permissions.",
              "value": 1
            },
            {
              "name": "Why Behavior Differs Across Places",
              "shortName": "App vs CLI",
              "id": "m11-diff",
              "category": "Module 11",
              "url": "foundations/part-b/module-11-tools-and-harness.md#the-harness-the-complete-workshop",
              "description": "Identical underlying model brain operating inside different tool harnesses (App vs. CLI).",
              "value": 1
            },
            {
              "name": "Connectors to Enterprise Apps",
              "shortName": "Connectors",
              "id": "m11-connectors",
              "category": "Module 11",
              "url": "foundations/part-b/module-11-tools-and-harness.md#connectors",
              "description": "Bridges securely linking Claude to Google Drive, Slack, GitHub, Jira, and Microsoft 365.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 12: Agents",
          "shortName": "M12: Agents",
          "id": "m12",
          "category": "Part B \u00b7 Module 12",
          "url": "foundations/part-b/module-12-agents.md",
          "description": "Chat vs. agent, the Think-Act-Check loop, setting bounded goals, and subagents for big jobs.",
          "color": "#3b82f6",
          "children": [
            {
              "name": "Chat vs. Agent",
              "shortName": "Chat vs Agent",
              "id": "m12-chat-vs-agent",
              "category": "Module 12",
              "url": "foundations/part-b/module-12-agents.md#chat-vs-agent",
              "description": "Answering questions turn-by-turn vs. autonomously carrying out a multi-step objective.",
              "value": 1
            },
            {
              "name": "The Agent Loop: Think, Act, Check",
              "shortName": "Think Act Check",
              "id": "m12-loop",
              "category": "Module 12",
              "url": "foundations/part-b/module-12-agents.md#the-agent-loop-think-act-check",
              "description": "Plan next step, execute tool, verify result, and repeat until the goal is achieved.",
              "value": 1
            },
            {
              "name": "When to Use an Agent vs. Normal Chat",
              "shortName": "When to Use",
              "id": "m12-when",
              "category": "Module 12",
              "url": "foundations/part-b/module-12-agents.md#when-to-use-an-agent-vs-a-normal-chat",
              "description": "Agents for multi-file audits and multi-step tasks; normal chat for quick drafting and questions.",
              "value": 1
            },
            {
              "name": "Giving an Agent a Bounded Goal",
              "shortName": "Bounded Goals",
              "id": "m12-goals",
              "category": "Module 12",
              "url": "foundations/part-b/module-12-agents.md#giving-an-agent-a-good-goal",
              "description": "Clear finish lines, explicit operational limits, and mandatory human checkpoints.",
              "value": 1
            },
            {
              "name": "Subagents: Helpers for Large Jobs",
              "shortName": "Subagents",
              "id": "m12-subagents",
              "category": "Module 12",
              "url": "foundations/part-b/module-12-agents.md#subagents-helpers-for-large-jobs",
              "description": "Parallel helpers working on isolated context desks and returning summaries to the main agent.",
              "value": 1
            }
          ]
        },
        {
          "name": "Module 13: Permissions & Safety",
          "shortName": "M13: Permissions",
          "id": "m13",
          "category": "Part B \u00b7 Module 13",
          "url": "foundations/part-b/module-13-permissions-and-safety.md",
          "description": "Principle of least access, Allow/Ask/Deny settings, denying sensitive files (.env), and approvals.",
          "color": "#2563eb",
          "children": [
            {
              "name": "Principle of Least Access",
              "shortName": "Least Access",
              "id": "m13-least-access",
              "category": "Module 13",
              "url": "foundations/part-b/module-13-permissions-and-safety.md#why-permissions-matter-the-principle-of-least-access",
              "description": "Granting only the minimal tools and folder permissions required for the immediate job.",
              "value": 1
            },
            {
              "name": "Three Settings: Allow, Ask, Deny",
              "shortName": "Allow Ask Deny",
              "id": "m13-settings",
              "category": "Module 13",
              "url": "foundations/part-b/module-13-permissions-and-safety.md#the-three-permission-settings-allow-ask-deny",
              "description": "Allow safe reads, Ask for impactful changes, and Deny sensitive files permanently.",
              "value": 1
            },
            {
              "name": "Keeping Claude Away from Sensitive Files",
              "shortName": "Deny .env Files",
              "id": "m13-sensitive",
              "category": "Module 13",
              "url": "foundations/part-b/module-13-permissions-and-safety.md#keeping-claude-away-from-sensitive-files",
              "description": "Blocking credential files (.env), payroll folders, customer lists, and master contracts.",
              "value": 1
            },
            {
              "name": "Approval Prompts: Read Before Clicking",
              "shortName": "Approval Prompts",
              "id": "m13-approvals",
              "category": "Module 13",
              "url": "foundations/part-b/module-13-permissions-and-safety.md#approval-prompts-read-before-you-click",
              "description": "Inspecting tool execution prompts and proposed file modifications before clicking OK.",
              "value": 1
            },
            {
              "name": "Good Security Habits",
              "shortName": "Security Habits",
              "id": "m13-habits",
              "category": "Module 13",
              "url": "foundations/part-b/module-13-permissions-and-safety.md#good-security-habits",
              "description": "Start with ask permissions, deny secrets on day one, and work on git branches or copies.",
              "value": 1
            }
          ]
        },
        {
          "name": "Putting It All Together: Worked Example",
          "shortName": "Asha Worked Example",
          "id": "worked-example",
          "category": "Capstone Scenario",
          "url": "foundations/part-b/worked-example.md",
          "description": "Asha's weekly status report assistant demonstrating how all eight concepts work together in unison.",
          "color": "#1d4ed8",
          "children": [
            {
              "name": "Complete Architectural Picture",
              "shortName": "8-Idea Picture",
              "id": "we-arch",
              "category": "Worked Example",
              "url": "foundations/part-b/worked-example.md#the-complete-architectural-picture",
              "description": "Model, context, prompt, memory, skill, tools, agent, and permissions in one diagram.",
              "value": 1
            },
            {
              "name": "How Each Idea Appears in the Scenario",
              "shortName": "Scenario Walkthrough",
              "id": "we-scenario",
              "category": "Worked Example",
              "url": "foundations/part-b/worked-example.md#how-each-idea-appears-in-the-scenario",
              "description": "Step-by-step role of each architectural building block in Asha's weekly reporting workflow.",
              "value": 1
            },
            {
              "name": "Core Takeaways: Harmonious Integration",
              "shortName": "Core Takeaways",
              "id": "we-takeaways",
              "category": "Worked Example",
              "url": "foundations/part-b/worked-example.md#core-takeaways",
              "description": "Reliable AI workflows depend on the integration of all eight building blocks, not one magical prompt.",
              "value": 1
            }
          ]
        },
        {
          "name": "Part B Reference & Tools",
          "shortName": "Part B Reference",
          "id": "part-b-ref",
          "category": "Part B \u00b7 Reference",
          "url": "foundations/part-b/glossary.md",
          "description": "System vocabulary reference, technical FAQs, and competency learning checklist.",
          "color": "#4338ca",
          "children": [
            {
              "name": "Glossary: Part B Terms in Plain English",
              "shortName": "System Glossary",
              "id": "ref-glossary-b",
              "category": "Part B Reference",
              "url": "foundations/part-b/glossary.md",
              "description": "Plain definitions of model tiers, reasoning models, context desk, skills, harness, and permissions.",
              "value": 1
            },
            {
              "name": "Frequently Asked Questions",
              "shortName": "Concepts FAQ",
              "id": "ref-faq-b",
              "category": "Part B Reference",
              "url": "foundations/part-b/faq.md",
              "description": "19 detailed answers across model choice, context limits, skills, agents, and deny rules.",
              "value": 1
            },
            {
              "name": "What You Should Be Able to Do",
              "shortName": "Part B Checklist",
              "id": "ref-checklist-b",
              "category": "Part B Reference",
              "url": "foundations/part-b/learning-checklist.md",
              "description": "11-point self-assessment competency checklist across all eight architectural ideas.",
              "value": 1
            }
          ]
        }
      ]
    }
  ]
};

  // Helper: Resolve markdown URLs to MkDocs directory URLs with section anchors
  function resolveDocUrl(url) {
    if (!url) return '#';
    if (url === 'index.md') return './';
    const parts = url.split('#');
    const filePart = parts[0];
    const anchor = parts.length > 1 ? parts[1] : null;

    let resolved = filePart.replace(/(^|\/)index\.md$/, '');
    if (!resolved.endsWith('/') && !resolved.includes('.html')) {
      resolved = resolved.replace(/\.md$/, '/');
    }
    if (anchor) {
      resolved += '#' + anchor;
    }
    return resolved;
  }

  // Helper: Truncate text with ellipsis
  function truncate(str, maxLen) {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;
  }

  // Initialize the Sunburst Knowledge Map
  function initKnowledgeMap() {
    const container = document.getElementById('sunburst-svg-container');
    if (!container) return; // Exit if not on page with sunburst container

    if (typeof d3 === 'undefined') {
      console.error('AI MASTERCLASS: D3.js is required for Sunburst Knowledge Map.');
      container.innerHTML = '<p class="error-msg">Interactive Knowledge Map visualization requires D3.js.</p>';
      return;
    }

    // Clear previous render to prevent duplication across instant page navigations
    container.innerHTML = '';

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animDuration = prefersReducedMotion ? 0 : 750;

    // Dimensions
    const width = 800;
    const height = 800;
    const radius = width / 2; // 400
    const maxDepth = 4; // depth 0 (root), 1 (parts), 2 (modules/refs), 3 (subtopics)

    // Build D3 hierarchy and partition
    const root = d3.hierarchy(curriculumData)
      .sum(d => d.children ? 0 : 1);

    const partition = d3.partition()
      .size([2 * Math.PI, maxDepth]);

    partition(root);

    // Initial state
    root.each(d => d.current = d);
    let currentNode = root;

    // Color inheritance helper
    function getNodeColor(d) {
      if (d.data.color) return d.data.color;
      let ancestor = d.parent;
      while (ancestor) {
        if (ancestor.data.color) {
          // Adjust opacity or shade based on depth
          return ancestor.data.color;
        }
        ancestor = ancestor.parent;
      }
      return '#4f46e5';
    }

    // Arc generator
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.006))
      .padRadius(radius / 2)
      .innerRadius(d => Math.max(0, d.y0 * radius / maxDepth))
      .outerRadius(d => Math.max(0, d.y1 * radius / maxDepth - 1));

    // Visibility predicates
    function arcVisible(d) {
      return d.y1 <= maxDepth && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= maxDepth && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.05 && (d.x1 - d.x0) > 0.10;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius / maxDepth;
      return 'rotate(' + (x - 90) + ') translate(' + y + ',0) rotate(' + (x < 180 ? 0 : 180) + ')';
    }

    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', [-radius, -radius, width, height])
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'sunburst-svg')
      .attr('role', 'img')
      .attr('aria-label', 'Interactive AI Masterclass Sunburst Knowledge Map');

    const g = svg.append('g');

    // Central Circle (Center Hub)
    const centerGroup = g.append('g')
      .attr('class', 'sunburst-center-group')
      .attr('cursor', 'pointer');

    const centerCircle = centerGroup.append('circle')
      .attr('r', radius / maxDepth - 2)
      .attr('class', 'sunburst-center-circle');

    const centerTitle = centerGroup.append('text')
      .attr('class', 'sunburst-center-title')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3em');

    const centerSubtitle = centerGroup.append('text')
      .attr('class', 'sunburst-center-sub')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.3em');

    function updateCenterLabel(node) {
      if (node === root) {
        centerTitle.text('AI MASTERCLASS');
        centerSubtitle.text('All Tracks');
        centerCircle.attr('class', 'sunburst-center-circle is-root');
      } else {
        centerTitle.text(truncate(node.data.shortName || node.data.name, 16));
        centerSubtitle.text('↶ Click to Zoom Out');
        centerCircle.attr('class', 'sunburst-center-circle is-zoomed');
      }
    }

    updateCenterLabel(root);

    centerGroup.on('click', (event) => {
      event.stopPropagation();
      if (currentNode.parent) {
        zoomTo(currentNode.parent);
      }
    });

    // Tooltip reference
    const tooltip = document.getElementById('sunburst-tooltip');

    function showTooltip(event, d) {
      if (!tooltip) return;
      const category = d.data.category || (d.depth === 1 ? 'Track' : 'Module');
      tooltip.innerHTML = '<div class="tooltip-badge">' + category + '</div>' +
        '<div class="tooltip-title">' + d.data.name + '</div>' +
        '<div class="tooltip-desc">' + (d.data.description || '') + '</div>' +
        '<div class="tooltip-hint">Click segment to zoom in</div>';

      tooltip.classList.add('visible');
      positionTooltip(event);
    }

    function positionTooltip(event) {
      if (!tooltip) return;
      const card = container.closest('.sunburst-chart-card') || container;
      const cardRect = card.getBoundingClientRect();
      const left = event.clientX - cardRect.left + 14;
      const top = event.clientY - cardRect.top + 14;
      tooltip.style.left = Math.min(left, cardRect.width - 240) + 'px';
      tooltip.style.top = Math.max(10, Math.min(top, cardRect.height - 120)) + 'px';
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove('visible');
    }

    // Sunburst Arcs
    const path = g.append('g')
      .attr('class', 'sunburst-arcs')
      .selectAll('path')
      .data(root.descendants().slice(1)) // exclude root circle
      .join('path')
      .attr('class', d => 'sunburst-segment depth-' + d.depth)
      .attr('fill', d => getNodeColor(d))
      .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.90 : 0.78) : 0)
      .attr('pointer-events', d => arcVisible(d.current) ? 'all' : 'none')
      .attr('d', d => arc(d.current))
      .attr('tabindex', '0')
      .attr('role', 'button')
      .attr('aria-label', d => d.data.name);

    path
      .on('click', (event, d) => {
        event.stopPropagation();
        hideTooltip();
        zoomTo(d);
      })
      .on('mouseenter', (event, d) => {
        d3.select(event.currentTarget).attr('fill-opacity', 1.0);
        showTooltip(event, d);
      })
      .on('mousemove', (event) => {
        positionTooltip(event);
      })
      .on('mouseleave', (event, d) => {
        d3.select(event.currentTarget).attr('fill-opacity', arcVisible(d.current) ? (d.children ? 0.90 : 0.78) : 0);
        hideTooltip();
      })
      .on('keydown', (event, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          zoomTo(d);
        }
      });

    // Arc Labels
    const label = g.append('g')
      .attr('class', 'sunburst-labels')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
      .attr('class', d => 'sunburst-label depth-' + d.depth)
      .attr('dy', '0.35em')
      .attr('fill-opacity', d => +labelVisible(d.current))
      .attr('transform', d => labelTransform(d.current))
      .text(d => truncate(d.data.shortName || d.data.name, d.depth === 1 ? 20 : (d.depth === 2 ? 16 : 14)));

    // Zoom function with tweening
    function zoomTo(p) {
      currentNode = p;

      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(animDuration);

      path.transition(t)
        .tween('data', d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || arcVisible(d.target);
        })
        .attr('fill-opacity', d => arcVisible(d.target) ? (d.children ? 0.90 : 0.78) : 0)
        .attr('pointer-events', d => arcVisible(d.target) ? 'all' : 'none')
        .attrTween('d', d => () => arc(d.current));

      label.filter(function (d) {
        return +this.getAttribute('fill-opacity') || labelVisible(d.target);
      }).transition(t)
        .attr('fill-opacity', d => +labelVisible(d.target))
        .attrTween('transform', d => () => labelTransform(d.current));

      updateCenterLabel(p);
      updateDetailPanel(p);
      updateBreadcrumbs(p);
      updateControls(p);
    }

    // Detail Panel Update
    function updateDetailPanel(node) {
      const badge = document.getElementById('panel-category-badge');
      const title = document.getElementById('panel-title');
      const desc = document.getElementById('panel-description');
      const link = document.getElementById('panel-doc-link');
      const subtopicsBox = document.getElementById('panel-subtopics-box');
      const subtopicsHeading = document.getElementById('panel-subtopics-heading');
      const subtopicsList = document.getElementById('panel-subtopics-list');

      if (!title || !desc || !link) return;

      if (badge) {
        badge.textContent = node.data.category || (node.depth === 0 ? 'Portal Overview' : (node.depth === 1 ? 'Learning Track' : 'Module'));
      }

      title.textContent = node.data.name;
      desc.textContent = node.data.description || 'Explore the official documentation guide and practical workflows for this topic.';

      link.href = resolveDocUrl(node.data.url);
      link.innerHTML = 'Open Documentation → <span class="sr-only">for ' + node.data.name + '</span>';

      if (subtopicsBox && subtopicsList) {
        if (node.children && node.children.length > 0) {
          subtopicsBox.style.display = 'block';
          if (subtopicsHeading) {
            subtopicsHeading.textContent = node.depth === 0 ? 'Curriculum Tracks' : (node.depth === 1 ? 'Track Modules' : 'Key Concepts & Headings');
          }
          subtopicsList.innerHTML = '';
          node.children.forEach(child => {
            const li = document.createElement('li');
            li.className = 'panel-subtopic-item';
            
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'panel-subtopic-btn';
            btn.textContent = child.data.name;
            btn.title = 'Zoom into ' + child.data.name;
            btn.addEventListener('click', () => {
              zoomTo(child);
            });

            li.appendChild(btn);
            subtopicsList.appendChild(li);
          });
        } else {
          subtopicsBox.style.display = 'none';
        }
      }
    }

    // Breadcrumbs Update
    function updateBreadcrumbs(node) {
      const breadcrumbsEl = document.getElementById('sunburst-breadcrumbs');
      if (!breadcrumbsEl) return;

      const ancestors = node.ancestors().reverse(); // from root to node
      breadcrumbsEl.innerHTML = '';

      ancestors.forEach((anc, idx) => {
        const isLast = idx === ancestors.length - 1;
        const span = document.createElement('span');
        span.className = 'breadcrumb-item' + (isLast ? ' active' : '');
        span.textContent = anc.data.shortName || anc.data.name;
        span.setAttribute('data-id', anc.data.id || 'node');

        if (!isLast) {
          span.setAttribute('tabindex', '0');
          span.setAttribute('role', 'button');
          span.addEventListener('click', () => zoomTo(anc));
          span.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              zoomTo(anc);
            }
          });
        }

        breadcrumbsEl.appendChild(span);

        if (!isLast) {
          const sep = document.createElement('span');
          sep.className = 'breadcrumb-separator';
          sep.textContent = '>';
          sep.setAttribute('aria-hidden', 'true');
          breadcrumbsEl.appendChild(sep);
        }
      });
    }

    // Controls Update (Zoom out / Reset buttons)
    function updateControls(node) {
      const btnZoomOut = document.getElementById('sunburst-btn-zoomout');
      const btnReset = document.getElementById('sunburst-btn-reset');

      if (btnZoomOut) {
        btnZoomOut.disabled = !node.parent;
      }
      if (btnReset) {
        btnReset.disabled = (node === root);
      }
    }

    // Attach Toolbar Event Listeners
    const btnZoomOut = document.getElementById('sunburst-btn-zoomout');
    if (btnZoomOut) {
      btnZoomOut.onclick = () => {
        if (currentNode.parent) {
          zoomTo(currentNode.parent);
        }
      };
    }

    const btnReset = document.getElementById('sunburst-btn-reset');
    if (btnReset) {
      btnReset.onclick = () => {
        if (currentNode !== root) {
          zoomTo(root);
        }
      };
    }

    // Toggle Accessible Tree Outline
    const btnToggleTree = document.getElementById('sunburst-btn-toggle-tree');
    const treeContainer = document.getElementById('sunburst-accessible-tree');
    if (btnToggleTree && treeContainer) {
      btnToggleTree.onclick = () => {
        const isHidden = treeContainer.hasAttribute('hidden');
        if (isHidden) {
          treeContainer.removeAttribute('hidden');
          btnToggleTree.setAttribute('aria-expanded', 'true');
          btnToggleTree.classList.add('is-active');
        } else {
          treeContainer.setAttribute('hidden', '');
          btnToggleTree.setAttribute('aria-expanded', 'false');
          btnToggleTree.classList.remove('is-active');
        }
      };
    }

    // Build Accessible Outline Tree (Semantic HTML)
    buildAccessibleTree(curriculumData);

    // Initial Detail Panel and Breadcrumbs sync
    updateDetailPanel(root);
    updateBreadcrumbs(root);
    updateControls(root);
  }

  // Helper: Build accessible recursive tree navigation
  function buildAccessibleTree(data) {
    const treeContent = document.getElementById('sunburst-tree-content');
    if (!treeContent) return;

    function renderNode(node) {
      const li = document.createElement('li');
      li.className = 'accessible-tree-item';

      const link = document.createElement('a');
      link.href = resolveDocUrl(node.url);
      link.className = 'accessible-tree-link';
      link.textContent = node.name;

      if (node.description) {
        const desc = document.createElement('span');
        desc.className = 'accessible-tree-desc';
        desc.textContent = ' — ' + node.description;
        link.appendChild(desc);
      }

      li.appendChild(link);

      if (node.children && node.children.length > 0) {
        const details = document.createElement('details');
        details.className = 'accessible-tree-details';
        details.open = true;

        const summary = document.createElement('summary');
        summary.className = 'accessible-tree-summary';
        summary.appendChild(link.cloneNode(true));

        details.appendChild(summary);

        const ul = document.createElement('ul');
        ul.className = 'accessible-tree-list';
        node.children.forEach(child => {
          ul.appendChild(renderNode(child));
        });

        details.appendChild(ul);
        li.innerHTML = '';
        li.appendChild(details);
      }

      return li;
    }

    treeContent.innerHTML = '';
    const rootUl = document.createElement('ul');
    rootUl.className = 'accessible-tree-root-list';

    if (data.children) {
      data.children.forEach(child => {
        rootUl.appendChild(renderNode(child));
      });
    }

    treeContent.appendChild(rootUl);
  }

  // Hook into Material for MkDocs instant navigation (document$) or standard DOMContentLoaded
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      initKnowledgeMap();
    });
  } else {
    document.addEventListener('DOMContentLoaded', initKnowledgeMap);
  }
})();
