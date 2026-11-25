#!/bin/bash
set -e

PROJECT_DIR="/home/sharath/Documentation_Claude"
cd "$PROJECT_DIR"

echo "=== Starting Claude Learning Hub Portal ==="

# Check/Start MkDocs on port 8008
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
echo "To stop, run: ./stop_all.sh"
echo "=================================================="
