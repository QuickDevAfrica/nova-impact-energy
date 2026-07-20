import { Section, SolutionCard, StatStrip, Button } from '@nova/ui';
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
  servicesTeaserHeadline: string;
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
  requireField(page?.servicesTeaserHeadline, 'homePage.servicesTeaserHeadline');
  requireField(page?.featuredSolutions, 'homePage.featuredSolutions');
  requireField(page?.finalCtaHeadline, 'homePage.finalCtaHeadline');
  requireField(page?.finalCtaButtonLabel, 'homePage.finalCtaButtonLabel');
  requireField(settings?.statesLabel, 'siteSettings.statesLabel');

  const stats = await getDerivedStats(settings!.statesLabel);

  return (
    <>
      {/* Hero */}
      <Section tone="forest">
        <div className="max-w-[480px]">
          <h1 className="mb-5 text-[40px] font-semibold leading-[1.05] tracking-[-0.015em] md:text-[64px]">
            {page!.heroHeadline}
          </h1>
          <p className="mb-8 text-[16px] leading-normal text-text-on-dark md:text-[17px]">{page!.heroSubtext}</p>
          <Button href={page!.heroCtaPrimaryHref} variant="primary">
            {page!.heroCtaPrimaryLabel}
          </Button>
        </div>
      </Section>

      {/* Stat strip */}
      <Section tone="white">
        <StatStrip stats={formatStatStrip(stats)} />
      </Section>

      {/* Services teaser */}
      <Section tone="offwhite">
        <h2 className="mb-8 text-[22px] font-semibold tracking-[-0.01em] md:text-[26px]">
          {page!.servicesTeaserHeadline}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {page!.featuredSolutions.map((solution) => (
            <SolutionCard
              key={solution.nucid}
              solution={solution}
              ctaLabelOverride={solution.status === 'live' ? 'Learn more' : undefined}
              ctaHrefOverride={solution.status === 'live' ? `/services#${solution.slug}` : undefined}
            />
          ))}
        </div>
      </Section>

      {/* Closing CTA band */}
      <Section tone="yellow">
        <div className="text-center">
          <h2 className="mb-2 text-[22px] font-semibold md:text-[26px]">{page!.finalCtaHeadline}</h2>
          {page!.finalCtaSubtext && <p className="mb-6 text-[16px] md:text-[17px]">{page!.finalCtaSubtext}</p>}
          <Button href={page!.finalCtaButtonHref} variant="secondary">
            {page!.finalCtaButtonLabel}
          </Button>
        </div>
      </Section>
    </>
  );
}
