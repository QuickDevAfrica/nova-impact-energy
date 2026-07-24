/**
 * Homepage content-standard redesign -- premium equal-height card: large
 * illustration, small heading, one sentence, CTA. Used for Section 3's
 * three "What we do today" cards (large, dark) and Section 4's four
 * platform mini-cards (small, light, no illustration/CTA -- Apple's
 * lighter-weight row under a heavier feature, e.g. Arcade/Fitness+/Music
 * under a bigger product tile).
 *
 * Distinct from FeatureCard (Solutions page) and AboutCard (About page)
 * rather than reusing either -- each page's cards were given their own
 * explicit sizing/radius, and forcing one shared component to serve all
 * three would mean fighting Tailwind class-order specificity to override
 * radius/padding per page. Cards on dark sections use a translucent white
 * fill (bg-white/[0.06]) rather than a new brand color, per the "never
 * introduce a color outside the token system" rule.
 */
export function HomeCard({
  headline,
  body,
  ctaLabel,
  ctaHref,
  tone = 'dark',
  size = 'large',
}: {
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: 'dark' | 'light';
  size?: 'large' | 'small';
}) {
  const toneClasses =
    tone === 'dark' ? 'bg-white/[0.06] text-white' : 'bg-white text-nova-text border border-card-border';
  const ctaClasses = tone === 'dark' ? 'text-mint' : 'text-teal';

  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-[32px] ${toneClasses}`}>
      {size === 'large' && (
        // illustration placeholder -- see comment at call site for the
        // reserved filename; reserves the exact aspect ratio for later
        <div className={`aspect-[4/3] ${tone === 'dark' ? 'bg-white/[0.06]' : 'bg-muted-bg'}`} aria-hidden="true" />
      )}
      <div className={`flex flex-1 flex-col gap-2 ${size === 'large' ? 'p-8' : 'p-6'}`}>
        <h3 className="text-[length:var(--type-h3)] font-semibold">{headline}</h3>
        <p className={`text-[length:var(--type-body)] leading-normal ${tone === 'dark' ? 'text-text-on-dark' : ''}`}>{body}</p>
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className={`mt-2 inline-flex w-fit items-center text-[length:var(--type-button)] font-semibold no-underline hover:underline ${ctaClasses}`}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
