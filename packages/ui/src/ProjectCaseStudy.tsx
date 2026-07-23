import type { ReactNode } from 'react';
import type { Project } from '@nova/content-model';

/**
 * Apple's two-column image-with-overlaid-headline card pattern: the photo
 * is the full tile background, title/location sit directly on top of it
 * (white text, dark gradient behind for legibility), rounded corners on
 * the whole tile.
 *
 * The problem/technicalApproach/results/testimonial case-study depth
 * (Ecosystem Review Section 3) and the "View case study" disclosure that
 * held it were removed by explicit instruction -- this component now only
 * renders the tile itself, nothing below it. Kept the name (rather than
 * renaming to e.g. ProjectTile) to avoid unnecessary churn on its one
 * caller, but it's no longer a "case study" component in the content
 * sense, just the project photo tile.
 */
export function ProjectCaseStudy({
  project,
  heroImageSlot,
}: {
  project: Pick<Project, 'title' | 'location' | 'featured'>;
  heroImageSlot?: ReactNode;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted-bg md:aspect-[16/9]">
      {heroImageSlot}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="mb-1 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em] text-white">{project.title}</h3>
        <p className="text-[length:var(--type-label)] font-semibold tracking-[0.3px] text-mint">{project.location}</p>
      </div>
    </div>
  );
}
