#!/usr/bin/env python3
import json
import os

BASE_DIR = "/home/sharath/Documentation_Claude"
SCRIPTS_DIR = os.path.join(BASE_DIR, "video-production/scripts")

with open(os.path.join(BASE_DIR, "video-production/audio-tools/part_b_synthesis_summary.json")) as f:
    summary = json.load(f)

sum_map = {item["mod"]: item for item in summary}

METADATA = {
    "06": {
        "title": "Types of Models",
        "badge": "Part B • Module 6",
        "scenes": [
            ("Scene 1: Introduction to Foundation Model Tiers", "912 frames (30.40s)", "Welcome to Module 6..."),
            ("Scene 2: Comparing Haiku, Sonnet, and Opus", "1135 frames (37.83s)", "Haiku is the smallest..."),
            ("Scene 3: Extended Thinking and Multimodal Inputs", "838 frames (27.93s)", "When working on complex algorithms..."),
            ("Scene 4: CLI Commands and Selection Strategy", "806 frames (26.87s)", "You can launch Claude Code...")
        ]
    },
    "07": {
        "title": "Context",
        "badge": "Part B • Module 7",
        "scenes": [
            ("Scene 1: The Physical Desk Analogy", "815 frames (27.17s)", "Welcome to Module 7..."),
            ("Scene 2: The Context Window & Clutter", "1026 frames (34.20s)", "However, this desk has a finite..."),
            ("Scene 3: Commands: @file, /context, /compact", "853 frames (28.43s)", "Claude Code gives you powerful commands..."),
            ("Scene 4: /clear & Clean Desk Checklist", "880 frames (29.33s)", "When starting a completely new feature...")
        ]
    },
    "08": {
        "title": "Prompting and Instructions",
        "badge": "Part B • Module 8",
        "scenes": [
            ("Scene 1: Chat vs. Terminal Directives", "789 frames (26.30s)", "Welcome to Module 8..."),
            ("Scene 2: The 4-Part Request Framework", "860 frames (28.67s)", "Every effective request in Claude Code..."),
            ("Scene 3: Weak vs. Strong Comparison", "1025 frames (34.17s)", "Consider this comparison..."),
            ("Scene 4: Shortcuts: Ctrl+J & /plan", "895 frames (29.83s)", "Inside Claude Code, use Shift plus Enter...")
        ]
    },
    "09": {
        "title": "Memory",
        "badge": "Part B • Module 9",
        "scenes": [
            ("Scene 1: The Blank Slate Dilemma", "819 frames (27.30s)", "Welcome to Module 9..."),
            ("Scene 2: CLAUDE.md Handbook & Hierarchy", "974 frames (32.47s)", "To solve this, Claude Code introduces..."),
            ("Scene 3: Windows Locations & Data Hygiene", "977 frames (32.57s)", "Your project CLAUDE.md should document..."),
            ("Scene 4: Living Documentation & Rules", "865 frames (28.83s)", "Treat CLAUDE.md as living documentation...")
        ]
    },
    "10": {
        "title": "Skills",
        "badge": "Part B • Module 10",
        "scenes": [
            ("Scene 1: Recipe Card Analogy & Skills vs Prompts", "941 frames (31.37s)", "Welcome to Module 10..."),
            ("Scene 2: SKILL.md Anatomy & Directory Layout", "917 frames (30.57s)", "Every skill lives inside a dedicated directory..."),
            ("Scene 3: Creating & Installing Skills", "881 frames (29.37s)", "You can create custom skills..."),
            ("Scene 4: Invoking Skills & Team Standards", "868 frames (28.93s)", "Claude Code automatically discovers installed skills...")
        ]
    },
    "11": {
        "title": "Tools and the Harness (MCP)",
        "badge": "Part B • Module 11",
        "scenes": [
            ("Scene 1: Connecting to External Systems", "972 frames (32.40s)", "Welcome to Module 11..."),
            ("Scene 2: Client-Host-Server & Transports", "968 frames (32.27s)", "MCP operates on a clean client-host-server architecture..."),
            ("Scene 3: Adding Servers & Real-World Integrations", "806 frames (26.87s)", "On Windows, you can add MCP servers..."),
            ("Scene 4: Security Boundaries & Read-Only Access", "1022 frames (34.07s)", "Because MCP servers grant access...")
        ]
    },
    "12": {
        "title": "Agents",
        "badge": "Part B • Module 12",
        "scenes": [
            ("Scene 1: Conversational AI to Autonomous Delegation", "884 frames (29.47s)", "Welcome to Module 12..."),
            ("Scene 2: The Agentic Reasoning Loop (Think, Act, Observe)", "882 frames (29.40s)", "At the core of every agent..."),
            ("Scene 3: Multi-Agent Workflows & Subagent Delegation", "876 frames (29.20s)", "For complex engineering projects..."),
            ("Scene 4: Human Oversight & Guardrails", "909 frames (30.30s)", "While agents provide extraordinary automation...")
        ]
    },
    "13": {
        "title": "Permissions and Safety",
        "badge": "Part B • Module 13",
        "scenes": [
            ("Scene 1: Why Terminal Security Matters", "948 frames (31.60s)", "Welcome to Module 13..."),
            ("Scene 2: The Three Permission Tiers (Allow, Ask, Deny)", "907 frames (30.23s)", "Every action in Claude Code falls under..."),
            ("Scene 3: settings.json & Shift+Tab Modes", "829 frames (27.63s)", "On Windows, project permissions are configured..."),
            ("Scene 4: Approval Vigilance & Masterclass Conclusion", "845 frames (28.17s)", "Always treat approval prompts with vigilance...")
        ]
    }
}

for mod, meta in METADATA.items():
    data = sum_map[mod]
    dur_str = f"{int(data['duration_s']//60)}m {data['duration_s']%60:.1f}s ({data['duration_s']:.2f}s)"

    doc = f"""# Video Production Script: Module {int(mod)} – {meta['title']}

**Module Number:** Module {int(mod)}
**Module Title:** {meta['title']}
**Top-Left Label:** `{meta['badge']}`
**Course Section:** Part B: Claude Code & Agentic Systems
**Audio Duration:** {dur_str}
**Total Frames (30fps):** {data['total_frames']}
**Word Count:** {data['words']} words
**Narration Voice:** `en-US-ChristopherNeural` (Rate: `+0%` - Natural Part A Pace)
**Speaking Pace:** {data['wpm']:.1f} WPM (Normalized to match Part A)

---

## Production Blueprint & Scene Breakdown

"""
    for title, dur, desc in meta['scenes']:
        doc += f"### {title}\n- **Duration:** {dur}\n\n"

    doc += f"""## Full Narration Script
{open(os.path.join(BASE_DIR, 'video-production/src/data', f'module{mod}_subtitles.json')).read()}
"""
    file_path = os.path.join(SCRIPTS_DIR, f"module-{mod}-script.md")
    with open(file_path, "w") as f:
        f.write(doc)
    print(f"Updated {file_path}")
