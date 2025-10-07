#!/bin/bash
# GoDaddy Deployment Script
# GoDaddy के लिए Deployment Script

echo "🚀 Starting GoDaddy Deployment Process..."
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean previous build
echo ""
echo "${YELLOW}📦 Step 1: Cleaning previous build...${NC}"
rm -rf .next
rm -rf out
echo "${GREEN}✅ Cleaned${NC}"

# Step 2: Install dependencies
echo ""
echo "${YELLOW}📥 Step 2: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo "${RED}❌ npm install failed${NC}"
    exit 1
fi
echo "${GREEN}✅ Dependencies installed${NC}"

# Step 3: Run build
echo ""
echo "${YELLOW}🔨 Step 3: Building Next.js application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}❌ Build failed${NC}"
    exit 1
fi
echo "${GREEN}✅ Build completed${NC}"

# Step 4: Create deployment folder
echo ""
echo "${YELLOW}📁 Step 4: Creating deployment package...${NC}"
rm -rf godaddy-deploy
mkdir -p godaddy-deploy

# Copy necessary files
cp -r .next godaddy-deploy/
cp -r public godaddy-deploy/
cp package.json godaddy-deploy/
cp package-lock.json godaddy-deploy/
cp next.config.js godaddy-deploy/
cp server.js godaddy-deploy/

echo "${GREEN}✅ Deployment package created${NC}"

# Step 5: Create instructions file
echo ""
echo "${YELLOW}📝 Step 5: Creating deployment instructions...${NC}"
cat > godaddy-deploy/UPLOAD_INSTRUCTIONS.txt << 'EOF'
================================
GoDaddy Upload करने के Steps:
================================

1. FileZilla खोलें और connect करें:
   Host: ftp.yourdomain.com
   Username: your-ftp-username
   Password: your-ftp-password
   Port: 21

2. सभी files upload करें इस folder से server पर

3. GoDaddy cPanel में जाएं:
   - Setup Node.js App खोलें
   - Create/Edit Application
   - Node.js Version: 18.x
   - Application Root: आपका upload path
   - Startup File: server.js
   - Run NPM Install button click करें
   - Start button click करें

4. Environment Variables add करें:
   NEXT_PUBLIC_BACKEND_URL=https://api.abaspunjab.in
   NEXT_PUBLIC_API_URL=https://api.abaspunjab.in
   NEXT_PUBLIC_API_BASE_URL=https://api.abaspunjab.in/api
   NEXT_PUBLIC_UPLOADS_URL=https://api.abaspunjab.in/uploads
   NODE_ENV=production
   PORT=3000

5. Browser में अपना domain खोलें और test करें!

================================
Upload these files to GoDaddy:
================================

✅ .next/              (build output)
✅ public/             (static files)
✅ package.json
✅ package-lock.json
✅ next.config.js
✅ server.js

Then run: npm install --production
Then start the app from Node.js App manager

================================
EOF

echo "${GREEN}✅ Instructions created${NC}"

# Step 6: Display summary
echo ""
echo "================================================"
echo "${GREEN}✨ Deployment package ready!${NC}"
echo "================================================"
echo ""
echo "📁 Location: $(pwd)/godaddy-deploy/"
echo ""
echo "Next steps:"
echo "1. Upload all files from 'godaddy-deploy' folder to GoDaddy"
echo "2. Follow instructions in 'UPLOAD_INSTRUCTIONS.txt'"
echo "3. Start your Node.js app from cPanel"
echo ""
echo "${YELLOW}For detailed guide, see: GODADDY_DEPLOYMENT_GUIDE.md${NC}"
echo ""
echo "अगली steps:"
echo "1. 'godaddy-deploy' folder की सभी files GoDaddy पर upload करें"
echo "2. 'UPLOAD_INSTRUCTIONS.txt' में दिए गए steps follow करें"
echo "3. cPanel से अपना Node.js app start करें"
echo ""
echo "${GREEN}🎉 Happy Deploying!${NC}"
echo ""



