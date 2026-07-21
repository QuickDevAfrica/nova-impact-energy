import type { ReactNode } from 'react';

/**
 * Apple-pattern small icon tile -- the row of compact square tiles Apple
 * uses for Arcade/Fitness+/Music/TV+/Podcasts under a heavier feature
 * section. Used for the Ecosystem section's remaining (non-featured)
 * Platforms -- every one still real (Content OS Platform record, status
 * always shown), just given a lighter-weight treatment than the two
 * featured Tiles above it. Not a link -- there's nowhere real to send
 * someone yet for a planned platform, and pretending otherwise would be
 * the kind of overclaiming this whole build has avoided everywhere else.
 */
export function MiniTile({ label, illustration }: { label: string; illustration?: ReactNode }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-md border border-border bg-white p-4 text-center opacity-80">
      {illustration && <div className="h-10 w-10">{illustration}</div>}
      <span className="text-[length:var(--type-label)] font-semibold leading-tight">{label}</span>
    </div>
  );
}
