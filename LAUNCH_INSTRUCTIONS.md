# 🚀 How to Launch Apps from Landing Page

## Quick Start

### Option 1: Use PowerShell Script (Recommended)
1. Open PowerShell in the `Landing` folder
2. Run: `.\launch-apps.ps1`
3. Select which app(s) to launch
4. Wait for apps to compile
5. Click "Launch App" button on landing page

### Option 2: Manual Launch
For each app you want to use:

1. **Open Terminal/Command Prompt**
2. **Navigate to the app folder:**
   ```bash
   cd "D:\Inbox Pro\Codes\SAAS\[App Folder Name]"
   ```
3. **Start the app:**
   ```bash
   npm start
   ```
4. **Wait for compilation** (you'll see "Compiled successfully!")
5. **Click "Launch App" button** on the landing page

## App Ports

| App | Folder | Port |
|-----|--------|------|
| 📧 Email Analysis & Send | `API Email AI email analysis and Send Email` | 3001 |
| 📊 Follow-up Analytics | `Follow up email and Analystics` | 3005 |
| 📅 Meeting Intent | `Meeting Intent` | 3006 |
| 🎯 Priority Feedback | `Priority Feedback and Follow-up Automation` | 3007 |
| 💬 Smart Quick Reply | `Smart and Quick reply` | 3008 |
| 🔄 Feedback Follow-up | `Feed back and Follow up` | 3009 |

## Important Notes

⚠️ **Port Conflicts:**
- Landing page runs on port **3000**
- Make sure no other app is using the same port
- If a port is in use, React will automatically use the next available port

💡 **Tips:**
- Keep terminal windows open while using apps
- Each app needs its own terminal window
- Backend must be running on `http://localhost:9000` for apps to work

## Troubleshooting

### "Connection Refused" Error
- App is not running - follow launch steps above
- Check if port is already in use
- Verify app compiled successfully

### "Port Already in Use"
- Close the app using that port
- Or let React auto-assign a new port
- Update the route in `Landing/src/config/routes.js` if port changed

### App Won't Start
- Make sure `npm install` was run in the app folder
- Check Node.js version (needs 14+)
- Verify all dependencies are installed

