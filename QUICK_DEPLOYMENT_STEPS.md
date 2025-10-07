# 🚀 Quick Deployment Steps for GoDaddy

## तुरंत Deploy करने के लिए / Quick Deployment

### Method 1: Node.js Hosting (Best) ⭐

```bash
# Step 1: अपने computer पर build बनाएं
cd frontend
npm install
npm run build

# Step 2: ये files upload करें (FileZilla या File Manager से)
📁 .next/
📁 public/
📄 package.json
📄 package-lock.json
📄 next.config.js
📄 server.js
📄 .env.production (rename to .env)

# Step 3: GoDaddy cPanel पर
1. Setup Node.js App खोलें
2. Create Application:
   - Node.js Version: 18.x
   - Application Root: /home/username/frontend
   - Application URL: yourdomain.com
   - Startup File: server.js
3. Run NPM Install
4. Start Application

# Done! ✅ आपकी website live है
```

---

### Method 2: Static Export (Simple) 📦

```bash
# Step 1: next.config.js में add करें
output: 'export',
images: { unoptimized: true }

# Step 2: Build करें
npm run build

# Step 3: 'out' folder की सभी files को public_html में upload करें

# Step 4: .htaccess file add करें (guide में दिया गया)

# Done! ✅ Website live है
```

---

## FileZilla Setup (5 minutes) 📡

```
Host: ftp.yourdomain.com
Username: your-ftp-username@yourdomain.com
Password: your-ftp-password
Port: 21
```

**Files Upload करने का सही तरीका:**
1. Local Site (left): अपना frontend folder select करें
2. Remote Site (right): server path select करें
3. सभी files drag करें left से right

---

## Troubleshooting (समस्या हल करें) 🔧

### ❌ App Start नहीं हो रही
```bash
# cPanel Terminal में:
cd ~/frontend
npm install
npm run build
# फिर Node.js App से restart करें
```

### ❌ Page load नहीं हो रहे
- .htaccess file check करें
- DNS settings verify करें
- SSL certificate active है check करें

### ❌ API calls fail हो रही हैं
- CORS backend में enable करें
- Environment variables सही हैं check करें
- Browser console में errors देखें

---

## Important URLs 🔗

- **cPanel**: https://yourdomain.com:2083
- **GoDaddy Account**: https://account.godaddy.com
- **File Manager**: cPanel → Files → File Manager
- **Node.js Apps**: cPanel → Software → Setup Node.js App
- **SSL**: cPanel → Security → SSL/TLS Status

---

## Need Help? 📞

- Full Guide देखें: `GODADDY_DEPLOYMENT_GUIDE.md`
- GoDaddy Support: Call या Chat
- Error Logs: cPanel → Metrics → Errors

---

**✨ Happy Deploying! शुभकामनाएं! ✨**



