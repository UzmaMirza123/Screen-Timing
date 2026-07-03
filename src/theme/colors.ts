/**
 * FocusLock AI — colour tokens.
 * Pulled to match the dark, glowing "Screen-Time" onboarding design.
 */

export const colors = {
  // Backdrop (dark navy → near-black, with a violet glow behind heroes)
  bgTop: '#161226',
  bgMid: '#0C0A14',
  bgBottom: '#080610',
  heroGlow: '#5B3FA6',

  // Brand violet
  violet: '#8B5CF6',
  violetLight: '#A78BFA',
  violetDeep: '#6D28D9',

  // Primary CTA gradient (periwinkle → lilac → pink)
  ctaGradient: ['#8385F0', '#B692EA', '#D6A5E2'] as const,

  // Page-dot active gradient
  dotGradient: ['#7C7BF2', '#9B7BEE'] as const,

  // Text
  textPrimary: '#FFFFFF',
  textTitle: '#F5F3FA',
  textSecondary: '#928EA3',
  textMuted: '#6E6A7D',
  textFaint: '#57536A',

  // Surfaces
  card: '#17141F',
  cardSolid: '#1B1826',
  cardBorder: 'rgba(255,255,255,0.07)',
  cardBorderStrong: 'rgba(255,255,255,0.12)',
  iconWell: '#221C33',

  // Accent tints (icon wells / stat cards)
  green: '#34D399',
  greenTintBg: 'rgba(52,211,153,0.10)',
  greenTintBorder: 'rgba(52,211,153,0.22)',

  blue: '#60A5FA',
  blueTintBg: 'rgba(96,165,250,0.10)',
  blueTintBorder: 'rgba(96,165,250,0.22)',

  cyan: '#4ECDC4',

  red: '#F87171',
  redTintBg: 'rgba(239,68,68,0.12)',
  redTintBorder: 'rgba(239,68,68,0.28)',

  yellow: '#E4C05B',
  yellowTintBg: 'rgba(202,169,64,0.12)',
  yellowTintBorder: 'rgba(202,169,64,0.28)',

  orange: '#FB923C',
  orangeTintBg: 'rgba(251,146,60,0.12)',
  orangeTintBorder: 'rgba(251,146,60,0.26)',

  violetTintBg: 'rgba(139,92,246,0.14)',
  violetTintBorder: 'rgba(139,92,246,0.30)',

  // Brand app icon fills
  instagram: ['#F58529', '#DD2A7B', '#8134AF'] as const,
  snapchat: '#FFFC00',
  music: '#20343B',
  musicGlyph: '#4ECDC4',
  x: '#1DA1F2',
  youtube: '#FF0000',
  facebook: '#1877F2',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
