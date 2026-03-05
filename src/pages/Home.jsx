import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Megaphone, CalendarDays, ImageIcon, Download,
  MessageSquareWarning, Users, Info, ArrowRight,
} from 'lucide-react';
import { SITE_CONFIG } from '@data/site-config';

const quickLinks = [
  { to: '/about',     label: 'About the Cell',       icon: Info,                  color: 'bg-primary-100 text-primary-600' },
  { to: '/notices',   label: 'Notice Board',          icon: Megaphone,             color: 'bg-accent-100 text-accent-600' },
  { to: '/events',    label: 'Events',                icon: CalendarDays,          color: 'bg-green-100 text-green-600' },
  { to: '/gallery',   label: 'Gallery',               icon: ImageIcon,             color: 'bg-purple-100 text-purple-600' },
  { to: '/resources', label: 'Resources & Downloads',  icon: Download,              color: 'bg-blue-100 text-blue-600' },
  { to: '/grievance', label: 'Grievance Form',         icon: MessageSquareWarning,  color: 'bg-rose-100 text-rose-600' },
  { to: '/contact',   label: 'Contact Us',             icon: Users,                color: 'bg-teal-100 text-teal-600' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-primary-300/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10 py-24 md:py-36 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-balance"
          >
            {SITE_CONFIG.siteName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-4"
          >
            {SITE_CONFIG.departmentName} — {SITE_CONFIG.collegeName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-primary-200 max-w-xl mx-auto mb-10"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/notices" className="btn-accent shadow-lg">
              Latest Notices <ArrowRight size={16} />
            </Link>
            <Link to="/grievance" className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20">
              Submit Grievance
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Links Grid ─────────────────────────────────── */}
      <section className="section-container section-padding">
        <div className="text-center mb-12">
          <h2 className="section-title">Explore</h2>
          <p className="section-subtitle mx-auto">Everything you need, one tap away.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.to} variants={item}>
              <Link
                to={link.to}
                className="card group flex flex-col items-center gap-3 p-6 text-center
                           hover:-translate-y-1 transition-transform duration-300"
              >
                <span className={`p-3 rounded-xl ${link.color} transition-transform group-hover:scale-110`}>
                  <link.icon size={24} />
                </span>
                <span className="font-heading font-semibold text-sm md:text-base text-text-primary">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
