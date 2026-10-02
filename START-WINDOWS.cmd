@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules\next\package.json (
  call npm ci
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)
echo Open http://localhost:3000 once the server says Ready.
call npm run dev
pause
