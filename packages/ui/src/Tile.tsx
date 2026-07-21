import type { ReactNode } from 'react';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';

/**
 * Apple-pattern product tile -- large rounded panel, alternating dark/light,
 * headline + short body + CTA over an illustration/image area that fills
 * the rest of the tile. Used for the Home page's Solutions and featured
 * Ecosystem tiles (Phase 2 visual-system rework). Every tile here maps to
 * a real Nova content object (a live Solution or a real Platform) -- never
 * an invented placeholder tile, unlike apple.com's literal product catalog.
 */
export function Tile({
  tone,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  muted = false,
  illustration,
  className = '',
}: {
  tone: 'dark' | 'light';
  eyebrow?: string;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  muted?: boolean;
  illustration?: ReactNode;
  className?: string;
}) {
  const toneClasses = tone === 'dark' ? 'bg-forest text-white' : 'bg-white text-nova-text border border-border';

  return (
    <div className={`flex flex-col overflow-hidden rounded-md ${toneClasses} ${muted ? 'opacity-70' : ''} ${className}`}>
      <div className="flex flex-col items-center gap-3 px-8 pt-10 text-center md:px-10 md:pt-12">
        {eyebrow && (
          <span
            className={`text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] ${
              tone === 'dark' ? 'text-mint' : 'text-teal'
            }`}
          >
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-2">
          <h3 className="text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{headline}</h3>
          {muted && <StatusBadge label="Planned" />}
        </div>
        {body && (
          <p className={`max-w-[420px] text-[length:var(--type-body)] leading-normal ${tone === 'dark' ? 'text-text-on-dark' : ''}`}>
            {body}
          </p>
        )}
        {ctaLabel && ctaHref && !muted && (
          <Button href={ctaHref} variant={tone === 'dark' ? 'primary' : 'secondary'} className="mt-2">
            {ctaLabel}
          </Button>
        )}
      </div>
      {illustration && <div className="mt-8 flex-1">{illustration}</div>}
    </div>
  );
}
