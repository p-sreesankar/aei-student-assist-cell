# Applied Association — AEI, CET

A modern, mobile-first static website for the Applied Electronics and Instrumentation (AEI) department at College of Engineering Trivandrum. Built with React, Vite, and Tailwind CSS. Zero backend — all content driven by simple JavaScript data files.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or later)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/applied-association.git
cd applied-association

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📁 Project Structure

```
applied-association/
├── public/
│   └── images/              # Gallery photos, event images
├── src/
│   ├── assets/              # Logos, static images
│   │   └── gallery/         # Gallery images (if stored locally)
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ScrollToTop.jsx
│   ├── data/                # ⭐ Content data files (EDIT THESE)
│   │   ├── site-config.js   # Global site settings
│   │   ├── about.js         # About section content
│   │   ├── notices.js       # Notice board entries
│   │   ├── events.js        # Event calendar
│   │   ├── gallery.js       # Photo gallery
│   │   ├── resources.js     # Downloadable resources
│   │   └── faculty.js       # Contact cards
│   ├── pages/               # Page components (one per route)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Notices.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   ├── Resources.jsx
│   │   ├── Grievance.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── utils/               # Helper functions
│   │   ├── date.js
│   │   └── helpers.js
│   ├── App.jsx              # Main app + routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 📝 How to Update Content

**You only need to edit files in the `src/data/` folder.** No HTML or CSS knowledge required.

### Add a Notice

1. Open `src/data/notices.js`
2. Copy an existing notice block `{ ... },`
3. Paste it at the **top** of the list
4. Update the values (title, date, description, etc.)
5. Save → `git add .` → `git commit -m "add notice: title"` → `git push`
6. Deploy: `npm run deploy`

### Add an Event

1. Open `src/data/events.js`
2. Add a new event object (see file comments for structure)
3. Save, commit, push, deploy

### Add a Gallery Photo

1. Upload the image to `src/assets/gallery/` or use a Google Drive link
2. Open `src/data/gallery.js` and add a new entry
3. Save, commit, push, deploy

### Update Contact Info

1. Open `src/data/faculty.js`
2. Edit existing entries or add new ones
3. Save, commit, push, deploy

### Change Global Settings

Edit `src/data/site-config.js` to change:
- Site name, tagline, department/college names
- Social media links
- Theme colors
- Grievance form URL

---

## 🎨 Design System

### Colors (Tailwind classes)

- **Primary:** `bg-primary-500`, `text-primary-600` — Main brand blue
- **Accent:** `bg-accent-500`, `text-accent-600` — Warm orange
- **Surface:** `bg-surface-50`, `bg-white` — Backgrounds
- **Text:** `text-text-primary`, `text-text-secondary`, `text-text-muted` — Text hierarchy

### Typography

- **Headings:** Plus Jakarta Sans (`.font-heading`)
- **Body:** DM Sans (`.font-body`)

### Key Components

- **Buttons:** `.btn-primary`, `.btn-secondary`, `.btn-accent`
- **Cards:** `.card` (auto shadow + hover effect)
- **Badges:** `.badge-primary`, `.badge-accent`, `.badge-muted`
- **Layout:** `.section-container` (max-width + padding), `.section-padding` (vertical padding)

---

## 🚢 Deployment

This site is configured to deploy to **GitHub Pages**.

### First-Time Setup

1. Create a new GitHub repository: `applied-association`
2. Push this code to the repo:

```bash
git remote add origin https://github.com/YOUR_USERNAME/applied-association.git
git branch -M main
git push -u origin main
```

3. Update `vite.config.js` → set `base: '/applied-association/'` (match your repo name)

### Deploy

```bash
npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch. Your site will be live at:

```
https://YOUR_USERNAME.github.io/applied-association/
```

### Custom Domain (Optional)

1. Add a `CNAME` file to `public/` with your domain (e.g., `assistcell.aei.cet.ac.in`)
2. In `vite.config.js`, change `base: '/'`
3. Configure DNS settings to point to GitHub Pages
4. Deploy: `npm run deploy`

### University Domain Cutover (Recommended)

When the university domain is approved, update these two values in [src/data/site-config.js](src/data/site-config.js):

- `canonicalSiteUrl`: full URL, e.g. `https://assistcell.aei.cet.ac.in`
- `customDomain`: domain only, e.g. `assistcell.aei.cet.ac.in`

Then build and deploy. The build will automatically:

1. Generate `public/CNAME`
2. Generate `public/sitemap.xml` with the university domain
3. Generate `public/robots.txt` pointing to the correct sitemap

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **React Router** — Client-side routing (BrowserRouter with GitHub Pages 404 fallback)
- **Framer Motion** — Smooth animations
- **Lucide React** — Beautiful open-source icons
- **GitHub Pages** — Free static hosting

---

## 📦 Available Scripts

| Command          | Description                                    |
|------------------|------------------------------------------------|
| `npm run dev`    | Start development server (port 5173)           |
| `npm run build`  | Build for production in `dist/`                |
| `npm run preview`| Preview production build locally               |
| `npm run deploy` | Build + deploy to GitHub Pages                 |

For SEO files (`public/robots.txt` and `public/sitemap.xml`), set your production URL before building:

```bash
# Example for GitHub Pages
set VITE_SITE_URL=https://YOUR_USERNAME.github.io/applied-association
npm run build
```

---

## 🔧 Troubleshooting

### "Page not found" on GitHub Pages

- Make sure `base` in `vite.config.js` matches your repo name
- Ensure `public/404.html` is present (generated automatically during build)
- Run `npm run deploy` again

### Images not loading

- If using local images, place them in `src/assets/` or `public/images/`
- If using Google Drive, ensure the link is a direct link: `https://drive.google.com/uc?export=view&id=FILE_ID`
- Use `loading="lazy"` attribute for better performance

### Changes not showing up

- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check GitHub Actions tab to see if deployment succeeded

---

## 🔐 Firebase Security

If you are using Firebase-backed content CRUD, follow the security setup guide:

- [FIREBASE_SECURITY_SETUP.md](FIREBASE_SECURITY_SETUP.md)

This includes Firestore rules deployment and admin-claim requirements for production-safe writes.

---

## 🤝 Contributing

This site is maintained by the Applied Association team. If you're a student or faculty member:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Email: studentassistcell.aei@cet.ac.in
- Visit the Contact page on the live site

---

**Built with ❤️ by the Applied Association team**
