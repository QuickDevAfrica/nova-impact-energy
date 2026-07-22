import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { Section, Button, Reveal } from '@nova/ui';
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
 */
interface ProcessStep {
  title: string;
  description: string;
}

interface SolutionFaq {
  nucid: string;
  question: string;
  answer: string;
}

interface ServiceSolution {
  nucid: string;
  name: string;
  slug: string;
  summaryText: PortableTextBlock[];
  ctaLabel: string;
  ctaLink: string;
  status: 'live' | 'planned';
  processSteps?: ProcessStep[];
  faqs?: SolutionFaq[];
}

interface ServicesPageDoc {
  introText: string;
  featuredSolutions: ServiceSolution[];
}

export default async function SolutionsPage() {
  const page = await sanityClient.fetch<ServicesPageDoc | null>(servicesPageQuery);

  requireField(page, 'servicesPage');
  requireField(page?.introText, 'servicesPage.introText');
  requireField(page?.featuredSolutions, 'servicesPage.featuredSolutions');

  return (
    <>
      <Section tone="white">
        <Reveal>
          <h1 className="text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.introText}
          </h1>
        </Reveal>
      </Section>

      {page!.featuredSolutions.map((solution, i) => {
        const tone = i % 2 === 0 ? 'offwhite' : 'white';
        return (
          <Section tone={tone} key={solution.nucid} id={solution.slug}>
            <Reveal className={`flex flex-col gap-8 md:flex-row md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="aspect-[4/3] w-full rounded-md bg-muted-bg md:w-1/2" aria-hidden="true" />
              <div className="md:w-1/2">
                <h2 className="mb-3 text-[length:var(--type-h2)] font-semibold tracking-[-0.01em]">{solution.name}</h2>
                <div className="mb-6 flex flex-col gap-4 text-[length:var(--type-body)] leading-normal">
                  <PortableText value={solution.summaryText} />
                </div>
                <Button href={solution.ctaLink} variant="primary">
                  {solution.ctaLabel}
                </Button>
              </div>
            </Reveal>

            {/* How it works -- step breakdown (Ecosystem Review Section 3). */}
            {solution.processSteps && solution.processSteps.length > 0 && (
              <Reveal className="mt-12">
                <h3 className="mb-6 text-[length:var(--type-h3)] font-semibold">How it works</h3>
                <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {solution.processSteps.map((step, stepIndex) => (
                    <li key={step.title} className="flex flex-col gap-1">
                      <span className="text-[length:var(--type-label)] font-semibold text-muted-text">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[length:var(--type-h3)] font-semibold">{step.title}</span>
                      <span className="text-[length:var(--type-body)] leading-normal">{step.description}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {/* FAQ -- real reusable faq documents (Content OS Core Object 14),
                not hardcoded per page. */}
            {solution.faqs && solution.faqs.length > 0 && (
              <Reveal className="mt-12 max-w-[640px]">
                <h3 className="mb-6 text-[length:var(--type-h3)] font-semibold">Frequently asked questions</h3>
                <div className="flex flex-col divide-y divide-border">
                  {solution.faqs.map((faq) => (
                    <details key={faq.nucid} className="group py-4">
                      <summary className="cursor-pointer list-none text-[length:var(--type-body)] font-semibold">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-[length:var(--type-body)] leading-normal text-muted-text">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            )}
          </Section>
        );
      })}
    </>
  );
}
