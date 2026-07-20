import { Section, ContactForm } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { contactPageQuery, siteSettingsQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


interface ContactPageDoc {
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
        <div>
          <h1 className="mb-4 text-[32px] font-semibold md:text-[40px]">{page!.headline}</h1>
          <p className="mb-8 text-[16px] leading-normal md:text-[17px]">{page!.bodyText}</p>
          <div className="flex flex-col gap-1 text-[14.5px]">
            <a href={`mailto:${settings!.contactEmail}`} className="text-teal no-underline hover:underline">
              {settings!.contactEmail}
            </a>
            <a href={`tel:${settings!.contactPhone.replace(/\s+/g, '')}`} className="text-teal no-underline hover:underline">
              {settings!.contactPhone}
            </a>
            <span>{settings!.contactWebsite}</span>
          </div>
        </div>
        <ContactForm options={page!.formOptions} />
      </div>
    </Section>
  );
}
