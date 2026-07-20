import type { ReactNode } from 'react';

/** UI-UX Handoff 4.3. White or off-white, 12px radius, 28px padding. */
export function Card({
  children,
  tone = 'white',
  className = '',
  muted = false,
}: {
  children: ReactNode;
  tone?: 'white' | 'offwhite';
  className?: string;
  muted?: boolean;
}) {
  const bg = tone === 'white' ? 'bg-white border border-border' : 'bg-offwhite';
  return (
    <div className={`rounded-md p-7 ${bg} ${muted ? 'opacity-60 grayscale-[30%]' : ''} ${className}`}>
      {children}
    </div>
  );
}
