@echo off
setlocal EnableDelayedExpansion

:: Prompt user for input
echo Welcome to Steam Idler Setup

set /p STEAM_LOGIN=Enter your Steam login: 
set /p STEAM_PASS=Enter your Steam password: 
set /p SHARED_SECRET=Enter your Steam 2FA shared secret (leave blank if not used): 
set /p STEAM_API_KEY=Enter your Steam API Key: 
set /p STEAMID64=Enter your SteamID64 (Profile must be public!!!): 
set PORT=3001

:: Create .env file in backend folder
echo Creating .env file in backend folder...
(
  echo STEAM_LOGIN=!STEAM_LOGIN!
  echo STEAM_PASS=!STEAM_PASS!
  echo SHARED_SECRET=!SHARED_SECRET!
  echo STEAM_API_KEY=!STEAM_API_KEY!
  echo STEAMID64=!STEAMID64!
  echo PORT=!PORT!
) > backend\.env

:: Install dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ✅ Setup completed successfully.
pause
