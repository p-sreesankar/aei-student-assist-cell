# Deployment Guide — GitHub Pages

Step-by-step guide to deploy the Applied Association website to GitHub Pages.

---

## Prerequisites

- [x] Node.js installed (v18+)
- [x] Git installed
- [x] GitHub account created
- [x] All content data files updated in `src/data/`

---

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top-right) → **New repository**
3. Repository name: `applied-association` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Do **NOT** initialize with README (we already have one)
6. Click **Create Repository**

---

## Step 2: Update Vite Config

Open `vite.config.js` and set the `base` option to match your repository name:

```javascript
export default defineConfig({
  // ...
  base: '/applied-association/',  // ← Replace with YOUR repo name
  // ...
});
```

**Important:** Make sure it starts and ends with `/`.

If you plan to use a custom domain later, set `base: '/'` instead.

---

## Step 3: Push Code to GitHub

Open a terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Applied Association website"

# Add remote origin (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/applied-association.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Your code is now on GitHub!

---

## Step 4: Deploy to GitHub Pages

Run this command:

```bash
npm run deploy
```

This will:
1. Build the production site (`npm run build`)
2. Push the `dist/` folder to a new branch called `gh-pages`

**Wait 1–2 minutes** for GitHub to process the deployment.

---

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top-right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

You'll see a message: **"Your site is live at https://YOUR_USERNAME.github.io/applied-association/"**

---

## Step 6: Test Your Site

Click the URL to open your live website. If you see a blank page:

1. Wait 2–3 minutes (GitHub Pages can be slow on first deploy)
2. Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. Check that `base` in `vite.config.js` matches your repo name exactly

---

## Updating the Site (After Initial Deploy)

Every time you update content:

1. Edit the data files in `src/data/`
2. Save your changes
3. Commit and push:

```bash
git add .
git commit -m "Update notices / events / etc."
git push
```

4. Deploy:

```bash
npm run deploy
```

Your changes will be live in 1–2 minutes.

---

## Using a Custom Domain (Optional)

If you have a custom domain (e.g., `assistcell.cet.ac.in`):

### A. Update Vite Config

In `vite.config.js`, change:

```javascript
base: '/',  // Remove the repo-specific base
```

### B. Add CNAME File

Create a file `public/CNAME` (no extension) with your domain:

```
assistcell.cet.ac.in
```

### C. Configure DNS

Go to your DNS provider and add a CNAME record:

| Type  | Name       | Value                              |
|-------|------------|------------------------------------|
| CNAME | assistcell | YOUR_USERNAME.github.io            |

Or for an apex domain (e.g., `aei-cell.com`), add A records:

| Type | Name | Value         |
|------|------|---------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

### D. Enable HTTPS

1. Go to **Settings → Pages** on GitHub
2. Check **Enforce HTTPS** (wait for DNS propagation if greyed out)

---

## Troubleshooting

### "404 — There isn't a GitHub Pages site here"

- Make sure `gh-pages` branch exists (run `npm run deploy` again)
- Check GitHub Actions tab — deployment might have failed
- Ensure repository is **Public**

### Blank page / Assets not loading

- Verify `base` in `vite.config.js` matches your repo name **exactly**
- Using HashRouter? Check that `App.jsx` uses `<HashRouter>`, not `<BrowserRouter>`
- Hard refresh: `Ctrl+F5`

### Changes not appearing after deploy

- GitHub Pages can take 1–5 minutes to update
- Clear browser cache
- Check if `git push` succeeded before running `npm run deploy`

---

## Need Help?

- Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue in this repository
- Contact: studentassistcell.aei@cet.ac.in

---

**Your site is now live! 🎉**
