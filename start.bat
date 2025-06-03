@echo off
echo Starting Steam Idler...

:: Start backend
start "Backend" cmd /k "cd backend && npm run start"

:: Start frontend
start "Frontend" cmd /k "cd frontend && npm run dev"

:: Wait a moment for frontend to start before opening browser
timeout /t 5 >nul

:: Open frontend in default browser
start http://localhost:5173

echo ✅ Steam Idler is launching...
