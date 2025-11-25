@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\osaed\Desktop\NLG web project"
echo Starting Next.js development server...
start /B npm run dev
timeout /t 10 /nobreak > nul
echo Opening Firefox...
start firefox http://localhost:3000
echo.
echo Server is running. Press Ctrl+C to stop.
pause
