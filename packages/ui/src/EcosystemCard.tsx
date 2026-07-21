import type { Platform } from '@nova/content-model';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { IllustrationFrame } from './IllustrationFrame';
import type { ReactNode } from 'react';

/** Content OS-to-UI Process Step 2: "Platform -> Ecosystem card (always
 * 'planned' today)". No Platform is live yet -- this must stay accurate
 * automatically until one actually ships, never hand-maintained. */
export function EcosystemCard({
  platform,
  illustration,
}: {
  platform: Pick<Platform, 'name' | 'purpose' | 'status'>;
  illustration?: ReactNode;
}) {
  const isLive = platform.status === 'live';
  return (
    <Card tone="white" muted={!isLive}>
      {illustration && (
        <IllustrationFrame size="medium" className="mb-4">
          {illustration}
        </IllustrationFrame>
      )}
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-[length:var(--type-h3)] font-semibold">{platform.name}</h3>
        <StatusBadge label={isLive ? 'Live' : 'Planned'} />
      </div>
      {platform.purpose && <p className="text-[length:var(--type-body)] leading-normal">{platform.purpose}</p>}
    </Card>
  );
}
