import { PortableText, type PortableTextBlock } from '@portabletext/react';
import {
  Section,
  Button,
  Reveal,
  HomeCard,
  FullBleedFeature,
  SplitCards,
  Ticker,
  ProjectCarousel,
  type TickerItem,
  type CarouselCard,
  type SplitCardContent,
} from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Homepage content-standard redesign -- Apple.com's design philosophy
 * (not its content): premium, minimal, spacious, image-driven. Full
 * 9-section rebuild per explicit instruction, replacing the previous
 * tile-grid layout entirely. Two decisions made explicit with the user
 * before writing this:
 *
 * 1. Color palette -- the brief's colors (#2C6E49 etc, matching the real
 *    logo mark) replaced the sitewide design tokens (Nav, Footer, every
 *    page), not just this page -- see packages/design-tokens.
 * 2. Layout width/radius -- the brief's 1280-1440px max-width and 32px
 *    corner radius are homepage-only (`HOME_MAX` / `HOME_PADDING` below,
 *    and each new component's own rounded-[32px]) -- every other page
 *    keeps the shared 1120px / 8-12px system.
 *
 * Two more decisions, also explicit: the Section 6 price ticker is a
 * static/illustrative display, not a live market-data feed (none exists
 * yet); the Section 6 cinematic carousel uses anonymized project types
 * instead of the brief's named real companies (Tesla, Apple, Google...),
 * since publishing unverified capacity claims about unaffiliated
 * companies isn't something to put on a live production site.
 */

const HOME_MAX = 'max-w-[1400px]';
const HOME_PADDING = 'px-5 py-24 md:px-12 md:py-32 lg:py-40';

interface WhatWeDoCard {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

interface EcosystemCard {
  headline: string;
  body: string;
}

interface ImpactColumn {
  headline: string;
  body: string;
}

interface HomePageDoc {
  heroHeadline: string;
  heroSubtext: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryLabel?: string;
  heroCtaSecondaryHref?: string;
  whyNowHeadline: string;
  whyNowBody: PortableTextBlock[];
  whatWeDoHeadline: string;
  whatWeDoCards: WhatWeDoCard[];
  ecosystemHeadline: string;
  ecosystemIntro: string;
  enovaHeadline: string;
  enovaBody: string;
  enovaCtaLabel: string;
  enovaCtaHref: string;
  ecosystemCards: EcosystemCard[];
  impactHeadline: string;
  impactBody: string;
  impactColumns: ImpactColumn[];
  endlessHeadline: string;
  tickerItems: TickerItem[];
  carouselItems: CarouselCard[];
  engineeringHeadline: string;
  engineeringBody: string;
  engineeringCtaLabel: string;
  engineeringCtaHref: string;
  splitCards: SplitCardContent[];
  finalCtaHeadline: string;
  finalCtaSubtext?: string;
  finalCtaButtonLabel: string;
  finalCtaButtonHref: string;
}

export default async function HomePage() {
  const page = await sanityClient.fetch<HomePageDoc | null>(homePageQuery);

  requireField(page, 'homePage');
  requireField(page?.heroHeadline, 'homePage.heroHeadline');
  requireField(page?.heroSubtext, 'homePage.heroSubtext');
  requireField(page?.heroCtaPrimaryLabel, 'homePage.heroCtaPrimaryLabel');
  requireField(page?.whyNowHeadline, 'homePage.whyNowHeadline');
  requireField(page?.whyNowBody, 'homePage.whyNowBody');
  requireField(page?.whatWeDoHeadline, 'homePage.whatWeDoHeadline');
  requireField(page?.whatWeDoCards, 'homePage.whatWeDoCards');
  requireField(page?.ecosystemHeadline, 'homePage.ecosystemHeadline');
  requireField(page?.enovaHeadline, 'homePage.enovaHeadline');
  requireField(page?.ecosystemCards, 'homePage.ecosystemCards');
  requireField(page?.impactHeadline, 'homePage.impactHeadline');
  requireField(page?.impactColumns, 'homePage.impactColumns');
  requireField(page?.endlessHeadline, 'homePage.endlessHeadline');
  requireField(page?.tickerItems, 'homePage.tickerItems');
  requireField(page?.carouselItems, 'homePage.carouselItems');
  requireField(page?.engineeringHeadline, 'homePage.engineeringHeadline');
  requireField(page?.splitCards, 'homePage.splitCards');
  requireField(page?.finalCtaHeadline, 'homePage.finalCtaHeadline');
  requireField(page?.finalCtaButtonLabel, 'homePage.finalCtaButtonLabel');

  return (
    <>
      {/* SECTION 1 -- Hero. Full viewport, white background (changed from
          Dark Forest per client feedback after seeing the preview -- too
          much dark green across the page; white carries the same bold
          confident feel with this much whitespace and type size), large
          centered headline, illustration reserved below it. */}
      <Section tone="white" maxWidthClassName={HOME_MAX} paddingClassName="px-5 pb-20 pt-24 md:px-12 md:pb-28 md:pt-16">
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <h1 className="mb-6 max-w-[880px] text-[length:var(--type-hero)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.heroHeadline}
          </h1>
          <p className="mb-9 max-w-[600px] text-[length:var(--type-body)] leading-normal">{page!.heroSubtext}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={page!.heroCtaPrimaryHref} variant="primary">
              {page!.heroCtaPrimaryLabel}
            </Button>
            {page!.heroCtaSecondaryLabel && page!.heroCtaSecondaryHref && (
              <a
                href={page!.heroCtaSecondaryHref}
                className="inline-flex items-center justify-center rounded-sm border border-teal px-5 py-3 text-[length:var(--type-button)] font-semibold text-teal no-underline transition-colors duration-150 hover:bg-teal hover:text-white"
              >
                {page!.heroCtaSecondaryLabel}
              </a>
            )}
          </div>
        </div>
        {/* hero illustration placeholder -- reserves the layout/aspect
            ratio for /images/home/hero-energy.webp */}
        <div className="aspect-[16/9] w-full rounded-[32px] bg-muted-bg" aria-hidden="true" />
      </Section>

      {/* SECTION 2 -- "The energy transition needs more than hardware." */}
      <Section tone="white" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING}>
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-6 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.whyNowHeadline}
          </h2>
          <div className="prose-nova mx-auto flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
            <PortableText value={page!.whyNowBody} />
          </div>
        </Reveal>
      </Section>

      {/* SECTION 3 -- "What we do today." Three premium equal-height cards.
          White (changed from Dark Forest per client feedback -- too much
          dark green across the page); cards use the same light treatment
          as Section 4's mini cards. */}
      <Section tone="white" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING}>
        <Reveal>
          <h2 className="mb-14 text-center text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.whatWeDoHeadline}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {page!.whatWeDoCards.map((card) => (
              <HomeCard
                key={card.headline}
                tone="light"
                size="large"
                headline={card.headline}
                body={card.body}
                ctaLabel={card.ctaLabel}
                ctaHref={card.ctaHref}
              />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* SECTION 4 -- "What we're building next." ENOVA feature + 4 mini cards. */}
      <Section tone="white" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING} id="ecosystem">
        <Reveal>
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <h2 className="mb-3 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
              {page!.ecosystemHeadline}
            </h2>
            <p className="text-[length:var(--type-body)] leading-normal">{page!.ecosystemIntro}</p>
          </div>
          <div className="mb-6">
            {/* ENOVA full-bleed feature card -- reserves the layout for
                /images/home/enova-platform.webp */}
            <FullBleedFeature
              eyebrow="Platform"
              headline={page!.enovaHeadline}
              body={page!.enovaBody}
              ctaLabel={page!.enovaCtaLabel}
              ctaHref={page!.enovaCtaHref}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {page!.ecosystemCards.map((card) => (
              <HomeCard key={card.headline} tone="light" size="small" headline={card.headline} body={card.body} />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* SECTION 5 -- "Built for long-term impact." Three columns. White
          (changed from Dark Forest per client feedback -- too much dark
          green across the page). */}
      <Section tone="offwhite" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING}>
        <Reveal>
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <h2 className="mb-4 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
              {page!.impactHeadline}
            </h2>
            <p className="text-[length:var(--type-body)] leading-normal">{page!.impactBody}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {page!.impactColumns.map((column) => (
              <div key={column.headline} className="text-center">
                <h3 className="mb-2 text-[length:var(--type-h3)] font-semibold">{column.headline}</h3>
                <p className="text-[length:var(--type-body)] leading-normal">{column.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* SECTION 6 -- "Endless Possibilities." One continuous block: a
          70px price ticker (Row One) immediately followed by the large
          cinematic project carousel (Row Two), no gap between them. */}
      <Section tone="forest" noInnerPadding>
        <div className={`mx-auto ${HOME_MAX} px-5 pb-10 pt-24 md:px-12 md:pt-32`}>
          <h2 className="text-center text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.endlessHeadline}
          </h2>
        </div>
        <Ticker items={page!.tickerItems} />
        <ProjectCarousel items={page!.carouselItems} />
      </Section>

      {/* SECTION 7 -- "Engineering that lasts." Full-width, no margins,
          text over image -- truly edge-to-edge, not the rounded contained
          card treatment used elsewhere on this page. */}
      <Section tone="white" noInnerPadding>
        {/* full-bleed feature -- reserves the layout for
            /images/home/service-engineering.webp */}
        <FullBleedFeature
          headline={page!.engineeringHeadline}
          body={page!.engineeringBody}
          ctaLabel={page!.engineeringCtaLabel}
          ctaHref={page!.engineeringCtaHref}
          heightClass="h-[480px] md:h-[640px]"
          rounded={false}
        />
      </Section>

      {/* SECTION 8 -- Split layout: two equal cards, full-bleed images,
          text overlaid directly on them. */}
      <Section tone="white" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING}>
        <Reveal>
          {/* left card -- /images/home/service-training.webp,
              right card -- /images/home/service-oem.webp */}
          <SplitCards cards={page!.splitCards} />
        </Reveal>
      </Section>

      {/* SECTION 9 -- Final CTA. Dark Forest background, centered. */}
      <Section tone="forest" maxWidthClassName={HOME_MAX} paddingClassName={HOME_PADDING}>
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2 className="mb-4 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.finalCtaHeadline}
          </h2>
          {page!.finalCtaSubtext && (
            <p className="mb-9 text-[length:var(--type-body)] leading-normal text-text-on-dark">{page!.finalCtaSubtext}</p>
          )}
          <Button href={page!.finalCtaButtonHref} variant="primary">
            {page!.finalCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
