import Image from 'next/image';
import { Section, ProjectCard, StatStrip, Button, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { projectsQuery, siteSettingsQuery, proofPageQuery } from '@/lib/sanity.queries';
import { getDerivedStats, formatStatStrip } from '@/lib/getStats';
import { requireField } from '@/lib/requireField';
import { stripLeakedNucid } from '@nova/content-model';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Route renamed /impact -> /proof per Phase 2 task 2 (Platform Directory
 * naming). Also fixes a real Build Charter rule 2 violation found while
 * doing this rename: the page's headline and closing CTA were previously
 * hardcoded directly in this component rather than coming from Sanity --
 * they now come from the new `proofPage` singleton instead.
 */
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

interface ProofPageDoc {
  headline: string;
  closingCtaHeadline: string;
  closingCtaButtonLabel: string;
  closingCtaButtonHref: string;
}

export default async function ProofPage() {
  const [projects, settings, page] = await Promise.all([
    sanityClient.fetch<ProjectDoc[]>(projectsQuery),
    sanityClient.fetch<SiteSettingsDoc | null>(siteSettingsQuery),
    sanityClient.fetch<ProofPageDoc | null>(proofPageQuery),
  ]);

  requireField(projects, 'project (none found)');
  requireField(settings?.statesLabel, 'siteSettings.statesLabel');
  requireField(page, 'proofPage');
  requireField(page?.headline, 'proofPage.headline');
  requireField(page?.closingCtaHeadline, 'proofPage.closingCtaHeadline');
  requireField(page?.closingCtaButtonLabel, 'proofPage.closingCtaButtonLabel');
  requireField(page?.closingCtaButtonHref, 'proofPage.closingCtaButtonHref');

  const stats = await getDerivedStats(settings!.statesLabel);

  return (
    <>
      <Section tone="white">
        <Reveal>
          <h1 className="mb-8 text-[length:var(--type-hero)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.headline}
          </h1>
          <StatStrip stats={formatStatStrip(stats)} />
        </Reveal>
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
              <Reveal key={project.nucid}>
                <ProjectCard
                  project={safeProject}
                  imageSlot={
                    image ? (
                      <div className="relative h-full w-full">
                        <Image src={image.url} alt={safeAlt!} fill className="object-cover" />
                      </div>
                    ) : undefined
                  }
                />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="yellow">
        <Reveal className="text-center">
          <h2 className="mb-6 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.closingCtaHeadline}
          </h2>
          <Button href={page!.closingCtaButtonHref} variant="secondary">
            {page!.closingCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
