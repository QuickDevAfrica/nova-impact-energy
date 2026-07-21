import type { ReactNode } from 'react';
import type { Project } from '@nova/content-model';

/**
 * Full case-study treatment for a Project -- Ecosystem Review Section 3:
 * "the problem, the technical approach, multiple images (not one), the
 * specific results, and, once available, a client quote." Replaces the
 * compact ProjectCard on the Proof page specifically; ProjectCard stays
 * available for anywhere a smaller summary card is wanted later.
 *
 * Every section below renders conditionally -- a project with no
 * testimonial yet simply omits that block rather than showing an empty
 * one, matching the honest "once available" framing in the Roadmap
 * rather than implying content that doesn't exist yet.
 */
export function ProjectCaseStudy({
  project,
  imagesSlot,
}: {
  project: Pick<
    Project,
    'title' | 'location' | 'scope' | 'problem' | 'technicalApproach' | 'results' | 'testimonial' | 'featured'
  > & { capacityKw?: number; storageKwh?: number };
  imagesSlot?: ReactNode;
}) {
  const specs = [
    project.capacityKw ? `${project.capacityKw}kW inverter capacity` : null,
    project.storageKwh ? `${project.storageKwh}kWh battery storage` : null,
  ].filter(Boolean) as string[];

  return (
    <div className={`overflow-hidden rounded-md border border-border bg-white ${project.featured ? 'md:col-span-2' : ''}`}>
      {imagesSlot}
      <div className="p-7 md:p-10">
        <div className="mb-6">
          <h3 className="mb-1 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{project.title}</h3>
          <p className="text-[length:var(--type-label)] font-semibold tracking-[0.3px] text-teal">{project.location}</p>
        </div>

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
          <blockquote className="border-l-2 border-teal pl-4 text-[length:var(--type-body)] italic leading-normal text-muted-text">
            &ldquo;{project.testimonial}&rdquo;
          </blockquote>
        )}
      </div>
    </div>
  );
}
