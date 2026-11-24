#!/bin/bash
# Stop script for Claude Learning Hub Assistant Backend

echo "Stopping Claude Learning Hub Assistant Backend on port 8000..."
PID=$(lsof -ti:8000)
if [ -n "$PID" ]; then
    kill -15 "$PID" 2>/dev/null || kill -9 "$PID" 2>/dev/null
    echo "✓ Backend process ($PID) stopped."
else
    echo "No backend process found listening on port 8000."
fi
