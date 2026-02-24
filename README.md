# Moreplex webOS - LG Smart TV App

A custom React application for LG webOS Smart TVs, bringing the Moreplex streaming platform to LG televisions.

## 🎯 Features

- ✅ **Custom React App** - Built from scratch for optimal webOS performance
- ✅ **Spatial Navigation** - Full remote control support with D-pad navigation
- ✅ **Video Streaming** - HLS/DASH playback with Video.js
- ✅ **User Authentication** - Login and profile selection
- ✅ **Live TV** - EPG integration and live channel streaming
- ✅ **Movies & Series** - Browse and watch on-demand content
- ✅ **TV-Optimized UI** - 10-foot interface design for living room viewing
- ✅ **Multi-language** - Support for 20+ languages

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v16 or higher)
2. **LG webOS TV SDK** installed
3. **LG Developer Account** (for deployment)
4. **Physical LG TV** or **webOS Emulator** for testing

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd /Users/damilareshobowale/Documents/projects/moreplex-app/moreplex-webos
npm install
```

### 2. Install webOS CLI Tools

```bash
npm install -g @webosose/ares-cli
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
API_URL=https://your-api-domain.com/api/moreplex/v1
```

## 🚀 Development

### Run Development Server

```bash
npm run dev
```

This will start a local development server at `http://localhost:3000`. You can test with keyboard navigation (arrow keys simulate remote control).

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📦 webOS Deployment

### 1. Set Up webOS Device

**For Emulator:**
```bash
# Add emulator as device
ares-setup-device --add webos-emulator --info "{'host':'127.0.0.1','port':'9922'}"
```

**For Physical TV:**
```bash
# Enable Developer Mode on TV:
# 1. Press Home button 3 times
# 2. Press 5, 9, 5, 9
# 3. Turn on "Dev Mode Status"
# 4. Restart TV

# Add TV as device (replace with your TV's IP)
ares-setup-device --add my-tv --info "{'host':'192.168.1.100','port':'9922'}"
```

### 2. Package the App

```bash
npm run package
```

This creates an `.ipk` file in the `build/` directory.

### 3. Install on TV

```bash
npm run install-tv
```

Or manually:
```bash
ares-install --device my-tv ./build/com.moreplex.tv_1.0.0_all.ipk
```

### 4. Launch the App

```bash
npm run launch-tv
```

Or manually:
```bash
ares-launch --device my-tv com.moreplex.tv
```

### 5. Debug the App

```bash
npm run debug
```

This opens Chrome DevTools for debugging.

## 🎮 Remote Control Mapping

| Remote Button | Action | Key Code |
|--------------|--------|----------|
| **Arrow Keys** | Navigate | 37, 38, 39, 40 |
| **OK/Enter** | Select | 13 |
| **Back** | Go back | 461 |
| **Play/Pause** | Toggle playback | 415, 179 |
| **Rewind** | Seek backward | 412 |
| **Fast Forward** | Seek forward | 417 |
| **Volume Up/Down** | Adjust volume | 38, 40 (in player) |

## 📁 Project Structure

```
moreplex-webos/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx   # Main navigation bar
│   │   ├── WebOSVideoPlayer.jsx  # Video player
│   │   ├── MovieRow.jsx     # Horizontal movie carousel
│   │   ├── MovieGrid.jsx    # Grid layout for movies
│   │   ├── ChannelGrid.jsx  # Live TV channels
│   │   └── FeaturedBanner.jsx  # Hero banner
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Main landing page
│   │   ├── LoginPage.jsx    # Authentication
│   │   ├── ProfilesPage.jsx # Profile selection
│   │   ├── LiveTVPage.jsx   # Live TV channels
│   │   ├── MoviesPage.jsx   # Movies library
│   │   └── VideoPlayerPage.jsx  # Video playback
│   ├── context/             # React contexts
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── WebOSContext.jsx # webOS APIs
│   ├── services/            # API services
│   │   └── api.js           # API client
│   ├── styles/              # Global styles
│   │   └── global.css       # CSS variables & utilities
│   ├── App.jsx              # Root component
│   ├── index.js             # Entry point
│   └── index.html           # HTML template
├── assets/                  # App assets
│   ├── icon.png            # App icon (130x130)
│   ├── largeIcon.png       # Large icon (300x300)
│   ├── splash.png          # Splash screen
│   └── bg.png              # Background image
├── appinfo.json            # webOS app manifest
├── webpack.config.js       # Webpack configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🎨 UI Guidelines

### 10-Foot UI Design

- **Font sizes**: Minimum 24px for body text, 42px+ for headings
- **Focus indicators**: 4px white border with scale transform
- **Safe area**: 10% margin (54px top/bottom, 96px left/right)
- **Grid layouts**: 4-5 items per row for optimal viewing
- **Colors**: High contrast for TV viewing distance

### Spatial Navigation

All interactive elements use the `focusable` class and handle:
- Arrow key navigation (up, down, left, right)
- Enter/OK for selection
- Back button for navigation

## 🔧 API Integration

The app connects to the Moreplex backend API:

**Base URL**: `https://localhost:8000/api/moreplex/v1`

**Key Endpoints**:
- `POST /login` - User authentication
- `GET /user` - Get user data
- `GET /profiles` - Get user profiles
- `GET /movies` - Get movies list
- `GET /movies/{slug}` - Get movie details
- `GET /readEpg` - Get live TV channels
- `GET /packages` - Get subscription packages

## 🎬 Video Playback

### Supported Formats
- **HLS** (HTTP Live Streaming) - Primary format
- **DASH** (MPEG-DASH) - Alternative format
- **DRM**: PlayReady (webOS native)

### Video.js Configuration
```javascript
{
  controls: true,
  autoplay: true,
  fluid: true,
  aspectRatio: '16:9',
  playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2]
}
```

## 📱 Testing

### Browser Testing (Development)
```bash
npm run dev
# Use keyboard arrow keys to simulate remote control
```

### webOS Emulator Testing
```bash
# Package and install on emulator
npm run package
ares-install --device webos-emulator ./build/*.ipk
ares-launch --device webos-emulator com.moreplex.tv
```

### Physical TV Testing
```bash
# Package and install on TV
npm run install-tv
npm run launch-tv
```

## 🐛 Debugging

### View Logs
```bash
ares-log --device my-tv --follow
```

### Inspect with DevTools
```bash
ares-inspect --device my-tv --app com.moreplex.tv --open
```

### Common Issues

**Issue**: App won't install
- **Solution**: Check TV is in Developer Mode and IP address is correct

**Issue**: Video won't play
- **Solution**: Verify HLS stream URL and check network connectivity

**Issue**: Navigation not working
- **Solution**: Ensure all interactive elements have `focusable` class and `tabIndex`

## 📤 Publishing to LG Content Store

### 1. Prepare Assets
- App icon: 130x130px PNG
- Large icon: 300x300px PNG
- Screenshots: 1920x1080px (minimum 3)
- Splash screen: 1920x1080px

### 2. Test Thoroughly
- Test on multiple LG TV models
- Verify all features work
- Check performance

### 3. Submit to Store
1. Go to https://seller.lgappstv.com
2. Create seller account
3. Register new app
4. Upload IPK file and assets
5. Fill in app details
6. Submit for review

### 4. Review Process
- Takes 5-10 business days
- LG tests functionality and performance
- May request changes

## 🔐 Environment Variables

Create `.env` file:

```env
# API Configuration
API_URL=https://your-api-domain.com/api/moreplex/v1

# App Configuration
APP_NAME=Moreplex TV
APP_VERSION=1.0.0
```

## 📝 License

Proprietary - Moreplex

## 👥 Support

For issues or questions:
- Email: support@moreplex.com
- Developer Portal: https://webostv.developer.lge.com

## 🚀 Next Steps

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Test on emulator**: Set up webOS emulator
4. **Deploy to TV**: Follow deployment steps above
5. **Submit to store**: Prepare assets and submit

---

**Built with ❤️ for LG webOS Smart TVs**
