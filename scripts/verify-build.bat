@echo off
REM Build Verification Script for Render Deployment

echo 🔍 Verifying build configuration...

REM Check if required files exist
echo 📁 Checking project structure...
if not exist "render.yaml" (
    echo ❌ render.yaml not found
    exit /b 1
)

if not exist "package.json" (
    echo ❌ package.json not found
    exit /b 1
)

if not exist "api\package.json" (
    echo ❌ api\package.json not found
    exit /b 1
)

echo ✅ Project structure verified

REM Check package.json scripts
echo 📦 Verifying package.json scripts...
findstr /C:"\"build\"" package.json >nul
if errorlevel 1 (
    echo ❌ Build script not found in package.json
    exit /b 1
)

findstr /C:"\"start\"" package.json >nul
if errorlevel 1 (
    echo ❌ Start script not found in package.json
    exit /b 1
)

echo ✅ Package.json scripts verified

REM Check API package.json scripts
echo 🔧 Verifying API package.json scripts...
findstr /C:"\"build\"" api\package.json >nul
if errorlevel 1 (
    echo ❌ Build script not found in api\package.json
    exit /b 1
)

findstr /C:"\"start\"" api\package.json >nul
if errorlevel 1 (
    echo ❌ Start script not found in api\package.json
    exit /b 1
)

echo ✅ API package.json scripts verified

REM Test local build
echo 🏗️ Testing local build...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo Installing dependencies...
    npm install --silent
    
    echo Building frontend...
    npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ Frontend build successful
    ) else (
        echo ❌ Frontend build failed
        exit /b 1
    )
    
    echo Building API...
    cd api
    npm install --silent
    npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ API build successful
    ) else (
        echo ❌ API build failed
        exit /b 1
    )
    
    cd ..
) else (
    echo ⚠️ npm not found, skipping build test
)

echo.
echo 🎉 All verifications passed!
echo 📤 Ready for Render deployment
echo.
echo Next steps:
echo 1. Push code to GitHub repository
echo 2. Connect repository to Render
echo 3. Deploy using render.yaml blueprint

pause
