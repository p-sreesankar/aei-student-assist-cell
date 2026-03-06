import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Download, ExternalLink, Calendar,
  FileText, FileSpreadsheet, FileImage,
  Presentation, FileArchive, Link2, File,
} from 'lucide-react';
import SEO from '@components/SEO';
import { RESOURCES } from '@data/resources';
import { SectionWrapper } from '@components/layout';
import { Card, EmptyState, PageBanner, SectionHeader } from '@components/ui';
import { formatDate } from '@utils/date';

// ══════════════════════════════════════════════════════════════════════════════
//  FILE TYPE → icon + accent colour
// ══════════════════════════════════════════════════════════════════════════════

const FILE_TYPE_META = {
  pdf:  { icon: FileText,        color: 'bg-[rgba(239,68,68,0.12)]    text-red-400' },
  doc:  { icon: FileText,        color: 'bg-[rgba(59,130,246,0.12)]   text-blue-400' },
  xls:  { icon: FileSpreadsheet, color: 'bg-[rgba(16,185,129,0.12)] text-emerald-400' },
  ppt:  { icon: Presentation,    color: 'bg-[rgba(249,115,22,0.12)] text-orange-400' },
  img:  { icon: FileImage,       color: 'bg-[rgba(168,85,247,0.12)] text-purple-400' },
  zip:  { icon: FileArchive,     color: 'bg-[rgba(245,158,11,0.12)]  text-amber-400' },
  link: { icon: Link2,           color: 'bg-[rgba(14,165,233,0.12)]    text-sky-400' },
};

const fallbackMeta = { icon: File, color: 'bg-surface3 text-text-muted' };

function getFileMeta(fileType) {
  return FILE_TYPE_META[fileType] ?? fallbackMeta;
}

// ── Animation variants ──────────────────────────────────────────────────────
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  RESOURCE CARD
// ══════════════════════════════════════════════════════════════════════════════

function ResourceCard({ resource }) {
  const { icon: Icon, color } = getFileMeta(resource.fileType);

  return (
    <motion.a
      variants={fadeUp}
      href={resource.driveLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-surface
        border border-border
        shadow-card hover:shadow-card-hover
        hover:-translate-y-0.5
        active:scale-[0.98]
        transition-[box-shadow,border-color,translate,scale] duration-300 cursor-pointer
        min-h-[44px]
      "
    >
      {/* File-type icon */}
      <div className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg ${color}`}>
        <Icon size={18} className="sm:w-5 sm:h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-body text-text-primary leading-snug group-hover:text-primary transition-colors line-clamp-1">
          {resource.title}
        </h4>
        <p className="text-body-sm text-text-secondary leading-relaxed mt-1 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Date */}
          <span className="text-caption text-text-muted flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(resource.addedDate)}
          </span>

          {/* Download indicator */}
          <span className="
            inline-flex items-center gap-1.5
            text-caption font-heading font-semibold
            text-primary group-hover:text-primary-bright
            transition-colors
          ">
            <Download size={13} />
            Download
            <ExternalLink size={11} className="opacity-50" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  RESOURCES PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function Resources() {
  const [query, setQuery] = useState('');

  // ── Filter by search query (title + description) ──────────────────────
  const filtered = useMemo(() => {
    if (!query.trim()) return RESOURCES;
    const q = query.toLowerCase();
    return RESOURCES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  }, [query]);

  // ── Group by category, preserving insertion order ─────────────────────
  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category).push(r);
    }
    return [...map.entries()]; // [[category, resources[]], ...]
  }, [filtered]);

  const totalResults = filtered.length;

  return (
    <>      <SEO title="Resources" description="Download syllabi, lab manuals, forms and study materials for AEI students at CET." />      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Resources & Downloads"
        subtitle="Forms, guides, lab manuals and everything you need 📁"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Resources', path: '/resources' },
        ]}
        gradientFrom="from-primary-muted"
        gradientTo="to-bg"
      />

      <SectionWrapper background="default">
        {RESOURCES.length === 0 ? (
          /* ── Global empty state ──────────────────────────────────────── */
          <Card>
            <EmptyState
              icon="file"
              title="Resources coming soon!"
              subtitle="We're preparing useful downloads for you. Check back soon! 📂"
            />
          </Card>
        ) : (
          <>
            {/* ═══════════════════════════════════════════════════════════ */}
            {/*  SEARCH BAR                                               */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="relative max-w-lg mx-auto mb-8 sm:mb-10">
              <Search
                size={18}
                className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources…"
                className="
                  w-full pl-10 sm:pl-11 pr-4 py-3 min-h-[48px]
                  rounded-full border border-border
                  bg-surface text-body text-text-primary
                  placeholder:text-text-muted
                  shadow-card focus:shadow-card-hover
                  focus:border-border-bright focus:ring-2 focus:ring-primary-soft
                  outline-none transition-all duration-200
                "
              />
              {query && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-caption text-text-muted">
                  {totalResults} result{totalResults !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/*  CATEGORY SECTIONS                                        */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {grouped.length === 0 ? (
              <Card>
                <EmptyState
                  icon="file"
                  title="No matches found"
                  subtitle={`Nothing matches "${query}". Try a different search term.`}
                />
              </Card>
            ) : (
              <div className="space-y-8 sm:space-y-10">
                {grouped.map(([category, resources]) => (
                  <section key={category}>
                    {/* Sticky category header on mobile for easier scanning */}
                    <div className="sticky top-16 md:top-20 z-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 py-2 bg-bg/95 backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none">
                      <SectionHeader
                        title={category}
                        subtitle={`${resources.length} resource${resources.length !== 1 ? 's' : ''}`}
                      />
                    </div>

                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      className="grid gap-3 sm:grid-cols-2 sm:gap-4 mt-3 sm:mt-4"
                    >
                      {resources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </motion.div>
                  </section>
                ))}
              </div>
            )}

            {/* ── Result count (when not searching) ──────────────────── */}
            {!query && (
              <p className="text-caption text-text-muted text-center mt-8">
                {RESOURCES.length} resource{RESOURCES.length !== 1 ? 's' : ''} across {grouped.length} categor{grouped.length !== 1 ? 'ies' : 'y'}
              </p>
            )}
          </>
        )}
      </SectionWrapper>
    </>
  );
}
