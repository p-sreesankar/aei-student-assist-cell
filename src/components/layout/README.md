# Layout Components

> Warm, friendly layout system for Student Assist Cell

---

## 📦 Components

### 1. **Navbar** — Sticky navigation with mobile menu

**Features:**
- Logo + brand name (left)
- Desktop nav links with warm dot indicator on active page
- Mobile hamburger menu → full-screen slide-down (Framer Motion)
- Sticky on scroll with shadow appearance
- Config-driven navigation (edit links in one place)

**Location:** [src/components/layout/Navbar.jsx](Navbar.jsx)

---

### 2. **Footer** — Warm footer with navigation and contact

**Features:**
- Department info + logo
- Quick links (synced with Navbar via config)
- Social media icons with hover lift effect
- Contact email mailto link
- Footer credit line

**Location:** [src/components/layout/Footer.jsx](Footer.jsx)

---

### 3. **PageLayout** — Main layout wrapper

**Features:**
- Wraps all pages: Navbar + content + Footer
- Smooth scroll to top on route change
- Fade-in page transition (Framer Motion)
- Minimum viewport height layout

**Location:** [src/components/layout/PageLayout.jsx](PageLayout.jsx)

**Usage:**
```jsx
import { PageLayout } from '@components/layout';

function App() {
  return (
    <PageLayout>
      <YourPageContent />
    </PageLayout>
  );
}
```

---

### 4. **SectionWrapper** — Consistent section spacing

**Features:**
- Max-width container (1280px)
- Responsive padding (py-12 md:py-16 lg:py-20)
- Optional background color variants
- Optional ID for anchor links

**Location:** [src/components/layout/SectionWrapper.jsx](SectionWrapper.jsx)

**Background Variants:**
- `default` — Warm off-white (`bg-surface-50`)
- `white` — Pure white (`bg-surface-0`)
- `gray` — Light gray (`bg-surface-100`)
- `primary-light` — Subtle purple tint
- `accent-light` — Subtle amber tint

**Usage:**
```jsx
import { SectionWrapper } from '@components/layout';

<SectionWrapper background="white">
  <SectionHeader title="Latest Notices" />
  {/* content */}
</SectionWrapper>

// Alternating backgrounds
<SectionWrapper background="default">...</SectionWrapper>
<SectionWrapper background="white">...</SectionWrapper>
<SectionWrapper background="gray">...</SectionWrapper>
```

---

## ⚙️ Navigation Configuration

**IMPORTANT:** All navigation is config-driven. Edit nav links in **ONE place** to update both Navbar and Footer.

**File:** [src/config/navigation.js](../../config/navigation.js)

### How to Hide a Nav Item Sitewide

Simply **comment out** the link in the config:

```javascript
// src/config/navigation.js

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Notices', path: '/notices' },
  { label: 'Events', path: '/events' },
  // { label: 'Gallery', path: '/gallery' },  ← HIDDEN sitewide
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];
```

The Gallery link will now be **removed from both Navbar and Footer automatically**.

---

## 🎨 Design Features

### Navbar
- **Active Indicator:** Warm purple dot below active link
- **Mobile Menu:** Full-screen slide-down with staggered animation
- **Sticky Behavior:** Shadow appears on scroll
- **Logo:** Gradient purple square with department initials

### Footer
- **Social Icons:** Hover lift effect (`-translate-y-0.5` + shadow)
- **Quick Links:** Dot indicator on hover
- **Warm Background:** `bg-surface-100` (light gray)
- **Responsive Grid:** 1 column (mobile) → 3 columns (desktop)

### PageLayout
- **Page Transition:** 400ms fade-in with subtle Y movement
- **Auto-scroll:** Smooth scroll to top on route change
- **Flex Layout:** Footer always at bottom (sticky footer)

### SectionWrapper
- **Consistent Spacing:** Same padding/max-width across all sections
- **Alternating Backgrounds:** Create visual rhythm with different variants
- **Responsive Padding:** Larger on desktop (`py-12` → `py-20`)

---

## 📖 Full Page Example

```jsx
import { PageLayout, SectionWrapper } from '@components/layout';
import { SectionHeader, Card } from '@components/ui';

export default function NoticesPage() {
  return (
    <PageLayout>
      {/* Hero Banner */}
      <SectionWrapper background="primary-light" noPadding>
        <div className="py-16">
          <SectionHeader
            title="Notice Board"
            subtitle="Stay updated with the latest announcements"
            centered
          />
        </div>
      </SectionWrapper>

      {/* Pinned Notices */}
      <SectionWrapper background="white" id="pinned">
        <SectionHeader
          title="Pinned Notices"
          showAccent
        />
        {/* notices content */}
      </SectionWrapper>

      {/* Recent Notices */}
      <SectionWrapper background="default">
        <SectionHeader
          title="Recent Announcements"
          showAccent
        />
        {/* notices content */}
      </SectionWrapper>
    </PageLayout>
  );
}
```

---

## 🔗 Import Aliases

All layout components support path aliases:

```jsx
import { PageLayout, SectionWrapper } from '@components/layout';
import { Navbar, Footer } from '@components/layout';
import { NAV_LINKS, BRAND } from '@config/navigation';
```

Configured in [vite.config.js](../../../vite.config.js):
- `@components` → `src/components`
- `@config` → `src/config`
- `@pages` → `src/pages`
- `@data` → `src/data`

---

## ✨ Key Features

✅ **Config-Driven:** Edit navigation in one place  
✅ **Mobile-First:** Responsive on all screen sizes  
✅ **Accessible:** Keyboard navigation, ARIA labels, focus states  
✅ **Warm Design:** Friendly colors, soft shadows, rounded corners  
✅ **Smooth Animations:** Framer Motion page transitions  
✅ **Sticky Navbar:** Fixed on scroll with shadow  
✅ **Sticky Footer:** Always at bottom of viewport  

---

**Built with ❤️ for students**
