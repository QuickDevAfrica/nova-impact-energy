import type { Metadata } from 'next';
import { Nav, Footer } from '@nova/ui';
import { sanityClient } from '@/lib/sanity.client';
import { siteSettingsQuery } from '@/lib/sanity.queries';
import { requireField } from '@/lib/requireField';
import './globals.css';

export const dynamic = 'force-dynamic'; // CMS-driven pages -- not statically prerendered


export const metadata: Metadata = {
  title: 'Nova Impact Energy',
  description:
    'Technical credibility for Nigeria’s clean energy transition -- installer training, certification, and OEM technical partnerships.',
};

interface SiteSettings {
  companyName: string;
  statesLabel: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  navLinks: { label: string; href: string }[];
  navCtaLabel: string;
  navCtaHref: string;
  footerCopyright: string;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);

  requireField(settings, 'siteSettings');
  requireField(settings?.companyName, 'siteSettings.companyName');
  requireField(settings?.navLinks, 'siteSettings.navLinks');
  requireField(settings?.navCtaLabel, 'siteSettings.navCtaLabel');
  requireField(settings?.footerCopyright, 'siteSettings.footerCopyright');

  return (
    <html lang="en">
      <body>
        <Nav
          logoLabel={settings!.companyName}
          links={settings!.navLinks}
          ctaLabel={settings!.navCtaLabel}
          ctaHref={settings!.navCtaHref}
        />
        <main>{children}</main>
        <Footer
          companyName={settings!.companyName}
          navLinks={settings!.navLinks}
          contactEmail={settings!.contactEmail}
          contactPhone={settings!.contactPhone}
          contactWebsite={settings!.contactWebsite}
          copyrightLine={settings!.footerCopyright}
        />
      </body>
    </html>
  );
}
