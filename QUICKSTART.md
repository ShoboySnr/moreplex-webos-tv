# 🚀 Quick Start Guide - Moreplex webOS

Get your Moreplex app running on LG Smart TV in minutes!

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /Users/damilareshobowale/Documents/projects/moreplex-app/moreplex-webos
npm install
```

### 2. Configure API
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your API URL
# API_URL=https://your-api-domain.com/api/moreplex/v1
```

### 3. Test in Browser
```bash
npm run dev
```
Open http://localhost:3000 and test with keyboard:
- **Arrow keys** = Navigate
- **Enter** = Select
- **Escape** = Back

---

## 📺 Deploy to LG TV (10 minutes)

### Step 1: Install webOS CLI
```bash
npm install -g @webosose/ares-cli
```

### Step 2: Enable Developer Mode on TV
1. Press **Home** button 3 times
2. Press **5, 9, 5, 9** (in sequence)
3. Toggle **"Dev Mode Status"** to ON
4. Note the **IP address** shown
5. **Restart** your TV

### Step 3: Add TV as Device
```bash
# Replace 192.168.1.100 with your TV's IP address
ares-setup-device --add my-tv --info "{'host':'192.168.1.100','port':'9922'}"

# Verify device is added
ares-setup-device --list
```

### Step 4: Build & Deploy
```bash
# Build production version
npm run build

# Package the app
npm run package

# Install on TV
npm run install-tv

# Launch the app
npm run launch-tv
```

---

## 🎮 Testing on TV

### Navigate with Remote Control
- **D-pad arrows** = Navigate menu/content
- **OK/Enter** = Select item
- **Back** = Go back/Exit player
- **Play/Pause** = Control video playback
- **← →** = Seek backward/forward (in player)

### View Logs
```bash
ares-log --device my-tv --follow
```

### Debug with Chrome DevTools
```bash
npm run debug
```

---

## 🔧 Common Issues & Fixes

### ❌ "Device not found"
**Solution**: Check TV is on same network and Developer Mode is enabled

### ❌ "Installation failed"
**Solution**: 
```bash
# Remove old version first
ares-install --device my-tv --remove com.moreplex.tv
# Then reinstall
npm run install-tv
```

### ❌ "App won't launch"
**Solution**: Check logs for errors
```bash
ares-log --device my-tv --follow
```

### ❌ "Video won't play"
**Solution**: 
- Verify API URL in `.env` is correct
- Check video URL format (must be HLS: .m3u8)
- Test video URL in browser first

---

## 📝 Development Workflow

### Daily Development
```bash
# 1. Start dev server
npm run dev

# 2. Make changes
# 3. Test in browser with keyboard

# 4. When ready, deploy to TV
npm run build
npm run install-tv
npm run launch-tv
```

### Update Existing Installation
```bash
# Quick update (no need to remove old version)
npm run build && npm run install-tv && npm run launch-tv
```

---

## 🎨 Customization

### Change App Name/ID
Edit `appinfo.json`:
```json
{
  "id": "com.yourcompany.appname",
  "title": "Your App Name",
  "vendor": "Your Company"
}
```

### Change Colors
Edit `src/styles/global.css`:
```css
:root {
  --primary-color: #E50914;  /* Change to your brand color */
  --secondary-color: #B20710;
}
```

### Add New Pages
1. Create component in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:
```jsx
<Route path="/your-page" element={
  <ProtectedRoute>
    <Navigation />
    <YourPage />
  </ProtectedRoute>
} />
```

---

## 📦 Asset Requirements

Before submitting to LG Content Store, prepare:

| Asset | Size | Format |
|-------|------|--------|
| App Icon | 130x130px | PNG |
| Large Icon | 300x300px | PNG |
| Splash Screen | 1920x1080px | PNG |
| Background | 1920x1080px | PNG |
| Screenshots | 1920x1080px | PNG (min 3) |

Place in `assets/` folder.

---

## 🚀 Next Steps

1. ✅ **Test thoroughly** on your TV
2. ✅ **Customize branding** (colors, icons, name)
3. ✅ **Add features** from moreplex-frontend
4. ✅ **Optimize performance** (code splitting, lazy loading)
5. ✅ **Submit to LG Content Store** (see README.md)

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build production

# webOS Deployment
npm run package          # Create .ipk file
npm run install-tv       # Install on TV
npm run launch-tv        # Launch app on TV
npm run debug            # Open DevTools

# Device Management
ares-setup-device --list                    # List devices
ares-setup-device --add NAME --info {...}   # Add device
ares-setup-device --remove NAME             # Remove device

# App Management
ares-install --device NAME app.ipk          # Install app
ares-launch --device NAME com.app.id        # Launch app
ares-install --device NAME --remove ID      # Uninstall app
ares-inspect --device NAME --app ID --open  # Debug app

# Logs & Info
ares-log --device NAME --follow             # View logs
ares-device-info --device NAME              # Device info
```

---

## 💡 Pro Tips

1. **Use emulator first** - Test on webOS emulator before physical TV
2. **Keep dev server running** - Faster iteration during development
3. **Test on real TV early** - Emulator doesn't catch all issues
4. **Monitor performance** - TVs have less power than computers
5. **Optimize images** - Large images slow down TV apps
6. **Test navigation thoroughly** - Remote control is different from keyboard

---

## 🆘 Need Help?

- **LG Developer Portal**: https://webostv.developer.lge.com
- **webOS Forums**: https://forum.developer.lge.com
- **Documentation**: See README.md for detailed info

---

**Happy Coding! 🎉**
