import type { Project } from '@nova/content-model';

/** UI-UX Handoff 5.4: bank branch card can be visually larger/featured
 * (2-column span); others in a standard grid. Driven by `featured`,
 * never a hardcoded "first card is big" assumption. */
export function ProjectCard({
  project,
  imageSlot,
}: {
  project: Pick<Project, 'title' | 'location' | 'scope' | 'featured'>;
  imageSlot?: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-border bg-white ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {imageSlot && <div className="aspect-[16/9] w-full bg-offwhite">{imageSlot}</div>}
      <div className="p-7">
        <h3 className="mb-1 text-[length:var(--type-h3)] font-semibold">{project.title}</h3>
        <p className="mb-2 text-[length:var(--type-label)] font-semibold tracking-[0.3px] text-teal">{project.location}</p>
        <p className="text-[length:var(--type-body)] leading-normal">{project.scope}</p>
      </div>
    </div>
  );
}
