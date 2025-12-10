# Security Notice - Exposed Credentials

## ⚠️ CRITICAL: If You've Already Pushed Code with Hardcoded Credentials

If you've already pushed code containing hardcoded API keys and OAuth credentials to the GitHub repository, **you must take immediate action**:

### Immediate Actions Required:

1. **Revoke Exposed Credentials** (Do this FIRST):
   - **Gemini API Key**: Go to [Google AI Studio](https://makersuite.google.com/app/apikey) and delete/regenerate the exposed API key
   - **Gmail OAuth Credentials**: Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and:
     - Delete the exposed OAuth 2.0 Client ID
     - Create new OAuth credentials
     - Update your backend with new credentials

2. **Remove Credentials from Git History**:
   ```bash
   # If you haven't pushed yet, you can amend the commit
   git commit --amend
   
   # If already pushed, you'll need to use git filter-branch or BFG Repo-Cleaner
   # This is complex - consider making the repo private or using GitHub's secret scanning
   ```

3. **Check Repository Visibility**:
   - If the repository is **public**, the credentials are already exposed to anyone
   - Consider making it **private** immediately
   - Enable GitHub's secret scanning (Settings → Security → Secret scanning)

4. **Monitor for Unauthorized Usage**:
   - Check your Google Cloud Console for unexpected API usage
   - Monitor billing for unusual charges
   - Review access logs if available

---

## ✅ Secure Setup Instructions

### Step 1: Create Environment File

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your actual credentials:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_GMAIL_CLIENT_ID=your_actual_client_id_here
   NEXT_PUBLIC_GMAIL_CLIENT_SECRET=your_actual_client_secret_here
   NEXT_PUBLIC_GMAIL_PROJECT_ID=your_actual_project_id_here
   ```

### Step 2: Verify .gitignore

Ensure `.env.local` is in your `.gitignore` file (it should already be there):
```
.env*.local
.env
```

### Step 3: Never Commit Credentials

- ✅ **DO**: Commit `.env.example` (with placeholder values)
- ✅ **DO**: Commit code that reads from `process.env`
- ❌ **DON'T**: Commit `.env.local` or any file with real credentials
- ❌ **DON'T**: Hardcode credentials in source files

### Step 4: For Production Deployment

For production (Vercel, Netlify, etc.):

1. **Vercel**:
   - Go to Project Settings → Environment Variables
   - Add all `NEXT_PUBLIC_*` variables
   - They will be available at build time

2. **Other Platforms**:
   - Use their environment variable configuration
   - Never commit `.env` files

---

## 🔒 Best Practices

1. **Use Environment Variables**: Always use `process.env` for sensitive data
2. **Separate Client/Server Secrets**: 
   - `NEXT_PUBLIC_*` variables are exposed to the browser
   - Use server-side API routes for truly sensitive secrets
3. **Rotate Credentials Regularly**: Especially after any exposure
4. **Use Secret Management**: For production, consider services like:
   - AWS Secrets Manager
   - HashiCorp Vault
   - GitHub Secrets (for CI/CD)
5. **Enable Secret Scanning**: GitHub can scan for exposed secrets
6. **Review Access**: Regularly audit who has access to your repositories

---

## 📝 Current Status

✅ **Fixed**: Code now uses environment variables instead of hardcoded credentials
✅ **Fixed**: `.env.example` created as template
✅ **Fixed**: `.gitignore` properly configured

⚠️ **Action Required**: 
- If credentials were already pushed, revoke and regenerate them
- Create `.env.local` with your actual credentials
- Never push `.env.local` to the repository

---

## 🆘 Need Help?

If you've exposed credentials:
1. Revoke them immediately (see above)
2. Check for unauthorized usage
3. Consider using GitHub's secret scanning feature
4. Review [GitHub's guide on removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

