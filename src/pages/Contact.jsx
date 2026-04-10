import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Building2,
  MessageCircle, Send,
} from 'lucide-react';
import SEO from '@components/SEO';
import { FACULTY } from '@data/faculty';
import { SITE_CONFIG } from '@data/site-config';
import { SectionWrapper } from '@components/layout';
import { Card, EmptyState, PageBanner, SectionHeader } from '@components/ui';

// ══════════════════════════════════════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════════════════════════════════════

const ROLE_ORDER = ['coordinator', 'advisor', 'faculty', 'student-rep'];
const ROLE_LABELS = {
  coordinator:  'Coordinator',
  advisor:      'Advisor',
  faculty:      'Faculty',
  'student-rep': 'Student Rep',
};
const ROLE_COLORS = {
  coordinator:  'bg-primary-soft text-primary',
  advisor:      'bg-[rgba(245,158,11,0.12)] text-accent',
  faculty:      'bg-[rgba(16,185,129,0.12)] text-emerald-400',
  'student-rep': 'bg-[rgba(14,165,233,0.12)] text-sky-400',
};

// Pastel gradients for initials avatars
const AVATAR_COLORS = [
  'from-sky-500 to-sky-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-sky-400 to-blue-600',
  'from-violet-500 to-purple-600',
];

function avatarGradient(name) {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function getInitials(name) {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ── Animations ──────────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  CONTACT CARD — one per person
// ══════════════════════════════════════════════════════════════════════════════

function ContactCard({ person }) {
  const initials = getInitials(person.name);
  const gradient = avatarGradient(person.name);
  const roleColor = ROLE_COLORS[person.role] ?? 'bg-surface2 text-text-muted';
  const roleLabel = ROLE_LABELS[person.role] ?? person.role;

  return (
    <motion.div
      variants={fadeUp}
      className="
        group flex flex-col items-center text-center
        p-6 rounded-2xl bg-surface
        border border-border
        shadow-card hover:shadow-card-hover
        hover:-translate-y-0.5
        transition-[box-shadow,border-color,translate] duration-300
      "
    >
      {/* Avatar */}
      {person.photoUrl ? (
        <img
          src={person.photoUrl}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover shadow-card ring-3 ring-surface2"
        />
      ) : (
        <div
          className={`
            w-20 h-20 rounded-full
            bg-gradient-to-br ${gradient}
            flex items-center justify-center
            shadow-card ring-3 ring-surface2
          `}
        >
          <span className="text-white font-heading font-bold text-h4 select-none">
            {initials}
          </span>
        </div>
      )}

      {/* Name + designation */}
      <h4 className="font-heading font-bold text-body text-text-primary mt-4 leading-snug">
        {person.name}
      </h4>
      <p className="text-body-sm text-text-secondary mt-1 leading-relaxed">
        {person.designation}
      </p>

      {/* Role badge */}
      <span className={`mt-3 px-3 py-0.5 rounded-full text-caption font-semibold ${roleColor}`}>
        {roleLabel}
      </span>

      {/* Contact links */}
      <div className="flex flex-col items-center gap-2 mt-4 w-full">
        <a
          href={`mailto:${person.email}`}
          className="
            inline-flex items-center gap-2
            text-body-sm text-primary hover:text-primary-bright
            transition-colors group/link
          "
        >
          <Mail size={14} />
          <span className="underline decoration-primary-dim group-hover/link:decoration-primary-bright transition-colors">
            {person.email}
          </span>
        </a>
        {person.phone && (
          <a
            href={`tel:${person.phone}`}
            className="
              inline-flex items-center gap-2
              text-body-sm text-text-muted hover:text-primary
              transition-colors
            "
          >
            <Phone size={14} />
            {person.phone}
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  CONTACT PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function Contact() {
  const contact = SITE_CONFIG.contact ?? {};

  const sortedFaculty = useMemo(
    () =>
      [...FACULTY].sort(
        (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role),
      ),
    [],
  );

  const officeDetails = [
    { icon: Building2, label: 'Office', value: contact.officeRoom },
    { icon: Clock,     label: 'Hours',  value: contact.officeHours },
    { icon: Phone,     label: 'Phone',  value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : null },
    { icon: MapPin,    label: 'Address', value: contact.address },
  ].filter((d) => d.value);

  return (
    <>      <SEO title="Contact" description="Get in touch with the AEI Student Assist Cell — office hours, email, phone, and location." />      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Contact Us"
        subtitle="We're here to help — reach out anytime 👋"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Contact', path: '/contact' },
        ]}
        gradientFrom="from-primary-muted"
        gradientTo="to-bg"
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  1. CONTACT CARDS                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="default">
        <SectionHeader
          title="Meet the Team"
          subtitle="The people you can reach out to"
          number={1}
          sticker="👋"
          centered
        />

        {sortedFaculty.length === 0 ? (
          <Card>
            <EmptyState
              icon="inbox"
              title="Contacts coming soon"
              subtitle="Our team details will be listed here shortly."
            />
          </Card>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
          >
            {sortedFaculty.map((person) => (
              <ContactCard key={person.id ?? person.name} person={person} />
            ))}
          </motion.div>
        )}
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  2. GENERAL OFFICE INFO + REACH US                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="white">
        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Office details card ────────────────────────────────── */}
          {officeDetails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="
                p-6 rounded-2xl bg-surface
                border border-border shadow-card
              "
            >
              <h3 className="font-heading font-bold text-h4 text-text-primary mb-5">
                Department Office
              </h3>

              <div className="space-y-4">
                {officeDetails.map((d) => {
                  const Icon = d.icon;
                  const Wrapper = d.href ? 'a' : 'div';
                  const wrapperProps = d.href
                    ? { href: d.href, className: 'hover:text-primary transition-colors' }
                    : {};
                  return (
                    <Wrapper key={d.label} {...wrapperProps} className={`flex gap-3 ${d.href ? 'hover:text-primary transition-colors' : ''}`}>
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-caption text-text-muted font-semibold uppercase tracking-wide">
                          {d.label}
                        </p>
                        <p className="text-body-sm text-text-primary leading-relaxed">
                          {d.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Reach Us CTA card ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="
              flex flex-col justify-center items-center text-center
              p-8 rounded-2xl
              bg-gradient-to-br from-primary-muted to-surface3
              border border-border shadow-card
            "
          >
            <div className="w-14 h-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-5">
              <Send size={24} />
            </div>

            <h3 className="font-heading font-bold text-h4 text-text-primary mb-2">
              Get in Touch
            </h3>
            <p className="text-body-sm text-text-secondary mb-6 max-w-xs">
              Have a question or need help? Reach out through the available channels.
            </p>

            {/* Primary email CTA temporarily disabled */}
            {/*
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-full
                  bg-primary text-text-primary
                  font-heading font-semibold text-body-sm
                  shadow-card hover:shadow-card-hover
                  hover:bg-primary-dim
                  transition-[box-shadow,background-color] duration-200
                "
              >
                <Mail size={16} />
                Send an Email
                <ArrowRight size={14} />
              </a>
            )}
            */}

            {/* Optional WhatsApp link */}
            {contact.whatsapp && (
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 mt-3
                  px-5 py-2.5 rounded-full
                  bg-emerald-500 text-white
                  font-heading font-semibold text-body-sm
                  shadow-card hover:shadow-card-hover
                  hover:bg-emerald-600
                  transition-all duration-200
                "
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            )}

            <p className="text-caption text-text-muted mt-5">
              We typically respond within 24 hours ✨
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  3. MAP EMBED (optional)                                      */}
      {/*  To HIDE: set mapEmbedUrl to "" in site-config.js             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {SITE_CONFIG.mapEmbedUrl && (
        <SectionWrapper background="default">
          <SectionHeader
            title="Find Us"
            subtitle="AEI Department, College of Engineering Trivandrum"
            number={2}
            sticker="📍"
            centered
          />
          <div className="mt-6 rounded-2xl overflow-hidden shadow-card border border-border">
            <iframe
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Department location on Google Maps"
              className="w-full"
            />
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
