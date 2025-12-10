# 🔧 Troubleshooting Landing Page Redirects

## Problem: Buttons Not Redirecting

If clicking "Launch App" buttons doesn't work, here's how to fix it:

### ✅ Quick Check

1. **Is the app running?**
   - Each app needs to be started separately
   - Open terminal in each app folder
   - Run: `npm start`
   - Wait for "Compiled successfully!"

2. **What port is the app actually on?**
   - Check the terminal output when you run `npm start`
   - React will show: "Local: http://localhost:XXXX"
   - Note the actual port number

3. **Update routes if port is different:**
   - Edit: `Landing/src/config/routes.js`
   - Change the port number to match what React shows
   - Example: If app runs on 3002 instead of 3001, update the route

### 📋 Step-by-Step Fix

#### Step 1: Start Each App

Open separate terminals for each app:

```bash
# Terminal 1: Email Analysis
cd "D:\Inbox Pro\Codes\SAAS\API Email AI email analysis and Send Email"
npm start
# Note the port shown (e.g., "Local: http://localhost:3001")

# Terminal 2: Follow-up Analytics  
cd "D:\Inbox Pro\Codes\SAAS\Follow up email and Analystics"
npm start
# Note the port shown

# Terminal 3: Meeting Intent
cd "D:\Inbox Pro\Codes\SAAS\Meeting Intent"
npm start
# Note the port shown

# Terminal 4: Priority Feedback
cd "D:\Inbox Pro\Codes\SAAS\Priority Feedback and Follow-up Automation"
npm start
# Note the port shown

# Terminal 5: Smart Quick Reply
cd "D:\Inbox Pro\Codes\SAAS\Smart and Quick reply"
npm start
# Note the port shown
```

#### Step 2: Update Routes

Edit `Landing/src/config/routes.js` and update ports to match what you see:

```javascript
export const ROUTES = {
  API_EMAIL_AI: 'http://localhost:3001',  // ← Change to actual port
  FOLLOW_UP_ANALYTICS: 'http://localhost:3005',  // ← Change if different
  MEETING_INTENT: 'http://localhost:3006',  // ← Change if different
  // ... etc
};
```

#### Step 3: Restart Landing Page

```bash
# Stop landing page (Ctrl+C)
# Then restart:
cd "D:\Inbox Pro\Codes\SAAS\Landing"
npm start
```

#### Step 4: Test Buttons

- Click "Launch App" buttons
- They should open in new tabs
- If you see "Connection Refused", the app isn't running on that port

### 🎯 Common Issues

#### Issue: "Connection Refused"
**Solution:** App is not running. Start it with `npm start` first.

#### Issue: Opens Landing Page Instead
**Solution:** Port conflict. Landing page and app are on same port. Check which port each is using.

#### Issue: Button Does Nothing
**Solution:** 
- Check browser console for errors (F12)
- Make sure popups aren't blocked
- Try right-click → "Open in new tab"

#### Issue: Wrong App Opens
**Solution:** Ports are mixed up. Check actual ports and update routes.js

### 💡 Pro Tip

Use the PowerShell launcher script:
```powershell
cd "D:\Inbox Pro\Codes\SAAS\Landing"
.\launch-apps.ps1
```

This will start all apps automatically on correct ports!

