import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, Reveal, AboutCard, Button } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { aboutPageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Content-standard redesign (explicit instruction): closer to a premium
 * technology company than a traditional engineering company -- large
 * headlines, short paragraphs, one message per section, generous
 * whitespace, alternating white/soft (#F7FCF9) section backgrounds.
 * Same --content-max as Home/Solutions/Proof (enforced by Section itself).
 *
 * 8 sections: Hero -> Four pillars -> Why we exist -> How we create value
 * -> How we work -> Looking ahead -> What guides us -> closing CTA. See
 * aboutPage.ts for the field-reuse notes (several fields hold new content
 * under their old names rather than growing the schema for an identical
 * shape).
 *
 * Illustration placeholders (hero, Section 3, Section 6) reserve the
 * correct layout/aspect ratio for real assets later, using the filenames
 * already defined in packages/assets' naming convention (hero-about.avif
 * etc.) -- not waiting on final illustrations, per explicit instruction.
 */
interface PillarCard {
  title: string;
  body: string;
}

interface AboutPageDoc {
  heroLabel?: string;
  headline: string;
  bodyBlocks: PortableTextBlock[];
  pillarsHeadline?: string;
  pillarsBody?: string;
  pillars?: PillarCard[];
  founderStoryHeadline: string;
  founderStoryBody: PortableTextBlock[];
  valueHeadline?: string;
  valueCards?: PillarCard[];
  howWeWorkHeadline: string;
  howWeWorkBody: PortableTextBlock[];
  processCards?: PillarCard[];
  visionHeadline?: string;
  visionBody?: PortableTextBlock[];
  guidesHeadline?: string;
  coreValues?: PillarCard[];
  closingCtaHeadline?: string;
  closingCtaBody?: string;
  closingCtaButtonLabel?: string;
  closingCtaButtonHref?: string;
}

const PROSE_MAX = 'max-w-[640px]';

export default async function AboutPage() {
  const page = await sanityClient.fetch<AboutPageDoc | null>(aboutPageQuery);

  requireField(page, 'aboutPage');
  requireField(page?.headline, 'aboutPage.headline');
  requireField(page?.bodyBlocks, 'aboutPage.bodyBlocks');
  requireField(page?.pillars, 'aboutPage.pillars');
  requireField(page?.founderStoryHeadline, 'aboutPage.founderStoryHeadline');
  requireField(page?.founderStoryBody, 'aboutPage.founderStoryBody');
  requireField(page?.valueCards, 'aboutPage.valueCards');
  requireField(page?.howWeWorkHeadline, 'aboutPage.howWeWorkHeadline');
  requireField(page?.howWeWorkBody, 'aboutPage.howWeWorkBody');
  requireField(page?.processCards, 'aboutPage.processCards');
  requireField(page?.coreValues, 'aboutPage.coreValues');
  requireField(page?.closingCtaHeadline, 'aboutPage.closingCtaHeadline');

  return (
    <>
      {/* Section 1 -- hero: label, headline, 2 short paragraphs, optional
          illustration on the right */}
      <Section tone="white">
        <Reveal className="flex flex-col items-center gap-10 md:flex-row md:items-center">
          <div className={`mx-auto md:mx-0 ${PROSE_MAX} text-center md:text-left`}>
            {page!.heroLabel && (
              <span className="mb-4 block text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] text-teal">
                {page!.heroLabel}
              </span>
            )}
            <h1 className="mb-6 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
              {page!.headline}
            </h1>
            <div className="prose-nova flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
              <PortableText value={page!.bodyBlocks} />
            </div>
          </div>
          {/* Reserved: hero-about.avif (packages/assets/images/hero naming
              convention) -- optional hero illustration, right column */}
          <div className="aspect-square w-full max-w-[420px] shrink-0 rounded-[20px] bg-muted-bg md:w-1/2" aria-hidden="true" />
        </Reveal>
      </Section>

      {/* Section 2 -- Four pillars */}
      {page!.pillars && page!.pillars.length > 0 && (
        <Section tone="soft">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              {page!.pillarsHeadline && (
                <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.pillarsHeadline}</h2>
              )}
              {page!.pillarsBody && <p className="text-[length:var(--type-body)] leading-normal">{page!.pillarsBody}</p>}
            </div>
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {page!.pillars.map((pillar) => (
                <AboutCard key={pillar.title} title={pillar.title} body={pillar.body} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Section 3 -- Why we exist */}
      <Section tone="white">
        <Reveal className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center">
          {/* Reserved: about-engineers-collaborating.avif -- engineers
              collaborating around a renewable energy project */}
          <div className="aspect-[4/3] w-full shrink-0 rounded-[20px] bg-muted-bg md:w-1/2" aria-hidden="true" />
          <div className="md:w-1/2">
            <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.founderStoryHeadline}</h2>
            <div className="prose-nova flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
              <PortableText value={page!.founderStoryBody} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Section 4 -- How we create value */}
      {page!.valueCards && page!.valueCards.length > 0 && (
        <Section tone="soft">
          <Reveal>
            {page!.valueHeadline && (
              <h2 className="mb-10 text-center text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.valueHeadline}</h2>
            )}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
              {page!.valueCards.map((card) => (
                <AboutCard key={card.title} title={card.title} body={card.body} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Section 5 -- How we work */}
      <Section tone="white">
        <Reveal>
          <div className={`mx-auto mb-12 ${PROSE_MAX} text-center`}>
            <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.howWeWorkHeadline}</h2>
            <div className="prose-nova flex flex-col gap-2 text-[length:var(--type-body)] leading-normal">
              <PortableText value={page!.howWeWorkBody} />
            </div>
          </div>
          {page!.processCards && page!.processCards.length > 0 && (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {page!.processCards.map((step) => (
                <AboutCard key={step.title} title={step.title} body={step.body} />
              ))}
            </div>
          )}
        </Reveal>
      </Section>

      {/* Section 6 -- Looking ahead */}
      <Section tone="soft">
        <Reveal className="flex flex-col items-center gap-10 md:flex-row md:items-center">
          <div className="md:w-1/2">
            {page!.visionHeadline && (
              <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.visionHeadline}</h2>
            )}
            {page!.visionBody && (
              <div className="prose-nova flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
                <PortableText value={page!.visionBody} />
              </div>
            )}
          </div>
          {/* Reserved: about-connected-ecosystem.avif -- connected
              ecosystem showing engineering, training, OEMs, monitoring,
              EV, battery swap and carbon platforms */}
          <div className="aspect-[4/3] w-full shrink-0 rounded-[20px] bg-muted-bg md:w-1/2" aria-hidden="true" />
        </Reveal>
      </Section>

      {/* Section 7 -- What guides us */}
      {page!.coreValues && page!.coreValues.length > 0 && (
        <Section tone="white">
          <Reveal>
            {page!.guidesHeadline && (
              <h2 className="mb-10 text-center text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.guidesHeadline}</h2>
            )}
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {page!.coreValues.map((value) => (
                <AboutCard key={value.title} title={value.title} body={value.body} />
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Section 8 -- closing CTA */}
      {page!.closingCtaHeadline && (
        <Section tone="soft">
          <Reveal className="text-center">
            <h2 className="mb-2 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{page!.closingCtaHeadline}</h2>
            {page!.closingCtaBody && <p className="mb-6 text-[length:var(--type-body)] leading-normal">{page!.closingCtaBody}</p>}
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
