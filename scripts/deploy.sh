#!/bin/bash

# deploy.sh
# Script to deploy the RentZambia application

echo "Deploying RentZambia application..."

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment completed successfully!"