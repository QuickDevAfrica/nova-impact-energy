import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, Tile, MiniTile, StatStrip, Button, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import { getDerivedStats, formatStatStrip } from '@/lib/getStats';
import { requireField } from '@/lib/requireField';
import type { Solution, Platform } from '@nova/content-model';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Phase 2 visual-system rework: restructured to Apple's actual homepage
 * pattern (hero -> centered promo band -> alternating tile grid -> promo
 * band -> closing CTA) per the explicit instruction to match apple.com's
 * structure, not just its typography. Every tile still maps to a real
 * Nova content object -- Apple's grid works because they have 10+ real
 * products; Nova has 2 live Solutions and a handful of planned Platforms,
 * so the grid is sized to that rather than padded out with invented tiles.
 *
 * Phase 2 bug-fix pass:
 * - Illustration placeholders removed entirely (empty gray boxes looked
 *   worse than no box) until real assets exist -- Tile/MiniTile still
 *   accept an `illustration` prop, just not passed one here yet.
 * - Every centered text block now shares one prose max-width (640px,
 *   matching the About page) instead of ad hoc per-section values.
 * - Closing CTA moved off a yellow section background -- yellow is button-
 *   fill only now (see Section.tsx) -- onto offwhite, with the CTA button
 *   itself carrying the yellow "primary" treatment instead.
 */
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

const PROSE_MAX = 'max-w-[640px]';

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

  // The 2 most narratively-load-bearing Platforms (ENOVA, the umbrella; and
  // Monitoring, the first piece of it expected to ship) get the full Tile
  // treatment. The rest render as the smaller icon-row, same pattern Apple
  // uses for Arcade/Fitness+/Music/TV+/Podcasts under a heavier feature.
  const allPlatforms = page!.featuredPlatforms ?? [];
  const featuredTilePlatforms = allPlatforms.filter((p) => p.nucid === 'PLT-007' || p.nucid === 'PLT-002');
  const miniPlatforms = allPlatforms.filter((p) => p.nucid !== 'PLT-007' && p.nucid !== 'PLT-002');

  return (
    <>
      {/* Hero -- centered, Apple pattern */}
      <Section tone="forest">
        <div className={`mx-auto flex ${PROSE_MAX} flex-col items-center text-center`}>
          {/* Sentence-length copy -- --type-hero-long (32-56px), not the
              full 40-96px --type-hero scale reserved for 2-4 word headlines. */}
          <h1 className="mb-5 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.heroHeadline}
          </h1>
          <p className="mb-8 text-[length:var(--type-body)] leading-normal text-text-on-dark">{page!.heroSubtext}</p>
          <Button href={page!.heroCtaPrimaryHref} variant="primary">
            {page!.heroCtaPrimaryLabel}
          </Button>
        </div>
      </Section>

      {/* Why now -- centered promo band, Apple pattern (e.g. "College, sorted") */}
      <Section tone="white">
        <Reveal className={`mx-auto ${PROSE_MAX} text-center`}>
          <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.whyNowHeadline}</h2>
          <div className="prose-nova mx-auto flex flex-col gap-4 text-left text-[length:var(--type-body)] leading-normal">
            <PortableText value={page!.whyNowBody} />
          </div>
        </Reveal>
      </Section>

      {/* Solutions -- Apple-pattern 2-up tile grid, alternating dark/light.
          No illustration yet -- see project asset list -- so the tile is
          just headline/body/CTA on a solid tone until real ones exist.
          Section itself is forest (dark), not offwhite: Proof preview
          below needs to stay light (StatStrip's colors are spec-locked to
          light backgrounds), which forces Closing CTA dark to follow it --
          given those two fixed points, this is the arrangement that keeps
          the fewest same-tone sections adjacent (UI-UX Handoff Section 3's
          alternation rule can't be satisfied with zero repeats across all
          6 sections here, so this minimizes it to one unavoidable pair). */}
      <Section tone="forest">
        <Reveal>
          <h2 className="mb-8 text-center text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.servicesTeaserHeadline}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {page!.featuredSolutions.map((solution, i) => (
              <Tile
                key={solution.nucid}
                tone={i % 2 === 0 ? 'dark' : 'light'}
                eyebrow={solution.status === 'live' ? 'Live' : undefined}
                headline={solution.name}
                body={solution.painPoint}
                ctaLabel={solution.status === 'live' ? 'Learn more' : undefined}
                ctaHref={solution.status === 'live' ? `/solutions#${solution.slug}` : undefined}
                muted={solution.status !== 'live'}
                className="pb-10"
              />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Ecosystem -- 2 featured Platform tiles + a mini-tile row for the
          rest, same weighting pattern Apple uses (2 heavy tiles, then a
          lighter row of smaller ones). Status-driven throughout: nothing
          here is live yet, and that stays accurate automatically. */}
      {allPlatforms.length > 0 && (
        <Section tone="white">
          <Reveal>
            <h2 className="mb-2 text-center text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
              What we&rsquo;re building next.
            </h2>
            <p className={`mx-auto mb-10 ${PROSE_MAX} text-center text-[length:var(--type-body)] leading-normal text-muted-text`}>
              None of this is live yet -- shown honestly as planned, not a claim.
            </p>

            {featuredTilePlatforms.length > 0 && (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                {featuredTilePlatforms.map((platform, i) => (
                  <Tile
                    key={platform.nucid}
                    tone={i % 2 === 0 ? 'dark' : 'light'}
                    headline={platform.name}
                    body={platform.purpose}
                    muted
                    className="pb-10"
                  />
                ))}
              </div>
            )}

            {miniPlatforms.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {miniPlatforms.map((platform) => (
                  <MiniTile key={platform.nucid} label={platform.name} />
                ))}
              </div>
            )}
          </Reveal>
        </Section>
      )}

      {/* Proof preview -- centered promo band with a real derived stat,
          rather than just linking to it (Ecosystem Review Section 3). */}
      <Section tone="offwhite">
        <Reveal className="text-center">
          <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.proofPreviewHeadline}
          </h2>
          <p className={`mx-auto mb-6 ${PROSE_MAX} text-[length:var(--type-body)] leading-normal`}>
            {page!.proofPreviewBody}
          </p>
          <div className={`mx-auto mb-8 ${PROSE_MAX}`}>
            <StatStrip stats={formatStatStrip(stats)} />
          </div>
          <Button href={page!.proofPreviewButtonHref} variant="primary">
            {page!.proofPreviewButtonLabel}
          </Button>
        </Reveal>
      </Section>

      {/* Closing CTA -- forest (dark), not yellow (yellow is button-fill
          only, never a section background -- see Section.tsx). Also keeps
          the required dark/light alternation: Proof preview above is
          offwhite, so this needs to be dark, not another light section. */}
      <Section tone="forest">
        <Reveal className="text-center">
          <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.finalCtaHeadline}</h2>
          {page!.finalCtaSubtext && <p className="mb-6 text-[length:var(--type-body)] text-text-on-dark">{page!.finalCtaSubtext}</p>}
          <Button href={page!.finalCtaButtonHref} variant="primary">
            {page!.finalCtaButtonLabel}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
