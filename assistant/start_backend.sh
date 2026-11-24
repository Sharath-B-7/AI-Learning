#!/bin/bash
# Startup script for Claude Learning Hub Assistant Backend

PROJECT_DIR="/home/sharath/Documentation_Claude"
ASSISTANT_DIR="$PROJECT_DIR/assistant"
VENV_DIR="$ASSISTANT_DIR/.venv"

echo "=== Starting Claude Learning Hub Assistant Backend ==="

# 1. Verify / Start Ollama
if ! curl -s http://127.0.0.1:11434/api/tags > /dev/null; then
    echo "Starting Ollama user service..."
    systemctl --user start ollama.service
    sleep 2
fi

if curl -s http://127.0.0.1:11434/api/tags > /dev/null; then
    echo "✓ Ollama is running at http://127.0.0.1:11434"
else
    echo "✗ ERROR: Ollama service failed to start."
    exit 1
fi

# 2. Check if already running on port 8000
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Backend is already running on port 8000."
    curl -s http://127.0.0.1:8000/api/health | python3 -m json.tool
    exit 0
fi

# 3. Start FastAPI with uvicorn
cd "$PROJECT_DIR" || exit 1
export PYTHONPATH="$PROJECT_DIR"
echo "Starting FastAPI on http://127.0.0.1:8000..."
"$VENV_DIR/bin/uvicorn" assistant.main:app --host 127.0.0.1 --port 8000
