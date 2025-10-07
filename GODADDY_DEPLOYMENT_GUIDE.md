# GoDaddy पर Next.js Frontend Deploy करने की Complete Guide
# Complete Guide to Deploy Next.js Frontend on GoDaddy

## 📋 विषय सूची / Table of Contents

1. [Method 1: Node.js Hosting (Recommended)](#method-1-nodejs-hosting)
2. [Method 2: Static Export with cPanel](#method-2-static-export)
3. [Environment Variables Setup](#environment-variables)
4. [SSL Certificate Setup](#ssl-setup)
5. [Troubleshooting](#troubleshooting)

---

## Method 1: Node.js Hosting (Recommended) ✅

यह method सबसे अच्छा है अगर आपके GoDaddy account में Node.js support है।

### Step 1: अपना Next.js Project Build करें / Build Your Next.js Project

```bash
# Terminal में frontend folder में जाएं
cd frontend

# Dependencies install करें
npm install

# Production build बनाएं
npm run build
```

### Step 2: Production Files तैयार करें / Prepare Production Files

Build के बाद आपको ये files/folders upload करने हैं:

```
✅ .next/          (build folder)
✅ public/         (static assets)
✅ node_modules/   (dependencies)
✅ package.json
✅ package-lock.json
✅ next.config.js
```

**नोट**: `node_modules` बड़ा है, तो server पर `npm install` run करना बेहतर होगा।

### Step 3: GoDaddy cPanel में Login करें

1. अपने GoDaddy account में login करें
2. **My Products** पर जाएं
3. **cPanel** open करें

### Step 4: Node.js Setup करें

1. cPanel में **Setup Node.js App** खोजें और click करें
2. **Create Application** button पर click करें
3. निम्नलिखित details भरें:

   - **Node.js Version**: 18.x या higher select करें
   - **Application Mode**: Production
   - **Application Root**: `frontend` (या जहां आप upload करेंगे)
   - **Application URL**: आपका domain (जैसे: `yourdomain.com`)
   - **Application Startup File**: `server.js` (हम बनाएंगे)

### Step 5: Server.js File बनाएं

आपके frontend folder में एक `server.js` file बनानी होगी:

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Step 6: Files Upload करें (FTP/File Manager)

**Option A: File Manager से** (छोटे projects के लिए)
1. cPanel में **File Manager** खोलें
2. Application root folder में जाएं
3. सभी files upload करें

**Option B: FileZilla/FTP से** (Recommended)
1. FileZilla download करें: https://filezilla-project.org/
2. GoDaddy से FTP credentials लें:
   - cPanel → **FTP Accounts** → Details देखें
3. FileZilla में connect करें:
   ```
   Host: ftp.yourdomain.com
   Username: आपका FTP username
   Password: आपका FTP password
   Port: 21
   ```
4. सभी files upload करें (except `node_modules`)

### Step 7: Dependencies Install करें

1. cPanel में वापस **Setup Node.js App** में जाएं
2. आपकी application पर click करें
3. **Run NPM Install** button पर click करें

या Terminal से:
```bash
# cPanel Terminal खोलें
cd frontend  # (या आपका application path)
npm install --production
```

### Step 8: Application Start करें

1. **Setup Node.js App** में
2. **Start** button पर click करें
3. अगर सब सही है तो status **Running** हो जाएगा

### Step 9: Domain को Application से Link करें

1. **Setup Node.js App** में आपकी app select करें
2. **Edit** करें
3. **Application URL** में अपना domain डालें
4. **Save** करें

---

## Method 2: Static Export with cPanel 📦

अगर आपको Node.js hosting नहीं है, तो static export use करें।

### Step 1: Next.js को Static Export के लिए Configure करें

`next.config.js` में ये changes करें:

```javascript
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',  // ⭐ Add this line
  reactStrictMode: true,
  trailingSlash: true,  // ⭐ Add this for better compatibility
  images: {
    unoptimized: true,  // ⭐ Required for static export
    domains: ["localhost", "images.unsplash.com", "api.abaspunjab.in"],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_BASE_URL: 'https://api.abaspunjab.in/api',
    NEXT_PUBLIC_UPLOADS_URL: 'https://api.abaspunjab.in/uploads',
  },
};

module.exports = nextConfig;
```

### Step 2: Static Build बनाएं

```bash
cd frontend
npm install
npm run build
```

Build होने के बाद `out` folder बनेगा जिसमें सभी static files होंगी।

### Step 3: Files Upload करें

1. **cPanel File Manager** खोलें
2. **public_html** folder में जाएं (या आपका domain folder)
3. `out` folder की सभी contents upload करें
   - **Important**: सिर्फ `out` folder के अंदर की files, फोल्डर नहीं!

```
public_html/
├── _next/
├── images/
├── index.html
├── blog/
├── gallery/
├── matrimony/
└── ...
```

### Step 4: .htaccess File बनाएं (URL Routing के लिए)

`public_html` में `.htaccess` file बनाएं:

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # HTTPS redirect (optional but recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Handle Next.js static files
  RewriteRule ^_next/(.*)$ _next/$1 [L]
  RewriteRule ^api/(.*)$ api/$1 [L]
  
  # Handle all routes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /$1.html [L,QSA]
  
  # Handle index
  RewriteRule ^$ /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## Environment Variables Setup 🔐

### GoDaddy Node.js App में:

1. **Setup Node.js App** में जाएं
2. आपकी app select करें
3. **Edit** करें
4. **Environment Variables** section में add करें:

```
NEXT_PUBLIC_BACKEND_URL=https://api.abaspunjab.in
NEXT_PUBLIC_API_URL=https://api.abaspunjab.in
NEXT_PUBLIC_API_BASE_URL=https://api.abaspunjab.in/api
NEXT_PUBLIC_UPLOADS_URL=https://api.abaspunjab.in/uploads
NODE_ENV=production
PORT=3000
```

---

## SSL Certificate Setup 🔒

1. cPanel में **SSL/TLS Status** खोलें
2. अपने domain के सामने **Run AutoSSL** click करें
3. Free Let's Encrypt SSL certificate install हो जाएगा

या

1. cPanel → **SSL/TLS**
2. **Manage SSL Sites**
3. अपना domain select करें और certificate install करें

---

## Deployment Checklist ✅

### Before Upload:
- [ ] `npm run build` successfully complete हुआ
- [ ] `.env` में सही API URLs हैं
- [ ] All dependencies updated हैं (`npm update`)
- [ ] Testing local पर की है

### After Upload:
- [ ] सभी files properly upload हो गई हैं
- [ ] Node.js app running है (Method 1)
- [ ] Domain correctly pointed है
- [ ] SSL certificate active है
- [ ] सभी pages load हो रहे हैं
- [ ] API calls काम कर रही हैं
- [ ] Images load हो रही हैं

---

## Troubleshooting 🔧

### Issue 1: "Application Failed to Start"
**Solution:**
```bash
# Terminal में
cd your-app-folder
npm install
# Check logs
cat logs/nodejs.log
```

### Issue 2: 404 Errors on Page Refresh
**Solution:** `.htaccess` file properly configured है check करें

### Issue 3: Images Not Loading
**Solution:** 
- `next.config.js` में `unoptimized: true` add करें
- Image paths check करें

### Issue 4: API Calls Failing
**Solution:**
- CORS settings backend में check करें
- Environment variables सही हैं confirm करें
- Browser console में errors check करें

### Issue 5: Slow Loading
**Solution:**
- Compression enable करें (.htaccess में)
- Images optimize करें
- Cache headers set करें

---

## Important Commands 💻

```bash
# Local build test
npm run build
npm start

# Production build
NODE_ENV=production npm run build

# Clear cache
rm -rf .next
npm run build

# Check Node version
node -v

# Install specific Node version
nvm install 18
nvm use 18
```

---

## Post-Deployment Steps 🎯

1. **Performance Check**: Google PageSpeed Insights से test करें
2. **Security Check**: SSL properly काम कर रहा है verify करें
3. **Functionality Test**: सभी pages और features test करें
4. **SEO Check**: Meta tags और sitemap verify करें
5. **Analytics Setup**: Google Analytics या अन्य tracking add करें

---

## Domain Configuration (अगर नया domain है) 🌐

1. **GoDaddy DNS Manager** खोलें
2. **A Record** add करें:
   ```
   Type: A
   Name: @
   Value: आपके server का IP address
   TTL: 600
   ```
3. **CNAME Record** (www के लिए):
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   TTL: 600
   ```

---

## Maintenance Tips 💡

### Regular Updates:
```bash
# Dependencies update
npm update

# Security audit
npm audit
npm audit fix

# Rebuild after updates
npm run build
```

### Backup:
- Regular backup लें cPanel Backup wizard से
- Git repository में code रखें
- Database backup भी रखें

### Monitoring:
- Error logs regularly check करें
- Server resources monitor करें
- SSL expiry date track करें

---

## Contact & Support 📞

- **GoDaddy Support**: https://in.godaddy.com/help
- **Next.js Docs**: https://nextjs.org/docs
- **FileZilla Support**: https://filezilla-project.org/support.php

---

## Quick Reference Commands 📝

```bash
# Build Commands
npm install              # Install dependencies
npm run build           # Create production build
npm start               # Start production server
npm run dev             # Start development server

# Server Commands (via cPanel Terminal)
cd ~/frontend           # Navigate to app
pm2 start server.js     # Start with PM2 (if available)
pm2 stop all           # Stop all apps
pm2 restart all        # Restart all apps
pm2 logs               # View logs

# File Permissions
chmod 755 frontend/    # Set folder permissions
chmod 644 *.js         # Set file permissions
```

---

## अतिरिक्त सहायता / Additional Help

अगर कोई problem आए तो:

1. **Error Logs देखें**: cPanel → Metrics → Errors
2. **Browser Console देखें**: F12 → Console tab
3. **Network Tab देखें**: API calls check करने के लिए
4. **GoDaddy Support Contact करें**: 24/7 available

---

**✨ Deployment शुभकामनाएं! / Good Luck with Deployment! ✨**

---

## Version History

- v1.0 - Initial guide creation
- Current Next.js version: 15.1.6
- Tested on: GoDaddy cPanel hosting

