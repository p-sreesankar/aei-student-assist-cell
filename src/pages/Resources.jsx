import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, BookOpen, Calculator, FileText,
  PlayCircle, Check, ExternalLink, ChevronDown,
} from 'lucide-react';
import SEO from '@components/SEO';
import { schemes } from '@data/resources';
import { getUpcomingMockTests, getPreviousMockTests } from '@utils/mock-tests';
import { SectionWrapper } from '@components/layout';
import { EmptyState, PageBanner, SectionHeader, Button, Card, Badge } from '@components/ui';
import { getMockTests } from '@lib/repositories/contentRepository';
import {
  getYoutubeThumbnail,
  getSubjectCount,
  getSemestersWithContent,
} from '@utils/resources.utils';

// ── Animation variants ──────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PAPERS DROPDOWN — shows multiple papers with individual links
// ═══════════════════════════════════════════════════════════════════════════════

function PapersDropdown({ papers }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  if (papers.length === 1) {
    return (
      <a
        href={papers[0].driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors"
      >
        <FileText size={14} />
        Answer Key
      </a>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors"
      >
        <FileText size={14} />
        Answer Key
        <span className="ml-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {papers.length}
        </span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 top-full mt-1 left-0 min-w-[200px] bg-surface border border-border rounded-xl shadow-elevated p-1.5"
          >
            {papers.map((paper, i) => (
              <a
                key={i}
                href={paper.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-primary hover:bg-surface2 transition-colors"
              >
                <FileText size={12} className="text-primary shrink-0" />
                <span className="truncate">{paper.title}</span>
                <ExternalLink size={10} className="text-text-muted shrink-0 ml-auto" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  VIDEO PANEL — expands below card for lab subjects
// ═══════════════════════════════════════════════════════════════════════════════

function VideoPanel({ videos }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="pt-4 mt-4 border-t border-border space-y-2">
        {videos.map((video, i) => {
          const videoLink = video.youtubeLink || video.driveLink;
          const thumb = getYoutubeThumbnail(video.youtubeLink);
          return (
            <a
              key={i}
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-surface2 hover:bg-surface3 transition-colors group"
            >
              {thumb && (
                <img
                  src={thumb}
                  alt=""
                  className="w-16 h-10 rounded-lg object-cover shrink-0"
                  loading="lazy"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
                  {video.title}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-primary shrink-0 flex items-center gap-1">
                Watch <ExternalLink size={10} />
              </span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SUBJECT CARD
// ═══════════════════════════════════════════════════════════════════════════════

function SubjectCard({ subject }) {
  const [videosOpen, setVideosOpen] = useState(false);

  const notes = subject.resources.filter((r) => r.type === 'notes');
  const formulas = subject.resources.filter((r) => r.type === 'formula');
  const answerKey = subject.resources.filter((r) => r.type === 'answer-key');
  const videos = subject.resources.filter((r) => r.type === 'video');
  const qnPapers = subject.resources.filter(
    (r) => r.type === 'qn-papers' || r.type === 'qn-paper' || r.type === 'question-paper',
  );
  const isEmpty = subject.resources.length === 0;

  return (
    <motion.div
      variants={fadeUp}
      layout
      className="bg-surface border border-border rounded-2xl p-5 hover:border-primary hover:shadow-card-hover transition-[box-shadow,border-color] duration-300"
    >
      {/* Top row: name + lab badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-heading font-semibold text-text-primary text-body leading-snug">
            {subject.name}
          </h3>
          {subject.code && (
            <p className="text-text-muted text-xs mt-0.5">{subject.code}</p>
          )}
        </div>
        {subject.isLab && (
          <span className="shrink-0 bg-primary-soft text-primary border border-primary/20 text-xs rounded-full px-2 py-0.5 font-semibold">
            Lab
          </span>
        )}
      </div>

      {/* Resource buttons */}
      {isEmpty ? (
        <div className="flex">
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-surface2 text-text-muted cursor-default">
            Coming Soon
          </span>
        </div>
      ) : subject.isLab ? (
        /* Lab: video toggle */
        <div>
          <button
            onClick={() => setVideosOpen(!videosOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              videosOpen
                ? "bg-primary text-white"
                : "bg-primary-soft text-primary hover:bg-primary hover:text-white"
            }`}
          >
            <PlayCircle size={14} />
            {videos.length} Video{videos.length !== 1 ? "s" : ""}
            <ChevronDown
              size={12}
              className={`transition-transform ${videosOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {videosOpen && <VideoPanel videos={videos} />}
          </AnimatePresence>
        </div>
      ) : (
        /* Theory: notes / formula / papers / answer-key / buttons */
        <div className="flex flex-wrap gap-2">
          {notes.length > 0 &&
            notes.map((note, index) => (
              <a
                key={`${subject.id}-note-${index}`}
                href={note.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <BookOpen size={14} />
                {note.title || `Notes ${index + 1}`}
              </a>
            ))}
          {formulas.length > 0 && (
            <a
              href={formulas[0].driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Calculator size={14} />
              Formula
            </a>
          )}
          {answerKey.length > 0 && <PapersDropdown papers={answerKey} />}
          {qnPapers.length > 0 && (
            <a
              href={qnPapers[0].driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-primary-soft text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <FileText size={14} />
              {qnPapers.length === 1 ? "Question Paper" : "Question Papers"}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  RESOURCES PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Resources() {
  const initialSchemeId = schemes.find((scheme) => getSemestersWithContent(scheme.id).length > 0)?.id ?? schemes[0]?.id ?? '';
  const [selectedScheme, setSelectedScheme] = useState(initialSchemeId);
  const [selectedSemester, setSelectedSemester] = useState(
    () => getSemestersWithContent(initialSchemeId)[0] ?? 1,
  );
  const [query, setQuery] = useState('');
  const [mockTests, setMockTests] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadMockTests() {
      const items = await getMockTests();
      if (mounted) setMockTests(items);
    }

    loadMockTests();
    return () => {
      mounted = false;
    };
  }, []);

  const upcomingMockTests = useMemo(() => getUpcomingMockTests(mockTests), [mockTests]);
  const previousMockTests = useMemo(() => getPreviousMockTests(mockTests), [mockTests]);

  // ── Derived data ──────────────────────────────────────────────────────
  const scheme = schemes.find((s) => s.id === selectedScheme);
  const availableSemesters = useMemo(
    () => getSemestersWithContent(selectedScheme),
    [selectedScheme],
  );

  // Reset semester when switching schemes
  const handleSchemeChange = (id) => {
    setSelectedScheme(id);
    const sems = getSemestersWithContent(id);
    setSelectedSemester(sems[0] ?? 1);
    setQuery('');
  };

  // ── Get subjects for selected semester ────────────────────────────────
  const semesterData = scheme?.semesters.find(
    (s) => s.semester === selectedSemester,
  );
  const allSubjects = semesterData?.subjects ?? [];

  // ── Search filter ─────────────────────────────────────────────────────
  const filteredSubjects = useMemo(() => {
    if (!query.trim()) return allSubjects;
    const q = query.toLowerCase();
    return allSubjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.code && s.code.toLowerCase().includes(q)),
    );
  }, [allSubjects, query]);

  return (
    <>
      <SEO
        title="Resources"
        description="Download notes, formulas, papers and lab videos for AEI students at CET. Organized by scheme and semester."
      />

      {/* ─── PAGE BANNER ──────────────────────────────────────────────── */}
      <PageBanner
        title="Resources"
        subtitle="Notes, formulas, papers & lab videos — organized by semester"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Resources', path: '/resources' },
        ]}
      />

      <SectionWrapper background="default">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  MOCK TESTS ENTRY POINT                                        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="event">Mock Tests</Badge>
                {upcomingMockTests.length > 0 && <Badge variant="soon">Upcoming Highlighted</Badge>}
              </div>
              <h3 className="font-heading font-semibold text-h4 text-text-primary">Timed Mock Test Area</h3>
              <p className="text-body-sm text-text-secondary mt-1">
                Attempt mock tests, review scores, and reattempt anytime.
              </p>
              <p className="text-caption text-text-muted mt-2">
                Upcoming: {upcomingMockTests.length} · Previous: {previousMockTests.length}
              </p>
            </div>

            <Link to="/mock-tests" className="shrink-0">
              <Button variant="primary" size="sm">Open Mock Tests</Button>
            </Link>
          </div>

          {upcomingMockTests.length > 0 && (
            <div className="mt-4 rounded-lg border border-border bg-surface2 px-3 py-2">
              <p className="text-caption text-text-muted uppercase tracking-wide mb-1">Next upcoming</p>
              <p className="text-body-sm text-text-primary font-semibold">{upcomingMockTests[0].title}</p>
            </div>
          )}
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  STEP 1 — SCHEME SELECTOR                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          {schemes.map((s) => {
            const count = getSubjectCount(s.id);
            const semCount = getSemestersWithContent(s.id).length;
            const isSelected = s.id === selectedScheme;

            return (
              <button
                key={s.id}
                onClick={() => handleSchemeChange(s.id)}
                className={`
                  relative text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? 'border-primary-bright bg-primary-soft shadow-card-hover'
                      : 'border-border bg-surface hover:border-primary hover:shadow-card'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
                <h3 className="text-2xl font-heading font-bold text-text-primary">
                  {s.label}
                </h3>
                <p className="text-body-sm text-text-muted mt-1">
                  {count} subject{count !== 1 ? 's' : ''} &middot; {semCount} semester{semCount !== 1 ? 's' : ''}
                </p>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  STEP 2 — SEMESTER PILLS                                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => { setSelectedSemester(sem); setQuery(''); }}
              className={`
                shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold border transition-all duration-200 cursor-pointer min-w-[44px]
                ${
                  sem === selectedSemester
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface2 text-text-secondary border-border hover:border-primary-bright'
                }
              `}
            >
              S{sem}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  STEP 3 — SEARCH BAR                                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="
              w-full pl-10 pr-10 py-3 min-h-[48px]
              rounded-full border border-border
              bg-surface text-body text-text-primary
              placeholder:text-text-muted
              shadow-card focus:shadow-card-hover
              focus:border-primary-bright focus:ring-2 focus:ring-primary-soft
              outline-none transition-all duration-200
            "
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface2 text-text-muted transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  STEP 4 — SUBJECT CARDS GRID                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedScheme}-${selectedSemester}-${query}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {filteredSubjects.length === 0 ? (
              query ? (
                <EmptyState
                  icon="question"
                  title="No subjects match your search"
                  subtitle={`Nothing matches "${query}". Try a different term.`}
                  action={
                    <Button variant="secondary" size="sm" onClick={() => setQuery('')}>
                      Clear Search
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  icon="file"
                  title="No subjects added yet"
                  subtitle="No subjects have been added for this semester yet. Check back soon!"
                />
              )
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredSubjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Subject count ──────────────────────────────────────────── */}
        {!query && filteredSubjects.length > 0 && (
          <p className="text-caption text-text-muted text-center mt-8">
            {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''} in Semester {selectedSemester}
          </p>
        )}
      </SectionWrapper>
    </>
  );
}
