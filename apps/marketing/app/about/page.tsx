import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, PulledQuote, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { aboutPageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface AboutPageDoc {
  headline: string;
  bodyBlocks: PortableTextBlock[];
  founderStoryHeadline: string;
  founderStoryBody: PortableTextBlock[];
  howWeWorkHeadline: string;
  howWeWorkBody: PortableTextBlock[];
  whatWeBelieveQuote: string;
}

export default async function AboutPage() {
  const page = await sanityClient.fetch<AboutPageDoc | null>(aboutPageQuery);

  requireField(page, 'aboutPage');
  requireField(page?.headline, 'aboutPage.headline');
  requireField(page?.bodyBlocks, 'aboutPage.bodyBlocks');
  requireField(page?.founderStoryHeadline, 'aboutPage.founderStoryHeadline');
  requireField(page?.founderStoryBody, 'aboutPage.founderStoryBody');
  requireField(page?.howWeWorkHeadline, 'aboutPage.howWeWorkHeadline');
  requireField(page?.howWeWorkBody, 'aboutPage.howWeWorkBody');
  requireField(page?.whatWeBelieveQuote, 'aboutPage.whatWeBelieveQuote');

  return (
    <Section tone="white">
      <div className="mx-auto max-w-[640px]">
        <Reveal>
          <h1 className="mb-6 text-[length:var(--type-hero)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.headline}
          </h1>
        </Reveal>
        <div className="prose-nova mb-10 flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
          <PortableText value={page!.bodyBlocks} />
        </div>

        <Reveal>
          <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.founderStoryHeadline}
          </h2>
          <div className="prose-nova mb-10 flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
            <PortableText value={page!.founderStoryBody} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-4 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">
            {page!.howWeWorkHeadline}
          </h2>
          <div className="prose-nova mb-10 flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
            <PortableText value={page!.howWeWorkBody} />
          </div>
        </Reveal>

        <PulledQuote>{page!.whatWeBelieveQuote}</PulledQuote>
      </div>
    </Section>
  );
}
