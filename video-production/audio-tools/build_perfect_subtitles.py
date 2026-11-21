#!/usr/bin/env python3
"""
Generate strictly synchronized SubtitleItem[] data for Part B Modules 06 to 13
Matches Part A visual design and technical schema.
"""

import json
import os

BASE_DIR = "/home/sharath/Documentation_Claude"
DATA_DIR = os.path.join(BASE_DIR, "video-production/src/data")

# Detailed configuration for each module
# We start with the actual sentence boundaries from the synthesized speech,
# and refine text, command syntax, and highlight keywords.

MODULE_SUBTITLE_DEFS = {
    "06": {
        "title": "Types of Models",
        "highlights": ["Haiku", "Sonnet", "Opus", "Anthropic", "/effort", "Extended", "Thinking", "multimodal", "--model", "/model"],
        "text_refinements": {
            "using the slash effort command": "using the /effort command",
            "with the model flag": "with the --model flag",
            "using the slash model command": "using the /model command",
        }
    },
    "07": {
        "title": "Context",
        "highlights": ["context", "window", "tokens", "@", "/context", "/compact", "/clear"],
        "text_refinements": {
            "Use the at symbol followed by a file path": "Use the @ symbol followed by a file path",
            "Run the slash context command": "Run the /context command",
            "use slash compact": "use /compact",
            "run slash clear": "run /clear",
        }
    },
    "08": {
        "title": "Prompting and Instructions",
        "highlights": ["Situation", "Goal", "Background", "Format", "Shift+Enter", "Ctrl+J", "/plan", "@Q3-report.pdf"],
        "text_refinements": {
            "using the at symbol": "using the @ symbol",
            "Summarize at Q3-report.pdf": "Summarize @Q3-report.pdf",
            "use Shift plus Enter or Control plus J": "use Shift+Enter or Ctrl+J",
            "always prefix your request with slash plan": "always prefix your request with /plan",
        }
    },
    "09": {
        "title": "Memory",
        "highlights": ["CLAUDE.md", "Global", "Project", "Directory", "memory", "handbook"],
        "text_refinements": {}
    },
    "10": {
        "title": "Skills",
        "highlights": ["Skills", "SKILL.md", "YAML", "frontmatter", "marketplace", "playbooks"],
        "text_refinements": {
            "containing a SKILL.md file": "containing a SKILL.md file",
            "in the dot-claude skills folder": "in the .claude/skills folder",
        }
    },
    "11": {
        "title": "Tools and the Harness (MCP)",
        "highlights": ["Model", "Context", "Protocol", "MCP", "client", "server", "PostgreSQL", "GitHub", "claude"],
        "text_refinements": {
            "using the claude mcp add command": "using the 'claude mcp add' command",
            "editing your project settings dot json file": "editing your project settings.json file",
        }
    },
    "12": {
        "title": "Agents",
        "highlights": ["agent", "autonomous", "Think", "Act", "Observe", "subagents", "oversight", "/plan"],
        "text_refinements": {
            "Use slash plan mode": "Use /plan mode",
        }
    },
    "13": {
        "title": "Permissions and Safety",
        "highlights": ["Permissions", "Security", "Allow", "Ask", "Deny", "settings.json", ".claude/settings.json", "Shift+Tab", ".env"],
        "text_refinements": {
            "inside dot claude settings dot json": "inside .claude/settings.json",
            "sensitive dot env files": "sensitive .env files",
            "by pressing Shift plus Tab": "by pressing Shift+Tab",
            "strict settings dot json boundaries": "strict settings.json boundaries",
        }
    }
}

for mod_num in ["06", "07", "08", "09", "10", "11", "12", "13"]:
    json_path = os.path.join(DATA_DIR, f"module{mod_num}_subtitles.json")
    ts_path = os.path.join(DATA_DIR, f"module{mod_num}_subtitles.ts")

    with open(json_path, "r", encoding="utf-8") as f:
        raw_cues = json.load(f)

    config = MODULE_SUBTITLE_DEFS[mod_num]
    refinements = config["text_refinements"]
    highlights = config["highlights"]

    items = []

    # Special clause-splitting for Module 08 Cue 4 (which is 22 seconds long)
    if mod_num == "08":
        # Handle cues with special care for Cue 4
        for idx, cue in enumerate(raw_cues):
            start_s = cue["startMs"] / 1000.0
            end_s = cue["endMs"] / 1000.0
            text = cue["text"]

            # Apply text replacements
            for old_txt, new_txt in refinements.items():
                text = text.replace(old_txt, new_txt)

            if idx == 4:
                # Split cue 4 into 3 readable parts based on measured audio pauses:
                # 26.29s -> 31.55s
                # 31.55s -> 38.00s
                # 38.00s -> 48.30s
                p1_text = "Every effective request in Claude Code should incorporate four core elements:"
                p2_text = "Situation, explaining your project role and context; Goal, stating the exact deliverable and what finished looks like;"
                p3_text = "Background, pointing Claude to relevant files using the @ symbol; and Format, specifying constraints such as file formats, bullet limits, or coding standards."

                items.append({
                    "id": f"sub-{len(items)+1}",
                    "startFrame": int(round(26.29 * 30)),
                    "endFrame": int(round(31.55 * 30)),
                    "text": p1_text,
                    "highlightWords": ["Situation", "Goal", "Background", "Format"]
                })
                items.append({
                    "id": f"sub-{len(items)+1}",
                    "startFrame": int(round(31.55 * 30)),
                    "endFrame": int(round(38.00 * 30)),
                    "text": p2_text,
                    "highlightWords": ["Situation", "Goal"]
                })
                items.append({
                    "id": f"sub-{len(items)+1}",
                    "startFrame": int(round(38.00 * 30)),
                    "endFrame": int(round(48.30 * 30)),
                    "text": p3_text,
                    "highlightWords": ["Background", "Format"]
                })
            else:
                start_frame = int(round(start_s * 30))
                end_frame = int(round(end_s * 30))
                # Ensure no 0 duration
                if end_frame <= start_frame:
                    end_frame = start_frame + 15
                items.append({
                    "id": f"sub-{len(items)+1}",
                    "startFrame": start_frame,
                    "endFrame": end_frame,
                    "text": text,
                    "highlightWords": [w for w in highlights if w.lower() in text.lower()]
                })
    else:
        for idx, cue in enumerate(raw_cues):
            start_s = cue["startMs"] / 1000.0
            end_s = cue["endMs"] / 1000.0
            text = cue["text"]

            for old_txt, new_txt in refinements.items():
                text = text.replace(old_txt, new_txt)

            start_frame = int(round(start_s * 30))
            end_frame = int(round(end_s * 30))
            if end_frame <= start_frame:
                end_frame = start_frame + 15

            items.append({
                "id": f"sub-{idx+1}",
                "startFrame": start_frame,
                "endFrame": end_frame,
                "text": text,
                "highlightWords": [w for w in highlights if w.lower() in text.lower()]
            })

    # Write formatted TypeScript file
    ts_code = f"""import {{ SubtitleItem }} from '../components/Subtitle';

export const MODULE_{mod_num}_SUBTITLES: SubtitleItem[] = {json.dumps(items, indent=2)};
"""
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"Generated {ts_path} with {len(items)} subtitle items.")
