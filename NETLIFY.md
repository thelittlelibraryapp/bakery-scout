# Deploying to Netlify

This guide will help you deploy your Capital District Food Scout app to Netlify with automatic deployments from GitHub.

## Prerequisites

- A Netlify account (free tier is fine) - Sign up at [netlify.com](https://netlify.com)
- Your GitHub repository with the code pushed
- Your Supabase credentials ready

## Step-by-Step Deployment

### 1. Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `thelittlelibraryapp/bakery-scout`
6. Select the branch: `claude/food-scout-setup-011CUqR9yrDqmn8RMCzyQ51o`

### 2. Configure Build Settings

Netlify should auto-detect the settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`

Click **"Show advanced"** if you need to add environment variables now, or you can do it after deployment.

### 3. Add Environment Variables

**IMPORTANT:** Before your site will work, you MUST add your Supabase credentials:

1. After the site deploys, go to **Site settings**
2. Go to **Environment variables** (in the left sidebar)
3. Click **"Add a variable"** and add these two:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon/public key

4. Click **"Save"**

### 4. Trigger a Rebuild

After adding environment variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for the build to complete (usually 1-2 minutes)

### 5. Your Site is Live! 🎉

Once the deploy succeeds, you'll get a URL like: `https://your-site-name.netlify.app`

You can customize this domain in **Site settings** → **Domain management**

## Automatic Deployments

Now every time you push to your GitHub branch, Netlify will automatically:
1. Pull the latest code
2. Run `npm run build`
3. Deploy the new version
4. Your site updates in ~1-2 minutes!

## Troubleshooting

### Site loads but shows "Failed to load bakeries"

This usually means your environment variables aren't set correctly:
1. Check **Site settings** → **Environment variables**
2. Make sure both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are there
3. Trigger a new deploy after adding/fixing them

### Build fails

Check the deploy log in Netlify:
1. Go to **Deploys** tab
2. Click on the failed deploy
3. Look for error messages in the log
4. Common issues:
   - Missing dependencies (run `npm install` locally first)
   - TypeScript errors (run `npm run build` locally to check)

### Environment variables not working

Make sure:
- Variable names start with `VITE_` (required for Vite)
- No quotes around the values in Netlify's interface
- You triggered a new deploy after adding them

## Custom Domain (Optional)

To use your own domain:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

## Monitoring

- **Deploys tab**: See all deployments and their status
- **Functions tab**: Not needed for this app
- **Analytics tab**: See visitor stats (paid feature)

---

Need help? Check the [Netlify documentation](https://docs.netlify.com/) or reach out!
