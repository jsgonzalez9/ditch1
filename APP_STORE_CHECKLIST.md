# App Store Submission Checklist

Use this checklist to track your progress toward App Store submission.

## ✅ Completed (Done by AI)

- [x] iOS platform added with Capacitor
- [x] Stripe removed and replaced with Apple IAP foundation
- [x] IAP configuration file created
- [x] IAP hook implemented
- [x] Privacy Policy page created
- [x] Terms of Service page created
- [x] Legal pages accessible from Profile
- [x] App metadata updated (title, favicon, meta tags)
- [x] Bundle ID configured (com.ditch.app)
- [x] Project builds successfully
- [x] Web assets synced to iOS
- [x] Documentation created (deployment guide, metadata, changes summary)

## 🔧 Setup Required (You Need to Do)

### Development Environment
- [ ] Acquire Mac with macOS (required for Xcode)
- [ ] Install Xcode from Mac App Store (~12GB)
- [ ] Install Xcode Command Line Tools
- [ ] Install CocoaPods (`sudo gem install cocoapods`)
- [ ] Open iOS project in Xcode (`npm run capacitor:open:ios`)

### Apple Developer Account
- [ ] Enroll in Apple Developer Program ($99/year)
- [ ] Verify email and complete enrollment
- [ ] Accept agreements in App Store Connect
- [ ] Set up tax and banking information

### Xcode Configuration
- [ ] Select Development Team in Xcode
- [ ] Verify Bundle Identifier (com.ditch.app or your own)
- [ ] Run `pod install` in `ios/App` directory
- [ ] Build project to verify it compiles
- [ ] Test on iOS Simulator
- [ ] Test on real iOS device

## 🎨 Design Assets

### App Icons
- [ ] Design 1024x1024 app icon
- [ ] Generate all required icon sizes:
  - [ ] 1024x1024 (App Store)
  - [ ] 180x180 (iPhone @3x)
  - [ ] 120x120 (iPhone @2x)
  - [ ] 87x87 (iPhone Settings @3x)
  - [ ] 80x80 (iPhone Spotlight @2x)
  - [ ] 76x76 (iPad @1x)
  - [ ] 60x60 (iPhone Settings @2x)
  - [ ] 58x58 (iPhone Settings @2x)
  - [ ] 40x40 (iPhone Spotlight @1x)
  - [ ] 29x29 (iPhone Settings @1x)
  - [ ] 20x20 (iPhone Notification @1x)
- [ ] Add icons to Xcode (Assets.xcassets/AppIcon.appiconset)

### Screenshots
- [ ] Take screenshots on iPhone 15 Pro Max (1290x2796):
  - [ ] Counter/Dashboard screen
  - [ ] Health Timeline
  - [ ] Craving Tracker
  - [ ] Community Feed
  - [ ] Statistics
  - [ ] Premium features
- [ ] Take screenshots on iPhone 11 Pro Max (1242x2688):
  - [ ] Same screens as above
- [ ] Optionally add promotional text/graphics to screenshots
- [ ] Save in organized folder for App Store Connect

### App Preview Video (Optional)
- [ ] Record 15-30 second app preview video
- [ ] Show key features in action
- [ ] Add music/voiceover (optional)
- [ ] Export in required format

## 💳 In-App Purchase Setup

### App Store Connect IAP Configuration
- [ ] Create app in App Store Connect
- [ ] Create Subscription Group: "Ditch Premium"
- [ ] Create Monthly Subscription:
  - Product ID: `com.ditch.app.premium.monthly`
  - Price: $2.99 USD
  - Duration: 1 month
  - Auto-renewable: Yes
- [ ] Create Yearly Subscription:
  - Product ID: `com.ditch.app.premium.yearly`
  - Price: $25.00 USD
  - Duration: 1 year
  - Auto-renewable: Yes
- [ ] Fill in subscription display names and descriptions
- [ ] Add localizations (English US at minimum)
- [ ] Submit IAP products for review

### IAP Testing
- [ ] Create Sandbox Tester account in App Store Connect
- [ ] Sign out of App Store on test device
- [ ] Build and run app on device
- [ ] Test purchasing monthly subscription
- [ ] Test purchasing yearly subscription
- [ ] Test restoring purchases
- [ ] Verify premium features unlock correctly
- [ ] Test subscription expiration handling

## 📝 App Store Connect Setup

### App Information
- [ ] Fill in App Name: "Ditch"
- [ ] Fill in Subtitle: "Quit Vaping Tracker"
- [ ] Set Primary Category: Health & Fitness
- [ ] Set Secondary Category: Lifestyle (optional)
- [ ] Add keywords (see APP_STORE_METADATA.md)
- [ ] Write app description (see APP_STORE_METADATA.md)

### Pricing and Availability
- [ ] Set app price: Free
- [ ] Select availability: United States
- [ ] Set release: Automatic or Manual

### Privacy Policy
- [ ] Host privacy policy on public website
- [ ] Add privacy policy URL to App Store Connect
- [ ] Fill out Apple's privacy questionnaire:
  - [ ] Data collected: Email, Usage Data, Health Data, User Content
  - [ ] Data usage: App functionality, Analytics
  - [ ] Data sharing: None
  - [ ] Data encryption: Yes

### Age Rating
- [ ] Fill out age rating questionnaire
- [ ] Select 17+ due to:
  - [ ] Infrequent/Mild Alcohol, Tobacco, or Drug Use or References
  - [ ] Medical/Treatment Information
- [ ] Confirm rating

### Version Information
- [ ] Upload screenshots for all required sizes
- [ ] Add "What's New" text (version 1.0)
- [ ] Add promotional text (optional)
- [ ] Set version number: 1.0.0
- [ ] Set build number: 1

### App Review Information
- [ ] Provide contact information:
  - [ ] First Name
  - [ ] Last Name
  - [ ] Phone Number
  - [ ] Email Address
- [ ] Create demo account for reviewers:
  - [ ] Email: reviewer@ditchapp.com
  - [ ] Password: ReviewDemo2025!
  - [ ] Test login works
- [ ] Add review notes explaining app purpose

## 🏗️ Build and Submit

### Build for Distribution
- [ ] Set version to 1.0.0 in Xcode
- [ ] Set build number to 1 in Xcode
- [ ] Select "Any iOS Device" as destination
- [ ] Product > Archive in Xcode
- [ ] Wait for archive to complete
- [ ] Validate archive (check for errors)

### Upload to App Store Connect
- [ ] Open Organizer in Xcode
- [ ] Select archive
- [ ] Click "Distribute App"
- [ ] Choose "App Store Connect"
- [ ] Upload build
- [ ] Wait for processing (30-60 minutes)
- [ ] Verify build appears in App Store Connect

### Submit for Review
- [ ] Select uploaded build in App Store Connect
- [ ] Verify all information is complete
- [ ] Choose release option (Manual recommended)
- [ ] Click "Submit for Review"
- [ ] Confirm submission

## 🧪 Pre-Submission Testing

### Functionality Testing
- [ ] Test all tabs/screens
- [ ] Test counter increment/decrement
- [ ] Test goal setting and tracking
- [ ] Test statistics display
- [ ] Test craving tracker
- [ ] Test community feed
- [ ] Test buddy system
- [ ] Test health timeline
- [ ] Test notifications
- [ ] Test profile editing
- [ ] Test privacy policy access
- [ ] Test terms of service access

### IAP Testing
- [ ] Products load correctly
- [ ] Monthly purchase completes
- [ ] Yearly purchase completes
- [ ] Restore purchases works
- [ ] Premium features accessible after purchase
- [ ] Free features still accessible without purchase

### Account Testing
- [ ] Sign up flow works
- [ ] Email verification (if enabled)
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works (if implemented)
- [ ] Profile updates save correctly

### Data Testing
- [ ] Data persists after app restart
- [ ] Data syncs across sessions
- [ ] Offline mode works (if applicable)
- [ ] Data doesn't leak between users

### Device Testing
- [ ] Test on iPhone (newer model)
- [ ] Test on iPhone (older model if available)
- [ ] Test on iPad (if supported)
- [ ] Test different iOS versions
- [ ] Test light/dark mode
- [ ] Test different text sizes

### Edge Cases
- [ ] Test with poor network connection
- [ ] Test in airplane mode
- [ ] Test with invalid inputs
- [ ] Test rapid button tapping
- [ ] Test backgrounding app
- [ ] Test force quit and reopen

## 📊 Post-Submission

### During Review (24-48 hours)
- [ ] Monitor email for Apple communication
- [ ] Respond quickly to any questions
- [ ] Be ready to fix issues if rejected
- [ ] Don't deploy updates during review

### After Approval
- [ ] Verify app appears on App Store
- [ ] Test downloading from App Store
- [ ] Test IAP in production (make real purchase, then refund)
- [ ] Set up analytics tracking
- [ ] Monitor crash reports
- [ ] Respond to first user reviews
- [ ] Share App Store link on social media
- [ ] Update website with App Store badge

### First Week
- [ ] Monitor App Store Connect dashboard
- [ ] Check crash reports daily
- [ ] Respond to all user reviews
- [ ] Track download numbers
- [ ] Track subscription conversions
- [ ] Monitor revenue
- [ ] Gather user feedback

### First Month
- [ ] Analyze user behavior
- [ ] Identify most used features
- [ ] Identify problem areas
- [ ] Plan version 1.1 updates
- [ ] Fix any critical bugs
- [ ] Improve based on feedback

## 🚨 Common Issues & Solutions

### Rejection Reasons
If rejected for:
- **IAP not working:** Test thoroughly in sandbox, verify product IDs match
- **Privacy policy:** Ensure publicly accessible URL, complete questionnaire
- **Demo account:** Test credentials yourself, provide clear instructions
- **Crashes:** Fix crashes, test extensively, resubmit
- **Metadata mismatch:** Ensure description matches actual features

### Build Issues
- **Code signing:** Select correct team, verify certificates
- **Missing frameworks:** Run `pod install`, clean build
- **Archive fails:** Check for errors in code, update dependencies

### IAP Issues
- **Products not loading:** Wait 2-4 hours after creating, verify IDs
- **Can't make purchases:** Use real device, sign in with sandbox account
- **Restore not working:** Implement restore purchases correctly

## 📈 Success Metrics

Track these after launch:
- [ ] App Store impressions
- [ ] App Store page views
- [ ] Downloads
- [ ] Active users (DAU/MAU)
- [ ] Subscription conversions
- [ ] Monthly recurring revenue
- [ ] Churn rate
- [ ] User ratings
- [ ] Crash-free rate

## 🎯 Goals

### Week 1
- [ ] 100 downloads
- [ ] 5 paying subscribers
- [ ] 4+ star rating

### Month 1
- [ ] 1,000 downloads
- [ ] 50 paying subscribers
- [ ] $150 MRR
- [ ] 4.5+ star rating

### Month 3
- [ ] 5,000 downloads
- [ ] 200 paying subscribers
- [ ] $600 MRR
- [ ] Version 1.1 released

## 📚 Resources

Save these links:
- [ ] App Store Connect: https://appstoreconnect.apple.com
- [ ] Apple Developer: https://developer.apple.com
- [ ] Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- [ ] IAP Guide: https://developer.apple.com/in-app-purchase/
- [ ] TestFlight: https://developer.apple.com/testflight/
- [ ] Capacitor Docs: https://capacitorjs.com/docs

---

**Progress Tracking:**
- Completed: 13/150+ items
- In Progress: 0 items
- Remaining: 137+ items

**Estimated Time to Submission:** 2-4 weeks

**Last Updated:** October 5, 2025
