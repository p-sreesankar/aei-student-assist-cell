import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

/**
 * ProjectShowcaseCard — glassmorphic project preview card
 *
 * Props:
 * - title: string
 * - description: string
 * - image: string (URL)
 * - tags: string[]
 * - creators: string[]
 * - link: string (GitHub URL)
 */
export default function ProjectShowcaseCard({
  title,
  description,
  image,
  tags = [],
  creators = [],
  link,
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(image) && !imageError;

  return (
    <motion.article
      whileHover={{
        y: -8,
        boxShadow: '0 22px 45px rgba(14, 165, 233, 0.20)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="
        group relative h-full overflow-hidden rounded-2xl
        bg-[#0F2744]/50 backdrop-blur-xl backdrop-saturate-100 hover:backdrop-saturate-150
        border border-[#1E4976]/50
        transition-[filter,box-shadow,border-color] duration-300
        hover:border-[#38BDF8]/35
      "
    >
      {/* Edge lighting: top-left highlight + bottom-right shadow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-t border-l border-white/20" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-b border-r border-white/5" />

      <div className="relative z-[1] flex h-full flex-col">
        <div className="aspect-video overflow-hidden border-b border-white/10">
          {showImage ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B1F38] to-[#163A63]">
              <span className="text-4xl font-heading font-extrabold text-white/25">
                {title?.charAt(0) || 'P'}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-heading text-h4 font-bold text-white leading-snug line-clamp-2">
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sky-200/25 bg-sky-300/10 px-2.5 py-1 text-[11px] font-heading font-semibold uppercase tracking-wide text-sky-200">
              Created By
            </span>
            {creators.map((creator) => (
              <span
                key={creator}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-body text-slate-200"
              >
                {creator}
              </span>
            ))}
          </div>

          <p className="mt-4 text-body-sm font-body leading-relaxed text-slate-300 line-clamp-3">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-200/15 bg-blue-300/10 px-2.5 py-1 text-[11px] font-heading font-semibold tracking-wide text-sky-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative mt-6 inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg
              border border-white/20 bg-transparent px-4 py-2.5
              text-sm font-heading font-semibold text-slate-100
              transition-colors duration-300 hover:border-transparent hover:text-white
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0EA5E9] before:to-[#2563EB]
              before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
            "
          >
            <span className="relative z-[1] inline-flex items-center gap-2">
              <Github size={16} />
              View Repository
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}