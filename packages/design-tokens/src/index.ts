/**
 * Nova Impact Energy design tokens -- single source of truth.
 * Master Build Brief Section 1 / UI-UX Handoff Section 1.
 * Every app in the ecosystem imports from here. Never redefine a token locally.
 */
export const colors = {
  forest: '#0B3B37',
  mint: '#7FE3A8',
  yellow: '#F7E6A0',
  white: '#FFFFFF',
  text: '#0A2422',
  offwhite: '#F4F1E9',
  sage: '#5FA98A',
  teal: '#2C6B5F',
  border: '#E4E0D3',
  textOnDark: '#F4F1E9',
  mutedBg: '#EDEAE0',
  mutedText: '#7A8C86',
  error: '#B5533C',
} as const;

export const fontSans =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const space = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2.5rem',
  xl: '4rem',
  '2xl': '6rem',
} as const;

export const radius = {
  sm: '8px',
  md: '12px',
} as const;

export const layout = {
  contentMax: '1120px',
  sidePaddingDesktop: '48px',
  sidePaddingMobile: '20px',
} as const;

/**
 * Typography scale -- Master Build Brief Section 1 (Apple-verified values).
 * Two weights only: 400 (body) and 600 (everything with visual weight).
 * Sentence case everywhere -- enforced in copy, not in CSS.
 *
 * `fluid` is the CSS var name to reach for in components (`text-[length:var(--type-hero)]`
 * etc, defined in tokens.css) -- Apple's actual headline sizes scale continuously
 * with viewport width, not in two fixed steps, so every page's H1 uses this,
 * not just the home page hero.
 */
export const type = {
  hero: { desktop: '80px', mobile: '40px', weight: 600, letterSpacing: '-0.015em', lineHeight: 1.05, fluid: 'var(--type-hero)' },
  /** Phase 2 addition: same treatment as `hero`, capped smaller (32-56px)
   * for sentence-length H1 copy -- see tokens.css for the full rationale. */
  heroLong: { desktop: '56px', mobile: '32px', weight: 600, letterSpacing: '-0.015em', lineHeight: 1.05, fluid: 'var(--type-hero-long)' },
  h2: { desktop: '26px', mobile: '22px', weight: 600, letterSpacing: '-0.01em', lineHeight: 1.1, fluid: 'var(--type-h2)' },
  h3: { desktop: '17px', mobile: '15px', weight: 600, lineHeight: 1.3, fluid: 'var(--type-h3)' },
  body: { desktop: '17px', mobile: '16px', weight: 400, lineHeight: 1.5, fluid: 'var(--type-body)' },
  label: { desktop: '13px', mobile: '12px', weight: 600, letterSpacing: '0.3px', lineHeight: 1.3, fluid: 'var(--type-label)' },
  button: { desktop: '15px', mobile: '14px', weight: 600, fluid: 'var(--type-button)' },
} as const;

/** Motion -- Master Build Brief 9.8: used sparingly, state changes only. */
export const motion = {
  easeStandard: 'var(--ease-standard)',
  durationFast: 'var(--duration-fast)',
  durationBase: 'var(--duration-base)',
} as const;

export type StatusLive = 'live' | 'planned';
export type StatusActive = 'active' | 'latent';

/** Illustration sizes -- Master Build Brief Section 9.3. Never used outside these three. */
export type IllustrationSize = 'large' | 'medium' | 'small';
