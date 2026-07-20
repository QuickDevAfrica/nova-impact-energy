import type { IllustrationSize } from '@nova/design-tokens';

/**
 * Master Build Brief Section 9.3 -- every illustration ships in exactly
 * three fixed sizes. A component should never receive an illustration
 * sized outside these three; this wrapper is the single place that's
 * enforced, so no page can improvise a fourth size.
 */
const sizeClasses: Record<IllustrationSize, string> = {
  large: 'w-full max-w-[560px]',
  medium: 'w-full max-w-[220px]',
  small: 'w-8 h-8',
};

export function IllustrationFrame({
  size,
  children,
  className = '',
}: {
  size: IllustrationSize;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${sizeClasses[size]} ${className}`}>{children}</div>;
}
