import type { Platform } from '@nova/content-model';
import { Card } from './Card';
import { IllustrationFrame } from './IllustrationFrame';
import type { ReactNode } from 'react';

/**
 * Phase 2 correction: no badge, no muted/grayscale treatment -- every
 * Ecosystem card renders with identical visual weight regardless of
 * `status`. The field itself is untouched in the CMS; only the rendering
 * changed (explicit instruction, confirmed).
 */
export function EcosystemCard({
  platform,
  illustration,
}: {
  platform: Pick<Platform, 'name' | 'purpose' | 'status'>;
  illustration?: ReactNode;
}) {
  return (
    <Card tone="white">
      {illustration && (
        <IllustrationFrame size="medium" className="mb-4">
          {illustration}
        </IllustrationFrame>
      )}
      <h3 className="mb-2 text-[length:var(--type-h3)] font-semibold">{platform.name}</h3>
      {platform.purpose && <p className="text-[length:var(--type-body)] leading-normal">{platform.purpose}</p>}
    </Card>
  );
}
