import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ExternalLink, Instagram } from 'lucide-react';
import SEO from '@components/SEO';
import { EVENTS } from '@data/events';
import { SectionWrapper } from '@components/layout';
import { Badge, Card, EmptyState, PageBanner, Button } from '@components/ui';
import { formatDate, isUpcoming, isSoon } from '@utils/date';

// ══════════════════════════════════════════════════════════════════════════════
//  DATA CONTRACT — for future maintainers
// ══════════════════════════════════════════════════════════════════════════════
//
//  Each object in src/data/events.js must match:
//
//  {
//    id:              string,          // unique slug, e.g. "techfest-aei-2026"
//    title:           string,          // event heading
//    date:            string,          // "YYYY-MM-DD" — start date (drives sort & upcoming/past)
//    endDate:         string | null,   // end date for multi-day events, or null
//    venue:           string,          // location
//    description:     string,          // 1–3 sentence body
//    image:           string | null,   // poster URL, or null → shows gradient placeholder
//    category:        string,          // "workshop" | "fest" | "seminar" | "competition" | "cultural" | "general"
//    time:            string | null,   // human-readable time range
//    registrationUrl: string | null,   // form link for upcoming events
//    instagramUrl:    string | null,   // Instagram post/reel link
//  }
//
//  Upcoming vs Past is auto-derived: event.date >= today → upcoming.
//  No manual status field needed.
//
// ══════════════════════════════════════════════════════════════════════════════

// ── Category → Badge variant map ─────────────────────────────────────────────
const CATEGORY_BADGE_MAP = {
  workshop:    'academic',
  fest:        'primary',
  seminar:     'info',
  competition: 'warning',
  cultural:    'event',
  general:     'general',
};

// ── Gradient palettes for image placeholders ─────────────────────────────────
const GRADIENTS = [
  'from-sky-600 to-sky-700',
  'from-amber-500 to-amber-600',
  'from-purple-500 to-purple-600',
  'from-rose-400 to-rose-500',
  'from-teal-500 to-teal-600',
  'from-blue-500 to-blue-600',
];

function gradientFor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

// ── Tabs config ──────────────────────────────────────────────────────────────
const TABS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past',     label: 'Past' },
];

// ── Animation variants ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  HELPER — days until event
// ══════════════════════════════════════════════════════════════════════════════

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  return Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
}

// ══════════════════════════════════════════════════════════════════════════════
//  CALENDAR TEAR-OFF — visual centerpiece
// ══════════════════════════════════════════════════════════════════════════════

function CalendarTearOff({ dateStr, isPast = false }) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const weekday = d.toLocaleString('default', { weekday: 'short' }).toUpperCase();

  return (
    <div
      className={`
        relative flex-shrink-0
        w-14 h-16 sm:w-[4.5rem] sm:h-[5.25rem]
        rounded-lg sm:rounded-xl overflow-hidden
        shadow-card
        ${isPast ? 'opacity-60 grayscale' : ''}
      `}
    >
      {/* Top bar — month + weekday */}
      <div className="bg-primary text-text-primary text-center py-0.5 sm:py-1">
        <span className="text-[0.5rem] sm:text-[0.6rem] font-heading font-bold tracking-widest">
          {weekday} · {month}
        </span>
      </div>

      {/* Bottom — big day number */}
      <div className="bg-surface flex items-center justify-center flex-1 h-[2.5rem] sm:h-[3.2rem]">
        <span
          className={`
            font-heading font-extrabold leading-none
            ${day >= 10 ? 'text-xl sm:text-[1.75rem]' : 'text-2xl sm:text-[2rem]'}
            text-text-primary
          `}
        >
          {day}
        </span>
      </div>

      {/* Subtle fold shadow */}
      <div className="absolute top-[1.1rem] sm:top-[1.55rem] right-0 w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-br from-primary-dim/20 to-transparent rounded-bl-lg" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  EVENT CARD
// ══════════════════════════════════════════════════════════════════════════════

function EventCard({ event, isPast = false }) {
  const days = daysUntil(event.date);
  const showCountdown = !isPast && days >= 0 && days <= 7;
  const gradient = gradientFor(event.id);
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(event.image) && !imageError;

  return (
    <Card className={`overflow-hidden flex flex-col ${isPast ? 'opacity-75' : ''}`}>
      {/* ── Image / Placeholder ──────────────────────────────────────── */}
      {showImage ? (
        <div className="h-36 sm:h-44 bg-surface2 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={`
            h-36 sm:h-44 bg-gradient-to-br ${gradient}
            flex items-center justify-center
          `}
        >
          <span className="text-6xl font-heading font-extrabold text-white/20 select-none">
            {event.title.charAt(0)}
          </span>
        </div>
      )}

      {/* ── Card Body ────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Row: Calendar + Content */}
        <div className="flex gap-3 sm:gap-4">
          {/* Calendar tear-off */}
          <CalendarTearOff dateStr={event.date} isPast={isPast} />

          {/* Text block */}
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <Badge variant={CATEGORY_BADGE_MAP[event.category] || 'general'}>
                {event.category}
              </Badge>

              {showCountdown && (
                <Badge variant="success">
                  {days === 0 ? 'Today!' : days === 1 ? 'Tomorrow!' : `${days} days left`}
                </Badge>
              )}

              {!isPast && isSoon(event.date) && (
                <Badge variant="soon">Soon</Badge>
              )}

              {isPast && (
                <Badge variant="muted">Completed</Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-h4 font-heading font-semibold text-text-primary leading-snug line-clamp-2 mb-1">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Meta: time + venue */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-body-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="flex-shrink-0" />
            {formatDate(event.date)}
            {event.endDate && ` – ${formatDate(event.endDate)}`}
            {event.time && ` · ${event.time}`}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="flex-shrink-0" />
            {event.venue}
          </span>
        </div>

        {/* Description */}
        <p className="text-body-sm text-text-secondary leading-relaxed mt-3 flex-1 line-clamp-3">
          {event.description}
        </p>

        {/* CTA — only for upcoming events */}
        {!isPast && (event.registrationUrl || event.instagramUrl) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" icon={<ExternalLink size={14} />} iconPosition="right">
                  Register
                </Button>
              </a>
            )}

            {event.instagramUrl && (
              <a
                href={event.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" icon={<Instagram size={14} />}>
                  Instagram
                </Button>
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  EVENTS PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function Events() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // ── Derived filtered lists ─────────────────────────────────────────────
  const { upcoming, past } = useMemo(() => {
    const up = EVENTS
      .filter((e) => isUpcoming(e.date))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const pa = EVENTS
      .filter((e) => !isUpcoming(e.date))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return { upcoming: up, past: pa };
  }, []);

  const activeList = activeTab === 'upcoming' ? upcoming : past;

  const handleTabClick = useCallback((key) => setActiveTab(key), []);

  return (
    <>      <SEO title="Events" description="Upcoming and past events — workshops, seminars, fests and more from the AEI department." />      {/* ═════════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Events"
        subtitle="Workshops, fests, talks & everything in between"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Events', path: '/events' },
        ]}
        gradientFrom="from-primary-muted"
        gradientTo="to-bg"
      />

      <SectionWrapper background="default">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  TABS                                                         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="flex gap-2 mb-6 sm:mb-8 p-1 bg-surface2 rounded-full w-fit mx-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = tab.key === 'upcoming' ? upcoming.length : past.length;

            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`
                  relative px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full text-body-sm font-heading font-semibold
                  whitespace-nowrap transition-all duration-200
                  ${isActive
                    ? 'bg-surface text-primary shadow-card'
                    : 'text-text-muted hover:text-text-primary'
                  }
                `}
                aria-pressed={isActive}
              >
                {tab.label}
                <span
                  className={`
                    ml-1.5 text-caption font-semibold px-1.5 py-0.5 rounded-full
                    ${isActive
                      ? 'bg-primary-soft text-primary'
                      : 'bg-surface3 text-text-muted'
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  EVENTS GRID                                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {activeList.length === 0 ? (
            <motion.div
              key={`${activeTab}-empty`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Card>
                <EmptyState
                  icon="calendar"
                  title={
                    activeTab === 'upcoming'
                      ? 'No upcoming events right now'
                      : 'No past events yet'
                  }
                  subtitle={
                    activeTab === 'upcoming'
                      ? 'Check back soon — something exciting is always around the corner! 🎉'
                      : 'Events will show up here once they\'ve happened.'
                  }
                />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:gap-6 md:grid-cols-2"
            >
              {activeList.map((event) => (
                <motion.div key={event.id} variants={staggerItem}>
                  <EventCard event={event} isPast={activeTab === 'past'} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  RESULT COUNT                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeList.length > 0 && (
          <p className="text-caption text-text-muted text-center mt-10">
            Showing {activeList.length} {activeTab} event{activeList.length !== 1 ? 's' : ''}
          </p>
        )}
      </SectionWrapper>
    </>
  );
}
