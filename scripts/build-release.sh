#!/bin/bash

# Easy Flyer - Release Build Script
# This script builds the app for App Store submission

set -e

echo "🚀 Starting Easy Flyer Release Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the EasyFlyer project root directory"
    exit 1
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf ios/build
rm -rf android/app/build
rm -rf android/build

# Install dependencies
print_status "Installing dependencies..."
npm install

# Install iOS pods
print_status "Installing iOS pods..."
cd ios
pod install
cd ..

# Build iOS for release
print_status "Building iOS for release..."
cd ios
xcodebuild -workspace EasyFlyer.xcworkspace \
           -scheme EasyFlyer \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath build/EasyFlyer.xcarchive \
           -allowProvisioningUpdates \
           archive

print_status "iOS archive created successfully at ios/build/EasyFlyer.xcarchive"

# Build Android for release
print_status "Building Android for release..."
cd ../android
./gradlew assembleRelease

print_status "Android APK created successfully at android/app/build/outputs/apk/release/"

cd ..

print_status "✅ Release build process completed successfully!"
print_status "📱 iOS: Ready for App Store submission"
print_status "🤖 Android: APK ready for Google Play submission"

echo ""
print_warning "Next steps:"
echo "1. Open Xcode and upload the archive to App Store Connect"
echo "2. Upload the Android APK to Google Play Console"
echo "3. Complete app store listings with provided metadata"
echo "4. Submit for review"

echo ""
print_status "Build artifacts:"
echo "• iOS Archive: ios/build/EasyFlyer.xcarchive"
echo "• Android APK: android/app/build/outputs/apk/release/app-release.apk"
