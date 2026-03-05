import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GALLERY } from '@data/gallery';
import SectionHeader from '@components/SectionHeader';

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section-container section-padding">
      <SectionHeader title="Gallery" subtitle="Snapshots from department life" />

      {GALLERY.length === 0 ? (
        <p className="text-center text-text-muted py-12">No photos yet. Stay tuned!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onClick={() => setSelected(photo)}
              className="group relative rounded-card overflow-hidden shadow-card
                         hover:shadow-card-lg transition-shadow duration-300
                         aspect-[4/3] bg-surface-200 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500
                           group-hover:scale-105"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              flex items-end p-4">
                <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 z-10 p-2 bg-white rounded-full shadow-float
                           hover:bg-surface-100 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} className="text-text-primary" />
              </button>
              <img
                src={selected.url}
                alt={selected.caption}
                className="w-full max-h-[75vh] object-contain rounded-t-card bg-black"
              />
              <div className="bg-white rounded-b-card p-4">
                <p className="text-text-primary font-medium">{selected.caption}</p>
                {selected.date && (
                  <p className="text-text-muted text-sm mt-1">{selected.date}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
