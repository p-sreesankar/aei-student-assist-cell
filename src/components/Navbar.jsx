import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@data/site-config';

const navLinks = [
  { to: '/',          label: 'Home' },
  { to: '/about',     label: 'About' },
  { to: '/notices',   label: 'Notices' },
  { to: '/events',    label: 'Events' },
  { to: '/gallery',   label: 'Gallery' },
  { to: '/resources', label: 'Resources' },
  { to: '/grievance', label: 'Grievance' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-200 shadow-sm">
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo / Site Name */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="font-heading font-extrabold text-lg text-primary-600">
            {SITE_CONFIG.departmentShort}
          </span>
          <span className="hidden sm:inline text-sm text-text-muted font-medium">
            {SITE_CONFIG.siteName}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${pathname === link.to
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-text-secondary hover:text-primary-600 hover:bg-surface-100'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-text-primary"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-surface-200 shadow-card-lg animate-fade-in">
          <ul className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${pathname === link.to
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-text-secondary hover:bg-surface-100 hover:text-primary-600'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
