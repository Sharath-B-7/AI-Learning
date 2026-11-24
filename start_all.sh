#!/bin/bash
set -e

PROJECT_DIR="/home/sharath/Documentation_Claude"
cd "$PROJECT_DIR"

echo "=== Starting Claude Learning Hub Portal & Assistant ==="

# 1. Verify/Start Ollama
if ! curl -s http://127.0.0.1:11434/api/tags > /dev/null; then
    echo "Starting Ollama service..."
    systemctl --user start ollama.service
    sleep 2
fi
echo "✓ Ollama is running at http://127.0.0.1:11434"

# 2. Check/Start FastAPI Assistant Backend on port 8000
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ Assistant Backend is already running on http://127.0.0.1:8000"
else
    echo "Starting Assistant Backend on http://127.0.0.1:8000..."
    export PYTHONPATH="$PROJECT_DIR"
    nohup "$PROJECT_DIR/assistant/.venv/bin/uvicorn" assistant.main:app --host 127.0.0.1 --port 8000 > "$PROJECT_DIR/assistant/backend.log" 2>&1 &
    sleep 2
    echo "✓ Assistant Backend started (PID $!)."
fi

# 3. Check/Start MkDocs on port 8008
if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ MkDocs is already running on http://127.0.0.1:8008"
else
    echo "Starting MkDocs Portal on http://127.0.0.1:8008..."
    nohup "$PROJECT_DIR/.venv/bin/mkdocs" serve -a 127.0.0.1:8008 > "$PROJECT_DIR/mkdocs.log" 2>&1 &
    sleep 2
    echo "✓ MkDocs Portal started (PID $!)."
fi

echo ""
echo "=================================================="
echo "Claude Learning Hub is ready!"
echo "Open in your browser: http://127.0.0.1:8008/"
echo "To stop everything, run: ./stop_all.sh"
echo "=================================================="
