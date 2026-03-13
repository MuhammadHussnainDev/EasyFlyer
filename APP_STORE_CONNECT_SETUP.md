# App Store Connect Setup Guide

## Prerequisites

### 1. Apple Developer Account
- **Cost**: $99/year
- **Required**: Yes, for App Store submission
- **Sign up**: https://developer.apple.com/programs/

### 2. Required Information
- **Legal Entity Name**: Your company or personal name
- **D-U-N-S Number**: For business accounts (optional for individual)
- **Tax Information**: For payments
- **Bank Account**: For receiving payments

## Step-by-Step Setup

### Step 1: Create Apple Developer Account
1. Go to https://developer.apple.com/programs/
2. Click "Enroll" or "Start Your Enrollment"
3. Choose account type:
   - **Individual**: Use your personal Apple ID
   - **Organization**: Use company information
4. Complete enrollment process
5. Pay $99 annual fee

### Step 2: Access App Store Connect
1. Go to https://appstoreconnect.apple.com/
2. Sign in with your Apple Developer account
3. Accept terms and conditions

### Step 3: Create Your App
1. Click "My Apps" → "+" → "New App"
2. Fill in app information:
   - **Platform**: iOS
   - **Name**: Easy Flyer
   - **Primary Language**: English
   - **Bundle ID**: com.easyflyer
   - **SKU**: easyflyer-ios (unique identifier)
   - **User Access**: Full Access

### Step 4: App Information
```
App Name: Easy Flyer
Subtitle: Discover Local Deals & Save Money
Bundle ID: com.easyflyer
SKU: easyflyer-ios
Primary Language: English
```

### Step 5: App Store Information
Use the metadata from `APP_STORE_METADATA.md`:
- **Description**: [Copy from metadata file]
- **Keywords**: deals, coupons, savings, local, flyers
- **Category**: Shopping
- **Age Rating**: 4+
- **Pricing**: Free

## Required Assets

### App Icons
- **1024x1024** - App Store icon (PNG format)
- **All device sizes** - iPhone, iPad icons

### Screenshots (Required)
- **iPhone 6.7"** (iPhone 14 Pro Max): 1290x2796
- **iPhone 6.5"** (iPhone 11 Pro Max): 1242x2688
- **iPhone 5.5"** (iPhone 8 Plus): 1242x2208
- **iPad Pro 12.9"**: 2048x2732
- **iPad Pro 11"**: 1668x2388

### App Preview Videos (Optional but Recommended)
- **iPhone 6.7"**: 1290x2796, 15-30 seconds
- **iPad Pro 12.9"**: 2048x2732, 15-30 seconds

## App Store Connect Checklist

### App Information
- [ ] App name and subtitle
- [ ] Bundle identifier (com.easyflyer)
- [ ] SKU (unique identifier)
- [ ] Primary language
- [ ] Category (Shopping)
- [ ] Age rating (4+)

### Pricing and Availability
- [ ] Price tier (Free)
- [ ] Availability (All countries)
- [ ] Release date (Immediate or scheduled)

### App Store Listing
- [ ] App description
- [ ] Keywords
- [ ] Promotional text
- [ ] Support URL
- [ ] Marketing URL
- [ ] Privacy Policy URL

### App Assets
- [ ] App icon (1024x1024)
- [ ] Screenshots for all device sizes
- [ ] App preview videos (optional)

### App Review Information
- [ ] Contact information
- [ ] Demo account (if required)
- [ ] Notes for reviewers
- [ ] Attachments (if needed)

## Common Issues and Solutions

### Bundle ID Issues
- **Problem**: Bundle ID already exists
- **Solution**: Use unique identifier like com.easyflyer.2024

### App Icon Issues
- **Problem**: Icon rejected
- **Solution**: Ensure no transparency, proper dimensions, no text

### Screenshot Issues
- **Problem**: Screenshots rejected
- **Solution**: Use actual device screenshots, not simulator

### Review Rejection
- **Problem**: App rejected
- **Solution**: Read rejection reason, fix issues, resubmit

## Next Steps After Setup

1. ✅ Complete App Store Connect setup
2. 🔄 Upload app icons
3. 🔄 Upload screenshots
4. 🔄 Build and upload app binary
5. 🔄 Submit for review

## Important Notes

### Before First Submission
- Test app thoroughly on physical devices
- Ensure all features work as described
- Check for crashes or major bugs
- Verify all legal requirements are met

### Review Process
- **Timeline**: 24-48 hours typically
- **Status Updates**: Check App Store Connect regularly
- **Rejections**: Common for first-time submissions
- **Resubmission**: Free, can be done immediately

### After Approval
- App goes live automatically (if set to immediate release)
- Monitor app performance and user feedback
- Plan for updates and new features

---

**Need Help?** Apple provides extensive documentation at:
https://developer.apple.com/app-store-connect/
