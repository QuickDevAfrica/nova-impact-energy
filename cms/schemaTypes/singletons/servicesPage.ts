import { defineField, defineType } from 'sanity';

/**
 * Singleton -- Master Build Brief Section 5: this document holds ONLY the
 * page-level intro. The Solution copy itself lives in the `solution`
 * documents (avoids duplicating what Content OS already models).
 *
 * valuesHeadline/valuesBody/valuesColumns (added Phase 2) power the Apple
 * "Designed to make a difference" style 3-column section. As of the
 * content-standard redesign, valuesHeadline/valuesBody are no longer
 * rendered on the page -- that headline moved up to become the page's own
 * hero (introText/introBody) instead, so Section 2 is just the 3 columns
 * now. Fields kept (not deleted) rather than migrating/cleaning up old
 * data for two fields nothing reads anymore.
 *
 * introBody/platformsHeadline/platformsBody/featuredPlatforms/closingCta*
 * added for the content-standard redesign: a body paragraph under the
 * hero, a new "what we're building next" platforms section (Section 5),
 * and a closing CTA (Section 6) -- this page didn't have one before.
 */
export default defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  fields: [
    defineField({ name: 'introText', title: 'Hero headline ("Building Africa\'s Energy Ecosystem.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'introBody', title: 'Hero body paragraph', type: 'text' }),
    defineField({
      name: 'featuredSolutions',
      title: 'Solutions to render on this page, in order',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: 'valuesEyebrow', title: 'Values section eyebrow label (optional, no longer rendered)', type: 'string' }),
    defineField({ name: 'valuesHeadline', title: 'Values section headline (no longer rendered -- moved to the hero)', type: 'string' }),
    defineField({ name: 'valuesBody', title: 'Values section body paragraph (no longer rendered -- moved to the hero)', type: 'text' }),
    defineField({
      name: 'valuesColumns',
      title: 'Values section columns (exactly 3, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueColumn',
          fields: [
            defineField({ name: 'leadIn', title: 'Bold column title (e.g. "Engineering & Capacity")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'bodyText', title: 'Body text below the title', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'linkLabel', title: 'Link label (e.g. "Explore our services →")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'linkHref', title: 'Link href', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'leadIn' } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: 'platformsHeadline', title: 'Platforms section headline ("Building the next generation of energy solutions.")', type: 'string' }),
    defineField({ name: 'platformsBody', title: 'Platforms section body paragraph', type: 'text' }),
    defineField({
      name: 'featuredPlatforms',
      title: 'Platforms to feature in this section, in order (5: ENOVA, Monitoring, Carbon, Battery Swap, EV Charging)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platform' }] }],
    }),
    defineField({ name: 'closingCtaHeadline', title: 'Closing CTA headline ("Let\'s build what\'s next.")', type: 'string' }),
    defineField({ name: 'closingCtaBody', title: 'Closing CTA body text', type: 'text' }),
    defineField({ name: 'closingCtaButtonLabel', title: 'Closing CTA button label ("Get in touch →")', type: 'string' }),
    defineField({ name: 'closingCtaButtonHref', title: 'Closing CTA button href', type: 'string' }),
  ],
  preview: { select: { title: 'introText' } },
});
