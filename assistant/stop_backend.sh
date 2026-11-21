#!/bin/bash
# Stop script for AI MASTERCLASS Assistant Backend

echo "Stopping AI MASTERCLASS Assistant Backend on port 8000..."
PID=$(lsof -ti:8000)
if [ -n "$PID" ]; then
    kill -15 "$PID" 2>/dev/null || kill -9 "$PID" 2>/dev/null
    echo "✓ Backend process ($PID) stopped."
else
    echo "No backend process found listening on port 8000."
fi
