import Image from 'next/image';
import { Button } from './Button';

/**
 * Homepage content-standard redesign -- Apple's full-width product-section
 * pattern: one large image, text sitting directly on top of it (no card,
 * no padding gutter around the image itself), large headline, one short
 * line of body copy, a single CTA. Used for the ENOVA feature (Section 4)
 * and the "Engineering that lasts" full-bleed section (Section 7).
 *
 * Falls back to a neutral gray/black placeholder fill when `imageSrc` is
 * omitted (not brand green -- client feedback after the first preview:
 * too much dark green across the page).
 */
export function FullBleedFeature({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  heightClass = 'h-[440px] md:h-[560px]',
  rounded = true,
  imageSrc,
  imageAlt,
}: {
  eyebrow?: string;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heightClass?: string;
  rounded?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-muted-bg ${rounded ? 'rounded-[32px]' : ''} ${heightClass}`}
    >
      {imageSrc && (
        <Image src={imageSrc} alt={imageAlt ?? ''} fill className="object-cover" />
      )}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.78) 100%)' }}
      />
      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-8 md:p-14">
        {eyebrow && (
          <span className="text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] text-light-mint">
            {eyebrow}
          </span>
        )}
        <h2 className="max-w-[560px] text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em] text-white">
          {headline}
        </h2>
        {body && <p className="max-w-[480px] text-[length:var(--type-body)] leading-normal text-text-on-dark">{body}</p>}
        {ctaLabel && ctaHref && (
          <Button href={ctaHref} variant="primary" className="mt-2">
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
