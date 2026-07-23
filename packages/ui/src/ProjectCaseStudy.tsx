import type { ReactNode } from 'react';
import type { Project } from '@nova/content-model';

/**
 * Phase 2 redesign -- Apple's two-column image-with-overlaid-headline card
 * pattern: the photo is the full tile background, title/location sit
 * directly on top of it (white text, dark gradient behind for legibility),
 * rounded corners on the whole tile. The case-study depth (problem/
 * technical approach/results/testimonial -- Ecosystem Review Section 3)
 * moves to an expandable <details> block below the tile instead of a
 * dense text block stacked under the photo -- native disclosure, no
 * client-side JS needed since this page is a server component.
 *
 * Component doesn't import next/image itself (packages/ui has no Next
 * dependency, by design -- apps/marketing does the actual <Image>
 * rendering and passes it in as a slot); this component only owns the
 * layout, gradient overlay, and text positioning around whatever image
 * element the page hands it.
 */
export function ProjectCaseStudy({
  project,
  heroImageSlot,
  galleryImagesSlot,
}: {
  project: Pick<
    Project,
    'title' | 'location' | 'scope' | 'problem' | 'technicalApproach' | 'results' | 'testimonial' | 'featured'
  > & { capacityKw?: number; storageKwh?: number };
  heroImageSlot?: ReactNode;
  galleryImagesSlot?: ReactNode;
}) {
  const specs = [
    project.capacityKw ? `${project.capacityKw}kW inverter capacity` : null,
    project.storageKwh ? `${project.storageKwh}kWh battery storage` : null,
  ].filter(Boolean) as string[];

  const hasCaseStudy = Boolean(project.problem || project.technicalApproach || project.results || project.testimonial);

  return (
    <div>
      {/* Overlay tile -- photo as background, gradient + text on top.
          The md:col-span-2 for featured projects is applied by the parent
          Reveal wrapper (the actual CSS grid item), not here. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted-bg md:aspect-[16/9]">
        {heroImageSlot}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h3 className="mb-1 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em] text-white">{project.title}</h3>
          <p className="text-[length:var(--type-label)] font-semibold tracking-[0.3px] text-mint">{project.location}</p>
        </div>
      </div>

      {/* Case study depth -- expandable, not stacked under the tile by
          default. Only rendered at all if there's something to expand
          into (scope alone always exists, but a details block with just
          the scope sentence and nothing else isn't worth the disclosure
          affordance). */}
      <details className="group mt-3 rounded-md border border-border bg-white open:pb-6">
        <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-[length:var(--type-button)] font-semibold text-nova-text">
          <span>View case study</span>
          <span className="text-muted-text transition-transform group-open:rotate-180" aria-hidden="true">
            ▾
          </span>
        </summary>
        <div className="px-6">
          <p className="mb-6 text-[length:var(--type-body)] leading-normal">{project.scope}</p>

          {project.problem && (
            <div className="mb-6">
              <h4 className="mb-2 text-[length:var(--type-label)] font-semibold uppercase tracking-[0.3px] text-muted-text">
                The problem
              </h4>
              <p className="text-[length:var(--type-body)] leading-normal">{project.problem}</p>
            </div>
          )}

          {project.technicalApproach && (
            <div className="mb-6">
              <h4 className="mb-2 text-[length:var(--type-label)] font-semibold uppercase tracking-[0.3px] text-muted-text">
                Technical approach
              </h4>
              <p className="mb-2 text-[length:var(--type-body)] leading-normal">{project.technicalApproach}</p>
              {specs.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full bg-offwhite px-3 py-1 text-[length:var(--type-label)] font-semibold text-muted-text"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {project.results && (
            <div className="mb-6">
              <h4 className="mb-2 text-[length:var(--type-label)] font-semibold uppercase tracking-[0.3px] text-muted-text">
                Results
              </h4>
              <p className="text-[length:var(--type-body)] leading-normal">{project.results}</p>
            </div>
          )}

          {project.testimonial && (
            <blockquote className="mb-6 border-l-2 border-teal pl-4 text-[length:var(--type-body)] italic leading-normal text-muted-text">
              &ldquo;{project.testimonial}&rdquo;
            </blockquote>
          )}

          {galleryImagesSlot}

          {!hasCaseStudy && (
            <p className="text-[length:var(--type-body)] italic leading-normal text-muted-text">
              Full case study details coming soon.
            </p>
          )}
        </div>
      </details>
    </div>
  );
}
