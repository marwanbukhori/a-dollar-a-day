#!/bin/bash

# Make sure the script is executable (run 'chmod +x start-dev.sh' if needed)

echo "Starting development environment..."

# Kill any existing processes on port 3000 and 5173
echo "Checking for existing processes..."
lsof -i :3000 -t | xargs kill -9 2>/dev/null || true
lsof -i :5173 -t | xargs kill -9 2>/dev/null || true

# Start the development environment
echo "Starting backend and frontend..."
npm run dev
