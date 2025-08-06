#!/bin/bash

# Build Verification Script for Render Deployment

echo "🔍 Verifying build configuration..."

# Check if required files exist
echo "📁 Checking project structure..."
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

if [ ! -f "api/package.json" ]; then
    echo "❌ api/package.json not found"
    exit 1
fi

echo "✅ Project structure verified"

# Check package.json scripts
echo "📦 Verifying package.json scripts..."
if ! grep -q '"build"' package.json; then
    echo "❌ Build script not found in package.json"
    exit 1
fi

if ! grep -q '"start"' package.json; then
    echo "❌ Start script not found in package.json"
    exit 1
fi

echo "✅ Package.json scripts verified"

# Check API package.json scripts
echo "🔧 Verifying API package.json scripts..."
if ! grep -q '"build"' api/package.json; then
    echo "❌ Build script not found in api/package.json"
    exit 1
fi

if ! grep -q '"start"' api/package.json; then
    echo "❌ Start script not found in api/package.json"
    exit 1
fi

echo "✅ API package.json scripts verified"

# Test local build
echo "🏗️ Testing local build..."
if command -v npm &> /dev/null; then
    echo "Installing dependencies..."
    npm install --silent
    
    echo "Building frontend..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend build successful"
    else
        echo "❌ Frontend build failed"
        exit 1
    fi
    
    echo "Building API..."
    cd api
    npm install --silent
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ API build successful"
    else
        echo "❌ API build failed"
        exit 1
    fi
    
    cd ..
else
    echo "⚠️ npm not found, skipping build test"
fi

echo ""
echo "🎉 All verifications passed!"
echo "📤 Ready for Render deployment"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub repository"
echo "2. Connect repository to Render"
echo "3. Deploy using render.yaml blueprint"
