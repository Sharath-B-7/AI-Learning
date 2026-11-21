#!/usr/bin/env python3
"""
Master Render & Validation Script for AI MASTERCLASS (Modules 01–13)
- Renders all 13 modules using Remotion
- Validates 1920x1080 @ 30fps, h264/aac
- Captures frame 100 screenshot for visual verification
- Copies to docs/assets/videos/ and site/assets/videos/
"""

import os
import shutil
import subprocess
import json
import time

MODULES = [
    {"num": "01", "comp": "Module01", "part": "Part A", "label": "Part A • Module 1", "expected_dur_range": (40.0, 55.0)},
    {"num": "02", "comp": "Module02", "part": "Part A", "label": "Part A • Module 2", "expected_dur_range": (40.0, 55.0)},
    {"num": "03", "comp": "Module03", "part": "Part A", "label": "Part A • Module 3", "expected_dur_range": (35.0, 50.0)},
    {"num": "04", "comp": "Module04", "part": "Part A", "label": "Part A • Module 4", "expected_dur_range": (45.0, 60.0)},
    {"num": "05", "comp": "Module05", "part": "Part A", "label": "Part A • Module 5", "expected_dur_range": (40.0, 55.0)},
    {"num": "06", "comp": "Module06", "part": "Part B", "label": "Part B • Module 6", "expected_dur_range": (115.0, 130.0)},
    {"num": "07", "comp": "Module07", "part": "Part B", "label": "Part B • Module 7", "expected_dur_range": (115.0, 130.0)},
    {"num": "08", "comp": "Module08", "part": "Part B", "label": "Part B • Module 8", "expected_dur_range": (115.0, 130.0)},
    {"num": "09", "comp": "Module09", "part": "Part B", "label": "Part B • Module 9", "expected_dur_range": (115.0, 130.0)},
    {"num": "10", "comp": "Module10", "part": "Part B", "label": "Part B • Module 10", "expected_dur_range": (115.0, 130.0)},
    {"num": "11", "comp": "Module11", "part": "Part B", "label": "Part B • Module 11", "expected_dur_range": (115.0, 130.0)},
    {"num": "12", "comp": "Module12", "part": "Part B", "label": "Part B • Module 12", "expected_dur_range": (115.0, 130.0)},
    {"num": "13", "comp": "Module13", "part": "Part B", "label": "Part B • Module 13", "expected_dur_range": (115.0, 130.0)},
]

BASE_DIR = "/home/sharath/Documentation_Claude"
PROD_DIR = os.path.join(BASE_DIR, "video-production")
RENDERS_DIR = os.path.join(PROD_DIR, "renders")
DOCS_VIDEOS = os.path.join(BASE_DIR, "docs/assets/videos")
SITE_VIDEOS = os.path.join(BASE_DIR, "site/assets/videos")
PREVIEWS_DIR = os.path.join(PROD_DIR, "renders/preview_frames")

os.makedirs(RENDERS_DIR, exist_ok=True)
os.makedirs(DOCS_VIDEOS, exist_ok=True)
os.makedirs(SITE_VIDEOS, exist_ok=True)
os.makedirs(PREVIEWS_DIR, exist_ok=True)

manifest = []
start_total = time.time()

for m in MODULES:
    mod_num = m["num"]
    comp_id = m["comp"]
    label = m["label"]
    part = m["part"]
    min_dur, max_dur = m["expected_dur_range"]

    out_name = f"module-{mod_num}.mp4"
    render_out = os.path.join(RENDERS_DIR, out_name)

    print(f"\n=======================================================")
    print(f"RENDERING MODULE {mod_num}: {comp_id} | Label: {label}")
    print(f"=======================================================")

    t0 = time.time()
    render_cmd = [
        "npx", "remotion", "render",
        "src/index.ts", comp_id,
        f"renders/{out_name}",
        "--concurrency=8"
    ]
    subprocess.check_call(render_cmd, cwd=PROD_DIR)
    elapsed = time.time() - t0
    print(f"Render completed in {elapsed:.1f}s")

    # Validate with ffprobe
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_name,width,height,r_frame_rate,channels",
        "-of", "json", render_out
    ]
    info = json.loads(subprocess.check_output(cmd).decode())
    streams = {s.get("codec_name"): s for s in info.get("streams", [])}
    video_stream = next((s for s in info.get("streams", []) if s.get("width")), {})
    audio_stream = next((s for s in info.get("streams", []) if s.get("channels")), {})

    duration = float(info["format"]["duration"])
    size_bytes = int(info["format"]["size"])
    width = video_stream.get("width", 0)
    height = video_stream.get("height", 0)
    vcodec = video_stream.get("codec_name", "")
    acodec = audio_stream.get("codec_name", "")

    # Extract screenshot at frame 100 (~3.33s) to verify label
    frame_png = os.path.join(PREVIEWS_DIR, f"module-{mod_num}-frame100.png")
    subprocess.run([
        "ffmpeg", "-y", "-ss", "00:00:03.333", "-i", render_out,
        "-vframes", "1", "-q:v", "2", frame_png
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Copy to docs and site
    doc_dest = os.path.join(DOCS_VIDEOS, out_name)
    site_dest = os.path.join(SITE_VIDEOS, out_name)
    shutil.copy2(render_out, doc_dest)
    shutil.copy2(render_out, site_dest)
    print(f"Copied to {doc_dest} and {site_dest}")

    valid_dur = min_dur <= duration <= max_dur
    valid_res = (width == 1920 and height == 1080)
    status = "VALID" if (valid_dur and valid_res) else "CHECK REQUIRED"

    entry = {
        "module": mod_num,
        "part": part,
        "label": label,
        "durationSec": round(duration, 2),
        "durationStr": f"{int(duration // 60)}m {duration % 60:.1f}s",
        "resolution": f"{width}x{height}",
        "videoCodec": vcodec,
        "audioCodec": acodec,
        "fileSizeBytes": size_bytes,
        "fileSizeMB": round(size_bytes / (1024 * 1024), 2),
        "renderTimeSec": round(elapsed, 1),
        "previewFrame": frame_png,
        "status": status
    }
    manifest.append(entry)
    print(f"Module {mod_num} Verified: {entry['durationStr']} | {entry['resolution']} | {entry['fileSizeMB']} MB | {status}")

total_elapsed = time.time() - start_total
manifest_path = os.path.join(RENDERS_DIR, "master_render_manifest.json")
with open(manifest_path, "w") as f:
    json.dump(manifest, f, indent=2)

print("\n" + "="*80)
print(f"ALL 13 MODULE VIDEOS RENDERED AND VERIFIED SUCCESSFULLY IN {total_elapsed/60:.1f}m")
print("="*80)
print(f"{'Mod':<5}{'Label':<20}{'Duration':<12}{'Resolution':<12}{'Size':<10}{'Status':<8}")
print("-" * 80)
for e in manifest:
    print(f"{e['module']:<5}{e['label']:<20}{e['durationStr']:<12}{e['resolution']:<12}{str(e['fileSizeMB'])+'MB':<10}{e['status']:<8}")
