import { ArrowRight, Download, Heart, Star } from 'lucide-react';
import { Button, Card, Badge, SectionHeader, EmptyState, PageBanner } from '@components/ui';

/**
 * ComponentShowcase — Demo page for all UI components
 * 
 * This page demonstrates all available UI components from the design system.
 * Use this as a reference for implementation across the application.
 * 
 * To view this page, add it to your router:
 *   { path: '/showcase', element: <ComponentShowcase /> }
 */
export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Page Banner */}
      <PageBanner
        title="UI Component Library"
        subtitle="Warm, friendly, accessible components for Student Assist Cell"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Showcase', path: '/showcase' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* ════════════════════════════════════════════════════════════ */}
        {/*  BUTTONS                                                     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Buttons"
            subtitle="Interactive elements with multiple variants and states"
            showAccent
          />

          <div className="mt-8 space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-4">
                Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-4">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-4">
                With Icons
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={<Download size={16} />}>
                  Download
                </Button>
                <Button 
                  variant="secondary" 
                  icon={<ArrowRight size={16} />} 
                  iconPosition="right"
                >
                  Learn More
                </Button>
                <Button variant="ghost" icon={<Heart size={16} />}>
                  Favorite
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-4">
                States
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" loading>
                  Loading...
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  CARDS                                                       */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Cards"
            subtitle="Containers for content with optional headers and hover effects"
            showAccent
          />

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Basic Card */}
            <Card>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-2">
                Basic Card
              </h3>
              <p className="text-body text-text-secondary">
                A simple card with padding, rounded corners, and a subtle shadow.
                Perfect for grouping related content.
              </p>
            </Card>

            {/* Card with Header */}
            <Card
              header={
                <h3 className="text-h4 font-heading font-semibold text-text-primary">
                  Card with Header
                </h3>
              }
            >
              <p className="text-body text-text-secondary">
                The header section is visually separated with a border and
                background tint for clear hierarchy.
              </p>
            </Card>

            {/* Clickable Card */}
            <Card
              clickable
              onClick={() => alert('Card clicked!')}
            >
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-2">
                Clickable Card
              </h3>
              <p className="text-body text-text-secondary mb-4">
                Hover over this card to see the lift effect. Click to interact.
              </p>
              <Badge variant="primary">Interactive</Badge>
            </Card>

            {/* Card with Content */}
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-heading font-semibold text-text-primary">
                    Notice
                  </h3>
                  <Badge variant="urgent">Urgent</Badge>
                </div>
              }
            >
              <p className="text-body text-text-secondary mb-4">
                Mid-semester exams will be held from March 15-20, 2026.
                Please check the notice board for detailed schedule.
              </p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">View Details</Button>
                <Button variant="ghost" size="sm">Dismiss</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  BADGES                                                      */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Badges"
            subtitle="Small labels for categories, statuses, and tags"
            showAccent
          />

          <div className="mt-8 space-y-6">
            {/* Notice Categories */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-3">
                Notice Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="general">General</Badge>
                <Badge variant="academic">Academic</Badge>
                <Badge variant="urgent">Urgent</Badge>
                <Badge variant="event">Event</Badge>
              </div>
            </div>

            {/* Semantic Badges */}
            <div>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-3">
                Semantic Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION HEADERS                                             */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Section Headers"
            subtitle="Consistent page section titles with optional decorative elements"
            showAccent
          />

          <div className="mt-8 space-y-12">
            {/* Left-aligned with accent bar */}
            <div className="p-6 bg-surface2 rounded-lg">
              <SectionHeader
                title="Latest Notices"
                subtitle="Stay updated with important announcements"
                showAccent
                accentColor="primary"
              />
            </div>

            {/* Centered with accent dot */}
            <div className="p-6 bg-surface2 rounded-lg">
              <SectionHeader
                title="About Our Mission"
                subtitle="Empowering students through accessible resources and support"
                showAccent
                accentColor="accent"
                centered
              />
            </div>

            {/* Simple header without accent */}
            <div className="p-6 bg-surface2 rounded-lg">
              <SectionHeader
                title="Resources"
                subtitle="Download syllabi, lab manuals, and forms"
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  EMPTY STATES                                                */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Empty States"
            subtitle="Friendly feedback when sections have no content"
            showAccent
          />

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Generic empty state */}
            <Card>
              <EmptyState
                icon="inbox"
                title="No notices yet"
                subtitle="Check back soon for updates! 📬"
              />
            </Card>

            {/* Empty events */}
            <Card>
              <EmptyState
                icon="calendar"
                title="No upcoming events"
                subtitle="All events have passed. New ones will be posted soon!"
              />
            </Card>

            {/* Empty gallery */}
            <Card>
              <EmptyState
                icon="image"
                title="No photos yet"
                subtitle="Event photos will appear here 📸"
              />
            </Card>

            {/* With action button */}
            <Card>
              <EmptyState
                icon="file"
                title="No resources found"
                subtitle="Try adjusting your filters or check back later."
                action={
                  <Button variant="secondary" size="sm">
                    Clear Filters
                  </Button>
                }
              />
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  PAGE BANNERS                                                */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Page Banners"
            subtitle="Hero sections for inner pages with breadcrumbs"
            showAccent
          />

          <div className="mt-8 space-y-6">
            {/* Primary gradient */}
            <PageBanner
              title="Notice Board"
              subtitle="Stay updated with the latest announcements"
              breadcrumb={[
                { label: 'Home', path: '/' },
                { label: 'Notices', path: '/notices' }
              ]}
            />

            {/* Accent gradient */}
            <PageBanner
              title="Events Calendar"
              subtitle="Workshops, seminars, and student activities"
              gradientFrom="from-accent"
              gradientTo="to-accent-hover"
              breadcrumb={[
                { label: 'Home', path: '/' },
                { label: 'Events', path: '/events' }
              ]}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  COMBINED EXAMPLE                                            */}
        {/* ════════════════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            title="Combined Example"
            subtitle="All components working together in a realistic scenario"
            showAccent
            accentColor="accent"
          />

          <div className="mt-8">
            <Card
              header={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-h4 font-heading font-semibold text-text-primary">
                      Workshop: Introduction to Machine Learning
                    </h3>
                    <Badge variant="event">Event</Badge>
                  </div>
                  <Badge variant="success">Upcoming</Badge>
                </div>
              }
            >
              <div className="space-y-4">
                <p className="text-body text-text-secondary">
                  Join us for an interactive workshop on Machine Learning fundamentals.
                  Learn about supervised learning, neural networks, and real-world applications.
                </p>

                <div className="flex flex-wrap gap-4 text-body-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-accent" />
                    <span>March 20, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-accent" />
                    <span>10:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-accent" />
                    <span>Seminar Hall A</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                    Register Now
                  </Button>
                  <Button variant="secondary">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
