import { Link } from 'react-router';
import { Mail, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, BRAND, FOOTER_CREDIT } from '@/config/navigation';

/**
 * Footer Component — Warm, friendly footer with navigation and contact info
 * 
 * Features:
 * - Department and college information
 * - Quick navigation links (synced with Navbar via config)
 * - Contact email mailto link
 * - Social media links (configurable)
 * - Warm background with subtle texture
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerEmail = (SOCIAL_LINKS.email || '').trim();

  // ── Filter Active Social Links ─────────────────────────────────────────
  const activeSocialLinks = Object.entries(SOCIAL_LINKS).filter(
    ([_, url]) => url && url.trim() !== ''
  );

  // ── Social Icon Mapping ────────────────────────────────────────────────
  const socialIcons = {
    email: Mail,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: ExternalLink,
    twitter: ExternalLink,
  };

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ── Main Footer Content ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          
          {/* Column 1: Branding & Info */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-muted flex items-center justify-center text-text-primary font-heading font-bold text-xl shadow-card">
                {BRAND.departmentShort}
              </div>
              <div>
                <div className="text-h4 font-heading font-bold text-text-primary">
                  {BRAND.siteName}
                </div>
                <div className="text-body-sm text-text-muted">
                  {BRAND.departmentShort} · {BRAND.collegeShort}
                </div>
              </div>
            </div>

            {/* Department Info */}
            <div className="space-y-1 text-body-sm text-text-secondary">
              <p className="font-medium">{BRAND.departmentFull}</p>
              <p>{BRAND.collegeFull}</p>
            </div>

            {/* Tagline */}
            <p className="text-body-sm text-text-muted italic max-w-xs">
              {BRAND.tagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-body font-heading font-semibold text-text-primary mb-4">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-body-sm text-text-secondary hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary-dim opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-body font-heading font-semibold text-text-primary mb-4">
              Connect With Us
            </h4>
            
            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <div className="flex gap-3 mb-6">
                {activeSocialLinks.map(([platform, url]) => {
                  const Icon = socialIcons[platform] || ExternalLink;
                  const isEmail = platform === 'email';

                  return (
                    <a
                      key={platform}
                      href={url}
                      target={!isEmail ? '_blank' : undefined}
                      rel={!isEmail ? 'noopener noreferrer' : undefined}
                      className="group"
                      aria-label={`${platform} link`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-primary transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5">
                        <Icon size={18} />
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Contact Email */}
            {footerEmail && (
              <div className="space-y-2">
                <p className="text-body-sm text-text-muted">
                  Got questions? Reach out:
                </p>
                <a
                  href={footerEmail}
                  className="inline-flex items-center gap-2 text-body-sm text-primary hover:text-primary-bright font-medium transition-colors"
                >
                  <Mail size={16} />
                  <span>Email Us</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-body-sm text-text-muted">
            
            {/* Copyright */}
            <p>
              (c) {currentYear} {BRAND.siteName} — {BRAND.departmentShort}, {BRAND.collegeShort}. All rights reserved.
            </p>

            {/* Credit */}
            <p className="text-body-sm">
              {FOOTER_CREDIT}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
