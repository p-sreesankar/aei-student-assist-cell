import { PageLayout, SectionWrapper } from '@components/layout';
import { SectionHeader, Card, Button, Badge, EmptyState } from '@components/ui';
import { Bell, Calendar, FileText, Download } from 'lucide-react';

/**
 * LayoutExample — Demonstrates how to use layout components
 * 
 * This page shows:
 * - PageLayout wrapper
 * - SectionWrapper with different backgrounds
 * - Alternating section pattern
 * - All UI components working together
 * 
 * To view this page, add it to your router:
 *   { path: '/layout-example', element: <LayoutExample /> }
 */
export default function LayoutExample() {
  return (
    <PageLayout>
      
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  HERO SECTION — Primary Light Background                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="primary-light" id="hero">
        <div className="text-center max-w-4xl mx-auto">
          <SectionHeader
            title="Layout Component Example"
            subtitle="Using PageLayout, SectionWrapper, and UI components together"
            centered
            showAccent
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" icon={<Bell size={16} />}>
              Primary Action
            </Button>
            <Button variant="secondary">Secondary Action</Button>
          </div>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — White Background                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="white" id="cards">
        <SectionHeader
          title="Example Cards"
          subtitle="Card components with different configurations"
          showAccent
        />

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Notice Card */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-h4 font-heading font-semibold">
                  Important Notice
                </h3>
                <Badge variant="urgent">Urgent</Badge>
              </div>
            }
          >
            <p className="text-body text-text-secondary mb-4">
              Mid-semester exams scheduled for March 15-20, 2026.
              Check the notice board for detailed timetable.
            </p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" icon={<Download size={14} />}>
                Download PDF
              </Button>
            </div>
          </Card>

          {/* Event Card */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-h4 font-heading font-semibold">
                  Workshop
                </h3>
                <Badge variant="event">Event</Badge>
              </div>
            }
          >
            <p className="text-body text-text-secondary mb-4">
              Machine Learning Workshop on March 20, 2026.
              Register now to secure your spot!
            </p>
            <Button variant="secondary" size="sm" icon={<Calendar size={14} />}>
              Register
            </Button>
          </Card>

          {/* Resource Card */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-h4 font-heading font-semibold">
                  Lab Manual
                </h3>
                <Badge variant="academic">Academic</Badge>
              </div>
            }
          >
            <p className="text-body text-text-secondary mb-4">
              Digital Electronics Lab Manual (Semester 4)
              Updated for 2026 syllabus.
            </p>
            <Button variant="ghost" size="sm" icon={<FileText size={14} />}>
              View Resource
            </Button>
          </Card>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — Default (Warm Off-White) Background             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="default" id="content">
        <SectionHeader
          title="Alternating Backgrounds"
          subtitle="Use different background variants to create visual rhythm"
          showAccent
          accentColor="accent"
        />

        <div className="mt-8 prose prose-lg max-w-3xl">
          <p className="text-body text-text-secondary">
            This section uses the <code>background="default"</code> prop,
            which gives it a warm off-white background (<code>bg-surface-50</code>).
            This creates contrast with the white section above and gray section below.
          </p>
          <p className="text-body text-text-secondary mt-4">
            The <strong>SectionWrapper</strong> component automatically applies
            consistent max-width, padding, and responsive spacing across all sections.
            This ensures a cohesive layout without repetitive code.
          </p>
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — Gray Background                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="gray" id="empty-state">
        <SectionHeader
          title="Empty State Example"
          subtitle="Friendly feedback when content is missing"
          showAccent
        />

        <Card className="mt-8">
          <EmptyState
            icon="inbox"
            title="No items found"
            subtitle="This is what an empty section looks like. Clear, friendly, and non-alarming. 📬"
            action={
              <Button variant="primary" size="sm">
                Add New Item
              </Button>
            }
          />
        </Card>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — Accent Light Background                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="accent-light" id="cta">
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeader
            title="Ready to Explore?"
            subtitle="All layout components are config-driven, responsive, and accessible."
            centered
            showAccent
            accentColor="accent"
          />
          <div className="mt-8">
            <Button variant="primary" size="lg">
              View Full Documentation
            </Button>
          </div>
        </div>
      </SectionWrapper>

    </PageLayout>
  );
}
