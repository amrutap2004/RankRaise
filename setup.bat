@echo off
echo Installing Intern Dashboard Dependencies...
echo.

echo Installing backend dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd client
npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Setup complete! 
echo.
echo To run the application:
echo 1. Make sure MongoDB is running
echo 2. Run: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
pause 