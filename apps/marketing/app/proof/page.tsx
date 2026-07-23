import Image from 'next/image';
import { Section, ProjectCaseStudy, Button, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { projectsQuery, proofPageQuery } from '@/lib/sanity.queries';
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
 * Phase 2 redesign: each project renders as Apple's overlay-card pattern --
 * the first image is the tile's full background with title/location
 * overlaid on a gradient, rounded corners on the whole tile. The
 * problem/technicalApproach/results/testimonial case-study depth added in
 * task 6 (Ecosystem Review Section 3) and the "View case study" expandable
 * disclosure that held it were removed by explicit instruction -- the tile
 * itself is the only thing rendered now, just the photo and the overlaid
 * title/location text.
 *
 * Phase 2 hero rework (explicit instruction): the numeric StatStrip (4
 * projects / 163kW+ / 260kWh / Lagos & Ogun States) is removed from this
 * page's hero -- replaced with qualitative headline/body copy instead. The
 * derived-stats infrastructure (getStats.ts) is untouched and still powers
 * the Home page's own Proof-preview StatStrip; only this page's copy
 * dropped it. Closing CTA also replaced: a headline + subtext + a link
 * back to /solutions instead of the previous "Get in touch" button to
 * /contact.
 */
interface ProjectDoc {
  nucid: string;
  title: string;
  location: string;
  featured: boolean;
  order: number;
  images?: { url: string; alt: string; isPlaceholder: boolean }[];
}

interface ProofPageDoc {
  headline: string;
  bodyText?: string;
  growingLine?: string;
  closingCtaHeadline: string;
  closingCtaSubtext?: string;
  closingCtaButtonLabel: string;
  closingCtaButtonHref: string;
}

export default async function ProofPage() {
  const [projects, page] = await Promise.all([
    sanityClient.fetch<ProjectDoc[]>(projectsQuery),
    sanityClient.fetch<ProofPageDoc | null>(proofPageQuery),
  ]);

  requireField(projects, 'project (none found)');
  requireField(page, 'proofPage');
  requireField(page?.headline, 'proofPage.headline');
  requireField(page?.bodyText, 'proofPage.bodyText');
  requireField(page?.growingLine, 'proofPage.growingLine');
  requireField(page?.closingCtaHeadline, 'proofPage.closingCtaHeadline');
  requireField(page?.closingCtaButtonLabel, 'proofPage.closingCtaButtonLabel');
  requireField(page?.closingCtaButtonHref, 'proofPage.closingCtaButtonHref');

  return (
    <>
      <Section tone="white">
        <Reveal className="mx-auto max-w-[640px] text-center">
          {/* Sentence-length copy -- --type-hero-long, same reasoning as
              the Home hero. Font tokens unchanged throughout this rework --
              only the copy (and the removed StatStrip) changed. */}
          <h1 className="mb-6 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.headline}
          </h1>
          <p className="mb-4 text-[length:var(--type-body)] leading-normal">{page!.bodyText}</p>
          {/* Matches the closing CTA headline's size (--type-h2), per
              explicit instruction -- same token, not a new one-off size. */}
          <p className="text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.growingLine}</p>
        </Reveal>
      </Section>

      {/* White, not forest -- explicit instruction. This does mean the
          hero section above and this one are both light/white back to
          back, which departs from the strict dark/light alternation rule
          (UI-UX Handoff Section 3); noted here since it's a deliberate,
          explicit override rather than an oversight. */}
      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const images = project.images ?? [];
            const heroImage = images[0];
            // Build Charter rule 6: NUCIDs never reach user-facing copy.
            // Strip one here in case it was typed into a CMS text field
            // (alt text, title) -- don't just rely on editors remembering.
            const safeProject = { ...project, title: stripLeakedNucid(project.title) };
            return (
              <Reveal key={project.nucid} className={project.featured ? 'md:col-span-2' : ''}>
                <ProjectCaseStudy
                  project={safeProject}
                  heroImageSlot={
                    heroImage ? (
                      <Image src={heroImage.url} alt={stripLeakedNucid(heroImage.alt)} fill className="object-cover" priority />
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
          <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.closingCtaHeadline}
          </h2>
          {page!.closingCtaSubtext && <p className="mb-6 text-[length:var(--type-body)] leading-normal">{page!.closingCtaSubtext}</p>}
          <Button href={page!.closingCtaButtonHref} variant="primary">
            {page!.closingCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
