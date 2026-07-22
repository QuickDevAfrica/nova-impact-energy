import type { Solution } from '@nova/content-model';
import { Card } from './Card';
import { Button } from './Button';
import { IllustrationFrame } from './IllustrationFrame';
import type { ReactNode } from 'react';

/**
 * Phase 2 correction: no badge, no muted/grayscale treatment, no status-
 * gated CTA -- every Solution card renders with identical visual weight
 * regardless of `status`. The field itself is untouched in the CMS; only
 * the rendering changed (explicit instruction, confirmed).
 */
export function SolutionCard({
  solution,
  illustration,
  ctaLabelOverride,
  ctaHrefOverride,
}: {
  solution: Pick<Solution, 'name' | 'painPoint' | 'ctaLabel' | 'ctaLink' | 'status'>;
  illustration?: ReactNode;
  /** Used on the Home page teaser, where the card should link to the
   * Services page anchor (/services#slug) rather than the Solution's own
   * ctaLabel/ctaLink (which points to Contact) -- same object, different
   * context, Content OS Law 3. Falls back to solution.ctaLabel/ctaLink
   * when omitted (e.g. on the Services page itself). */
  ctaLabelOverride?: string;
  ctaHrefOverride?: string;
}) {
  const ctaLabel = ctaLabelOverride ?? solution.ctaLabel;
  const ctaHref = ctaHrefOverride ?? solution.ctaLink;
  return (
    <Card tone="offwhite">
      {illustration && (
        <IllustrationFrame size="medium" className="mb-4">
          {illustration}
        </IllustrationFrame>
      )}
      <h3 className="mb-2 text-[length:var(--type-h3)] font-semibold">{solution.name}</h3>
      {solution.painPoint && <p className="mb-4 text-[length:var(--type-body)] leading-normal">{solution.painPoint}</p>}
      <Button href={ctaHref} variant="primary">
        {ctaLabel}
      </Button>
    </Card>
  );
}
