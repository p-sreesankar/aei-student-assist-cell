/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── Typography ───────────────────────────────────────────
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },

      // ── Color Palette ────────────────────────────────────────
      // Warm, friendly, student-centric — not a govt portal feel
      colors: {
        primary: {
          50:  '#EEF6FF',
          100: '#D9EAFF',
          200: '#BBD9FF',
          300: '#8CC2FF',
          400: '#559FFF',
          500: '#2B7AFF',   // main brand blue
          600: '#0F5AFF',
          700: '#0847EB',
          800: '#0D3ABE',
          900: '#113595',
          950: '#0F2259',
        },
        accent: {
          50:  '#FFF8ED',
          100: '#FFEFD4',
          200: '#FFDBA8',
          300: '#FFC170',
          400: '#FF9D37',
          500: '#FF8210',   // warm orange
          600: '#F06806',
          700: '#C74E07',
          800: '#9E3D0E',
          900: '#7F340F',
          950: '#451805',
        },
        surface: {
          50:  '#FDFCFB',   // page background — warm off-white
          100: '#FAF8F5',
          200: '#F3EFEA',
          300: '#E8E2DA',
          400: '#D5CCBF',
          500: '#BFB3A3',
        },
        text: {
          primary:   '#1A1A2E',  // near-black with a hint of warmth
          secondary: '#4A4A5A',  // medium gray for subheadings
          muted:     '#8A8A9A',  // light gray for captions, dates
          inverse:   '#FDFCFB',  // text on dark backgrounds
        },
        success: '#16A34A',
        warning: '#EAB308',
        error:   '#DC2626',
      },

      // ── Spacing & Sizing ─────────────────────────────────────
      maxWidth: {
        'content': '1200px',
        'narrow':  '720px',
      },

      // ── Border Radius ────────────────────────────────────────
      borderRadius: {
        'card': '1rem',
        'pill': '9999px',
      },

      // ── Box Shadow ───────────────────────────────────────────
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-lg': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'float':   '0 8px 30px rgba(0,0,0,0.12)',
      },

      // ── Animations ───────────────────────────────────────────
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in':    'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
