# UI Component Library

> Warm, friendly, accessible React components for Student Assist Cell

---

## 📦 Components

### 1. **Button** 
Versatile button component with multiple variants, sizes, and states.

**Variants:**
- `primary` — Main call-to-action (purple background)
- `secondary` — Secondary action (white with purple border)
- `ghost` — Subtle action (transparent background)
- `outline` — Neutral action (gray border)

**Sizes:** `sm` | `md` (default) | `lg`

**Features:**
- Icon support (left or right position)
- Loading state with spinner
- Disabled state
- Keyboard accessible (focus ring)

```jsx
import { Button } from '@components/ui';
import { Download, ArrowRight } from 'lucide-react';

// Primary button
<Button variant="primary">Get Started</Button>

// With icon
<Button variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right">
  Learn More
</Button>

// Loading state
<Button variant="primary" loading disabled>
  Submitting...
</Button>
```

---

### 2. **Card**
Container for grouping related content with optional header.

**Features:**
- Rounded corners (`rounded-lg`)
- Subtle shadow with hover effect
- Optional header section (separated with border)
- Clickable variant with lift animation

```jsx
import { Card } from '@components/ui';

// Basic card
<Card>
  <p>Your content here</p>
</Card>

// With header
<Card
  header={
    <h3 className="text-h4 font-heading">Card Title</h3>
  }
>
  <p>Card body content</p>
</Card>

// Clickable card
<Card clickable onClick={() => console.log('clicked')}>
  Interactive content
</Card>
```

---

### 3. **Badge**
Small labels for categories, statuses, and tags.

**Variants:**

**Notice Categories:**
- `general` — Gray
- `academic` — Purple
- `urgent` — Red
- `event` — Amber

**Semantic:**
- `primary` — Purple
- `success` — Green
- `warning` — Amber
- `error` — Red
- `info` — Blue
- `muted` — Gray

```jsx
import { Badge } from '@components/ui';

<Badge variant="academic">Academic</Badge>
<Badge variant="urgent">Urgent</Badge>
<Badge variant="success">Completed</Badge>
```

---

### 4. **SectionHeader**
Consistent page section titles with optional decorative elements.

**Features:**
- Title + optional subtitle
- Optional accent bar (left-aligned) or dot (centered)
- Customizable accent color
- Centered variant for hero sections

```jsx
import { SectionHeader } from '@components/ui';

// Left-aligned with accent bar
<SectionHeader
  title="Latest Notices"
  subtitle="Stay updated with announcements"
  showAccent
  accentColor="primary"
/>

// Centered with accent dot
<SectionHeader
  title="About Us"
  subtitle="Our mission and vision"
  showAccent
  centered
/>
```

---

### 5. **EmptyState**
Friendly feedback for empty sections.

**Predefined Icons:** `inbox` | `calendar` | `image` | `file` | `question`

**Features:**
- Large icon (customizable)
- Title + subtitle with friendly copy
- Optional action button
- Centered layout

```jsx
import { EmptyState } from '@components/ui';
import { Button } from '@components/ui';

// Generic empty state
<EmptyState
  icon="inbox"
  title="No notices yet"
  subtitle="Check back soon for updates! 📬"
/>

// With action button
<EmptyState
  icon="calendar"
  title="No upcoming events"
  subtitle="All events have passed."
  action={
    <Button variant="secondary" size="sm">
      View Past Events
    </Button>
  }
/>
```

---

### 6. **PageBanner**
Hero banner for inner pages with breadcrumbs.

**Features:**
- Gradient background (customizable colors)
- Page title + subtitle
- Breadcrumb navigation
- Decorative blur elements

```jsx
import { PageBanner } from '@components/ui';

<PageBanner
  title="Notice Board"
  subtitle="Stay updated with the latest announcements"
  breadcrumb={[
    { label: 'Home', path: '/' },
    { label: 'Notices', path: '/notices' }
  ]}
/>

// Custom gradient
<PageBanner
  title="Events"
  subtitle="Workshops and activities"
  gradientFrom="from-accent-500"
  gradientTo="to-accent-700"
/>
```

---

## 🎨 Design Tokens

All components use design tokens from `tailwind.config.js`:

**Colors:**
- `primary-*` — Warm indigo (purple)
- `accent-*` — Warm amber (orange)
- `surface-*` — Warm neutrals (backgrounds, borders)
- `text-*` — Warm grays (text hierarchy)

**Typography:**
- `font-heading` — Plus Jakarta Sans
- `font-body` — DM Sans
- `text-h1`, `text-h2`, `text-h3`, `text-h4` — Heading sizes
- `text-body-lg`, `text-body`, `text-body-sm`, `text-caption` — Body sizes

**Spacing:** Base-4 system (`4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `96`, `128px`)

**Shadows:**
- `shadow-card` — Default card shadow
- `shadow-card-hover` — Hover lift effect
- `shadow-elevated` — Modal/overlay shadow
- `shadow-focus` — Keyboard focus ring

---

## 📖 Usage

### Import Components

```jsx
// Named imports (recommended)
import { Button, Card, Badge } from '@components/ui';

// Individual imports
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
```

### Component Showcase

View all components in action:

1. Add `ComponentShowcase` to your router:
   ```jsx
   import ComponentShowcase from '@pages/ComponentShowcase';
   
   // In App.jsx
   <Route path="/showcase" element={<ComponentShowcase />} />
   ```

2. Visit `/showcase` in your browser to see:
   - All component variants
   - Size options
   - States (loading, disabled, hover)
   - Realistic examples

---

## ♿ Accessibility

All components follow accessibility best practices:

✅ **Keyboard Navigation:** Focus rings, Enter/Space key support  
✅ **ARIA Labels:** Proper labeling for screen readers  
✅ **Color Contrast:** WCAG AA compliant (4.5:1 for body text)  
✅ **Semantic HTML:** Proper heading hierarchy, button types  

---

## 🎯 Common Patterns

### Primary CTA Button
```jsx
<Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
  Get Started
</Button>
```

### Notice Card
```jsx
<Card
  header={
    <div className="flex items-center justify-between">
      <h3 className="text-h4 font-heading">Notice Title</h3>
      <Badge variant="urgent">Urgent</Badge>
    </div>
  }
>
  <p className="text-body text-text-secondary mb-4">
    Notice content goes here...
  </p>
  <Button variant="primary" size="sm">View Details</Button>
</Card>
```

### Section with Empty State
```jsx
{notices.length === 0 ? (
  <EmptyState
    icon="inbox"
    title="No notices yet"
    subtitle="Check back soon for updates! 📬"
  />
) : (
  notices.map(notice => <NoticeCard key={notice.id} {...notice} />)
)}
```

---

## 🚀 Extending Components

### Custom Button Variant

```jsx
<Button
  variant="primary"
  className="bg-gradient-to-r from-primary-500 to-accent-500"
>
  Gradient Button
</Button>
```

### Custom Card Style

```jsx
<Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200">
  Special content
</Card>
```

---

## 📝 Notes

- All components accept `className` prop for customization
- Buttons automatically handle loading/disabled states
- Cards use `shadow-card-hover` for hover lift effect
- Empty states use Lucide React icons
- Page banners include decorative blur elements for depth

---

**Built with ❤️ for students**
