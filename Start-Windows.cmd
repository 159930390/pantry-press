@echo off
cd /d "%~dp0"
where node >nul 2>nul
if not errorlevel 1 goto start
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
 start "" http://127.0.0.1:4179
 "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" preview.mjs
 goto end
)
echo Install Node.js 22 or later, then run this file again.
pause
exit /b 1
:start
start "" http://127.0.0.1:4179
node preview.mjs
:end
pause