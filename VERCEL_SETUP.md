# Vercel Deployment Setup Guide

This guide sets up automatic deployment to Vercel from your GitHub repository.

---

## Prerequisites

- [x] GitHub account
- [x] Vercel account
- [x] Project pushed to GitHub
- [x] Local build passes (`npm run build`)

---

## Step 1: Import Repository in Vercel

1. Open [vercel.com/new](https://vercel.com/new)
2. Connect your GitHub account (if not connected)
3. Select your repository
4. Verify project settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

---

## Step 2: Verify Production Branch

In Vercel project settings, ensure your production branch is set to `main`.

Behavior:

- Push to `main` → production deployment
- Push to other branches / PRs → preview deployment

---

## Step 3: Verify Routing

This project uses client-side routing. Keep `vercel.json` configured with SPA fallback:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

---

## Step 4: Add Custom Domain (Optional)

1. Vercel project → **Settings → Domains**
2. Add your custom domain
3. Configure DNS records provided by Vercel
4. Wait for verification and SSL provisioning

---

## Daily Workflow

```bash
# edit content
# src/data/*.js

npm run validate:resources
npm run build

git add .
git commit -m "Update content"
git push
```

After push, monitor deployment in Vercel dashboard.

---

## Troubleshooting

### 404 on route refresh

- Check `vercel.json` fallback route
- Redeploy latest commit

### Build failure

- Run `npm run build` locally
- Fix the first build error and push again

### New content not visible

- Confirm deployment succeeded in Vercel
- Hard refresh browser cache

---

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
