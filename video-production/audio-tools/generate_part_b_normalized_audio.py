#!/usr/bin/env python3
"""
Generate Audio & Subtitles for Part B Modules 06–13
Voice: en-US-ChristopherNeural
Rate: +0% (Natural Part A speaking pace: ~138-142 WPM)
Target Duration: ~2 minutes (115.0s to 125.0s / 1m 55s to 2m 05s)
"""

import asyncio
import json
import os
import subprocess
import edge_tts

VOICE = "en-US-ChristopherNeural"
RATE = "+0%"

MODULE_SCRIPTS = {
    "06": {
        "title": "Types of Models",
        "script": (
            "Welcome to Module 6: Types of Models in Claude Code. "
            "Claude is not just a single artificial intelligence model. It is a family of state-of-the-art foundation models developed by Anthropic, "
            "each purposefully engineered with distinct tradeoffs between execution speed, token cost, and analytical depth. "
            "In Claude Code on Windows, you can select the exact model tier that matches your development workflow, "
            "from rapid file exploration to complex architectural redesigns. "
            "Haiku is the smallest and fastest model tier. It excels at rapid file sorting, basic text editing, "
            "and quick classification tasks where turnaround speed is your highest priority. "
            "Sonnet is the balanced powerhouse. It handles everyday coding, architectural planning, and complex bug fixes, "
            "offering the ideal balance between speed and intelligence for professional software engineering. "
            "Opus is the flagship reasoning engine. It tackles challenging, high-stakes problems, deep architectural reviews, "
            "and intricate multi-step reasoning across large codebases. "
            "When working on complex algorithms or system debugging, you can enable Extended Thinking using the slash effort command. "
            "This grants Claude dedicated scratchpad space to reason through difficult edge cases step by step "
            "before generating a single line of code. "
            "Furthermore, Claude is multimodal, allowing you to drag in user interface wireframes, workflow charts, "
            "or system architecture diagrams directly into your terminal session to guide the implementation. "
            "You can launch Claude Code from Windows PowerShell specifying your preferred model with the model flag, "
            "or switch dynamically inside an active session using the slash model command. "
            "Always match the model tier to your specific task: start with Sonnet for everyday work, switch to Haiku for quick chores, "
            "and bring in Opus for your most demanding challenges. "
            "Choosing the right model maximizes speed while keeping your token budget under control."
        )
    },
    "07": {
        "title": "Context",
        "script": (
            "Welcome to Module 7: Context in Claude Code. "
            "To understand how Claude Code thinks, picture Claude sitting at a physical working desk. "
            "Everything Claude can see and remember at this exact moment is what sits on that desk: "
            "your initial prompt, previous conversation messages, file contents you have shared, and the outputs returned by tools. "
            "Anything not physically placed on the desk simply does not exist for Claude. "
            "However, this desk has a finite physical surface area known as the context window. "
            "Claude features an industry-leading context window of 200,000 tokens, which equals roughly 150,000 words. "
            "But when you load dozens of unnecessary files or let a conversation run for hours, the desk becomes cluttered. "
            "Context clutter causes Claude to lose track of key constraints, misinterpret guidelines, and hallucinate details. "
            "In artificial intelligence engineering, quality matters much more than quantity. "
            "Claude Code gives you powerful commands to keep your desk organized. "
            "Use the at symbol followed by a file path to place only the specific file Claude needs onto the desk. "
            "Run the slash context command to inspect your active token usage and see exactly which files are occupying space. "
            "When a session grows large, use slash compact to summarize older discussion while preserving vital architectural decisions, "
            "significantly reducing context load. "
            "When starting a completely new feature or investigation, run slash clear to completely wipe the desk clean. "
            "Remember the golden rules: never dump entire codebases at once, share only targeted files, "
            "and start fresh for each new task. "
            "Regularly compacting your session keeps token consumption low and ensures sharp responses. "
            "A clean, organized desk guarantees that Claude provides reliable, high-precision results throughout your project."
        )
    },
    "08": {
        "title": "Prompting and Instructions",
        "script": (
            "Welcome to Module 8: Prompting and Instructions in Claude Code. "
            "In conversational AI, prompting often feels like casual chat. "
            "But in Claude Code, you are directing an autonomous assistant with direct access to your local files and terminal tools. "
            "A vague command leads to wasted time and mistaken edits, while a structured instruction delivers precise code "
            "and automated solutions on the first attempt. "
            "Every effective request in Claude Code should incorporate four core elements: "
            "Situation, explaining your project role and context; "
            "Goal, stating the exact deliverable and what finished looks like; "
            "Background, pointing Claude to relevant files using the at symbol; "
            "and Format, specifying constraints such as file formats, bullet limits, or coding standards. "
            "Providing these four elements gives Claude the full picture needed to act accurately without making flawed assumptions. "
            "Consider this comparison. A weak request says: summarize this. Claude does not know which file you mean, "
            "who the audience is, or where to save it. "
            "In contrast, a strong request states: I am preparing for a client meeting. Summarize at Q3-report.pdf "
            "in five bullet points focusing on risks and costs. Keep each point under twenty words, and save the result as meeting-prep.md. "
            "The strong prompt is clear, bounded, and immediately actionable. "
            "Inside Claude Code, use Shift plus Enter or Control plus J to write formatted multiline requests with clear structure. "
            "For complex multi-file tasks, always prefix your request with slash plan, telling Claude to research the problem "
            "and propose a detailed implementation plan before touching a single file. Review the plan carefully before execution. "
            "Clear instructions combined with thoughtful planning ensure total control and dependable results across your codebase."
        )
    },
    "09": {
        "title": "Memory",
        "script": (
            "Welcome to Module 9: Memory in Claude Code. "
            "By default, every time you open Windows PowerShell and start a new Claude Code session, "
            "Claude begins with a completely blank slate. "
            "It has no memory of past conversations, previous bug fixes, or your team's coding conventions. "
            "While this guarantees clean context, constantly repeating your build commands and stylistic rules wastes valuable engineering time. "
            "To solve this, Claude Code introduces persistent memory through a markdown file named CLAUDE.md. "
            "Think of CLAUDE.md as an onboarding handbook for your project. "
            "Whenever Claude Code starts, it automatically reads this file and keeps its instructions active in memory. "
            "Claude Code supports a three-level memory hierarchy: "
            "Global memory in your user profile for machine-wide settings; "
            "Project memory in the repository root for team standards; "
            "and Directory memory inside subfolders for localized rules. "
            "Your project CLAUDE.md should document essential engineering workflows: "
            "exact test commands, linting rules, formatting requirements, and architectural boundaries. "
            "Explicitly state forbidden practices, such as libraries not to install or directories that must never be edited. "
            "Use clear bullet points and code snippets rather than lengthy narrative explanations. "
            "Every line in CLAUDE.md consumes context window space, so focus exclusively on high-value instructions that prevent recurring mistakes. "
            "Treat CLAUDE.md as living documentation that evolves alongside your software repository. "
            "When you correct Claude during a session, capture that lesson and add it to CLAUDE.md so the mistake is never repeated. "
            "Share the file with your team through version control so every engineer benefits from consistent AI behavior. "
            "Maintaining a concise, well-structured memory file ensures that Claude delivers production-grade results aligned with your team's standards from day one."
        )
    },
    "10": {
        "title": "Skills",
        "script": (
            "Welcome to Module 10: Skills in Claude Code. "
            "Skills are modular packages of domain knowledge, specialized instructions, and reusable workflows "
            "that teach Claude Code how to perform specialized engineering tasks. "
            "While standard prompts provide broad guidance, skills act like dedicated playbooks for specific technical challenges. "
            "When a skill is enabled, Claude Code activates relevant instructions only when needed, "
            "preserving context window space while delivering expert results. "
            "Every skill lives inside a dedicated directory containing a SKILL.md file. "
            "The YAML frontmatter at the top defines the skill name, description, and exact trigger conditions that tell Claude when to activate it. "
            "The markdown body provides step-by-step procedures, validation rules, and error recovery strategies. "
            "Skills can also include executable helper scripts, example templates, and reference documentation that Claude can consult and run dynamically during execution. "
            "You can create custom skills for your team's proprietary frameworks, code review checklists, "
            "or automated database migrations. "
            "Place custom skills in the dot-claude skills folder within your project or your user home directory. "
            "In addition, you can discover and install community skills from the marketplace to quickly add support for popular cloud providers, "
            "testing frameworks, and API integrations. Claude Code automatically scans these directories upon startup. "
            "Claude Code automatically discovers installed skills and activates them when your request matches their description. "
            "You can also invoke skills directly using slash commands to enforce standard operating procedures. "
            "Before deploying a skill team-wide, test it thoroughly across different edge cases and refine the instructions based on actual usage. "
            "Packaging repeatable workflows into reusable skills standardizes best practices and empowers your entire development team."
        )
    },
    "11": {
        "title": "MCP",
        "script": (
            "Welcome to Module 11: Model Context Protocol, or MCP, in Claude Code. "
            "The Model Context Protocol is an open standard that connects Claude Code to external data sources, "
            "developer tools, and enterprise services. "
            "Without MCP, Claude is confined strictly to your local workspace files. "
            "With MCP, Claude can query production databases, create Jira tickets, inspect GitHub repositories, "
            "and fetch real-time documentation without leaving your terminal. "
            "MCP operates on a clean client-host-server architecture. "
            "Claude Code acts as the MCP client, while MCP servers expose specialized tools, resources, and prompt templates that Claude can invoke dynamically. "
            "Connections run over local standard input and output streams for installed command-line utilities, "
            "or over secure HTTP and Server-Sent Events for remote cloud services. "
            "This modular architecture allows you to plug in tools without modifying your core codebase. "
            "On Windows, you can add MCP servers using the claude mcp add command or by editing your project settings dot json file. "
            "For example, you can connect a PostgreSQL server to inspect database schemas, a GitHub server to manage pull requests and issues, "
            "or a web search server to fetch the latest API documentation. "
            "Claude discovers the available tools automatically and calls them when relevant to your prompt. "
            "Because MCP servers grant access to external systems, security and authorization are critical. "
            "Always review the specific permissions requested by each server before installation. "
            "Configure sensitive connections in read-only mode whenever possible, especially when connecting to production databases. "
            "Never expose plain-text credentials or API secrets in configuration files. "
            "MCP transforms Claude Code into a fully integrated engineering hub that securely bridges your code with the modern developer ecosystem."
        )
    },
    "12": {
        "title": "Agents",
        "script": (
            "Welcome to Module 12: Agents in Claude Code. "
            "An AI agent is fundamentally different from a conversational chatbot that simply answers questions. "
            "An agent is an autonomous system capable of reasoning, planning, executing actions, and evaluating results to accomplish a defined objective. "
            "In Claude Code, the agent has direct access to tools, allowing it to inspect files, edit code, run tests, "
            "and fix bugs independently. "
            "At the core of every agent is an iterative reasoning loop: Think, Act, and Observe. "
            "First, Claude analyzes the request and devises a step-by-step plan. "
            "Next, it acts by reading files or running shell commands. "
            "Then, it observes the environment's response. "
            "When a command fails or a compiler produces errors, the agent diagnoses the issue, refines its approach, "
            "and applies a targeted fix without human intervention. "
            "For complex engineering projects, Claude Code can coordinate multiple specialized subagents to tackle challenges in parallel. "
            "For instance, an architect agent can analyze system requirements and design the interface, "
            "while a researcher agent searches the codebase for relevant patterns, and an author agent writes the code. "
            "Delegating tasks to specialized subagents keeps individual context windows clean and significantly accelerates project delivery across large codebases. "
            "While agents provide extraordinary automation, human oversight remains essential for safety. "
            "Always establish clear acceptance criteria and verify unit test suites before launching agentic workflows. "
            "Use slash plan mode to review proposed modifications before granting write permissions. "
            "By combining autonomous reasoning loops with active human guidance, you unlock the transformative power of agentic development "
            "while maintaining full governance and confidence over your production software."
        )
    },
    "13": {
        "title": "Permissions and Security",
        "script": (
            "Welcome to Module 13: Permissions and Security in Claude Code. "
            "Because Claude Code has direct access to your local filesystem, Windows terminal, and development toolchain, "
            "understanding permissions and security is essential for safe operation. "
            "Without proper safeguards, an autonomous agent could accidentally overwrite critical files, "
            "execute dangerous shell commands, or expose sensitive secrets. "
            "Security is not an afterthought; it is the foundation of dependable AI collaboration. "
            "Every action in Claude Code falls under one of three permission tiers. "
            "Allow permits safe actions, such as reading public files or inspecting directory trees without asking. "
            "Ask requires Claude to pause and request your explicit approval before modifying code or executing commands. "
            "Deny completely blocks access to forbidden files or destructive operations. "
            "Crucially, stricter rules always win: Deny beats Ask, and Ask beats Allow. "
            "On Windows, project permissions are configured inside dot claude settings dot json. "
            "Use deny rules to lock down sensitive dot env files, API tokens, database credentials, and SSH keys. "
            "During an active terminal session, you can quickly cycle through permission modes by pressing Shift plus Tab, "
            "switching seamlessly between Normal mode, Accept Edits mode, and Plan mode where no files can be altered. "
            "Always treat approval prompts with vigilance: inspect the exact shell command, verify the target file path, "
            "and read before you approve. "
            "By combining strict settings dot json boundaries with interactive permission modes, you maintain an airtight, safe terminal workspace. "
            "You now have the complete educational foundation to build safely, efficiently, and effectively with Claude Code "
            "across all thirteen modules of the AI Masterclass."
        )
    }
}

BASE_DIR = "/home/sharath/Documentation_Claude"

async def synthesize_module(mod_num: str, data: dict):
    title = data["title"]
    script = data["script"]
    word_count = len(script.split())

    print(f"\n==========================================")
    print(f"Synthesizing Part B Module {mod_num}: {title}")
    print(f"Word count: {word_count} words | Rate: {RATE}")

    out_mp3_prod = os.path.join(BASE_DIR, "video-production/public/audio", f"module-{mod_num}.mp3")
    out_mp3_root = os.path.join(BASE_DIR, "public/audio", f"module-{mod_num}.mp3")
    out_sub_json = os.path.join(BASE_DIR, "video-production/src/data", f"module{mod_num}_subtitles.json")
    out_sub_ts   = os.path.join(BASE_DIR, "video-production/src/data", f"module{mod_num}_subtitles.ts")

    os.makedirs(os.path.dirname(out_mp3_prod), exist_ok=True)
    os.makedirs(os.path.dirname(out_mp3_root), exist_ok=True)
    os.makedirs(os.path.dirname(out_sub_json), exist_ok=True)

    communicate = edge_tts.Communicate(script, VOICE, rate=RATE)
    audio_bytes = bytearray()
    subtitles = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_bytes.extend(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            start_ms = chunk["offset"] / 10000
            duration_ms = chunk["duration"] / 10000
            end_ms = start_ms + duration_ms
            subtitles.append({
                "text": chunk["text"].strip(),
                "startMs": round(start_ms),
                "endMs": round(end_ms),
                "durationMs": round(duration_ms)
            })

    # Save audio files
    with open(out_mp3_prod, "wb") as f:
        f.write(audio_bytes)
    with open(out_mp3_root, "wb") as f:
        f.write(audio_bytes)

    # Save subtitles JSON
    with open(out_sub_json, "w", encoding="utf-8") as f:
        json.dump(subtitles, f, indent=2)

    # Save subtitles TS
    ts_content = f"""// Generated Subtitles for Module {mod_num}: {title}
// Narration Pace: Natural Part A Pace ({RATE})
import {{ SubtitleItem }} from '../components/Subtitle';

export const MODULE_{mod_num}_SUBTITLES: SubtitleItem[] = {json.dumps(subtitles, indent=2)};
"""
    with open(out_sub_ts, "w", encoding="utf-8") as f:
        f.write(ts_content)

    # Measure exact duration
    res = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", out_mp3_prod
    ], stdout=subprocess.PIPE, text=True)
    duration_s = float(res.stdout.strip())
    total_frames = int(round(duration_s * 30))
    wpm = (word_count / duration_s) * 60

    print(f"SUCCESS: Module {mod_num} synthesized!")
    print(f"Audio Duration: {duration_s:.2f}s ({duration_s // 60:.0f}m {duration_s % 60:.1f}s)")
    print(f"Total Frames (30fps): {total_frames}")
    print(f"Speaking Pace: {wpm:.1f} WPM (Natural Part A pace)")
    print(f"Subtitles: {len(subtitles)} sentence cues")

    return {
        "mod": mod_num,
        "title": title,
        "words": word_count,
        "duration_s": duration_s,
        "total_frames": total_frames,
        "wpm": wpm,
        "subtitles": subtitles
    }

async def main():
    results = []
    for mod_num in sorted(MODULE_SCRIPTS.keys()):
        res = await synthesize_module(mod_num, MODULE_SCRIPTS[mod_num])
        results.append(res)

    print("\n" + "="*60)
    print("ALL PART B MODULES SYNTHESIZED SUCCESSFULLY (NATURAL PACE)")
    print("="*60)
    print(f"{'Module':<10}{'Words':<8}{'Duration':<14}{'Frames':<10}{'WPM':<8}")
    print("-"*60)
    for r in results:
        dur_str = f"{r['duration_s']:.1f}s ({r['duration_s']//60:.0f}m {r['duration_s']%60:.1f}s)"
        print(f"Mod {r['mod']:<6} {r['words']:<8}{dur_str:<14}{r['total_frames']:<10}{r['wpm']:.1f}")

    with open(os.path.join(BASE_DIR, "video-production/audio-tools/part_b_synthesis_summary.json"), "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    asyncio.run(main())
