# 📦 Deployment Guide - Moreplex webOS

Complete guide for deploying Moreplex to LG Smart TVs and the LG Content Store.

## 🎯 Deployment Options

### Option 1: Development/Testing Deployment
For internal testing on your own LG TVs.

### Option 2: LG Content Store Deployment
For public distribution to all LG Smart TV users.

---

## 🔧 Option 1: Development Deployment

### Prerequisites
- LG Smart TV (webOS 3.0 or higher)
- Same WiFi network for TV and computer
- Developer Mode enabled on TV

### Step-by-Step Deployment

#### 1. Enable Developer Mode on TV

**Method A: Remote Control**
```
1. Press Home button 3 times quickly
2. Press: 5, 9, 5, 9 (in sequence)
3. Developer Mode app will appear
4. Toggle "Dev Mode Status" to ON
5. Note the IP address displayed
6. Restart your TV
```

**Method B: LG Developer App**
```
1. Download "Developer Mode" app from LG Content Store
2. Install and open the app
3. Toggle Developer Mode ON
4. Note the IP address
5. Restart TV
```

#### 2. Configure Device Connection

```bash
# Add your TV as a device
ares-setup-device --add my-tv --info "{'host':'YOUR_TV_IP','port':'9922'}"

# Example:
ares-setup-device --add my-tv --info "{'host':'192.168.1.100','port':'9922'}"

# Verify connection
ares-setup-device --list

# Test connection
ares-device-info --device my-tv
```

#### 3. Build Application

```bash
cd /Users/damilareshobowale/Documents/projects/moreplex-app/moreplex-webos

# Install dependencies (if not done)
npm install

# Build production version
npm run build
```

#### 4. Package Application

```bash
# Create IPK package
npm run package

# This creates: build/com.moreplex.tv_1.0.0_all.ipk
```

#### 5. Install on TV

```bash
# Install the app
npm run install-tv

# Or manually:
ares-install --device my-tv ./build/com.moreplex.tv_1.0.0_all.ipk
```

#### 6. Launch Application

```bash
# Launch the app
npm run launch-tv

# Or manually:
ares-launch --device my-tv com.moreplex.tv
```

#### 7. Debug (Optional)

```bash
# Open Chrome DevTools for debugging
npm run debug

# Or manually:
ares-inspect --device my-tv --app com.moreplex.tv --open

# View logs
ares-log --device my-tv --follow
```

---

## 🏪 Option 2: LG Content Store Deployment

### Prerequisites
- LG Seller Account
- Completed and tested application
- All required assets prepared
- App tested on multiple LG TV models

### Step 1: Prepare Assets

Create the following assets in the `assets/` folder:

#### Required Assets

**1. App Icon (icon.png)**
- Size: 130x130 pixels
- Format: PNG with transparency
- Content: Your app logo/icon
- Guidelines: Simple, recognizable at small size

**2. Large Icon (largeIcon.png)**
- Size: 300x300 pixels
- Format: PNG with transparency
- Content: High-res version of app icon
- Guidelines: Clear, professional appearance

**3. Splash Screen (splash.png)**
- Size: 1920x1080 pixels
- Format: PNG
- Content: Loading screen shown on app launch
- Guidelines: Brand colors, app name/logo

**4. Background Image (bg.png)**
- Size: 1920x1080 pixels
- Format: PNG or JPG
- Content: Background for app tile in launcher
- Guidelines: Attractive, represents app content

**5. Screenshots (minimum 3)**
- Size: 1920x1080 pixels
- Format: PNG or JPG
- Content: Key app screens (home, video player, menu)
- Guidelines: Show best features, no UI elements from other apps

#### Asset Checklist
```
assets/
├── icon.png (130x130)
├── largeIcon.png (300x300)
├── splash.png (1920x1080)
├── bg.png (1920x1080)
└── screenshots/
    ├── screenshot1.png (1920x1080)
    ├── screenshot2.png (1920x1080)
    └── screenshot3.png (1920x1080)
```

### Step 2: Register as LG Seller

1. **Go to LG Seller Lounge**
   - URL: https://seller.lgappstv.com
   - Click "Sign Up"

2. **Create Account**
   - Fill in company/individual information
   - Verify email address
   - Complete profile

3. **Register as Seller**
   - Provide business information
   - Accept terms and conditions
   - Submit tax/payment information (for paid apps)

4. **Wait for Approval**
   - Review takes 1-3 business days
   - Check email for approval notification

### Step 3: Prepare App Information

Gather the following information before submission:

#### Basic Information
- **App Name**: Moreplex TV
- **App ID**: com.moreplex.tv
- **Version**: 1.0.0
- **Category**: Entertainment > Video
- **Sub-category**: Streaming Services

#### Description
```
Short Description (80 chars max):
Stream movies, TV shows, and live channels on your LG Smart TV

Long Description (4000 chars max):
Moreplex TV brings unlimited entertainment to your LG Smart TV. 
Stream thousands of movies, TV series, and live channels in HD quality.

Features:
• Extensive library of movies and TV shows
• Live TV channels with EPG
• Multiple user profiles
• HD and 4K streaming
• Multi-language support (20+ languages)
• Personalized recommendations
• Continue watching across devices
• Parental controls

Subscription required. Visit moreplex.com for plans and pricing.
```

#### Keywords
```
streaming, movies, tv shows, live tv, entertainment, video, 
channels, series, films, on-demand
```

#### Age Rating
- Select appropriate rating (e.g., 12+, 16+, 18+)
- Based on content in your catalog

#### Supported Countries
- Select all countries where service is available
- Consider content licensing restrictions

#### Privacy Policy
- URL to your privacy policy
- Must be accessible and up-to-date

#### Terms of Service
- URL to terms of service
- Include subscription terms

### Step 4: Test on Multiple Devices

Before submission, test on:

**Minimum Test Matrix:**
- ✅ webOS 3.0 TV
- ✅ webOS 4.0 TV
- ✅ webOS 5.0 TV
- ✅ webOS 6.0+ TV

**Test Checklist:**
- ✅ App launches successfully
- ✅ Login works correctly
- ✅ Video playback (HLS/DASH)
- ✅ Navigation with remote control
- ✅ All features functional
- ✅ No crashes or freezes
- ✅ Performance is acceptable
- ✅ UI displays correctly on all screens
- ✅ Back button works properly
- ✅ App exits cleanly

### Step 5: Submit to LG Content Store

#### 5.1 Login to Seller Lounge
```
URL: https://seller.lgappstv.com
Login with your seller account
```

#### 5.2 Create New App Submission
```
1. Click "Register New App"
2. Select "webOS TV App"
3. Choose app type: "Web App"
```

#### 5.3 Upload App Package
```
1. Upload your IPK file: com.moreplex.tv_1.0.0_all.ipk
2. System will validate the package
3. Fix any validation errors
```

#### 5.4 Fill in App Details
```
Basic Info:
- App Name: Moreplex TV
- Category: Entertainment > Video
- Price: Free (with in-app purchases/subscriptions)

Description:
- Paste short and long descriptions
- Add keywords

Localization:
- Add descriptions in supported languages
- Upload localized screenshots if available

Assets:
- Upload icon (130x130)
- Upload large icon (300x300)
- Upload screenshots (minimum 3)
- Upload splash screen
- Upload background image

Legal:
- Privacy Policy URL
- Terms of Service URL
- Age rating selection
- Content rating certificates (if required)

Technical:
- Supported webOS versions
- Required permissions
- External services used
```

#### 5.5 Configure Monetization (Optional)
```
If using in-app purchases:
1. Set up payment integration
2. Define subscription tiers
3. Configure pricing per country
4. Set up trial periods
```

#### 5.6 Submit for Review
```
1. Review all information
2. Check "I agree to terms"
3. Click "Submit for Review"
4. Note your submission ID
```

### Step 6: Review Process

#### What LG Reviews

**Functionality Testing:**
- App launches and runs without crashes
- All features work as described
- Navigation is intuitive
- Video playback is smooth
- No broken links or features

**UI/UX Review:**
- Follows webOS design guidelines
- Proper focus indicators
- Readable text sizes
- Appropriate for TV viewing
- Consistent branding

**Content Review:**
- Age-appropriate content
- No prohibited content
- Accurate descriptions
- Working privacy policy/ToS

**Technical Review:**
- Proper use of webOS APIs
- No security vulnerabilities
- Acceptable performance
- Proper error handling
- Clean app exit

#### Timeline
- **Initial Review**: 5-10 business days
- **Revisions** (if needed): 3-5 business days per revision
- **Final Approval**: 1-2 business days

#### Possible Outcomes

**✅ Approved**
- App goes live in Content Store
- Available for download by users
- You receive approval notification

**⚠️ Revision Required**
- LG provides list of issues
- Fix issues and resubmit
- Review process restarts

**❌ Rejected**
- Serious violations of guidelines
- Can appeal or make major changes
- Resubmit as new app

### Step 7: Post-Approval

#### App Goes Live
```
1. App appears in LG Content Store
2. Users can search and install
3. Monitor downloads and ratings
```

#### Monitor Performance
```
Seller Lounge Dashboard:
- Download statistics
- User ratings and reviews
- Crash reports
- Revenue (if paid app)
```

#### Update Process
```
For app updates:
1. Increment version in appinfo.json
2. Build and package new version
3. Submit update through Seller Lounge
4. Update goes through review (faster than initial)
5. Users receive update notification
```

---

## 🔄 Update Deployment

### Updating Development Version

```bash
# 1. Make your changes
# 2. Build new version
npm run build

# 3. Update version in appinfo.json
# "version": "1.0.1"

# 4. Package and deploy
npm run package
npm run install-tv
npm run launch-tv
```

### Updating Content Store Version

```bash
# 1. Update version in appinfo.json
# "version": "1.1.0"

# 2. Build production version
npm run build

# 3. Package the app
npm run package

# 4. Login to Seller Lounge
# 5. Go to "My Apps" > Select your app
# 6. Click "Update App"
# 7. Upload new IPK file
# 8. Update release notes
# 9. Submit for review
```

---

## 🐛 Troubleshooting Deployment

### Common Issues

**Issue: "Device not found"**
```bash
Solution:
1. Check TV is on same network
2. Verify Developer Mode is enabled
3. Restart TV
4. Re-add device:
   ares-setup-device --remove my-tv
   ares-setup-device --add my-tv --info "{'host':'IP','port':'9922'}"
```

**Issue: "Installation failed"**
```bash
Solution:
1. Remove old version:
   ares-install --device my-tv --remove com.moreplex.tv
2. Reinstall:
   npm run install-tv
```

**Issue: "App rejected by LG"**
```
Solution:
1. Read rejection reasons carefully
2. Fix all mentioned issues
3. Test thoroughly
4. Resubmit with detailed changelog
```

**Issue: "Video won't play on TV"**
```
Solution:
1. Verify HLS stream format (.m3u8)
2. Check CORS headers on video server
3. Test stream URL in browser
4. Verify DRM configuration (if using DRM)
```

---

## 📊 Best Practices

### Before Submission
- ✅ Test on multiple TV models
- ✅ Test all features thoroughly
- ✅ Optimize performance
- ✅ Prepare high-quality assets
- ✅ Write clear, accurate descriptions
- ✅ Have legal documents ready

### During Review
- ✅ Respond quickly to LG requests
- ✅ Provide detailed explanations
- ✅ Be patient with review process
- ✅ Keep communication professional

### After Launch
- ✅ Monitor user reviews
- ✅ Fix bugs quickly
- ✅ Release updates regularly
- ✅ Respond to user feedback
- ✅ Track analytics

---

## 📞 Support Resources

**LG Developer Portal**
- URL: https://webostv.developer.lge.com
- Documentation, guides, SDKs

**LG Seller Lounge**
- URL: https://seller.lgappstv.com
- App submission and management

**LG Developer Forum**
- URL: https://forum.developer.lge.com
- Community support, Q&A

**LG Developer Support**
- Email: developer@lge.com
- Technical support for developers

---

**Ready to deploy! 🚀**
