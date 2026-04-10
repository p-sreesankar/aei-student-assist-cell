import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Paperclip, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '@components/SEO';
import { NOTICES } from '@data/notices';
import { SectionWrapper } from '@components/layout';
import { Badge, Card, EmptyState, PageBanner } from '@components/ui';
import { formatDate, isNew } from '@utils/date';

// ══════════════════════════════════════════════════════════════════════════════
//  DATA CONTRACT — for future maintainers
// ══════════════════════════════════════════════════════════════════════════════
//
//  Each object in src/data/notices.js must match:
//
//  {
//    id:            string,          // unique slug, e.g. "mid-sem-schedule-s6"
//    title:         string,          // notice heading
//    category:      string,          // one of: "academic" | "administrative" | "urgent" | "general"
//    date:          string,          // "YYYY-MM-DD" — used for sorting (newest first)
//    description:   string,          // 1–3 sentence body text
//    attachmentUrl: string | null,   // link to file / form, or null
//    pinned:        boolean,         // true → always shown at top with 📌 icon
//  }
//
//  TO ADD A NOTICE:
//    1. Open src/data/notices.js
//    2. Copy the template in the file header, paste at the TOP of the array
//    3. Fill in the fields, save, commit, push → auto-deploys via GitHub Actions
//
//  The category field determines the badge color:
//    academic       → indigo badge
//    administrative → surface/neutral badge
//    urgent         → red badge
//    general        → default gray badge
//
// ══════════════════════════════════════════════════════════════════════════════

// ── Filter Categories ────────────────────────────────────────────────────────
const FILTER_OPTIONS = [
  { key: 'all',            label: 'All' },
  { key: 'academic',       label: 'Academic' },
  { key: 'administrative', label: 'Administrative' },
  { key: 'urgent',         label: 'Urgent' },
  { key: 'general',        label: 'General' },
];

// Map category → Badge variant (matches Badge.jsx variants)
const CATEGORY_BADGE_MAP = {
  academic:       'academic',
  administrative: 'muted',
  urgent:         'urgent',
  general:        'general',
};

// ── Animation Variants ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  EXPANDABLE NOTICE CARD
// ══════════════════════════════════════════════════════════════════════════════

function NoticeCard({ notice, isPinned = false }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = notice.description.length > 160;

  return (
    <Card
      className={`
        group
        ${isPinned ? 'ring-2 ring-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)]' : ''}
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        {/* ── Left: Badges + Date ──────────────────────────────────── */}
        <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:w-32 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {isPinned && (
              <Badge variant="warning">
                <Pin size={11} className="mr-1" />
                Pinned
              </Badge>
            )}
            <Badge variant={CATEGORY_BADGE_MAP[notice.category] || 'general'}>
              {notice.category}
            </Badge>
            {isNew(notice.date) && (
              <Badge variant="new">New</Badge>
            )}
          </div>
          <time className="text-caption text-text-muted whitespace-nowrap">
            {formatDate(notice.date)}
          </time>
        </div>

        {/* ── Center: Title + Description ──────────────────────────── */}
        <div className="flex-1 min-w-0">
          <h3 className="text-h4 font-heading font-semibold text-text-primary mb-1.5 leading-snug">
            {notice.title}
          </h3>

          {/* Truncated / Expandable description */}
          <div className="relative">
            <p
              className={`
                text-body-sm text-text-secondary leading-relaxed
                ${!expanded && isLong ? 'line-clamp-2' : ''}
              `}
            >
              {notice.description}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1 mt-1.5 text-caption font-semibold text-primary hover:text-primary-bright transition-colors"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── Right: Attachment Link ───────────────────────────────── */}
        {notice.attachmentUrl && (
          <div className="flex-shrink-0 self-start">
            <a
              href={notice.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg
                text-caption font-semibold
                text-primary bg-primary-soft
                hover:bg-surface2 hover:text-primary-bright
                active:bg-surface3
                transition-colors
              "
            >
              <Paperclip size={14} />
              <span className="hidden sm:inline">Attachment</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  NOTICES PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function Notices() {
  const [activeFilter, setActiveFilter] = useState('all');

  // ── Derived Data ─────────────────────────────────────────────────────────
  const pinnedNotices = useMemo(
    () => NOTICES.filter((n) => n.pinned).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [],
  );

  const filteredNotices = useMemo(() => {
    const unpinned = NOTICES.filter((n) => !n.pinned);
    const filtered =
      activeFilter === 'all'
        ? unpinned
        : unpinned.filter((n) => n.category === activeFilter);
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeFilter]);

  const handleFilterClick = useCallback((key) => {
    setActiveFilter(key);
  }, []);

  return (
    <>      <SEO title="Notices" description="Browse the latest department notices and announcements from the AEI Association." />      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Notice Board"
        subtitle="Latest announcements from the AEI department"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Notices', path: '/notices' },
        ]}
      />

      <SectionWrapper background="default">
        {/* ═════════════════════════════════════════════════════════════ */}
        {/*  FILTER BAR                                                  */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="mb-6 sm:mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-1">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => handleFilterClick(opt.key)}
                  className={`
                    px-4 py-2.5 min-h-[44px] rounded-full text-body-sm font-heading font-semibold
                    whitespace-nowrap transition-all duration-200
                    ${isActive
                      ? 'bg-primary text-text-primary shadow-card'
                      : 'bg-surface2 text-text-secondary hover:bg-surface3 hover:text-text-primary active:bg-surface3'
                    }
                  `}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/*  PINNED NOTICES — always visible regardless of filter        */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {pinnedNotices.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📌</span>
              <h2 className="text-h4 font-heading font-semibold text-text-primary">
                Pinned Notices
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4"
            >
              {pinnedNotices.map((notice) => (
                <motion.div key={notice.id} variants={staggerItem}>
                  <NoticeCard notice={notice} isPinned />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/*  FILTERED NOTICES LIST                                       */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {filteredNotices.length === 0 ? (
          <Card>
            <EmptyState
              icon="inbox"
              title="No notices found"
              subtitle={
                activeFilter === 'all'
                  ? 'No notices have been posted yet. Check back soon! 📬'
                  : `No ${activeFilter} notices at the moment. Try a different filter.`
              }
            />
          </Card>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredNotices.map((notice) => (
                <motion.div
                  key={notice.id}
                  variants={staggerItem}
                  layout
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                >
                  <NoticeCard notice={notice} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/*  RESULT COUNT                                                */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {filteredNotices.length > 0 && (
          <p className="text-caption text-text-muted text-center mt-8">
            Showing {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <> in <span className="font-semibold capitalize">{activeFilter}</span></>
            )}
            {pinnedNotices.length > 0 && (
              <> &middot; {pinnedNotices.length} pinned</>
            )}
          </p>
        )}
      </SectionWrapper>
    </>
  );
}
