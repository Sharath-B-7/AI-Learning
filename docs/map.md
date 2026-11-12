# Interactive Documentation Map

<div class="doc-header-badges">
  <span class="badge badge-surface">Navigation: Visual & Tabular Explorer</span>
  <span class="badge badge-level">All 16 Categories</span>
  <span class="badge badge-verified">Status: Interactive Sunburst UI</span>
</div>

Explore the complete **AI MASTERCLASS** curriculum visually. Click any ring segment in the radial wheel to inspect that domain or drill down into subcategories. You can click the center circle or the **Reset Overview** button to navigate back up to the top level.

---

<div class="map-toolbar">
  <button id="map-reset-btn" class="map-btn" type="button" aria-label="Reset Map to Full Overview">
    ↺ Reset to Full Overview
  </button>
  <span class="map-hint">💡 <strong>Interactive Navigation:</strong> Click any segment to zoom in or inspect details. Click the center circle or use keyboard <kbd>Tab</kbd> to explore.</span>
</div>

<div class="map-layout">
  <!-- Sunburst SVG Chart Container -->
  <div class="map-chart-card">
    <div id="sunburst-svg-container" class="sunburst-container"></div>
  </div>

  <!-- Dynamic Detail Side Panel (Inspired by Reference Video) -->
  <div id="sunburst-detail-panel" class="map-detail-panel" aria-live="polite">
    <div class="map-panel-header">
      <span class="map-panel-tag">LAYER SPECIFICATION</span>
      <div class="map-breadcrumb">AI MASTERCLASS</div>
      <h2 class="map-item-title">AI MASTERCLASS</h2>
      <span class="badge badge-level map-item-level">All Levels (Beginner to Developer)</span>
    </div>

    <p class="map-item-desc">
      Select any ring in the radial diagram to preview its core practical curriculum, prerequisites, and learning objectives.
    </p>

    <div class="map-topics-box">
      <h4>Included Guides & Topics</h4>
      <ul class="map-topics-list">
        <li>Foundations & Everyday Writing</li>
        <li>Learning, Research & Document Intelligence</li>
        <li>Interactive Artifacts & Persistent Projects</li>
        <li>Workplace Playbooks & Claude Code CLI</li>
        <li>Anthropic API, MCP & Systems Automation</li>
      </ul>
    </div>

    <div class="map-actions">
      <a href="../" class="map-item-link md-button md-button--primary">Open Category Guide →</a>
    </div>

    <div class="map-footer-note">
      <small>Click a ring to inspect subcategories; click the center circle to go back up.</small>
    </div>
  </div>
</div>

---

## Complete Curriculum Index

For keyboard accessibility and fast scanning, here is the complete tabular index of the foundational training tracks and all 16 learning modules:

| Domain | Category Code & Title | Practical Level | Key Capabilities Mastered | Action |
| :--- | :--- | :--- | :--- | :--- |
| **Company Training** | **[Part A: AI Fundamentals](foundations/part-a/index.md)** | Modules 1 – 5 | Core concepts, LLM mechanics, next-token prediction, trust stakes, first task | [Open Track →](foundations/part-a/index.md) |
| **Company Training** | **[Part B: System Concepts](foundations/part-b/index.md)** | Modules 6 – 13 | Model tiers, context desks, memory, skills, harness, agents, permissions | [Open Track →](foundations/part-b/index.md) |
| **Foundations** | **[01. Start Here](01-start-here/index.md)** | L1 – L4 | Role-tailored paths for General Users, Researchers, Business, Creators & Developers | [Open Guide →](01-start-here/index.md) |
| **Foundations** | **[02. Getting Started](02-getting-started/index.md)** | L1 (Beginner) | Account creation, Free vs Pro vs Team plans, mobile voice dictation & privacy | [Open Guide →](02-getting-started/index.md) |
| **Foundations** | **[03. Models & Selection](03-models-and-selection/index.md)** | L1 – L2 | Claude 3.7 Sonnet, 3.5 Sonnet, 3.5 Haiku, 3 Opus & 200K context limits | [Open Guide →](03-models-and-selection/index.md) |
| **Foundations** | **[04. Writing & Comms](04-writing-and-communication/index.md)** | L1 – L2 | Drafting emails, proofreading, built-in styles & custom voice cloning | [Open Guide →](04-writing-and-communication/index.md) |
| **Intel & Data** | **[05. Learning & Research](05-learning-and-research/index.md)** | L1 – L3 | Socratic tutoring, 5-level concept breakdowns, web search & deep research | [Open Guide →](05-learning-and-research/index.md) |
| **Intel & Data** | **[06. Documents & Files](06-documents-and-files/index.md)** | L2 – L3 | PDF intelligence, multi-document cross-referencing & OCR note scanning | [Open Guide →](06-documents-and-files/index.md) |
| **Intel & Data** | **[07. Data Analysis](07-data-analysis/index.md)** | L2 – L3 | Built-in code sandbox, spreadsheet wrangling, SaaS metrics & automated charts | [Open Guide →](07-data-analysis/index.md) |
| **Creation** | **[08. Visual Artifacts](08-visual-and-interactive-artifacts/index.md)** | L1 – L3 | Interactive React prototypes, Mermaid diagrams, custom SVGs & public links | [Open Guide →](08-visual-and-interactive-artifacts/index.md) |
| **Creation** | **[09. Projects & Knowledge](09-projects-and-knowledge-bases/index.md)** | L2 – L3 | 200K persistent knowledge bases, custom instructions & team collaboration | [Open Guide →](09-projects-and-knowledge-bases/index.md) |
| **Creation** | **[10. Prompt Engineering](10-prompt-engineering/index.md)** | L2 – L3 | Anthropic XML tags (`<instructions>`, `<context>`), few-shot & chain-of-thought | [Open Guide →](10-prompt-engineering/index.md) |
| **Engineering** | **[11. Workplace Playbooks](11-workplace-and-industry-playbooks/index.md)** | L2 – L3 | Turnkey business workflows: Product PRDs, Operations, Marketing & Legal | [Open Guide →](11-workplace-and-industry-playbooks/index.md) |
| **Engineering** | **[12. Claude Code CLI](12-claude-code-and-developers/index.md)** | L4 (Developer) | Terminal agent (`@anthropic-ai/claude-code`), `CLAUDE.md`, test loops & Git | [Open Guide →](12-claude-code-and-developers/index.md) |
| **Engineering** | **[13. Model Context Protocol](13-model-context-protocol-mcp/index.md)** | L4 (Developer) | Desktop MCP config, Postgres/GitHub connectors & custom stdio/SSE servers | [Open Guide →](13-model-context-protocol-mcp/index.md) |
| **API & Systems**| **[14. Building with API](14-building-with-claude-api/index.md)** | L4 (Developer) | Messages API, Prompt Caching (90% off), Claude 3.7 Thinking & Message Batches | [Open Guide →](14-building-with-claude-api/index.md) |
| **API & Systems**| **[15. Real-World Projects](15-real-world-projects/index.md)** | L2 – L4 | End-to-end capstones: Research Engine, Budget App, PR Bot & SOP Hub | [Open Guide →](15-real-world-projects/index.md) |
| **API & Systems**| **[16. Troubleshooting](16-reference-and-troubleshooting/index.md)** | L1 – L4 | Rate limits, rolling 5-hour caps, 429/529 error recovery & master FAQ | [Open Guide →](16-reference-and-troubleshooting/index.md) |
