#!/bin/bash

# build.sh
# Script to build the RentZambia application

echo "Building RentZambia application..."

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run linting
echo "Running linting..."
npm run lint

# Run tests
echo "Running tests..."
npm test

# Build the application
echo "Building the application..."
npm run build

echo "Build completed successfully!"