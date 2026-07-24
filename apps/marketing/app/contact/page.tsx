import { Section, ContactForm, Reveal } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { contactPageQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered

/**
 * Content-standard redesign (explicit instruction): eyebrow label added
 * for consistency with About/Solutions, body copy tightened to 2-3 short
 * lines. Layout, ContactForm, and font tokens are unchanged -- this page
 * was already close to the target (one message, generous whitespace,
 * ends with its CTA being the form itself), so it stayed a single
 * section rather than being split into more of them.
 */
interface ContactPageDoc {
  label?: string;
  headline: string;
  bodyText: string;
  formOptions: string[];
}

interface SiteSettingsDoc {
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    sanityClient.fetch<ContactPageDoc | null>(contactPageQuery),
    sanityClient.fetch<SiteSettingsDoc | null>(siteSettingsQuery),
  ]);

  requireField(page, 'contactPage');
  requireField(page?.headline, 'contactPage.headline');
  requireField(page?.bodyText, 'contactPage.bodyText');
  requireField(page?.formOptions, 'contactPage.formOptions');
  requireField(settings?.contactEmail, 'siteSettings.contactEmail');

  return (
    <Section tone="white">
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          {page!.label && (
            <span className="mb-4 block text-[length:var(--type-label)] font-semibold uppercase tracking-[0.5px] text-teal">
              {page!.label}
            </span>
          )}
          <h1 className="mb-4 text-[length:var(--type-hero-long)] font-semibold leading-[1.05] tracking-[-0.015em]">
            {page!.headline}
          </h1>
          <p className="mb-8 text-[length:var(--type-body)] leading-normal">{page!.bodyText}</p>
          <div className="flex flex-col gap-1 text-[length:var(--type-button)]">
            <a href={`mailto:${settings!.contactEmail}`} className="text-teal no-underline hover:underline">
              {settings!.contactEmail}
            </a>
            <a href={`tel:${settings!.contactPhone.replace(/\s+/g, '')}`} className="text-teal no-underline hover:underline">
              {settings!.contactPhone}
            </a>
            <span>{settings!.contactWebsite}</span>
          </div>
        </Reveal>
        <ContactForm options={page!.formOptions} />
      </div>
    </Section>
  );
}
