# Layout System Usage Guide

> Complete guide to using the config-driven layout system

---

## 🚀 Quick Start

### 1. Wrap Your Pages with PageLayout

```jsx
import { PageLayout } from '@components/layout';

export default function YourPage() {
  return (
    <PageLayout>
      {/* Your page content */}
    </PageLayout>
  );
}
```

**What it does:**
- Adds Navbar (fixed at top)
- Adds Footer (sticky at bottom)
- Auto-scrolls to top on navigation
- Applies fade-in page transition

---

### 2. Use SectionWrapper for Consistent Spacing

```jsx
import { PageLayout, SectionWrapper } from '@components/layout';
import { SectionHeader } from '@components/ui';

export default function YourPage() {
  return (
    <PageLayout>
      <SectionWrapper background="white">
        <SectionHeader title="Page Title" />
        {/* Content */}
      </SectionWrapper>

      <SectionWrapper background="default">
        <SectionHeader title="Another Section" />
        {/* Content */}
      </SectionWrapper>
    </PageLayout>
  );
}
```

**What it does:**
- Max-width: 1280px
- Responsive padding: `py-12` → `py-16` → `py-20`
- Horizontal padding: `px-4` → `px-6` → `px-8`
- Optional background colors

---

## ⚙️ Configuration (Most Important!)

### How to Edit Navigation Links

**File:** `src/config/navigation.js`

```javascript
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Notices', path: '/notices' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];
```

---

### ✅ How to HIDE a Nav Item Sitewide

**Just comment it out:**

```javascript
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Notices', path: '/notices' },
  { label: 'Events', path: '/events' },
  // { label: 'Gallery', path: '/gallery' },  ← HIDDEN
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];
```

**Result:**
- ❌ Gallery removed from **Navbar** (desktop + mobile)
- ❌ Gallery removed from **Footer** quick links
- ✅ No code changes needed in Navbar.jsx or Footer.jsx
- ✅ Changes apply **instantly** (hot reload)

---

### How to REORDER Nav Items

**Just change the order in the array:**

```javascript
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Notices', path: '/notices' },      // Moved up
  { label: 'Events', path: '/events' },        // Moved up
  { label: 'About', path: '/about' },          // Moved down
  { label: 'Gallery', path: '/gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];
```

---

### How to ADD a New Nav Item

**Add to the array:**

```javascript
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Notices', path: '/notices' },
  { label: 'Events', path: '/events' },
  { label: 'Alumni', path: '/alumni' },  // ← NEW
  { label: 'Gallery', path: '/gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];
```

**Then create the page component and add a route:**

```jsx
// src/pages/Alumni.jsx
import { PageLayout, SectionWrapper } from '@components/layout';

export default function Alumni() {
  return (
    <PageLayout>
      <SectionWrapper>
        <h1>Alumni Page</h1>
      </SectionWrapper>
    </PageLayout>
  );
}

// In App.jsx
import Alumni from '@pages/Alumni';

<Route path="/alumni" element={<Alumni />} />
```

---

## 🎨 Background Variants

Use different backgrounds to create visual rhythm:

```jsx
// Alternating pattern
<SectionWrapper background="white">
  {/* Section 1 */}
</SectionWrapper>

<SectionWrapper background="default">
  {/* Section 2 */}
</SectionWrapper>

<SectionWrapper background="gray">
  {/* Section 3 */}
</SectionWrapper>

<SectionWrapper background="primary-light">
  {/* Section 4 (subtle purple) */}
</SectionWrapper>

<SectionWrapper background="accent-light">
  {/* Section 5 (subtle amber) */}
</SectionWrapper>
```

**Available Backgrounds:**
- `default` — `bg-surface-50` (warm off-white) ← **page background**
- `white` — `bg-surface-0` (pure white)
- `gray` — `bg-surface-100` (light gray)
- `primary-light` — `bg-primary-50` (subtle purple tint)
- `accent-light` — `bg-accent-50` (subtle amber tint)

---

## 🔗 Anchor Links

Add `id` prop for anchor links:

```jsx
<SectionWrapper id="upcoming-events" background="white">
  <SectionHeader title="Upcoming Events" />
  {/* content */}
</SectionWrapper>

// Link to it:
<a href="#upcoming-events">Jump to Upcoming Events</a>
```

---

## 📱 Mobile Menu Behavior

**Automatic:**
- Hamburger icon appears on screens < 1024px
- Full-screen slide-down menu with smooth animation
- Auto-closes on navigation
- Prevents body scroll when open
- Staggered fade-in for each link (50ms delay)

**Active Page Indicator:**
- Desktop: Warm purple dot below link
- Mobile: Purple background + dot on right

---

## 🎯 Complete Page Template

```jsx
import { PageLayout, SectionWrapper } from '@components/layout';
import { SectionHeader, Card, Button, Badge } from '@components/ui';

export default function YourPage() {
  return (
    <PageLayout>
      
      {/* Hero Section */}
      <SectionWrapper background="primary-light" id="hero">
        <SectionHeader
          title="Page Title"
          subtitle="Page description goes here"
          centered
          showAccent
        />
      </SectionWrapper>

      {/* Main Content Section 1 */}
      <SectionWrapper background="white" id="section-1">
        <SectionHeader
          title="Section Title"
          subtitle="Section subtitle"
          showAccent
        />
        
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Your cards */}
        </div>
      </SectionWrapper>

      {/* Main Content Section 2 */}
      <SectionWrapper background="default" id="section-2">
        <SectionHeader
          title="Another Section"
          showAccent
          accentColor="accent"
        />
        
        {/* Your content */}
      </SectionWrapper>

      {/* Call-to-Action Section */}
      <SectionWrapper background="accent-light" id="cta">
        <div className="text-center">
          <SectionHeader
            title="Ready to Get Started?"
            centered
          />
          <Button variant="primary" size="lg">
            Take Action
          </Button>
        </div>
      </SectionWrapper>

    </PageLayout>
  );
}
```

---

## 🛠️ Advanced Usage

### Custom Section Padding

```jsx
// No vertical padding (for custom layouts)
<SectionWrapper noPadding>
  <div className="py-24">
    {/* Custom padding */}
  </div>
</SectionWrapper>
```

### Custom Background

```jsx
// Override with custom Tailwind classes
<SectionWrapper className="bg-gradient-to-br from-primary-100 to-accent-100">
  {/* Gradient background */}
</SectionWrapper>
```

### Nested Sections

```jsx
<SectionWrapper background="white">
  <SectionHeader title="Main Section" />
  
  <div className="mt-12 space-y-8">
    <div className="p-6 bg-surface-50 rounded-lg">
      {/* Subsection 1 */}
    </div>
    
    <div className="p-6 bg-surface-50 rounded-lg">
      {/* Subsection 2 */}
    </div>
  </div>
</SectionWrapper>
```

---

## 📊 Recommended Patterns

### 1. Alternating White/Default Pattern (Most Common)

```jsx
<SectionWrapper background="white">...</SectionWrapper>
<SectionWrapper background="default">...</SectionWrapper>
<SectionWrapper background="white">...</SectionWrapper>
<SectionWrapper background="default">...</SectionWrapper>
```

**Use for:** Most pages (Notices, Events, Resources, Contact)

---

### 2. Hero + Content Pattern

```jsx
<SectionWrapper background="primary-light" noPadding>
  <div className="py-16">
    {/* Hero content */}
  </div>
</SectionWrapper>

<SectionWrapper background="white">
  {/* Main content */}
</SectionWrapper>
```

**Use for:** Landing pages, About page, Gallery

---

### 3. Full-Width Hero Pattern

```jsx
<SectionWrapper background="primary-light" className="text-white">
  {/* Hero with gradient */}
</SectionWrapper>

<SectionWrapper background="white">
  {/* Content starts here */}
</SectionWrapper>
```

**Use for:** Home page, Events page

---

## ✅ Summary

| Component | Purpose | Import |
|-----------|---------|--------|
| **PageLayout** | Wraps all pages (Navbar + Footer) | `@components/layout` |
| **SectionWrapper** | Consistent spacing + backgrounds | `@components/layout` |
| **Navbar** | Config-driven sticky navigation | Auto-included in PageLayout |
| **Footer** | Config-driven footer | Auto-included in PageLayout |

**Single Source of Truth:**  
`src/config/navigation.js` — Edit nav links in ONE place

**One-Line Solution to Hide Nav Items:**  
Comment out the link in `navigation.js` → Updates everywhere automatically

---

**Built with ❤️ for students**
