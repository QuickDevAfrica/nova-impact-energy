import Image from 'next/image';
import { Section, ProjectCaseStudy, StatStrip, Button, Reveal } from '@nova/ui';
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
 *
 * Phase 2 task 6 (Ecosystem Review Section 3): each project now renders as
 * a full case study (problem, technical approach, results, testimonial
 * where available) via ProjectCaseStudy instead of the compact ProjectCard.
 * The image gallery renders every image on the project, not just the
 * first -- "multiple images (not one)" -- but still honestly shows
 * whatever number of real images actually exist rather than padding with
 * placeholders.
 */
interface ProjectDoc {
  nucid: string;
  title: string;
  location: string;
  scope: string;
  problem?: string;
  technicalApproach?: string;
  results?: string;
  testimonial?: string;
  capacityKw?: number;
  storageKwh?: number;
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
          {/* Sentence-length copy -- --type-hero-long, same reasoning as
              the Home hero. */}
          <h1 className="mb-8 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.headline}
          </h1>
          <StatStrip stats={formatStatStrip(stats)} />
        </Reveal>
      </Section>

      {/* Forest (dark), not offwhite: ProjectCaseStudy cards are fully
          self-contained (own bg-white + explicit text colors), so they
          render fine on a dark section -- and this keeps the required
          dark/light alternation, since the headline/stats section above
          and the closing CTA below both need to stay light (StatStrip's
          colors are spec-locked to light backgrounds; yellow is button-
          fill only, never a section background -- see Section.tsx). */}
      <Section tone="forest">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const images = project.images ?? [];
            // Build Charter rule 6: NUCIDs never reach user-facing copy.
            // Strip one here in case it was typed into a CMS text field
            // (alt text, title) -- don't just rely on editors remembering.
            const safeProject = { ...project, title: stripLeakedNucid(project.title) };
            return (
              <Reveal key={project.nucid} className={project.featured ? 'md:col-span-2' : ''}>
                <ProjectCaseStudy
                  project={safeProject}
                  imagesSlot={
                    images.length > 0 ? (
                      <div className={`grid gap-1 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {images.map((image, i) => (
                          <div key={image.url} className="relative aspect-[16/9] w-full bg-offwhite">
                            <Image src={image.url} alt={stripLeakedNucid(image.alt)} fill className="object-cover" priority={i === 0} />
                          </div>
                        ))}
                      </div>
                    ) : undefined
                  }
                />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="offwhite">
        <Reveal className="text-center">
          <h2 className="mb-6 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.closingCtaHeadline}
          </h2>
          <Button href={page!.closingCtaButtonHref} variant="primary">
            {page!.closingCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
