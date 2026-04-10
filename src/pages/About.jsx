import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Zap, Users, ShieldCheck,
  Megaphone, CalendarDays, FolderDown, MessageSquareWarning,
  Mail, Phone, Milestone,
} from 'lucide-react';
import SEO from '@components/SEO';
import { ABOUT } from '@data/about';
import { SITE_CONFIG } from '@data/site-config';
import { SectionWrapper } from '@components/layout';
import { Card, PageBanner, SectionHeader } from '@components/ui';
import { getContacts, subscribeContentUpdates } from '@lib/repositories/contentRepository';

// ══════════════════════════════════════════════════════════════════════════════
//  STATIC DATA
// ══════════════════════════════════════════════════════════════════════════════

const VALUES = [
  {
    title: 'Accessible',
    description: 'Everything you need — notices, resources, forms — in one place, available 24/7.',
    icon: Zap,
    color: 'bg-primary-soft text-primary',
  },
  {
    title: 'Responsive',
    description: 'Grievances addressed promptly. Questions answered. No student left waiting.',
    icon: ShieldCheck,
    color: 'bg-primary-soft text-primary',
  },
  {
    title: 'Student-First',
    description: "Built by students, for students. Your voice matters, and we make sure it's heard.",
    icon: Heart,
    color: 'bg-primary-soft text-primary',
  },
];

const FEATURES = [
  {
    title: 'Handle Grievances',
    description: 'Anonymous or named — submit concerns through our grievance form and get a resolution.',
    icon: MessageSquareWarning,
    color: 'bg-[rgba(239,68,68,0.12)] text-red-400',
  },
  {
    title: 'Share Important Notices',
    description: 'Exam schedules, deadlines, department circulars — always up-to-date and pinned for visibility.',
    icon: Megaphone,
    color: 'bg-primary-soft text-primary',
  },
  {
    title: 'Organize Events',
    description: 'Workshops, tech fests, alumni talks — we plan, promote, and coordinate department events.',
    icon: CalendarDays,
    color: 'bg-primary-soft text-primary',
  },
  {
    title: 'Provide Resources',
    description: 'Lab manuals, syllabus PDFs, application forms — everything downloadable from one portal.',
    icon: FolderDown,
    color: 'bg-primary-soft text-primary',
  },
];

// Role display order + labels
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

// ── Animations ──────────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  INITIALS AVATAR
// ══════════════════════════════════════════════════════════════════════════════

function getInitials(name) {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Pretty pastel palette keyed by first char
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

// ══════════════════════════════════════════════════════════════════════════════
//  COORDINATOR CARD
// ══════════════════════════════════════════════════════════════════════════════

function CoordinatorCard({ person }) {
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

      {/* Name */}
      <h4 className="font-heading font-bold text-body text-text-primary mt-4 leading-snug">
        {person.name}
      </h4>

      {/* Designation */}
      <p className="text-body-sm text-text-secondary mt-1 leading-relaxed">
        {person.designation}
      </p>

      {/* Role badge */}
      <span className={`mt-3 px-3 py-0.5 rounded-full text-caption font-semibold ${roleColor}`}>
        {roleLabel}
      </span>

      {/* Contact links */}
      <div className="flex items-center gap-3 mt-4">
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="
              p-2 rounded-full bg-surface2
              text-text-muted hover:text-primary
              hover:bg-primary-soft transition-colors
            "
            aria-label={`Email ${person.name}`}
            title={person.email}
          >
            <Mail size={16} />
          </a>
        )}
        {person.phone && (
          <a
            href={`tel:${person.phone}`}
            className="
              p-2 rounded-full bg-surface2
              text-text-muted hover:text-primary
              hover:bg-primary-soft transition-colors
            "
            aria-label={`Call ${person.name}`}
            title={person.phone}
          >
            <Phone size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  TIMELINE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

function Timeline({ milestones }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Vertical line */}
      <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-dim via-primary to-accent rounded-full" />

      <div className="space-y-8">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
            className="relative"
          >
            {/* Dot */}
            <div className="absolute -left-8 sm:-left-10 top-1 w-6 h-6 rounded-full bg-surface border-[3px] border-primary shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-soft text-primary text-caption font-bold mb-1">
                {m.year}
              </span>
              <h4 className="font-heading font-bold text-body text-text-primary leading-snug">
                {m.title}
              </h4>
              <p className="text-body-sm text-text-secondary mt-1 leading-relaxed">
                {m.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ABOUT PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function About() {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadContacts() {
      const items = await getContacts();
      if (mounted) {
        setFacultyList(items);
      }
    }

    loadContacts();
    const unsubscribe = subscribeContentUpdates(() => {
      loadContacts();
    }, ['contacts']);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Sort faculty by role precedence
  const sortedFaculty = useMemo(
    () =>
      [...facultyList].sort(
        (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role),
      ),
    [facultyList],
  );

  return (
    <>      <SEO title="About" description="Learn about the Applied Association — mission, vision, team, and what we do for AEI students at CET." />      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="About the Cell"
        subtitle="Who we are and what drives us ✨"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
        ]}
        gradientFrom="from-primary-muted"
        gradientTo="to-bg"
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  1. MISSION SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="default">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading font-bold text-h3 text-text-primary mb-2">
            {ABOUT.heading}
          </h2>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          {ABOUT.paragraphs.map((para, i) => (
            <p key={i} className="text-body text-text-secondary leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        {/* Optional team photo */}
        {ABOUT.teamPhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-elevated mb-12"
          >
            <img
              src={ABOUT.teamPhotoUrl}
              alt="Applied Association Team"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* ── Value cards ────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-3 gap-5"
        >
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="
                  flex flex-col items-center text-center
                  p-6 rounded-2xl bg-surface
                  border border-border
                  shadow-card hover:shadow-card-hover
                  transition-[box-shadow,border-color] duration-300
                "
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${v.color} mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-heading font-bold text-body text-text-primary mb-1">
                  {v.title}
                </h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  2. WHAT WE DO                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <SectionWrapper background="white">
        <SectionHeader
          title="What We Do"
          subtitle="The four pillars of the Applied Association"
          number={2}
          sticker="✨"
          centered
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 gap-5 mt-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="
                  flex gap-4 p-5 rounded-xl bg-surface
                  border border-border
                  shadow-card hover:shadow-card-hover
                  hover:-translate-y-0.5
                  transition-[box-shadow,border-color,translate] duration-300
                "
              >
                <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${f.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-body text-text-primary mb-1">
                    {f.title}
                  </h4>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  3. COORDINATORS                                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {sortedFaculty.length > 0 && (
        <SectionWrapper background="default">
          <SectionHeader
            title="Meet the Team"
            subtitle="The people behind the Applied Association 👋"
            number={3}
            sticker="👥"
            centered
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
          >
            {sortedFaculty.map((person) => (
              <CoordinatorCard key={person.id} person={person} />
            ))}
          </motion.div>
        </SectionWrapper>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  4. TIMELINE — "Our Journey"                                  */}
      {/*  To HIDE this section: set ABOUT.milestones to []             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {ABOUT.milestones && ABOUT.milestones.length > 0 && (
        <SectionWrapper background="white">
          <SectionHeader
            title="Our Journey"
            subtitle="Key milestones in the life of the cell"
            number={4}
            sticker="🎯"
            centered
          />
          <div className="max-w-2xl mx-auto mt-8">
            <Timeline milestones={ABOUT.milestones} />
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
