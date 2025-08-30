@echo off
REM deploy.bat
REM Script to deploy the RentZambia application on Windows

echo Deploying RentZambia application...

REM Check if vercel is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI is not installed. Installing...
    npm install -g vercel
)

REM Build the application
echo Building the application...
npm run build

REM Deploy to Vercel
echo Deploying to Vercel...
vercel --prod

echo Deployment completed successfully!