@echo off
title MoneyVerse AI - Platform Launcher
color 0b

echo ===================================================
echo     MoneyVerse AI - 1-Click Platform Launcher
echo ===================================================
echo.

:: 1. Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: 2. Check Client Dependencies
if not exist "client\node_modules\" (
    echo [1/3] Installing frontend dependencies (one-time setup)...
    cd client && npm install && cd ..
) else (
    echo [1/3] Frontend dependencies ready.
)

:: 3. Check Server Dependencies
if not exist "server\node_modules\" (
    echo [2/3] Installing backend dependencies (one-time setup)...
    cd server && npm install && cd ..
) else (
    echo [2/3] Backend dependencies ready.
)

echo.
echo [3/3] Starting Backend & Frontend servers...
echo.

:: 4. Start Backend Server in a new window
start "MoneyVerse Backend Server (Port 5000)" cmd /k "cd server && npm run dev"

:: 5. Start Frontend Vite Server in a new window
start "MoneyVerse Frontend Server (Port 5173)" cmd /k "cd client && npm run dev"

:: 6. Wait 3 seconds and open default browser
timeout /t 3 /nobreak >nul
echo.
echo Opening MoneyVerse AI in your browser...
start http://localhost:5173

echo.
echo ===================================================
echo   MoneyVerse AI is running!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:5000
echo ===================================================
echo Keep the server windows open while testing.
echo Press any key to exit this launcher window.
pause >nul
