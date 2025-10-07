@echo off
REM GoDaddy Deployment Script for Windows
REM Windows के लिए GoDaddy Deployment Script

echo ========================================
echo 🚀 Starting GoDaddy Deployment Process
echo ========================================
echo.

REM Step 1: Clean previous build
echo 📦 Step 1: Cleaning previous build...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
echo ✅ Cleaned
echo.

REM Step 2: Install dependencies
echo 📥 Step 2: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    pause
    exit /b %errorlevel%
)
echo ✅ Dependencies installed
echo.

REM Step 3: Run build
echo 🔨 Step 3: Building Next.js application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b %errorlevel%
)
echo ✅ Build completed
echo.

REM Step 4: Create deployment folder
echo 📁 Step 4: Creating deployment package...
if exist godaddy-deploy rmdir /s /q godaddy-deploy
mkdir godaddy-deploy

REM Copy necessary files
xcopy /E /I /Y .next godaddy-deploy\.next
xcopy /E /I /Y public godaddy-deploy\public
copy /Y package.json godaddy-deploy\
copy /Y package-lock.json godaddy-deploy\
copy /Y next.config.js godaddy-deploy\
copy /Y server.js godaddy-deploy\

echo ✅ Deployment package created
echo.

REM Step 5: Create instructions file
echo 📝 Step 5: Creating deployment instructions...
(
echo ================================
echo GoDaddy Upload करने के Steps:
echo ================================
echo.
echo 1. FileZilla खोलें और connect करें:
echo    Host: ftp.yourdomain.com
echo    Username: your-ftp-username
echo    Password: your-ftp-password
echo    Port: 21
echo.
echo 2. सभी files upload करें इस folder से server पर
echo.
echo 3. GoDaddy cPanel में जाएं:
echo    - Setup Node.js App खोलें
echo    - Create/Edit Application
echo    - Node.js Version: 18.x
echo    - Application Root: आपका upload path
echo    - Startup File: server.js
echo    - Run NPM Install button click करें
echo    - Start button click करें
echo.
echo 4. Environment Variables add करें:
echo    NEXT_PUBLIC_BACKEND_URL=https://api.abaspunjab.in
echo    NEXT_PUBLIC_API_URL=https://api.abaspunjab.in
echo    NEXT_PUBLIC_API_BASE_URL=https://api.abaspunjab.in/api
echo    NEXT_PUBLIC_UPLOADS_URL=https://api.abaspunjab.in/uploads
echo    NODE_ENV=production
echo    PORT=3000
echo.
echo 5. Browser में अपना domain खोलें और test करें!
echo.
echo ================================
echo Upload these files to GoDaddy:
echo ================================
echo.
echo ✅ .next/              (build output^)
echo ✅ public/             (static files^)
echo ✅ package.json
echo ✅ package-lock.json
echo ✅ next.config.js
echo ✅ server.js
echo.
echo Then run: npm install --production
echo Then start the app from Node.js App manager
echo.
echo ================================
) > godaddy-deploy\UPLOAD_INSTRUCTIONS.txt

echo ✅ Instructions created
echo.

REM Step 6: Display summary
echo ========================================
echo ✨ Deployment package ready!
echo ========================================
echo.
echo 📁 Location: %cd%\godaddy-deploy\
echo.
echo Next steps:
echo 1. Upload all files from 'godaddy-deploy' folder to GoDaddy
echo 2. Follow instructions in 'UPLOAD_INSTRUCTIONS.txt'
echo 3. Start your Node.js app from cPanel
echo.
echo अगली steps:
echo 1. 'godaddy-deploy' folder की सभी files GoDaddy पर upload करें
echo 2. 'UPLOAD_INSTRUCTIONS.txt' में दिए गए steps follow करें
echo 3. cPanel से अपना Node.js app start करें
echo.
echo For detailed guide, see: GODADDY_DEPLOYMENT_GUIDE.md
echo.
echo 🎉 Happy Deploying!
echo.
pause

