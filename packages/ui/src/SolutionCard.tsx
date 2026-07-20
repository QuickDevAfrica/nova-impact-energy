import type { Solution } from '@nova/content-model';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { IllustrationFrame } from './IllustrationFrame';
import type { ReactNode } from 'react';

/**
 * Content OS-to-UI Process, Step 2 table: "Solution -> Solution card
 * (live or coming-soon variant)". `status` alone decides the treatment --
 * never a per-page decision.
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
  const isLive = solution.status === 'live';
  const ctaLabel = ctaLabelOverride ?? solution.ctaLabel;
  const ctaHref = ctaHrefOverride ?? solution.ctaLink;
  return (
    <Card tone="offwhite" muted={!isLive}>
      {illustration && (
        <IllustrationFrame size="medium" className="mb-4">
          {illustration}
        </IllustrationFrame>
      )}
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-[15px] md:text-[17px] font-semibold">{solution.name}</h3>
        {!isLive && <StatusBadge label="Coming soon" />}
      </div>
      {solution.painPoint && <p className="mb-4 text-[16px] leading-normal md:text-[17px]">{solution.painPoint}</p>}
      {isLive ? (
        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
      ) : (
        <span className="text-[13px] font-semibold text-muted-text">Not yet available</span>
      )}
    </Card>
  );
}
