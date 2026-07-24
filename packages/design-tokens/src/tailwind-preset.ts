import type { Config } from 'tailwindcss';
import { colors, space, radius, layout } from './index';

/**
 * Shared Tailwind preset -- every app in the ecosystem extends this,
 * never redefines its own color/spacing scale (Build Charter constitution, rule 3).
 */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        forest: colors.forest,
        mint: colors.mint,
        yellow: colors.yellow,
        offwhite: colors.offwhite,
        sage: colors.sage,
        teal: colors.teal,
        soft: colors.soft,
        'light-mint': colors.lightMint,
        border: colors.border,
        'card-border': colors.cardBorder,
        'nova-text': colors.text,
        'text-on-dark': colors.textOnDark,
        'muted-bg': colors.mutedBg,
        'muted-text': colors.mutedText,
        error: colors.error,
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        xs: space.xs,
        sm: space.sm,
        md: space.md,
        lg: space.lg,
        xl: space.xl,
        '2xl': space['2xl'],
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
      },
      maxWidth: {
        content: layout.contentMax,
      },
    },
  },
};

export default preset;
