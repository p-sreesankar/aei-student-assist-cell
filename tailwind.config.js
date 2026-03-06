/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ══════════════════════════════════════════════════════════════
      //  TYPOGRAPHY — Warm, readable, friendly
      // ══════════════════════════════════════════════════════════════
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Headings — Plus Jakarta Sans
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1':      ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2':      ['2rem',   { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3':      ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'h4':      ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],

        // Body — DM Sans
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body':    ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
      },

      // ══════════════════════════════════════════════════════════════
      //  COLOR PALETTE — Layered Blues (70/20/10)
      // ══════════════════════════════════════════════════════════════
      colors: {
        // ── Blue Layer System (via CSS variables) ───────────────────
        bg:              'var(--color-bg)',
        surface:         'var(--color-surface)',
        surface2:        'var(--color-surface-2)',
        surface3:        'var(--color-surface-3)',
        border:          'var(--color-border)',
        'border-bright': 'var(--color-border-bright)',
        primary:         'var(--color-primary)',
        'primary-dim':   'var(--color-primary-dim)',
        'primary-bright':'var(--color-primary-bright)',
        'primary-muted': 'var(--color-primary-muted)',
        'primary-soft':  'var(--color-primary-soft)',
        accent:          'var(--color-accent)',
        'accent-hover':  'var(--color-accent-hover)',
        'text-primary':  'var(--color-text-primary)',
        'text-secondary':'var(--color-text-secondary)',
        'text-muted':    'var(--color-text-muted)',
        'text-dim':      'var(--color-text-dim)',

        // ── Semantic Colors ──────────────────────────────────────────
        success: {
          DEFAULT: 'var(--color-success)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
        },
      },

      // ══════════════════════════════════════════════════════════════
      //  SPACING — Base-4 System
      // ══════════════════════════════════════════════════════════════
      spacing: {
        '0.5': '0.125rem',
        '1':   '0.25rem',
        '1.5': '0.375rem',
        '2':   '0.5rem',
        '3':   '0.75rem',
        '4':   '1rem',
        '5':   '1.25rem',
        '6':   '1.5rem',
        '8':   '2rem',
        '10':  '2.5rem',
        '12':  '3rem',
        '16':  '4rem',
        '20':  '5rem',
        '24':  '6rem',
        '32':  '8rem',
      },

      // ══════════════════════════════════════════════════════════════
      //  BORDER RADIUS — Soft, friendly curves
      // ══════════════════════════════════════════════════════════════
      borderRadius: {
        'none': '0',
        'sm':   '0.25rem',
        'DEFAULT': '0.5rem',
        'md':   '0.75rem',
        'lg':   '1rem',
        'xl':   '1.5rem',
        '2xl':  '2rem',
        'full': '9999px',
      },

      // ══════════════════════════════════════════════════════════════
      //  BOX SHADOWS — Dark theme, deep shadows + blue edge glow
      // ══════════════════════════════════════════════════════════════
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(14,165,233,0.08)',
        'card-hover': '0 8px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(14,165,233,0.2)',
        'elevated':   '0 10px 40px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
        'focus':      '0 0 0 3px rgba(14,165,233,0.3)',
        'primary-glow': '0 0 30px rgba(14,165,233,0.25)',
        'accent-glow':  '0 0 30px rgba(245,158,11,0.25)',
        'navbar':     '0 1px 0 rgba(14,165,233,0.15)',
        'inner':      'inset 0 1px 2px rgba(0,0,0,0.3)',
      },

      // ══════════════════════════════════════════════════════════════
      //  LAYOUT
      // ══════════════════════════════════════════════════════════════
      maxWidth: {
        'content': '1200px',
        'narrow':  '720px',
        'wide':    '1440px',
      },

      // ══════════════════════════════════════════════════════════════
      //  ANIMATIONS — Smooth, natural, friendly
      // ══════════════════════════════════════════════════════════════
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'marquee-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in':    'fade-in 0.3s ease-out',
        'scale-in':   'scale-in 0.3s ease-out',
        'marquee':    'marquee-scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
};
