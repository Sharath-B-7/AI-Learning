#!/usr/bin/env python3
"""
Batch Render Modules 03 to 13
Outputs:
- video-production/renders/module-{XX}.mp4
- docs/assets/videos/module-{XX}.mp4
- site/assets/videos/module-{XX}.mp4
"""

import os
import shutil
import subprocess
import json
import time

MODULES = [
    {"num": "03", "comp": "Module03"},
    {"num": "04", "comp": "Module04"},
    {"num": "05", "comp": "Module05"},
    {"num": "06", "comp": "Module06"},
    {"num": "07", "comp": "Module07"},
    {"num": "08", "comp": "Module08"},
    {"num": "09", "comp": "Module09"},
    {"num": "10", "comp": "Module10"},
    {"num": "11", "comp": "Module11"},
    {"num": "12", "comp": "Module12"},
    {"num": "13", "comp": "Module13"},
]

BASE_DIR = "/home/sharath/Documentation_Claude"
PROD_DIR = os.path.join(BASE_DIR, "video-production")
DOCS_VIDEOS = os.path.join(BASE_DIR, "docs/assets/videos")
SITE_VIDEOS = os.path.join(BASE_DIR, "site/assets/videos")

os.makedirs(DOCS_VIDEOS, exist_ok=True)
os.makedirs(SITE_VIDEOS, exist_ok=True)

manifest = []

# First, also record module-01 and module-02
for prior_num in ["01", "02"]:
    mp4_path = os.path.join(PROD_DIR, "renders", f"module-{prior_num}.mp4")
    if os.path.exists(mp4_path):
        # copy if needed
        shutil.copy2(mp4_path, os.path.join(DOCS_VIDEOS, f"module-{prior_num}.mp4"))
        shutil.copy2(mp4_path, os.path.join(SITE_VIDEOS, f"module-{prior_num}.mp4"))
        cmd = [
            "ffprobe", "-v", "error", "-show_entries",
            "format=duration,size:stream=codec_name,width,height,r_frame_rate",
            "-of", "json", mp4_path
        ]
        info = json.loads(subprocess.check_output(cmd).decode())
        streams = {s.get("codec_name"): s for s in info.get("streams", [])}
        duration = float(info["format"]["duration"])
        size_bytes = int(info["format"]["size"])
        manifest.append({
            "module": prior_num,
            "composition": f"Module{prior_num}",
            "videoDurationSec": round(duration, 2),
            "fileSizeBytes": size_bytes,
            "fileSizeMB": round(size_bytes / (1024 * 1024), 2),
            "videoCodec": streams.get("h264", {}).get("codec_name", "h264"),
            "audioCodec": streams.get("aac", {}).get("codec_name", "aac"),
            "width": streams.get("h264", {}).get("width", 1920),
            "height": streams.get("h264", {}).get("height", 1080),
            "fps": streams.get("h264", {}).get("r_frame_rate", "30/1"),
            "status": "VALID"
        })

print(f"Recorded existing Module 01 and 02 in manifest.")

for m in MODULES:
    mod_num = m["num"]
    comp_id = m["comp"]
    out_name = f"module-{mod_num}.mp4"
    render_out = os.path.join(PROD_DIR, "renders", out_name)
    docs_out = os.path.join(DOCS_VIDEOS, out_name)
    site_out = os.path.join(SITE_VIDEOS, out_name)

    print(f"\n==========================================")
    print(f"RENDERING {comp_id} -> {out_name}")
    print(f"==========================================")
    t0 = time.time()

    render_cmd = [
        "npx", "remotion", "render",
        "src/index.ts", comp_id,
        f"renders/{out_name}",
        "--concurrency=8"
    ]

    subprocess.check_call(render_cmd, cwd=PROD_DIR)
    render_elapsed = time.time() - t0
    print(f"Rendered in {render_elapsed:.1f}s")

    # Copy to docs and site
    shutil.copy2(render_out, docs_out)
    shutil.copy2(render_out, site_out)
    print(f"Copied to {docs_out} and {site_out}")

    # Inspect with ffprobe
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_name,width,height,r_frame_rate",
        "-of", "json", render_out
    ]
    info = json.loads(subprocess.check_output(cmd).decode())
    streams = {s.get("codec_name"): s for s in info.get("streams", [])}
    duration = float(info["format"]["duration"])
    size_bytes = int(info["format"]["size"])

    is_valid = 30.0 <= duration <= 60.0
    status_str = "VALID" if is_valid else "INVALID"

    entry = {
        "module": mod_num,
        "composition": comp_id,
        "videoDurationSec": round(duration, 2),
        "fileSizeBytes": size_bytes,
        "fileSizeMB": round(size_bytes / (1024 * 1024), 2),
        "videoCodec": streams.get("h264", {}).get("codec_name", "h264"),
        "audioCodec": streams.get("aac", {}).get("codec_name", "aac"),
        "width": streams.get("h264", {}).get("width", 1920),
        "height": streams.get("h264", {}).get("height", 1080),
        "fps": streams.get("h264", {}).get("r_frame_rate", "30/1"),
        "status": status_str
    }
    manifest.append(entry)

    print(f"Result: {entry['videoDurationSec']}s ({entry['fileSizeMB']} MB, {entry['width']}x{entry['height']}, {entry['fps']}fps) - {status_str}")

manifest_path = os.path.join(PROD_DIR, "renders/render_manifest.json")
with open(manifest_path, "w") as f:
    json.dump(manifest, f, indent=2)

print("\n==========================================")
print("ALL 13 MODULES RENDER MANIFEST")
print("==========================================")
for item in manifest:
    print(f"Module {item['module']}: {item['videoDurationSec']}s | {item['fileSizeMB']} MB | {item['videoCodec']}/{item['audioCodec']} | {item['width']}x{item['height']} | {item['status']}")
print(f"\nManifest saved to {manifest_path}")

