#!/usr/bin/env python3
"""
Generate Module 01 Voice-over & Synchronized Subtitles
Voice: en-US-ChristopherNeural
Script: 101 words (~43s target)
"""

import asyncio
import json
import os
import subprocess
import edge_tts

SCRIPT_TEXT = (
    "Artificial Intelligence is the big umbrella: computer programs performing smart tasks "
    "that normally require human thinking. Inside AI sits Machine Learning, where computers learn "
    "from vast examples rather than step-by-step rules. Inside Machine Learning are Large Language "
    "Models, or LLMs, built specifically to understand and write human language. Claude is an example "
    "of an LLM. Unlike narrow tools that only filter spam or suggest the next word, Claude is a "
    "general-purpose assistant for writing, summarizing, explaining, and analyzing. Think of Claude "
    "like a brilliant new colleague who knows nothing about your company until you explain it: "
    "provide clear context, and always verify their work."
)

VOICE = "en-US-ChristopherNeural"
OUTPUT_MP3 = "/home/sharath/Documentation_Claude/video-production/public/audio/module-01.mp3"
ROOT_MP3 = "/home/sharath/Documentation_Claude/public/audio/module-01.mp3"
SUBTITLES_JSON = "/home/sharath/Documentation_Claude/video-production/src/data/module01_subtitles.json"

async def main():
    os.makedirs(os.path.dirname(OUTPUT_MP3), exist_ok=True)
    os.makedirs(os.path.dirname(SUBTITLES_JSON), exist_ok=True)
    os.makedirs(os.path.dirname(ROOT_MP3), exist_ok=True)

    print(f"Synthesizing audio with voice: {VOICE}...")
    communicate = edge_tts.Communicate(SCRIPT_TEXT, VOICE)

    audio_bytes = bytearray()
    subtitles = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_bytes.extend(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            # offset and duration in 100ns units -> convert to seconds and ms
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

    with open(OUTPUT_MP3, "wb") as f:
        f.write(audio_bytes)

    with open(ROOT_MP3, "wb") as f:
        f.write(audio_bytes)

    with open(SUBTITLES_JSON, "w", encoding="utf-8") as f:
        json.dump(subtitles, f, indent=2)

    print(f"Generated audio saved to {OUTPUT_MP3} ({len(audio_bytes)} bytes)")
    print(f"Generated subtitles saved to {SUBTITLES_JSON} ({len(subtitles)} cues)")

    # Run ffprobe to get exact duration
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", OUTPUT_MP3
    ]
    duration_str = subprocess.check_output(cmd).decode().strip()
    duration_sec = float(duration_str)
    print(f"Exact Audio Duration: {duration_sec:.2f} seconds")
    if 30.0 <= duration_sec <= 60.0:
        print("VERIFICATION SUCCESS: Audio duration is strictly within 30–60 seconds range!")
    else:
        print(f"VERIFICATION FAILURE: Audio duration {duration_sec:.2f} is outside 30–60s limit!")

if __name__ == "__main__":
    asyncio.run(main())

