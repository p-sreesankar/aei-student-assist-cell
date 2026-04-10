import { Link } from 'react-router';
import { Instagram, Linkedin, Youtube, Mail, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@data/site-config';

const socialIcons = {
  instagram: Instagram,
  linkedin:  Linkedin,
  youtube:   Youtube,
  email:     Mail,
  website:   ExternalLink,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socials = Object.entries(SITE_CONFIG.socialLinks || {}).filter(([, url]) => url);

  const quickLinks = [
    { to: '/',          label: 'Home' },
    { to: '/about',     label: 'About' },
    { to: '/notices',   label: 'Notices' },
    { to: '/events',    label: 'Events' },
    { to: '/gallery',   label: 'Gallery' },
    { to: '/resources', label: 'Resources' },
    { to: '/grievance', label: 'Grievance' },
    { to: '/contact',   label: 'Contact' },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <div>
              <h3 className="text-h4 font-heading font-bold text-text-primary mb-2">
                {SITE_CONFIG.siteName}
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                {SITE_CONFIG.departmentShort} Department
                <br />
                {SITE_CONFIG.collegeShort}
              </p>
            </div>
            <p className="text-body-sm text-text-muted max-w-xs">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-body font-heading font-semibold text-text-primary mb-4">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-body-sm text-text-secondary hover:text-primary transition-colors duration-200"
                >
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
            {socials.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {socials.map(([platform, url]) => {
                  const Icon = socialIcons[platform] || ExternalLink;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target={platform !== 'email' ? '_blank' : undefined}
                      rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                      className="group"
                      aria-label={`Visit our ${platform}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center text-text-muted hover:bg-primary hover:text-text-primary transition-all duration-200 group-hover:shadow-card-hover">
                        <Icon size={18} />
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-body-sm text-text-muted">
                No social links configured yet.
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-text-muted text-center sm:text-left">
              {SITE_CONFIG.footerText.replace('2026', currentYear)}
            </p>
            <p className="text-caption text-text-muted">
              Built for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
