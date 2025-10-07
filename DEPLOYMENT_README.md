# 🚀 GoDaddy Deployment - Complete Guide

आपके Next.js application को GoDaddy पर deploy करने के लिए सभी जरूरी files और instructions।

---

## 📚 Available Files / उपलब्ध Files

| File | Description |
|------|-------------|
| `GODADDY_DEPLOYMENT_GUIDE.md` | **Complete detailed guide** - सभी details के साथ पूरी guide |
| `QUICK_DEPLOYMENT_STEPS.md` | **Quick reference** - तुरंत deploy करने के लिए steps |
| `server.js` | Production server file (Node.js hosting के लिए) |
| `deploy.bat` | **Windows automation script** - Windows पर चलाएं |
| `deploy.sh` | Linux/Mac automation script |

---

## 🎯 कैसे शुरू करें / How to Start

### Option 1: Automated (Recommended) ⭐

**Windows Users:**
```bash
cd frontend
deploy.bat
```

**Mac/Linux Users:**
```bash
cd frontend
chmod +x deploy.sh
./deploy.sh
```

यह script automatically:
- ✅ Dependencies install करेगा
- ✅ Production build बनाएगा
- ✅ `godaddy-deploy` folder में सभी files copy करेगा
- ✅ Upload instructions create करेगा

### Option 2: Manual

1. **Build बनाएं:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **ये files upload करें GoDaddy पर:**
   - `.next/` folder
   - `public/` folder
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `server.js`

3. **GoDaddy cPanel में setup करें:**
   - Setup Node.js App खोलें
   - Application बनाएं
   - NPM Install run करें
   - Start करें

---

## 📖 Documentation

### पूरी Guide के लिए / For Complete Guide:
📄 **[GODADDY_DEPLOYMENT_GUIDE.md](./GODADDY_DEPLOYMENT_GUIDE.md)**
- Step-by-step detailed instructions
- Troubleshooting guide
- SSL setup
- Environment variables
- Domain configuration

### Quick Steps के लिए / For Quick Steps:
📄 **[QUICK_DEPLOYMENT_STEPS.md](./QUICK_DEPLOYMENT_STEPS.md)**
- 5-minute deployment guide
- Common issues और solutions
- Important URLs

---

## 🔧 GoDaddy पर Setup

### Node.js Hosting Setup

1. **cPanel Login करें**: `yourdomain.com:2083`

2. **Setup Node.js App** खोजें और खोलें

3. **Create Application** click करें:
   ```
   Node.js Version: 18.x या higher
   Application Mode: Production
   Application Root: /home/username/frontend
   Application URL: yourdomain.com
   Startup File: server.js
   ```

4. **Environment Variables** add करें:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://api.abaspunjab.in
   NEXT_PUBLIC_API_URL=https://api.abaspunjab.in
   NEXT_PUBLIC_API_BASE_URL=https://api.abaspunjab.in/api
   NEXT_PUBLIC_UPLOADS_URL=https://api.abaspunjab.in/uploads
   NODE_ENV=production
   PORT=3000
   ```

5. **Run NPM Install** button click करें

6. **Start** button click करें

7. ✅ Done! आपकी website live है

---

## 📦 Files को Upload कैसे करें

### FileZilla Use करें (Recommended)

1. **FileZilla Download करें**: https://filezilla-project.org/

2. **Connect करें**:
   ```
   Host: ftp.yourdomain.com
   Username: your-ftp-username
   Password: your-ftp-password
   Port: 21
   ```

3. **Upload करें**:
   - Left side: अपना `godaddy-deploy` folder select करें
   - Right side: server path select करें (जैसे `/home/username/frontend`)
   - सभी files drag and drop करें

### या cPanel File Manager Use करें

1. cPanel → Files → **File Manager**
2. Application folder में जाएं
3. **Upload** button click करें
4. सभी files select करके upload करें

---

## ⚙️ Configuration Files

### `next.config.js`
Already configured with:
- ✅ Production optimizations
- ✅ Image domains
- ✅ Security headers
- ✅ Compression

### `server.js`
Production server with:
- ✅ Error handling
- ✅ Request logging
- ✅ Graceful shutdown
- ✅ Port configuration

---

## 🔐 Environment Variables

अपने GoDaddy Node.js App में ये variables add करें:

```env
NEXT_PUBLIC_BACKEND_URL=https://api.abaspunjab.in
NEXT_PUBLIC_API_URL=https://api.abaspunjab.in
NEXT_PUBLIC_API_BASE_URL=https://api.abaspunjab.in/api
NEXT_PUBLIC_UPLOADS_URL=https://api.abaspunjab.in/uploads
NODE_ENV=production
PORT=3000
```

---

## 🎨 Deployment Methods

### Method 1: Node.js Hosting (Best for Full Features)
✅ Server-side rendering  
✅ API routes support  
✅ Dynamic content  
✅ Image optimization  

**Use When:** आपको full Next.js features चाहिए

### Method 2: Static Export (Simpler)
✅ Fast loading  
✅ Better SEO  
✅ No Node.js needed  
❌ No server-side features  

**Use When:** सिर्फ static website चाहिए

---

## ✅ Pre-Deployment Checklist

Deploy करने से पहले check करें:

- [ ] `npm run build` successfully run हो रहा है
- [ ] सभी API URLs production में point कर रहे हैं
- [ ] Environment variables सही हैं
- [ ] Images properly load हो रही हैं local पर
- [ ] सभी pages test किए हैं
- [ ] Console में कोई errors नहीं हैं

---

## 🔍 Post-Deployment Testing

Deploy होने के बाद test करें:

1. **Homepage**: `https://yourdomain.com`
2. **All Pages**: Blog, Gallery, Matrimony, etc.
3. **API Calls**: Check browser console
4. **Images**: सभी images load हो रही हैं
5. **Forms**: Submit test करें
6. **Mobile**: Mobile view check करें
7. **SSL**: `https://` काम कर रहा है

---

## 🐛 Common Issues & Solutions

### Issue: "Application failed to start"
```bash
# Solution: Terminal में
cd ~/frontend
npm install
npm run build
# फिर Node.js App से restart करें
```

### Issue: "404 Error on pages"
- Check: .htaccess file properly configured है
- Check: Application URL correctly set है

### Issue: "Images not loading"
- Check: Image domains `next.config.js` में हैं
- Check: NEXT_PUBLIC_UPLOADS_URL सही है

### Issue: "API calls failing"
- Check: Backend CORS enabled है
- Check: Environment variables सही हैं
- Check: API URL accessible है

---

## 📞 Support & Help

### GoDaddy Support
- **Website**: https://in.godaddy.com/help
- **Phone**: GoDaddy customer care
- **Chat**: 24/7 live chat available

### Error Logs देखें
- cPanel → **Metrics** → **Errors**
- या Node.js App में **View Logs**

### Browser Console
- Press `F12` → **Console** tab
- Network requests check करें

---

## 🔄 Updates Deploy करने के लिए

जब भी code update करें:

```bash
# 1. Build बनाएं
cd frontend
npm run build

# 2. Files upload करें (updated files only)
# FileZilla से updated files upload करें

# 3. Restart Application
# GoDaddy Node.js App से restart करें
```

---

## 📊 Performance Optimization

Deploy होने के बाद optimize करें:

1. **Enable Compression**: .htaccess में already है
2. **Image Optimization**: WebP format use करें
3. **Caching**: Browser caching enable है
4. **CDN**: Consider CloudFlare (optional)
5. **Lazy Loading**: Already implemented

---

## 🛡️ Security

### SSL Certificate
```
cPanel → SSL/TLS Status → Run AutoSSL
```

### Security Headers
Already configured in `next.config.js`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

## 💡 Pro Tips

1. **Regular Backups**: cPanel Backup wizard से weekly backup लें
2. **Git Repository**: Code हमेशा Git में रखें
3. **Error Monitoring**: Regular error logs check करें
4. **Performance**: Google PageSpeed Insights से test करें
5. **Updates**: Dependencies regularly update करें (`npm update`)

---

## 📈 Next Steps After Deployment

1. ✅ SSL Certificate setup करें
2. ✅ Google Analytics add करें (optional)
3. ✅ Sitemap submit करें Google में
4. ✅ Test सभी features को
5. ✅ Backup schedule set करें
6. ✅ Monitor error logs
7. ✅ Performance optimize करें

---

## 🎓 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **GoDaddy Help**: https://in.godaddy.com/help
- **cPanel Guide**: cPanel में built-in documentation
- **FileZilla Docs**: https://filezilla-project.org/support.php

---

## 📝 Quick Commands Reference

```bash
# Local Development
npm run dev              # Development server start

# Production Build
npm run build           # Production build बनाएं
npm start               # Production server start

# Deployment
deploy.bat              # Windows पर deployment prepare करें
./deploy.sh             # Linux/Mac पर deployment prepare करें

# Server Commands (cPanel Terminal)
cd ~/frontend           # Application folder में जाएं
npm install            # Dependencies install
npm run build          # Build create करें
```

---

## ✨ Summary / सारांश

**English:**
1. Run `deploy.bat` (Windows) or `./deploy.sh` (Mac/Linux)
2. Upload files from `godaddy-deploy` folder to GoDaddy
3. Setup Node.js App in cPanel
4. Add environment variables
5. Run NPM Install and Start
6. Your website is live! 🎉

**Hindi:**
1. `deploy.bat` (Windows) या `./deploy.sh` (Mac/Linux) चलाएं
2. `godaddy-deploy` folder की files GoDaddy पर upload करें
3. cPanel में Node.js App setup करें
4. Environment variables add करें
5. NPM Install और Start करें
6. आपकी website live है! 🎉

---

## 📞 Need More Help? / और मदद चाहिए?

पूरी detailed guide के लिए देखें:
**[GODADDY_DEPLOYMENT_GUIDE.md](./GODADDY_DEPLOYMENT_GUIDE.md)**

---

**✨ Good Luck with Your Deployment! शुभकामनाएं! ✨**

---

*Last Updated: October 2025*  
*Next.js Version: 15.1.6*  
*Tested on: GoDaddy cPanel Hosting*



