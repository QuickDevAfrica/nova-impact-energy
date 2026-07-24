import { Button } from './Button';

/**
 * Homepage Section 8 -- Apple's split full-bleed product pair: two equal
 * cards, each a full-bleed background image with text overlaid directly
 * on it (no padding gutter around the image). Fixed at exactly two cards
 * -- this is a layout pattern, not a generic grid.
 */
export interface SplitCardContent {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function SplitCards({
  cards,
  heightClass = 'h-[420px] md:h-[520px]',
}: {
  /** Always exactly 2 -- enforced by the CMS schema (min/max 2); typed as
   * an array rather than a tuple so callers don't need an `as [X, X]` cast
   * on data coming back from a GROQ query. */
  cards: SplitCardContent[];
  heightClass?: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.slice(0, 2).map((card) => (
        <div
          key={card.headline}
          className={`relative overflow-hidden rounded-[32px] bg-white/[0.06] ${heightClass}`}
        >
          {/* full-bleed image placeholder -- see comment at call site for
              the reserved filename */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(180deg, rgba(18,61,54,0) 40%, rgba(18,61,54,0.9) 100%)' }}
          />
          <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-8">
            <h3 className="text-[length:var(--type-h2)] font-semibold tracking-[-0.01em] text-white">{card.headline}</h3>
            <p className="max-w-[360px] text-[length:var(--type-body)] leading-normal text-text-on-dark">{card.body}</p>
            <Button href={card.ctaHref} variant="primary" className="mt-2 w-fit">
              {card.ctaLabel}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
