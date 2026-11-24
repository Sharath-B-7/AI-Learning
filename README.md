# Claude Learning Hub
## Internal AI Learning Documentation Portal

**Claude Learning Hub** is the official company internal documentation and learning portal for artificial intelligence. Sourced strictly from the company's approved foundational curriculum (**Part A — AI Fundamentals** and **Part B — Claude Code & Agentic Systems**), this portal provides a structured, plain-English roadmap to understanding AI assistants, mastering Large Language Models, and safely deploying AI systems in workplace operations.

---

## 🛠️ Technology Stack

- **Documentation Engine:** [MkDocs](https://www.mkdocs.org/) (Python 3.14+)
- **Theme:** [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- **Visualizations:** Interactive D3.js Sunburst Knowledge Map (`docs/assets/javascripts/map.js` & `d3.v7.min.js`)
- **Video System:** HTML5 Video Player with local MP4 support and automated placeholder empty states
- **Diagrams:** Native Mermaid integration (`pymdownx.superfences`)
- **Styling:** Custom enterprise design system (`docs/assets/stylesheets/extra.css`)

---

## 🎬 Video-First Module System

Every module page features an integrated video-first layout:
1. **Module Title & Metadata Badges**
2. **Video Player Section** (HTML5 responsive 16:9 player or "Video will be available soon" placeholder)
3. **Original Educational Documentation Content**

### How to Add Local MP4 Educational Videos:

1. **Upload your video file:**
   Place your `.mp4` file directly into:
   ```
   docs/assets/videos/
   ```
   *(e.g., `module-01.mp4`, `module-02.mp4`, etc.)*

2. **Map the video to its module:**
   Open [`docs/assets/javascripts/video-config.js`](file:///home/sharath/Documentation_Claude/docs/assets/javascripts/video-config.js) and map the filename:
   ```javascript
   window.AI_MASTERCLASS_VIDEOS = {
     "module-01": "module-01.mp4", // Map your uploaded video
     "module-02": null,            // Unconfigured modules display "Video will be available soon"
     ...
   };
   ```

3. **Rebuild or serve:**
   ```bash
   mkdocs build --strict
   ```

---

## 🚀 Local Development Setup

### 1. Activate Virtual Environment
```bash
cd /home/sharath/Documentation_Claude
source .venv/bin/activate
```

### 2. Run the Development Server
```bash
mkdocs serve
```
Access the portal at: **`http://127.0.0.1:8000`**

### 3. Build for Production (Strict Mode)
```bash
mkdocs build --strict
```

---

## 📂 Portal Curriculum Structure

```
docs/
├── index.md                                      # Claude Learning Hub Homepage & Sunburst Map
├── assets/
│   ├── javascripts/
│   │   ├── d3.v7.min.js                          # Local standalone D3.js bundle (v7.9.2)
│   │   ├── map.js                                # Interactive Sunburst Knowledge Map
│   │   ├── video-config.js                       # Central mapping for module MP4 videos
│   │   └── video-player.js                       # HTML5 video loader & placeholder handler
│   ├── stylesheets/
│   │   └── extra.css                             # Theme styling & 16:9 video layout
│   └── videos/                                   # Local MP4 educational video storage
└── foundations/
    ├── part-a/                                   # Part A — AI Fundamentals
    │   ├── index.md                              # Track Overview
    │   ├── module-01-what-is-ai.md               # Module 1 + Video Section
    │   ├── module-02-what-is-an-llm.md           # Module 2 + Video Section
    │   ├── module-03-how-llms-work.md            # Module 3 + Video Section
    │   ├── module-04-strengths-limits-trust.md   # Module 4 + Video Section
    │   ├── module-05-meet-claude.md              # Module 5 + Video Section
    │   ├── glossary.md                           # Plain English Vocabulary
    │   ├── faq.md                                # Common Questions
    │   └── learning-checklist.md                 # Competency Self-Assessment
    └── part-b/                                   # Part B — Claude Code & Agentic Systems
        ├── index.md                              # Track Overview
        ├── module-06-types-of-models.md          # Module 6 + Video Section
        ├── module-07-context.md                  # Module 7 + Video Section
        ├── module-08-prompting.md                # Module 8 + Video Section
        ├── module-09-memory.md                   # Module 9 + Video Section
        ├── module-10-skills.md                   # Module 10 + Video Section
        ├── module-11-tools-and-harness.md        # Module 11 + Video Section
        ├── module-12-agents.md                   # Module 12 + Video Section
        ├── module-13-permissions-and-safety.md   # Module 13 + Video Section
        ├── worked-example.md                     # Asha's Worked Example
        ├── glossary.md                           # System Vocabulary
        ├── faq.md                                # Technical FAQs
        └── learning-checklist.md                 # System Competency Checklist
```

---

## 🔒 Governance & Attribution

Authored and maintained by the **Tactive AI Team**. All content is derived strictly from the company's approved internal training documents: `AI_Training_Part_A_Fundamentals.docx` and `AI_Training_Part_B_Concepts.docx`.
# AI-Learning-Documentation
