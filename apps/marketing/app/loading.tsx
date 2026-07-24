import { Logo } from '@nova/ui';

/**
 * Next.js route-level loading UI (App Router convention -- shown
 * automatically as a Suspense fallback during navigation/data fetches,
 * no wiring needed elsewhere). Brand mark, centered, 72px, fades in
 * smoothly (see .nova-loading-logo in globals.css) per the brand guide.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Logo heightPx={72} className="nova-loading-logo h-[72px]" />
    </div>
  );
}
