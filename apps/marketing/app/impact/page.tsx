import Image from 'next/image';
import { Section, ProjectCard, StatStrip, Button } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { projectsQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import { getDerivedStats, formatStatStrip } from '@/lib/getStats';
import { requireField } from '@/lib/requireField';
import { stripLeakedNucid } from '@nova/content-model';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface ProjectDoc {
  nucid: string;
  title: string;
  location: string;
  scope: string;
  featured: boolean;
  order: number;
  images?: { url: string; alt: string; isPlaceholder: boolean }[];
}

interface SiteSettingsDoc {
  statesLabel: string;
}

export default async function ImpactPage() {
  const [projects, settings] = await Promise.all([
    sanityClient.fetch<ProjectDoc[]>(projectsQuery),
    sanityClient.fetch<SiteSettingsDoc | null>(siteSettingsQuery),
  ]);

  requireField(projects, 'project (none found)');
  requireField(settings?.statesLabel, 'siteSettings.statesLabel');

  const stats = await getDerivedStats(settings!.statesLabel);

  return (
    <>
      <Section tone="white">
        <h1 className="mb-8 text-[32px] font-semibold md:text-[40px]">What we&apos;ve actually built, so far.</h1>
        <StatStrip stats={formatStatStrip(stats)} />
      </Section>

      <Section tone="offwhite">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const image = project.images?.[0];
            // Build Charter rule 6: NUCIDs never reach user-facing copy.
            // Strip one here in case it was typed into a CMS text field
            // (alt text, title) -- don't just rely on editors remembering.
            const safeProject = { ...project, title: stripLeakedNucid(project.title) };
            const safeAlt = image ? stripLeakedNucid(image.alt) : undefined;
            return (
              <ProjectCard
                key={project.nucid}
                project={safeProject}
                imageSlot={
                  image ? (
                    <div className="relative h-full w-full">
                      <Image src={image.url} alt={safeAlt!} fill className="object-cover" />
                    </div>
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </Section>

      <Section tone="yellow">
        <div className="text-center">
          <h2 className="mb-6 text-[22px] font-semibold md:text-[26px]">
            Want your project to be the next one here?
          </h2>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </Section>
    </>
  );
}
