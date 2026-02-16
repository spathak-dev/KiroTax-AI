#!/bin/bash

echo "🚀 Starting KiroTax AI Frontend..."

cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "✅ Starting Next.js on http://localhost:3000"
npm run dev
