import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, BookOpen, GraduationCap, FlaskConical, FolderOpen } from 'lucide-react';
import { RESOURCES } from '@data/resources';
import SectionHeader from '@components/SectionHeader';

const CATEGORY_META = {
  all:       { label: 'All',          icon: FolderOpen },
  form:      { label: 'Forms',        icon: FileText },
  guide:     { label: 'Guides',       icon: BookOpen },
  syllabus:  { label: 'Syllabus',     icon: GraduationCap },
  labmanual: { label: 'Lab Manuals',  icon: FlaskConical },
  other:     { label: 'Other',        icon: FolderOpen },
};

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(RESOURCES.map((r) => r.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return RESOURCES;
    return RESOURCES.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section-container section-padding">
      <SectionHeader title="Resources & Downloads" subtitle="Forms, guides, lab manuals and more" />

      {/* ── Category Filter ──────────────────────────────────── */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || CATEGORY_META.other;
            const Icon = meta.icon;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-semibold
                            transition-colors duration-200
                            ${isActive
                              ? 'bg-primary-500 text-white shadow-card'
                              : 'bg-surface-200 text-text-secondary hover:bg-surface-300'}`}
              >
                <Icon size={14} /> {meta.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Resource Cards ───────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-text-muted py-12">No resources available yet. Check back soon!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((res, i) => {
            const meta = CATEGORY_META[res.category] || CATEGORY_META.other;
            const Icon = meta.icon;
            return (
              <motion.a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-primary-100 text-primary-600">
                    <Icon size={20} />
                  </span>
                  <span className="badge-muted text-xs">{meta.label}</span>
                </div>
                <h4 className="font-heading font-bold text-text-primary">{res.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{res.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600
                                 group-hover:text-primary-700 mt-auto">
                  <Download size={14} /> Download <ExternalLink size={12} />
                </span>
              </motion.a>
            );
          })}
        </div>
      )}
    </section>
  );
}
