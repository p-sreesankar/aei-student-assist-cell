import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Calendar,
  ArrowLeft, Images, Camera,
} from 'lucide-react';
import { GALLERY } from '@data/gallery';
import { SectionWrapper } from '@components/layout';
import { Badge, Card, EmptyState, PageBanner } from '@components/ui';
import { formatDate } from '@utils/date';

// ══════════════════════════════════════════════════════════════════════════════
//  DATA CONTRACT — for future maintainers
// ══════════════════════════════════════════════════════════════════════════════
//
//  Each object in src/data/gallery.js must match:
//
//  {
//    id:       string,         // unique slug
//    src:      string,         // "/images/gallery/filename.jpg"
//    caption:  string,         // short description / alt text
//    event:    string | null,  // event name for filter, or null
//    date:     string,         // "YYYY-MM-DD"
//    category: string,         // "event" | "campus" | "cultural" | "academic" | "general"
//  }
// ══════════════════════════════════════════════════════════════════════════════

const PHOTOS_PER_PAGE = 12;

// ── Category colour map for album accent strips ─────────────────────────────
const CATEGORY_COLORS = {
  event:    'from-sky-600 to-sky-700',
  cultural: 'from-amber-500 to-orange-600',
  academic: 'from-emerald-500 to-teal-600',
  campus:   'from-sky-400 to-blue-600',
  general:  'from-slate-500 to-slate-600',
};

// ── Animation variants ──────────────────────────────────────────────────────
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ══════════════════════════════════════════════════════════════════════════════
//  LIGHTBOX COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const photo = photos[currentIndex];
  if (!photo) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2.5 bg-surface rounded-full shadow-elevated hover:bg-surface2 transition-colors"
          aria-label="Close lightbox"
        >
          <X size={20} className="text-text-primary" />
        </button>

        {/* Image crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={photo.src}
            alt={photo.caption}
            className="w-full max-h-[75vh] object-contain rounded-t-xl bg-black"
          />
        </AnimatePresence>

        {/* Info bar */}
        <div className="bg-surface rounded-b-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-body font-heading font-semibold text-text-primary leading-snug">
              {photo.caption}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {photo.event && <Badge variant="event">{photo.event}</Badge>}
              <span className="text-caption text-text-muted flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(photo.date)}
              </span>
            </div>
          </div>
          <span className="text-caption text-text-muted whitespace-nowrap">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Desktop arrows */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface/90 shadow-elevated hover:bg-surface2 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface/90 shadow-elevated hover:bg-surface2 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={22} className="text-text-primary" />
          </button>
        )}

        {/* Mobile arrows */}
        <div className="flex md:hidden justify-center gap-6 mt-3">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            disabled={!hasPrev}
            className="p-3 rounded-full bg-surface/90 shadow-card disabled:opacity-30 transition"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-text-primary" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            disabled={!hasNext}
            className="p-3 rounded-full bg-surface/90 shadow-card disabled:opacity-30 transition"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-text-primary" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ALBUM COVER CARD — one per event / "Department Life" group
// ══════════════════════════════════════════════════════════════════════════════

function AlbumCard({ album, onClick, index }) {
  const cover  = album.photos[0];
  const extras = album.photos.length - 1;
  const gradient = CATEGORY_COLORS[album.category] ?? CATEGORY_COLORS.general;

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      className="
        group relative flex flex-col text-left
        rounded-2xl overflow-hidden shadow-card
        hover:shadow-card-hover bg-surface
        transition-shadow duration-300 cursor-pointer w-full
      "
    >
      {/* ── Cover image — fixed 4:3 aspect ────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        <img
          src={cover.src}
          alt={cover.caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient scrim at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Photo count badge — top right */}
        <span className="
          absolute top-3 right-3
          flex items-center gap-1.5 px-2.5 py-1
          bg-black/50 backdrop-blur-sm rounded-full
          text-white text-caption font-semibold
        ">
          <Images size={13} />
          {album.photos.length}
        </span>

        {/* Thumbnail stack peek — show up to 2 extra thumbnails */}
        {extras > 0 && (
          <div className="absolute bottom-3 right-3 flex -space-x-2">
            {album.photos.slice(1, 3).map((p) => (
              <div
                key={p.id}
                className="w-8 h-8 rounded-md border-2 border-white overflow-hidden shadow-sm"
              >
                <img
                  src={p.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {extras > 2 && (
              <div className="w-8 h-8 rounded-md border-2 border-white bg-black/60 flex items-center justify-center shadow-sm">
                <span className="text-white text-[10px] font-bold">+{extras - 2}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Info section ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 px-4 py-3">
        {/* Accent strip */}
        <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${gradient} mb-1`} />

        <h3 className="font-heading font-bold text-text-primary text-body leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {album.name}
        </h3>

        <div className="flex items-center gap-2 text-caption text-text-muted">
          <Calendar size={12} />
          <span>{formatDate(album.date)}</span>
          <span className="text-border">·</span>
          <span>{album.photos.length} photo{album.photos.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  ALBUM DETAIL VIEW — shown when an album is opened
// ══════════════════════════════════════════════════════════════════════════════

function AlbumDetail({ album, onBack, onPhotoClick }) {
  const gradient = CATEGORY_COLORS[album.category] ?? CATEGORY_COLORS.general;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Album header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="
            flex items-center justify-center w-10 h-10
            rounded-full bg-surface2 hover:bg-surface3
            transition-colors shrink-0
          "
          aria-label="Back to albums"
        >
          <ArrowLeft size={18} className="text-text-primary" />
        </button>
        <div className="min-w-0">
          <h2 className="font-heading font-bold text-h4 text-text-primary leading-tight truncate">
            {album.name}
          </h2>
          <div className="flex items-center gap-2 text-body-sm text-text-muted mt-0.5">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${gradient}`} />
            <span>{formatDate(album.date)}</span>
            <span className="text-border">·</span>
            <span>{album.photos.length} photo{album.photos.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* ── Photo grid — uniform tiles ────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {album.photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            variants={fadeUp}
            onClick={() => onPhotoClick(i)}
            className="
              group relative aspect-square overflow-hidden
              rounded-xl bg-surface2 shadow-card
              hover:shadow-card-hover transition-shadow
              duration-300 cursor-pointer
            "
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover caption */}
            <div className="
              absolute inset-0
              bg-gradient-to-t from-black/60 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              flex items-end p-3
            ">
              <p className="text-white text-caption font-medium leading-snug line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  GALLERY PAGE — main export
// ══════════════════════════════════════════════════════════════════════════════

export default function Gallery() {
  const [openAlbumKey, setOpenAlbumKey] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // ── Build albums from GALLERY array ────────────────────────────────────
  //  Group by event name; photos with event: null go into "Department Life"
  const albums = useMemo(() => {
    const map = new Map();

    for (const photo of GALLERY) {
      const key = photo.event ?? '__ungrouped__';
      if (!map.has(key)) {
        map.set(key, {
          key,
          name:     photo.event ?? 'Department Life',
          date:     photo.date,
          category: photo.category,
          photos:   [],
        });
      }
      const album = map.get(key);
      album.photos.push(photo);
      // Use the most recent date as album date
      if (photo.date > album.date) album.date = photo.date;
    }

    // Sort albums: most recent first
    return [...map.values()].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  // ── Currently open album ───────────────────────────────────────────────
  const activeAlbum = useMemo(
    () => albums.find((a) => a.key === openAlbumKey) ?? null,
    [albums, openAlbumKey],
  );

  // ── Lightbox handlers ──────────────────────────────────────────────────
  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => Math.max(0, i - 1)), []);
  const nextPhoto = useCallback(
    () => {
      if (!activeAlbum) return;
      setLightboxIndex((i) => Math.min(activeAlbum.photos.length - 1, i + 1));
    },
    [activeAlbum],
  );

  // Scroll to top when opening/closing album
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [openAlbumKey]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  PAGE BANNER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <PageBanner
        title="Gallery"
        subtitle="Snapshots from department life 📸"
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Gallery', path: '/gallery' },
        ]}
        gradientFrom="from-[#2E1065]"
        gradientTo="to-bg"
      />

      <SectionWrapper background="default">
        <AnimatePresence mode="wait">
          {/* ═════════════════════════════════════════════════════════════ */}
          {/*  ALBUM GRID (default view)                                  */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {!activeAlbum ? (
            <motion.div
              key="albums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {albums.length === 0 ? (
                <Card>
                  <EmptyState
                    icon="image"
                    title="Photos coming soon!"
                    subtitle="We're building our collection. Check back after the next event! 📸"
                  />
                </Card>
              ) : (
                <>
                  {/* Stats bar */}
                  <div className="flex items-center gap-3 mb-6 text-body-sm text-text-muted">
                    <Camera size={16} className="text-primary-dim" />
                    <span>
                      <span className="font-semibold text-text-primary">{albums.length}</span> album{albums.length !== 1 ? 's' : ''}
                      {' · '}
                      <span className="font-semibold text-text-primary">{GALLERY.length}</span> photo{GALLERY.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {albums.map((album, i) => (
                      <AlbumCard
                        key={album.key}
                        album={album}
                        index={i}
                        onClick={() => setOpenAlbumKey(album.key)}
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════════ */
            /*  ALBUM DETAIL (when an album is opened)                   */
            /* ═══════════════════════════════════════════════════════════ */
            <AlbumDetail
              key={`detail-${activeAlbum.key}`}
              album={activeAlbum}
              onBack={() => setOpenAlbumKey(null)}
              onPhotoClick={(i) => setLightboxIndex(i)}
            />
          )}
        </AnimatePresence>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  LIGHTBOX                                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex >= 0 && activeAlbum && (
          <Lightbox
            photos={activeAlbum.photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
}
