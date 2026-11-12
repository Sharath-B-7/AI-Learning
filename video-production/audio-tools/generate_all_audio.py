#!/usr/bin/env python3
"""
Generate Audio & Subtitles for Modules 02–13
Voice: en-US-ChristopherNeural
Strict constraint: Spoken duration must be between 30 and 60 seconds.
"""

import asyncio
import json
import os
import subprocess
import edge_tts

VOICE = "en-US-ChristopherNeural"

MODULES = {
    "02": {
        "title": "What Is an LLM?",
        "script": (
            "A Large Language Model, or LLM, is trained on vast amounts of text—books, articles, and websites—"
            "learning how language works and ideas connect. Its core mechanism is simple: given some text, it "
            "predicts what text should come next, one small piece at a time. The model does not read whole words "
            "like we do. It processes tokens—small pieces of text that can be a word, part of a word, or punctuation. "
            "When generating a response, the LLM weighs several likely options and picks one. Because it chooses "
            "among likely options rather than following rigid formulas, asking the same question twice can produce "
            "two different, equally reasonable answers. Always read and judge the output."
        )
    },
    "03": {
        "title": "How Does an LLM Work?",
        "script": (
            "An LLM works in four steps. The first two happen before you use it: pre-training, where the model reads "
            "vast text collections to learn general language patterns and facts; and fine-tuning with human feedback, "
            "which trains it to be a helpful, polite assistant that follows instructions. When you send a message, "
            "step three turns your text into tokens. Step four predicts the reply piece by piece, token by token. "
            "Always keep three essentials in mind: the model has a fixed knowledge cutoff date, it does not look "
            "things up by default, and it can invent false details with complete confidence—known as a hallucination."
        )
    },
    "04": {
        "title": "Strengths, Limits, and Trust",
        "script": (
            "AI excels at drafting messages, rewriting text for clarity, summarizing long documents, explaining "
            "difficult concepts, and organizing messy tables. But it requires care with exact figures, mental "
            "calculations, recent events, and anything not shared with it. AI skill is uneven: success on one task "
            "does not guarantee success on another. Follow the trust rule: check in proportion to the stakes. For "
            "low-stakes brainstorming, a quick read is enough. For shared internal reports, verify key facts. For "
            "legal, financial, or customer-facing work, conduct a full review with an expert. Finally, protect "
            "privacy: never paste passwords, customer personal data, or confidential company information."
        )
    },
    "05": {
        "title": "Meet Claude",
        "script": (
            "Claude is an AI assistant created by Anthropic, built on a Large Language Model. It comes in different "
            "model versions: smaller models are faster and cheaper for simple tasks, while larger models handle "
            "complex reasoning. You can access Claude through web, desktop, and mobile apps, through Claude Code inside "
            "technical projects, or via an API. In a chat, you ask questions and Claude answers. As an agent, Claude can "
            "take action using tools across multi-step tasks. To get great results, practice three habits: give the "
            "context, state your clear goal, and specify the exact format—such as a short email or a table."
        )
    },
    "06": {
        "title": "Types of Models",
        "script": (
            "Claude is not one single model, but a family of models. Like hiring help, you match the tier to the task. "
            "Small, fast models like Haiku handle quick edits, sorting, and short summaries. Balanced models like Sonnet "
            "manage everyday drafting and analysis. Most capable models like Opus tackle hard, multi-step, high-stakes "
            "problems. Furthermore, thinking models work through complex problems step by step before answering—like "
            "working it out on paper. Claude is also multimodal, allowing you to share charts, PDFs, and whiteboard "
            "photos. Always match the model to the job: start balanced, and remember that bigger is not always better."
        )
    },
    "07": {
        "title": "Context",
        "script": (
            "Context is everything Claude can see at the moment it answers you. Picture Claude sitting at a desk. Only "
            "what is on that desk is available to work with: your instructions, the conversation history, files you "
            "shared, and tool results. Anything not on the desk simply does not exist for Claude. But the desk has a size "
            "limit called the context window. When a chat grows too long or files too large, the desk clutters, causing "
            "Claude to lose track of details. Keep your context clean: start a fresh chat for each new task, and share "
            "only the specific pages and files that matter."
        )
    },
    "08": {
        "title": "Prompting and Instructions",
        "script": (
            "A prompt is simply what you type to Claude. To get great results, ask clearly, just as you would with a new "
            "colleague. Every effective request includes four parts: Situation, explaining who you are; Goal, stating "
            "exactly what you want produced; Background, providing the facts and files Claude needs; and Format, specifying "
            "structure, length, and tone. You can also paste an example to imitate, set boundaries like avoiding jargon, "
            "and break big jobs into steps. Treat the first reply as a working draft: a quick follow-up correction saves "
            "time and guides Claude to the exact answer you need."
        )
    },
    "09": {
        "title": "Memory",
        "script": (
            "Imagine a colleague who wakes up every morning with no memory of yesterday. That is how Claude works: each "
            "conversation starts fresh, with no carry-over from earlier chats. Short-term memory lives only in your "
            "current conversation. Saved, or persistent memory, consists of notes stored for Claude to read at the start "
            "of future chats—such as project instructions or team conventions. Memory is not Claude learning on its own; "
            "it is a notebook of saved notes that you control. Store your role, guidelines, and formatting preferences. "
            "Never store passwords, customer personal data, or confidential material. Keep your notes tidy and updated."
        )
    },
    "10": {
        "title": "Skills",
        "script": (
            "Think about a recipe card: once you have a good recipe, you don't reinvent the steps every time you cook. "
            "A skill is a recipe card for Claude. While a prompt is typed for a one-time request, a skill is a saved, "
            "reusable method that defines steps, templates, tone, and a final checklist. Skills also keep your context "
            "desk clean: Claude sees only a short summary of each skill, loading the full instructions only when needed "
            "for the task. Whenever you find yourself repeating instructions, or when a workflow needs a consistent team "
            "standard, turn that method into a reusable skill."
        )
    },
    "11": {
        "title": "Tools and the Harness",
        "script": (
            "A model on its own is like a clever person in a locked room, only able to pass notes under the door. Tools "
            "are the model's hands: they allow Claude to read spreadsheets, search the web, run calculations, and create "
            "documents. The harness is the software wrapped around the model—the complete workshop. It provides the "
            "tools, runs the working loop, and enforces the rules about what Claude may do. The Claude app is one harness; "
            "Claude Code is another. In short: the model thinks, tools let it act, and the harness provides the tools and "
            "rules. You decide what Claude is allowed to do."
        )
    },
    "12": {
        "title": "Agents",
        "script": (
            "Tools let Claude act; an agent is what you get when Claude uses those tools on its own to finish a whole "
            "job. In a chat, you ask questions and guide every step. With an agent, you give a goal, and Claude decides "
            "the steps, using tools in a loop: think, act, check the result, and repeat until the job is done. Agents excel "
            "at multi-step tasks across multiple files. For big jobs, Claude can even launch subagents—helpers that work in "
            "parallel on fresh desks. Always give an agent a clear goal, designated files, strict limits, and required "
            "check-ins. You remain in control."
        )
    },
    "13": {
        "title": "Permissions and Safety",
        "script": (
            "Claude can only do what its harness allows. Permissions are the rules you set about what Claude may read, "
            "change, or send. We apply the principle of least access—just like giving a colleague keys only to the rooms "
            "they need. Permissions use three settings: Allow, for actions Claude can do freely, like reading project files; "
            "Ask, where Claude must stop and wait for your approval before changing files or sending messages; and Deny, which "
            "completely blocks sensitive files like passwords, personal data, and environment files. Stricter rules always "
            "win: Deny beats Ask, and Ask beats Allow. You stay in control."
        )
    }
}

BASE_DIR = "/home/sharath/Documentation_Claude"

async def generate_module(mod_num: str, data: dict):
    title = data["title"]
    script = data["script"]
    print(f"\n==========================================")
    print(f"Generating Module {mod_num}: {title}")
    print(f"Word count: {len(script.split())} words")

    out_mp3_prod = os.path.join(BASE_DIR, "video-production/public/audio", f"module-{mod_num}.mp3")
    out_mp3_root = os.path.join(BASE_DIR, "public/audio", f"module-{mod_num}.mp3")
    out_sub_json = os.path.join(BASE_DIR, "video-production/src/data", f"module{mod_num}_subtitles.json")
    out_sub_ts   = os.path.join(BASE_DIR, "video-production/src/data", f"module{mod_num}_subtitles.ts")

    os.makedirs(os.path.dirname(out_mp3_prod), exist_ok=True)
    os.makedirs(os.path.dirname(out_mp3_root), exist_ok=True)
    os.makedirs(os.path.dirname(out_sub_json), exist_ok=True)

    max_retries = 3
    audio_bytes = bytearray()
    subtitles = []

    for attempt in range(1, max_retries + 1):
        try:
            print(f"Synthesizing with {VOICE} (Attempt {attempt}/{max_retries})...")
            communicate = edge_tts.Communicate(script, VOICE)
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
                        "startSec": round(start_ms / 1000, 3),
                        "endSec": round(end_ms / 1000, 3)
                    })

            if len(audio_bytes) > 0 and len(subtitles) > 0:
                print(f"Synthesis successful: {len(audio_bytes)} bytes, {len(subtitles)} subtitle cues.")
                break
            else:
                print(f"Empty stream received. Retrying in 2s...")
                await asyncio.sleep(2)
        except Exception as e:
            print(f"Attempt {attempt} encountered error: {e}. Retrying in 2s...")
            await asyncio.sleep(2)
    else:
        raise RuntimeError(f"Failed to generate audio for Module {mod_num} after {max_retries} attempts.")

    with open(out_mp3_prod, "wb") as f:
        f.write(audio_bytes)

    with open(out_mp3_root, "wb") as f:
        f.write(audio_bytes)

    with open(out_sub_json, "w", encoding="utf-8") as f:
        json.dump(subtitles, f, indent=2)

    # TypeScript subtitles export
    ts_content = f"// Subtitles for Module {mod_num}\n"
    ts_content += "import { SubtitleItem } from '../components/Subtitle';\n\n"
    ts_content += f"export const MODULE_{mod_num}_SUBTITLES: SubtitleItem[] = [\n"
    for s in subtitles:
        escaped_text = s['text'].replace('"', '\\"')
        ts_content += f"  {{ text: \"{escaped_text}\", startMs: {s['startMs']}, endMs: {s['endMs']} }},\n"
    ts_content += "];\n"

    with open(out_sub_ts, "w", encoding="utf-8") as f:
        f.write(ts_content)

    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", out_mp3_prod
    ]
    duration_str = subprocess.check_output(cmd).decode().strip()
    duration_sec = float(duration_str)

    fps = 30
    duration_frames = round((duration_sec + 0.8) * fps)

    print(f"Audio Duration: {duration_sec:.2f}s | Target Frames (@30fps): {duration_frames}")
    if 30.0 <= duration_sec <= 60.0:
        print(f"STATUS: VALID (30–60s limit satisfied: {duration_sec:.2f}s)")
    else:
        print(f"STATUS: INVALID ({duration_sec:.2f}s is OUTSIDE 30–60s limit!)")
        raise ValueError(f"Module {mod_num} duration {duration_sec:.2f}s out of bounds!")

    # Pause 1.5s between modules to be respectful to API limits
    await asyncio.sleep(1.5)

    return {
        "module": mod_num,
        "title": title,
        "durationSec": duration_sec,
        "durationFrames": duration_frames,
        "subtitlesCount": len(subtitles),
        "fileSizeBytes": len(audio_bytes)
    }

async def main():
    results = []
    for mod_num in sorted(MODULES.keys()):
        res = await generate_module(mod_num, MODULES[mod_num])
        results.append(res)

    print("\n==========================================")
    print("ALL MODULES 02–13 AUDIO GENERATION SUMMARY")
    print("==========================================")
    for r in results:
        print(f"Module {r['module']}: {r['durationSec']:.2f}s ({r['durationFrames']} frames, {r['subtitlesCount']} subtitle cues, {r['fileSizeBytes']} bytes)")

    summary_file = os.path.join(BASE_DIR, "video-production/src/data/audio_durations.json")
    with open(summary_file, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nDurations saved to {summary_file}")

if __name__ == "__main__":
    asyncio.run(main())
