/**
 * AI MASTERCLASS — Corporate Training Motion Graphics Design System
 * Clean, technical, corporate visual system with white/light-grey canvas,
 * sharp technical typography, coral/teal accents, and charcoal contrast.
 */

export const THEME = {
  colors: {
    // Canvas & backgrounds
    background: '#f8fafc',
    backgroundPure: '#ffffff',
    backgroundSubtle: '#f1f5f9',
    cardBackground: '#ffffff',
    cardBackgroundElevated: '#ffffff',

    // Charcoal & Text
    charcoalDark: '#0f172a', // primary headings
    charcoalBody: '#1e293b', // primary body text
    charcoalMuted: '#475569', // secondary descriptions
    charcoalSubtle: '#94a3b8', // metadata, captions

    // Borders & Dividers
    borderLight: '#e2e8f0',
    borderMedium: '#cbd5e1',
    borderDark: '#94a3b8',

    // Primary Accents
    coral: '#f97316',
    coralLight: '#ffedd5',
    coralDark: '#ea580c',
    coralBorder: '#fdba74',

    teal: '#0d9488',
    tealLight: '#ccfbf1',
    tealDark: '#0f766e',
    tealBorder: '#5eead4',

    // Supporting Accents
    blue: '#2563eb',
    blueLight: '#dbeafe',
    purple: '#7c3aed',
    purpleLight: '#ede9fe',
    amber: '#d97706',
    amberLight: '#fef3c7',

    // Subtitles
    subtitleBg: 'rgba(15, 23, 42, 0.88)',
    subtitleText: '#f8fafc',
    subtitleHighlight: '#38bdf8',
    subtitleAccent: '#fb923c',
  },

  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },

  shadows: {
    subtle: '0 4px 12px rgba(15, 23, 42, 0.04)',
    card: '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
    elevated: '0 24px 48px -12px rgba(15, 23, 42, 0.14), 0 8px 24px -4px rgba(15, 23, 42, 0.08)',
    glowTeal: '0 0 24px rgba(13, 148, 136, 0.25)',
    glowCoral: '0 0 24px rgba(249, 115, 22, 0.25)',
  },

  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    pill: '9999px',
  },
} as const;

