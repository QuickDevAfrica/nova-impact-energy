import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, Button, StatusBadge } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { servicesPageQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface ServiceSolution {
  nucid: string;
  name: string;
  slug: string;
  summaryText: PortableTextBlock[];
  ctaLabel: string;
  ctaLink: string;
  status: 'live' | 'planned';
}

interface ServicesPageDoc {
  introText: string;
  featuredSolutions: ServiceSolution[];
}

export default async function ServicesPage() {
  const page = await sanityClient.fetch<ServicesPageDoc | null>(servicesPageQuery);

  requireField(page, 'servicesPage');
  requireField(page?.introText, 'servicesPage.introText');
  requireField(page?.featuredSolutions, 'servicesPage.featuredSolutions');

  return (
    <>
      <Section tone="white">
        <h1 className="text-[32px] font-semibold md:text-[40px]">{page!.introText}</h1>
      </Section>

      {page!.featuredSolutions.map((solution, i) => {
        const isLive = solution.status === 'live';
        const tone = i % 2 === 0 ? 'offwhite' : 'white';
        return (
          <Section tone={tone} key={solution.nucid} id={solution.slug}>
            <div className={`flex flex-col gap-8 md:flex-row md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="aspect-[4/3] w-full rounded-md bg-muted-bg md:w-1/2" aria-hidden="true" />
              <div className="md:w-1/2">
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-[22px] font-semibold md:text-[26px]">{solution.name}</h2>
                  {!isLive && <StatusBadge label="Coming soon" />}
                </div>
                <div className="mb-6 flex flex-col gap-4 text-[16px] leading-normal md:text-[17px]">
                  <PortableText value={solution.summaryText} />
                </div>
                {isLive && (
                  <Button href={solution.ctaLink} variant="primary">
                    {solution.ctaLabel}
                  </Button>
                )}
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
}
