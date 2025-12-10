# GitHub Repository Setup Guide

## 📋 Pre-Push Checklist

Before pushing to [https://github.com/AnuragNagare/Inbox-Pro.git](https://github.com/AnuragNagare/Inbox-Pro.git), ensure:

- [x] ✅ All hardcoded credentials removed from source code
- [x] ✅ Environment variables implemented
- [x] ✅ `.env.local` is in `.gitignore`
- [x] ✅ `.env.example` created (template only, no real credentials)
- [ ] ⚠️ **If you already pushed with credentials**: Revoke them immediately (see SECURITY.md)

---

## 🚀 Initial Setup

### Step 1: Initialize Git (if not already done)

```bash
cd "D:\Inbox Pro\Codes\SAAS\Landing"
git init
```

### Step 2: Add Remote Repository

```bash
git remote add origin https://github.com/AnuragNagare/Inbox-Pro.git
```

Or if remote already exists:
```bash
git remote set-url origin https://github.com/AnuragNagare/Inbox-Pro.git
```

### Step 3: Verify .gitignore

Check that `.gitignore` includes:
```
.env*.local
.env
node_modules/
.next/
```

### Step 4: Create .env.local (DO NOT COMMIT THIS)

```bash
# Create your local environment file
cp .env.example .env.local

# Edit .env.local with your actual credentials
# This file will NOT be committed (it's in .gitignore)
```

### Step 5: Stage and Commit

```bash
# Check what will be committed
git status

# Stage all files (except .env.local which is ignored)
git add .

# Commit
git commit -m "Initial commit: Inbox Pro AI Landing Page with Next.js"
```

### Step 6: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🔍 Verify Before Pushing

### Check for Exposed Credentials

```bash
# Search for any remaining hardcoded credentials
grep -r "AIzaSy" . --exclude-dir=node_modules --exclude-dir=.next
grep -r "GOCSPX" . --exclude-dir=node_modules --exclude-dir=.next
grep -r "client_secret" . --exclude-dir=node_modules --exclude-dir=.next
```

If any results appear, **DO NOT PUSH** until they're removed.

### Verify .env.local is Ignored

```bash
# This should NOT show .env.local
git status
```

If `.env.local` appears, check your `.gitignore` file.

---

## 🔐 Security Best Practices

1. **Never commit credentials**:
   - ✅ `.env.example` (with placeholders) - OK to commit
   - ❌ `.env.local` (with real values) - NEVER commit

2. **Use GitHub Secrets for CI/CD** (if using GitHub Actions):
   - Go to Repository Settings → Secrets and variables → Actions
   - Add your environment variables there

3. **Enable Secret Scanning**:
   - Go to Repository Settings → Security
   - Enable "Secret scanning" to detect accidentally committed secrets

4. **Make Repository Private** (if needed):
   - If this is a private project, make the repository private
   - Go to Settings → Danger Zone → Change repository visibility

---

## 📝 Recommended Repository Structure

Your repository should look like this:

```
Inbox-Pro/
├── .gitignore          ✅ (includes .env*.local)
├── .env.example        ✅ (template, safe to commit)
├── .env.local          ❌ (your actual credentials, NOT committed)
├── README.md           ✅
├── SECURITY.md         ✅
├── package.json        ✅
├── next.config.js      ✅
├── app/                ✅
├── components/         ✅
├── utils/              ✅ (no hardcoded credentials)
└── ...
```

---

## 🆘 If You Already Pushed with Credentials

**STOP** - Do not push any more commits until you:

1. **Revoke exposed credentials immediately**:
   - Gemini API Key: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Gmail OAuth: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

2. **Remove from Git history** (advanced):
   ```bash
   # Use git filter-branch or BFG Repo-Cleaner
   # Or consider making repo private and starting fresh
   ```

3. **See SECURITY.md** for detailed instructions

---

## ✅ Post-Push Verification

After pushing:

1. **Check GitHub repository**:
   - Visit: https://github.com/AnuragNagare/Inbox-Pro
   - Verify no `.env.local` file is visible
   - Verify no hardcoded credentials in code

2. **Test the repository**:
   - Clone to a fresh location
   - Follow setup instructions
   - Verify it works with environment variables

---

## 🎯 Next Steps

After successful push:

1. **Set up GitHub Pages** (if needed for static hosting)
2. **Configure GitHub Actions** (for CI/CD)
3. **Add collaborators** (if working in a team)
4. **Set up branch protection** (for main branch)
5. **Add repository description and topics** on GitHub

---

## 📚 Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

