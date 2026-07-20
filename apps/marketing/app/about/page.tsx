import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, PulledQuote } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { aboutPageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface AboutPageDoc {
  headline: string;
  bodyBlocks: PortableTextBlock[];
  whatWeBelieveQuote: string;
}

export default async function AboutPage() {
  const page = await sanityClient.fetch<AboutPageDoc | null>(aboutPageQuery);

  requireField(page, 'aboutPage');
  requireField(page?.headline, 'aboutPage.headline');
  requireField(page?.bodyBlocks, 'aboutPage.bodyBlocks');
  requireField(page?.whatWeBelieveQuote, 'aboutPage.whatWeBelieveQuote');

  return (
    <Section tone="white">
      <div className="mx-auto max-w-[640px]">
        <h1 className="mb-6 text-[32px] font-semibold leading-[1.3] md:text-[40px]">{page!.headline}</h1>
        <div className="prose-nova mb-10 flex flex-col gap-4 text-[16px] leading-normal md:text-[17px]">
          <PortableText value={page!.bodyBlocks} />
        </div>
        <PulledQuote>{page!.whatWeBelieveQuote}</PulledQuote>
      </div>
    </Section>
  );
}
