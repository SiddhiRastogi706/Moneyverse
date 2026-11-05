#!/bin/bash
echo "==================================================="
echo "    MoneyVerse AI - 1-Click Platform Launcher"
echo "==================================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check Client dependencies
if [ ! -d "client/node_modules" ]; then
    echo "[1/3] Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Check Server dependencies
if [ ! -d "server/node_modules" ]; then
    echo "[2/3] Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo "[3/3] Starting MoneyVerse servers..."

# Run concurrently
npx concurrently -n "SERVER,CLIENT" -c "blue,cyan" \
  "cd server && npm run dev" \
  "cd client && npm run dev"
