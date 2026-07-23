import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, Button, Reveal, ValuesSection, FeatureCard } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { servicesPageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Route renamed /services -> /solutions per Phase 2 instruction (task 2),
 * following the Platform Directory's naming over the older Master Build
 * Brief/UI-UX Handoff naming. The underlying Sanity schema type is still
 * `servicesPage` -- renaming that would mean migrating the live document
 * (this build can't reach the Sanity API to run a migration), and NUCIDs/
 * schema type names are internal-only per Build Charter rule 6 anyway, so
 * nothing user-facing is affected by keeping the internal name as-is.
 *
 * Content-standard redesign (explicit instruction): closer to Apple's
 * communication style -- fewer words, stronger headlines, benefit-driven
 * copy, one idea per section, every section ends with a CTA. Layout
 * structure is not rebuilt from scratch, but reworked:
 *   1. Hero -- new headline + one body paragraph (previously headline
 *      only). The former Values-section headline/body moved up into here.
 *   2. Values 3-column row -- same layout, shorter copy, titles as their
 *      own line instead of an inline lead-in.
 *   3/4. Each Solution -- name + new tagline + shorter body + CTA, then a
 *      "What you'll gain" equal-card grid (was "How it works" as a
 *      numbered list) built from the same processSteps field. FAQ section
 *      removed entirely, on both Solutions and site-wide on this page.
 *   5. New: a Platforms section (5 featured Platform documents as equal
 *      cards), introducing the ecosystem beyond the two live Solutions.
 *   6. New: a closing CTA -- this page didn't have one before.
 * FeatureCard's icon placeholder reserves the correct aspect ratio for a
 * real icon later rather than waiting on final illustrations (explicit
 * instruction).
 */
interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceSolution {
  nucid: string;
  name: string;
  tagline?: string;
  slug: string;
  summaryText: PortableTextBlock[];
  ctaLabel: string;
  ctaLink: string;
  status: 'live' | 'planned';
  processSteps?: ProcessStep[];
}

interface ValueColumn {
  leadIn: string;
  bodyText: string;
  linkLabel: string;
  linkHref: string;
}

interface FeaturedPlatform {
  nucid: string;
  name: string;
  purpose?: string;
}

interface ServicesPageDoc {
  introText: string;
  introBody?: string;
  valuesColumns: ValueColumn[];
  platformsHeadline?: string;
  platformsBody?: string;
  featuredPlatforms?: FeaturedPlatform[];
  closingCtaHeadline?: string;
  closingCtaBody?: string;
  closingCtaButtonLabel?: string;
  closingCtaButtonHref?: string;
  featuredSolutions: ServiceSolution[];
}

export default async function SolutionsPage() {
  const page = await sanityClient.fetch<ServicesPageDoc | null>(servicesPageQuery);

  requireField(page, 'servicesPage');
  requireField(page?.introText, 'servicesPage.introText');
  requireField(page?.introBody, 'servicesPage.introBody');
  requireField(page?.valuesColumns, 'servicesPage.valuesColumns');
  requireField(page?.featuredSolutions, 'servicesPage.featuredSolutions');
  requireField(page?.platformsHeadline, 'servicesPage.platformsHeadline');
  requireField(page?.featuredPlatforms, 'servicesPage.featuredPlatforms');
  requireField(page?.closingCtaHeadline, 'servicesPage.closingCtaHeadline');
  requireField(page?.closingCtaButtonLabel, 'servicesPage.closingCtaButtonLabel');

  return (
    <>
      {/* Section 1 -- hero: headline + one body paragraph */}
      <Section tone="white">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h1 className="mb-6 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.introText}
          </h1>
          {page!.introBody && <p className="text-[length:var(--type-body)] leading-normal">{page!.introBody}</p>}
        </Reveal>
      </Section>

      {/* Section 2 -- 3-column values row, no separate headline (moved to hero) */}
      <Section tone="offwhite">
        <Reveal>
          <ValuesSection columns={page!.valuesColumns} />
        </Reveal>
      </Section>

      {/* Sections 3/4 -- each Solution */}
      {page!.featuredSolutions.map((solution, i) => {
        const tone = i % 2 === 0 ? 'white' : 'offwhite';
        return (
          <Section tone={tone} key={solution.nucid} id={solution.slug}>
            <Reveal className={`flex flex-col gap-8 md:flex-row md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="aspect-[4/3] w-full rounded-md bg-muted-bg md:w-1/2" aria-hidden="true" />
              <div className="md:w-1/2">
                <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{solution.name}</h2>
                {solution.tagline && (
                  <p className="mb-4 text-[length:var(--type-h3)] font-semibold text-teal">{solution.tagline}</p>
                )}
                <div className="mb-6 flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
                  <PortableText value={solution.summaryText} />
                </div>
                <Button href={solution.ctaLink} variant="primary">
                  {solution.ctaLabel}
                </Button>
              </div>
            </Reveal>

            {/* "What you'll gain" -- equal cards, not a numbered list (was
                "How it works"). Same processSteps field, different heading
                and rendering. */}
            {solution.processSteps && solution.processSteps.length > 0 && (
              <Reveal className="mt-12">
                <h3 className="mb-6 text-[length:var(--type-h3)] font-semibold">What you&rsquo;ll gain</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {solution.processSteps.map((step) => (
                    <FeatureCard key={step.title} title={step.title} body={step.description} />
                  ))}
                </div>
              </Reveal>
            )}
          </Section>
        );
      })}

      {/* Section 5 -- Platforms, new */}
      {page!.featuredPlatforms && page!.featuredPlatforms.length > 0 && (
        <Section tone="white">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.platformsHeadline}</h2>
              {page!.platformsBody && <p className="text-[length:var(--type-body)] leading-normal">{page!.platformsBody}</p>}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page!.featuredPlatforms.map((platform) => (
                <FeatureCard key={platform.nucid} title={platform.name} body={platform.purpose ?? ''} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Section 6 -- closing CTA, new */}
      {page!.closingCtaHeadline && (
        <Section tone="forest">
          <Reveal className="text-center">
            <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em] text-white">{page!.closingCtaHeadline}</h2>
            {page!.closingCtaBody && <p className="mb-6 text-[length:var(--type-body)] leading-normal text-text-on-dark">{page!.closingCtaBody}</p>}
            {page!.closingCtaButtonLabel && page!.closingCtaButtonHref && (
              <Button href={page!.closingCtaButtonHref} variant="primary">
                {page!.closingCtaButtonLabel}
              </Button>
            )}
          </Reveal>
        </Section>
      )}
    </>
  );
}
