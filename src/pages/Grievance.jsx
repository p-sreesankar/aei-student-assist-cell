import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Lock, Clock, MessageSquare } from 'lucide-react';
import SEO from '@components/SEO';
import { SITE_CONFIG } from '@data/site-config';
import { SectionWrapper } from '@components/layout';
import { Card, PageBanner, Button } from '@components/ui';

// ══════════════════════════════════════════════════════════════════════════════
//  GRIEVANCE PAGE — mobile-first, responsive
// ══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const steps = [
  { icon: MessageSquare, text: 'Fill out the form below — your identity is kept confidential.' },
  { icon: ShieldCheck,   text: 'The Applied Association coordinator will review your submission.' },
  { icon: Clock,         text: "You'll receive a response via the email you provide (if given)." },
  { icon: Lock,          text: 'For urgent matters, contact us directly via the Contact page.' },
];

export default function Grievance() {
  return (
    <>      <SEO title="Grievance Portal" description="Submit your concerns anonymously through the Applied Association grievance form. Confidential and secure." />      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Grievance Form"
        subtitle="We're here to listen. Submit your concern — it's confidential."
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Grievance', path: '/grievance' },
        ]}
        gradientFrom="from-[#4C1D30]"
        gradientTo="to-bg"
      />

      <SectionWrapper background="default">
        <div className="max-w-3xl mx-auto">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/*  HOW IT WORKS — info box                                   */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="mb-6 sm:mb-8">
              <p className="font-heading font-semibold text-body text-text-primary mb-3">
                How it works
              </p>
              <ul className="space-y-3">
                {steps.map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                      <Icon size={16} />
                    </span>
                    <span className="text-body-sm text-text-secondary leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/*  "OPEN IN NEW TAB" CTA — primary on very small screens     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 sm:mb-6 flex sm:justify-end"
          >
            <a
              href={SITE_CONFIG.grievanceFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="md"
                icon={<ExternalLink size={16} />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Open form in new tab
              </Button>
            </a>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/*  EMBEDDED GOOGLE FORM                                      */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="rounded-lg overflow-hidden shadow-card bg-surface">
              <iframe
                src={SITE_CONFIG.grievanceFormUrl}
                title="Grievance Submission Form"
                width="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                className="w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px]"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
