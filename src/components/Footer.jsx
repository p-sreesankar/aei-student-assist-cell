import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Mail, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@data/site-config';

const socialIcons = {
  instagram: Instagram,
  linkedin:  Linkedin,
  youtube:   Youtube,
  email:     Mail,
  website:   Globe,
};

export default function Footer() {
  const socials = Object.entries(SITE_CONFIG.socialLinks || {}).filter(([, url]) => url);

  return (
    <footer className="bg-text-primary text-surface-50">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-2">{SITE_CONFIG.siteName}</h3>
            <p className="text-surface-400 text-sm leading-relaxed">
              {SITE_CONFIG.departmentName}<br />
              {SITE_CONFIG.collegeName}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-surface-400 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/notices',   label: 'Notice Board' },
                { to: '/events',    label: 'Events' },
                { to: '/resources', label: 'Resources' },
                { to: '/grievance', label: 'Grievance Form' },
                { to: '/contact',   label: 'Contact Us' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-surface-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-surface-400 mb-3">
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map(([key, url]) => {
                const Icon = socialIcons[key] || Globe;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 text-surface-300 hover:text-white
                               hover:bg-white/20 transition-colors"
                    aria-label={key}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-surface-500">
          {SITE_CONFIG.footerText}
        </div>
      </div>
    </footer>
  );
}
