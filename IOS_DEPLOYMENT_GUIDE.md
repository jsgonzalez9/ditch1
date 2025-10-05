# iOS App Store Deployment Guide

## ✅ What Has Been Completed

### 1. iOS Platform Setup
- ✅ iOS platform added with Capacitor
- ✅ Cordova IAP plugin installed
- ✅ Project built and synced to iOS

### 2. Payment Integration
- ✅ Stripe removed from codebase
- ✅ Apple In-App Purchase integration prepared
- ✅ IAP configuration file created (`src/iap-config.ts`)
- ✅ IAP hook created (`src/hooks/useIAP.ts`)
- ✅ All payment UI updated to use IAP

### 3. Legal Compliance
- ✅ Privacy Policy page created
- ✅ Terms of Service page created
- ✅ Legal pages accessible from Profile section
- ✅ Navigation added for privacy/terms

### 4. App Metadata
- ✅ App title updated to "Ditch - Quit Vaping Tracker"
- ✅ Favicon changed to logo
- ✅ Meta tags for iOS added
- ✅ Bundle ID set to `com.ditch.app`

### 5. Documentation
- ✅ App Store metadata document created
- ✅ Deployment guide created (this file)

## 🚀 Next Steps for App Store Submission

### Step 1: Set Up Development Environment (macOS Required)

You MUST have a Mac with Xcode to proceed. You cannot build iOS apps on Windows/Linux.

1. **Install Xcode** (from Mac App Store, ~12GB download)
2. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```
3. **Open the iOS project:**
   ```bash
   cd /path/to/project
   npopen capacitor:open:ios
   ```

### Step 2: Configure Xcode Project

1. **Open Xcode** (the command above should open it automatically)

2. **Select the App target** (click on "App" in the left sidebar)

3. **Update Bundle Identifier:**
   - Go to "Signing & Capabilities" tab
   - Set Bundle Identifier to: `com.ditch.app`
   - (or use your own unique identifier like `com.yourcompany.ditch`)

4. **Select Development Team:**
   - Click "Team" dropdown
   - Select your Apple Developer account
   - If you don't have one, go to https://developer.apple.com/programs/ and enroll ($99/year)

5. **Configure Version:**
   - In "General" tab
   - Set Version to: `1.0.0`
   - Set Build to: `1`

6. **Install CocoaPods Dependencies:**
   ```bash
   cd ios/App
   pod install
   ```

### Step 3: Configure App Icons

Your current logo files are SVGs. You need PNG files at specific sizes.

**Required Icon Sizes:**
- 1024x1024 (App Store)
- 180x180 (iPhone @3x)
- 120x120 (iPhone @2x)
- 87x87 (iPhone Settings @3x)
- 80x80 (iPhone Spotlight @2x)
- 76x76 (iPad @1x)
- 60x60 (iPhone Settings @2x)
- 58x58 (iPhone Settings @2x)
- 40x40 (iPhone Spotlight @1x)
- 29x29 (iPhone Settings @1x)
- 20x20 (iPhone Notification @1x)

**How to create icons:**
1. Convert your `/public/logo-wordmark.svg` to a 1024x1024 PNG
2. Use a tool like https://appicon.co/ to generate all sizes
3. Or manually create each size in an image editor
4. Add to Xcode: App/App/Assets.xcassets/AppIcon.appiconset/

### Step 4: Set Up Apple In-App Purchases

**In App Store Connect (https://appstoreconnect.apple.com/):**

1. **Create your app:**
   - Go to "My Apps" > "+" button
   - Name: "Ditch"
   - Bundle ID: `com.ditch.app` (must match Xcode)
   - SKU: `ditch-app-001` (any unique identifier)

2. **Create In-App Purchase Products:**

   **Monthly Subscription:**
   - Product ID: `com.ditch.app.premium.monthly`
   - Type: Auto-Renewable Subscription
   - Subscription Group: Create new "Ditch Premium"
   - Duration: 1 month
   - Price: $2.99 USD

   **Yearly Subscription:**
   - Product ID: `com.ditch.app.premium.yearly`
   - Type: Auto-Renewable Subscription
   - Subscription Group: Use "Ditch Premium" (same as monthly)
   - Duration: 1 year
   - Price: $25.00 USD

3. **Fill in subscription details:**
   - Subscription Display Name
   - Description
   - Add localizations (at minimum, English US)

4. **Submit products for review** (do this BEFORE submitting the app)

### Step 5: Test In-App Purchases in Sandbox

1. **Create Sandbox Tester Account:**
   - App Store Connect > Users and Access > Sandbox Testers
   - Create a test Apple ID (use a real email you can access)

2. **On your iOS device:**
   - Settings > App Store > Sign Out (of real account)
   - Don't sign in yet - wait for app to prompt

3. **Test the app:**
   - Build and run on device from Xcode
   - Try to purchase subscription
   - Sign in with sandbox tester when prompted
   - Verify purchase works
   - **Important:** Sandbox purchases don't charge real money

### Step 6: Prepare App Store Assets

**Screenshots:**
You need screenshots for these device sizes:
- iPhone 6.7" (iPhone 15 Pro Max): 1290x2796 pixels, 3-10 images
- iPhone 6.5" (iPhone 11 Pro Max): 1242x2688 pixels, 3-10 images

**How to create screenshots:**
1. Run app in iOS Simulator (iPhone 15 Pro Max)
2. Navigate to key screens (Counter, Health Timeline, Craving Tracker, etc.)
3. Take screenshots: Cmd+S in simulator
4. Screenshots saved to Desktop
5. Optionally add promotional text/graphics using a tool like Figma

**Suggested screenshot content:**
1. Main counter screen showing progress
2. Health timeline with milestones
3. Craving tracker with breathing exercise
4. Community feed
5. Statistics screen
6. Premium features showcase

**App Preview Video (Optional but Recommended):**
- 15-30 seconds
- Portrait orientation
- Show key features in action
- Can be created using screen recording on iPhone

### Step 7: Fill Out App Store Metadata

In App Store Connect:

1. **App Information:**
   - Name: Ditch
   - Subtitle: Quit Vaping Tracker
   - Category: Health & Fitness

2. **Pricing:**
   - Free (subscriptions are separate)
   - Available in: United States (initially)

3. **App Privacy:**
   - Fill out comprehensive privacy questionnaire
   - Main data collected:
     - Email (for account)
     - Usage data (puff counts, quit dates)
     - Health data (milestones)
     - User content (posts, messages)
   - Link to privacy policy (must be publicly accessible web URL)

4. **Age Rating:**
   - Select 17+
   - Reasons: Alcohol, Tobacco, or Drug Use or References

5. **Description:**
   - Use the description from `APP_STORE_METADATA.md`

6. **Keywords:**
   - Use keywords from `APP_STORE_METADATA.md`

7. **Support URL:**
   - Create a support page on your website
   - Or use: support@yourdomain.com

8. **Marketing URL (Optional):**
   - Your app website

### Step 8: Build for App Store

1. **In Xcode:**
   - Select "Any iOS Device (arm64)" as destination
   - Product > Archive
   - Wait for archive to complete (5-10 minutes)

2. **Upload to App Store Connect:**
   - Window > Organizer
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Follow prompts

3. **Wait for Processing:**
   - Upload takes 10-30 minutes
   - Processing takes 30-60 minutes
   - You'll get email when ready

### Step 9: Submit for Review

1. **In App Store Connect:**
   - Select your app version
   - Add screenshots
   - Fill in "What's New" text
   - Add build (select the uploaded build)
   - **Important:** Select "Manually release" to control launch timing

2. **App Review Information:**
   - Contact info (your email and phone)
   - **Demo Account:** Create test credentials for Apple reviewers
     - Email: reviewer@ditchapp.com (create in your app)
     - Password: ReviewDemo2025!
   - Notes: "This app helps users track vaping habits. No medical claims made."

3. **Submit for Review**
   - Review process typically takes 24-48 hours
   - First submission may take longer

### Step 10: Respond to Rejections (If Any)

Common rejection reasons:
1. **IAP not working:** Test thoroughly in sandbox
2. **Privacy policy missing:** Ensure it's accessible in app AND via public URL
3. **Demo account doesn't work:** Test it yourself first
4. **Metadata issues:** Description must match functionality
5. **Crashes:** Test on multiple devices/iOS versions

If rejected:
1. Read feedback carefully
2. Fix the issues
3. Respond in Resolution Center
4. Resubmit

## 📝 Important Notes

### IAP Product IDs Must Match Exactly

The product IDs in your code **MUST** match App Store Connect:
- Code: `com.ditch.app.premium.monthly`
- App Store Connect: `com.ditch.app.premium.monthly`

If they don't match, purchases won't work!

### Testing is Critical

- Test ALL features before submission
- Test on multiple devices if possible
- Test in airplane mode (offline functionality)
- Test IAP thoroughly in sandbox
- Have friends/family beta test via TestFlight

### TestFlight Beta Testing (Recommended)

Before submitting to App Store:
1. Upload build to App Store Connect
2. Go to TestFlight section
3. Add internal testers (up to 100)
4. Add external testers (up to 10,000, needs beta review)
5. Get feedback and fix issues
6. Then submit to App Store

### Privacy Policy Must Be Publicly Accessible

Apple requires privacy policy to be accessible via public URL:
1. Create a simple website (can use GitHub Pages, free)
2. Host your privacy policy there
3. Link to it in App Store Connect
4. Also keep in-app access (you already have this)

### Ongoing Maintenance

After approval:
- Monitor crash reports in App Store Connect
- Respond to user reviews
- Track subscription metrics
- Plan updates (v1.1, v1.2, etc.)
- Keep dependencies updated

## 🔧 Troubleshooting

### "Command PhaseScriptExecution failed"
- Run `pod install` in `ios/App`
- Clean build folder: Product > Clean Build Folder
- Quit Xcode and reopen

### "Provisioning profile doesn't include signing certificate"
- Go to Xcode Preferences > Accounts
- Select your Apple ID
- Click "Manage Certificates"
- Create "Apple Development" certificate
- Try building again

### "Unable to find "xcodebuild"" warning
- Install Xcode Command Line Tools:
  ```bash
  xcode-select --install
  ```

### IAP products not showing in app
- Make sure products are "Ready to Submit" in App Store Connect
- Wait 2-4 hours after creating products
- Test with real device, not simulator
- Check product IDs match exactly

### Build fails with CocoaPods errors
- Update CocoaPods: `sudo gem install cocoapods`
- Delete Pods: `cd ios/App && rm -rf Pods Podfile.lock`
- Reinstall: `pod install`

## 📱 Post-Launch Checklist

- [ ] App is live on App Store
- [ ] IAP products are working
- [ ] Subscriptions are processing correctly
- [ ] Push notifications set up (for future updates)
- [ ] Analytics tracking configured
- [ ] Customer support system ready
- [ ] Marketing materials prepared
- [ ] Social media accounts created
- [ ] Website updated with App Store link
- [ ] Press release sent (optional)

## 🎯 Success Metrics to Track

- Downloads per day
- Active users
- Subscription conversion rate
- Monthly recurring revenue (MRR)
- Churn rate
- User reviews and ratings
- Crash-free rate
- Feature usage stats

## 📚 Additional Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [In-App Purchase Guide](https://developer.apple.com/in-app-purchase/)
- [TestFlight Beta Testing](https://developer.apple.com/testflight/)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)

## ❓ Need Help?

If you get stuck:
1. Check Capacitor documentation: https://capacitorjs.com/docs
2. Check Xcode console for error messages
3. Search Apple Developer Forums
4. Stack Overflow (tag: ios, swift, capacitor)

---

**Remember:** Your first app submission will likely have issues. That's normal! Most apps get rejected at least once. Learn from the feedback and keep improving.

Good luck with your App Store launch! 🚀
