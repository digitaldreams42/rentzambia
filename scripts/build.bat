@echo off
REM build.bat
REM Script to build the RentZambia application on Windows

echo Building RentZambia application...

REM Check if node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18 or later.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install npm.
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
npm ci

REM Run linting
echo Running linting...
npm run lint

REM Run tests
echo Running tests...
npm test

REM Build the application
echo Building the application...
npm run build

echo Build completed successfully!