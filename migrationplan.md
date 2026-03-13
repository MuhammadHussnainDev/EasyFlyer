# 🚀 EasyFlyer Migration Plan

## 📋 Project Overview
- **New Project Name**: EasyFlyer
- **iOS Workspace**: EasyFlyer.xcworkspace
- **Bundle ID**: com.easyflyer
- **Display Name**: Easy Flyer

---

## 📁 Files to Copy (Complete List)

### 🎯 **Core App Files (Essential)**
```
✅ App.tsx                    # Main app component
✅ App.tsx.backup            # Backup version
✅ index.js                  # App registration
✅ app.json                  # App configuration
✅ package.json              # Dependencies
✅ package-lock.json         # Locked versions
```

### 🎨 **Assets & Resources**
```
✅ assets/flyers/            # All flyer images
✅ assets/special/           # Special event images
✅ Any custom fonts (.ttf, .otf)
```

### 🧩 **Components Directory**
```
✅ App/components/
   ├── camera-view.jsx
   ├── categories-item.tsx
   ├── custom-alert-box.tsx
   ├── Flyers.tsx
   ├── gift-Card.tsx
   ├── GiftCardItem.js
   ├── header.jsx
   ├── overlay.tsx
   ├── SpecialEventCard.tsx
   ├── speical-events.tsx
   ├── store-flyers.tsx
   ├── store-item.js
   ├── TabNavigation.js
   └── tabs.jsx
```

### 📱 **Screens Directory**
```
✅ App/Screens/
   ├── categories/index.tsx
   ├── CoolCatScreen.tsx
   ├── deals/index.tsx
   ├── explore/index.tsx
   ├── Flyer/index.tsx
   ├── home/index.tsx
   ├── List/
   │   ├── index.tsx
   │   └── _components/
   ├── sign-in/index.tsx
   ├── sign-up/index.tsx
   ├── Store-List-Screen/index.tsx
   └── Update-Postal-Code/index.tsx
```

### 🧭 **Navigation**
```
✅ App/Navigations/
   ├── auth-nav.tsx
   ├── role-nav.tsx
   └── stack-nav.tsx
```

### 🔄 **Actions/API Calls**
```
✅ actions/
   ├── brand/fetch-brands.ts
   ├── coupon-gifts/fetch-coupon.ts
   ├── favourites/index.ts
   ├── flyer/fetch-flyer.ts
   ├── postal-code/
   │   ├── create-code.ts
   │   ├── delete-code.ts
   │   └── edit-code.ts
   ├── special-events.ts/fetch-special-events.ts
   ├── store/fetch-store.ts
   ├── store-flyers/fetch-store-flyers.ts
   └── update-count.ts
```

### 🗄️ **State Management**
```
✅ store/
   ├── store.ts
   └── slices/
       ├── brandSlice.js
       ├── categoriesSlice.ts
       ├── counterSlice.js
       ├── eventSlice.js
       ├── favoritesSlice.js
       └── storeSlice.js
```

### 🛠️ **Utilities & Libraries**
```
✅ utils/
   ├── api.ts
   ├── dummy-data.ts
   ├── FlyerItem.js
   ├── flyersUtils.ts
   └── helper.ts

✅ lib/
   ├── AuthContext.js
   ├── firebase.js
   └── storageUtils.js
```

### ⚙️ **Configuration Files**
```
✅ babel.config.js
✅ metro.config.js
✅ jest.config.js
✅ tsconfig.json
```

---

## 🔧 **Step-by-Step Migration Process**

### **Step 1: Create New React Native Project**
```bash
npx react-native init EasyFlyer --template react-native-template-typescript
cd EasyFlyer
```

### **Step 2: Copy All Files**
Copy all the files listed above to the new project directory.

### **Step 3: Update Configuration Files**

#### **3.1 Update package.json**
```json
{
  "name": "easyflyer",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest"
  }
}
```

#### **3.2 Update app.json**
```json
{
  "name": "easyflyer",
  "displayName": "Easy Flyer"
}
```

#### **3.3 Update index.js**
```javascript
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('easyflyer', () => App);
```

### **Step 4: Update iOS Configuration**

#### **4.1 Update AppDelegate.swift**
```swift
import UIKit
import React
import React_RCTAppDelegate
import FirebaseCore

@main
class AppDelegate: RCTAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
  ) -> Bool {
    // Configure Firebase before anything else
    FirebaseApp.configure()
    
    self.moduleName = "easyflyer"
    // You can add your custom initial props here
    // self.initialProps = [:]
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }
  
  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
```

#### **4.2 Update Info.plist**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>Easy Flyer</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>com.easyflyer</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>$(MARKETING_VERSION)</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>CFBundleVersion</key>
    <string>$(CURRENT_PROJECT_VERSION)</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <false/>
        <key>NSAllowsLocalNetworking</key>
        <true/>
        <key>NSExceptionDomains</key>
        <dict>
            <key>localhost</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
        </dict>
    </dict>
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Editor</string>
            <key>CFBundleURLName</key>
            <string>com.easyflyer</string>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>com.easyflyer</string>
            </array>
        </dict>
    </array>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>This app needs location access to show nearby stores and deals.</string>
    <key>NSCameraUsageDescription</key>
    <string>This app needs camera access to scan QR codes and barcodes on flyers.</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>This app may need microphone access for camera features.</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>This app needs photo library access to save and share flyers.</string>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIAppFonts</key>
    <array>
        <string>AntDesign.ttf</string>
        <string>Entypo.ttf</string>
        <string>EvilIcons.ttf</string>
        <string>Feather.ttf</string>
        <string>FontAwesome.ttf</string>
        <string>Foundation.ttf</string>
        <string>Ionicons.ttf</string>
        <string>MaterialIcons.ttf</string>
        <string>MaterialCommunityIcons.ttf</string>
        <string>SimpleLineIcons.ttf</string>
        <string>Octicons.ttf</string>
        <string>Zocial.ttf</string>
        <string>FontAwesome5_Brands.ttf</string>
        <string>FontAwesome5_Regular.ttf</string>
        <string>FontAwesome5_Solid.ttf</string>
    </array>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>arm64</string>
    </array>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
</dict>
</plist>
```

### **Step 5: Update Android Configuration**

#### **5.1 Update MainActivity.kt**
```kotlin
package com.easyflyer

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "easyflyer"
  
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

#### **5.2 Update settings.gradle**
```gradle
rootProject.name = 'easyflyer'
```

### **Step 6: Install Dependencies**
```bash
npm install
cd ios && pod install && cd ..
```

### **Step 7: Update Code References**

#### **7.1 Search and Replace in All Files**
Replace all instances of:
- `jspromotionalatestversion` → `easyflyer`
- `com.jspromotionalatestversion` → `com.easyflyer`
- `Easy Flyer` → `Easy Flyer` (keep display name)

#### **7.2 Update Firebase Configuration**
- Update `lib/firebase.js` with new project configuration
- Update `ios/GoogleService-Info.plist`
- Update `android/google-services.json`

### **Step 8: Test the Migration**
```bash
# Clean and rebuild
npx react-native start --reset-cache
cd ios && rm -rf build/ && pod install && cd ..
npx react-native run-ios
npx react-native run-android
```

---

## ⚠️ **Important Notes**

### **Critical Updates Required**
1. **Bundle Identifier**: Change to `com.easyflyer`
2. **App Name**: Update to `easyflyer` in all config files
3. **Display Name**: Keep as "Easy Flyer"
4. **Firebase**: Update with new project configuration
5. **API Endpoints**: Update if using different backend

### **Files to NOT Copy**
- `node_modules/` (will be reinstalled)
- `ios/build/` (will be rebuilt)
- `ios/Pods/` (will be reinstalled)
- `android/build/` (will be rebuilt)
- `.git/` (start fresh repository)

### **Verification Checklist**
- [ ] App builds successfully on iOS
- [ ] App builds successfully on Android
- [ ] Metro bundler connects properly
- [ ] No white screen issues
- [ ] All components render correctly
- [ ] Navigation works properly
- [ ] Firebase integration works
- [ ] All API calls function correctly

---

## 🚀 **Post-Migration Steps**

1. **Create new Git repository**
2. **Set up CI/CD pipeline**
3. **Update app store listings**
4. **Test on physical devices**
5. **Update documentation**
6. **Deploy to app stores**

---

## 📞 **Support**

If you encounter any issues during migration:
1. Check this migration plan
2. Verify all file paths are correct
3. Ensure all dependencies are installed
4. Check for naming inconsistencies
5. Verify Firebase configuration

**Good luck with your EasyFlyer migration! 🎉**
