#!/bin/bash
PROJECT_DIR="/home/sharath/Documentation_Claude"

echo "=== Stopping Claude Learning Hub Portal ==="

# Stop MkDocs on port 8008
PID_MKDOCS=$(lsof -ti:8008)
if [ -n "$PID_MKDOCS" ]; then
    kill -15 "$PID_MKDOCS" 2>/dev/null || kill -9 "$PID_MKDOCS" 2>/dev/null
    echo "✓ Stopped MkDocs (PID $PID_MKDOCS)"
else
    echo "MkDocs is not running."
fi

echo "All services stopped."
