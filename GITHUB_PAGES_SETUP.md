# GitHub Pages Auto-Deployment Setup Guide

This guide will set up **automatic deployment** to GitHub Pages using GitHub Actions. Every time you push to the `main` branch, your site will automatically rebuild and deploy.

---

## ✅ Prerequisites

- [x] GitHub account
- [x] Git installed on your computer
- [x] Project built and tested locally (`npm run dev` works)

---

## 📋 Step-by-Step Setup

### **Step 1: Create a GitHub Repository**

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top-right) → **New repository**
3. Repository settings:
   - **Name:** `aei-association`
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** check "Add a README file" (we already have one)
4. Click **Create Repository**

---

### **Step 2: Push Your Project to GitHub**

Open a terminal in your project folder (`C:\Users\SREESANKAR\Python\AEI`) and run these **3 commands**:

```bash
# 1. Initialize Git repository (if not already done)
git init

# 2. Add all files and commit
git add .
git commit -m "Initial commit: AEI Association website"

# 3. Push to GitHub (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aei-association.git
git branch -M main
git push -u origin main
```

**Example:** If your GitHub username is `sreesankar-cet`, the command would be:
```bash
git remote add origin https://github.com/sreesankar-cet/aei-association.git
```

---

### **Step 3: Configure GitHub Pages**

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/aei-association`

2. Click **Settings** (tab at the top)

3. In the left sidebar, scroll down and click **Pages**

4. Under **Build and deployment**:
   - **Source:** Select **"GitHub Actions"** (NOT "Deploy from a branch")
   
   That's it! GitHub will automatically detect the workflow file at `.github/workflows/deploy.yml`

5. Click **Save** (if there's a save button)

---

### **Step 4: Trigger the First Deployment**

The workflow triggers on push to `main`, so your first push (Step 2) should have already started the deployment.

To check:

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the build progress
4. Wait 1–3 minutes for it to complete (green checkmark = success)

---

### **Step 5: View Your Live Site**

Once the workflow succeeds:

1. Go back to **Settings → Pages**
2. You'll see a message at the top: **"Your site is live at https://YOUR_USERNAME.github.io/aei-association/"**
3. Click the link to open your site 🎉

**Example URL:** `https://sreesankar-cet.github.io/aei-association/`

---

## 🔄 How It Works (Automatic Deployment)

After the initial setup, deployment is **fully automatic**:

1. You edit a content file (e.g., `src/data/notices.js`)
2. You commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add new notice"
   git push
   ```
3. GitHub Actions automatically:
   - Installs dependencies
   - Builds the site (`npm run build`)
   - Deploys to GitHub Pages
4. Your site updates in **1–3 minutes** — no manual `npm run deploy` needed!

---

## 📁 What Was Created

### `.github/workflows/deploy.yml`
GitHub Actions workflow that:
- Triggers on every push to the `main` branch
- Runs on Ubuntu with Node.js 18
- Installs dependencies with `npm ci` (faster than `npm install`)
- Builds the site with `npm run build`
- Uploads the `dist/` folder as a Pages artifact
- Deploys to GitHub Pages automatically

### Removed from `package.json`
- `gh-pages` dependency (no longer needed — GitHub Actions handles deployment)
- `"deploy": "npm run build && gh-pages -d dist"` script (replaced by GitHub Actions)

---

## 🛠️ Troubleshooting

### **Workflow fails with "permission denied"**

**Fix:** Go to **Settings → Actions → General** → scroll to **Workflow permissions** → select **"Read and write permissions"** → **Save**

Then push again to trigger a new workflow run.

---

### **Site shows 404 or blank page**

**Check these:**

1. **Base path in vite.config.js** — must match repo name **exactly**:
   ```javascript
   base: '/aei-association/',  // ← Must start and end with /
   ```

2. **Pages source** — must be set to "GitHub Actions" (not "Deploy from a branch")

3. **Repository is Public** — GitHub Pages is free only for public repos

4. **Hard refresh** your browser: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

---

### **Workflow triggered but deployment failed**

1. Go to **Actions** tab → click the failed run → click the red X step to see the error
2. Common causes:
   - Missing dependency in `package.json`
   - Build error (typo in code)
   - Incorrect workflow permissions (see fix above)

---

### **Changes not appearing after push**

1. Check **Actions** tab — workflow might still be running (yellow dot)
2. Wait 2–3 minutes after the green checkmark
3. Hard refresh your browser
4. Clear browser cache

---

## 🎯 Daily Workflow (After Initial Setup)

```bash
# 1. Make changes to content files (src/data/*.js)

# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Update notices / events / gallery"
git push

# 4. Wait 1–3 minutes → site auto-updates! ✨
```

That's it — no `npm run deploy`, no manual builds. GitHub Actions does everything.

---

## 📊 Monitoring Deployments

- **Actions tab:** See all workflow runs (history of deployments)
- **Environments (left sidebar):** See deployment history with timestamps
- **Pages settings:** See current deployment status and URL

---

## 🔒 Security Notes

- The workflow uses official GitHub Actions (maintained by GitHub)
- `GITHUB_TOKEN` is automatically provided by GitHub (no secrets needed)
- Permissions are scoped to Pages deployment only
- Concurrency setting prevents multiple simultaneous deploys

---

## 🚀 Advanced: Deploy Previews for Pull Requests (Optional)

If you want to preview changes before merging to `main`, add this to `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
  pull_request:  # ← Add this
```

Then create a separate workflow for PR previews using services like Netlify Deploy Previews or Vercel.

---

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/aei-association/
```

**Deploy status:** Check the Actions tab after every push!

---

Happy deploying! 🎉
