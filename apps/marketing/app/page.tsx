import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, SolutionCard, EcosystemCard, StatStrip, Button, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import { getDerivedStats, formatStatStrip } from '@/lib/getStats';
import { requireField } from '@/lib/requireField';
import type { Solution, Platform } from '@nova/content-model';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface HomePageDoc {
  heroHeadline: string;
  heroSubtext: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  whyNowHeadline: string;
  whyNowBody: PortableTextBlock[];
  servicesTeaserHeadline: string;
  proofPreviewHeadline: string;
  proofPreviewBody: string;
  proofPreviewButtonLabel: string;
  proofPreviewButtonHref: string;
  finalCtaHeadline: string;
  finalCtaSubtext?: string;
  finalCtaButtonLabel: string;
  finalCtaButtonHref: string;
  featuredSolutions: Pick<Solution, 'nucid' | 'name' | 'slug' | 'painPoint' | 'ctaLabel' | 'ctaLink' | 'status'>[];
  featuredPlatforms?: Pick<Platform, 'nucid' | 'name' | 'purpose' | 'status'>[];
}

interface SiteSettingsDoc {
  statesLabel: string;
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    sanityClient.fetch<HomePageDoc | null>(homePageQuery),
    sanityClient.fetch<SiteSettingsDoc | null>(siteSettingsQuery),
  ]);

  requireField(page, 'homePage');
  requireField(page?.heroHeadline, 'homePage.heroHeadline');
  requireField(page?.heroSubtext, 'homePage.heroSubtext');
  requireField(page?.heroCtaPrimaryLabel, 'homePage.heroCtaPrimaryLabel');
  requireField(page?.whyNowHeadline, 'homePage.whyNowHeadline');
  requireField(page?.whyNowBody, 'homePage.whyNowBody');
  requireField(page?.servicesTeaserHeadline, 'homePage.servicesTeaserHeadline');
  requireField(page?.featuredSolutions, 'homePage.featuredSolutions');
  requireField(page?.proofPreviewHeadline, 'homePage.proofPreviewHeadline');
  requireField(page?.proofPreviewBody, 'homePage.proofPreviewBody');
  requireField(page?.proofPreviewButtonLabel, 'homePage.proofPreviewButtonLabel');
  requireField(page?.proofPreviewButtonHref, 'homePage.proofPreviewButtonHref');
  requireField(page?.finalCtaHeadline, 'homePage.finalCtaHeadline');
  requireField(page?.finalCtaButtonLabel, 'homePage.finalCtaButtonLabel');
  requireField(settings?.statesLabel, 'siteSettings.statesLabel');

  const stats = await getDerivedStats(settings!.statesLabel);

  return (
    <>
      {/* Hero */}
      <Section tone="forest">
        <div className="max-w-[560px]">
          <h1 className="mb-5 text-[length:var(--type-hero)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.heroHeadline}
          </h1>
          <p className="mb-8 text-[length:var(--type-body)] leading-normal text-text-on-dark">{page!.heroSubtext}</p>
          <Button href={page!.heroCtaPrimaryHref} variant="primary">
            {page!.heroCtaPrimaryLabel}
          </Button>
        </div>
      </Section>

      {/* Why now -- Nigeria energy-transition context (Ecosystem Review Section 3) */}
      <Section tone="white">
        <Reveal className="mx-auto max-w-[640px]">
          <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.whyNowHeadline}</h2>
          <div className="prose-nova flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
            <PortableText value={page!.whyNowBody} />
          </div>
        </Reveal>
      </Section>

      {/* Solutions teaser */}
      <Section tone="offwhite">
        <Reveal>
          <h2 className="mb-8 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.servicesTeaserHeadline}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {page!.featuredSolutions.map((solution) => (
              <SolutionCard
                key={solution.nucid}
                solution={solution}
                ctaLabelOverride={solution.status === 'live' ? 'Learn more' : undefined}
                ctaHrefOverride={solution.status === 'live' ? `/solutions#${solution.slug}` : undefined}
              />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Ecosystem section -- every planned Platform, each with a real
          one-paragraph explanation of why it matters (Ecosystem Review
          Section 3). Status-driven: EcosystemCard mutes anything not live,
          and nothing here is live yet -- that stays accurate automatically. */}
      {page!.featuredPlatforms && page!.featuredPlatforms.length > 0 && (
        <Section tone="white">
          <Reveal>
            <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
              What we&rsquo;re building next.
            </h2>
            <p className="mb-8 text-[length:var(--type-body)] leading-normal text-muted-text">
              None of this is live yet -- shown honestly as planned, not a claim.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {page!.featuredPlatforms.map((platform) => (
                <EcosystemCard key={platform.nucid} platform={platform} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Proof preview -- previews the Proof page with a real derived stat,
          rather than just linking to it (Ecosystem Review Section 3). */}
      <Section tone="offwhite">
        <Reveal className="text-center">
          <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.proofPreviewHeadline}
          </h2>
          <p className="mx-auto mb-6 max-w-[560px] text-[length:var(--type-body)] leading-normal">
            {page!.proofPreviewBody}
          </p>
          <div className="mb-8">
            <StatStrip stats={formatStatStrip(stats)} />
          </div>
          <Button href={page!.proofPreviewButtonHref} variant="primary">
            {page!.proofPreviewButtonLabel}
          </Button>
        </Reveal>
      </Section>

      {/* Closing CTA band */}
      <Section tone="yellow">
        <Reveal className="text-center">
          <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.finalCtaHeadline}</h2>
          {page!.finalCtaSubtext && <p className="mb-6 text-[length:var(--type-body)]">{page!.finalCtaSubtext}</p>}
          <Button href={page!.finalCtaButtonHref} variant="secondary">
            {page!.finalCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
