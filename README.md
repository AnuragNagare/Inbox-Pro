# Inbox Pro AI - Landing Page (Next.js)

Next.js-based landing page for Inbox Pro AI with modern UI, animations, and integrated feature pages.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend API running on `http://localhost:9000` (or configure via environment variables)

### Install Dependencies
```bash
npm install
```

### Environment Setup

1. **Create environment file**:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```

2. **Configure your credentials** in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:9000
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_GMAIL_CLIENT_ID=your_gmail_client_id_here
   NEXT_PUBLIC_GMAIL_CLIENT_SECRET=your_gmail_client_secret_here
   NEXT_PUBLIC_GMAIL_PROJECT_ID=your_project_id_here
   ```

   > ⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

3. **Get your credentials**:
   - **Gemini API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **Gmail OAuth**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### Run Development Server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 📁 Project Structure

```
Landing/
├── app/                      # Next.js App Router
│   ├── page.js              # Main landing page
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global styles
│   └── [feature]/           # Feature-specific pages
│       └── page.js
├── components/              # React components
│   ├── [feature]/           # Feature-specific components
│   └── [shared]/            # Shared components (Navigation, Footer, etc.)
├── utils/                   # API utilities
│   ├── api.js              # Base API client
│   └── [feature]-api.js    # Feature-specific API clients
├── config/
│   └── routes.js           # Route configuration
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── .env.local              # Your actual credentials (gitignored)
├── package.json
└── tailwind.config.js
```

## ✨ Features

- ✅ Same UI and animations as HTML version
- ✅ AOS (Animate On Scroll) animations
- ✅ Tailwind CSS styling
- ✅ Responsive design
- ✅ Backend API integration
- ✅ Navigation to other React apps
- ✅ Smooth scrolling

## 🔗 Navigation Flow

- **Get Started buttons** → Opens setup page
- **Feature cards** → Opens integrated feature pages:
  - Email Analysis & Send → `/email-analysis`
  - Follow-up Email Analytics → `/follow-up-analytics`
  - Smart Meeting Detection → `/meeting-intent`
  - Priority Feedback & Follow-up → `/priority-feedback`
  - Smart Quick Reply → `/smart-quick-reply`
  - Feedback and Follow-up → `/feedback-followup`

## 🔌 Backend Integration

The landing page checks backend health status on mount. Backend API utilities are available in `utils/` directory.

**Backend Requirements**:
- FastAPI backend running on `http://localhost:9000` (or configure via `NEXT_PUBLIC_API_URL`)
- Endpoints: `/api/health`, `/api/auth/status`, `/api/gmail/*`, etc.

## 🎨 Styling

- Uses Tailwind CSS v3
- Custom animations (float, pulse-slow, gradient-shift)
- Custom gradient classes
- Same color scheme as original

## 🔒 Security

⚠️ **IMPORTANT**: This project uses environment variables for sensitive credentials. 

- Never commit `.env.local` to version control
- Always use `.env.example` as a template
- See [SECURITY.md](./SECURITY.md) for detailed security instructions
- If you've exposed credentials, revoke them immediately

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `NEXT_PUBLIC_GMAIL_CLIENT_ID`
   - `NEXT_PUBLIC_GMAIL_CLIENT_SECRET`
   - `NEXT_PUBLIC_GMAIL_PROJECT_ID`
4. Deploy!

### Other Platforms

Set environment variables in your hosting platform's dashboard. All `NEXT_PUBLIC_*` variables are available at build time.

## 📝 Notes

- All animations use AOS library
- External links open in new tabs
- Internal navigation uses smooth scrolling
- Backend connection is optional (gracefully handles errors)
- Built with Next.js 14 App Router
