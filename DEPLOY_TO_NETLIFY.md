# Deploying myPredicta CRM to Netlify

## Prerequisites
- A Netlify account (free tier works)
- Git installed on your machine
- GitHub account (or GitLab/Bitbucket)

## Step 1: Prepare for Deployment

### 1.1 Create Environment Variables File
Create a `.env.production` file with any production environment variables:
```bash
# Example (if needed):
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

### 1.2 Test Production Build Locally
```bash
npm run build
npm start
```

## Step 2: Push to GitHub

### 2.1 Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - myPredicta CRM"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named "predicta-crm"
3. Don't initialize with README (we already have one)

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/predicta-crm.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. **Log in to Netlify**
   - Go to https://app.netlify.com

2. **Import from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub

3. **Select Repository**
   - Find and select your "predicta-crm" repository

4. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" → "New variable"
   - Add any environment variables if needed

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment (usually 2-5 minutes)

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**
```bash
netlify login
```

3. **Initialize and Deploy**
```bash
netlify init
netlify deploy --prod
```

## Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Important Notes

### Authentication
- The current auth system uses localStorage
- For production, consider implementing proper authentication with:
  - NextAuth.js
  - Auth0
  - Supabase Auth
  - Firebase Auth

### Data Persistence
- Currently using mock data
- For production, integrate with a real database:
  - PostgreSQL/MySQL with Prisma
  - MongoDB
  - Supabase
  - Firebase Firestore

### Performance Optimizations
- The app is already optimized with:
  - Code splitting
  - Lazy loading
  - Image optimization
  - Static generation where possible

### Environment Variables
If you need to add environment variables:
1. Go to Site settings → Environment variables
2. Add your variables
3. Trigger a redeploy

## Troubleshooting

### Build Fails
- Check the build logs in Netlify
- Ensure all dependencies are in package.json
- Try building locally first

### 404 Errors
- The netlify.toml file handles Next.js routing
- If issues persist, check the _redirects file

### Slow Performance
- Enable Netlify's asset optimization
- Consider using Netlify's CDN features
- Check bundle size with `npm run build`

## Share with Your Team

Once deployed, you'll get a URL like:
- https://YOUR-SITE-NAME.netlify.app

You can:
1. Share this URL directly
2. Set up a custom domain
3. Enable password protection (Team plan)
4. Set up deploy previews for branches

## Continuous Deployment

With GitHub connected, every push to main will:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy if successful

To disable auto-deploy:
- Go to Site settings → Build & deploy
- Change "Production branch" settings

## Success! 🎉

Your myPredicta CRM should now be live on Netlify. The demo credentials are:
- Any email/password combination works
- The app will showcase all features with mock data

For questions or issues, check:
- Netlify docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/